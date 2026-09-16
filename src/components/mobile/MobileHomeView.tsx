import React from 'react';
import { OperatingMode, RiskItem } from '../../types';

interface MobileHomeViewProps {
  operatingMode: OperatingMode;
  onNavigateToDecisions: () => void;
  onNavigateToWhy: (sku?: string) => void;
  onNavigateToRisks: () => void;
  onNavigateToApprovals: () => void;
}

export const MobileHomeView: React.FC<MobileHomeViewProps> = ({
  operatingMode,
  onNavigateToDecisions,
  onNavigateToWhy,
  onNavigateToRisks,
  onNavigateToApprovals,
}) => {
  // Mobile curated Top Risks (Max 3 items)
  const topRisks = [
    {
      sku: 'PLB-8834',
      title: 'Festool TS 55 Plunge Cut Saw',
      market: 'DE',
      exposureEur: 4200,
      affectedSkus: 4,
      currentResponse: 'HOLD Tier Applied',
      responseBadgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      reason: 'DOC dropped to 1.4d (<2.0d threshold)',
    },
    {
      sku: 'PLB-4412',
      title: 'Bosch Pro 18V Drill Kit',
      market: 'FR',
      exposureEur: 3150,
      affectedSkus: 2,
      currentResponse: 'GUARD_HIGH',
      responseBadgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      reason: 'Margin contracted to -€12.40 under ad surge',
    },
    {
      sku: 'PLB-1903',
      title: 'Makita DHS680Z Circular Saw',
      market: 'NL',
      exposureEur: 2890,
      affectedSkus: 1,
      currentResponse: 'GUARD_MEDIUM',
      responseBadgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      reason: 'ERP sync lag detected on stockout risk',
    },
  ];

  // Needs Attention actionable feed
  const needsAttention = [
    {
      id: 'item-1',
      title: '14 Staged Tier Transitions Pending',
      type: 'approval',
      description: 'Staged by engine for high-risk stockout protection in DE & FR.',
      actionLabel: 'Review approvals',
      action: onNavigateToApprovals,
      statusColor: 'text-blue-600',
      icon: 'verified_user',
    },
    {
      id: 'item-2',
      title: '0 Failed Publications',
      type: 'publication',
      description: 'Google Merchant API supplemental data source read-back verified.',
      actionLabel: 'Check feed',
      action: onNavigateToRisks,
      statusColor: 'text-emerald-600',
      icon: 'check_circle',
    },
    {
      id: 'item-3',
      title: 'Stale Data: 1 Connector Sync Queued',
      type: 'stale',
      description: 'Adobe Commerce stock delta scheduled for next sync cycle.',
      actionLabel: 'Inspect sync',
      action: onNavigateToRisks,
      statusColor: 'text-amber-600',
      icon: 'sync',
    },
    {
      id: 'item-4',
      title: '0 Connector Incidents',
      type: 'connectors',
      description: 'All 4 enterprise connectors operating within SLA (<120ms).',
      actionLabel: 'Fleet status',
      action: onNavigateToRisks,
      statusColor: 'text-slate-500',
      icon: 'cable',
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* 1. ABOVE THE FOLD: STATUS CHIPS ONLY */}
      <section className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Control Active</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold shrink-0">
          <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
          <span>Publication Healthy</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold shrink-0">
          <span className="font-mono text-blue-600 font-bold">99.2%</span>
          <span>Data Confidence</span>
        </div>
      </section>

      {/* 2. ONE LARGE PRIORITY FINANCIAL BLOCK WITH SEMANTIC SPEND GOVERNANCE */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Immediate Financial Protection
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold">
              83.7% COVERED
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              €18,420
            </span>
            <span className="text-sm font-semibold text-rose-600">At-risk Spend</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Imminent stockouts or negative margin spend identified in last 15s cycle.
          </p>
        </div>

        {/* Semantic Controlled vs Controllable Spend Distinction */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Spend Governance Boundary</span>
            <span className="font-mono text-blue-600 font-bold">€284.5k / €340.0k</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '83.7%' }} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/60 font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Controlled Spend</span>
              <span className="font-bold text-slate-900">€284,500</span>
              <span className="text-slate-500 text-[10px] block font-sans">Under active Plumb Control policy</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Controllable Spend</span>
              <span className="font-bold text-slate-900">€340,000</span>
              <span className="text-slate-500 text-[10px] block font-sans">Addressable catalog</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <span className="text-2xl font-bold text-slate-900 font-mono block">42</span>
            <span className="text-xs text-slate-500">SKUs exposed</span>
          </div>
          <div className="bg-blue-50/70 rounded-xl p-3 border border-blue-100">
            <span className="text-2xl font-bold text-blue-900 font-mono block">31</span>
            <span className="text-xs text-blue-700 font-medium">Currently under guard</span>
          </div>
        </div>

        {/* AI Provenance Footnote */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
          <span className="flex items-center gap-1 text-slate-600">
            <span className="material-symbols-outlined text-[13px] text-blue-600">auto_awesome</span>
            Deterministic · AI explained
          </span>
          <span className="text-slate-400">0.14 ACU / decision</span>
        </div>

        <button
          type="button"
          onClick={onNavigateToDecisions}
          className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <span>Review 42 Product Decisions</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>

      {/* 3. TOP RISKS (MAXIMUM 3 ITEMS) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Top Risks</h2>
            <p className="text-xs text-slate-500">Highest financial exposure right now</p>
          </div>
          <button
            type="button"
            onClick={onNavigateToRisks}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 py-1 px-2"
          >
            View all
          </button>
        </div>

        <div className="space-y-3">
          {topRisks.map((risk) => (
            <div
              key={risk.sku}
              onClick={() => onNavigateToWhy(risk.sku)}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-blue-300 active:bg-slate-50/80 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-mono font-semibold text-slate-700">{risk.sku}</span>
                    <span>·</span>
                    <span className="px-1.5 py-0.2 rounded font-mono font-bold bg-slate-100 text-slate-800">
                      {risk.market}
                    </span>
                    <span>·</span>
                    <span>{risk.affectedSkus} SKUs affected</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 truncate">{risk.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-extrabold font-mono text-rose-600 block">
                    €{risk.exposureEur.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400">exposure</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Response:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${risk.responseBadgeColor}`}>
                    {risk.currentResponse}
                  </span>
                </div>

                <span className="text-xs font-semibold text-blue-600 flex items-center gap-0.5">
                  <span>Why?</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEEDS ATTENTION */}
      <section className="space-y-3">
        <div className="px-1">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Needs Attention</h2>
          <p className="text-xs text-slate-500">Operations and pending actions</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
          {needsAttention.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700 mt-0.5">
                  <span className={`material-symbols-outlined text-[18px] ${item.statusColor}`}>
                    {item.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.description}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={item.action}
                className="h-9 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shrink-0 transition-colors"
              >
                {item.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
