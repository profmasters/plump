import React from 'react';
import { ProductDecisionItem } from '../types';

interface WhyDrawerProps {
  product: ProductDecisionItem | null;
  onClose: () => void;
  onOverrideTier: (sku: string, newTier: string) => void;
}

export const WhyDrawer: React.FC<WhyDrawerProps> = ({ product, onClose, onOverrideTier }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-white shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-slate-900">{product.sku}</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-medium">
                  {product.market}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 truncate">{product.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* Executive Diagnostic Banner */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs mb-1">
              <span className="material-symbols-outlined text-[16px] text-amber-700">warning</span>
              <span>Deterministic Decision Summary</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              {product.reasonDescription}
            </p>
          </div>

          {/* Tier Transition Diff */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
            <div className="text-slate-500 font-medium text-[11px]">Google Merchant API · Supplemental Update</div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">custom_label_0:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-medium border border-slate-200">
                  {product.currentTier}
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">arrow_forward</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-mono font-semibold border ${
                  product.proposedTier === 'HOLD'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-orange-50 text-orange-700 border-orange-200'
                }`}>
                  {product.proposedTier}
                </span>
                <span className="text-emerald-700 text-[11px] font-medium font-mono">
                  +€{product.estimatedMonthlySavingsEur.toLocaleString()}/mo saved
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry Snapshot Matrix */}
          <div>
            <div className="text-slate-900 font-semibold text-xs mb-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">tune</span>
              <span>Live Telemetry &amp; Inventory State</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Days of Cover (DOC)</span>
                <span className={`text-base font-bold font-mono ${product.doc < 2 ? 'text-rose-700' : 'text-slate-900'}`}>
                  {product.doc.toFixed(1)} days
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Threshold minimum: 4.0d</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Available-To-Sell (ATS)</span>
                <span className="text-base font-bold font-mono text-slate-900">{product.atsUnits} units</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{product.inboundNote || '0 inbound in transit'}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Contribution Margin</span>
                <span className={`text-base font-bold font-mono ${product.contributionMarginEur < 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {product.contributionMarginEur < 0 ? `-€${Math.abs(product.contributionMarginEur).toFixed(2)}` : `+€${product.contributionMarginEur.toFixed(2)}`}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{product.marginPercent.toFixed(1)}% gross margin</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Ad Spend &amp; ROAS</span>
                <span className="text-base font-bold font-mono text-slate-900">€{product.adSpendEur.toLocaleString()}/mo</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{product.roas.toFixed(1)}x ROAS</span>
              </div>
            </div>
          </div>

          {/* Applied Rule Details */}
          <div className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-2">
            <div className="text-slate-900 font-semibold text-xs flex items-center justify-between">
              <span>Triggered Policy Rule</span>
              <code className="text-[11px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                {product.ruleCode}
              </code>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1 font-mono bg-slate-50 p-2.5 rounded border border-slate-200/60">
              <div>IF: (ats_cover &lt; 2.0d OR contribution_margin &lt; 0.0)</div>
              <div>AND: (ad_spend_30d &gt; €1,000)</div>
              <div>THEN: emit_tier_transition(tier=&apos;HOLD&apos;, priority=1)</div>
            </div>
          </div>

          {/* Audit Lineage Timeline */}
          <div>
            <div className="text-slate-900 font-semibold text-xs mb-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-700">history</span>
              <span>Reconciliation Lineage Trail</span>
            </div>
            <div className="border-l-2 border-slate-200 ml-2 pl-4 space-y-3 font-mono text-[11px]">
              <div>
                <div className="font-semibold text-slate-800">14:28:12 CET - Telemetry Evaluation</div>
                <div className="text-slate-500">ATS updated via Magento Enterprise ERP webhook (Stock=2)</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">14:28:13 CET - Deterministic Engine</div>
                <div className="text-slate-500">Evaluated against Policy Studio module #INV-04</div>
              </div>
              <div>
                <div className="font-semibold text-slate-800">14:28:14 CET - Staged for Dispatch</div>
                <div className="text-slate-500">Google Merchant API · Supplemental data source scheduled with label HOLD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOverrideTier(product.sku, 'NORMAL')}
              className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Manual Override
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
