import React, { useState } from 'react';
import { ProductDecisionItem } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductDecisionItem[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, products }) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  if (!isOpen) return null;

  const csvContent = [
    'SKU,Name,Market,DOC,ATS_Units,Margin_EUR,Margin_Pct,AdSpend_EUR,ROAS,Current_Tier,Proposed_Tier,Reason_Code,Rule_Code',
    ...products.map(
      (p) =>
        `"${p.sku}","${p.name}","${p.market}",${p.doc},${p.atsUnits},${p.contributionMarginEur},${p.marginPercent},${p.adSpendEur},${p.roas},"${p.currentTier}","${p.proposedTier}","${p.reasonCode}","${p.ruleCode}"`
    ),
  ].join('\n');

  const jsonContent = JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      tenant: 'Nordic Tech Retailer AB',
      engine: 'Plumb Control OS v2.4.8',
      productsEvaluated: 1248,
      activeInterventions: products.length,
      lineage: products,
    },
    null,
    2
  );

  const displayData = exportFormat === 'csv' ? csvContent : jsonContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([displayData], {
      type: exportFormat === 'csv' ? 'text/csv' : 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plumb-lineage-export-${Date.now()}.${exportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px] text-blue-600">download</span>
            <span>Export Deterministic Lineage</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-md p-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="inline-flex rounded-md bg-slate-200/80 p-0.5 border border-slate-300/60">
            <button
              type="button"
              onClick={() => setExportFormat('csv')}
              className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                exportFormat === 'csv' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600'
              }`}
            >
              CSV Format (Merchant API Compatible)
            </button>
            <button
              type="button"
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                exportFormat === 'json' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600'
              }`}
            >
              JSON Full Lineage
            </button>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            {products.length} records ready
          </span>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 text-slate-300 font-mono text-xs">
          <pre className="whitespace-pre overflow-x-auto leading-relaxed">{displayData}</pre>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Measurement Status: Causal Eligible · TLS 1.3 audit signed</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">file_download</span>
              <span>Download {exportFormat.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
