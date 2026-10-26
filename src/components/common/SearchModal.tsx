import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Shield, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from './RiskBadge';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, pets, assessments, claims } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredPets = trimmed
    ? pets.filter(
        p =>
          p.name.toLowerCase().includes(trimmed) ||
          p.breed.toLowerCase().includes(trimmed) ||
          p.policyId.toLowerCase().includes(trimmed)
      )
    : pets.slice(0, 4);

  const filteredAssessments = trimmed
    ? assessments.filter(
        a =>
          a.petName.toLowerCase().includes(trimmed) ||
          a.policyId.toLowerCase().includes(trimmed) ||
          a.id.toLowerCase().includes(trimmed)
      )
    : assessments.slice(0, 3);

  const filteredClaims = trimmed
    ? claims.filter(
        c =>
          c.claimNumber.toLowerCase().includes(trimmed) ||
          c.petName.toLowerCase().includes(trimmed) ||
          c.treatment.toLowerCase().includes(trimmed)
      )
    : claims.slice(0, 3);

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl bg-surface border border-surface-border shadow-cinematic overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-surface-border gap-3 bg-surface-elevated">
          <Search size={18} className="text-brand-teal shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pets, policy numbers, assessments, claims..."
            className="flex-1 bg-transparent text-sm text-white placeholder-petText-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-petText-muted hover:text-white p-1"
            >
              <X size={14} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded bg-surface-higher text-petText-dim hover:text-white text-xs px-2 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Stream */}
        <div className="overflow-y-auto p-4 space-y-6 divide-y divide-surface-border">
          {/* Pets Category */}
          {filteredPets.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-petText-muted mb-3">
                <span>Pets &amp; Animal Profiles ({filteredPets.length})</span>
                <span>Type: Animal Dossier</span>
              </div>
              <div className="space-y-1.5">
                {filteredPets.map(pet => (
                  <div
                    key={pet.id}
                    onClick={() => handleSelect(`/pets/${pet.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="w-10 h-10 rounded-lg object-cover bg-surface-higher"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white group-hover:text-brand-ivory transition-colors">
                            {pet.name}
                          </span>
                          <span className="font-mono text-[10px] text-petText-muted px-1.5 py-0.2 rounded bg-surface-higher">
                            {pet.policyId}
                          </span>
                        </div>
                        <span className="text-xs text-petText-secondary">
                          {pet.breed} · {pet.age} {pet.ageUnit} · {pet.location.split(',')[0]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiskBadge level={pet.riskLevel} size="sm" />
                      <ArrowRight size={14} className="text-petText-dim group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assessments Category */}
          {filteredAssessments.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-petText-muted mb-3">
                <span>Underwriting Assessments ({filteredAssessments.length})</span>
                <span>Type: Risk Synthesis</span>
              </div>
              <div className="space-y-1.5">
                {filteredAssessments.map(asm => (
                  <div
                    key={asm.id}
                    onClick={() => handleSelect(`/assessments/${asm.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-higher border border-surface-border flex items-center justify-center text-brand-teal">
                        <Shield size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">
                            {asm.petName} ({asm.policyId})
                          </span>
                          <span className="text-[10px] font-mono text-petText-muted">
                            Score: {asm.combinedScore}
                          </span>
                        </div>
                        <span className="text-xs text-petText-muted">
                          Rule: {asm.ruleScore} | ML: {asm.mlScore} · {asm.status}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-petText-secondary group-hover:text-white flex items-center gap-1">
                      <span>View Dossier</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Claims Category */}
          {filteredClaims.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-petText-muted mb-3">
                <span>Claims Records ({filteredClaims.length})</span>
                <span>Type: Claims Adjudication</span>
              </div>
              <div className="space-y-1.5">
                {filteredClaims.map(claim => (
                  <div
                    key={claim.id}
                    onClick={() => handleSelect(`/claims/${claim.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-higher border border-surface-border flex items-center justify-center text-petText-secondary">
                        <FileText size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">
                            {claim.claimNumber} · {claim.petName}
                          </span>
                          <span className="font-mono text-xs font-semibold text-white">
                            ₹{claim.amountInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-xs text-petText-muted truncate max-w-[280px] block">
                          {claim.treatment}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-petText-secondary group-hover:text-white flex items-center gap-1">
                      <span>Investigate</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty search state */}
          {filteredPets.length === 0 && filteredAssessments.length === 0 && filteredClaims.length === 0 && (
            <div className="py-12 text-center text-petText-muted">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium text-white">No matching records found for "{query}"</p>
              <p className="text-xs text-petText-dim mt-1">Try searching by pet name, microchip ID, or policy code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
