import React, { useState } from 'react';
import { MOCK_CONNECTORS, ConnectorItem } from '../data/supportingScreensMockData';

export const ConnectorsView: React.FC = () => {
  const [connectors, setConnectors] = useState<ConnectorItem[]>(MOCK_CONNECTORS);
  const [selectedConnector, setSelectedConnector] = useState<ConnectorItem | null>(MOCK_CONNECTORS[0]);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleTriggerSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      alert('Incremental delta sync completed with 0 errors. Merchant labels validated.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Channel Health */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">cable</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Connectors &amp; Integration Pipelines</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              4 of 4 Channels Healthy
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Streaming &amp; scheduled ERP, PIM, WMS, and Google Merchant API pipelines · Secrets securely vaulted (zero raw credentials exposed)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Opening connector provisioning catalog (Magento, SAP, Shopify, REST, SFTP).')}
            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add_link</span>
            <span>Add Integration Connector</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content: Connectors Table / Cards + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Connectors Overview (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white rounded-lg border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Ingestion &amp; Dispatch Pipelines</h2>
              <span className="text-[11px] font-mono text-slate-400">P50 Latency: 240ms</span>
            </div>

            <div className="divide-y divide-slate-100">
              {connectors.map((conn) => {
                const isSelected = selectedConnector?.id === conn.id;
                return (
                  <div
                    key={conn.id}
                    onClick={() => setSelectedConnector(conn)}
                    className={`p-4 cursor-pointer transition-colors space-y-2 ${
                      isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{conn.name}</span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">
                            {conn.type}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          Schedule: {conn.schedule}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="font-mono text-[11px] font-semibold text-emerald-700">{conn.health}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {conn.capabilities.map((cap) => (
                        <span key={cap} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-200">
                          {cap}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                      <span>Freshness: &lt;{conn.freshnessSec}s</span>
                      <span>Coverage: <strong className="text-slate-800">{conn.dataCoveragePercent}%</strong></span>
                      <span>Last sync: {conn.lastSyncTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Connector Detail Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-blue-600">settings_input_component</span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Connector Telemetry Detail</h3>
            </div>
            <span className="font-mono text-[10px] text-slate-400">ID: {selectedConnector?.id}</span>
          </div>

          {selectedConnector && (
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Pipeline Name &amp; Protocol</span>
                <span className="font-bold text-slate-900 text-sm">{selectedConnector.name}</span>
                <span className="text-slate-500 block font-mono text-[11px]">{selectedConnector.type}</span>
              </div>

              {/* Secure Credentials Metadata (Strictly zero raw secrets) */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between font-sans">
                  <span className="font-bold text-slate-800">Vaulted Credentials Governance</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                    {selectedConnector.authStatus}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Configuration state:</span>
                  <span className="text-slate-900 font-semibold">{selectedConnector.credentialMetadata.configured ? 'Configured in KMS' : 'Missing'}</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Last verified:</span>
                  <span>{selectedConnector.credentialMetadata.lastVerified}</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Secret rotation:</span>
                  <span>{selectedConnector.credentialMetadata.rotationRequired ? 'Action Due' : 'Valid (Not required)'}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-sans pt-1">
                  Zero raw OAuth tokens, API secrets, or passwords stored in UI state.
                </div>
              </div>

              {/* Rate Limits and Performance */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Rate Limit &amp; Backoff:</span>
                  <span className="text-slate-800 font-semibold">{selectedConnector.rateLimitStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Sync Latency:</span>
                  <span className="text-slate-800">{selectedConnector.syncLatencyMs}ms (P95)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Error Rate:</span>
                  <span className="text-emerald-700 font-bold">{selectedConnector.errorRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Markets Bound:</span>
                  <span className="text-slate-800">{selectedConnector.markets.join(', ')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleTriggerSync(selectedConnector.id)}
                  disabled={syncingId === selectedConnector.id}
                  className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[15px] ${syncingId === selectedConnector.id ? 'animate-spin' : ''}`}>
                    sync
                  </span>
                  <span>{syncingId === selectedConnector.id ? 'Syncing...' : 'Trigger Manual Delta'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Reviewing schema reconciliation logs for ${selectedConnector.name}.`)}
                  className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs"
                >
                  Schema Log
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
