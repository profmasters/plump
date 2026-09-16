import React, { useState } from 'react';

interface MobileApprovalFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export const MobileApprovalFlow: React.FC<MobileApprovalFlowProps> = ({
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [secondApproverSigned, setSecondApproverSigned] = useState(false);
  const requiresFourEyes = true;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] text-slate-800 flex flex-col animate-in slide-in-from-bottom duration-250">
      {/* Mobile Top Header */}
      <header className="h-14 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between shrink-0 shadow-2xs">
        <button
          type="button"
          onClick={onClose}
          className="h-10 px-2 -ml-2 rounded-xl text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
          <span className="text-xs font-bold">Cancel</span>
        </button>

        <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          Protected Action Review
        </span>
      </header>

      {/* Main Review Content (Strict Sequential Order as mandated) */}
      <main className="flex-1 overflow-y-auto p-4 pb-28 space-y-4 max-w-lg mx-auto w-full">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Review Staged Changes</h1>
          <p className="text-xs text-slate-500">Autonomous mutation verification before dispatch</p>
        </div>

        {/* 1. WHAT WILL CHANGE */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            1. What will change
          </span>
          <h2 className="text-sm font-bold text-slate-900">
            Batch Tier Mutation: 14 SKUs transitioning to HOLD
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Google Merchant API supplemental data source custom_label_3 values will be rewritten from
            <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded mx-1 font-mono">NORMAL</code>
            to
            <code className="text-rose-700 bg-rose-50 px-1 py-0.5 rounded mx-1 font-mono font-bold">HOLD</code>.
          </p>
        </section>

        {/* 2. SCOPE */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            2. Scope
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">Tenant Storefront</span>
              <span className="font-bold text-slate-900">Nordic Tech AB</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">Target Channel</span>
              <span className="font-bold text-blue-600">Google Merchant API</span>
            </div>
          </div>
        </section>

        {/* 3. FINANCIAL EXPOSURE */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            3. Financial exposure
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-emerald-600">€18,420</span>
            <span className="text-xs font-semibold text-slate-700">Ad spend preserved from out-of-stock waste</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Current burn rate: €614/day across active Smart Bidding campaigns.
          </div>
        </section>

        {/* 4. PRODUCTS / MARKETS */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              4. Products / markets
            </span>
            <span className="text-xs font-mono font-semibold text-slate-600">14 SKUs</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { sku: 'PLB-8834', name: 'Festool TS 55 Plunge Cut Saw', market: 'DE', spend: '€2.4k' },
              { sku: 'PLB-4412', name: 'Bosch Professional 18V Drill Kit', market: 'FR', spend: '€3.1k' },
              { sku: 'PLB-1903', name: 'Makita DHS680Z Circular Saw', market: 'NL', spend: '€2.8k' },
            ].map((p) => (
              <div key={p.sku} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 truncate max-w-[210px]">{p.name}</div>
                  <div className="text-[11px] font-mono text-slate-500">{p.sku} · {p.market}</div>
                </div>
                <span className="font-mono font-bold text-slate-700">{p.spend}</span>
              </div>
            ))}
            <div className="text-center text-[11px] text-slate-400 font-medium">+11 additional products</div>
          </div>
        </section>

        {/* 5. WHY */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            5. Why
          </span>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
            <div className="font-bold font-mono text-slate-900">Rule INV_STOCKOUT_48H triggered</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Available-To-Sell (ATS) is exhausted and projected run-rate is under 48 hours. Inbound replenishment PO is
              delayed by 3.5 days.
            </p>
          </div>
        </section>

        {/* 6. ROLLBACK READINESS */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            6. Rollback readiness
          </span>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">verified</span>
            <span>Instant Rollback Snapshot verified (ETA &lt; 30s)</span>
          </div>
        </section>

        {/* 7. APPROVAL REQUIREMENT (FOUR-EYES GOVERNANCE) */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              7. Approval requirement
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900">
              Four-Eyes Enforced
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-900">Approver 1: Henrik S. (Enterprise Admin)</span>
              <span className="text-emerald-700 font-mono font-bold">✓ Signed</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-amber-200/60">
              <span className="font-semibold text-amber-900">Approver 2: Finance Governance</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={secondApproverSigned}
                  onChange={(e) => setSecondApproverSigned(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-bold text-slate-800">Co-sign</span>
              </label>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY ACTION FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 max-w-lg mx-auto flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            onReject();
            onClose();
          }}
          className="flex-1 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center"
        >
          Reject
        </button>

        <button
          type="button"
          disabled={requiresFourEyes && !secondApproverSigned}
          onClick={() => {
            onApprove();
            onClose();
          }}
          className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Approve changes</span>
          <span className="material-symbols-outlined text-[16px]">check</span>
        </button>
      </footer>
    </div>
  );
};
