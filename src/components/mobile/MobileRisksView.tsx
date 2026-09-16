import React, { useState } from 'react';

interface IssueItem {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info';
  issue: string;
  affectedSpendEur: number;
  affectedProductsCount: number;
  source: string;
  age: string;
  description: string;
  remediation: string;
}

export const MobileRisksView: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);
  const [isConnectorsDrillDownOpen, setIsConnectorsDrillDownOpen] = useState(false);
  const [isTechnicalMetadataOpen, setIsTechnicalMetadataOpen] = useState(false);

  const financiallyRankedIssues: IssueItem[] = [
    {
      id: 'issue-1',
      severity: 'Critical',
      issue: 'DOC Divergence under Fast Ad Surge',
      affectedSpendEur: 14200,
      affectedProductsCount: 18,
      source: 'Adobe Commerce / Google Merchant API',
      age: '12m ago',
      description: 'Ad click velocity outpaced standard ERP polling interval; 18 SKUs risk stockout without immediate tier downgrades.',
      remediation: 'Plumb supplemental feed rules staged HOLD tags on custom_label_3 to suppress ad spend.',
    },
    {
      id: 'issue-2',
      severity: 'Warning',
      issue: 'Margin Compression below Threshold (DE)',
      affectedSpendEur: 6800,
      affectedProductsCount: 14,
      source: 'ERP Cost Feed · DE Market',
      age: '42m ago',
      description: 'COGS update received with +8% cost increase, reducing gross margin below the 20% floor.',
      remediation: 'Shifted products to GUARD_HIGH tier to bid down unprofitable clicks.',
    },
    {
      id: 'issue-3',
      severity: 'Warning',
      issue: 'Inbound PO Lag on High-Velocity Saw Blades',
      affectedSpendEur: 3800,
      affectedProductsCount: 10,
      source: 'Warehouse WMS',
      age: '2h ago',
      description: 'Supplier EDI transmission flagged a 48-hour delay on container unloading.',
      remediation: 'Extended stockout safety cushion from 48h to 96h.',
    },
  ];

  return (
    <div className="space-y-5 pb-20">
      {/* 1. TITLE & CONTROLLED SPEND BANNER */}
      <div className="pt-1">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Risks &amp; Data Health</h1>
        <p className="text-xs text-slate-500">Financially quantified data integrity</p>
      </div>

      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Financial Exposure
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-rose-600 font-mono tracking-tight">
            €24,800
          </span>
          <span className="text-sm font-semibold text-slate-800">Controlled Spend affected</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Ranked across active store inventory discrepancies and feed label mutations.
        </p>
      </section>

      {/* 2. MOBILE GOOGLE CONTROL (STATUS-FIRST) */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
              Google Control
            </span>
            <h2 className="text-sm font-bold text-slate-900">Control Wiring</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsTechnicalMetadataOpen(true)}
            className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-700"
          >
            <span>Details</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* 3 Status indicators */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80">
            <span className="text-[10px] text-emerald-700 block font-medium">Merchant Signal</span>
            <span className="font-bold text-emerald-900 font-mono text-[11px]">Healthy</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/80">
            <span className="text-[10px] text-blue-700 block font-medium">Ads Topology</span>
            <span className="font-bold text-blue-900 font-mono text-[11px]">Compatible</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 block font-medium">Publication</span>
            <span className="font-bold text-slate-900 font-mono text-[11px]">Verified</span>
          </div>
        </div>

        {/* SIMPLIFIED VERTICAL CONTROL CHAIN */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Verification Pipeline
          </span>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-between">
              <span className="font-semibold">Plumb decision</span>
              <span className="text-[10px] text-emerald-600 font-bold">Generated</span>
            </div>

            <div className="text-center text-slate-400 text-xs leading-none">↓</div>

            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-between">
              <span>custom_label_3</span>
              <span className="text-[10px] text-blue-600 font-bold">Bound</span>
            </div>

            <div className="text-center text-slate-400 text-xs leading-none">↓</div>

            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-between">
              <span className="font-semibold">Google Merchant API</span>
              <span className="text-[10px] text-emerald-600 font-bold">Supplemental</span>
            </div>

            <div className="text-center text-slate-400 text-xs leading-none">↓</div>

            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-between">
              <span className="font-semibold text-emerald-700">Processed value verified</span>
              <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
            </div>

            <div className="text-center text-slate-400 text-xs leading-none">↓</div>

            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-between">
              <span className="font-semibold">Ads topology compatible</span>
              <span className="text-[10px] text-blue-600 font-bold">Smart Bidding OK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FINANCIALLY RANKED ISSUES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">Ranked Issues</h2>
            <p className="text-xs text-slate-500">Ordered by financial blast radius</p>
          </div>
        </div>

        <div className="space-y-3">
          {financiallyRankedIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase border ${
                        issue.severity === 'Critical'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {issue.severity}
                    </span>
                    <span className="text-xs text-slate-400">{issue.age}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{issue.issue}</h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-extrabold font-mono text-rose-600 block">
                    €{issue.affectedSpendEur.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400">spend at risk</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 flex items-center justify-between">
                <span>{issue.affectedProductsCount} products exposed</span>
                <span className="text-slate-400 font-mono text-[11px] truncate max-w-[170px]">
                  {issue.source}
                </span>
              </div>

              <div className="pt-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedIssue(issue)}
                  className="h-9 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs flex items-center gap-1 transition-colors"
                >
                  <span>Inspect</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONNECTOR HEARTBEAT SEPARATE DRILL-DOWN */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[18px]">cable</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Connector Fleet Heartbeat</h3>
              <p className="text-[11px] text-slate-500">4 active connectors · 100% SLA</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsConnectorsDrillDownOpen(true)}
            className="h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Drill-down
          </button>
        </div>
      </section>

      {/* ISSUE INSPECTOR BOTTOM SHEET */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setSelectedIssue(null)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 font-bold">
                  {selectedIssue.severity} Risk
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedIssue.issue}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-xs font-semibold text-slate-700">Analysis</div>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedIssue.description}</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
              <div className="text-xs font-semibold text-emerald-800">Automated Plumb Remediation</div>
              <p className="text-xs text-emerald-700 leading-relaxed">{selectedIssue.remediation}</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs pt-1">
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Financial Exposure</span>
                <span className="font-mono font-bold text-rose-600">
                  €{selectedIssue.affectedSpendEur.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Affected Catalog Items</span>
                <span className="font-mono text-slate-800">{selectedIssue.affectedProductsCount} SKUs</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Origin Data Source</span>
                <span className="font-mono text-slate-800">{selectedIssue.source}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIssue(null)}
              className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold text-xs mt-2"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

      {/* TECHNICAL METADATA SHEET */}
      {isTechnicalMetadataOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setIsTechnicalMetadataOpen(false)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Google Merchant API Topology</h3>
              <button
                type="button"
                onClick={() => setIsTechnicalMetadataOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                <div className="text-slate-400 text-[10px]">Data Source Mode</div>
                <div className="font-bold text-slate-900 mt-0.5">Supplemental Data Source (API Push)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                <div className="text-slate-400 text-[10px]">Target Field Binding</div>
                <div className="font-bold text-slate-900 mt-0.5">custom_label_3: [HOLD | GUARD_HIGH | NORMAL]</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                <div className="text-slate-400 text-[10px]">Merchant Center Account ID</div>
                <div className="font-bold text-slate-900 mt-0.5">MC-7729-NORDIC</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsTechnicalMetadataOpen(false)}
              className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold text-xs mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* CONNECTORS DRILL-DOWN SHEET */}
      {isConnectorsDrillDownOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setIsConnectorsDrillDownOpen(false)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Connectors Fleet</h3>
              <button
                type="button"
                onClick={() => setIsConnectorsDrillDownOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Google Merchant API', type: 'Feed Mutation', status: 'Healthy', latency: '64ms' },
                { name: 'Adobe Commerce (Magento)', type: 'Catalog & Stock', status: 'Healthy', latency: '112ms' },
                { name: 'Enterprise ERP Hub', type: 'COGS & Inbound POs', status: 'Healthy', latency: '88ms' },
                { name: 'Google Ads API', type: 'Campaign Telemetry', status: 'Healthy', latency: '94ms' },
              ].map((c) => (
                <div key={c.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[11px] text-slate-500">{c.type}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      {c.status}
                    </span>
                    <span className="block font-mono text-[10px] text-slate-400 mt-0.5">{c.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsConnectorsDrillDownOpen(false)}
              className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold text-xs mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
