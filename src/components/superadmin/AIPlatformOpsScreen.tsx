import React, { useState } from 'react';
import {
  AI_PROVIDER_FLEET,
  AIProviderFleetItem,
} from '../../data/superAdminMockData';

export const AIPlatformOpsScreen: React.FC = () => {
  const [fleet, setFleet] = useState<AIProviderFleetItem[]>(AI_PROVIDER_FLEET);
  const [globalCircuitTripped, setGlobalCircuitTripped] = useState(false);

  const totalMonthlySpend = fleet.reduce(
    (acc, p) => acc + p.models.reduce((mAcc, m) => mAcc + m.currentMonthlyCostEur, 0),
    0
  );

  const totalMonthlyBudget = fleet.reduce(
    (acc, p) => acc + p.models.reduce((mAcc, m) => mAcc + m.monthlyCostBudgetEur, 0),
    0
  );

  const handleToggleGlobalCircuit = () => {
    setGlobalCircuitTripped(!globalCircuitTripped);
  };

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-amber-400">memory</span>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Platform AI Model Fleet &amp; FinOps Governance
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">AI Platform Operations</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Global LLM routing, eval benchmarks, failover circuit breakers, and centralized provider cost controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleGlobalCircuit}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-colors shadow-xs ${
              globalCircuitTripped
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-slate-800 hover:bg-rose-950 text-rose-300 border border-rose-800/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
            <span>{globalCircuitTripped ? 'Reset Global AI Circuit' : 'Trip Global AI Circuit'}</span>
          </button>
        </div>
      </div>

      {/* FinOps KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-lg">
          <span className="text-xs font-medium text-slate-400">Total AI FinOps Burn (MTD)</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            €{totalMonthlySpend.toLocaleString()}{' '}
            <span className="text-xs text-slate-400 font-normal">/ €{totalMonthlyBudget.toLocaleString()}</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            62.4% consumed · Run-rate within safety ceiling
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-lg">
          <span className="text-xs font-medium text-slate-400">Active Routing Strategy</span>
          <div className="text-lg font-bold text-white mt-1">Primary: Gemini 1.5 Pro (65%)</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            Failover to Claude 3.5 (25%) + GPT-4o (10%)
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-lg">
          <span className="text-xs font-medium text-slate-400">Eval Benchmark Confidence</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">99.6% Agreement</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            Zero hallucinations on deterministic pricing rules
          </div>
        </div>
      </div>

      {/* Provider Fleet Cards */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
          Provider Fleet Endpoints &amp; Model Allocations
        </h2>

        {fleet.map((prov) => (
          <div key={prov.providerId} className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-white">{prov.providerName}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[11px] font-mono font-medium">
                  {prov.activeRouteWeightPercent}% Global Weight
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>Last Known Good (LKG): {prov.lastKnownGoodRelease}</span>
                <span className="text-emerald-400">Eval: {prov.currentEvalScore}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {prov.models.map((model) => (
                <div key={model.id} className="p-3.5 bg-slate-900 rounded border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{model.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {model.tier}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                    <div>
                      <span className="text-slate-500 block">P95 Latency</span>
                      <span>{model.p95LatencyMs}ms</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Availability</span>
                      <span className="text-emerald-400">{model.availabilityPercent}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Error Rate</span>
                      <span className="text-slate-300">{model.errorRatePercent}%</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Cost: €{model.currentMonthlyCostEur.toLocaleString()}</span>
                    <span className="text-slate-500">Cap: €{model.monthlyCostBudgetEur.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
