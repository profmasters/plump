import React, { useState } from 'react';
import { ProductDecisionItem } from '../../types';

interface MobileProductWhyPageProps {
  product: ProductDecisionItem;
  onBack: () => void;
  onOverrideTier?: (sku: string, newTier: string) => void;
}

export const MobileProductWhyPage: React.FC<MobileProductWhyPageProps> = ({
  product,
  onBack,
  onOverrideTier,
}) => {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState<boolean>(true);
  const [isSourceFactsOpen, setIsSourceFactsOpen] = useState<boolean>(false);
  const [overrideSuccess, setOverrideSuccess] = useState<string | null>(null);

  const isDocCritical = product.doc < 2.0;

  const handleManualOverride = (tier: string) => {
    if (onOverrideTier) {
      onOverrideTier(product.sku, tier);
      setOverrideSuccess(`Tier changed to ${tier}. Published to supplemental data source.`);
      setTimeout(() => setOverrideSuccess(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-800">
      {/* Top Mobile App Bar with Back Navigation */}
      <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between shadow-2xs">
        <button
          type="button"
          onClick={onBack}
          className="h-10 px-2 -ml-2 rounded-xl text-slate-700 hover:text-slate-950 flex items-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="text-xs font-bold">Decisions</span>
        </button>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-slate-100 text-slate-700">
            {product.market}
          </span>
          <span className="text-[11px] font-mono text-slate-400">SKU {product.sku}</span>
        </div>
      </header>

      <main className="p-4 space-y-5 max-w-lg mx-auto">
        {overrideSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
            <span>{overrideSuccess}</span>
          </div>
        )}

        {/* 1. PRODUCT HEADER */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-start gap-3.5">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
              {product.brand} · {product.category}
            </div>
            <h1 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
              {product.name}
            </h1>
            <div className="text-xs font-mono text-slate-500 mt-1">
              GTIN: {product.gtin} · Hub: {product.hubLocation}
            </div>
          </div>
        </section>

        {/* 2. CURRENT → PROPOSED TIER BANNER */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Automated Decision
            </span>
            <span className="text-xs font-mono font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              {product.confidence}% Confidence
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Current Tier</span>
              <span className="text-sm font-mono font-bold text-slate-700">{product.currentTier}</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[20px]">arrow_forward</span>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Proposed Tier</span>
              <span
                className={`text-sm font-mono font-extrabold px-2 py-0.5 rounded border ${
                  product.proposedTier === 'HOLD'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : product.proposedTier === 'GUARD_HIGH'
                    ? 'bg-orange-50 text-orange-700 border-orange-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {product.proposedTier}
              </span>
            </div>
          </div>
        </section>

        {/* 3. WHY THIS DECISION: 3–5 DETERMINISTIC FACTS */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Why this decision</h2>
            <span className="text-[11px] font-mono text-slate-500 font-semibold">Rule: {product.ruleCode}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Fact 1: DOC */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Days of Cover (DOC)</span>
              <span className={`text-lg font-extrabold font-mono mt-0.5 block ${isDocCritical ? 'text-rose-600' : 'text-slate-800'}`}>
                {product.doc.toFixed(1)}d
              </span>
              <span className="text-[10px] text-slate-500">Threshold: &lt;2.0d</span>
            </div>

            {/* Fact 2: ATS Units */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Available to Sell (ATS)</span>
              <span className="text-lg font-extrabold font-mono text-slate-900 mt-0.5 block">
                {product.atsUnits} units
              </span>
              <span className="text-[10px] text-slate-500">Buffer exhausted</span>
            </div>

            {/* Fact 3: Inbound Shipment */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Inbound PO</span>
              <span className="text-lg font-extrabold font-mono text-emerald-600 mt-0.5 block">
                +{product.inboundUnits}
              </span>
              <span className="text-[10px] text-slate-500">{product.inboundNote || 'ETA: 3.5 days'}</span>
            </div>

            {/* Fact 4: Contribution Margin */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Contribution Margin</span>
              <span className="text-lg font-extrabold font-mono text-slate-900 mt-0.5 block">
                €{product.contributionMarginEur.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">{product.marginPercent}% gross margin</span>
            </div>
          </div>

          {/* Fact 5: Rule & Description */}
          <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs text-rose-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-rose-600">gavel</span>
              <span>Triggered: {product.ruleCode}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-800">
              {product.reasonDescription}
            </p>
          </div>
        </section>

        {/* 4. INVENTORY (SIMPLIFIED MOBILE CHART) */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Inventory Status</h2>
            <span className="text-xs text-slate-500 font-mono">ERP Synced 4m ago</span>
          </div>

          {/* Simplified visual inventory bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>On-hand Available (ATS)</span>
              <span className="font-mono text-rose-600">{product.atsUnits} units</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${Math.max(4, Math.min(100, (product.atsUnits / 50) * 100))}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Inbound Purchase Order</span>
              <span className="font-mono text-emerald-600">+{product.inboundUnits} units</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (product.inboundUnits / 50) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span>Daily Velocity:</span>
            <span className="font-mono font-bold text-slate-900">
              {(product.atsUnits / Math.max(0.1, product.doc)).toFixed(1)} units/day
            </span>
          </div>
        </section>

        {/* 5. DECISION TRACE (COLLAPSIBLE TIMELINE) */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <button
            type="button"
            onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Decision Trace</h2>
              <span className="px-2 py-0.2 rounded font-mono text-[10px] bg-slate-100 text-slate-600 font-semibold">
                Audit Chain
              </span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-slate-400">
              {isTimelineExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {isTimelineExpanded && (
            <div className="pt-2 border-t border-slate-100 space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">database</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900">1. Adobe Commerce / ERP Poll</div>
                  <p className="text-[11px] text-slate-500">
                    Stock dropped to {product.atsUnits} units; run-rate confirmed at {product.doc.toFixed(1)} days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">tune</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900">2. Deterministic Rule Evaluated</div>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {product.ruleCode}: Condition ATS &lt; 5 AND DOC &lt; 2.0 matched.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">publish</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900">3. Supplemental Data Source Dispatch</div>
                  <p className="text-[11px] text-slate-500">
                    Staged custom_label_3 mutation to Google Merchant API.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 6. AI EXPLANATION (CLEARLY SECONDARY) */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-blue-600">auto_awesome</span>
              <h2 className="text-sm font-bold text-slate-900">AI Contextual Analysis</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Generated from deterministic Plumb facts
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Plumb detected an immediate stockout risk with €{product.adSpendEur} monthly spend active in {product.market}.
            Applying the <strong className="font-semibold text-slate-800">{product.proposedTier}</strong> tier prevents
            an estimated €{product.estimatedMonthlySavingsEur.toLocaleString()} in wasted advertising spend while replenishment units
            arrive in 3.5 days.
          </p>

          <button
            type="button"
            onClick={() => setIsSourceFactsOpen(true)}
            className="w-full h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-500">fact_check</span>
            <span>View Source Facts &amp; Lineage</span>
          </button>
        </section>

        {/* 7. MANUAL OVERRIDE / TIER SELECTION */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Manual Override Control
          </span>
          <div className="grid grid-cols-4 gap-2">
            {(['HOLD', 'GUARD_HIGH', 'GUARD_MEDIUM', 'NORMAL'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleManualOverride(t)}
                className={`h-10 rounded-xl text-xs font-mono font-bold transition-all border ${
                  product.currentTier === t
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t === 'GUARD_HIGH' ? 'G_HIGH' : t === 'GUARD_MEDIUM' ? 'G_MED' : t}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* SOURCE FACTS BOTTOM SHEET */}
      {isSourceFactsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setIsSourceFactsOpen(false)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Source Facts &amp; Lineage</h3>
              <button
                type="button"
                onClick={() => setIsSourceFactsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-slate-500">GTIN / EAN</span>
                <span className="font-mono font-bold text-slate-900">{product.gtin}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">ERP Item ID</span>
                <span className="font-mono text-slate-700">ERP-ITM-{product.sku}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Google Supplemental ID</span>
                <span className="font-mono text-slate-700">online:de:DE:{product.sku}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Processed Value Verification</span>
                <span className="font-mono text-emerald-600 font-bold">MATCH (custom_label_3)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">ROAS / Campaign Impact</span>
                <span className="font-mono text-slate-700">{product.roas}x ({product.affectedCampaignsCount} campaigns)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSourceFactsOpen(false)}
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
