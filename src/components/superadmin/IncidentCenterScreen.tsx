import React, { useState } from 'react';
import {
  PLATFORM_INCIDENTS,
  PlatformIncident,
} from '../../data/superAdminMockData';

export const IncidentCenterScreen: React.FC = () => {
  const [incidents, setIncidents] = useState<PlatformIncident[]>(PLATFORM_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<PlatformIncident | null>(incidents[0]);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleMitigate = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: 'Mitigating' } : inc))
    );
    setActionSuccess(`Incident ${id} updated to Mitigating. Automated failover confirmed.`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleResolve = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: 'Resolved' } : inc))
    );
    setActionSuccess(`Incident ${id} marked Resolved. Post-incident telemetry green.`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-rose-500">emergency</span>
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
              Platform Reliability &amp; Incident Interlock
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Platform Incident Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Fleet-wide anomaly tracking, exposure mitigation, and tenant failover controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Financial Exposure at Risk:</span>{' '}
            <span className="font-bold text-amber-400">€20,700</span>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg text-xs text-emerald-300 font-mono flex items-center justify-between animate-in fade-in duration-150">
          <span>✓ {actionSuccess}</span>
          <span className="text-[11px] text-emerald-400">Ledger Updated</span>
        </div>
      )}

      {/* Grid: Incident List & Incident Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 5 cols: Incident List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono px-1">
            Active &amp; Historical Incidents
          </div>

          <div className="space-y-2.5">
            {incidents.map((inc) => {
              const isSelected = selectedIncident?.id === inc.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all text-xs ${
                    isSelected
                      ? 'bg-rose-950/20 border-rose-500/40 shadow-xs'
                      : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-white text-sm">{inc.id}</span>
                    <span
                      className={`px-2 py-0.2 rounded font-mono text-[10px] font-bold ${
                        inc.status === 'Resolved'
                          ? 'bg-slate-800 text-slate-400'
                          : inc.status === 'Active Investigation'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </div>

                  <div className="font-semibold text-slate-200 mb-1">{inc.incidentType} Anomaly</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                    {inc.currentEvidence}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800">
                    <span>{inc.startedAt}</span>
                    <span className="text-amber-400 font-medium">Exp: €{inc.financialExposureEur.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 cols: Active Incident Detail */}
        {selectedIncident && (
          <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-rose-400">{selectedIncident.id}</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono font-semibold bg-rose-500/20 text-rose-300">
                    {selectedIncident.severity}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white">
                  {selectedIncident.incidentType}: Platform Telemetry Alert
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {selectedIncident.status !== 'Resolved' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleMitigate(selectedIncident.id)}
                      className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
                    >
                      Mitigate
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResolve(selectedIncident.id)}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                    >
                      Resolve
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Evidence details */}
            <div className="p-3.5 bg-slate-900 rounded border border-slate-800 space-y-1.5">
              <span className="text-slate-400 font-mono text-[11px] block uppercase">Live Diagnostic Evidence</span>
              <p className="text-slate-200 leading-relaxed font-sans">{selectedIncident.currentEvidence}</p>
            </div>

            {/* Technical Parameters */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Affected Tenants</span>
                <span className="text-white font-bold">{selectedIncident.affectedTenantsList.join(', ')}</span>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Exposure at Stake</span>
                <span className="text-amber-400 font-bold">€{selectedIncident.financialExposureEur.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Owner</span>
                <span className="text-slate-300">{selectedIncident.owner}</span>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Circuit Breaker Status</span>
                <span className={selectedIncident.circuitBreakerTripped ? 'text-rose-400' : 'text-emerald-400'}>
                  {selectedIncident.circuitBreakerTripped ? 'Tripped (Isolated)' : 'Closed (Nominal)'}
                </span>
              </div>
            </div>

            {/* Active Mitigation */}
            <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono text-[11px] block uppercase">Current Mitigation Strategy</span>
              <p className="text-slate-300 leading-relaxed">{selectedIncident.mitigation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
