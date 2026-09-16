import React, { useState } from 'react';

interface AutomationItem {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  authority: string;
  lastRun: string;
  nextRun: string;
  acuUsage: string;
  description: string;
  runLog: string[];
}

interface MobileAutomationsViewProps {
  onOpenReviewModal: () => void;
}

export const MobileAutomationsView: React.FC<MobileAutomationsViewProps> = ({
  onOpenReviewModal,
}) => {
  const [automations, setAutomations] = useState<AutomationItem[]>([
    {
      id: 'auto-1',
      name: 'Stockout Supplemental Tagging',
      status: 'Active',
      authority: 'Autonomous L4',
      lastRun: '3m ago',
      nextRun: 'in 12m',
      acuUsage: '1.42 ACU / 24h',
      description: 'Monitors available inventory and dispatches custom_label_3 HOLD tags via Google Merchant API.',
      runLog: [
        '13:20:00 - Evaluated 8,420 SKUs. 4 mutations queued.',
        '13:05:00 - Evaluated 8,420 SKUs. 0 mutations queued.',
        '12:50:00 - Evaluated 8,420 SKUs. 1 mutation verified.',
      ],
    },
    {
      id: 'auto-2',
      name: 'Margin Floor Guard Bidding',
      status: 'Active',
      authority: 'Guarded Execution',
      lastRun: '18m ago',
      nextRun: 'in 42m',
      acuUsage: '0.86 ACU / 24h',
      description: 'Calculates gross margin after ad CPC; shifts low-margin items to GUARD_HIGH tier.',
      runLog: [
        '13:05:00 - 14 SKUs shifted to GUARD_HIGH tier.',
        '12:05:00 - Margin recalculation complete. No action needed.',
      ],
    },
    {
      id: 'auto-3',
      name: 'ERP Delta Reconciliation',
      status: 'Paused',
      authority: 'Scheduled Sync',
      lastRun: '2h ago',
      nextRun: 'Paused by user',
      acuUsage: '0.22 ACU / 24h',
      description: 'Polls Adobe Commerce ERP webhook for inbound PO changes.',
      runLog: [
        '11:15:00 - Paused manually via Safety Circuit.',
      ],
    },
  ]);

  const [selectedAuto, setSelectedAuto] = useState<AutomationItem | null>(null);

  const toggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' } : a))
    );
  };

  return (
    <div className="space-y-4 pb-20 text-slate-800">
      <div className="pt-1">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Automations</h1>
        <p className="text-xs text-slate-500">Autonomous workflow registry &amp; execution status</p>
      </div>

      {/* Desktop recommended banner */}
      <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5">
        <span className="material-symbols-outlined text-[20px] text-slate-500 shrink-0 mt-0.5">laptop_mac</span>
        <div>
          <span className="font-bold text-slate-900 block">Desktop Recommended for Workflow Canvas</span>
          <span className="text-[11px] text-slate-500">
            Node-based pipeline creation is optimized for desktop. On mobile, inspect executions, pause/resume, and approve staged runs safely.
          </span>
        </div>
      </div>

      {/* AUTOMATION REGISTRY CARDS */}
      <div className="space-y-3">
        {automations.map((a) => (
          <div
            key={a.id}
            onClick={() => setSelectedAuto(a)}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-blue-300 transition-all cursor-pointer space-y-3"
          >
            {/* Top row: Name + Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-900 truncate">{a.name}</h3>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">{a.authority}</div>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                  a.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {a.status}
              </span>
            </div>

            {/* Run timing & ACU line */}
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block font-sans">Last Run</span>
                <span className="text-slate-800 font-semibold">{a.lastRun}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block font-sans">Next Run</span>
                <span className="text-slate-800 font-semibold">{a.nextRun}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block font-sans">ACU</span>
                <span className="text-blue-600 font-semibold">{a.acuUsage}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={(e) => toggleStatus(a.id, e)}
                className={`h-9 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                  a.status === 'Active'
                    ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {a.status === 'Active' ? 'Pause' : 'Resume'}
              </button>

              <span className="text-xs font-semibold text-blue-600 flex items-center gap-0.5">
                <span>Inspect run log</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL INSPECTION BOTTOM SHEET */}
      {selectedAuto && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setSelectedAuto(null)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedAuto.name}</h3>
                <span className="text-xs font-mono text-slate-400">{selectedAuto.authority}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAuto(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-600">{selectedAuto.description}</p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Recent Execution History</span>
              <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs space-y-1">
                {selectedAuto.runLog.map((log, i) => (
                  <div key={i} className="text-[11px] leading-relaxed">
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedAuto(null)}
                className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedAuto(null);
                  onOpenReviewModal();
                }}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-xs"
              >
                Review Staged Mutations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
