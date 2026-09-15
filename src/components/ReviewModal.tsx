import React, { useState } from 'react';
import { ProposedChange, TierType } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposedChanges: ProposedChange[];
  onApplyChanges: (approvedIds: string[]) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  proposedChanges,
  onApplyChanges,
}) => {
  const [changesState, setChangesState] = useState<ProposedChange[]>(proposedChanges);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setChangesState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  const handleApproveAll = () => {
    setChangesState((prev) => prev.map((item) => ({ ...item, status: 'approved' })));
    const approvedIds = changesState.map((c) => c.id);
    onApplyChanges(approvedIds);
    setSuccessToast('Successfully published all 8 tier updates to Google Merchant API · Supplemental data source!');
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 1200);
  };

  const handleConfirmSelected = () => {
    const approvedIds = changesState.filter((c) => c.status === 'approved').map((c) => c.id);
    onApplyChanges(approvedIds);
    setSuccessToast(`Applied ${approvedIds.length} approved changes to Google Merchant API · Supplemental data source.`);
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 1000);
  };

  const approvedCount = changesState.filter((c) => c.status === 'approved').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-4xl w-full rounded-xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-[18px]">checklist_rtl</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-900">Review Proposed Tier Changes</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  8 Awaiting Review
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.2">
                Automated policy engine evaluated ATS drops, margin slippage, and incoming container delays.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-md p-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Stats Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400 text-[11px] block">Affected Spend</span>
              <span className="font-mono font-semibold text-slate-900">€9,400 /mo</span>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-slate-400 text-[11px] block">Blast Radius</span>
              <span className="font-medium text-slate-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                8 campaigns in Google Ads
              </span>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-slate-400 text-[11px] block">Rollback Readiness</span>
              <span className="font-mono text-emerald-700 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">history</span>
                Rollback snapshot ready
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleApproveAll}
              className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">done_all</span>
              <span>Approve All (8)</span>
            </button>
          </div>
        </div>

        {/* Toast alert if any */}
        {successToast && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs text-emerald-800 font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
            <span>{successToast}</span>
          </div>
        )}

        {/* Table of Changes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium text-[11px]">
                  <th className="px-4 py-2.5">Product &amp; SKU</th>
                  <th className="px-3 py-2.5 text-center">Market</th>
                  <th className="px-3 py-2.5 text-center">Current Tier</th>
                  <th className="px-3 py-2.5 text-center">Proposed Tier</th>
                  <th className="px-3 py-2.5">Reason Code</th>
                  <th className="px-3 py-2.5 text-right">Ad Spend</th>
                  <th className="px-4 py-2.5 text-right">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {changesState.map((chg) => (
                  <tr key={chg.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={chg.imageUrl}
                          alt={chg.productName}
                          className="w-8 h-8 rounded border border-slate-200 object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 truncate max-w-xs">{chg.productName}</div>
                          <div className="text-[11px] font-mono text-slate-400">{chg.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700 border border-slate-200">
                        {chg.market}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        {chg.currentTier}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${
                        chg.proposedTier === 'HOLD'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        <span className="material-symbols-outlined text-[13px]">
                          {chg.proposedTier === 'HOLD' ? 'arrow_downward' : 'arrow_upward'}
                        </span>
                        {chg.proposedTier}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <code className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600 border border-slate-200">
                        {chg.reasonCode}
                      </code>
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-slate-900 font-medium">
                      €{chg.monthlySpendEur.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAction(chg.id, 'approved')}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                            chg.status === 'approved'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAction(chg.id, 'rejected')}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                            chg.status === 'rejected'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            {approvedCount} of {changesState.length} actions staged for Merchant API · Supplemental source
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmSelected}
              className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Publish Approved Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
