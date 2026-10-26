import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const config = {
    LOW: {
      label: 'Low Risk',
      bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
      dot: 'bg-emerald-400',
      icon: ShieldCheck,
      aria: 'Low Risk Level'
    },
    MEDIUM: {
      label: 'Medium Risk',
      bg: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
      dot: 'bg-amber-400',
      icon: AlertTriangle,
      aria: 'Medium Risk Level'
    },
    HIGH: {
      label: 'High Risk',
      bg: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
      dot: 'bg-rose-400',
      icon: AlertCircle,
      aria: 'High Risk Level'
    }
  }[level];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold tracking-wide'
  }[size];

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }[size];

  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-md border ${config.bg} ${sizeClasses} uppercase select-none`}
      role="status"
      aria-label={config.aria}
    >
      {showIcon && <IconComponent size={iconSizes} className="shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
};
