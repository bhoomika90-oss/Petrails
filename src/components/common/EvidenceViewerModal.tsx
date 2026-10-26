import React from 'react';
import { X, CheckCircle2, FileText, Download, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EvidenceViewerModal: React.FC = () => {
  const { evidenceViewerModal, closeEvidenceModal } = useApp();
  const evidence = evidenceViewerModal.evidence;

  if (!evidenceViewerModal.isOpen || !evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-surface border border-surface-border shadow-cinematic overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-border flex items-center justify-between bg-surface-elevated">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-800/40 text-brand-teal">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{evidence.title}</h3>
              <div className="flex items-center gap-2 text-xs text-petText-muted font-mono mt-0.5">
                <span>{evidence.type}</span>
                <span>·</span>
                <span>{evidence.date}</span>
                <span>·</span>
                <span>{evidence.fileSize}</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeEvidenceModal}
            className="p-1.5 rounded-md hover:bg-surface-higher text-petText-muted hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Viewer Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Verification Badge */}
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-300 font-medium">
              <CheckCircle2 size={16} />
              <span>Veterinary Digital Stamp &amp; Cryptographic Signature Authenticated</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              SHA-256 VERIFIED
            </span>
          </div>

          {/* Clinical Provenance Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-surface-elevated border border-surface-border">
              <span className="text-[11px] text-petText-muted block mb-1">Authorizing Institution</span>
              <p className="font-semibold text-white">{evidence.source}</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-elevated border border-surface-border">
              <span className="text-[11px] text-petText-muted block mb-1">Chain of Custody</span>
              <p className="font-mono text-petText-secondary">Direct Hospital EMR Integration API</p>
            </div>
          </div>

          {/* Clinical summary notes */}
          <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-mono">
              Clinical Findings &amp; Operative Annotation
            </h4>
            <p className="text-petText-secondary leading-relaxed font-sans text-xs">
              {evidence.notes}
            </p>
            <div className="pt-2 border-t border-surface-border text-[11px] text-petText-dim flex items-center gap-2">
              <Shield size={12} className="text-brand-teal" />
              <span>Preserves patient confidentiality under Veterinary Health Records Compliance standard</span>
            </div>
          </div>

          {/* Simulated Document Preview Area */}
          <div className="border border-surface-border rounded-xl p-6 bg-surface-higher/30 text-center space-y-3">
            <div className="w-16 h-20 mx-auto rounded border border-surface-border bg-surface-elevated flex flex-col items-center justify-center text-petText-muted shadow-sm">
              <FileText size={28} className="text-brand-teal mb-1" />
              <span className="font-mono text-[9px] uppercase">PDF / DICOM</span>
            </div>
            <p className="text-xs text-white font-medium">
              {evidence.title} ({evidence.fileSize})
            </p>
            <p className="text-[11px] text-petText-muted max-w-sm mx-auto">
              Original clinical document rendered with high-fidelity vector curves and diagnostic DICOM metadata tags.
            </p>
            <button
              onClick={() => alert(`Downloading signed copy of ${evidence.title}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-higher border border-surface-border text-xs font-medium text-white transition-colors"
            >
              <Download size={13} />
              <span>Download Authenticated Copy</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-elevated flex items-center justify-end">
          <button
            onClick={closeEvidenceModal}
            className="px-4 py-2 rounded-lg bg-surface-higher hover:bg-surface-elevated text-xs font-semibold text-white transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
