import React, { useState } from 'react';
import {
  CANONICAL_PLAN_VERSIONS,
  CanonicalPlanVersion,
} from '../../data/superAdminMockData';

export const PlanBuilderScreen: React.FC = () => {
  const [plans, setPlans] = useState<CanonicalPlanVersion[]>(CANONICAL_PLAN_VERSIONS);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-v7');
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);

  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const handleValidateNewVersion = () => {
    setShowValidationSuccess(true);
    setTimeout(() => setShowValidationSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header & Immutable Rule Notice */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-amber-400">receipt_long</span>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Canonical Plan Engine &amp; Entitlement Matrix
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Plan Builder &amp; Versioned Entitlements</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict Architecture: Published plan versions are strictly immutable. Upgrades create new versioned records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleValidateNewVersion}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Validate New Plan Version (v8)</span>
          </button>
        </div>
      </div>

      {showValidationSuccess && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg text-xs text-emerald-300 font-mono flex items-center justify-between animate-in fade-in duration-150">
          <span>✓ Staged validation check PASSED for ENT-CONTROL-v8. Zero breaking schema conflicts.</span>
          <span className="text-[11px] text-emerald-400">Read-Only Stage</span>
        </div>
      )}

      {/* Grid: Plan Version Selector & Plan Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 4 cols: Version History list */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono px-1">
            Canonical Plan Versions
          </div>
          <div className="space-y-2">
            {plans.map((p) => {
              const isSelected = p.id === activePlan.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-xs'
                      : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm">{p.displayName}</span>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-mono font-semibold ${
                        p.status === 'Published'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : p.status === 'Validating'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400">{p.planVersion}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{p.activeTenantsCount} active tenants</span>
                    <span>Released: {p.releaseDate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-200 block mb-1">Immuntability Interlock:</span>
            Existing tenants on ENT-CONTROL-v6 continue running until explicit migration order. Zero silent entitlement drift.
          </div>
        </div>

        {/* Right 8 cols: Active Plan Entitlement Schema */}
        <div className="lg:col-span-8 bg-[#0F172A] border border-slate-800 rounded-lg p-5 space-y-5 text-xs">
          {/* Plan Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{activePlan.displayName}</h2>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  {activePlan.planVersion}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] font-mono mt-0.5">
                Status: {activePlan.status} · Binding: Versioned Entitlement Schema
              </p>
            </div>
            <div className="text-right font-mono text-slate-400 text-[11px]">
              {activePlan.activeTenantsCount} Tenants Bound
            </div>
          </div>

          {/* Operational Limits */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2.5">
              1. Operational Capacity &amp; Resource Limits
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Max Controlled Spend</span>
                <span className="text-white font-bold text-sm">
                  €{activePlan.operationalLimits.maxControlledSpendEur.toLocaleString()}/mo
                </span>
              </div>
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Catalog SKU Limit</span>
                <span className="text-white font-bold text-sm">
                  {activePlan.operationalLimits.maxSkuCatalog.toLocaleString()} SKUs
                </span>
              </div>
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Max Active Markets</span>
                <span className="text-white font-bold text-sm">{activePlan.operationalLimits.maxMarkets} Markets</span>
              </div>
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Max Operator Seats</span>
                <span className="text-white font-bold text-sm">{activePlan.operationalLimits.maxOperators} Users</span>
              </div>
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Max Active Automations</span>
                <span className="text-white font-bold text-sm">
                  {activePlan.operationalLimits.maxAutomations} Policies
                </span>
              </div>
            </div>
          </div>

          {/* Feature Entitlements Matrix */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2.5">
              2. Guard &amp; Governance Entitlements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Inventory Stockout Guard (DOC Interlock)', active: activePlan.entitlements.inventoryGuard },
                { label: 'Profit & Negative Margin Guard', active: activePlan.entitlements.profitGuard },
                { label: 'Price Glitch & Disparity Guard', active: activePlan.entitlements.priceGuard },
                { label: 'Causal Synthetic Control Experimentation', active: activePlan.entitlements.experimentationCausal },
                { label: 'Merchant Supplemental Direct Feed Push', active: activePlan.entitlements.merchantSupplementalPush },
                { label: 'Four-Eyes Enterprise Governance Interlock', active: activePlan.entitlements.fourEyesGovernance },
                { label: 'Cryptographic Audit Chaining (SHA-256)', active: activePlan.entitlements.auditChainingSha256 },
                { label: 'BYOK Cloud HSM Key Isolation', active: activePlan.entitlements.byokCustomHsm },
              ].map((ent) => (
                <div
                  key={ent.label}
                  className={`p-2.5 rounded border flex items-center justify-between text-xs ${
                    ent.active
                      ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                      : 'bg-slate-900/20 border-slate-800/40 text-slate-500 line-through'
                  }`}
                >
                  <span>{ent.label}</span>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      ent.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {ent.active ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Authority & FinOps Ceiling */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2.5">
              3. AI Authority &amp; FinOps Circuit Breaker
            </h3>
            <div className="p-3 bg-slate-900 rounded border border-slate-800 font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly ACU Allocation:</span>
                <span className="text-emerald-400 font-bold">{activePlan.aiLimits.monthlyAcuBudget.toLocaleString()} ACUs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Authority Ceiling:</span>
                <span className="text-amber-400 font-bold">{activePlan.aiLimits.authorityCeiling}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FinOps Monthly Circuit Breaker:</span>
                <span className="text-white font-bold">€{activePlan.aiLimits.finOpsCircuitBreakerEur.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                <span className="text-slate-500">Allowed LLM Providers:</span>
                <span className="text-slate-300">{activePlan.aiLimits.allowedProviders.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
