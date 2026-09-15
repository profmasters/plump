import React, { useState } from 'react';
import {
  MOCK_AI_PROVIDERS,
  MOCK_ROUTING_POLICIES,
  MOCK_PROMPT_REGISTRY,
  MOCK_RELEASE_MANIFEST,
  MOCK_LAST_KNOWN_GOOD_MANIFEST,
  MOCK_BYOK_CREDENTIALS
} from '../data/governanceMockData';
import { AIProviderStatus } from '../types';

export const AIControlCenterView: React.FC = () => {
  const [providers, setProviders] = useState<AIProviderStatus[]>(MOCK_AI_PROVIDERS);
  const [activeTab, setActiveTab] = useState<'routing' | 'evals' | 'manifest' | 'finops'>('routing');
  const [isGlobalAIKillSwitched, setIsGlobalAIKillSwitched] = useState<boolean>(false);
  const [showRollbackConfirm, setShowRollbackConfirm] = useState<boolean>(false);
  const [rollbackSuccess, setRollbackSuccess] = useState<boolean>(false);

  const toggleProvider = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleExecuteRollback = () => {
    setShowRollbackConfirm(false);
    setRollbackSuccess(true);
    setTimeout(() => setRollbackSuccess(false), 5000);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner & Governance Status */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">admin_panel_settings</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">AI Control Center &amp; Platform Governance</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
              Multi-Provider Architecture
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Technical operations console for model routing, prompt registry, eval benchmarks, and guarded circuit breakers
          </p>
        </div>

        {/* Global AI Emergency Interlock */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsGlobalAIKillSwitched(!isGlobalAIKillSwitched)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border ${
              isGlobalAIKillSwitched
                ? 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {isGlobalAIKillSwitched ? 'lock' : 'emergency'}
            </span>
            <span>{isGlobalAIKillSwitched ? 'Global AI Disabled' : 'Global AI Interlock Armed'}</span>
          </button>
        </div>
      </div>

      {rollbackSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-[16px] text-emerald-700">check_circle</span>
            <span>
              Controlled Rollback Initiated: Target release <strong>{MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseTag}</strong> (Hash: {MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseHash.slice(0, 16)}...) · Resulting active release: <strong>{MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseTag}</strong> (Worker fleet sync in progress)
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700">Audit event #AUD-9102 logged</span>
        </div>
      )}

      {/* Operational Metric Summary (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">AI Platform Health</span>
          <div className="text-lg font-bold font-mono text-emerald-700 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Operational
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">99.98% 30d uptime</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Monthly ACU Used</span>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1">
            18,420 <span className="text-xs font-normal text-slate-500 font-sans">/ 25k</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">73.7% of quota</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Est. Provider Cost</span>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1">$284.15</div>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">Admin COGS view</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Active Automations</span>
          <div className="text-lg font-bold font-mono text-blue-700 mt-1">6 Active</div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">0 quota breaches</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Provider Incidents</span>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1">0 Active</div>
          <span className="text-[10px] text-emerald-700 font-mono mt-1 block">1 resolved last 30d</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Protected Control Bypass</span>
          <div className="text-lg font-bold font-mono text-emerald-700 mt-1">0 Tolerated</div>
          <span className="text-[10px] text-emerald-800 font-semibold font-mono mt-1 block">Safety requirement · 0 recorded</span>
        </div>
      </div>

      {/* Multi-Provider Fleet Section (OpenAI, Anthropic, Google Gemini) */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[19px] text-slate-700">hub</span>
            <h2 className="text-sm font-semibold text-slate-900">Multi-Provider Infrastructure Fleet</h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Zero credentials exposed in client runtime</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {providers.map((prov) => (
            <div
              key={prov.id}
              className={`p-4 rounded-lg border transition-all ${
                prov.enabled
                  ? 'border-slate-200/90 bg-white shadow-2xs'
                  : 'border-slate-200 bg-slate-50/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${prov.enabled ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  <span className="font-semibold text-slate-900 text-xs">{prov.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    Priority {prov.routingPriority}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleProvider(prov.id)}
                    className="text-[10px] font-mono font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {prov.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block">Eligible Models</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {prov.eligibleModels.map((m) => (
                      <span key={m} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Latency p50 / p95</span>
                    <span className="font-semibold text-slate-900">{prov.p50LatencyMs}ms / {prov.p95LatencyMs}ms</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Error Rate</span>
                    <span className="font-semibold text-emerald-700">{prov.errorRatePercent}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Est. MTD Cost: <strong>${prov.estimatedCostMonthUsd}</strong></span>
                  <span className="text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                    {prov.circuitBreakerState}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BYOK Provider Credentials Governance */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-700">key</span>
              <span className="text-xs font-semibold text-slate-800">Bring Your Own Key (BYOK) Credentials Governance</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Zero raw credentials stored or displayed</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {MOCK_BYOK_CREDENTIALS.map((cred) => (
              <div key={cred.provider} className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-sans font-semibold text-slate-900 flex items-center justify-between">
                  <span>{cred.provider}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    cred.status === 'Configured' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {cred.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Validation:</span>
                  <strong className="text-slate-800">{cred.validationStatus}</strong>
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Last verified:</span>
                  <span>{cred.lastVerified}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Secret rotation:</span>
                  <span>{cred.secretRotationDue || 'Not required'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation for Detailed Sections */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-1.5 shadow-xs flex items-center gap-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('routing')}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            activeTab === 'routing'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Routing Policies &amp; Model Capabilities
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('evals')}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            activeTab === 'evals'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Eval Center &amp; Safety Benchmarks
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('manifest')}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            activeTab === 'manifest'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          AI Release Manifest &amp; Rollback
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('finops')}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            activeTab === 'finops'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          AI Usage &amp; FinOps
        </button>
      </div>

      {/* Tab Content 1: Routing Policies */}
      {activeTab === 'routing' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Feature Routing Policies</h3>
                <p className="text-xs text-slate-500">
                  Feature-level routing rules with deterministic fallback, provider eligibility, and data residency policy
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">4 Active Policies</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-medium bg-slate-50/70">
                    <th className="py-2.5 px-3 font-medium">Feature</th>
                    <th className="py-2.5 px-3 font-medium">Primary Route</th>
                    <th className="py-2.5 px-3 font-medium">Fallback Route</th>
                    <th className="py-2.5 px-3 font-medium">Tenant Isolation Policy</th>
                    <th className="py-2.5 px-3 font-medium">Cost / Quality Constraint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_ROUTING_POLICIES.map((rp) => (
                    <tr key={rp.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{rp.featureName}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700 font-medium">{rp.primaryRoute}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{rp.fallbackRoute}</td>
                      <td className="py-2.5 px-3 text-slate-600">{rp.tenantPolicy}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{rp.constraint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prompt Registry Table */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Prompt Registry &amp; Version Governance</h3>
                <p className="text-xs text-slate-500">
                  Strictly versioned operational prompts tested for zero-mutation compliance
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">All Prompts Signed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-medium bg-slate-50/70">
                    <th className="py-2.5 px-3 font-medium">Prompt Handle</th>
                    <th className="py-2.5 px-3 font-medium">Active Version</th>
                    <th className="py-2.5 px-3 font-medium">Eval Benchmark Score</th>
                    <th className="py-2.5 px-3 font-medium">Last Promoted</th>
                    <th className="py-2.5 px-3 font-medium">Governance Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_PROMPT_REGISTRY.map((pr) => (
                    <tr key={pr.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">{pr.name}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{pr.activeVersion}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 rounded font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 text-[11px]">
                          {pr.evalScorePercent}% Pass
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{pr.lastPromoted}</td>
                      <td className="py-2.5 px-3 text-slate-500">{pr.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Eval Center */}
      {activeTab === 'evals' && (
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Enterprise AI Evaluation Center</h3>
              <p className="text-xs text-slate-500">
                Continuous deterministic evaluation benchmarks run on every deployment tick
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 font-mono text-[11px] text-emerald-800 font-bold">
              All 7 Guardrails Green
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Factual Grounding</span>
                <span className="font-mono text-emerald-700 font-bold text-xs">99.8% Pass</span>
              </div>
              <p className="text-[11px] text-slate-500">Latest evaluation result: 99.8% (Eval Suite #EVAL-218) · 0 hallucinations</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Structured Output Reliability</span>
                <span className="font-mono text-emerald-700 font-bold text-xs">100% Pass</span>
              </div>
              <p className="text-[11px] text-slate-500">Latest evaluation result: 100% · Strict JSON-Schema conformance verified</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Tool Safety</span>
                <span className="font-mono text-emerald-700 font-bold text-xs">100% Pass</span>
              </div>
              <p className="text-[11px] text-slate-500">Latest evaluation result: 100% · Zero mutation enforced on all unverified runs</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Prompt-Injection Resistance</span>
                <span className="font-mono text-emerald-700 font-bold text-xs">100% Pass</span>
              </div>
              <p className="text-[11px] text-slate-500">Latest evaluation result: 100% · Adversarial red-teaming verified</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Cross-Tenant Isolation</span>
                <span className="font-mono text-emerald-700 font-bold text-xs">100% Pass</span>
              </div>
              <p className="text-[11px] text-slate-500">Latest evaluation result: 100% · Cryptographic tenant partition verified</p>
            </div>

            <div className="p-3.5 bg-emerald-50/70 rounded-lg border border-emerald-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950">Protected-Control Bypass</span>
                <span className="font-mono text-emerald-800 font-bold text-xs">0 Tolerated</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium">Safety requirement: 0 tolerated · 0 bypasses recorded in system history</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Release Manifest & Controlled Rollback */}
      {activeTab === 'manifest' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">Current Production Release Manifest</h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-bold">
                    Active Production
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Single immutable bundle release deployed on {MOCK_RELEASE_MANIFEST.deployedAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRollbackConfirm(true)}
                  className="px-3 py-1.5 rounded-md border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">history</span>
                  <span>Controlled Rollback to Last Known Good</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
                <div>Release Tag: <strong className="text-slate-900">{MOCK_RELEASE_MANIFEST.releaseTag}</strong></div>
                <div>Release Hash: <strong className="text-slate-700">{MOCK_RELEASE_MANIFEST.releaseHash}</strong></div>
                <div>Model Stack: <strong className="text-slate-700">{MOCK_RELEASE_MANIFEST.modelStack}</strong></div>
                <div>Routing Policy: <strong className="text-slate-700">{MOCK_RELEASE_MANIFEST.routePolicy}</strong></div>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
                <div>Prompt Version: <strong className="text-slate-700">{MOCK_RELEASE_MANIFEST.promptVersion}</strong></div>
                <div>Output Schema: <strong className="text-slate-700">{MOCK_RELEASE_MANIFEST.outputSchema}</strong></div>
                <div>Tool Manifest: <strong className="text-slate-700">{MOCK_RELEASE_MANIFEST.toolManifest}</strong></div>
                <div>Safety Policy: <strong className="text-emerald-700">{MOCK_RELEASE_MANIFEST.safetyPolicy}</strong></div>
              </div>
            </div>

            {/* Last Known Good Manifest */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700 block mb-2">Last Known Good Baseline (Pre-tested Rollback Target)</span>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-slate-900">{MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseTag}</span>
                  <span className="text-slate-500 ml-2">({MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseHash})</span>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">Deployed: {MOCK_LAST_KNOWN_GOOD_MANIFEST.deployedAt} · Latest eval: 100% Benchmark Pass</div>
                </div>
                <span className="text-emerald-700 font-medium">Rollback readiness: Verified · Resulting active: {MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseTag}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: FinOps */}
      {activeTab === 'finops' && (
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">AI Compute Units (ACU) &amp; FinOps Ledger</h3>
              <p className="text-xs text-slate-500">
                Customer-facing ACU metering paired with internal infrastructure COGS visibility
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Billing Provider: Stripe Verified</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-sans text-[11px] block">ACU by Feature (MTD)</span>
              <div className="mt-2 space-y-1 text-slate-800">
                <div className="flex justify-between"><span>Policy Copilot:</span><strong>10,240 ACU (55.6%)</strong></div>
                <div className="flex justify-between"><span>Automations:</span><strong>4,820 ACU (26.2%)</strong></div>
                <div className="flex justify-between">
                  <span>Anomaly Triage Signal:</span>
                  <strong>3,360 ACU (18.2%)</strong>
                </div>
                <div className="text-[10px] text-slate-400 font-sans pt-0.5">AI-assisted signal · Triage score (non-authoritative)</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-sans text-[11px] block">Cost Per Workflow</span>
              <div className="mt-2 space-y-1 text-slate-800">
                <div className="flex justify-between"><span>Copilot Query:</span><strong>$0.014 / call</strong></div>
                <div className="flex justify-between"><span>Automation Run:</span><strong>$0.038 / run</strong></div>
                <div className="flex justify-between"><span>COGS % of Plan:</span><strong>1.2% of SaaS fee</strong></div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-sans text-[11px] block">Rejection &amp; Fallback Rates</span>
              <div className="mt-2 space-y-1 text-slate-800">
                <div className="flex justify-between"><span>Budget Rejections:</span><strong className="text-emerald-700">0 (0.0%)</strong></div>
                <div className="flex justify-between"><span>Provider Fallback:</span><strong>1.2% executions</strong></div>
                <div className="flex justify-between"><span>Mean Token Latency:</span><strong>24ms / token</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controlled Rollback Confirmation Modal */}
      {showRollbackConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <span className="material-symbols-outlined text-[22px]">warning</span>
              <h4 className="text-sm font-bold text-slate-900">Confirm Controlled Rollback to Last Known Good</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This operation initiates a controlled rollback of the active AI release to the verified Last Known Good baseline. Worker fleet sync updates routing pointers across active containers without interrupting tenant traffic.
            </p>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
              <div>Target Release: <strong className="text-slate-900">{MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseTag}</strong></div>
              <div>Target Hash: {MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseHash}</div>
              <div>Rollback Readiness: <strong className="text-emerald-700">Verified (Pre-tested)</strong></div>
              <div>Resulting Active Release: <strong className="text-blue-700">{MOCK_LAST_KNOWN_GOOD_MANIFEST.releaseTag}</strong></div>
              <div className="text-[10px] text-slate-500 font-sans pt-0.5">Propagation in progress across worker fleet (no instantaneous propagation guaranteed)</div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRollbackConfirm(false)}
                className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteRollback}
                className="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer"
              >
                Execute Controlled Rollback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
