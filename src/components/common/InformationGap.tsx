import React from 'react';
import { InformationGap as InformationGapType } from '../../types';
import { HelpCircle, Send, CheckCircle2, Info, FileQuestion } from 'lucide-react';

interface InformationGapProps {
  gap: InformationGapType;
  petName: string;
  assessmentId: string;
  onRequestClick: (assessmentId: string, petName: string, gapTitle: string) => void;
}

export const InformationGap: React.FC<InformationGapProps> = ({
  gap,
  petName,
  assessmentId,
  onRequestClick
}) => {
  const isRequested = gap.status === 'Requested';
  const isResolved = gap.status === 'Resolved';

  return (
    <div className="p-5 rounded-xl bg-surface-elevated border border-surface-borderLight/80 transition-all">
      {/* Top Banner explaining principle: missing info is NOT automatically a negative risk factor */}
      <div className="flex items-start gap-3 mb-3.5 pb-3 border-b border-surface-border">
        <div className="p-2 rounded-lg bg-teal-950/40 text-brand-teal border border-teal-800/40 shrink-0">
          <FileQuestion size={18} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-white">{gap.title}</h4>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${
                isResolved
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                  : isRequested
                  ? 'bg-sky-950/60 text-sky-300 border-sky-800/60'
                  : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
              }`}
            >
              {gap.status}
            </span>
          </div>
          <p className="text-xs text-petText-secondary mt-1 leading-relaxed">
            {gap.description}
          </p>
        </div>
      </div>

      {/* Clinical questions */}
      <div className="space-y-2 mb-4 bg-surface/70 p-3.5 rounded-lg border border-surface-border">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-petText-primary mb-1">
          <HelpCircle size={14} className="text-brand-teal" />
          <span>Clinical &amp; Underwriting Clarification Queries</span>
        </div>
        <ul className="space-y-1.5 text-xs text-petText-secondary pl-5 list-disc marker:text-brand-teal">
          {gap.questions.map((question, idx) => (
            <li key={idx} className="leading-snug">
              {question}
            </li>
          ))}
        </ul>
      </div>

      {/* Important ethical AI notice: missing info != higher risk */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-higher/50 border border-surface-border text-[11px] text-petText-muted mb-4">
        <Info size={14} className="text-brand-teal shrink-0" />
        <span>
          <strong>Underwriting Protocol:</strong> Additional information is required before completing the assessment. Missing clinical history is not treated as a penalty or risk escalator.
        </span>
      </div>

      {/* Action Area */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-[11px] text-petText-dim font-mono">
          {isRequested && gap.requestedAt ? (
            <span>Dispatched to clinic questionnaire on {new Date(gap.requestedAt).toLocaleDateString()}</span>
          ) : (
            <span>Clinician or pet parent response will auto-calibrate model features</span>
          )}
        </div>

        <button
          onClick={() => onRequestClick(assessmentId, petName, gap.title)}
          disabled={isResolved}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            isResolved
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40 cursor-default'
              : isRequested
              ? 'bg-surface-higher hover:bg-surface-elevated text-white border border-surface-border'
              : 'bg-brand-teal hover:bg-teal-400 text-background font-bold shadow-sm'
          }`}
        >
          {isResolved ? (
            <>
              <CheckCircle2 size={13} />
              <span>Resolved</span>
            </>
          ) : isRequested ? (
            <>
              <Send size={13} />
              <span>Resend Questionnaire</span>
            </>
          ) : (
            <>
              <Send size={13} />
              <span>Request Information</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
