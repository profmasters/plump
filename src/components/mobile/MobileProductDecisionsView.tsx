import React, { useState, useMemo } from 'react';
import { ProductDecisionItem, MarketCode, TierType } from '../../types';

interface MobileProductDecisionsViewProps {
  products: ProductDecisionItem[];
  selectedProductIds: Set<string>;
  onToggleProductSelect: (id: string) => void;
  onOpenWhyPage: (p: ProductDecisionItem) => void;
  onOpenReviewModal: () => void;
}

export const MobileProductDecisionsView: React.FC<MobileProductDecisionsViewProps> = ({
  products,
  selectedProductIds,
  onToggleProductSelect,
  onOpenWhyPage,
  onOpenReviewModal,
}) => {
  // High-value filter states
  const [selectedMarket, setSelectedMarket] = useState<MarketCode | 'ALL'>('ALL');
  const [selectedTier, setSelectedTier] = useState<TierType | 'ALL'>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<'ALL' | 'STOCKOUT' | 'MARGIN' | 'INACTIVE'>('ALL');
  const [minConfidence, setMinConfidence] = useState<number>(0);
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedMarket !== 'ALL' && p.market !== selectedMarket) return false;
      if (selectedTier !== 'ALL' && p.proposedTier !== selectedTier) return false;
      if (minConfidence > 0 && p.confidence < minConfidence) return false;
      if (selectedRisk === 'STOCKOUT' && !p.reasonCode.includes('STOCKOUT')) return false;
      if (selectedRisk === 'MARGIN' && !p.reasonCode.includes('MARGIN')) return false;
      if (selectedRisk === 'INACTIVE' && !p.reasonCode.includes('INACTIVE')) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        if (!matchName && !matchSku) return false;
      }
      return true;
    });
  }, [products, selectedMarket, selectedTier, selectedRisk, minConfidence, searchQuery]);

  return (
    <div className="space-y-4 pb-20">
      {/* Title and Top Action Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Decisions</h1>
          <p className="text-xs text-slate-500">{filteredProducts.length} automated decisions evaluated</p>
        </div>

        {selectedProductIds.size > 0 && (
          <button
            type="button"
            onClick={onOpenReviewModal}
            className="h-10 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Review ({selectedProductIds.size})</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-slate-400">search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by SKU or title..."
          className="w-full h-11 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* HIGHEST-VALUE FILTER CHIPS ONLY */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* Market Filter Chip */}
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value as any)}
          className="h-9 px-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none shrink-0 cursor-pointer shadow-2xs"
        >
          <option value="ALL">Market: All</option>
          <option value="DE">DE (Germany)</option>
          <option value="FR">FR (France)</option>
          <option value="NL">NL (Netherlands)</option>
          <option value="UK">UK (United Kingdom)</option>
        </select>

        {/* Tier Filter Chip */}
        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value as any)}
          className="h-9 px-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none shrink-0 cursor-pointer shadow-2xs"
        >
          <option value="ALL">Tier: All</option>
          <option value="HOLD">HOLD</option>
          <option value="GUARD_HIGH">GUARD_HIGH</option>
          <option value="GUARD_MEDIUM">GUARD_MEDIUM</option>
          <option value="NORMAL">NORMAL</option>
        </select>

        {/* Risk Type Filter Chip */}
        <select
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value as any)}
          className="h-9 px-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none shrink-0 cursor-pointer shadow-2xs"
        >
          <option value="ALL">Risk: All</option>
          <option value="STOCKOUT">Stockout Risk</option>
          <option value="MARGIN">Margin Erosion</option>
          <option value="INACTIVE">Catalog Inactive</option>
        </select>

        {/* Confidence Filter Chip */}
        <button
          type="button"
          onClick={() => setMinConfidence((prev) => (prev === 90 ? 0 : 90))}
          className={`h-9 px-3 rounded-lg text-xs font-semibold shrink-0 transition-colors border shadow-2xs ${
            minConfidence === 90
              ? 'bg-blue-50 text-blue-700 border-blue-300'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {minConfidence === 90 ? 'Confidence ≥90%' : 'Confidence'}
        </button>

        {/* More Filters button */}
        <button
          type="button"
          onClick={() => setIsFiltersSheetOpen(true)}
          className="h-9 px-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shrink-0 flex items-center gap-1 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <span className="material-symbols-outlined text-[16px] text-slate-500">tune</span>
          <span>Filters</span>
        </button>
      </div>

      {/* CLEAN VERTICAL DECISION LIST */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <span className="material-symbols-outlined text-[32px] text-slate-400">filter_list_off</span>
            <div className="text-sm font-semibold text-slate-800">No decisions match active filters</div>
            <p className="text-xs text-slate-400">Try clearing market or risk parameters</p>
            <button
              type="button"
              onClick={() => {
                setSelectedMarket('ALL');
                setSelectedTier('ALL');
                setSelectedRisk('ALL');
                setMinConfidence(0);
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-blue-600 font-bold underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredProducts.map((p) => {
            const isSelected = selectedProductIds.has(p.id);
            const spendFormatted = p.adSpendEur >= 1000
              ? `€${(p.adSpendEur / 1000).toFixed(1)}k`
              : `€${p.adSpendEur}`;

            return (
              <div
                key={p.id}
                className={`bg-white border rounded-2xl p-4 shadow-xs transition-all space-y-3 ${
                  isSelected ? 'border-blue-400 ring-1 ring-blue-400/50 bg-blue-50/10' : 'border-slate-200/90'
                }`}
              >
                {/* Top Row: Thumbnail + Product Name + SKU · Market */}
                <div className="flex items-start gap-3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-13 h-13 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3
                      onClick={() => onOpenWhyPage(p)}
                      className="text-sm font-bold text-slate-900 line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <span className="font-mono font-semibold text-slate-700">{p.sku}</span>
                      <span>·</span>
                      <span className="px-1.5 py-0.2 rounded font-mono font-bold bg-slate-100 text-slate-700 text-[11px]">
                        {p.market}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compact Fact Line: DOC · ATS · Spend */}
                <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">DOC:</span>
                    <span className={`font-mono font-bold ${p.doc < 2.0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {p.doc.toFixed(1)}d
                    </span>
                  </div>
                  <div className="text-slate-300">·</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">ATS:</span>
                    <span className={`font-mono font-bold ${p.atsUnits === 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {p.atsUnits}
                    </span>
                  </div>
                  <div className="text-slate-300">·</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Ad Spend:</span>
                    <span className="font-mono font-bold text-slate-800">{spendFormatted}</span>
                  </div>
                </div>

                {/* Semantic Risk Badge & Approval State */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    p.doc < 2.0
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : p.marginPercent < 15
                      ? 'bg-orange-50 text-orange-700 border-orange-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {p.doc < 2.0
                      ? 'Risk: Imminent Stockout'
                      : p.marginPercent < 15
                      ? 'Risk: Margin Erosion'
                      : 'Risk: Catalog Drift'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    State: Staged (Pending)
                  </span>
                </div>

                {/* Tier Transition & Confidence */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-600">
                      {p.currentTier}
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-slate-400">arrow_forward</span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${
                        p.proposedTier === 'HOLD'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : p.proposedTier === 'GUARD_HIGH'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : p.proposedTier === 'GUARD_MEDIUM'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {p.proposedTier}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {p.confidence}% conf.
                  </span>
                </div>

                {/* AI Provenance Badge (Semantic Lineage) */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-blue-600">auto_awesome</span>
                    <span>Rule: {p.ruleCode || p.reasonCode || 'INV_STOCKOUT_48H'}</span>
                  </span>
                  <span className="text-slate-500 font-medium">Deterministic · AI explained</span>
                </div>

                {/* Action Buttons: Primary "Why?" + Secondary "Review" */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenWhyPage(p)}
                    className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Why?</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleProductSelect(p.id)}
                    className={`h-11 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 text-blue-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isSelected ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <span>Review</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* BOTTOM FILTERS SHEET (PROGRESSIVE DISCLOSURE) */}
      {isFiltersSheetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="flex-1" onClick={() => setIsFiltersSheetOpen(false)} />
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Filter Decisions</h3>
              <button
                type="button"
                onClick={() => setIsFiltersSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Confidence Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Minimum Confidence</span>
                <span className="font-mono text-blue-600 font-extrabold">{minConfidence}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={95}
                step={5}
                value={minConfidence}
                onChange={(e) => setMinConfidence(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>All (0%)</span>
                <span>High (80%)</span>
                <span>Max (95%)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedMarket('ALL');
                  setSelectedTier('ALL');
                  setSelectedRisk('ALL');
                  setMinConfidence(0);
                  setIsFiltersSheetOpen(false);
                }}
                className="flex-1 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsFiltersSheetOpen(false)}
                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
