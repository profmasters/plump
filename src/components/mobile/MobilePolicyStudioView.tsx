import React, { useState } from 'react';
import { GUARD_MODULES } from '../../data/mockData';

interface MobilePolicyStudioViewProps {
  onOpenSimulation: () => void;
  onOpenReviewModal: () => void;
}

export const MobilePolicyStudioView: React.FC<MobilePolicyStudioViewProps> = ({
  onOpenSimulation,
  onOpenReviewModal,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>('INV_STOCKOUT_48H');
  const [simulationRan, setSimulationRan] = useState<boolean>(false);

  const rules = [
    {
      id: 'INV_STOCKOUT_48H',
      name: 'Stockout Velocity Protection',
      summary: 'Immediately mutates custom_label_3 to HOLD when ATS < 5 units and DOC < 2.0 days.',
      conditions: [
        'Available To Sell (ATS) < 5 units',
        'Days of Cover (DOC) < 2.0 days',
        'Inbound PO ETA > 48 hours',
      ],
      scope: 'All active storefronts (DE, FR, NL, UK)',
      blastRadius: '42 SKUs currently in scope (€18,420 spend protected)',
      approvalStatus: 'Approved & Active',
    },
    {
      id: 'MARGIN_FLOOR_20PCT',
      name: 'Gross Margin Floor Protection',
      summary: 'Shifts products to GUARD_HIGH tier when gross contribution margin drops below 20%.',
      conditions: [
        'Gross Margin < 20%',
        'Ad Click CPC / Retail Price > 12%',
      ],
      scope: 'DE & FR Storefronts',
      blastRadius: '14 SKUs in scope (€6,800 spend protected)',
      approvalStatus: 'Approved & Active',
    },
    {
      id: 'INACTIVE_DISCONTINUED_SUPPRESS',
      name: 'Catalog Lifecycle Cleaner',
      summary: 'Suppresses bidding on items flagged discontinued or deleted in ERP.',
      conditions: [
        'ERP Status == "DISCONTINUED" OR "ARCHIVED"',
      ],
      scope: 'Global catalog',
      blastRadius: '3 SKUs in scope (€1,200 spend protected)',
      approvalStatus: 'Approved & Active',
    },
  ];

  const currentRule = rules.find((r) => r.id === selectedRuleId) || rules[0];

  return (
    <div className="space-y-4 pb-20 text-slate-800">
      <div className="pt-1">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Policy Studio</h1>
        <p className="text-xs text-slate-500">Guided policy viewer &amp; blast radius inspector</p>
      </div>

      {/* "Open on desktop to edit" Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex items-start gap-2.5">
        <span className="material-symbols-outlined text-[20px] text-amber-600 shrink-0 mt-0.5">laptop_mac</span>
        <div>
          <span className="font-bold block">Desktop Recommended for Policy Authoring</span>
          <span className="text-[11px] text-amber-800">
            Complex rule-graph visual editing is locked to desktop. Mobile supports guided inspection, safe simulation, and approval.
          </span>
        </div>
      </div>

      {/* Rule Switcher Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {rules.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setSelectedRuleId(r.id);
              setSimulationRan(false);
            }}
            className={`h-9 px-3.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap border transition-all ${
              selectedRuleId === r.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {r.id}
          </button>
        ))}
      </div>

      {/* 1. POLICY SUMMARY */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Policy Summary
        </span>
        <h2 className="text-sm font-bold text-slate-900">{currentRule.name}</h2>
        <p className="text-xs text-slate-600 leading-relaxed">{currentRule.summary}</p>
      </section>

      {/* 2. CONDITIONS */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Conditions
        </span>
        <div className="space-y-1.5 font-mono text-xs">
          {currentRule.conditions.map((c, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SCOPE */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Scope
        </span>
        <div className="p-2.5 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800">
          {currentRule.scope}
        </div>
      </section>

      {/* 4. BLAST RADIUS & SIMULATION */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Simulation &amp; Blast Radius
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
            Safe Sandbox
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono">
          <div className="text-slate-500 text-[11px]">Current Impact:</div>
          <div className="font-bold text-slate-900 mt-0.5">{currentRule.blastRadius}</div>
        </div>

        {simulationRan && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1 animate-in fade-in duration-150">
            <div className="font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
              <span>Simulation Complete: 0 regressions found</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-snug">
              Dry run across 8,420 catalog records verified. Supplemental label syntax is fully valid.
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSimulationRan(true)}
            className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">science</span>
            <span>Run Safe Simulation</span>
          </button>

          <button
            type="button"
            onClick={onOpenReviewModal}
            className="h-11 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
          >
            Approve
          </button>
        </div>
      </section>
    </div>
  );
};
