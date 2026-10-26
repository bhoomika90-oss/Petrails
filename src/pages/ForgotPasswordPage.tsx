import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Mail, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('sarah.jenkins@petrails.insure');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080A0B] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-brand-teal shadow-subtle">
              <Shield size={19} className="text-brand-teal" />
            </div>
            <span className="font-bold tracking-widest text-xl font-sans text-white">
              PETRAILS
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Reset Terminal Password
          </h2>
          <p className="text-xs text-petText-secondary max-w-xs mx-auto">
            Enter your authorized corporate email to receive cryptographic password reset credentials.
          </p>
        </div>

        {/* Card Body */}
        <div className="p-8 rounded-3xl bg-surface border border-surface-border shadow-cinematic space-y-6">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-base font-bold text-white">Recovery Instructions Dispatched</h3>
              <p className="text-xs text-petText-secondary leading-relaxed">
                A password reset token has been sent to <strong className="text-white">{email}</strong>. Please follow the instructions in the email within 30 minutes.
              </p>
              <div className="pt-2">
                <Link
                  to="/sign-in"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-surface-elevated hover:bg-surface-higher border border-surface-border text-xs font-semibold text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-petText-secondary font-medium mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-petText-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-elevated border border-surface-border text-white text-xs placeholder-petText-dim focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-brand-teal hover:bg-[#139C8B] text-[#080A0B] font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <KeyRound size={14} />
                  <span>{isLoading ? 'Dispatching Token...' : 'Send Recovery Link'}</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/sign-in"
                  className="inline-flex items-center gap-1 text-xs text-petText-muted hover:text-white transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
