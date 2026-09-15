import React, { useState } from 'react';
import { PlatformTenantItem } from '../../data/superAdminMockData';

interface SupportSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: PlatformTenantItem | null;
  onConfirmSession: (ticketId: string, reason: string) => void;
}

export const SupportSessionModal: React.FC<SupportSessionModalProps> = ({
  isOpen,
  onClose,
  tenant,
  onConfirmSession,
}) => {
  const [ticketId, setTicketId] = useState('');
  const [reason, setReason] = useState('');
  const [ackLegal, setAckLegal] = useState(false);

  if (!isOpen || !tenant) return null;

  const handleStart = () => {
    if (!ticketId || !reason || !ackLegal) return;
    onConfirmSession(ticketId, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F172A] max-w-lg w-full rounded-xl border border-slate-700 shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150 text-xs">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-amber-400">admin_panel_settings</span>
            <span className="font-semibold text-white text-sm">Privileged Tenant Support Session</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-amber-200 space-y-1">
            <span className="font-semibold text-white block">Tenant Under Inspection:</span>
            <div className="font-mono text-xs text-amber-300">
              {tenant.name} ({tenant.id}) · {tenant.region}
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed pt-1">
              Entering a support session enables elevated, read-only inspection of Google Ads asset groups and supplemental feed queues. All actions are signed with SHA-256 and notified to the tenant administrator.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Customer Support Ticket Reference *</label>
              <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="e.g. TK-88412 or JIRA-COMM-109"
                className="w-full h-8 px-3 rounded bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Operational Justification / Reason *</label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe reason for inspection (e.g. investigate custom_label_2 sync mismatch with Google Ads CID 441-992)"
                className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-2">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={ackLegal}
                  onChange={(e) => setAckLegal(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-[11px] text-slate-300 leading-tight">
                  I certify customer approval has been granted. I understand this session is strictly time-bounded (60m) and audited under <strong className="text-white">platform-eng@plumb.internal</strong>.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!ticketId || !reason || !ackLegal}
            onClick={handleStart}
            className={`px-3.5 py-1.5 rounded font-semibold text-slate-950 transition-colors ${
              ticketId && reason && ackLegal
                ? 'bg-amber-500 hover:bg-amber-400 cursor-pointer shadow-xs'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            Authorize &amp; Launch Session
          </button>
        </div>
      </div>
    </div>
  );
};
