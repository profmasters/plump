import React, { useState } from 'react';
import {
  PLATFORM_TENANTS,
  PlatformTenantItem,
  SuperAdminViewType,
} from '../../data/superAdminMockData';

interface TenantsScreenProps {
  onSelectTenant: (tenant: PlatformTenantItem) => void;
  onNavigateTo: (view: SuperAdminViewType) => void;
}

export const TenantsScreen: React.FC<TenantsScreenProps> = ({ onSelectTenant, onNavigateTo }) => {
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('ALL');
  const [filterMode, setFilterMode] = useState('ALL');
  const [filterPlan, setFilterPlan] = useState('ALL');

  const filteredTenants = PLATFORM_TENANTS.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchStack = t.commerceStack.toLowerCase().includes(q);
      const matchPlan = t.planVersion.toLowerCase().includes(q);
      if (!matchName && !matchStack && !matchPlan) return false;
    }
    if (filterRegion !== 'ALL' && !t.region.includes(filterRegion)) return false;
    if (filterMode !== 'ALL' && t.operatingMode !== filterMode) return false;
    if (filterPlan !== 'ALL' && t.planVersion !== filterPlan) return false;
    return true;
  });

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-amber-400">domain</span>
            <h1 className="text-xl font-bold tracking-tight text-white">Platform Tenant Registry</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            48 total provisioned tenants · Multi-region commerce isolation with versioned entitlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Showing:</span>{' '}
            <span className="font-bold text-white">{filteredTenants.length} of 48</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0F172A] border border-slate-800 p-3.5 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-xs">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-slate-400">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tenant name, stack, plan version..."
              className="w-full h-8 pl-8 pr-3 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="h-8 px-2.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs"
          >
            <option value="ALL">All Regions</option>
            <option value="Frankfurt">EU-Central (Frankfurt)</option>
            <option value="Amsterdam">EU-West (Amsterdam)</option>
            <option value="London">UK-South (London)</option>
          </select>

          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="h-8 px-2.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs"
          >
            <option value="ALL">All Modes</option>
            <option value="Control (Active)">Control (Active)</option>
            <option value="Recommend">Recommend</option>
            <option value="Observe">Observe</option>
          </select>

          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="h-8 px-2.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono"
          >
            <option value="ALL">All Plan Versions</option>
            <option value="ENT-CONTROL-v7">ENT-CONTROL-v7</option>
            <option value="ENT-CONTROL-v6">ENT-CONTROL-v6</option>
            <option value="PERF-CORE-v5">PERF-CORE-v5</option>
          </select>
        </div>

        {(search || filterRegion !== 'ALL' || filterMode !== 'ALL' || filterPlan !== 'ALL') && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setFilterRegion('ALL');
              setFilterMode('ALL');
              setFilterPlan('ALL');
            }}
            className="text-xs text-amber-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* DENSE PLATFORM TENANT TABLE (Desktop) / OPERATIONAL CARDS (Mobile) */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg overflow-hidden">
        {/* Desktop Table View (hidden on small mobile) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="px-4 py-3">Tenant &amp; Stack</th>
                <th className="px-3 py-3">Region</th>
                <th className="px-3 py-3">Plan / Entitlement Version</th>
                <th className="px-3 py-3 text-center">Mode</th>
                <th className="px-3 py-3 text-right">Controlled Spend</th>
                <th className="px-3 py-3 text-center">Merchant Verification</th>
                <th className="px-3 py-3 text-center">Connector Health</th>
                <th className="px-3 py-3 text-center">Billing State</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{t.commerceStack}</div>
                  </td>
                  <td className="px-3 py-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {t.region}
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-mono text-emerald-400 font-medium text-[11px]">{t.planVersion}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{t.planDisplayName}</div>
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        t.operatingMode === 'Control (Active)'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : t.operatingMode === 'Recommend'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {t.operatingMode}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono font-medium text-white whitespace-nowrap">
                    €{t.controlledSpendEur.toLocaleString()}/mo
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-mono ${
                        t.merchantHealth === 'Verified'
                          ? 'text-emerald-400'
                          : t.merchantHealth === 'Pending Verification'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {t.merchantHealth}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono ${
                        t.connectorHealth === 'Healthy'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      {t.connectorHealth}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono ${
                        t.billingState.includes('Active')
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {t.billingState}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTenant(t);
                        onNavigateTo('tenant-operations');
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 font-medium text-xs transition-colors border border-slate-700"
                    >
                      Operations →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Operational Cards (visible on < lg:) */}
        <div className="lg:hidden divide-y divide-slate-800 p-3 space-y-3">
          {filteredTenants.map((t) => (
            <div key={t.id} className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white text-sm">{t.name}</h3>
                  <div className="text-[11px] text-slate-400 font-mono">{t.commerceStack}</div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                    t.operatingMode === 'Control (Active)'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {t.operatingMode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block">Plan:</span>
                  <span className="text-emerald-400 font-semibold">{t.planVersion}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Controlled Spend:</span>
                  <span className="text-white font-semibold">€{t.controlledSpendEur.toLocaleString()}/mo</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Merchant API:</span>
                  <span className={t.merchantHealth === 'Verified' ? 'text-emerald-400' : 'text-rose-400'}>
                    {t.merchantHealth}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Region:</span>
                  <span>{t.region}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono">{t.lastActivity}</span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectTenant(t);
                    onNavigateTo('tenant-operations');
                  }}
                  className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs"
                >
                  Inspect Tenant →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
