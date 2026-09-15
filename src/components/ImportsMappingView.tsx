import React, { useState } from 'react';
import {
  MOCK_IMPORT_BATCHES,
  MOCK_SCHEMA_MAPPINGS,
  ImportHistoryBatch,
  SchemaFieldMapping
} from '../data/supportingScreensMockData';

export const ImportsMappingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'staging' | 'mapping' | 'history'>('staging');
  const [importBatches, setImportBatches] = useState<ImportHistoryBatch[]>(MOCK_IMPORT_BATCHES);
  const [mappings, setMappings] = useState<SchemaFieldMapping[]>(MOCK_SCHEMA_MAPPINGS);
  const [selectedBatch, setSelectedBatch] = useState<ImportHistoryBatch>(MOCK_IMPORT_BATCHES[0]);

  const handleApproveMapping = (id: string) => {
    setMappings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Approved' } : m))
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Data Ingestion Governance */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">sync_alt</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Imports &amp; Schema Mapping Workspace</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
              Staging &amp; Canonical Interlock
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingest external ERP/WMS data, reconcile product identities across catalogs, and map attributes with AI assist + human approval
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Opening secure staging upload modal (CSV / SFTP batch push). File will be quarantined and schema-validated before promotion.')}
            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">upload_file</span>
            <span>Upload Staging Batch</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('staging')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'staging'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Data Ingestion &amp; Staging
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('mapping')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'mapping'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Schema &amp; Identity Mapping</span>
          <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-purple-100 text-purple-800 font-bold">
            2 AI Suggested
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Ingestion History &amp; Quarantine Log
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: STAGING OVERVIEW */}
      {activeTab === 'staging' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
              <span className="text-[11px] font-medium text-slate-500 block">Staging Queue Health</span>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
                99.8% Clean
              </div>
              <span className="text-[10px] text-slate-500 font-sans block mt-0.5">3 active batches staged without blocking collisions</span>
            </div>

            <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
              <span className="text-[11px] font-medium text-slate-500 block">SKU Identity Coverage</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                99.7% Primary GTIN
              </div>
              <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Resolved across ERP, WMS, and Merchant API feeds</span>
            </div>

            <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs">
              <span className="text-[11px] font-medium text-slate-500 block">Spend Controlled by Staged Feeds</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                €284,500
              </div>
              <span className="text-[10px] text-slate-500 font-sans block mt-0.5">100% addressable via validated wiring</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Staged Batches Awaiting Promotion</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-medium bg-slate-50/70">
                    <th className="py-2.5 px-3 font-medium">Batch / File</th>
                    <th className="py-2.5 px-3 font-medium">Source Type</th>
                    <th className="py-2.5 px-3 font-medium font-mono text-right">Total Rows</th>
                    <th className="py-2.5 px-3 font-medium font-mono text-right">Accepted</th>
                    <th className="py-2.5 px-3 font-medium font-mono text-right">Rejected</th>
                    <th className="py-2.5 px-3 font-medium text-center">SKU Coverage</th>
                    <th className="py-2.5 px-3 font-medium">Status</th>
                    <th className="py-2.5 px-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {importBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{batch.source}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{batch.fileOrBatchName}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                        {batch.sourceType}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-slate-900">
                        {batch.totalRows.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-700 font-medium">
                        {batch.acceptedRows.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-rose-700 font-medium">
                        {batch.rejectedRows}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-800">
                        {batch.mappingCoverageSkuPercent}%
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {batch.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Promoting staged batch ${batch.id} into active Plumb state repository.`)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] transition-colors cursor-pointer"
                        >
                          Promote to Active
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHEMA & IDENTITY MAPPING */}
      {activeTab === 'mapping' && (
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Canonical Model Attribute Mapping</h2>
              <p className="text-xs text-slate-500">
                Maps raw incoming payload keys to Plumb canonical concepts (on_hand, reserved, in_transit, cogs, return_rate). AI suggestions require explicit operator acceptance.
              </p>
            </div>
            <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-medium">
              Human-in-the-loop validation enforced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium bg-slate-50/70">
                  <th className="py-2.5 px-3 font-medium">Raw Source Field</th>
                  <th className="py-2.5 px-3 font-medium">Sample Value</th>
                  <th className="py-2.5 px-3 font-medium">Plumb Canonical Field</th>
                  <th className="py-2.5 px-3 font-medium text-center">Confidence</th>
                  <th className="py-2.5 px-3 font-medium">Status &amp; Evidence</th>
                  <th className="py-2.5 px-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mappings.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {m.externalField}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      {m.sourceSample}
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-blue-700">
                      {m.canonicalModelField}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                      {m.confidencePercent}%
                    </td>
                    <td className="py-3 px-3">
                      {m.status === 'Approved' ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-semibold">
                          Approved
                        </span>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono text-[10px] font-semibold">
                            AI Suggested
                          </span>
                          {m.aiEvidence && (
                            <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                              {m.aiEvidence}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {m.status === 'Approved' ? (
                        <span className="text-[11px] text-slate-400 font-mono">Locked</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveMapping(m.id)}
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium text-[11px] transition-colors cursor-pointer"
                        >
                          Approve Mapping
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INGESTION HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Historical Ingestion &amp; Quarantine Audit Log</h2>
            <span className="font-mono text-[11px] text-slate-400">Retention: 365 days</span>
          </div>

          <div className="space-y-3 text-xs">
            {importBatches.map((b) => (
              <div key={b.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{b.source} · {b.fileOrBatchName}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Imported: {b.importedAt} · {b.totalRows} records evaluated · {b.rejectedRows} quarantined
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700">{b.acceptedRows} verified</span>
                  <div className="text-[10px] text-slate-400 font-mono">Checksum SHA-256 Valid</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
