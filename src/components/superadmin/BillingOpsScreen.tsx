import React, { useState } from 'react';
import {
  BILLING_OPERATIONS_DATA,
  BillingTenantRow,
} from '../../data/superAdminMockData';

export const BillingOpsScreen: React.FC = () => {
  const [tenantsBilling, setTenantsBilling] = useState<BillingTenantRow[]>(BILLING_OPERATIONS_DATA);
  const [overrideNotice, setOverrideNotice] = useState<string | null>(null);

  const handleExtendGrace = (id: string, name: string) => {
    setTenantsBilling((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, configuredGracePolicy: 'Manual Executive Override' } : t
      )
    );
    setOverrideNotice(`Applied 72h executive grace period override for ${name}. Interlocks preserved.`);
    setTimeout(() => setOverrideNotice(null), 3500);
  };

  const totalMcv = tenantsBilling.reduce((acc, t) => acc + t.monthlyContractValueEur, 0);

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-emerald-400">account_balance</span>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Commercial Ledger &amp; Stripe Billing Ops
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Stripe &amp; Enterprise Billing Operations</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronized subscription statuses, dunning grace interlocks, and invoice reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Monthly Contract Value:</span>{' '}
            <span className="font-bold text-white">€{totalMcv.toLocaleString()}/mo</span>
          </div>
        </div>
      </div>

      {overrideNotice && (
        <div className="p-3 bg-amber-950/40 border border-amber-800 rounded-lg text-xs text-amber-300 font-mono flex items-center justify-between animate-in fade-in duration-150">
          <span>✓ {overrideNotice}</span>
          <span className="text-[11px] text-amber-400">Audit Ledger Recorded</span>
        </div>
      )}

      {/* Strict Billing Policy Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-xs text-slate-300 flex items-start gap-3">
        <span className="material-symbols-outlined text-[20px] text-amber-400 shrink-0 mt-0.5">verified_user</span>
        <div className="space-y-1 leading-relaxed">
          <span className="font-semibold text-white">Commercial Interlock Philosophy:</span>
          <p>
            Plumb enforces non-destructive billing enforcement. If payment fails, tenant advertising is never abruptly shut down; campaigns remain in their Last Known Good state with an operational read-only grace period before feed mutation freeze occurs.
          </p>
        </div>
      </div>

      {/* Tenants Commercial Ledger Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Tenant Commercial Contract Statuses</h2>
          <span className="text-xs text-slate-400 font-mono">Synced with Stripe Billing API</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="px-4 py-3">Tenant</th>
                <th className="px-3 py-3">Stripe Customer ID</th>
                <th className="px-3 py-3">Plan Binding</th>
                <th className="px-3 py-3 text-center">Billing State</th>
                <th className="px-3 py-3">Payment Method</th>
                <th className="px-3 py-3 text-right">Contract Value</th>
                <th className="px-3 py-3">Configured Grace Policy</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {tenantsBilling.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white text-sm">{row.tenantName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{row.contractType}</div>
                  </td>
                  <td className="px-3 py-3 font-mono text-slate-400 text-[11px]">
                    {row.stripeCustomerId}
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-mono text-emerald-400 text-[11px]">{row.planVersion}</div>
                    <div className="text-[10px] text-slate-500">{row.planDisplayName}</div>
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                        row.billingState.includes('Active')
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : row.billingState.includes('Grace')
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {row.billingState}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-300">
                    {row.paymentMethodMasked}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-white font-medium whitespace-nowrap">
                    €{row.monthlyContractValueEur.toLocaleString()}/mo
                  </td>
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-400">
                    {row.configuredGracePolicy}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {row.billingState.includes('Grace') ? (
                      <button
                        type="button"
                        onClick={() => handleExtendGrace(row.id, row.tenantName)}
                        className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
                      >
                        Override Grace
                      </button>
                    ) : (
                      <span className="text-slate-500 text-xs font-mono">In Good Standing</span>
                    )}
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
