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
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
            <span className={`material-symbols-outlined text-[20px] ${isArmed ? 'text-rose-600' : 'text-emerald-600'}`}>
              {isArmed ? 'shield' : 'lock_open'}
            </span>
            <span>Tenant Safety Circuit &amp; Kill Switch</span>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 rounded-md p-1 transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {operatingMode === 'Observe' ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">visibility</span>
                  System in Observe Mode
                </div>
                The tenant is currently running in Observe mode (read-only telemetry). No control mutations or feed overwrites are published to Google Merchant API · Supplemental data source.
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Kill Switch serves as an armed fail-safe interlock. In Observe mode, Plumb only models and proposes interventions without taking automated actions on your ad campaigns.
              </p>
            </div>
          ) : isArmed ? (
            <>
              <div className="text-xs text-slate-600 leading-relaxed">
                Disarming the kill switch freezes outgoing updates to Google Merchant API · Supplemental data source and locks Google Merchant Center in its current configuration. Real-time protection across <strong className="text-slate-900">€284,500/mo</strong> will be suspended.
              </div>

              <div className="space-y-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
                  <input
                    type="checkbox"
                    id="ackRisk"
                    checked={ackRisk}
                    onChange={(e) => setAckRisk(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <span>I acknowledge exposure risk for Nordic Tech Retailer AB</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
                  <input
                    type="checkbox"
                    id="ackAudit"
                    checked={ackAudit}
                    onChange={(e) => setAckAudit(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <span>Record override under Henrik S. [Enterprise Admin] in legal audit trail</span>
                </label>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <div className="font-semibold text-amber-950 flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">warning</span>
                  Safety Circuit Currently Disarmed
                </div>
                Outgoing updates to Google Merchant API · Supplemental data source are currently paused. Re-arming the circuit will resume real-time bid protection and inventory guard enforcement.
              </div>
              <p className="text-xs text-slate-600">
                Would you like to re-arm the Plumb Control OS safety interlock now?
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2 text-xs font-medium">
          <button
            type="button"
            className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={onClose}
          >
            {operatingMode === 'Observe' ? 'Close' : isArmed ? 'Keep Armed' : 'Cancel'}
          </button>

          {operatingMode === 'Observe' ? (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors shadow-xs cursor-pointer"
            >
              Acknowledge Interlock
            </button>
          ) : isArmed ? (
            <button
              type="button"
              id="finalKillBtn"
              disabled={!ackRisk || !ackAudit}
              onClick={handleConfirmDisarm}
              className={`px-3 py-1.5 rounded-md bg-rose-600 text-white transition-colors font-medium ${
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
              className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-xs cursor-pointer"
            >
              Re-Arm Circuit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
