import React, { useState } from 'react';
import {
  MOCK_ENTITLED_MODULES,
  MOCK_OPERATIONAL_LIMITS,
  MOCK_INVOICES
} from '../data/governanceMockData';

export const PlansBillingView: React.FC = () => {
  const [showPlanPreviewModal, setShowPlanPreviewModal] = useState<boolean>(false);
  const [showPortalNotice, setShowPortalNotice] = useState<boolean>(false);

  return (
    <div className="space-y-5">
      {/* Top Banner & Account Status */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">credit_card</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Plans &amp; Enterprise Entitlements</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active · Good Standing
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Billing managed via Stripe · Plumb Entitlement Engine authorizes enterprise runtime features &amp; compute limits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPortalNotice(true)}
            className="px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            <span>Stripe Customer Portal</span>
          </button>
          <button
            type="button"
            onClick={() => setShowPlanPreviewModal(true)}
            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">upgrade</span>
            <span>Review Plan Expansion</span>
          </button>
        </div>
      </div>

      {showPortalNotice && (
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-[17px] text-blue-700">shield_lock</span>
            <span>Directing to Stripe Billing Portal for customer cus_Qx8849bNm81 (PCI-DSS Tier 1 compliant)</span>
          </div>
          <button
            type="button"
            onClick={() => setShowPortalNotice(false)}
            className="text-blue-700 hover:text-blue-900 font-mono text-[11px] cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Plan Details & Payment Method Summary (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500 block">Subscription Tier</span>
            <span className="text-[10px] font-mono text-slate-400">Display name</span>
          </div>
          <div className="text-base font-bold text-slate-900 mt-1">Enterprise Control</div>
          <div className="text-[11px] font-mono text-slate-700 font-semibold mt-0.5 flex items-center gap-1">
            <span>Plan Version:</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">ENT-CONTROL-v7</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">€4,500 /mo billed annually</div>
          <span className="text-[10px] text-emerald-700 font-mono mt-1 block">Renews Oct 31, 2026</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Stripe Customer Reference</span>
          <div className="text-base font-mono font-bold text-slate-900 mt-1">cus_Qx8849bNm81</div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">Tax ID: DE 314 882 109</div>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">EU Reverse Charge Verified</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Primary Payment Method</span>
          <div className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <span className="font-mono text-sm">Mastercard •• 4242</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">Valid thru 08/28</div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Backup: SEPA Core Debit Active</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">AI Compute Usage Status</span>
          <div className="text-base font-mono font-bold text-slate-900 mt-1">
            18,420 <span className="text-xs text-slate-500 font-normal font-sans">/ 25k ACU</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '73.7%' }}></div>
          </div>
          <span className="text-[10px] text-amber-700 font-medium mt-1 block">73.7% used (70% warning threshold reached)</span>
        </div>
      </div>

      {/* Enterprise Operational Limits & Entitlements (Limit Gauges) */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900">Operational Limits &amp; Entitlement Corridor</h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                Versioned Entitlements · ENT-CONTROL-v7
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Deterministic platform quotas enforced at tenant kernel layer under plan version contract ENT-CONTROL-v7
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Plumb Entitlement Engine v2.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_OPERATIONAL_LIMITS.map((limit, idx) => {
            const pct = Math.min(100, Math.round((limit.current / limit.limit) * 100));
            const isWarning = pct >= limit.warningThresholdPercent;

            return (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">{limit.label}</span>
                  <span className={`font-mono text-[11px] font-bold ${isWarning ? 'text-amber-700' : 'text-slate-700'}`}>
                    {pct}%
                  </span>
                </div>

                <div className="flex items-baseline justify-between text-xs font-mono">
                  <span className="text-slate-900 font-bold">
                    {typeof limit.current === 'number' && limit.current > 1000
                      ? limit.current.toLocaleString()
                      : limit.current}
                  </span>
                  <span className="text-slate-400">
                    / {typeof limit.limit === 'number' && limit.limit > 1000
                      ? limit.limit.toLocaleString()
                      : limit.limit} {limit.unit}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isWarning ? 'bg-amber-500' : 'bg-blue-600'}`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>

                <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-0.5">
                  <span>Threshold: {limit.warningThresholdPercent}%</span>
                  <span className={isWarning ? 'text-amber-700 font-medium' : 'text-emerald-700'}>
                    {isWarning ? 'Approaching Cap' : 'Optimal'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Governance Capabilities */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-sans">Max Automation Authority</span>
            <strong className="text-slate-900 font-bold text-xs">A5 PROTECTED CONTROL</strong>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-sans">Model Provider Freedom</span>
            <strong className="text-emerald-700 font-bold text-xs">Google + OpenAI + Anthropic</strong>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-sans">Single Sign-On (SSO)</span>
            <strong className="text-slate-900 font-bold text-xs">SAML 2.0 / Okta Enforced</strong>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-sans">BYOK (Bring Your Own Key)</span>
            <strong className="text-blue-700 font-bold text-xs">Tenant Provider Policy &amp; Key Validation</strong>
          </div>
        </div>
      </div>

      {/* Included Product Modules Grid */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900">Included Enterprise Modules</h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Versioned Entitlements
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Contractually provisioned modules bound to Plan Version ENT-CONTROL-v7 (Display name: Enterprise Control)
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 font-semibold">8 of 8 Modules Active</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOCK_ENTITLED_MODULES.map((mod, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{mod.moduleName}</span>
                <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{mod.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices and Billing History */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Invoice History &amp; Receipts</h2>
            <p className="text-xs text-slate-500">
              Synchronized directly with Stripe billing events
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Billing Contact: finance@starlight-tools.de</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-medium bg-slate-50/70">
                <th className="py-2.5 px-3 font-medium">Invoice Number</th>
                <th className="py-2.5 px-3 font-medium">Invoice Date</th>
                <th className="py-2.5 px-3 font-medium">Service Period</th>
                <th className="py-2.5 px-3 font-medium font-mono">Amount (EUR)</th>
                <th className="py-2.5 px-3 font-medium">Payment Method</th>
                <th className="py-2.5 px-3 font-medium">Status</th>
                <th className="py-2.5 px-3 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">{inv.id}</td>
                  <td className="py-2.5 px-3 text-slate-700">{inv.date}</td>
                  <td className="py-2.5 px-3 text-slate-600 font-mono">{inv.period}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">€{inv.amountEur.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">{inv.method}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Downloading signed PDF receipt for ${inv.id}`)}
                      className="text-blue-600 hover:text-blue-800 font-mono text-xs font-medium cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise Safety & Payment Protection Guarantee Banner */}
      <div className="rounded-lg border border-slate-300 bg-slate-900 text-white p-5 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-amber-400">gavel</span>
          <h3 className="text-sm font-bold text-white tracking-tight">Enterprise Safety &amp; Payment Protection Guarantee</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          Payment failure must never imply destructive advertising changes. In event of billing disruption, Control remains protected during the configured policy grace period (Configured grace period: 14 days). New automated publication may transition to Recommend-only mode according to account policy. Billing status never triggers destructive reset of Plumb-controlled Merchant state.
        </p>
        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800">
          <span>SLA: 99.9% Control Engine Uptime Guarantee</span>
          <span className="text-emerald-400 font-semibold">Configured grace period: 14 days · State Protection Enforced</span>
        </div>
      </div>

      {/* Plan Change Preview Modal */}
      {showPlanPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-blue-600">compare_arrows</span>
                <h4 className="text-sm font-bold text-slate-900">Plan Expansion Preview: Enterprise Scale</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowPlanPreviewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                Compare your current entitlement against the <strong>Enterprise Scale</strong> tier before requesting contract amendment:
              </p>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden font-mono">
                <div className="p-2.5 bg-slate-50 flex justify-between font-bold text-slate-700">
                  <span>Capability / Limit</span>
                  <span>Enterprise Control → Enterprise Scale</span>
                </div>
                <div className="p-2.5 bg-white flex justify-between">
                  <span className="text-slate-600">Monthly Controlled Spend:</span>
                  <span className="font-semibold text-slate-900">€500,000 → €1,500,000</span>
                </div>
                <div className="p-2.5 bg-white flex justify-between">
                  <span className="text-slate-600">Monthly AI Compute (ACU):</span>
                  <span className="font-semibold text-blue-700">25,000 → 100,000 ACU</span>
                </div>
                <div className="p-2.5 bg-white flex justify-between">
                  <span className="text-slate-600">Connected Storefronts:</span>
                  <span className="font-semibold text-slate-900">10 Stores → Unlimited</span>
                </div>
                <div className="p-2.5 bg-white flex justify-between">
                  <span className="text-slate-600">Enterprise Deployment:</span>
                  <span className="font-semibold text-emerald-700">Multi-tenant Cloud → Optional Enterprise Private Deployment</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900">
                <strong>Amendment Protocol:</strong> An amendment schedule will be prepared for Starlight Europe GmbH and dispatched via DocuSign to authorized signatory.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPlanPreviewModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Expansion request forwarded to dedicated account executive.');
                  setShowPlanPreviewModal(false);
                }}
                className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
              >
                Request Contract Amendment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
