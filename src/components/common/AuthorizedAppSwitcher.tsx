import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';

interface AuthorizedAppSwitcherProps {
  currentApp: 'customer-dashboard' | 'platform-admin';
  onSwitchApp: (app: 'customer-dashboard' | 'platform-admin') => void;
  variant?: 'header' | 'sheet' | 'compact';
}

export const AuthorizedAppSwitcher: React.FC<AuthorizedAppSwitcherProps> = ({
  currentApp,
  onSwitchApp,
  variant = 'header',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { session, canAccessPlatformAdmin, switchRole } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (variant === 'sheet') {
    return (
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
          Authorized Workspaces & Apps
        </div>
        <div className="grid grid-cols-1 gap-2">
          {/* Customer Dashboard - Always rendered for authorized tenant */}
          <button
            type="button"
            onClick={() => onSwitchApp('customer-dashboard')}
            className={`w-full p-3 rounded-lg border text-left flex items-start justify-between transition-all ${
              currentApp === 'customer-dashboard'
                ? 'bg-blue-50/80 border-blue-300 text-blue-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  Plumb Dashboard
                  {currentApp === 'customer-dashboard' && (
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Tenant: {session.tenantName}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Tenant OS
            </span>
          </button>

          {/* Platform Admin - STRICT AUTHORIZATION BOUNDARY: Completely excluded from DOM if claim is missing */}
          {canAccessPlatformAdmin && (
            <button
              type="button"
              onClick={() => onSwitchApp('platform-admin')}
              className={`w-full p-3 rounded-lg border text-left flex items-start justify-between transition-all ${
                currentApp === 'platform-admin'
                  ? 'bg-amber-50/70 border-amber-300 text-amber-950 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-md bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Platform Admin
                    {currentApp === 'platform-admin' && (
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Global Fleet Health, Multi-Tenant Operations & Incidents
                  </div>
                  <div className="text-[10px] font-mono text-amber-700 mt-1">
                    Role: {session.role}
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-900 text-amber-300 border border-slate-700">
                PLATFORM
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 transition-colors"
        title="Switch authorized application workspace"
      >
        <span className="material-symbols-outlined text-[16px] text-slate-600">apps</span>
        <span className="font-semibold">Apps</span>
        <span className="text-[11px] text-slate-500 font-normal">
          {currentApp === 'customer-dashboard' ? '· Dashboard' : '· Platform Admin'}
        </span>
        <span className="material-symbols-outlined text-[14px] text-slate-400">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-76 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Session Identity
              </span>
              <span className="text-xs text-slate-700 font-mono font-medium">{session.email}</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {session.role}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onSwitchApp('customer-dashboard');
              setIsOpen(false);
            }}
            className={`w-full text-left p-2 rounded-md transition-colors flex items-start gap-2.5 ${
              currentApp === 'customer-dashboard'
                ? 'bg-blue-50 text-blue-900 font-semibold'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">space_dashboard</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold flex items-center justify-between">
                <span>Plumb Dashboard</span>
                {currentApp === 'customer-dashboard' && (
                  <span className="text-[10px] text-blue-600 font-mono font-bold">Active</span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 font-normal truncate">
                {session.tenantName}
              </div>
            </div>
          </button>

          {/* CRITICAL SECURITY BOUNDARY: Platform Admin is completely excluded from DOM if claim is missing */}
          {canAccessPlatformAdmin && (
            <button
              type="button"
              onClick={() => {
                onSwitchApp('platform-admin');
                setIsOpen(false);
              }}
              className={`w-full text-left p-2 rounded-md transition-colors flex items-start gap-2.5 mt-1 ${
                currentApp === 'platform-admin'
                  ? 'bg-amber-50 text-amber-950 font-semibold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="w-7 h-7 rounded bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold flex items-center justify-between">
                  <span>Platform Admin</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 bg-slate-900 text-amber-300 rounded font-bold">
                    PLATFORM
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-normal truncate">
                  Global Fleet & Incidents
                </div>
                <div className="text-[10px] font-mono text-amber-700 mt-0.5">
                  Verified Claim: urn:plumb:claim:platform-admin
                </div>
              </div>
            </button>
          )}

          {/* Role test switcher for QA / simulation */}
          <div className="mt-2 pt-2 border-t border-slate-100 px-2 py-1 bg-slate-50 rounded text-[11px] text-slate-600">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[10px] uppercase text-slate-400">QA Role Claim:</span>
              <button
                type="button"
                onClick={() => {
                  switchRole(session.role === 'merchant_admin' ? 'super_admin' : 'merchant_admin');
                }}
                className="text-blue-600 hover:text-blue-800 font-semibold underline"
              >
                {session.role === 'merchant_admin' ? 'Elevate to Super Admin' : 'Switch to Merchant Admin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
