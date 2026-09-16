import React from 'react';
import { MarketCode, OperatingMode } from '../../types';

interface MobileScopeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentMarket: MarketCode | 'ALL';
  onChangeMarket: (m: MarketCode | 'ALL') => void;
  operatingMode: OperatingMode;
  onChangeOperatingMode: (mode: OperatingMode) => void;
}

export const MobileScopeSheet: React.FC<MobileScopeSheetProps> = ({
  isOpen,
  onClose,
  currentMarket,
  onChangeMarket,
  operatingMode,
  onChangeOperatingMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={onClose} />

      <div className="bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 p-5 space-y-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto -mt-1 mb-2" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Workspace Scope</h3>
            <p className="text-xs text-slate-500 mt-0.5">Switch active market or operating mode</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Current Tenant Info */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Tenant Organization
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold">
              Live Verified
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900">Nordic Tech Retailer AB</div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>Adobe Commerce / ERP</span>
            <span>·</span>
            <span>Merchant API Connected</span>
          </div>
        </div>

        {/* Market Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Target Market</span>
            <span className="text-[11px] font-normal text-slate-500">
              {currentMarket === 'ALL' ? 'Aggregated across 4 countries' : `${currentMarket} localized feed`}
            </span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {(['ALL', 'DE', 'FR', 'NL', 'UK'] as (MarketCode | 'ALL')[]).map((m) => {
              const isSelected = currentMarket === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    onChangeMarket(m);
                  }}
                  className={`h-11 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{m === 'ALL' ? 'All' : m}</span>
                  <span className={`text-[9px] font-normal ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {m === 'ALL' ? 'Global' : m === 'DE' ? 'Germany' : m === 'FR' ? 'France' : m === 'NL' ? 'Neth.' : 'UK'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Operating Mode Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">Operating Mode</label>
          <div className="space-y-2">
            {[
              {
                mode: 'Control (Active)' as OperatingMode,
                title: 'Control (Active)',
                desc: 'Deterministic rules mutate Google Merchant custom labels in real time.',
                badge: 'Recommended',
                badgeColor: 'bg-emerald-100 text-emerald-800',
              },
              {
                mode: 'Recommend' as OperatingMode,
                title: 'Recommend Mode',
                desc: 'Generate staged tier transitions for human approval before publishing.',
                badge: 'Staged',
                badgeColor: 'bg-amber-100 text-amber-800',
              },
              {
                mode: 'Observe' as OperatingMode,
                title: 'Observe Only',
                desc: 'Read-only telemetry without publishing mutations to ad channels.',
                badge: 'Read-Only',
                badgeColor: 'bg-slate-100 text-slate-600',
              },
            ].map((item) => {
              const isSelected = operatingMode === item.mode;
              return (
                <button
                  key={item.mode}
                  type="button"
                  onClick={() => onChangeOperatingMode(item.mode)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 shadow-xs ring-1 ring-blue-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                  <div className="pt-0.5 shrink-0">
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center"
          >
            Apply &amp; Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
