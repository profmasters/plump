import React, { useState } from 'react';
import { ProductDecisionItem } from '../../types';

interface MobileCopilotViewProps {
  onOpenReviewModal: () => void;
  onOpenWhyPage: (p: ProductDecisionItem) => void;
  allProducts: ProductDecisionItem[];
}

export const MobileCopilotView: React.FC<MobileCopilotViewProps> = ({
  onOpenReviewModal,
  onOpenWhyPage,
  allProducts,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isEvidenceSheetOpen, setIsEvidenceSheetOpen] = useState(false);
  const [activeAnalysisIndex, setActiveAnalysisIndex] = useState(0);

  const analyses = [
    {
      id: 'analysis-1',
      prompt: 'Analyze at-risk SKUs in DE facing imminent stockout',
      acuUsed: '0.14 ACU',
      authorityLevel: 'Guarded Execution',
      time: 'Just now',
      analysis: {
        summary: '4 high-velocity SKUs in the German (DE) storefront have run-rates exceeding current Available-To-Sell (ATS) inventory. Projected stockout is within 36 hours.',
        keyPoints: [
          'Festool TS 55: DOC 1.4d with €2,400 monthly ad spend active.',
          'Inbound replenishment of +48 units is currently in transit with 3.5 days ETA.',
          'Continuing Smart Bidding without tier change will waste ~€1,850 on out-of-stock conversions.',
        ],
      },
      recommendation: {
        title: 'Stage HOLD Tier on 4 Stockout SKUs',
        text: 'Mutate custom_label_3 to "HOLD" via Google Merchant API supplemental data source. This automatically instructs Google Ads Smart Bidding to bid down without deleting or breaking campaign lineage.',
      },
      draftAction: {
        actionType: 'Supplemental Feed Mutation',
        targetMarket: 'DE',
        impactedSkus: ['PLB-8834', 'PLB-1092', 'PLB-4412', 'PLB-7721'],
        estimatedSavings: '€1,850 ad spend saved',
        status: 'Staged · Ready for Review',
      },
      evidence: {
        ruleId: 'INV_STOCKOUT_48H',
        dataFreshness: 'ERP Polled 3m ago · Merchant API Read-back verified',
        telemetrySources: ['Adobe Commerce Inventory Hub', 'Google Merchant API Supplemental Stream', 'Google Ads Telemetry'],
      },
    },
    {
      id: 'analysis-2',
      prompt: 'Explain yesterday’s Merchant publication failures',
      acuUsed: '0.08 ACU',
      authorityLevel: 'Read-Only Audit',
      time: '14m ago',
      analysis: {
        summary: 'All 8,420 supplemental feed mutations were dispatched and processed successfully. Zero HTTP 4xx/5xx failures occurred.',
        keyPoints: [
          'Read-back verification confirmed 100% custom_label_3 alignment across all 4 storefronts.',
          'Average publication verification latency was 48ms.',
        ],
      },
      recommendation: {
        title: 'No Remediation Required',
        text: 'Feed topology and supplemental data source binding remain completely healthy.',
      },
      draftAction: {
        actionType: 'Audit Verification',
        targetMarket: 'Global (DE, FR, NL, UK)',
        impactedSkus: ['All active catalog items'],
        estimatedSavings: 'Zero downtime',
        status: 'Verified · System Green',
      },
      evidence: {
        ruleId: 'FEED_VERIFICATION_PASS',
        dataFreshness: 'Live verified 1m ago',
        telemetrySources: ['Google Merchant API v1beta', 'Plumb Supplemental Dispatcher'],
      },
    },
  ];

  const currentAnalysis = analyses[activeAnalysisIndex];

  const handleSendPrompt = (text: string) => {
    if (!text.trim()) return;
    setInputQuery('');
    setActiveAnalysisIndex(0);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Title & Secondary Metadata */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>AI Copilot</span>
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          </h1>
          <p className="text-xs text-slate-500">Autonomous analytical copilot</p>
        </div>

        <div className="flex flex-col items-end text-[11px] font-mono text-slate-500">
          <span className="font-semibold text-slate-700">{currentAnalysis.authorityLevel}</span>
          <span className="text-slate-400">{currentAnalysis.acuUsed}</span>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          'Analyze at-risk SKUs in DE',
          'Explain publication status',
          'Review margin erosion',
        ].map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => handleSendPrompt(prompt)}
            className="h-8 px-3 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold whitespace-nowrap hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* STRUCTURED ANALYSIS WORKSPACE (CLEAN SINGLE-COLUMN, NO CONSUMER BUBBLES) */}
      <div className="space-y-4">
        {/* Plumb Facts Banner */}
        <div className="px-3.5 py-2 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[16px] text-blue-600">fact_check</span>
            <span>Generated from deterministic Plumb facts</span>
          </div>
          <button
            type="button"
            onClick={() => setIsEvidenceSheetOpen(true)}
            className="text-xs font-bold text-blue-700 underline flex items-center gap-0.5"
          >
            <span>View evidence</span>
          </button>
        </div>

        {/* 1. ANALYSIS CARD */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-700">analytics</span>
              <h3 className="text-sm font-bold text-slate-900">Analysis</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{currentAnalysis.time}</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            {currentAnalysis.analysis.summary}
          </p>

          <ul className="space-y-1.5 pt-1">
            {currentAnalysis.analysis.keyPoints.map((pt, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. RECOMMENDATION CARD */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">lightbulb</span>
            <h3 className="text-sm font-bold text-slate-900">{currentAnalysis.recommendation.title}</h3>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            {currentAnalysis.recommendation.text}
          </p>
        </div>

        {/* 3. DRAFT ACTION CARD */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-blue-600">bolt</span>
              <h3 className="text-sm font-bold text-slate-900">Draft Action</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
              {currentAnalysis.draftAction.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-sans">Mutation Type</span>
              <span className="font-bold text-slate-900">{currentAnalysis.draftAction.actionType}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-sans">Projected Value</span>
              <span className="font-bold text-emerald-600">{currentAnalysis.draftAction.estimatedSavings}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onOpenReviewModal}
              className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Review Draft Action</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const target = allProducts.find((p) => p.sku === 'PLB-8834') || allProducts[0];
                if (target) onOpenWhyPage(target);
              }}
              className="h-11 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center"
            >
              Inspect SKU
            </button>
          </div>
        </div>
      </div>

      {/* INPUT BAR (STICKY AT BOTTOM) */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 max-w-lg mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputQuery);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Copilot regarding SKUs, rules, feeds..."
            className="flex-1 h-11 px-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="w-11 h-11 rounded-xl bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center transition-colors shadow-2xs shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>

      {/* FULL-SCREEN EVIDENCE SHEET */}
      {isEvidenceSheetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setIsEvidenceSheetOpen(false)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Deterministic Evidence Trail</h3>
              <button
                type="button"
                onClick={() => setIsEvidenceSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Triggering Rule Code</span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block">{currentAnalysis.evidence.ruleId}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Telemetry Freshness</span>
                <span className="font-mono text-slate-700 mt-0.5 block">{currentAnalysis.evidence.dataFreshness}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Ingested Sources</span>
                <ul className="space-y-1 font-mono text-slate-700">
                  {currentAnalysis.evidence.telemetrySources.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEvidenceSheetOpen(false)}
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
