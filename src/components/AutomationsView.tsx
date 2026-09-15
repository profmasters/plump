import React, { useState } from 'react';
import { AutomationItem, AutomationRunLog, AIAuthorityLevel } from '../types';
import { MOCK_AUTOMATIONS, MOCK_AUTOMATION_RUNS } from '../data/governanceMockData';

interface AutomationsViewProps {
  onOpenReviewModal: () => void;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({ onOpenReviewModal }) => {
  const [automations, setAutomations] = useState<AutomationItem[]>(MOCK_AUTOMATIONS);
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationItem | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [builderStep, setBuilderStep] = useState<number>(1);
  const [builderPrompt, setBuilderPrompt] = useState<string>(
    'When stock cover drops below 3 days on high spend SKUs in France, stage a review for the commerce team'
  );

  // Toggle automation status
  const handleToggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'Active' ? 'Paused' : 'Active';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const filteredAutomations = automations.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getAuthorityBadge = (level: AIAuthorityLevel) => {
    switch (level) {
      case 'A5 PROTECTED CONTROL':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'A4 BOUNDED AUTO':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'A3 PREPARE':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'A2 RECOMMEND':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'A1 ASSIST':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusBadge = (status: AutomationItem['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Paused':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Awaiting Approval':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Budget Exhausted':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Kill-switched':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Failed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner & Action Bar */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">smart_toy</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Automations Console</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
              Enterprise Governance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Governed AI-assisted operational policy workflows · Deterministic Control pipeline with Protected Control &amp; Four-Eyes governance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsBuilderOpen(true)}
            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            <span>Build Governed Automation</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Registered Workflows</span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            6 <span className="text-xs font-normal text-slate-500 font-sans">Active / 6 Total</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-medium mt-1 block">100% Policy Compliant</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Monthly Runs Executed</span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            84 <span className="text-xs font-normal text-slate-500 font-sans">/ 185 budget</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block font-mono">45.4% capacity utilized</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Automation ACU Usage</span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            2,404 <span className="text-xs font-normal text-slate-500 font-sans">/ 8,000 ACU</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block font-mono">Avg 21.4 ACU / run</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Execution Reliability</span>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">99.8%</div>
          <span className="text-[10px] text-slate-500 mt-1 block font-mono">0 unhandled exceptions</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">Protected Control Safety</span>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">Four-Eyes if Policy Requires</div>
          <span className="text-[10px] text-slate-500 mt-1 block font-mono">1 pending dual approval (High-blast policy)</span>
        </div>
      </div>

      {/* Filter and Status Toolbar */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-3 shadow-xs flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-1">Status:</span>
          {['all', 'active', 'paused', 'awaiting approval'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors capitalize ${
                filterStatus === st
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-slate-500 text-[11px] font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Tool Whitelist Enforced (No Raw SQL / Shell)
          </span>
          <span>•</span>
          <span>Max Concurrency: 10</span>
        </div>
      </div>

      {/* Main Governed Automations Table */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-medium">
                <th className="py-2.5 px-4 font-medium">Automation &amp; Description</th>
                <th className="py-2.5 px-3 font-medium">Status</th>
                <th className="py-2.5 px-3 font-medium">Trigger &amp; Scope</th>
                <th className="py-2.5 px-3 font-medium">Authority</th>
                <th className="py-2.5 px-3 font-medium">Governance</th>
                <th className="py-2.5 px-3 font-medium">Last Run</th>
                <th className="py-2.5 px-3 font-medium">Success</th>
                <th className="py-2.5 px-3 font-medium font-mono text-right">ACU / Month</th>
                <th className="py-2.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAutomations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Name & Description */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                      <span>{item.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                      {item.description}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Owner: {item.owner}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Trigger & Scope */}
                  <td className="py-3 px-3 text-xs">
                    <div className="font-medium text-slate-800">{item.trigger}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.scope}</div>
                  </td>

                  {/* Authority Level */}
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getAuthorityBadge(item.authorityLevel)}`}>
                      {item.authorityLevel}
                    </span>
                  </td>

                  {/* Governance Badges */}
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      {item.isProtectedControl && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Protected Control
                        </span>
                      )}
                      {item.requiresFourEyes ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                          Four-Eyes Required
                        </span>
                      ) : item.isProtectedControl ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                          Protected Control Approval
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">Standard Approval</span>
                      )}
                    </div>
                  </td>

                  {/* Last Run */}
                  <td className="py-3 px-3 text-xs">
                    <div className="text-slate-800 font-medium">{item.lastRunTime}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Next: {item.nextRunTime}
                    </div>
                  </td>

                  {/* Success Rate */}
                  <td className="py-3 px-3">
                    <div className="font-mono font-semibold text-emerald-700 text-xs">
                      {item.successRate}%
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {item.monthlyRunsCount}/{item.monthlyRunsLimit} runs
                    </div>
                  </td>

                  {/* ACU Usage */}
                  <td className="py-3 px-3 text-right">
                    <div className="font-mono font-bold text-slate-900 text-xs">
                      {item.monthlyAcuConsumed} ACU
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      ~{item.acuUsagePerRun} ACU / run
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedAutomation(item)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
                        title="View Execution History & Telemetry"
                      >
                        Logs
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id)}
                        className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors border ${
                          item.status === 'Active'
                            ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        {item.status === 'Active' ? 'Pause' : 'Resume'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 6 enterprise automated policies</span>
          <span className="font-mono text-[11px]">Tenant provider policy · Data residency policy · Zero Mutation Default</span>
        </div>
      </div>

      {/* Execution Run Logs Sub-Section */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-700">history_edu</span>
            <h2 className="text-sm font-semibold text-slate-900">Recent Automation Execution Run History</h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Immutable execution audit stream</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {MOCK_AUTOMATION_RUNS.map((run) => (
            <div key={run.id} className="py-3 flex items-start justify-between gap-4 hover:bg-slate-50/50 p-2 rounded">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      run.outcome === 'SUCCESS'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : run.outcome === 'AWAITING_FOUR_EYES'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {run.outcome}
                  </span>
                  <span className="font-mono font-semibold text-slate-900">{run.timestamp}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono text-slate-600">Duration: {run.durationMs}ms</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono text-slate-600">{run.acuConsumed} ACU</span>
                </div>
                <p className="text-slate-700">{run.summary}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <span>Tools: {run.toolsUsed.join(', ')}</span>
                  <span>•</span>
                  <span>Approver: {run.approver}</span>
                  <span>•</span>
                  <span>Hash: {run.evidenceHash}</span>
                </div>
              </div>

              {run.outcome === 'AWAITING_FOUR_EYES' && (
                <button
                  type="button"
                  onClick={onOpenReviewModal}
                  className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  <span>Inspect Dual Approval</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Governed Automation Builder Modal */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">tune</span>
                <h3 className="text-sm font-semibold text-slate-900">Governed Automation Workflow Builder</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBuilderOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Stepper Header */}
            <div className="px-5 py-3 bg-slate-100/70 border-b border-slate-200 text-xs flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-bold ${builderStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  1. Intent &amp; Draft
                </span>
                <span>→</span>
                <span className={`px-2 py-0.5 rounded font-bold ${builderStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  2. Typed Schema
                </span>
                <span>→</span>
                <span className={`px-2 py-0.5 rounded font-bold ${builderStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  3. Simulation &amp; Four-Eyes
                </span>
              </div>
              <span className="text-slate-500">Step {builderStep} of 3</span>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              {builderStep === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Natural Language Operational Intent</label>
                    <textarea
                      rows={3}
                      value={builderPrompt}
                      onChange={(e) => setBuilderPrompt(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-sans text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Plumb AI synthesizes this intent into a strongly-typed workflow specification with bounded authority.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 space-y-1.5">
                    <span className="font-semibold text-blue-900 block">AI Synthesized Draft Workflow</span>
                    <p className="text-blue-800">
                      <strong>Trigger:</strong> Schedule 07:00 CET daily OR Event DOC &lt; 3.0d on Spend &gt; €500/mo.
                    </p>
                    <p className="text-blue-800">
                      <strong>Scope:</strong> Market FR · Lyon Distribution Center.
                    </p>
                    <p className="text-blue-800">
                      <strong>Proposed Authority:</strong> A3 PREPARE (Stages review items, zero direct mutation).
                    </p>
                  </div>
                </div>
              )}

              {builderStep === 2 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Target Authority Level</label>
                      <select className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono">
                        <option>A3 PREPARE (Recommended)</option>
                        <option>A2 RECOMMEND</option>
                        <option>A4 BOUNDED AUTO</option>
                        <option>A5 PROTECTED CONTROL (Protected Control Approval · Four-Eyes if policy requires)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Monthly ACU Budget Cap</label>
                      <input
                        type="number"
                        defaultValue={500}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Permitted Tools Whitelist</label>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1 font-mono text-[11px]">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-blue-600" />
                        <span>catalog.query (Read-only SKU &amp; inventory query)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-blue-600" />
                        <span>erp.inbound_lookup (Read-only purchase order ETA)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-blue-600" />
                        <span>review.stage_changes (Stages change in Review Modal)</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-400">
                        <input type="checkbox" disabled className="accent-slate-400" />
                        <span className="line-through">shell.exec / sql.raw (Blocked by Security Policy)</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded">
                    <input type="checkbox" id="feCheck" defaultChecked className="accent-amber-600" />
                    <label htmlFor="feCheck" className="text-amber-900 font-medium">
                      Require Four-Eyes Approval when high-blast-radius policy or tenant governance requires it (&gt;€1,000 spend)
                    </label>
                  </div>
                </div>
              )}

              {builderStep === 3 && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-1">
                    <span className="font-semibold block flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-emerald-700">check_circle</span>
                      Deterministic Validation Passed (0 Policy Violations)
                    </span>
                    <p className="text-xs">
                      Simulation executed across historical 14-day telemetry: 4 SKUs would have triggered review, protecting approximately €3,120 in at-risk spend.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] space-y-1 text-slate-700">
                    <div>Workflow ID: <strong>wf-fr-cover-protect-01</strong></div>
                    <div>Owner: <strong>Risk Engineering Team</strong></div>
                    <div>Rate Card: <strong>16 ACU per execution</strong></div>
                    <div>Circuit Breaker: <strong>Trips if 3 consecutive failures occur</strong></div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <button
                type="button"
                disabled={builderStep === 1}
                onClick={() => setBuilderStep((prev) => prev - 1)}
                className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                Back
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsBuilderOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                {builderStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setBuilderStep((prev) => prev + 1)}
                    className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                  >
                    Continue to {builderStep === 1 ? 'Typed Schema' : 'Validation'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsBuilderOpen(false);
                      setBuilderStep(1);
                    }}
                    className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">check</span>
                    <span>Activate Governed Automation</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
