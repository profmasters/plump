import React, { useState } from 'react';
import { MOCK_AUDIT_ENTRIES, AuditLogEntry, AuditEventType } from '../data/supportingScreensMockData';

export const AuditLogView: React.FC = () => {
  const [entries, setEntries] = useState<AuditLogEntry[]>(MOCK_AUDIT_ENTRIES);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedEntry, setInspectedEntry] = useState<AuditLogEntry | null>(MOCK_AUDIT_ENTRIES[0]);

  const eventTypes: AuditEventType[] = [
    'Data Import',
    'Identity Mapping',
    'Decision',
    'Policy',
    'Override',
    'Approval',
    'AI Draft',
    'Automation Run',
    'Merchant Publication',
    'Verification',
    'Rollback',
    'Entitlement Change',
    'Billing Event',
    'Connector Event',
    'Login / Security Event',
    'Operator Action'
  ];

  const filteredEntries = entries.filter((e) => {
    if (selectedTypeFilter !== 'ALL' && e.eventType !== selectedTypeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        e.object.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.actor.toLowerCase().includes(q) ||
        e.correlationId.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header with Cryptographic Ledger Context */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">history</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Enterprise Audit Log &amp; Operations Ledger</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              Immutable · SHA-256 Chained
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically linked operational events · Destructive deletion disabled by kernel policy · Forensically exportable
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Exporting signed forensic ledger records in CSV format (ISO-8601 timestamps, SHA-256 hashes).')}
            className="px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => alert('Exporting cryptographic JSON-LD proof bundle with Merkel root verification.')}
            className="px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">data_object</span>
            <span>Export JSON-LD</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Ribbon and Search Bar */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search by actor, correlation ID, SKU, or policy rule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs bg-slate-50 placeholder:text-slate-400 focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Event Type:</span>
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none"
          >
            <option value="ALL">All Event Types</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Main Ledger Table + Right-Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Ledger Table (8 cols on desktop) */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium bg-slate-50/70">
                  <th className="py-2.5 px-3 font-medium">Timestamp (CET)</th>
                  <th className="py-2.5 px-3 font-medium">Event Type</th>
                  <th className="py-2.5 px-3 font-medium">Actor</th>
                  <th className="py-2.5 px-3 font-medium">Object</th>
                  <th className="py-2.5 px-3 font-medium">Result</th>
                  <th className="py-2.5 px-3 font-medium font-mono">Correlation ID</th>
                  <th className="py-2.5 px-3 font-medium text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredEntries.map((entry) => {
                  const isSelected = inspectedEntry?.id === entry.id;
                  return (
                    <tr
                      key={entry.id}
                      onClick={() => setInspectedEntry(entry)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                        {entry.timestampCet}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {entry.eventType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900 truncate max-w-[140px]">{entry.actor}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{entry.actorRole}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-800 font-medium truncate max-w-[180px]">
                        {entry.object}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-bold ${
                          entry.result === 'SUCCESS'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : entry.result === 'ROLLED_BACK'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {entry.result}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                        {entry.correlationId}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">
                          chevron_right
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right-Side Forensic Inspector (4 cols on desktop) */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-slate-700">policy</span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Forensic Inspector</h3>
            </div>
            <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
              {inspectedEntry?.integrityState}
            </span>
          </div>

          {inspectedEntry ? (
            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Event Record ID &amp; Type</span>
                <span className="font-bold text-slate-900">{inspectedEntry.id} · {inspectedEntry.eventType}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Actor Identity &amp; Scope</span>
                <div className="text-slate-800 font-sans font-medium">{inspectedEntry.actor}</div>
                <div className="text-[11px] text-slate-500">{inspectedEntry.tenantScope}</div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Action &amp; Evidence</span>
                <div className="text-slate-800 font-sans font-medium">{inspectedEntry.action}</div>
                <div className="text-[11px] text-emerald-800 bg-emerald-50/80 p-2 rounded border border-emerald-200 mt-1 font-sans">
                  {inspectedEntry.evidence}
                </div>
              </div>

              {/* Approval Chain (when applicable) */}
              {inspectedEntry.approvalChain && (
                <div className="p-2.5 rounded bg-blue-50 border border-blue-200 font-sans text-xs space-y-1">
                  <span className="font-bold text-blue-950 block">Governance Approval Chain</span>
                  <div className="text-[11px] text-blue-900">
                    Policy: <strong>{inspectedEntry.approvalChain.requiredPolicy}</strong>
                  </div>
                  <div className="text-[11px] text-blue-800">
                    Signatory 1: {inspectedEntry.approvalChain.approver1}
                  </div>
                  {inspectedEntry.approvalChain.approver2 && (
                    <div className="text-[11px] text-blue-800 font-semibold">
                      Signatory 2 (Four-Eyes): {inspectedEntry.approvalChain.approver2}
                    </div>
                  )}
                  <div className="text-[10px] font-mono text-blue-600 pt-0.5">
                    Signed: {inspectedEntry.approvalChain.timestamp}
                  </div>
                </div>
              )}

              {/* Before and After State Diff */}
              {inspectedEntry.beforeState && inspectedEntry.afterState && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 block font-sans">Deterministic State Delta</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-rose-700 font-sans font-bold block">Before:</span>
                      <pre className="text-[10px] text-slate-700 whitespace-pre-wrap">
                        {JSON.stringify(inspectedEntry.beforeState, null, 1)}
                      </pre>
                    </div>
                    <div className="p-2 bg-slate-50 rounded border border-slate-200">
                      <span className="text-emerald-700 font-sans font-bold block">After:</span>
                      <pre className="text-[10px] text-slate-700 whitespace-pre-wrap">
                        {JSON.stringify(inspectedEntry.afterState, null, 1)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Cryptographic Hash Chaining */}
              <div className="pt-2 border-t border-slate-100 text-[10px] space-y-1 text-slate-500">
                <div className="flex justify-between">
                  <span>Record Hash:</span>
                  <span className="font-mono text-slate-800 font-bold">{inspectedEntry.eventHash}</span>
                </div>
                <div className="flex justify-between">
                  <span>Previous Link:</span>
                  <span className="font-mono text-slate-600">{inspectedEntry.previousHash}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trace Correlation:</span>
                  <span className="font-mono text-slate-600">{inspectedEntry.correlationId}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select an event record to inspect cryptographic audit details.</p>
          )}
        </div>
      </div>
    </div>
  );
};
