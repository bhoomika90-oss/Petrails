import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon?: LucideIcon;
  variant?: 'default' | 'accent' | 'warning' | 'teal';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  icon: Icon,
  variant = 'default',
  onClick
}) => {
  const variantStyles = {
    default: 'border-surface-border bg-surface hover:border-surface-borderLight',
    accent: 'border-brand-teal/40 bg-surface hover:border-brand-teal',
    warning: 'border-amber-900/40 bg-surface hover:border-amber-700/60',
    teal: 'border-teal-900/40 bg-surface hover:border-teal-700/60'
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-200 ${variantStyles} ${
        onClick ? 'cursor-pointer hover:bg-surface-elevated' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-petText-muted tracking-wide">{label}</span>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-surface-elevated border border-surface-border text-petText-secondary">
            <Icon size={14} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
        {trend && (
          <span
            className={`text-[11px] font-medium font-mono px-1.5 py-0.5 rounded ${
              trend.isNeutral
                ? 'text-petText-muted bg-surface-higher'
                : trend.isPositive
                ? 'text-emerald-400 bg-emerald-950/40'
                : 'text-amber-400 bg-amber-950/40'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtext && <p className="text-[11px] text-petText-dim mt-1.5 line-clamp-1">{subtext}</p>}
    </div>
  );
};
