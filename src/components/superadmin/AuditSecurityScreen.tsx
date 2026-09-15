import React, { useState } from 'react';
import {
  PLATFORM_AUDIT_LOGS,
  PlatformAuditEntry,
} from '../../data/superAdminMockData';

export const AuditSecurityScreen: React.FC = () => {
  const [logs, setLogs] = useState<PlatformAuditEntry[]>(PLATFORM_AUDIT_LOGS);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-amber-400">security</span>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Immutable Platform Security &amp; Privilege Ledger
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Platform Audit &amp; Security Ledger</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographic SHA-256 chained ledger of all super-admin interventions, plan releases, and support sessions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Chaining Integrity:</span>{' '}
            <span className="font-bold text-emerald-400">SHA-256 Validated</span>
          </div>
        </div>
      </div>

      {/* Security Architecture Rule Notice */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
        <span className="material-symbols-outlined text-[20px] text-amber-400 shrink-0 mt-0.5">verified</span>
        <div className="space-y-1">
          <span className="font-semibold text-white">Zero Phantom Super-Admin Interventions:</span>
          <p>
            No platform engineer or support personnel can alter a tenant’s operating mode, feed publication, or commercial entitlement without generating a permanent, non-repudiable ledger block with actor email, session ID, and legal justification.
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Platform Governance Log Stream</h2>
          <span className="text-xs text-slate-400 font-mono">Real-time tamper-evident feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="px-4 py-3">Timestamp (UTC)</th>
                <th className="px-3 py-3">Actor &amp; Scope</th>
                <th className="px-3 py-3">Action</th>
                <th className="px-3 py-3">Target Tenant</th>
                <th className="px-4 py-3">Reason &amp; Evidence</th>
                <th className="px-4 py-3 text-right">Cryptographic SHA-256</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {logs.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {entry.timestamp}
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-semibold text-white">{entry.actor}</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-800 text-amber-300 mt-0.5">
                      {entry.privilegeScope}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-emerald-400 font-medium whitespace-nowrap">
                    {entry.adminAction}
                  </td>
                  <td className="px-3 py-3 font-mono text-slate-300 whitespace-nowrap">
                    {entry.affectedTenant}
                  </td>
                  <td className="px-4 py-3 text-slate-300 max-w-sm">
                    <div className="font-medium text-white">{entry.reason}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{entry.evidence}</div>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleCopyHash(entry.hashSha256)}
                      className="font-mono text-[10px] text-slate-400 hover:text-amber-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 transition-colors"
                      title="Click to copy SHA-256 block hash"
                    >
                      {copiedHash === entry.hashSha256 ? 'Copied ✓' : `${entry.hashSha256.substring(0, 16)}...`}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
