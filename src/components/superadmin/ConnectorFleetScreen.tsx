import React, { useState } from 'react';
import {
  CONNECTOR_FLEET_DATA,
  ConnectorFleetItem,
} from '../../data/superAdminMockData';

export const ConnectorFleetScreen: React.FC = () => {
  const [fleet, setFleet] = useState<ConnectorFleetItem[]>(CONNECTOR_FLEET_DATA);
  const [selectedConnector, setSelectedConnector] = useState<ConnectorFleetItem | null>(fleet[0]);

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-purple-400">hub</span>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
              Platform Integration Fleet Telemetry
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Connector Fleet Operations</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Fleet-wide health across ERP, Storefront, and PIM sync connectors. Zero silent polling failures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Active Fleet Ingestion:</span>{' '}
            <span className="font-bold text-emerald-400">58 Connected Tenants</span>
          </div>
        </div>
      </div>

      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fleet.map((conn) => {
          const isSelected = selectedConnector?.id === conn.id;
          return (
            <div
              key={conn.id}
              onClick={() => setSelectedConnector(conn)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-purple-950/20 border-purple-500/50 shadow-xs'
                  : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white text-sm">{conn.provider}</span>
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
              <div className="text-xs text-slate-400 font-mono mb-3">{conn.connectorType}</div>
              <div className="space-y-1.5 text-[11px] font-mono border-t border-slate-800/80 pt-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Tenants:</span>
                  <span className="text-white font-bold">{conn.affectedTenantsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>P95 Latency:</span>
                  <span className={conn.p95LatencyMs > 1000 ? 'text-amber-400' : 'text-emerald-400'}>
                    {conn.p95LatencyMs}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rate Limit Pressure:</span>
                  <span className={conn.rateLimitPressurePercent > 70 ? 'text-amber-400' : 'text-slate-300'}>
                    {conn.rateLimitPressurePercent}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Connector Fleet Telemetry & Rate-Limit Inspector */}
      {selectedConnector && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span>{selectedConnector.provider}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                  {selectedConnector.connectorType}
                </span>
              </h2>
              <p className="text-slate-400 font-mono text-[11px] mt-0.5">
                Connector ID: {selectedConnector.id} · Monitored Endpoints: Webhook Ingress, Bulk Delta Sync, Catalog Heartbeat
              </p>
            </div>
            <div className="text-right font-mono text-[11px]">
              <span className="text-slate-400">Last Outage:</span>{' '}
              <span className="text-slate-200">{selectedConnector.lastIncidentTimestamp}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">Tenant Health Distribution</span>
              <div className="text-sm font-semibold text-white">
                <span className="text-emerald-400">{selectedConnector.healthyCount} Healthy</span>
                {selectedConnector.degradedCount > 0 && (
                  <span className="text-amber-400 ml-2">{selectedConnector.degradedCount} Degraded</span>
                )}
                {selectedConnector.failedCount > 0 && (
                  <span className="text-rose-400 ml-2">{selectedConnector.failedCount} Failed</span>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">24h Auth Failures</span>
              <div className="text-sm font-semibold font-mono text-white">
                {selectedConnector.authFailures24h === 0 ? (
                  <span className="text-emerald-400">0 Failures (Tokens Valid)</span>
                ) : (
                  <span className="text-amber-400">{selectedConnector.authFailures24h} Re-auth required</span>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">P95 Sync Response</span>
              <div className="text-sm font-semibold font-mono text-white">
                {selectedConnector.p95LatencyMs} ms
              </div>
            </div>
          </div>

          {/* Architecture Insight */}
          <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 text-slate-300 leading-relaxed space-y-1">
            <span className="font-semibold text-white block">Connector Quarantine Architecture:</span>
            <p>
              If an ERP or Storefront connector exceeds rate limits or returns repeated 5xx errors, Plumb quarantines the specific connector queue to prevent cascading API blocks on the tenant’s store. Google Merchant API supplemental updates continue serving from the Last Known Good (LKG) signed state.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
