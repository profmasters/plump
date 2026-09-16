import React, { useState } from 'react';
import { OperatingMode } from '../types';

interface KillSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArmed: boolean;
  operatingMode?: OperatingMode;
  onToggleArm: (arm: boolean) => void;
}

export const KillSwitchModal: React.FC<KillSwitchModalProps> = ({
  isOpen,
  onClose,
  isArmed,
  operatingMode = 'Control (Active)',
  onToggleArm,
}) => {
  const [ackRisk, setAckRisk] = useState(false);
  const [ackAudit, setAckAudit] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDisarm = () => {
    onToggleArm(false);
    onClose();
    setAckRisk(false);
    setAckAudit(false);
  };

  const handleReArm = () => {
    onToggleArm(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex sm:items-center sm:justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg h-full sm:h-auto sm:max-h-[90vh] sm:rounded-xl border-0 sm:border border-slate-200 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-sm">
            <span className={`material-symbols-outlined text-[20px] ${isArmed ? 'text-rose-600' : 'text-emerald-600'}`}>
              {isArmed ? 'shield' : 'lock_open'}
            </span>
            <div>
              <span>Tenant Safety Circuit &amp; Kill Switch</span>
              <span className="block text-[10px] font-mono text-slate-400 font-normal">
                Protected Interlock Policy · Plumb OS
              </span>
            </div>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 rounded-md p-1 transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 flex-1 overflow-y-auto text-xs">
          {/* Structured Operational Impact Box */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Blast Radius &amp; Operational Context
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div className="p-2 bg-white rounded border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Tenant</span>
                <strong className="text-slate-900 font-semibold text-xs truncate block">Nordic Tech Retailer AB</strong>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Markets</span>
                <strong className="text-slate-900 font-mono text-xs block">DE, FR, NL, UK</strong>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Affected Products</span>
                <strong className="text-slate-900 font-mono text-xs block">1,248 catalog (42 guarded)</strong>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Controlled Spend</span>
                <strong className="text-rose-600 font-mono text-xs block">€284,500 / month</strong>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Resulting State</span>
                <strong className="text-slate-800 font-mono text-[11px] block">Supplemental Feed Detached</strong>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block font-medium">Rollback Readiness</span>
                <strong className="text-emerald-700 font-mono text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Snapshot #49102 Ready
                </strong>
              </div>
            </div>
          </div>

          {operatingMode === 'Observe' ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">visibility</span>
                  System in Observe Mode
                </div>
                The tenant is currently running in Observe mode (read-only telemetry). No control mutations or feed overwrites are published to Google Merchant API · Supplemental data source.
              </div>
              <p className="text-slate-600 leading-relaxed">
                The Kill Switch serves as an armed fail-safe interlock. In Observe mode, Plumb only models and proposes interventions without taking automated actions on your ad campaigns.
              </p>
            </div>
          ) : isArmed ? (
            <>
              <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-lg text-rose-900">
                <div className="font-semibold flex items-center gap-1.5 mb-1 text-rose-950">
                  <span className="material-symbols-outlined text-[16px] text-rose-600">report_problem</span>
                  Protected Disarm Action
                </div>
                Disarming the kill switch immediately freezes outgoing updates to Google Merchant API · Supplemental data source and locks Google Merchant Center in its current configuration. Real-time protection across <strong className="text-rose-950 font-bold">€284,500/mo</strong> will be suspended.
              </div>

              <div className="space-y-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="text-[11px] text-slate-500 font-medium">Dual-Gate Safety Verifications:</div>
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
                  <input
                    type="checkbox"
                    id="ackRisk"
                    checked={ackRisk}
                    onChange={(e) => setAckRisk(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <span>I acknowledge budget exposure risk for Nordic Tech Retailer AB across DE, FR, NL, UK</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
                  <input
                    type="checkbox"
                    id="ackAudit"
                    checked={ackAudit}
                    onChange={(e) => setAckAudit(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <span>Record override under Henrik S. [Enterprise Admin] in immutable audit log</span>
                </label>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                <div className="font-semibold text-amber-950 flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">warning</span>
                  Safety Circuit Currently Disarmed
                </div>
                Outgoing updates to Google Merchant API · Supplemental data source are currently paused. Re-arming the circuit will resume real-time bid protection and inventory guard enforcement.
              </div>
              <p className="text-slate-600">
                Would you like to re-arm the Plumb Control OS safety interlock now?
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-medium">
          <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
            Required Role: Enterprise Admin
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              className="px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={onClose}
            >
              {operatingMode === 'Observe' ? 'Close' : isArmed ? 'Keep Armed' : 'Cancel'}
            </button>

            {operatingMode === 'Observe' ? (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors shadow-xs cursor-pointer"
              >
                Acknowledge Interlock
              </button>
            ) : isArmed ? (
              <button
                type="button"
                id="finalKillBtn"
                disabled={!ackRisk || !ackAudit}
                onClick={handleConfirmDisarm}
                className={`px-4 py-2 rounded-md bg-rose-600 text-white transition-colors font-semibold ${
                  ackRisk && ackAudit
                    ? 'hover:bg-rose-700 cursor-pointer shadow-xs'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                Confirm Disarm
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReArm}
                className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Re-Arm Circuit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
