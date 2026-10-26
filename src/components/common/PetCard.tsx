import React from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '../../types';
import { RiskBadge } from './RiskBadge';
import { ArrowRight, FileText } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  variant?: 'netflix-horizontal' | 'grid-card';
  customStatusLabel?: string;
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  variant = 'netflix-horizontal',
  customStatusLabel
}) => {
  const assessmentId =
    pet.id === 'pet-1'
      ? 'asm-1'
      : pet.id === 'pet-2'
      ? 'asm-2'
      : pet.id === 'pet-3'
      ? 'asm-3'
      : pet.id === 'pet-4'
      ? 'asm-4'
      : pet.id === 'pet-5'
      ? 'asm-5'
      : pet.id === 'pet-6'
      ? 'asm-6'
      : pet.id === 'pet-7'
      ? 'asm-7'
      : 'asm-8';

  const riskDotColor = {
    LOW: 'bg-emerald-400',
    MEDIUM: 'bg-amber-400',
    HIGH: 'bg-rose-400'
  }[pet.riskLevel];

  // Netflix Horizontal Card Format (~240-270px wide, 65-75% image height)
  return (
    <div className="group relative shrink-0 w-[250px] sm:w-[268px] rounded-xl overflow-hidden bg-surface border border-surface-border/60 hover:border-surface-borderLight transition-all duration-300 hover:scale-[1.03] hover:shadow-cinematic cursor-pointer flex flex-col">
      {/* Top 70% Image Container with Zoom */}
      <div className="zoom-image-container relative h-[240px] w-full bg-surface-higher overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={`${pet.name} - ${pet.breed}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Gradient overlays: top vignette and bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-black/30 pointer-events-none" />

        {/* Policy tag top left */}
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-petText-secondary border border-white/10">
            {pet.policyId}
          </span>
        </div>

        {/* Risk / Status Badge top right */}
        <div className="absolute top-3 right-3">
          <RiskBadge level={pet.riskLevel} size="sm" />
        </div>

        {/* Floating Quick Action Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/assessments/${assessmentId}`}
            className="w-full py-2 px-3 rounded-lg bg-brand-teal hover:bg-[#139C8B] text-[#080A0B] text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg transition-transform"
          >
            <FileText size={13} />
            <span>Review Assessment</span>
          </Link>
        </div>
      </div>

      {/* Card Metadata (Bottom 30%) */}
      <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between bg-surface">
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-bold tracking-tight text-white group-hover:text-brand-ivory transition-colors">
              {pet.name.toUpperCase()}
            </h3>
            <span className="text-[11px] font-mono text-petText-muted">
              {pet.age} {pet.ageUnit}
            </span>
          </div>

          <p className="text-xs text-petText-secondary">
            {pet.breed} · {pet.sex}
          </p>
        </div>

        {/* Status indicator line */}
        <div className="flex items-center justify-between text-xs pt-1.5 border-t border-surface-border/40">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${riskDotColor}`} />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-petText-primary">
              {customStatusLabel || `${pet.riskLevel} RISK`}
            </span>
          </div>

          <Link
            to={`/pets/${pet.id}`}
            className="text-[11px] text-petText-dim hover:text-brand-teal transition-colors flex items-center gap-0.5"
            title="Open Pet Profile"
          >
            <span>Dossier</span>
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
};
