import React from 'react';
import {
  PLATFORM_METRICS,
  PLATFORM_INCIDENTS,
  PLATFORM_TENANTS,
  CONNECTOR_FLEET_DATA,
  MERCHANT_PUBLICATION_JOBS,
  AI_PROVIDER_FLEET,
  SuperAdminViewType,
} from '../../data/superAdminMockData';

interface PlatformOverviewScreenProps {
  onNavigateTo: (view: SuperAdminViewType) => void;
}

export const PlatformOverviewScreen: React.FC<PlatformOverviewScreenProps> = ({ onNavigateTo }) => {
  const activeIncidents = PLATFORM_INCIDENTS.filter((i) => i.status !== 'Resolved');

  return (
    <div className="space-y-6 text-slate-100">
      {/* Platform Executive Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Plumb Global Fleet Daemon
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Platform Command Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time feed reconciliation, multi-tenant Merchant API publications, and AI FinOps telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Governed Spend</div>
            <div className="text-xl font-mono font-bold text-emerald-400">€14,840,000</div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTo('tenants')}
            className="px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-xs"
          >
            Manage Tenants →
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS (4 col desktop, 2x2 tablet, 2 col mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORM_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="bg-[#0F172A] border border-slate-800 p-4 rounded-lg flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">{metric.label}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  metric.status === 'nominal'
                    ? 'bg-emerald-500'
                    : metric.status === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
              ></span>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">{metric.value}</div>
              <div className="flex items-center justify-between text-xs mt-1 text-slate-400">
                <span>{metric.subtext}</span>
                {metric.change && <span className="text-emerald-400 font-mono text-[11px]">{metric.change}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIVE INCIDENTS ALERT STRIP */}
      {activeIncidents.length > 0 && (
        <div className="bg-amber-950/30 border border-amber-800/60 rounded-lg p-4">
          <div className="flex items-center justify-between pb-2 border-b border-amber-800/40">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
              <span className="material-symbols-outlined text-[18px]">emergency</span>
              <span>Active Platform Incidents ({activeIncidents.length})</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTo('incident-center')}
              className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
            >
              Open Incident Workspace →
            </button>
          </div>
          <div className="divide-y divide-amber-800/30 mt-2 text-xs">
            {activeIncidents.map((inc) => (
              <div key={inc.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {inc.severity}
                  </span>
                  <div>
                    <span className="font-semibold text-white">{inc.id}</span> ·{' '}
                    <span className="text-slate-300">{inc.incidentType}</span>: {inc.currentEvidence}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
                  <span>Exposure: €{inc.financialExposureEur.toLocaleString()}</span>
                  <span className="text-amber-400">{inc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TWO COLUMN OPERATIONAL PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 7 cols: Merchant Publication Operations & Connector Fleet */}
        <div className="lg:col-span-7 space-y-5">
          {/* Publication Operations Preview */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-400">publish</span>
                <h2 className="text-sm font-semibold text-white">Merchant Publication Stream</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTo('merchant-publication-ops')}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                View Pipeline →
              </button>
            </div>

            <div className="divide-y divide-slate-800 text-xs mt-2">
              {MERCHANT_PUBLICATION_JOBS.slice(0, 3).map((job) => (
                <div key={job.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white flex items-center gap-2">
                      <span>{job.tenantName}</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                        {job.market}
                      </span>
                    </div>
                    <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                      Batch {job.batchId} · {job.productsAffectedCount} SKUs · €{job.controlledSpendEur.toLocaleString()}/mo
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                        job.lifecycleStage === 'Wiring Verified' || job.lifecycleStage === 'Processed Value Verified'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {job.lifecycleStage}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{job.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connector Fleet Health */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-purple-400">hub</span>
                <h2 className="text-sm font-semibold text-white">Connector Fleet Status</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTo('connector-fleet')}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Inspect Fleet →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {CONNECTOR_FLEET_DATA.map((conn) => (
                <div key={conn.id} className="p-3 rounded bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white">{conn.provider}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                        conn.status === 'Operational'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {conn.status}
                    </span>
                  </div>
                  <div className="text-slate-400 font-mono text-[11px]">
                    {conn.affectedTenantsCount} tenants · P95: {conn.p95LatencyMs}ms
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: AI Platform Fleet & Canonical Plans */}
        <div className="lg:col-span-5 space-y-5">
          {/* AI Platform Fleet */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-amber-400">memory</span>
                <h2 className="text-sm font-semibold text-white">Global AI Provider Fleet</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTo('ai-platform-ops')}
                className="text-xs text-amber-400 hover:text-amber-300"
              >
                AI FinOps →
              </button>
            </div>

            <div className="space-y-3 mt-3 text-xs">
              {AI_PROVIDER_FLEET.map((prov) => (
                <div key={prov.providerId} className="p-3 bg-slate-900/90 rounded border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white">{prov.providerName}</span>
                    <span className="font-mono text-emerald-400 text-[11px]">{prov.activeRouteWeightPercent}% weight</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                    <span>Eval Score: {prov.currentEvalScore}%</span>
                    <span>LKG: {prov.lastKnownGoodRelease}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Canonical Plan Matrix Quick Link */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-400">receipt_long</span>
                <h2 className="text-sm font-semibold text-white">Canonical Plan Matrix</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTo('plan-builder')}
                className="text-xs text-emerald-400 hover:text-emerald-300"
              >
                Plan Builder →
              </button>
            </div>

            <div className="p-3 bg-slate-900/90 rounded border border-slate-800 mt-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Active Production Release:</span>
                <span className="font-mono text-emerald-400 font-semibold">ENT-CONTROL-v7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Staging Validation:</span>
                <span className="font-mono text-amber-400 font-semibold">ENT-CONTROL-v8 (Validating)</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                <span>Rule: Published plans are strictly immutable</span>
                <span>Zero in-place mutation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
