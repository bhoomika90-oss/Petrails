import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PetCard } from '../components/common/PetCard';
import { Search, X, Grid, Columns } from 'lucide-react';

export const PetsPage: React.FC = () => {
  const { pets } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'carousel'>('grid');

  const filteredPets = pets.filter(pet => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.policyId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecies = speciesFilter === 'ALL' || pet.species === speciesFilter;
    const matchesRisk = riskFilter === 'ALL' || pet.riskLevel === riskFilter;
    const matchesStatus = statusFilter === 'ALL' || pet.policyStatus === statusFilter;

    return matchesSearch && matchesSpecies && matchesRisk && matchesStatus;
  });

  const speciesCounts = {
    ALL: pets.length,
    Dog: pets.filter(p => p.species === 'Dog').length,
    Cat: pets.filter(p => p.species === 'Cat').length
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">
            Companion Animal Library
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Pets Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-petText-secondary mt-1">
            Browse comprehensive veterinary medical dossiers, claims records, and active policy coverages.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-elevated border border-surface-border self-start sm:self-auto">
          <button
            onClick={() => setLayoutMode('grid')}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              layoutMode === 'grid' ? 'bg-surface-higher text-white' : 'text-petText-muted hover:text-white'
            }`}
            title="Grid View"
          >
            <Grid size={15} />
          </button>
          <button
            onClick={() => setLayoutMode('carousel')}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              layoutMode === 'carousel' ? 'bg-surface-higher text-white' : 'text-petText-muted hover:text-white'
            }`}
            title="Wide Carousel View"
          >
            <Columns size={15} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-4">
        {/* Top: Species Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'ALL', label: `All Pets (${speciesCounts.ALL})` },
            { id: 'Dog', label: `Dogs (${speciesCounts.Dog})` },
            { id: 'Cat', label: `Cats (${speciesCounts.Cat})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSpeciesFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                speciesFilter === tab.id
                  ? 'bg-brand-teal text-background shadow-sm'
                  : 'bg-surface-elevated text-petText-secondary hover:text-white border border-surface-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bottom: Search Input & Dropdowns */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-petText-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by pet name, breed, or policy identifier..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-white placeholder-petText-dim focus:border-brand-teal"
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

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-petText-secondary focus:border-brand-teal"
            >
              <option value="ALL">All Risk Ratings</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-petText-secondary focus:border-brand-teal"
            >
              <option value="ALL">All Policy Statuses</option>
              <option value="Active">Active Policies</option>
              <option value="Under Review">Under Review</option>
              <option value="Pending Documents">Pending Documents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pet Card Grid / Carousel Layout */}
      {filteredPets.length > 0 ? (
        layoutMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} variant="grid-card" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} variant="netflix-horizontal" />
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="p-12 text-center rounded-xl bg-surface border border-surface-border space-y-2">
          <p className="text-sm font-semibold text-white">No pet profiles match your filter criteria</p>
          <p className="text-xs text-petText-muted">Try resetting search keywords or species filters.</p>
        </div>
      )}
    </div>
  );
};
