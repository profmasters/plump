import React, { useState } from 'react';
import { MOCK_PORTFOLIO_TENANTS, TenantPortfolioItem } from '../data/supportingScreensMockData';
import { OperatingMode } from '../types';

export const AgencyCommandCenterView: React.FC = () => {
  const [tenants, setTenants] = useState<TenantPortfolioItem[]>(MOCK_PORTFOLIO_TENANTS);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [selectedModeFilter, setSelectedModeFilter] = useState<string>('ALL');
  const [activeTemplateDrawer, setActiveTemplateDrawer] = useState<string | null>(null);

  // Portfolio Totals
  const totalControlledSpend = tenants.reduce((acc, t) => acc + t.controlledSpendEur, 0);
  const totalAtRiskSpend = tenants.reduce((acc, t) => acc + t.atRiskSpendEur, 0);
  const totalPendingApprovals = tenants.reduce((acc, t) => acc + t.pendingApprovalsCount, 0);
  const totalCriticalIssues = tenants.reduce((acc, t) => acc + t.criticalIssuesCount, 0);

  const filteredTenants = tenants.filter((t) => {
    if (selectedRiskFilter === 'CRITICAL_ONLY' && t.criticalIssuesCount === 0) return false;
    if (selectedModeFilter !== 'ALL' && t.operatingMode !== selectedModeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Governance Scope Notice */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">domain</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Agency Command Center</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
              Multi-Tenant Federated Portfolio
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict tenant isolation enforced · Portfolio aggregation preserves individual client RBAC, approval workflows, and kill-switches
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center gap-1.5 text-slate-600">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">lock</span>
            <span>Cryptographic Partition: Verified</span>
          </div>
        </div>
      </div>

      {/* 2. Portfolio Health Summary Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Total Controlled Spend</span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            €{totalControlledSpend.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Active under Plumb Control policy</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Total At-Risk Spend</span>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">
            €{totalAtRiskSpend.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Observational exposure (stock/margin)</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Tenants Requiring Attention</span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1 flex items-baseline gap-1.5">
            <span>{tenants.filter(t => t.criticalIssuesCount > 0 || t.publicationHealth !== 'Optimal').length}</span>
            <span className="text-xs font-normal text-slate-400">/ {tenants.length} tenants</span>
          </div>
          <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Health or publication warnings</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Pending Client Approvals</span>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">
            {totalPendingApprovals}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Awaiting local tenant four-eyes</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Critical Publication Issues</span>
          <div className="text-xl font-bold font-mono text-rose-700 mt-1">
            {totalCriticalIssues}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block mt-0.5">0 bypasses · Safety corridor active</span>
        </div>
      </div>

      {/* 3. Portfolio Table with Isolation Safeguard */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Federated Tenant Operating Console</h2>
            <p className="text-xs text-slate-500">
              Agency actions stage review or navigate into the specific tenant workspace — agency views never silently mutate client state
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedModeFilter}
              onChange={(e) => setSelectedModeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none"
            >
              <option value="ALL">All Operating Modes</option>
              <option value="Control (Active)">Control (Active)</option>
              <option value="Recommend">Recommend</option>
              <option value="Observe">Observe</option>
            </select>

            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none"
            >
              <option value="ALL">All Risk Profiles</option>
              <option value="CRITICAL_ONLY">Critical Issues Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-medium bg-slate-50/70">
                <th className="py-2.5 px-3 font-medium">Client / Tenant</th>
                <th className="py-2.5 px-3 font-medium">Commerce Stack</th>
                <th className="py-2.5 px-3 font-medium">Markets</th>
                <th className="py-2.5 px-3 font-medium font-mono text-right">Controlled Spend</th>
                <th className="py-2.5 px-3 font-medium font-mono text-right">At-Risk Spend</th>
                <th className="py-2.5 px-3 font-medium text-center">Data Confidence</th>
                <th className="py-2.5 px-3 font-medium">Operating Mode</th>
                <th className="py-2.5 px-3 font-medium">Publication Health</th>
                <th className="py-2.5 px-3 font-medium text-center">Modules</th>
                <th className="py-2.5 px-3 font-medium text-center">Pending Approvals</th>
                <th className="py-2.5 px-3 font-medium">Last Activity</th>
                <th className="py-2.5 px-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{tenant.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{tenant.legalEntity}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-slate-700 font-mono text-[11px]">{tenant.commerceStack}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      {tenant.markets.map((m) => (
                        <span key={m} className="px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    €{tenant.controlledSpendEur.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-amber-700">
                    €{tenant.atRiskSpendEur.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`font-mono text-xs font-semibold ${
                      tenant.dataConfidencePercent >= 98 ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {tenant.dataConfidencePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      tenant.operatingMode === 'Control (Active)'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : tenant.operatingMode === 'Recommend'
                        ? 'bg-purple-50 text-purple-800 border border-purple-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {tenant.operatingMode}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                      tenant.publicationHealth === 'Optimal' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tenant.publicationHealth === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      {tenant.publicationHealth}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[11px] text-slate-600">
                    {tenant.activeModulesCount}/{tenant.totalModulesCount}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {tenant.pendingApprovalsCount > 0 ? (
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[10px] font-bold">
                        {tenant.pendingApprovalsCount}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-[11px]">0</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {tenant.lastActivityTime}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Switching context to tenant workspace: ${tenant.name}. Local RBAC and approval policies will govern this session.`)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-[11px] transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Enter Workspace</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Policy Template Staging & Per-Tenant Instantiation Section */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <h3 className="font-semibold text-slate-900">Agency Policy Templates Library</h3>
            <p className="text-slate-500 text-[11px]">
              Reusable policy templates must be explicitly instantiated and approved within each tenant's governance sandbox before activation.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTemplateDrawer('Enterprise High-Velocity Margin v4')}
              className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">file_copy</span>
              <span>Inspect Template: Margin v4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Template Inspection Modal */}
      {activeTemplateDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-blue-600">description</span>
                <h4 className="text-sm font-bold text-slate-900">{activeTemplateDrawer}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveTemplateDrawer(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <p>
                <strong>Template ID:</strong> <span className="font-mono text-slate-800">TMPL-CORRIDOR-MARGIN-V4</span>
              </p>
              <p>
                <strong>Corridor Logic:</strong> Suppresses bid tier when Days of Cover &lt; 2.0 OR Net Contribution Margin &lt; 0.0%.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 text-[11px] leading-relaxed">
                <strong>Governance Rule:</strong> Agency managers cannot unilaterally deploy this template across tenants. Each client's designated Approver or Four-Eyes team must stage simulation and accept terms.
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTemplateDrawer(null)}
                className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
