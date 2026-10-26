import React from 'react';
import { MedicalRecord } from '../../types';
import { Stethoscope, CheckCircle, Building2, User } from 'lucide-react';

interface TimelineProps {
  records: MedicalRecord[];
}

export const Timeline: React.FC<TimelineProps> = ({ records }) => {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-border">
      {records.map((rec, index) => (
        <div key={rec.id} className="relative group">
          {/* Timeline marker icon */}
          <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-surface-elevated border-2 border-brand-teal text-brand-teal flex items-center justify-center text-xs shrink-0 shadow-sm group-hover:scale-110 transition-transform">
            <Stethoscope size={12} />
          </div>

          {/* Record card */}
          <div className="p-4 sm:p-5 rounded-xl bg-surface border border-surface-border hover:border-surface-borderLight transition-all duration-200">
            {/* Header: Date, Event title, Clinic */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-surface-border">
              <div>
                <span className="text-[11px] font-mono text-brand-teal font-medium tracking-wide">
                  {rec.date}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {rec.event}
                </h4>
              </div>

              <div className="flex items-center gap-2 text-xs text-petText-muted">
                <Building2 size={13} className="text-petText-dim shrink-0" />
                <span className="truncate max-w-[220px]">{rec.clinicName}</span>
              </div>
            </div>

            {/* Medical details: Diagnosis, Treatment, Outcome */}
            <div className="mt-3.5 space-y-2.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                <span className="sm:col-span-3 text-petText-muted font-medium">Diagnosis:</span>
                <span className="sm:col-span-9 text-petText-primary font-medium">{rec.diagnosis}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                <span className="sm:col-span-3 text-petText-muted font-medium">Treatment:</span>
                <span className="sm:col-span-9 text-petText-secondary">{rec.treatment}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                <span className="sm:col-span-3 text-petText-muted font-medium">Clinical Outcome:</span>
                <div className="sm:col-span-9 flex items-start gap-1.5 text-emerald-300">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{rec.outcome}</span>
                </div>
              </div>

              {rec.veterinarian && (
                <div className="pt-2 border-t border-surface-border/60 flex items-center gap-1.5 text-[11px] text-petText-dim">
                  <User size={12} />
                  <span>Attending Clinician: {rec.veterinarian}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
