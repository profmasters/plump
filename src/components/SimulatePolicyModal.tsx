import React, { useState } from 'react';

interface SimulatePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPolicy?: () => void;
}

export const SimulatePolicyModal: React.FC<SimulatePolicyModalProps> = ({
  isOpen,
  onClose,
  onApplyPolicy,
}) => {
  const [docThreshold, setDocThreshold] = useState<number>(3.5);
  const [marginCutoff, setMarginCutoff] = useState<number>(8);
  const [minRoas, setMinRoas] = useState<number>(2.2);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  // Real-time calculated simulation metrics
  const additionalSkusGuarded = Math.round(docThreshold * 12 + marginCutoff * 1.5);
  const projectedMonthlySavings = Math.round(additionalSkusGuarded * 380 + (2.5 - minRoas) * 4000);
  const expectedRoasLift = (0.35 + (docThreshold - 2.0) * 0.12).toFixed(2);

  const handleApply = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      if (onApplyPolicy) onApplyPolicy();
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px] text-blue-600">science</span>
            <span>Simulate Catalog Policy Change</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-md p-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 text-xs">
          <p className="text-slate-600">
            Preview the blast radius and projected economic impact of tightening inventory and profit guard rules across all active merchant connectors.
          </p>

          {/* Controls */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            {/* DOC slider */}
            <div>
              <div className="flex justify-between font-medium text-slate-800 mb-1">
                <span>Inventory Cover Minimum (DOC):</span>
                <span className="font-mono text-blue-600">{docThreshold.toFixed(1)} days</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="7.0"
                step="0.5"
                value={docThreshold}
                onChange={(e) => setDocThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">Products with stock under this value switch to GUARD_HIGH or HOLD</span>
            </div>

            {/* Margin Cutoff */}
            <div>
              <div className="flex justify-between font-medium text-slate-800 mb-1">
                <span>Contribution Margin Floor:</span>
                <span className="font-mono text-blue-600">{marginCutoff}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={marginCutoff}
                onChange={(e) => setMarginCutoff(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] text-slate-400">Suppress Google Shopping ads if net CM slips below this target</span>
            </div>

            {/* Min ROAS */}
            <div>
              <div className="flex justify-between font-medium text-slate-800 mb-1">
                <span>Target Efficiency (Min ROAS):</span>
                <span className="font-mono text-blue-600">{minRoas.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.1"
                value={minRoas}
                onChange={(e) => setMinRoas(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3.5 space-y-2.5">
            <div className="font-semibold text-emerald-950 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">insights</span>
              <span>Projected Economic Impact — Simulation</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-white/80 p-2 rounded border border-emerald-200/60">
                <span className="text-[10px] text-slate-500 block">Guarded SKUs</span>
                <span className="font-mono font-bold text-slate-900 text-sm">+{additionalSkusGuarded}</span>
              </div>
              <div className="bg-white/80 p-2 rounded border border-emerald-200/60">
                <span className="text-[10px] text-slate-500 block">Monthly Savings</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">
                  €{projectedMonthlySavings.toLocaleString()}
                </span>
              </div>
              <div className="bg-white/80 p-2 rounded border border-emerald-200/60">
                <span className="text-[10px] text-slate-500 block">Est. ROAS Lift</span>
                <span className="font-mono font-bold text-blue-700 text-sm">+{expectedRoasLift}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
          <span className="text-slate-400 font-mono text-[11px]">Recon v4.2 Monte Carlo</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>{isSaved ? 'Applied!' : 'Stage Policy Update'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
