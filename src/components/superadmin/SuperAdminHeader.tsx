import React from 'react';
import { SuperAdminViewType } from '../data/superAdminMockData';
import { USER_AVATAR_URL } from '../data/mockData';

interface SuperAdminHeaderProps {
  currentView: SuperAdminViewType;
  onSelectView: (view: SuperAdminViewType) => void;
  onSwitchToCustomerDashboard: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenGlobalKillSwitch: () => void;
  isGlobalKillSwitchArmed: boolean;
}

export const SuperAdminHeader: React.FC<SuperAdminHeaderProps> = ({
  currentView,
  onSelectView,
  onSwitchToCustomerDashboard,
  searchQuery,
  onSearchChange,
  onOpenGlobalKillSwitch,
  isGlobalKillSwitchArmed,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0B0F19] border-b border-slate-800 z-50 px-4 md:px-6 flex items-center justify-between gap-3 text-white">
      {/* Left: Brand + Platform Admin Identifier + Environment badge */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs shrink-0">
            OS
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-white tracking-tight text-sm">PLUMB</span>
            <span className="text-xs text-amber-400 font-mono font-medium hidden sm:inline">Platform Admin</span>
          </div>
        </div>

        {/* Persistent Environment badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>PRODUCTION</span>
        </div>

        {/* Scope indicator */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-[11px] font-mono text-slate-300">
          <span className="material-symbols-outlined text-[14px] text-slate-400">public</span>
          <span>Scope: GLOBAL_FLEET</span>
        </div>
      </div>

      {/* Middle: Platform-wide omni search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-[17px] text-slate-400">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tenants, jobs, releases, providers, incidents..."
            className="w-full h-8 pl-8 pr-12 rounded-md bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder:text-slate-500 focus:bg-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all font-sans"
          />
          <kbd className="absolute right-2 top-1.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            /
          </kbd>
        </div>
      </div>

      {/* Right: Global Circuit Breaker / Kill Switch + Customer App Switcher + Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Global Safety Circuit Button */}
        <button
          type="button"
          onClick={onOpenGlobalKillSwitch}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border transition-colors cursor-pointer ${
            isGlobalKillSwitchArmed
              ? 'bg-slate-900 hover:bg-rose-950/50 text-slate-300 hover:text-rose-300 border-slate-700 hover:border-rose-700'
              : 'bg-rose-950/80 text-rose-200 border-rose-600 font-semibold'
          }`}
          title="Global Platform Circuit Breaker"
        >
          <span className={`material-symbols-outlined text-[15px] ${isGlobalKillSwitchArmed ? 'text-slate-400' : 'text-rose-400'}`}>
            shield
          </span>
          <span className="hidden sm:inline">
            {isGlobalKillSwitchArmed ? 'Global Circuit: Armed' : 'Global Circuit: Tripped'}
          </span>
        </button>

        {/* Switch to Customer Dashboard Button */}
        <button
          type="button"
          onClick={onSwitchToCustomerDashboard}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-xs"
          title="Switch to customer-facing operational Plumb Dashboard"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span className="hidden md:inline">Customer Dashboard</span>
        </button>

        <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

        {/* Super admin user */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs font-mono font-semibold">
            SA
          </div>
          <div className="hidden xl:flex flex-col text-left leading-tight">
            <span className="text-xs font-medium text-slate-200">platform-eng</span>
            <span className="text-[10px] text-amber-400/90 font-mono">PLATFORM_SUPER_ADMIN</span>
          </div>
        </div>
      </div>
    </header>
  );
};
