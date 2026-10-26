import React, { useState } from 'react';
import { ShapFactor } from '../../types';
import { Layers, HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface ExplainabilityPanelProps {
  factors: ShapFactor[];
  baseValue?: number; // baseline actuarial portfolio risk (e.g. 45)
  modelConfidence?: number;
  calibrationBand?: string;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({
  factors,
  baseValue = 42,
  modelConfidence = 91,
  calibrationBand = 'Calibrated ±3.2%'
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [activeFactorInfo, setActiveFactorInfo] = useState<string | null>(null);

  // Maximum factor magnitude to scale horizontal bars proportionally
  const maxImpact = Math.max(...factors.map(f => Math.abs(f.impact)), 15);

  return (
    <div className="p-6 rounded-xl bg-surface border border-surface-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-border gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">Why this assessment?</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-brand-teal border border-surface-border">
              SHAP Attribution
            </span>
          </div>
          <p className="text-xs text-petText-secondary mt-1">
            Actuarial feature attribution showing net delta impacts over the canine baseline portfolio risk (Base: {baseValue}).
          </p>
        </div>

        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-petText-secondary hover:text-white bg-surface-elevated hover:bg-surface-higher border border-surface-border transition-colors self-start sm:self-auto"
        >
          <Layers size={13} className="text-brand-teal" />
          <span>{showTechnicalDetails ? 'Hide Model Details' : 'View Model Explanation'}</span>
          {showTechnicalDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Model Calibration Confidence Note */}
      <div className="mt-4 p-3 rounded-lg bg-surface-elevated/70 border border-surface-border flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-teal" />
          <span className="text-petText-secondary">Model Calibration:</span>
          <span className="font-mono text-petText-primary font-medium">{calibrationBand}</span>
        </div>
        <div className="flex items-center gap-2 text-petText-muted">
          <span>Confidence Score:</span>
          <span className="font-mono text-brand-teal font-semibold">{modelConfidence}%</span>
          <span className="text-petText-dim">(Brier score 0.082)</span>
        </div>
      </div>

      {/* Horizontal Contribution Bars */}
      <div className="mt-5 space-y-4">
        {factors.map(factor => {
          const isPositive = factor.impact > 0;
          const percentage = Math.min((Math.abs(factor.impact) / maxImpact) * 100, 100);

          return (
            <div
              key={factor.id}
              className="group p-3 rounded-lg hover:bg-surface-elevated transition-colors border border-transparent hover:border-surface-border"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-petText-primary group-hover:text-white transition-colors">
                    {factor.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-higher text-petText-muted">
                    {factor.category}
                  </span>
                  <button
                    onClick={() => setActiveFactorInfo(activeFactorInfo === factor.id ? null : factor.id)}
                    className="text-petText-dim hover:text-petText-secondary transition-colors"
                    title="Factor explanation"
                  >
                    <HelpCircle size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-bold text-xs ${
                      isPositive ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {isPositive ? `+${factor.impact}` : `${factor.impact}`}
                  </span>
                  <span className="text-[10px] text-petText-dim font-mono">pts</span>
                </div>
              </div>

              {/* Proportional Contribution Bar */}
              <div className="w-full h-2 rounded-full bg-surface-higher overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isPositive
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Explanatory text & active details */}
              <p className="text-[11px] text-petText-muted mt-1 leading-snug">
                {factor.explanation}
              </p>

              {activeFactorInfo === factor.id && (
                <div className="mt-2 p-2 rounded bg-surface text-[11px] text-petText-secondary border border-surface-border">
                  <div className="flex items-center justify-between">
                    <span className="text-petText-muted">SHAP Local Feature Weight:</span>
                    <span className="font-mono text-white">{factor.impact > 0 ? `+0.${Math.abs(factor.impact)}` : `-0.${Math.abs(factor.impact)}`}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-petText-muted">Feature Confidence:</span>
                    <span className="font-mono text-brand-teal">{factor.confidence}%</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded Technical Details */}
      {showTechnicalDetails && (
        <div className="mt-6 pt-5 border-t border-surface-border space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <AlertCircle size={14} className="text-brand-teal" />
            <span>Actuarial Model Governance &amp; Calibration Summary</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-surface-elevated border border-surface-border">
              <span className="text-[11px] text-petText-muted block mb-1">Architecture</span>
              <p className="font-mono text-white">XGBoost Actuarial v2.4</p>
              <span className="text-[10px] text-petText-dim mt-1 block">Trained with monotonicity constraints</span>
            </div>

            <div className="p-3 rounded-lg bg-surface-elevated border border-surface-border">
              <span className="text-[11px] text-petText-muted block mb-1">Uncertainty Bounds</span>
              <p className="font-mono text-white">90% CI: [58.4 – 69.1]</p>
              <span className="text-[10px] text-petText-dim mt-1 block">Gaussian process post-calibration</span>
            </div>

            <div className="p-3 rounded-lg bg-surface-elevated border border-surface-border">
              <span className="text-[11px] text-petText-muted block mb-1">Human-in-the-Loop</span>
              <p className="font-mono text-brand-teal">Discretionary Authority</p>
              <span className="text-[10px] text-petText-dim mt-1 block">Underwriter overrides bind contract</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
