import React from 'react';
import { MarketCode, OperatingMode } from '../types';
import { USER_AVATAR_URL } from '../data/mockData';
import { AuthorizedAppSwitcher } from './common/AuthorizedAppSwitcher';

interface HeaderProps {
  currentMarket: MarketCode | 'ALL';
  onChangeMarket: (m: MarketCode | 'ALL') => void;
  operatingMode: OperatingMode;
  isKillSwitchArmed: boolean;
  onOpenKillSwitchModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  onSwitchToSuperAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMarket,
  onChangeMarket,
  operatingMode,
  isKillSwitchArmed,
  onOpenKillSwitchModal,
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  unreadCount,
  onSwitchToSuperAdmin,
}) => {
  return (
    <header className="fixed top-0 xl:left-64 md:left-16 left-0 right-0 h-14 bg-white border-b border-slate-200/80 z-30 px-3 sm:px-6 flex items-center justify-between gap-3">
      {/* Left: Tenant/workspace selector + market switchers */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
            <span className="material-symbols-outlined text-[15px]">corporate_fare</span>
          </div>
          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-xs sm:text-sm font-semibold text-slate-900 tracking-tight truncate">
              Nordic Tech Retailer AB
            </span>
            <span className="text-xs text-slate-400 font-normal hidden xl:inline">(Adobe Commerce / ERP)</span>
          </div>
        </div>

        {/* Market switcher pills */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200/70 text-xs shrink-0">
          {(['DE', 'FR', 'NL', 'UK'] as MarketCode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChangeMarket(m)}
              className={`px-1.5 sm:px-2 py-0.5 rounded font-medium transition-colors text-[11px] sm:text-xs ${
                currentMarket === m
                  ? 'font-semibold bg-white text-slate-900 shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {m}
            </button>
          ))}
          {currentMarket === 'ALL' && (
            <button
              type="button"
              onClick={() => onChangeMarket('ALL')}
              className="px-1.5 sm:px-2 py-0.5 rounded font-semibold bg-white text-slate-900 shadow-xs border border-slate-200/50 text-[11px] sm:text-xs"
            >
              All
            </button>
          )}
        </div>
      </div>

      {/* Middle: Search input with shortcut */}
      <div className="flex-1 max-w-xs lg:max-w-md hidden md:block">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-slate-400">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search SKU, title, connector..."
            className="w-full h-8 pl-8 pr-12 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
          />
          <kbd className="absolute right-2 top-1.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Authorized App Switcher + Operating mode badge, Protected Kill Switch, bell, profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Authorized Application Switcher (Apps menu, role-verified) */}
        {onSwitchToSuperAdmin && (
          <AuthorizedAppSwitcher
            currentApp="customer-dashboard"
            onSwitchApp={(app) => {
              if (app === 'platform-admin') {
                onSwitchToSuperAdmin();
              }
            }}
            variant="header"
          />
        )}

        {/* Operating Mode badge */}
        <div
          className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            operatingMode === 'Control (Active)'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : operatingMode === 'Recommend'
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              operatingMode === 'Control (Active)'
                ? 'bg-emerald-500 animate-pulse'
                : operatingMode === 'Recommend'
                ? 'bg-amber-500'
                : 'bg-slate-400'
            }`}
          />
          <span>
            Mode: {operatingMode === 'Control (Active)' ? 'Control' : operatingMode}
          </span>
        </div>

        {/* Protected Kill Switch Button */}
        <button
          type="button"
          onClick={onOpenKillSwitchModal}
          id="killSwitchBtn"
          title="Click to view circuit status and safety interlock"
          className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer group ${
            isKillSwitchArmed
              ? 'bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border-slate-200 hover:border-rose-200'
              : 'bg-rose-50 text-rose-700 border-rose-300 font-semibold'
          }`}
        >
          <span className={`material-symbols-outlined text-[15px] transition-colors ${
            isKillSwitchArmed ? 'text-slate-500 group-hover:text-rose-600' : 'text-rose-600'
          }`}>
            {isKillSwitchArmed ? 'shield' : 'lock_open'}
          </span>
          <span className="hidden sm:inline">
            {isKillSwitchArmed
              ? operatingMode === 'Observe'
                ? 'Observe (Armed)'
                : 'Kill Switch'
              : 'Disarmed'}
          </span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Notifications & Feed Logs"
        >
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-0.5">
          <img
            src={USER_AVATAR_URL}
            alt="Henrik S."
            className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div className="hidden 2xl:flex flex-col text-left leading-tight">
            <span className="text-xs font-medium text-slate-800">Henrik S.</span>
            <span className="text-[10px] text-slate-400">Enterprise Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
