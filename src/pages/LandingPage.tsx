import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PET_IMAGES } from '../data/mockData';
import {
  Shield,
  ArrowRight,
  Activity,
  Cpu,
  Stethoscope,
  CheckCircle2,
  Lock,
  Layers,
  FileText,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Users,
  Search,
  Scale
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const showcaseItems = [
    {
      id: 'risk',
      title: 'Risk Assessment',
      subtitle: 'Deterministic rules & actuarial gradient boosted model synthesis',
      image: PET_IMAGES.max,
      link: '/assessments/asm-1',
      tag: 'Dual Engine'
    },
    {
      id: 'claims',
      title: 'Claims Review',
      subtitle: 'Treatment verification, invoice benchmarking, and anomaly scoring',
      image: PET_IMAGES.vetSurgery,
      link: '/claims/cl-20831',
      tag: 'Contextual'
    },
    {
      id: 'pets',
      title: 'Pet Profiles',
      subtitle: 'Complete clinical timeline, vaccination history, and medications',
      image: PET_IMAGES.luna,
      link: '/pets/pet-1',
      tag: 'Clinical Dossier'
    },
    {
      id: 'gaps',
      title: 'Information Gaps',
      subtitle: 'Targeted veterinary inquiries without punitive risk escalation',
      image: PET_IMAGES.vetClinicClean,
      link: '/information-requests',
      tag: 'Uncertainty Protocol'
    },
    {
      id: 'analytics',
      title: 'Portfolio Analytics',
      subtitle: 'Loss ratios, breed risk patterns, and Brier calibration tracking',
      image: PET_IMAGES.bruno,
      link: '/analytics',
      tag: 'Actuarial Metrics'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080A0B] text-petText-primary selection:bg-brand-teal/20 selection:text-white">
      {/* 
        1. HERO SECTION
        Full-screen cinematic veterinary image, layered gradient, floating preview, understated tone
      */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden border-b border-[#1F2428]/60 pt-20">
        {/* Background Veterinary Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={PET_IMAGES.vetExamDog}
            alt="Veterinarian examining canine patient in modern clinic"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-105 scale-[1.01]"
          />
          {/* Layered cinematic gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(8,10,11,1) 0%, rgba(8,10,11,0.88) 32%, rgba(8,10,11,0.40) 65%, rgba(8,10,11,0.92) 100%)'
            }}
          />
          {/* Bottom fade into background */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080A0B] via-[#080A0B]/80 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Small Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-teal font-semibold">
                  PET INSURANCE INTELLIGENCE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block" />
                <span className="text-xs font-mono text-petText-dim">Guidewire Compatible</span>
              </div>

              {/* Large Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.08]">
                Understand every pet. <br className="hidden sm:inline" />
                Make every decision clearer.
              </h1>

              {/* Alternative Supporting Line */}
              <p className="text-base sm:text-lg text-petText-secondary font-light max-w-2xl leading-relaxed">
                PETRAILS brings veterinary history, insurance risk, claims intelligence, and explainable machine learning into one professional decision-support platform.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-teal hover:bg-[#139C8B] text-[#080A0B] font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-teal-500/20"
                >
                  <span>Explore PETRAILS</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/sign-in"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface/90 hover:bg-surface-elevated border border-surface-border text-white font-semibold text-sm tracking-wide transition-colors"
                >
                  <span>Sign In</span>
                </Link>
              </div>

              {/* Quiet Micro-Status */}
              <div className="pt-4 flex items-center gap-6 text-xs font-mono text-petText-muted">
                <span className="flex items-center gap-1.5">
                  <Shield size={14} className="text-brand-teal" />
                  <span>Deterministic Rules &amp; ML</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-brand-teal" />
                  <span>Human-in-the-Loop Oversight</span>
                </span>
              </div>
            </div>

            {/* Right: Floating Product Interface Preview */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Floating Mock UI Card (Subtle, authentic preview) */}
                <div className="rounded-2xl bg-surface/95 backdrop-blur-md border border-surface-borderLight p-6 shadow-cinematic space-y-4 hover:border-brand-teal/50 transition-all duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-teal font-semibold">
                      RISK ASSESSMENT
                    </span>
                    <span className="font-mono text-[10px] text-petText-muted px-2 py-0.5 rounded bg-surface-elevated border border-surface-border">
                      PT-10291
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white tracking-tight">MAX</h3>
                      <p className="text-xs text-petText-secondary mt-0.5">Golden Retriever · 6 years</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-white">64</span>
                      <span className="text-[10px] text-petText-muted block font-mono">/ 100</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-950/60 text-amber-300 border border-amber-800/60">
                      MEDIUM RISK
                    </span>
                    <span className="text-[11px] text-petText-dim font-mono">Calibrated ±3.2%</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-elevated border border-surface-border text-xs space-y-1">
                    <span className="text-[10px] uppercase font-mono text-petText-muted block">Primary Factor</span>
                    <p className="text-white font-medium">Previous orthopedic treatment (+14)</p>
                    <p className="text-[11px] text-petText-secondary">Stifle joint laxity and NSAID administration</p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs text-petText-dim">
                    <span>Guidewire PolicyCenter Ready</span>
                    <Link to="/assessments/asm-1" className="text-brand-teal hover:underline font-semibold flex items-center gap-1">
                      <span>View case</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

                {/* Subordinate Secondary Floating Element */}
                <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-surface-elevated/95 backdrop-blur-md border border-surface-border p-3.5 rounded-xl shadow-elevated">
                  <div className="w-8 h-8 rounded-lg bg-teal-950/80 text-brand-teal flex items-center justify-center border border-teal-800/60">
                    <Shield size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Statutory Discretion</span>
                    <span className="text-[10px] text-petText-muted font-mono">Underwriter holds final binding authority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        2. TRUST STRIP
        "Built for better-informed insurance decisions." + 3 concise capabilities
      */}
      <section className="border-b border-[#1F2428] bg-surface/50 py-10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-teal">Core Foundation</span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Built for better-informed insurance decisions.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
              {/* Capability 1 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-brand-teal shrink-0">
                  <Scale size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Risk Intelligence</h3>
                  <p className="text-[11px] text-petText-muted">Rule baseline + ML risk index</p>
                </div>
              </div>

              {/* Capability 2 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-brand-teal shrink-0">
                  <Activity size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-claims">Claims Intelligence</h3>
                  <p className="text-[11px] text-petText-muted">Non-accusatory anomaly indicators</p>
                </div>
              </div>

              {/* Capability 3 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-brand-teal shrink-0">
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Explainable Assessment</h3>
                  <p className="text-[11px] text-petText-muted">SHAP local factor attribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        3. WHAT PETRAILS DOES
        "Insurance intelligence built around the animal." + 4 visual sections
      */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-semibold">
            Product Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Insurance intelligence built around the animal.
          </h2>
          <p className="text-sm sm:text-base text-petText-secondary mt-3 leading-relaxed">
            PETRAILS brings together the information underwriters need to understand an animal's insurance profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Section 1: Risk Assessment */}
          <div className="p-6 rounded-2xl bg-surface border border-surface-border hover:border-surface-borderLight transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-brand-teal group-hover:border-brand-teal/50 transition-colors">
                <Scale size={20} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Risk Assessment</h3>
              <p className="text-xs text-petText-secondary leading-relaxed">
                Understand relevant health and insurance risk factors through deterministic rule matrices and calibrated predictive models.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-border/60 text-[11px] font-mono text-petText-muted flex items-center justify-between">
              <span>Breed &amp; age curves</span>
              <span className="text-brand-teal">01</span>
            </div>
          </div>

          {/* Section 2: Medical Intelligence */}
          <div className="p-6 rounded-2xl bg-surface border border-surface-border hover:border-surface-borderLight transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-brand-teal group-hover:border-brand-teal/50 transition-colors">
                <Stethoscope size={20} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Medical Intelligence</h3>
              <p className="text-xs text-petText-secondary leading-relaxed">
                Organize medical history, surgical summaries, active medications, and pre-existing condition timelines in one cohesive dossier.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-border/60 text-[11px] font-mono text-petText-muted flex items-center justify-between">
              <span>Clinic EMR Ingestion</span>
              <span className="text-brand-teal">02</span>
            </div>
          </div>

          {/* Section 3: Claims Intelligence */}
          <div className="p-6 rounded-2xl bg-surface border border-surface-border hover:border-surface-borderLight transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-brand-teal group-hover:border-brand-teal/50 transition-colors">
                <Activity size={20} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Claims Intelligence</h3>
              <p className="text-xs text-petText-secondary leading-relaxed">
                Identify unusual billing patterns, invoice deviations against regional veterinary schedules, and cases requiring human investigation.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-border/60 text-[11px] font-mono text-petText-muted flex items-center justify-between">
              <span>Non-accusatory scoring</span>
              <span className="text-brand-teal">03</span>
            </div>
          </div>

          {/* Section 4: Explainable Decisions */}
          <div className="p-6 rounded-2xl bg-surface border border-surface-border hover:border-surface-borderLight transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-brand-teal group-hover:border-brand-teal/50 transition-colors">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Explainable Decisions</h3>
              <p className="text-xs text-petText-secondary leading-relaxed">
                Understand the specific clinical and historical factors contributing to a model-assisted assessment without opaque black boxes.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-border/60 text-[11px] font-mono text-petText-muted flex items-center justify-between">
              <span>SHAP attribution</span>
              <span className="text-brand-teal">04</span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        4. PRODUCT SHOWCASE (Netflix-inspired horizontal showcase)
        "Everything your team needs to review with confidence."
      */}
      <section className="py-20 border-t border-b border-[#1F2428] bg-surface/30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-semibold">
                Platform Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Everything your team needs to review with confidence.
              </h2>
            </div>
            <Link
              to="/dashboard"
              className="text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore all workspaces</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Horizontal scroll showcase */}
          <div className="flex gap-5 overflow-x-auto pb-4 pt-1 hide-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
            {showcaseItems.map(item => (
              <Link
                key={item.id}
                to={item.link}
                className="group shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden bg-surface border border-surface-border hover:border-surface-borderLight transition-all duration-300 hover:scale-[1.03] hover:shadow-cinematic flex flex-col justify-between"
              >
                <div>
                  <div className="zoom-image-container relative h-48 w-full bg-surface-higher">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-brand-teal border border-teal-800/40 font-semibold">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-brand-ivory transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-petText-secondary leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <span className="text-xs font-semibold text-brand-teal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 
        5. HOW IT WORKS
        Four-step journey with Step 04 visually prominent:
        "PETRAILS supports professional judgment. It does not replace it."
      */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-semibold">
            Underwriting Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            How PETRAILS Works
          </h2>
          <p className="text-xs sm:text-sm text-petText-secondary mt-2">
            From policy intake to authenticated clinical decision commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-4">
            <span className="font-mono text-2xl font-extrabold text-petText-dim">01</span>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              APPLICATION
            </h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              Pet and insurance information enters PETRAILS via Guidewire PolicyCenter or digital intake forms.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-4">
            <span className="font-mono text-2xl font-extrabold text-petText-dim">02</span>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              ASSESSMENT
            </h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              Rules and machine-learning models evaluate relevant health patterns, breed profiles, and historical outcomes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-4">
            <span className="font-mono text-2xl font-extrabold text-petText-dim">03</span>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              EXPLANATION
            </h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              The platform surfaces contributing factors (+14 joint, -4 vaccine) and identifies missing documentation.
            </p>
          </div>

          {/* Step 4 (Visually Prominent) */}
          <div className="p-6 rounded-2xl bg-surface border-2 border-brand-teal shadow-elevated space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-extrabold text-brand-teal">04</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-teal text-[#080A0B] font-bold">
                FINAL AUTHORITY
              </span>
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              HUMAN REVIEW
            </h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              The authorized professional makes the final binding decision to approve, request info, or refer.
            </p>
            <div className="pt-2 border-t border-surface-border">
              <p className="text-[11px] font-semibold text-brand-ivory leading-snug">
                "PETRAILS supports professional judgment. It does not replace it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        6. EXPLAINABLE AI SECTION
        Left: "Don't just see the score. Understand it."
        Right: Mock PETRAILS assessment interface (SHAP factors)
      */}
      <section className="py-24 border-t border-surface-border bg-surface/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-semibold">
                Explainability &amp; Model Governance
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                Don't just see the score. <br />
                Understand it.
              </h2>
              <p className="text-sm sm:text-base text-petText-secondary leading-relaxed font-light">
                Every actuarial calculation provides granular local SHAP feature attribution. Underwriters can inspect why a score was assigned and evaluate the clinical justification behind each point.
              </p>
              <div className="pt-2">
                <Link
                  to="/assessments/asm-1"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-teal hover:bg-[#139C8B] text-[#080A0B] font-bold text-xs tracking-wide transition-colors"
                >
                  <span>Explore an assessment</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: Mock Assessment Interface */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-surface border border-surface-border p-6 sm:p-8 shadow-cinematic space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                  <div>
                    <span className="text-[10px] font-mono text-petText-muted uppercase">Actuarial Attribution</span>
                    <h4 className="text-base font-bold text-white">Why this assessment?</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-950/60 text-amber-300 border border-amber-800">
                      MEDIUM RISK
                    </span>
                    <span className="text-2xl font-bold font-mono text-white">64</span>
                  </div>
                </div>

                {/* Factors with horizontal contribution bars */}
                <div className="space-y-3.5 text-xs">
                  {[
                    { name: 'Previous orthopedic treatment', impact: '+14', positive: true, pct: 90 },
                    { name: 'Age bracket (6 years)', impact: '+10', positive: true, pct: 68 },
                    { name: 'Breed profile (Golden Retriever)', impact: '+8', positive: true, pct: 54 },
                    { name: 'Previous claims history', impact: '+5', positive: true, pct: 36 },
                    { name: 'Vaccination status compliance', impact: '-4', positive: false, pct: 30 }
                  ].map(f => (
                    <div key={f.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-petText-primary font-medium">{f.name}</span>
                        <span className={`font-mono font-bold ${f.positive ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {f.impact} pts
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-higher overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            f.positive
                              ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                              : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                          }`}
                          style={{ width: `${f.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-surface-elevated border border-surface-border text-[11px] text-petText-muted flex items-center justify-between">
                  <span>Confidence Score: <strong>91.4%</strong> (Brier score 0.082)</span>
                  <span className="text-brand-teal font-mono">Calibrated ±3.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        7. CLAIMS SECTION
        Cinematic image + "Claims deserve context." + Small claim interface preview (No "Fraud Detected")
      */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Cinematic Clinical Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-surface-border shadow-cinematic">
              <img
                src={PET_IMAGES.vetCatExam}
                alt="Veterinarian examining cat patient"
                className="w-full h-[400px] object-cover filter brightness-[0.85] contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30 pointer-events-none" />

              {/* Floating Claim Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface/95 backdrop-blur-md border border-surface-borderLight space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-petText-muted">CLAIM #CL-20831</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                    ANOMALY SCORE: 31% (LOW CONCERN)
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-white">MAX · Orthopedic Surgery</span>
                  <span className="text-base font-bold font-mono text-white">₹42,000</span>
                </div>
                <p className="text-[11px] text-petText-dim font-mono">
                  Billed amount aligns within standard regional veterinary surgery benchmarks (₹38,000 – ₹46,000).
                </p>
              </div>
            </div>
          </div>

          {/* Right: Copy & Context */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-semibold">
              Claims Adjudication
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Claims deserve context.
            </h2>
            <p className="text-sm sm:text-base text-petText-secondary leading-relaxed font-light">
              PETRAILS helps claims professionals review treatment information, previous claims, invoices, and unusual patterns in one workspace.
            </p>
            <div className="space-y-3 text-xs text-petText-secondary">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
                <span>Statistically benchmarks procedure pricing against local veterinary hospital data.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
                <span>Non-accusatory anomaly indicators identify signals requiring human investigation.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
                <span>Inspect digital radiographs, invoices, and surgical notes with SHA-256 verification.</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/claims/cl-20831"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface hover:bg-surface-elevated border border-surface-border text-white font-semibold text-xs transition-colors"
              >
                <span>Inspect Claim #CL-20831</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        8. INFORMATION GAPS SECTION
        Title: "Know what you don't know."
        "Missing information should trigger better questions, not automatic negative assumptions."
      */}
      <section className="py-24 border-t border-surface-border bg-surface/30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-semibold">
              Clinical Uncertainty Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Know what you don't know.
            </h2>
            <p className="text-sm sm:text-base text-petText-secondary mt-3 leading-relaxed">
              Missing information should trigger better questions, not automatic negative assumptions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Example Incomplete Record Card */}
            <div className="lg:col-span-7 rounded-2xl bg-surface border border-surface-border p-6 sm:p-8 space-y-5 shadow-cinematic">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-amber-400" />
                  <span className="font-mono text-xs font-bold text-white uppercase">
                    MEDICAL HISTORY INCOMPLETE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  Action Required
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">Orthopedic Treatment History Identified</h4>
                <p className="text-xs text-petText-secondary mt-1">
                  An orthopedic consultation was declared in 2024, but the definitive radiologic outcome and post-op joint stability are incomplete.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-2 text-xs">
                <span className="font-semibold text-petText-muted uppercase text-[10px] font-mono block">
                  Questions to ask attending veterinary clinician:
                </span>
                <ul className="list-disc pl-5 space-y-1 text-petText-secondary marker:text-brand-teal">
                  <li>What was the definitive radiologic diagnosis?</li>
                  <li>When was the latest physical examination performed?</li>
                  <li>Was surgical intervention (e.g. TPLO / TTA) required or scheduled?</li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-petText-dim font-mono">
                  Dispatches direct questionnaire to registered clinic
                </span>
                <Link
                  to="/information-requests"
                  className="px-4 py-2 rounded-lg bg-brand-teal hover:bg-[#139C8B] text-[#080A0B] font-bold text-xs transition-colors"
                >
                  Request Information
                </Link>
              </div>
            </div>

            {/* Right: Ethical AI Principle */}
            <div className="lg:col-span-5 space-y-5 p-6 rounded-2xl bg-surface-elevated/70 border border-surface-border">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-800 text-brand-teal flex items-center justify-center">
                <HelpCircle size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Calibrated Uncertainty vs Arbitrary Penalties</h3>
              <p className="text-xs text-petText-secondary leading-relaxed">
                Conventional underwriting algorithms often penalize applicants heavily when medical records have missing fields. PETRAILS instead widens the model confidence band and initiates a clinical questionnaire.
              </p>
              <div className="p-3 rounded-lg bg-surface text-[11px] font-mono text-petText-muted border border-surface-border">
                <strong>Protocol:</strong> Applications remain in active pending evaluation without adverse rate loading until veterinary clarification is filed.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        9. FOR INSURANCE TEAMS
        Roles: Underwriters, Claims Adjusters, Medical Officers, Risk Managers
      */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-14">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-teal font-semibold">
            Enterprise Deployment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Engineered for Insurance Teams
          </h2>
          <p className="text-xs sm:text-sm text-petText-secondary mt-2">
            Role-based authority limits, regulatory audit trails, and Guidewire integration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-3">
            <h3 className="text-base font-bold text-white">Underwriters</h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              Evaluate risk profiles, inspect SHAP local factor bars, apply conditional waiting periods, and bind policies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-3">
            <h3 className="text-base font-bold text-white">Claims Adjusters</h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              Verify treatment invoices against regional benchmarks, review radiographs, calculate copays, and settle payouts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-3">
            <h3 className="text-base font-bold text-white">Veterinary Medical Officers</h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              Review complex surgical discharge summaries, adjudicate breed-specific exclusions, and dispatch clinical inquiries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-3">
            <h3 className="text-base font-bold text-white">Risk &amp; Actuarial Analysts</h3>
            <p className="text-xs text-petText-secondary leading-relaxed">
              Monitor portfolio loss ratios, inspect breed risk multipliers, calibrate gradient boost weights, and audit Brier scores.
            </p>
          </div>
        </div>
      </section>

      {/* 
        10. FINAL CALL TO ACTION
      */}
      <section className="py-20 border-t border-[#1F2428] bg-gradient-to-b from-surface/50 to-background text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to bring clarity to pet insurance risk?
          </h2>
          <p className="text-sm text-petText-secondary leading-relaxed">
            Experience the production-ready underwriting and claims intelligence suite.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="px-7 py-3.5 rounded-xl bg-brand-teal hover:bg-[#139C8B] text-[#080A0B] font-bold text-sm transition-all shadow-lg hover:shadow-teal-500/20"
            >
              Launch Live Platform Demo
            </Link>
            <Link
              to="/sign-up"
              className="px-6 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface-higher border border-surface-border text-white font-semibold text-sm transition-colors"
            >
              Register Team Access
            </Link>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="border-t border-[#1F2428] bg-[#080A0B] py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-petText-dim">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-widest text-sm text-white font-sans">PETRAILS</span>
              <span>·</span>
              <span className="text-petText-secondary font-mono">Intelligent Pet Insurance Risk &amp; Claims Intelligence</span>
            </div>
            <p className="text-[11px] text-petText-dim">
              Designed for underwriters, claims adjusters, and veterinary specialty analysts.
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <Link to="/sign-in" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/sign-up" className="hover:text-white transition-colors">Sign Up</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/settings" className="hover:text-white transition-colors">Governance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
