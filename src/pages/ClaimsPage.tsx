import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClaimCard } from '../components/common/ClaimCard';
import { Search, X, CheckCircle2, Clock } from 'lucide-react';

export const ClaimsPage: React.FC = () => {
  const { claims } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Under Review' | 'Attention' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClaims = claims.filter(c => {
    const matchesSearch =
      c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.treatment.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'All') return true;
    if (activeTab === 'Under Review') return c.status === 'Under Review';
    if (activeTab === 'Attention') return c.status === 'Attention Required' || c.status === 'Flagged';
    if (activeTab === 'Completed') return c.status === 'Approved' || c.status === 'Settled';
    return true;
  });

  const tabCounts = {
    All: claims.length,
    'Under Review': claims.filter(c => c.status === 'Under Review').length,
    Attention: claims.filter(c => c.status === 'Attention Required' || c.status === 'Flagged').length,
    Completed: claims.filter(c => c.status === 'Approved' || c.status === 'Settled').length
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">
            Claims Adjudication Workspace
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Claims Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-petText-secondary mt-1">
            Investigate treatment authenticity, procedure invoices, and non-accusatory anomaly indicators.
          </p>
        </div>

        {/* Total Adjudication Value summary */}
        <div className="p-3 rounded-xl bg-surface border border-surface-border flex items-center gap-4 text-xs font-mono self-start sm:self-auto">
          <div>
            <span className="text-[10px] text-petText-muted uppercase block">Active In Review</span>
            <span className="text-base font-bold text-white">₹70,400</span>
          </div>
          <div className="h-6 w-px bg-surface-border" />
          <div>
            <span className="text-[10px] text-petText-muted uppercase block">Settled (MTD)</span>
            <span className="text-base font-bold text-brand-teal">₹1,84,200</span>
          </div>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-4">
        {/* Netflix-inspired Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'All', label: 'All Claims', count: tabCounts.All, icon: null },
            { id: 'Under Review', label: 'Under Review', count: tabCounts['Under Review'], icon: Clock },
            { id: 'Attention', label: 'Attention Required', count: tabCounts.Attention, icon: null },
            { id: 'Completed', label: 'Completed & Settled', count: tabCounts.Completed, icon: CheckCircle2 }
          ].map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-brand-teal text-background shadow-sm'
                    : 'bg-surface-elevated text-petText-secondary hover:text-white border border-surface-border'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-background/30 text-background' : 'bg-surface-higher text-petText-muted'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-petText-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by claim number, pet name, or veterinary treatment..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-white placeholder-petText-dim focus:border-brand-teal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-petText-muted hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Claim Cards Grid (Netflix-inspired with restrained imagery) */}
      {filteredClaims.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClaims.map(claim => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl bg-surface border border-surface-border space-y-2">
          {/* Meaningful empty state requirement */}
          <CheckCircle2 size={32} className="mx-auto text-emerald-400 opacity-60 mb-2" />
          <p className="text-sm font-semibold text-white">No claims require your attention</p>
          <p className="text-xs text-petText-muted">Your review queue is clear for this filter category.</p>
        </div>
      )}
    </div>
  );
};
