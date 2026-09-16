import React, { useState } from 'react';
import { OperatingMode } from '../../types';

interface MobileKillSwitchFlowProps {
  isOpen: boolean;
  onClose: () => void;
  isArmed: boolean;
  operatingMode: OperatingMode;
  onToggleArm: (armed: boolean) => void;
}

export const MobileKillSwitchFlow: React.FC<MobileKillSwitchFlowProps> = ({
  isOpen,
  onClose,
  isArmed,
  operatingMode,
  onToggleArm,
}) => {
  // 3-step safety flow: 1 (Scope & State), 2 (Consequences), 3 (Explicit confirmation)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmScopeChecked, setConfirmScopeChecked] = useState(false);
  const [confirmFallbackChecked, setConfirmFallbackChecked] = useState(false);

  if (!isOpen) return null;

  const handleExecute = () => {
    onToggleArm(!isArmed);
    onClose();
    setStep(1);
    setConfirmScopeChecked(false);
    setConfirmFallbackChecked(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] text-slate-800 flex flex-col animate-in slide-in-from-bottom duration-250">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between shrink-0 shadow-2xs">
        <button
          type="button"
          onClick={() => {
            onClose();
            setStep(1);
          }}
          className="h-10 px-2 -ml-2 rounded-xl text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
          <span className="text-xs font-bold">Cancel</span>
        </button>

        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700">
          <span>Safety Step {step} of 3</span>
        </div>
      </header>

      {/* Main Step Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-28 space-y-4 max-w-lg mx-auto w-full">
        {/* ========================================================================= */}
        {/* SCREEN 1: SCOPE + CURRENT STATE                                           */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Safety Circuit Inspection
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Scope &amp; Operating State
              </h1>
              <p className="text-xs text-slate-500">Inspect the tenant perimeter before triggering interlock</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Tenant Workspace</span>
                <span className="text-xs font-mono font-bold text-slate-900">Nordic Tech Retailer AB</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Operating Mode</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {operatingMode}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Circuit State</span>
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  isArmed ? 'bg-slate-100 text-slate-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {isArmed ? 'Armed (Normal Autonomous Operation)' : 'Tripped (Disarmed / Paused)'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Active Connectors</span>
                <span className="text-xs font-mono text-slate-700">4 healthy (Google Merchant API, ERP, Magento)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-blue-600">info</span>
                <span>Interlock Purpose</span>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-800">
                The Tenant Safety Circuit instantly halts live Google Merchant API supplemental feed mutations across all
                connected storefronts in the event of an upstream catalog or ERP pricing error.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2: CONSEQUENCES                                                    */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="pt-1">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                Operational Blast Radius
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Review Consequences
              </h1>
              <p className="text-xs text-slate-500">Verify downstream effects before executing interlock</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-slate-700 mt-0.5">block</span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Supplemental Feed Freeze</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Halts all pending custom_label_3 mutations to Google Merchant Center across DE, FR, NL, UK.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-slate-700 mt-0.5">history</span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Fallback Feed Active</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Maintains last verified safe state snapshots for all 8,420 catalog items. No campaigns deleted.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-slate-700 mt-0.5">pause_circle</span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Automations Paused</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    All autonomous Copilot and rule execution engines shift to Observe mode immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-600 font-mono">
              Rollback SLA: Reversion takes effect in &lt;60 seconds upon confirmation.
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 3: EXPLICIT CONFIRMATION (GUARDED RED ONLY HERE)                   */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="pt-1">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                Final Safety Gate
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Explicit Confirmation
              </h1>
              <p className="text-xs text-slate-500">Dual-checkbox authorization required to trip the circuit</p>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                <span className="material-symbols-outlined text-[18px] text-rose-600">warning</span>
                <span>You are about to {isArmed ? 'TRIP' : 'RE-ARM'} the safety interlock</span>
              </div>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-200 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmScopeChecked}
                  onChange={(e) => setConfirmScopeChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 mt-0.5 shrink-0"
                />
                <span className="leading-snug">
                  I confirm that I understand this affects all 4 active market storefronts for Nordic Tech Retailer AB.
                </span>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-200 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmFallbackChecked}
                  onChange={(e) => setConfirmFallbackChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 mt-0.5 shrink-0"
                />
                <span className="leading-snug">
                  I acknowledge that Google Merchant API supplemental mutations will be frozen and verified via read-back.
                </span>
              </label>
            </div>
          </div>
        )}
      </main>

      {/* STICKY ACTION FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 max-w-lg mx-auto flex items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((prev) => (prev - 1) as any)}
            className="h-12 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Back
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => (prev + 1) as any)}
            className="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Step {step + 1}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        ) : (
          <button
            type="button"
            disabled={!confirmScopeChecked || !confirmFallbackChecked}
            onClick={handleExecute}
            className={`flex-1 h-12 rounded-xl font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 ${
              confirmScopeChecked && confirmFallbackChecked
                ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">shield</span>
            <span>{isArmed ? 'Trip Interlock Now' : 'Re-Arm Circuit'}</span>
          </button>
        )}
      </footer>
    </div>
  );
};
