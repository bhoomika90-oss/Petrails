import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AssessmentCard } from '../components/common/AssessmentCard';
import { DataTable } from '../components/common/DataTable';
import { Search, Plus, SlidersHorizontal, X } from 'lucide-react';
import { RiskLevel, Species } from '../types';

export const AssessmentsPage: React.FC = () => {
  const { assessments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [missingInfoOnly, setMissingInfoOnly] = useState<boolean>(false);

  // Filter logic
  const filtered = assessments.filter(asm => {
    const matchesSearch =
      asm.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asm.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asm.policyId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = selectedRisk === 'ALL' || asm.riskLevel === selectedRisk;
    const matchesSpecies = selectedSpecies === 'ALL' || asm.species === selectedSpecies;
    const matchesStatus = selectedStatus === 'ALL' || asm.status === selectedStatus;
    const matchesGaps = !missingInfoOnly || asm.informationGapsCount > 0;

    return matchesSearch && matchesRisk && matchesSpecies && matchesStatus && matchesGaps;
  });

  // Priority cards for top hybrid section
  const priorityCases = filtered.slice(0, 3);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRisk('ALL');
    setSelectedSpecies('ALL');
    setSelectedStatus('ALL');
    setMissingInfoOnly(false);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedRisk !== 'ALL' ||
    selectedSpecies !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    missingInfoOnly;

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">
            Underwriting Intake &amp; Decision Queue
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Assessments
          </h1>
          <p className="text-xs sm:text-sm text-petText-secondary mt-1">
            Review animal risk profiles and underwriting recommendations.
          </p>
        </div>

        <Link
          to="/assessments/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-teal hover:bg-teal-400 text-background font-semibold text-xs tracking-wide transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus size={15} />
          <span>New Risk Assessment</span>
        </Link>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-petText-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by pet name, breed, or policy identifier..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-white placeholder-petText-dim focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-petText-muted hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Risk filter */}
            <select
              value={selectedRisk}
              onChange={e => setSelectedRisk(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-petText-secondary focus:border-brand-teal focus:text-white"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>

            {/* Species filter */}
            <select
              value={selectedSpecies}
              onChange={e => setSelectedSpecies(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-petText-secondary focus:border-brand-teal focus:text-white"
            >
              <option value="ALL">All Species</option>
              <option value="Dog">Canine (Dog)</option>
              <option value="Cat">Feline (Cat)</option>
            </select>

            {/* Status filter */}
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-petText-secondary focus:border-brand-teal focus:text-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Information Requested">Information Requested</option>
              <option value="Attention Required">Attention Required</option>
              <option value="Referred">Referred</option>
            </select>

            {/* Missing Info toggle button */}
            <button
              type="button"
              onClick={() => setMissingInfoOnly(!missingInfoOnly)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                missingInfoOnly
                  ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                  : 'border-surface-border bg-surface-elevated text-petText-secondary hover:text-white'
              }`}
            >
              <SlidersHorizontal size={12} />
              <span>Missing Info Only</span>
            </button>

            {/* Reset button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 rounded-lg text-xs text-petText-muted hover:text-white hover:bg-surface-elevated transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Count summary */}
        <div className="flex items-center justify-between text-[11px] font-mono text-petText-dim pt-2 border-t border-surface-border/60">
          <span>Showing {filtered.length} of {assessments.length} assessment records</span>
          <span>Dual-Engine Synthesis: Deterministic Rule Matrix + XGBoost Actuarial ML</span>
        </div>
      </div>

      {/* Hybrid Layout Part 1: Large Visual Priority Cards at Top */}
      {priorityCases.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Priority Underwriting Cases</span>
              <span className="text-xs font-mono text-brand-teal bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                Action Pending
              </span>
            </h2>
            <span className="text-xs text-petText-dim">Hybrid Visual View</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {priorityCases.map(asm => (
              <AssessmentCard key={asm.id} assessment={asm} />
            ))}
          </div>
        </section>
      )}

      {/* Hybrid Layout Part 2: Dense Table/List below for Professional Review */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            Complete Underwriting Registry
          </h2>
          <span className="text-xs font-mono text-petText-muted">
            Sortable Matrix
          </span>
        </div>

        {filtered.length > 0 ? (
          <DataTable assessments={filtered} />
        ) : (
          <div className="p-12 text-center rounded-xl bg-surface border border-surface-border space-y-3">
            <p className="text-sm font-semibold text-white">No assessments match your current filter criteria</p>
            <p className="text-xs text-petText-dim">Try clearing your filters or search keywords.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg bg-surface-elevated hover:bg-surface-higher text-xs font-medium text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
