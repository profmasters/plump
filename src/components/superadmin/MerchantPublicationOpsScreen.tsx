import React, { useState } from 'react';
import {
  MERCHANT_PUBLICATION_JOBS,
  MerchantPublicationJob,
} from '../../data/superAdminMockData';

export const MerchantPublicationOpsScreen: React.FC = () => {
  const [jobs, setJobs] = useState<MerchantPublicationJob[]>(MERCHANT_PUBLICATION_JOBS);
  const [selectedJob, setSelectedJob] = useState<MerchantPublicationJob | null>(jobs[0]);

  return (
    <div className="space-y-5 text-slate-100">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-blue-400">publish</span>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
              Google Merchant API · Supplemental Data Source Pipeline
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Merchant Publication Operations</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time tracking of batched supplemental feed mutations, read-back verification latencies, and rollback readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Pipeline Success:</span>{' '}
            <span className="font-bold text-emerald-400">99.98% Published</span>
          </div>
        </div>
      </div>

      {/* Publication Lifecycle Visualization Info Strip */}
      <div className="bg-blue-950/20 border border-blue-800/40 rounded-lg p-4 text-xs text-blue-200 space-y-2">
        <div className="font-semibold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-blue-400">info</span>
          <span>Verified Merchant Publication Lifecycle</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-[11px] pt-1">
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Step 1</span>
            <span className="font-semibold text-white">Prepared</span>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Step 2</span>
            <span className="font-semibold text-white">Published (HTTP 200)</span>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Step 3</span>
            <span className="font-semibold text-white">Merchant Processing</span>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Step 4</span>
            <span className="font-semibold text-emerald-400">Value Verified</span>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Step 5</span>
            <span className="font-semibold text-emerald-300">Wiring Verified</span>
          </div>
        </div>
      </div>

      {/* Publication Jobs Stream */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent Global Publication Batches</h2>
          <span className="text-xs text-slate-400 font-mono">Auto-refresh active (3s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="px-4 py-3">Batch &amp; Tenant</th>
                <th className="px-3 py-3 text-center">Market</th>
                <th className="px-3 py-3 text-right">SKUs</th>
                <th className="px-3 py-3 text-right">Controlled Spend</th>
                <th className="px-3 py-3 text-center">Lifecycle Stage</th>
                <th className="px-3 py-3 text-center">Verification Latency</th>
                <th className="px-3 py-3 text-center">Wiring Compatibility</th>
                <th className="px-3 py-3 text-center">Rollback Readiness</th>
                <th className="px-4 py-3 text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white text-sm">{job.tenantName}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{job.batchId}</div>
                  </td>
                  <td className="px-3 py-3 text-center font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                      {job.market}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono font-medium text-white">
                    {job.productsAffectedCount}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-white">
                    €{job.controlledSpendEur.toLocaleString()}/mo
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                        job.lifecycleStage === 'Wiring Verified' || job.lifecycleStage === 'Processed Value Verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {job.lifecycleStage}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center font-mono text-slate-300">
                    {job.verificationLatencySec > 0 ? `${job.verificationLatencySec}s` : 'Pending...'}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[11px] ${
                        job.wiringCompatible ? 'text-emerald-400' : 'text-rose-400 font-semibold'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {job.wiringCompatible ? 'Compatible' : 'Wiring Mismatch'}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center font-mono text-[11px] text-slate-300">
                    {job.rollbackReadiness}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-400">
                    {job.timestamp}
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
