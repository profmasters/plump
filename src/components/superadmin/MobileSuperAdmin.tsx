import React, { useState } from 'react';
import {
  PLATFORM_TENANTS,
  PLATFORM_INCIDENTS,
  PlatformTenantItem,
  PlatformIncident,
} from '../../data/superAdminMockData';
import { AuthorizedAppSwitcher } from '../common/AuthorizedAppSwitcher';

interface MobileSuperAdminProps {
  onSwitchToCustomerDashboard: () => void;
  onOpenGlobalKillSwitch: () => void;
  isGlobalKillSwitchArmed: boolean;
}

export type SuperAdminMobileTab = 'health' | 'tenants' | 'incidents' | 'approvals' | 'more';

export const MobileSuperAdmin: React.FC<MobileSuperAdminProps> = ({
  onSwitchToCustomerDashboard,
  onOpenGlobalKillSwitch,
  isGlobalKillSwitchArmed,
}) => {
  const [activeTab, setActiveTab] = useState<SuperAdminMobileTab>('health');
  const [selectedIncident, setSelectedIncident] = useState<PlatformIncident | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<PlatformTenantItem | null>(null);
  const [ackToast, setAckToast] = useState<string | null>(null);
  const [isReadOnlyInspectorOpen, setIsReadOnlyInspectorOpen] = useState(false);
  const [readOnlyTab, setReadOnlyTab] = useState<'plans' | 'routing' | 'schemas'>('plans');

  const activeIncidents = PLATFORM_INCIDENTS.filter((i) => i.status !== 'Resolved');

  const handleAcknowledgeIncident = (id: string) => {
    setAckToast(`Incident ${id} acknowledged by Platform Operator.`);
    setSelectedIncident(null);
    setTimeout(() => setAckToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 px-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-mono font-bold text-sm border border-slate-700">
            PA
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">Platform Admin</span>
              <span className="px-1.5 py-0.2 rounded font-mono text-[9px] font-bold bg-slate-900 text-amber-300">
                PROD
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">Global Fleet Scope</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('more')}
          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Apps
        </button>
      </header>

      {/* Main Mobile Screen */}
      <main className="flex-1 p-4 pb-20 max-w-lg mx-auto w-full space-y-4">
        {ackToast && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
            <span>{ackToast}</span>
          </div>
        )}

        {/* 1. HEALTH TAB */}
        {activeTab === 'health' && (
          <div className="space-y-4">
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Global Fleet Status
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Platform Health</h1>
            </div>

            {/* Above fold status chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold whitespace-nowrap">
                Pipelines 99.98%
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold whitespace-nowrap">
                {PLATFORM_TENANTS.length} Active Tenants
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold whitespace-nowrap">
                Google Merchant API: Healthy
              </span>
            </div>

            {/* Fleet Overview Metrics */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Fleet Capacity &amp; Telemetry
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block uppercase">Managed Spend</span>
                  <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">€14.8M</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">+12.4% MoM</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block uppercase">Active Connectors</span>
                  <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">58</span>
                  <span className="text-[10px] text-slate-500">100% SLA compliant</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">Supplemental Mutations:</span>
                <span className="font-mono font-bold text-slate-900">48,290 / 24h</span>
              </div>
            </div>

            {/* Active Incidents Banner */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Active Incidents</h3>
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  {activeIncidents.length} active
                </span>
              </div>

              <div className="space-y-2">
                {activeIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-rose-600 px-1.5 py-0.2 bg-rose-50 rounded border border-rose-200">
                        {inc.severity.split(' ')[0]} · {inc.id}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{inc.startedAt}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{inc.incidentType} Incident</div>
                    <div className="text-[11px] text-slate-500">{inc.affectedTenantsList.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. TENANTS TAB */}
        {activeTab === 'tenants' && (
          <div className="space-y-4">
            <div className="pt-1">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Tenants Directory</h1>
              <p className="text-xs text-slate-500">{PLATFORM_TENANTS.length} onboarded enterprise customers</p>
            </div>

            <div className="space-y-3">
              {PLATFORM_TENANTS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTenant(t)}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-blue-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                      <span className="text-[11px] font-mono text-slate-400">{t.commerceStack} · {t.region}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        t.connectorHealth === 'Healthy'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {t.connectorHealth}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span>Plan: {t.planDisplayName}</span>
                    <span className="font-mono font-bold text-slate-800">€{t.controlledSpendEur.toLocaleString()} spend</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. INCIDENTS TAB */}
        {activeTab === 'incidents' && (
          <div className="space-y-4">
            <div className="pt-1">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Incident Center</h1>
              <p className="text-xs text-slate-500">Acknowledge &amp; triage platform alerts</p>
            </div>

            <div className="space-y-3">
              {PLATFORM_INCIDENTS.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-blue-300 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        inc.severity.startsWith('P1')
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {inc.severity.split(' ')[0]} · {inc.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{inc.status}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{inc.incidentType} Incident</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{inc.currentEvidence}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      Exposure: €{inc.financialExposureEur.toLocaleString()}
                    </span>
                    <span className="font-bold text-blue-600">Inspect →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. APPROVALS TAB */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <div className="pt-1">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Platform Approvals</h1>
              <p className="text-xs text-slate-500">Cross-tenant staged actions &amp; quota changes</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Tenant Quota Expansion</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-800">Pending</span>
              </div>
              <p className="text-xs text-slate-600">
                Nordic Tech Retailer AB requested ACU quota increase from 10k to 25k for peak season preparation.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  className="flex-1 h-10 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="flex-1 h-10 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Approve Quota
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. MORE TAB */}
        {activeTab === 'more' && (
          <div className="space-y-5">
            <div className="pt-1">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Platform Controls</h1>
              <p className="text-xs text-slate-500">Emergency interlocks &amp; authorized app switcher</p>
            </div>

            {/* Global Kill Switch */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-rose-600">shield</span>
                  <h3 className="text-sm font-bold text-slate-900">Global Fleet Kill Switch</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  isGlobalKillSwitchArmed ? 'bg-slate-100 text-slate-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {isGlobalKillSwitchArmed ? 'Armed' : 'Tripped'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Freezes Google Merchant API mutations (Supplemental data source) fleet-wide across all active tenants.
              </p>
              <button
                type="button"
                onClick={onOpenGlobalKillSwitch}
                className="w-full h-11 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Inspect Global Safety Circuit
              </button>
            </div>

            {/* Desktop Recommended Notice for Complex Screens */}
            <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-3">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-500">laptop_mac</span>
                <span>Desktop Recommended Screens</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Plan Builder, Routing Policy Graph, and Entitlement Schemas require high-density screen real estate for mutations. On mobile, these are available in safe read-only inspection mode.
              </p>
              <button
                type="button"
                onClick={() => setIsReadOnlyInspectorOpen(true)}
                className="w-full h-11 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 active:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-slate-600">visibility</span>
                <span>Inspect Plans, Routing &amp; Schemas (Read-Only)</span>
              </button>
            </div>

            {/* Authorized App Switcher */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <AuthorizedAppSwitcher
                currentApp="platform-admin"
                onSwitchApp={(app) => {
                  if (app === 'customer-dashboard') {
                    onSwitchToCustomerDashboard();
                  }
                }}
                variant="sheet"
              />
            </div>
          </div>
        )}
      </main>

      {/* INCIDENT DETAIL MODAL / SHEET */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setSelectedIncident(null)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-600 uppercase">
                  {selectedIncident.severity} · {selectedIncident.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedIncident.incidentType} Alert</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIncident(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedIncident.currentEvidence}</p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Tenant Scope:</span>
                <span className="font-bold text-slate-800">{selectedIncident.affectedTenantsList.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Started At:</span>
                <span className="text-slate-800">{selectedIncident.startedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mitigation:</span>
                <span className="text-emerald-600 font-bold">{selectedIncident.mitigation}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedIncident(null)}
                className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => handleAcknowledgeIncident(selectedIncident.id)}
                className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs"
              >
                Acknowledge Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN SAFE READ-ONLY INSPECTOR MODAL */}
      {isReadOnlyInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setIsReadOnlyInspectorOpen(false)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-slate-900">Safe Inspection Mode</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    READ-ONLY
                  </span>
                </div>
                <span className="text-xs text-slate-500">Mobile UI is read-only by product UX · API mutations enforced by RBAC policy</span>
              </div>
              <button
                type="button"
                onClick={() => setIsReadOnlyInspectorOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Read-only Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setReadOnlyTab('plans')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                  readOnlyTab === 'plans'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Plans &amp; Limits
              </button>
              <button
                type="button"
                onClick={() => setReadOnlyTab('routing')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                  readOnlyTab === 'routing'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Global Routing
              </button>
              <button
                type="button"
                onClick={() => setReadOnlyTab('schemas')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                  readOnlyTab === 'schemas'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Entitlements
              </button>
            </div>

            {/* TAB CONTENT */}
            {readOnlyTab === 'plans' && (
              <div className="space-y-3">
                {[
                  { name: 'Growth Tier', spendLimit: '€250k / mo', skuCap: '10,000 SKUs', rateLimit: '120 req/m', status: 'Active' },
                  { name: 'Scale Tier', spendLimit: '€1.5M / mo', skuCap: '75,000 SKUs', rateLimit: '600 req/m', status: 'Active' },
                  { name: 'Enterprise Fleet', spendLimit: 'Unlimited', skuCap: '500,000 SKUs', rateLimit: '3,000 req/m', status: 'Active' },
                ].map((plan, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{plan.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {plan.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-slate-600">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">Spend Limit</span>
                        <span>{plan.spendLimit}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">Catalog Cap</span>
                        <span>{plan.skuCap}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">API Quota</span>
                        <span>{plan.rateLimit}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-200/60">
                      <span className="material-symbols-outlined text-[12px]">lock</span>
                      <span>Mutation policy locked · Requires verified Super Admin policy claim</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {readOnlyTab === 'routing' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800">Primary Mutation Routing Topology</div>
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between p-2 rounded-lg bg-white border border-slate-200/80">
                      <div>
                        <span className="font-bold text-slate-900">europe-west1 (Belgium)</span>
                        <span className="text-slate-400 block text-[10px]">EU Tenants · Live Gateway</span>
                      </div>
                      <span className="text-emerald-600 font-bold">12ms · 99.99%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white border border-slate-200/80">
                      <div>
                        <span className="font-bold text-slate-900">us-east4 (N. Virginia)</span>
                        <span className="text-slate-400 block text-[10px]">US / Global Failover</span>
                      </div>
                      <span className="text-emerald-600 font-bold">48ms · Standby</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                    <span className="material-symbols-outlined text-[12px]">lock</span>
                    <span>Failover policy locked · Requires dual-authorization platform operator claim</span>
                  </div>
                </div>
              </div>
            )}

            {readOnlyTab === 'schemas' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block">Active Entitlement Fields</span>
                  <div className="space-y-1 font-mono text-[11px] text-slate-700">
                    <div className="flex justify-between border-b border-slate-200/60 pb-1">
                      <span>plumb:max_controlled_spend</span>
                      <span className="text-slate-500">Integer (EUR)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1">
                      <span>plumb:merchant_api_version</span>
                      <span className="text-slate-500">v1beta (Supplemental)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1">
                      <span>plumb:kill_switch_authorized</span>
                      <span className="text-slate-500">Boolean (RBAC)</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                    <span className="material-symbols-outlined text-[12px]">lock</span>
                    <span>Schema mutation policy locked · Requires super_admin schema entitlement</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsReadOnlyInspectorOpen(false)}
              className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold text-xs cursor-pointer"
            >
              Close Safe Inspector
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM 5-DESTINATION NAVIGATION AS MANDATED */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-40 px-2 flex items-center justify-around shadow-lg pb-safe">
        {[
          { id: 'health' as SuperAdminMobileTab, label: 'Health', icon: 'health_and_safety' },
          { id: 'tenants' as SuperAdminMobileTab, label: 'Tenants', icon: 'domain' },
          { id: 'incidents' as SuperAdminMobileTab, label: 'Incidents', icon: 'warning', badge: activeIncidents.length > 0 ? `${activeIncidents.length}` : undefined },
          { id: 'approvals' as SuperAdminMobileTab, label: 'Approvals', icon: 'verified_user' },
          { id: 'more' as SuperAdminMobileTab, label: 'More', icon: 'menu' },
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 h-full flex flex-col items-center justify-center transition-colors relative min-w-[56px] ${
                isActive ? 'text-amber-700 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="text-[11px] tracking-tight mt-0.5 font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute top-2 right-[25%] px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-mono leading-none">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
