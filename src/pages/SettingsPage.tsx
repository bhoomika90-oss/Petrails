import React, { useState } from 'react';
import { Sliders, Cpu, Shield, User, Lock, Bell, Check, Save, Smartphone, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'actuarial' | 'account' | 'security' | 'notifications'>('actuarial');

  // Actuarial Settings
  const [ruleWeight, setRuleWeight] = useState<number>(40);
  const [mlWeight, setMlWeight] = useState<number>(60);
  const [lowRiskThreshold, setLowRiskThreshold] = useState<number>(40);
  const [highRiskThreshold, setHighRiskThreshold] = useState<number>(70);
  const [anomalyTolerance, setAnomalyTolerance] = useState<number>(35);

  // Account Settings
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.jenkins@petrails.insure');
  const [officeLocation, setOfficeLocation] = useState('Bengaluru Speciality Underwriting Hub');
  const [phone, setPhone] = useState('+91 98450 11234');

  // Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notifications
  const [notifyOnNewClaims, setNotifyOnNewClaims] = useState(true);
  const [notifyOnInfoResolved, setNotifyOnInfoResolved] = useState(true);
  const [notifyOnAnomalyFlag, setNotifyOnAnomalyFlag] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleRuleWeightChange = (newRule: number) => {
    setRuleWeight(newRule);
    setMlWeight(100 - newRule);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">
            Terminal Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Account &amp; Platform Settings
          </h1>
          <p className="text-xs sm:text-sm text-petText-secondary mt-1">
            Manage your personal underwriter profile, security keys, and actuarial model weights.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-semibold animate-in fade-in">
            <Check size={14} />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 border-b border-surface-border">
        {[
          { id: 'actuarial', label: 'Actuarial & Rules', icon: Cpu },
          { id: 'account', label: 'Account Profile', icon: User },
          { id: 'security', label: 'Security & Auth', icon: Lock },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                active
                  ? 'border-brand-teal text-white bg-surface-elevated/40'
                  : 'border-transparent text-petText-secondary hover:text-white'
              }`}
            >
              <Icon size={14} className={active ? 'text-brand-teal' : 'text-petText-dim'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Actuarial Settings */}
        {activeTab === 'actuarial' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Synthesis Weighting */}
            <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-5 shadow-cinematic">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Cpu size={18} className="text-brand-teal" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Synthesis Weighting Architecture
                  </h3>
                </div>
                <span className="text-xs font-mono text-petText-muted">Total: 100%</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-mono mb-2">
                    <span className="text-white font-semibold">Deterministic Guidewire Rule Engine: {ruleWeight}%</span>
                    <span className="text-brand-teal font-semibold">Gradient Boosted Actuarial ML: {mlWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={ruleWeight}
                    onChange={e => handleRuleWeightChange(parseInt(e.target.value))}
                    className="w-full accent-brand-teal cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-petText-dim font-mono mt-1">
                    <span>Heavy Rule Reliance (10%)</span>
                    <span>Balanced Baseline (40/60)</span>
                    <span>Heavy ML Reliance (90%)</span>
                  </div>
                </div>

                <p className="text-[11px] text-petText-muted leading-relaxed">
                  Rules strictly enforce statutory canine age caps, dangerous breed exclusion lists, and policy deductible minimums. The ML model predicts historical claim incidence from veterinary health vectors.
                </p>
              </div>
            </div>

            {/* Risk Categorization Bands */}
            <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-5 shadow-cinematic">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-brand-teal" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Actuarial Risk Categorization Bands
                  </h3>
                </div>
                <span className="text-xs font-mono text-brand-teal">Brier Calibrated</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-2">
                  <label className="block text-petText-secondary font-medium">
                    Low Risk Ceiling (Standard Auto-Bind)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="20"
                      max="50"
                      value={lowRiskThreshold}
                      onChange={e => setLowRiskThreshold(parseInt(e.target.value))}
                      className="w-24 px-3 py-1.5 rounded-lg bg-surface border border-surface-border font-mono text-white text-xs"
                    />
                    <span className="text-petText-dim font-mono">Index score (currently &lt; {lowRiskThreshold})</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-2">
                  <label className="block text-petText-secondary font-medium">
                    High Risk Floor (Senior Review Referral)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="60"
                      max="90"
                      value={highRiskThreshold}
                      onChange={e => setHighRiskThreshold(parseInt(e.target.value))}
                      className="w-24 px-3 py-1.5 rounded-lg bg-surface border border-surface-border font-mono text-white text-xs"
                    />
                    <span className="text-petText-dim font-mono">Index score (currently &gt; {highRiskThreshold})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Anomaly Tolerance */}
            <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-5 shadow-cinematic">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-brand-teal" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Non-Accusatory Anomaly Sensitivity
                  </h3>
                </div>
                <span className="text-xs font-mono text-petText-muted">Market Benchmark Matrix</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-petText-secondary">Invoice Regional Benchmark Variance Tolerance:</span>
                  <span className="text-white font-bold">{anomalyTolerance}% Deviation</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  value={anomalyTolerance}
                  onChange={e => setAnomalyTolerance(parseInt(e.target.value))}
                  className="w-full accent-brand-teal cursor-pointer"
                />
                <p className="text-[11px] text-petText-muted">
                  Claims with surgical charges deviating by more than {anomalyTolerance}% from the Bengaluru, Mumbai, or Delhi metropolitan veterinary schedule trigger secondary review.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Account Profile */}
        {activeTab === 'account' && (
          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-5 shadow-cinematic animate-in fade-in duration-150 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Authorized Underwriting Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-petText-secondary font-medium mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-elevated border border-surface-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-petText-secondary font-medium mb-1">Corporate Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-elevated border border-surface-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-petText-secondary font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-elevated border border-surface-border text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-petText-secondary font-medium mb-1">Operating Regional Hub</label>
                <input
                  type="text"
                  value={officeLocation}
                  onChange={e => setOfficeLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-elevated border border-surface-border text-white text-xs"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-elevated border border-surface-border text-[11px] text-petText-muted">
              Professional credentials (CPCU, IRDAI Statutory License) are bound to your organizational SSO identity and require compliance committee clearance to modify.
            </div>
          </div>
        )}

        {/* Tab 3: Security & Auth */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-6 shadow-cinematic animate-in fade-in duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Authentication &amp; Session Controls
              </h3>
              <span className="font-mono text-emerald-400 text-xs flex items-center gap-1">
                <Check size={13} />
                <span>IRDAI Security Baseline Met</span>
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-surface-border">
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-brand-teal" />
                <div>
                  <h4 className="font-semibold text-white">Two-Factor Authentication (FIDO2 / TOTP)</h4>
                  <p className="text-[11px] text-petText-muted">Mandatory for binding claims &gt; ₹1,00,000</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={e => setTwoFactorEnabled(e.target.checked)}
                className="w-4 h-4 accent-brand-teal"
              />
            </div>

            <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-2">
              <span className="text-[10px] font-mono uppercase text-petText-muted block">Active Sessions</span>
              <div className="flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold text-white">Bengaluru Hub (This Terminal)</p>
                  <p className="text-petText-dim font-mono text-[11px]">IP: 10.75.124.145 · Active Now</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                  Current Session
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notifications */}
        {activeTab === 'notifications' && (
          <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-5 shadow-cinematic animate-in fade-in duration-150 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Real-Time Alert Routing
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-elevated border border-surface-border cursor-pointer">
                <div>
                  <p className="font-semibold text-white">New Assessment Ingestion Alerts</p>
                  <p className="text-[11px] text-petText-muted">Trigger when ML feature extraction completes</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyOnNewClaims}
                  onChange={e => setNotifyOnNewClaims(e.target.checked)}
                  className="w-4 h-4 accent-brand-teal"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-elevated border border-surface-border cursor-pointer">
                <div>
                  <p className="font-semibold text-white">Clinical Information Receipt Notification</p>
                  <p className="text-[11px] text-petText-muted">Trigger when hospital uploads requested operative record</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyOnInfoResolved}
                  onChange={e => setNotifyOnInfoResolved(e.target.checked)}
                  className="w-4 h-4 accent-brand-teal"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-elevated border border-surface-border cursor-pointer">
                <div>
                  <p className="font-semibold text-white">Elevated Anomaly Flag Webhook</p>
                  <p className="text-[11px] text-petText-muted">Immediate alert when invoice deviation exceeds threshold</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyOnAnomalyFlag}
                  onChange={e => setNotifyOnAnomalyFlag(e.target.checked)}
                  className="w-4 h-4 accent-brand-teal"
                />
              </label>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-teal hover:bg-[#139C8B] text-[#080A0B] font-bold text-xs tracking-wide transition-colors shadow-md"
          >
            <Save size={14} />
            <span>Save Configuration Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
