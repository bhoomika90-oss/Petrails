import React from 'react';
import { Link } from 'react-router-dom';
import { Claim } from '../../types';
import { ArrowUpRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface ClaimCardProps {
  claim: Claim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const statusStyles = {
    'Under Review': {
      badge: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
      icon: Clock
    },
    'Attention Required': {
      badge: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
      icon: AlertCircle
    },
    'Approved': {
      badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
      icon: CheckCircle2
    },
    'Settled': {
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      icon: CheckCircle2
    },
    'Flagged': {
      badge: 'bg-rose-950/80 text-rose-400 border-rose-700',
      icon: AlertCircle
    }
  }[claim.status];

  const StatusIcon = statusStyles.icon;

  return (
    <div className="group rounded-xl bg-surface border border-surface-border hover:border-surface-borderLight transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-subtle">
      <div>
        {/* Top Header: Claim ID & Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-petText-muted">
              {claim.claimNumber}
            </span>
            <span className="text-petText-dim">·</span>
            <span className="text-xs text-petText-muted">{claim.date}</span>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium border ${statusStyles.badge}`}>
            <StatusIcon size={12} />
            <span>{claim.status}</span>
          </span>
        </div>

        {/* Pet Name & Breed header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-surface-higher">
            <img
              src={claim.imageUrl}
              alt={claim.petName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-brand-ivory transition-colors">
              {claim.petName.toUpperCase()}
            </h3>
            <p className="text-xs text-petText-secondary">{claim.breed} · {claim.species}</p>
          </div>
        </div>

        {/* Treatment description */}
        <div className="py-2.5 px-3 rounded-lg bg-surface-elevated border border-surface-border mb-3">
          <span className="text-[11px] text-petText-muted block mb-0.5">Procedure &amp; Treatment</span>
          <p className="text-xs font-medium text-petText-primary line-clamp-1">{claim.treatment}</p>
        </div>

        {/* Amount & Anomaly indicator */}
        <div className="flex items-center justify-between pt-1 mb-2">
          <div>
            <span className="text-[11px] text-petText-muted block">Claimed Amount</span>
            <span className="text-xl font-bold font-mono text-white">
              ₹{claim.amountInr.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-petText-muted block">Anomaly Score</span>
            <span className={`text-xs font-mono font-semibold ${
              claim.anomalyScore > 40 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {claim.anomalyScore}% ({claim.anomalyLevel})
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-3 border-t border-surface-border">
        <Link
          to={`/claims/${claim.id}`}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-elevated hover:bg-surface-higher border border-surface-border text-xs font-semibold text-white transition-colors"
        >
          <span>Investigate Claim</span>
          <ArrowUpRight size={13} className="text-brand-teal" />
        </Link>
      </div>
    </div>
  );
};
