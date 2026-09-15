import React, { useState, useMemo } from 'react';
import { ProductDecisionItem, MarketCode, TierType, OperatingMode } from '../types';

interface ProductDecisionsViewProps {
  products: ProductDecisionItem[];
  selectedProductIds: Set<string>;
  operatingMode?: OperatingMode;
  onToggleProductSelect: (id: string) => void;
  onToggleAllProducts: () => void;
  onOpenReviewModal: () => void;
  onOpenWhyDrawer: (item: ProductDecisionItem) => void;
  onOpenSimulatePolicy: () => void;
  onExportLineage: () => void;
}

export const ProductDecisionsView: React.FC<ProductDecisionsViewProps> = ({
  products,
  selectedProductIds,
  operatingMode = 'Control (Active)',
  onToggleProductSelect,
  onToggleAllProducts,
  onOpenReviewModal,
  onOpenWhyDrawer,
  onOpenSimulatePolicy,
  onExportLineage,
}) => {
  // Filters
  const [filterSearch, setFilterSearch] = useState('');
  const [marketFilter, setMarketFilter] = useState<'ALL' | MarketCode>('ALL');
  const [tierFilter, setTierFilter] = useState<string>('GUARD_HIGH');
  const [confidenceFilter, setConfidenceFilter] = useState<string>('HIGH');
  const [moduleFilter, setModuleFilter] = useState<string>('ALL');
  const [spendOver1000, setSpendOver1000] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Text search
      if (filterSearch.trim()) {
        const query = filterSearch.toLowerCase();
        const matchSku = p.sku.toLowerCase().includes(query);
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchReason = p.reasonCode.toLowerCase().includes(query);
        if (!matchSku && !matchName && !matchBrand && !matchReason) {
          return false;
        }
      }

      // Market
      if (marketFilter !== 'ALL' && p.market !== marketFilter) {
        return false;
      }

      // Tier filter
      if (tierFilter !== 'ALL') {
        if (tierFilter === 'HOLD' && p.proposedTier !== 'HOLD') return false;
        if (tierFilter === 'GUARD_HIGH' && p.proposedTier !== 'GUARD_HIGH' && p.currentTier !== 'GUARD_HIGH') return false;
        if (tierFilter === 'GUARD_LOW' && p.currentTier !== 'GUARD_LOW') return false;
        if (tierFilter === 'NORMAL' && p.proposedTier !== 'NORMAL') return false;
      }

      // Confidence
      if (confidenceFilter === 'HIGH' && p.confidence < 95) {
        return false;
      }
      if (confidenceFilter === 'SUB' && p.confidence >= 80) {
        return false;
      }

      // Module
      if (moduleFilter === 'INV' && !p.reasonCode.includes('STOCKOUT') && !p.reasonCode.includes('DELAY') && !p.reasonCode.includes('DEPLETION')) {
        return false;
      }
      if (moduleFilter === 'MARGIN' && !p.reasonCode.includes('MARGIN')) {
        return false;
      }
      if (moduleFilter === 'PRICE' && !p.reasonCode.includes('PRICE')) {
        return false;
      }

      // Spend
      if (spendOver1000 && p.adSpendEur < 1000) {
        return false;
      }

      return true;
    });
  }, [products, filterSearch, marketFilter, tierFilter, confidenceFilter, moduleFilter, spendOver1000]);

  const allFilteredSelected = filteredProducts.length > 0 && filteredProducts.every((p) => selectedProductIds.has(p.id));

  const resetFilters = () => {
    setFilterSearch('');
    setMarketFilter('ALL');
    setTierFilter('ALL');
    setConfidenceFilter('ALL');
    setModuleFilter('ALL');
    setSpendOver1000(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Operational Stats Banner */}
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2 text-slate-600 flex-wrap">
          <span className="font-semibold text-slate-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">radar</span>
            Decision Feed
          </span>
          <span className="text-slate-300">|</span>
          <span>
            <strong className="font-medium text-slate-800">1,248</strong> catalog products evaluated
          </span>
          <span className="text-slate-300">•</span>
          {operatingMode === 'Control (Active)' ? (
            <>
              <span className="text-rose-700 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                42 active interventions
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">
                <strong className="font-mono font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                  €18,420
                </strong>{' '}
                at-risk spend mitigated (31 of 42 actively guarded)
              </span>
            </>
          ) : operatingMode === 'Observe' ? (
            <>
              <span className="text-blue-700 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                42 proposed interventions
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">
                <strong className="font-mono font-medium text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                  €18,420
                </strong>{' '}
                at-risk spend observed (0 published)
              </span>
            </>
          ) : (
            <>
              <span className="text-amber-700 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                42 proposed interventions
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">
                <strong className="font-mono font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  €18,420
                </strong>{' '}
                at-risk spend staged for approval
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-slate-500 text-[11px] font-mono">
          <span>
            Recon: <span className="font-medium text-slate-700">00:03:12 ago</span>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            Engine: <span className="font-medium text-slate-700">Deterministic v4.2</span>
          </span>
        </div>
      </div>

      {/* Action Bar & Deep Slicers Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3.5 shadow-xs">
        {/* Row 1: Search & Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[280px] max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-2 text-[17px] text-slate-400">filter_list</span>
            <input
              type="text"
              id="product-search-filter"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setFilterSearch('');
              }}
              placeholder="Filter by SKU, title, brand, or reason code..."
              className="w-full h-8 pl-9 pr-8 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-md text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {filterSearch ? (
              <button
                type="button"
                onClick={() => setFilterSearch('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            ) : (
              <span className="absolute right-2.5 top-1.5 text-[10px] text-slate-400 uppercase font-mono">ESC</span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              id="simulate-policy-btn"
              onClick={onOpenSimulatePolicy}
              className="h-8 px-3 rounded-md bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-slate-500">science</span>
              <span>Simulate Policy Change</span>
            </button>

            <button
              type="button"
              id="export-lineage-btn"
              onClick={onExportLineage}
              className="h-8 px-3 rounded-md bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-slate-500">download</span>
              <span>Export Lineage</span>
            </button>

            {/* Primary Review Action */}
            <button
              type="button"
              id="review-proposed-btn"
              onClick={onOpenReviewModal}
              className="h-8 px-3.5 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">checklist_rtl</span>
              <span>Review Proposed Changes ({selectedProductIds.size || 8})</span>
            </button>
          </div>
        </div>

        {/* Row 2: Clean, Spacious Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
          {/* Market Filter */}
          <div className="inline-flex items-center gap-1 px-1 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700">
            <span className="text-[11px] font-medium text-slate-400 pl-1">Market:</span>
            {(['ALL', 'DE', 'FR', 'NL', 'UK'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMarketFilter(m)}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  marketFilter === m
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m === 'ALL' ? 'All' : m}
              </button>
            ))}
          </div>

          {/* Control Tier */}
          <div className="relative inline-flex items-center">
            <span className="text-[11px] font-medium text-slate-400 absolute left-2.5 pointer-events-none">Tier:</span>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="h-7 pl-12 pr-7 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-xs"
            >
              <option value="ALL">All Tiers (6)</option>
              <option value="HOLD">HOLD (18)</option>
              <option value="GUARD_HIGH">GUARD_HIGH (24)</option>
              <option value="GUARD_LOW">GUARD_LOW</option>
              <option value="NORMAL">NORMAL</option>
            </select>
          </div>

          {/* Data Confidence */}
          <div className="relative inline-flex items-center">
            <span className="text-[11px] font-medium text-slate-400 absolute left-2.5 pointer-events-none">Conf:</span>
            <select
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="h-7 pl-12 pr-7 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-xs"
            >
              <option value="ALL">All Levels</option>
              <option value="HIGH">&gt;95% High Confidence</option>
              <option value="SUB">&lt;80% Re-evaluating</option>
            </select>
          </div>

          {/* Module Filter */}
          <div className="relative inline-flex items-center">
            <span className="text-[11px] font-medium text-slate-400 absolute left-2.5 pointer-events-none">Module:</span>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="h-7 pl-14 pr-7 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-xs"
            >
              <option value="ALL">All Modules</option>
              <option value="INV">Inventory (ATS &amp; DOC)</option>
              <option value="MARGIN">Contribution Margin</option>
              <option value="PRICE">Price Discrepancy</option>
            </select>
          </div>

          {/* Spend Exposure Preset */}
          <button
            type="button"
            onClick={() => setSpendOver1000(!spendOver1000)}
            className={`h-7 px-2.5 rounded-md border text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer ${
              spendOver1000
                ? 'bg-rose-50/70 border-rose-200 text-rose-800 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span className="text-slate-400 text-[11px]">Spend:</span>
            <span className={`font-medium ${spendOver1000 ? 'text-rose-700' : 'text-slate-700'}`}>
              &gt; €1,000 / mo
            </span>
          </button>

          {/* Reset Filter */}
          <button
            type="button"
            onClick={resetFilters}
            className="ml-auto text-xs text-slate-400 hover:text-slate-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Reset filters</span>
          </button>
        </div>
      </div>

      {/* Main Product Decisions Table Card */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium text-[11px] tracking-tight select-none">
                <th className="w-10 px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    id="master-checkbox"
                    checked={allFilteredSelected}
                    onChange={onToggleAllProducts}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 min-w-[260px]">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3 text-center">Market</th>
                <th className="px-4 py-3 text-center">DOC</th>
                <th className="px-4 py-3 text-right">ATS Units</th>
                <th className="px-4 py-3 text-right">Contribution Margin</th>
                <th className="px-4 py-3 text-right">Ad Spend</th>
                <th className="px-4 py-3 text-center">Confidence</th>
                <th className="px-4 py-3 text-center">Current Tier</th>
                <th className="px-4 py-3 text-center">Proposed Tier</th>
                <th className="px-4 py-3 text-right sticky right-0 bg-slate-50">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-400">
                    No products matched current filter criteria.{' '}
                    <button onClick={resetFilters} className="text-blue-600 underline font-medium">
                      Reset filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isChecked = selectedProductIds.has(p.id);
                  const isDocCritical = p.doc < 2.0;
                  const isDocWarning = p.doc >= 2.0 && p.doc <= 5.0;
                  const isMarginNegative = p.contributionMarginEur < 0;

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-50/80 transition-colors group ${
                        isChecked ? 'bg-blue-50/20' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleProductSelect(p.id)}
                          className="product-row-select h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Product */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-9 h-9 rounded-md object-cover border border-slate-200 shrink-0 bg-slate-50"
                          />
                          <div className="min-w-0">
                            <div
                              onClick={() => onOpenWhyDrawer(p)}
                              className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate cursor-pointer"
                              title={p.name}
                            >
                              {p.name}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">
                              {p.brand} • {p.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-3">
                        <div className="font-mono text-xs font-medium text-slate-900">{p.sku}</div>
                        <div className="text-[11px] text-slate-400 font-mono">GTIN: {p.gtin}</div>
                      </td>

                      {/* Market */}
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80 font-mono">
                          {p.market}
                        </span>
                      </td>

                      {/* DOC (Days of Cover) */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                          isDocCritical
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : isDocWarning
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            isDocCritical ? 'bg-rose-500' : isDocWarning ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}></span>
                          {p.doc.toFixed(1)}d
                        </span>
                      </td>

                      {/* ATS Units */}
                      <td className="px-4 py-3 text-right">
                        <div className={`font-semibold ${p.atsUnits === 0 ? 'text-rose-700' : 'text-slate-900'}`}>
                          {p.atsUnits} units
                        </div>
                        <div className={`text-[11px] font-mono ${
                          p.inboundNote?.includes('delayed') || p.inboundNote?.includes('Depleted')
                            ? 'text-rose-600'
                            : p.inboundUnits > 0
                            ? 'text-emerald-600'
                            : 'text-slate-400'
                        }`}>
                          {p.inboundNote || `${p.inboundUnits} inbound`}
                        </div>
                      </td>

                      {/* Contribution Margin */}
                      <td className="px-4 py-3 text-right">
                        <div className={`font-medium ${isMarginNegative ? 'text-rose-700' : 'text-emerald-700'}`}>
                          {isMarginNegative ? `-€${Math.abs(p.contributionMarginEur).toFixed(2)}` : `+€${p.contributionMarginEur.toFixed(2)}`}
                        </div>
                        <div className={`text-[11px] font-mono ${isMarginNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {p.marginPercent > 0 ? `+${p.marginPercent.toFixed(1)}%` : `${p.marginPercent.toFixed(1)}%`} margin
                        </div>
                      </td>

                      {/* Ad Spend */}
                      <td className="px-4 py-3 text-right">
                        <div className="font-medium text-slate-900 font-mono">
                          €{p.adSpendEur.toLocaleString()} /mo
                        </div>
                        <div className={`text-[11px] font-mono ${
                          p.roas < 2.0 ? 'text-rose-600' : 'text-emerald-600'
                        }`}>
                          {p.roasNote || `${p.roas.toFixed(1)}x ROAS`}
                        </div>
                      </td>

                      {/* Confidence */}
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          {p.confidence.toFixed(1)}%
                        </span>
                      </td>

                      {/* Current Tier */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${
                          p.currentTier === 'HOLD'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : p.currentTier === 'GUARD_HIGH'
                            ? 'bg-orange-50 text-orange-700 border-orange-200'
                            : p.currentTier === 'GUARD_MEDIUM'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : p.currentTier === 'GUARD_LOW'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {p.currentTier}
                        </span>
                      </td>

                      {/* Proposed Tier */}
                      <td className="px-4 py-3 text-center">
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          p.proposedTier === 'HOLD'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : p.proposedTier === 'GUARD_HIGH'
                            ? 'bg-orange-50 text-orange-700 border-orange-200'
                            : p.proposedTier === 'GUARD_MEDIUM'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {p.proposedTier !== p.currentTier && (
                            <span className="material-symbols-outlined text-[13px]">
                              {p.proposedTier === 'HOLD' ? 'arrow_downward' : 'arrow_upward'}
                            </span>
                          )}
                          {p.proposedTier}
                        </div>
                      </td>

                      {/* Why */}
                      <td className="px-4 py-3 text-right sticky right-0 bg-white group-hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono border hidden xl:inline-block ${
                            p.reasonCode.includes('STOCKOUT') || p.reasonCode.includes('MARGIN')
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : p.reasonCode.includes('DELAY') || p.reasonCode.includes('PRICE')
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {p.reasonCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => onOpenWhyDrawer(p)}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title="Deterministic audit trail"
                          >
                            <span>Why?</span>
                            <span className="material-symbols-outlined text-[13px] text-slate-500">info</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination Bar */}
        <div className="px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs bg-white">
          <div className="flex items-center gap-4 text-slate-500">
            <span>
              Showing <strong className="font-medium text-slate-800 font-mono">1–{filteredProducts.length}</strong> of{' '}
              <strong className="font-medium text-slate-800 font-mono">1,248</strong> catalog products
            </span>
            <div className="inline-flex items-center gap-1 text-[11px]">
              <span>Rows:</span>
              {[50, 100, 250].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setPageSize(size)}
                  className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                    pageSize === size ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
              className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              type="button"
              className="h-7 px-2.5 rounded bg-blue-50 border border-blue-200 text-blue-700 font-medium font-mono text-xs"
            >
              1
            </button>
            <button
              type="button"
              className="h-7 px-2.5 rounded hover:bg-slate-100 text-slate-700 font-mono text-xs cursor-pointer"
            >
              2
            </button>
            <button
              type="button"
              className="h-7 px-2.5 rounded hover:bg-slate-100 text-slate-700 font-mono text-xs cursor-pointer"
            >
              3
            </button>
            <span className="px-1 text-slate-400">…</span>
            <button
              type="button"
              className="h-7 px-2.5 rounded hover:bg-slate-100 text-slate-700 font-mono text-xs cursor-pointer"
            >
              25
            </button>
            <button
              type="button"
              className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. Bottom Review Drawer / Summary Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <span>8 Proposed Tier Changes Awaiting Review</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated policy engine evaluated ATS drops, margin slippage, and incoming container delays.
              </p>
            </div>
          </div>

          {/* Blast Radius & Rollback Metrics */}
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <div className="border-l border-slate-200 pl-4">
              <span className="text-[11px] text-slate-400 block font-medium">Affected Spend</span>
              <span className="font-mono font-semibold text-slate-900">
                €9,400 <span className="text-[11px] font-normal text-slate-500">/mo</span>
              </span>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <span className="text-[11px] text-slate-400 block font-medium">Blast Radius</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                8 campaigns in Google Ads
              </span>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <span className="text-[11px] text-slate-400 block font-medium">Rollback Readiness</span>
              <span className="font-mono text-emerald-700 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">history</span>
                Instant 1-click snapshot
              </span>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenReviewModal}
                className="h-8 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              >
                Open Review Modal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
