import React, { useState } from 'react';

interface GlobalKillSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArmed: boolean;
  onToggleArm: (arm: boolean) => void;
}

export const GlobalKillSwitchModal: React.FC<GlobalKillSwitchModalProps> = ({
  isOpen,
  onClose,
  isArmed,
  onToggleArm,
}) => {
  const [ackFleetRisk, setAckFleetRisk] = useState(false);
  const [ackSecurityLedger, setAckSecurityLedger] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDisarm = () => {
    onToggleArm(false);
    onClose();
    setAckFleetRisk(false);
    setAckSecurityLedger(false);
  };

  const handleReArm = () => {
    onToggleArm(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F172A] max-w-lg w-full rounded-xl border border-rose-900 shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150 text-xs">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <span className={`material-symbols-outlined text-[20px] ${isArmed ? 'text-rose-500' : 'text-emerald-400'}`}>
              shield
            </span>
            <span>Global Fleet Safety Circuit &amp; Kill Switch</span>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-white rounded p-1"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {isArmed ? (
            <>
              <div className="p-3 bg-rose-950/40 border border-rose-800/80 rounded-lg text-rose-200 leading-relaxed space-y-1">
                <span className="font-bold text-white block">WARNING: Platform-Wide Supplemental Freeze</span>
                <p>
                  Tripping the Global Platform Circuit freezes outgoing updates to Google Merchant API · Supplemental data source across <strong className="text-white">ALL 48 provisioned tenants</strong> (€14.8M monthly governed spend).
                </p>
              </div>

              <div className="space-y-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={ackFleetRisk}
                    onChange={(e) => setAckFleetRisk(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                  <span>I acknowledge freezing Merchant API feeds across the entire multi-tenant fleet.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={ackSecurityLedger}
                    onChange={(e) => setAckSecurityLedger(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-rose-600 focus:ring-rose-500"
                  />
                  <span>Record global intervention in immutable SHA-256 ledger with my platform credentials.</span>
                </label>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-amber-950/40 border border-amber-800 rounded-lg text-amber-200">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-amber-400">warning</span>
                  Global Fleet Safety Circuit is Currently Disarmed
                </div>
                Outgoing updates across all 48 tenants are currently frozen. Re-arming the circuit resumes automated supplemental publishing.
              </div>
              <p className="text-slate-300">
                Would you like to restore active supplemental publishing across all tenants now?
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-2 font-medium">
          <button
            type="button"
            className="px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
            onClick={onClose}
          >
            Cancel
          </button>

          {isArmed ? (
            <button
              type="button"
              disabled={!ackFleetRisk || !ackSecurityLedger}
              onClick={handleConfirmDisarm}
              className={`px-3.5 py-1.5 rounded font-semibold text-white transition-colors ${
                ackFleetRisk && ackSecurityLedger
                  ? 'bg-rose-600 hover:bg-rose-500 cursor-pointer shadow-xs'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Trip Global Circuit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReArm}
              className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xs"
            >
              Re-Arm Global Circuit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
