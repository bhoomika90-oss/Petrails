import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'button';
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ className = '', variant = 'text' }) => {
  const baseClasses = 'bg-surface-elevated animate-shimmer rounded';

  if (variant === 'circle') {
    return <div className={`rounded-full ${baseClasses} ${className}`} />;
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 rounded-xl border border-surface-border bg-surface ${className}`}>
        <div className="h-32 w-full rounded-lg bg-surface-elevated animate-shimmer mb-3" />
        <div className="h-4 w-3/4 rounded bg-surface-elevated animate-shimmer mb-2" />
        <div className="h-3 w-1/2 rounded bg-surface-elevated animate-shimmer" />
      </div>
    );
  }

  return <div className={`${baseClasses} ${className}`} />;
};
