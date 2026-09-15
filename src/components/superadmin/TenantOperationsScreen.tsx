import React, { useState } from 'react';
import {
  PlatformTenantItem,
  PLATFORM_TENANTS,
  SuperAdminViewType,
} from '../../data/superAdminMockData';

interface TenantOperationsScreenProps {
  tenant: PlatformTenantItem | null;
  onNavigateTo: (view: SuperAdminViewType) => void;
  onOpenSupportSessionModal: (tenant: PlatformTenantItem) => void;
}

export const TenantOperationsScreen: React.FC<TenantOperationsScreenProps> = ({
  tenant,
  onNavigateTo,
  onOpenSupportSessionModal,
}) => {
  const currentTenant = tenant || PLATFORM_TENANTS[0];
  const [selectedTab, setSelectedTab] = useState<'overview' | 'wiring' | 'entitlements' | 'support' | 'incidents'>('overview');

  return (
    <div className="space-y-5 text-slate-100">
      {/* Top Banner: Not Customer Dashboard Notice */}
      <div className="bg-amber-950/20 border border-amber-800/50 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-300">
          <span className="material-symbols-outlined text-[18px]">lock</span>
          <span className="font-semibold">Plumb Platform Admin · Privileged Tenant Operations Console</span>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Viewing: <span className="text-white font-bold">{currentTenant.name}</span> ({currentTenant.slug}) · Region: {currentTenant.region}
        </div>
      </div>

      {/* Tenant Identity & Action Bar */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-semibold text-amber-400 border border-slate-700">
              TENANT ID: {currentTenant.id}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                currentTenant.operatingMode === 'Control (Active)'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              Mode: {currentTenant.operatingMode}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{currentTenant.name}</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Stack: {currentTenant.commerceStack} · Contact: {currentTenant.contactEmail}
          </p>
        </div>

        {/* Guarded Admin Action: Enter Support Session */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateTo('tenants')}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
          >
            ← Back to Registry
          </button>

          <button
            type="button"
            onClick={() => onOpenSupportSessionModal(currentTenant)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Enter Support Session</span>
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-1 border-b border-slate-800 text-xs overflow-x-auto">
        {[
          { id: 'overview', label: 'Platform Snapshot', icon: 'dashboard' },
          { id: 'wiring', label: 'Google Merchant & Ads Wiring', icon: 'cable' },
          { id: 'entitlements', label: 'Versioned Entitlements', icon: 'verified' },
          { id: 'support', label: 'Support Session Governance', icon: 'admin_panel_settings' },
          { id: 'incidents', label: 'Tenant Incident History', icon: 'history' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
              selectedTab === tab.id
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: Overview */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Spend & Control Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Controlled Spend Scope
            </h3>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              €{currentTenant.controlledSpendEur.toLocaleString()}/mo
            </div>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800 font-mono">
              <div className="flex justify-between">
                <span>Controllable Spend:</span>
                <span className="text-white">€{currentTenant.controllableSpendEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>At-risk Spend (Observational):</span>
                <span className="text-rose-400">€{currentTenant.atRiskSpendEur.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Markets:</span>
                <span className="text-white">{currentTenant.markets.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Plan & Entitlements Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Canonical Plan Binding
            </h3>
            <div>
              <div className="text-lg font-bold text-white">{currentTenant.planDisplayName}</div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">{currentTenant.planVersion}</div>
            </div>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800 font-mono">
              <div className="flex justify-between">
                <span>Entitlement Snapshot:</span>
                <span className="text-slate-300">{currentTenant.entitlementVersion}</span>
              </div>
              <div className="flex justify-between">
                <span>Four-Eyes Threshold:</span>
                <span className="text-white">€5,000 / override</span>
              </div>
              <div className="flex justify-between">
                <span>AI Authority Ceiling:</span>
                <span className="text-amber-400">A5 (Protected Control)</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Health Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Infrastructure Interlock
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-sm font-semibold text-white">Merchant API Dispatcher Verified</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800 font-mono">
              <div className="flex justify-between">
                <span>Connector Stream:</span>
                <span className="text-emerald-400">{currentTenant.connectorHealth}</span>
              </div>
              <div className="flex justify-between">
                <span>Stripe State:</span>
                <span className="text-white">{currentTenant.billingState}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Telemetry Beat:</span>
                <span className="text-slate-300">12s ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Wiring */}
      {selectedTab === 'wiring' && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white text-sm">Google Merchant API &amp; Ads Supplemental Interlock</h3>
            <span className="font-mono text-[11px] text-emerald-400">Verified Binding</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-2">
              <span className="text-slate-400 block text-[11px]">Primary Supplemental Feed ID</span>
              <span className="text-white font-semibold text-sm">SUPP-FEED-DE-884102</span>
              <p className="text-[11px] text-slate-500">
                Target: Google Merchant Center Account #9921-4402 (Nordic Tech DE)
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-2">
              <span className="text-slate-400 block text-[11px]">Google Ads Customer Link</span>
              <span className="text-white font-semibold text-sm">CID: 441-992-1082</span>
              <p className="text-[11px] text-slate-500">
                Verified custom_label_0 (Tier) through custom_label_4 (Lead Time)
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded border border-slate-800 text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-1">Strict Verification Rule:</span>
            Never equate HTTP 200/202 acceptance with successful control. Plumb performs automated post-push verification against Google Merchant API read-back channels before confirming tier transitions.
          </div>
        </div>
      )}

      {/* TAB CONTENT: Support Session Governance */}
      {selectedTab === 'support' && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white text-sm">Four-Eyes Support Impersonation &amp; Recording Rules</h3>
            <span className="font-mono text-[11px] text-amber-400">Zero Silent Access</span>
          </div>

          <div className="p-4 bg-amber-950/20 border border-amber-800/50 rounded-lg space-y-2 text-amber-200">
            <div className="font-semibold text-amber-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">security</span>
              <span>Platform Support Session Policy</span>
            </div>
            <p className="leading-relaxed">
              Platform administrators must never silently impersonate a customer. Every support session requires:
            </p>
            <ul className="list-disc list-inside space-y-1 font-mono text-[11px]">
              <li>Explicit customer authorization ticket reference</li>
              <li>Operational justification / reason logged into legal audit ledger</li>
              <li>Time-bounded session lease (max 60 minutes)</li>
              <li>Cryptographic audit hash recording under the acting administrator</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onOpenSupportSessionModal(currentTenant)}
            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs shadow-xs"
          >
            Launch Guarded Support Session Dialog →
          </button>
        </div>
      )}

      {/* TAB CONTENT: Entitlements & Incidents */}
      {(selectedTab === 'entitlements' || selectedTab === 'incidents') && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 text-xs text-slate-300">
          <div className="font-mono text-slate-400 mb-2">Canonical Binding: {currentTenant.entitlementVersion}</div>
          <p>
            Active interlock: All 8 core guard modules active under plan version {currentTenant.planVersion}. 0 active critical incidents recorded for {currentTenant.name} in the past 30 days.
          </p>
        </div>
      )}
    </div>
  );
};
