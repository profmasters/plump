import React from 'react';
import { OperatingMode, RiskItem, GuardModule, MarketHealthItem, InterventionEvent } from '../types';

interface OverviewViewProps {
  operatingMode: OperatingMode;
  onChangeOperatingMode: (mode: OperatingMode) => void;
  topRisks: RiskItem[];
  guardModules: GuardModule[];
  marketHealth: MarketHealthItem[];
  interventions: InterventionEvent[];
  onNavigateToDecisions: () => void;
  onNavigateToWhy: (sku?: string) => void;
  onNavigateToPolicyStudio: () => void;
  onExportAuditTrail: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  operatingMode,
  onChangeOperatingMode,
  topRisks,
  guardModules,
  marketHealth,
  interventions,
  onNavigateToDecisions,
  onNavigateToWhy,
  onNavigateToPolicyStudio,
  onExportAuditTrail,
}) => {
  return (
    <div className="space-y-5">
      {/* ROW 1: UNIFIED SYSTEM STATUS BAR (Datadog & Linear precision) */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* 1. Control Mode Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">Operating Mode</span>
          <div className="inline-flex rounded-md bg-slate-100 p-0.5 border border-slate-200/60 text-xs">
            {(['Observe', 'Recommend', 'Control (Active)'] as OperatingMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChangeOperatingMode(mode)}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                  operatingMode === mode
                    ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                {operatingMode === mode && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                )}
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Publication Health */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Publication Health:</span>
          {operatingMode === 'Control (Active)' ? (
            <>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Healthy
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 font-mono">99.98%</span>
              <span className="text-slate-500">push success</span>
              <span className="text-slate-400 text-[11px] hidden md:inline">
                (last sync 3m ago via Google Merchant API · Supplemental data source)
              </span>
            </>
          ) : operatingMode === 'Recommend' ? (
            <>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Staging Ready
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">Awaiting operator approval</span>
              <span className="text-slate-400 text-[11px] hidden md:inline">
                (Target: Google Merchant API · Supplemental data source)
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Observation Only
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">No control actions published</span>
              <span className="text-slate-400 text-[11px] hidden md:inline">
                (Merchant API · Supplemental source disengaged)
              </span>
            </>
          )}
        </div>

        {/* 3. Data Confidence */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Data Confidence:</span>
          <span className="font-semibold text-slate-900 font-mono">99.2%</span>
          <span className="text-slate-500 text-[11px] hidden sm:inline">(High confidence · 0 critical ID collisions)</span>
        </div>
      </div>

      {/* ROW 2: PRIMARY KPI CARDS (Exactly 4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Controlled Spend vs Controllable Spend */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">
              {operatingMode === 'Control (Active)' ? 'Controlled Spend' : 'Controllable Spend'}
            </span>
            <span className="material-symbols-outlined text-[17px] text-blue-600">verified_user</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
              €284,500 <span className="text-xs font-normal text-slate-500 font-sans">/mo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {operatingMode === 'Control (Active)'
                ? '78.4% of eligible catalog spend under active policy'
                : 'Spend technically addressable through validated wiring'}
            </p>
          </div>
        </div>

        {/* Card 2: At-risk Spend */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium text-rose-700">At-risk Spend</span>
            <span className="material-symbols-outlined text-[17px] text-rose-600">warning</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-600 tracking-tight font-mono">
              €18,420 <span className="text-xs font-normal text-slate-500 font-sans">/mo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {operatingMode === 'Control (Active)'
                ? '42 SKUs currently exposed due to negative margin or <2d cover (31 of 42 currently under active guard)'
                : operatingMode === 'Observe'
                ? '42 SKUs currently exposed due to negative margin or <2d cover (0 of 42 guarded · observation only)'
                : '42 SKUs currently exposed due to negative margin or <2d cover (recommended for operator approval)'}
            </p>
          </div>
        </div>

        {/* Card 3: Products at Stockout Risk */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Products at Stockout Risk</span>
            <span className="material-symbols-outlined text-[17px] text-amber-600">inventory_2</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">38 SKUs</div>
            <p className="text-xs text-slate-500 mt-1">High velocity products with &lt;4.0 days cover</p>
          </div>
        </div>

        {/* Card 4: Contribution Margin Exposure */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Contribution Margin Exposure</span>
            <span className="material-symbols-outlined text-[17px] text-slate-400">trending_down</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
              €26,300 <span className="text-xs font-normal text-slate-500 font-sans">/mo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Direct gross margin at risk across all connectors</p>
          </div>
        </div>
      </div>

      {/* ROW 3: CORE OPERATIONAL PANELS (2/3 + 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 2/3: Top Risks & Immediate Interventions */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">shield_with_heart</span>
                <h2 className="text-sm font-semibold text-slate-900">Top Risks &amp; Immediate Interventions</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">Auto-enforced every 15s</span>
            </div>

            {/* 5-Second Executive Risk Callout */}
            <div className="mt-3.5 p-3 rounded-md bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">error_outline</span>
              <div>
                <span className="font-semibold text-amber-950">Stockout hazard in German Central Hub:</span>{' '}
                38 SKUs in heavy power tools (€14.2k monthly spend).
                <span className="block mt-0.5 text-amber-800">
                  {operatingMode === 'Control (Active)' ? (
                    <>
                      Actions taken: Plumb switched <span className="font-semibold text-slate-900 font-mono">18 SKUs to HOLD</span> and{' '}
                      <span className="font-semibold text-slate-900 font-mono">20 SKUs to GUARD_HIGH</span>.
                    </>
                  ) : operatingMode === 'Observe' ? (
                    <>
                      Proposed actions: Policy recommends switching <span className="font-semibold text-slate-900 font-mono">18 SKUs to HOLD</span> and{' '}
                      <span className="font-semibold text-slate-900 font-mono">20 SKUs to GUARD_HIGH</span> (no control actions published).
                    </>
                  ) : (
                    <>
                      Recommended actions: Plumb proposes switching <span className="font-semibold text-slate-900 font-mono">18 SKUs to HOLD</span> and{' '}
                      <span className="font-semibold text-slate-900 font-mono">20 SKUs to GUARD_HIGH</span> awaiting approval.
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Risk Table */}
            <div className="mt-3.5 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium">
                    <th className="pb-2 font-medium">SKU</th>
                    <th className="pb-2 font-medium">Product Name</th>
                    <th className="pb-2 font-medium">Market</th>
                    <th className="pb-2 font-medium text-right">Exposure</th>
                    <th className="pb-2 font-medium">Reason Code</th>
                    <th className="pb-2 font-medium text-right">
                      {operatingMode === 'Observe' ? 'Proposed Action' : 'Action Taken'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {topRisks.map((r) => (
                    <tr
                      key={r.sku}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                      onClick={() => onNavigateToWhy(r.sku)}
                      title="Click to view deterministic why lineage"
                    >
                      <td className="py-2.5 font-mono font-medium text-slate-900">{r.sku}</td>
                      <td className="py-2.5 text-slate-800 font-medium hover:text-blue-600 transition-colors">
                        {r.productName}
                      </td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200/60">
                          {r.market}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-right font-medium text-slate-900">
                        €{r.exposureEur.toLocaleString()}
                      </td>
                      <td className="py-2.5">
                        <code className="font-mono text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60">
                          {r.reasonCode}
                        </code>
                      </td>
                      <td className="py-2.5 text-right">
                        <span className={`px-2 py-0.5 rounded font-medium text-[11px] border font-mono ${
                          r.actionTaken === 'HOLD'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {operatingMode === 'Observe' ? `Proposed ${r.actionTaken}` : r.actionTaken}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing top 4 high exposure SKUs of 38 flagged</span>
            <button
              type="button"
              onClick={onNavigateToDecisions}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View all 38 SKUs in Product Decisions</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right 1/3: Active Guard Modules */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-700">tune</span>
                <h2 className="text-sm font-semibold text-slate-900">Active Guard Modules</h2>
              </div>
              <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded border ${
                operatingMode === 'Control (Active)'
                  ? 'text-emerald-600 bg-emerald-50 border-emerald-200/60'
                  : operatingMode === 'Recommend'
                  ? 'text-amber-700 bg-amber-50 border-amber-200/60'
                  : 'text-slate-600 bg-slate-100 border-slate-200/60'
              }`}>
                {operatingMode === 'Control (Active)' ? '4/4 Armed' : operatingMode === 'Recommend' ? '4/4 Recommending' : '4/4 Monitored'}
              </span>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {guardModules.map((mod) => (
                <div
                  key={mod.id}
                  className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/70 flex items-start justify-between hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        mod.dotColor === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      <span className="text-xs font-semibold text-slate-900">{mod.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{mod.subtitle}</p>
                  </div>
                  <span className={`text-[11px] font-medium font-mono bg-white border px-1.5 py-0.5 rounded ${
                    mod.status === 'Active'
                      ? 'text-emerald-700 border-slate-200'
                      : 'text-amber-700 border-slate-200'
                  }`}>
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Rules synced from Policy Studio</span>
            <button
              type="button"
              onClick={onNavigateToPolicyStudio}
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors cursor-pointer"
            >
              Configure rules
            </button>
          </div>
        </div>
      </div>

      {/* ROW 4: MARKET & CONNECTOR HEALTH + RECENT CAUSAL INTERVENTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Market & Connector Health (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-700">public</span>
                <h2 className="text-sm font-semibold text-slate-900">Market &amp; Connector Health</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">4 territories</span>
            </div>

            <div className="mt-3 divide-y divide-slate-100 text-xs">
              {marketHealth.map((m) => (
                <div key={m.code} className="py-2.5 flex items-center justify-between hover:bg-slate-50/50 px-1 rounded transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] font-semibold text-slate-800 flex items-center justify-center">
                      {m.code}
                    </span>
                    <div>
                      <div className="font-medium text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{m.platform}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-medium text-slate-900">
                      €{m.monthlySpendEur.toLocaleString()}
                    </div>
                    <div className={`flex items-center justify-end gap-1 text-[11px] font-mono ${
                      m.warnings ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        m.warnings ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></span>
                      {m.syncPercent}% · {m.syncStatus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">All connector feeds responsive</span>
            <button
              type="button"
              onClick={onNavigateToDecisions}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
            >
              Connector settings
            </button>
          </div>
        </div>

        {/* Recent Interventions & Publication Events (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-700">history</span>
                <h2 className="text-sm font-semibold text-slate-900">
                  {operatingMode === 'Observe'
                    ? 'Recent Observations & Proposed Events'
                    : 'Recent Interventions & Publication Events'}
                </h2>
              </div>
              {/* Economic impact badge strictly aligned with causal measurement taxonomy */}
              {operatingMode === 'Control (Active)' ? (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-xs">
                  <span className="font-medium text-emerald-900">Measured Economic Impact:</span>
                  <span className="font-mono font-bold text-emerald-700">+€14,850 /mo</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                    Verified (Geo Exp · p &lt; 0.01)
                  </span>
                </div>
              ) : operatingMode === 'Recommend' ? (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-xs">
                  <span className="font-medium text-amber-900">Measurement Status:</span>
                  <span className="font-mono font-bold text-amber-800">Causal Eligible</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                    Exp Staged
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs">
                  <span className="font-medium text-slate-700">Projected Economic Impact — Simulation:</span>
                  <span className="font-mono font-bold text-slate-900">+€14,850 /mo</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-medium">
                    Observed Association
                  </span>
                </div>
              )}
            </div>

            {/* Table of recent interventions */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium">
                    <th className="pb-2 font-medium">Time (CET)</th>
                    <th className="pb-2 font-medium">Source</th>
                    <th className="pb-2 font-medium">Target</th>
                    <th className="pb-2 font-medium">Tier Change</th>
                    <th className="pb-2 font-medium">Reason</th>
                    <th className="pb-2 font-medium text-right">Executor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {interventions.map((ev) => (
                    <tr key={ev.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 font-mono text-slate-500 whitespace-nowrap">{ev.timeCet}</td>
                      <td className="py-2.5 whitespace-nowrap">
                        {ev.source === 'AI Copilot' ? (
                          <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[10px] font-medium border border-purple-200">
                            AI Copilot
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-200/60">
                            {ev.source}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 font-mono font-medium text-slate-900">{ev.target}</td>
                      <td className="py-2.5 whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded font-medium font-mono text-[10px] border ${
                          ev.tierChange === 'HOLD'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : ev.tierChange.includes('HOLD')
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200/60'
                        }`}>
                          {ev.tierChange}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-600 truncate max-w-xs" title={ev.reason}>
                        {ev.reason}
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-700 text-[11px] font-medium">
                        {ev.executor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            {operatingMode === 'Control (Active)' ? (
              <span className="font-mono text-[11px] text-slate-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Causal Experiment: Completed · 14-day Geo Switchback Exp #GE-04 (p &lt; 0.01)</span>
              </span>
            ) : operatingMode === 'Recommend' ? (
              <span className="font-mono text-[11px] text-amber-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Measurement Status: Causal Eligible · Geo Switchback Exp #GE-05 Staged</span>
              </span>
            ) : (
              <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Measurement Status: Causal Eligible · Pre-experiment baseline window</span>
              </span>
            )}
            <button
              type="button"
              onClick={onExportAuditTrail}
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors"
            >
              Export audit trail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
