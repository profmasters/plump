import React from 'react';
import { useAuth } from '../../auth/authContext';

interface PlatformAdminAccessDeniedProps {
  onReturnToDashboard: () => void;
}

export const PlatformAdminAccessDenied: React.FC<PlatformAdminAccessDeniedProps> = ({
  onReturnToDashboard,
}) => {
  const { session, switchRole } = useAuth();

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col items-center justify-center p-6 font-sans antialiased">
      <div className="max-w-lg w-full bg-[#0F172A] border border-rose-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Security Shield Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">gpp_bad</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-rose-400 tracking-wider uppercase">
                HTTP 403 · Access Forbidden
              </span>
              <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-rose-950 text-rose-300 border border-rose-800">
                SECURITY GUARD
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-0.5">Platform Admin Unauthorized</h1>
          </div>
        </div>

        {/* Security Description */}
        <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-800 font-mono">
          <div className="flex justify-between border-b border-slate-800 pb-1.5">
            <span className="text-slate-400">Caller Identity:</span>
            <span className="text-white font-semibold">{session.email}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-1.5">
            <span className="text-slate-400">Assigned Role:</span>
            <span className="text-amber-400">{session.role}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-1.5">
            <span className="text-slate-400">Required Claim:</span>
            <span className="text-rose-400 font-semibold">urn:plumb:claim:access:platform-admin</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Security Audit Log:</span>
            <span className="text-emerald-400">LOGGED (REF #SEC-9921)</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Access to the Plumb Platform Super Admin console requires verified claims that are not present in your session token. Both client route guards and server-side API authorization enforce this boundary: direct URL navigation, client code tampering, or direct API requests lacking &apos;access:platform-admin&apos; are rejected with HTTP 403 and logged to the central audit stream.
        </p>

        {/* Action Controls */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
            <span>Return to Authorized Tenant Dashboard</span>
          </button>

          {/* Dev/Inspection Role Switcher for verification */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Security Testing Context:</span>
            <button
              type="button"
              onClick={() => {
                switchRole('super_admin');
              }}
              className="text-amber-400 hover:text-amber-300 underline font-mono text-[11px]"
            >
              Elevate to Super Admin Role →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
