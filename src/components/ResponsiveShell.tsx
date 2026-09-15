import React, { useState } from 'react';
import { ViewType } from './Sidebar';
import { USER_AVATAR_URL } from '../data/mockData';

interface ResponsiveShellProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  unreadCount: number;
  isKillSwitchArmed: boolean;
  onOpenKillSwitchModal: () => void;
}

export const ResponsiveShell: React.FC<ResponsiveShellProps> = ({
  currentView,
  onSelectView,
  unreadCount,
  isKillSwitchArmed,
  onOpenKillSwitchModal,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // High-frequency destinations for mobile bottom navigation:
  // Overview | Decisions | Risks (Data Health) | Copilot | More
  const mainBottomTabs: { id: ViewType | 'more'; label: string; icon: string; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'product-decisions', label: 'Decisions', icon: 'checklist', badge: '36' },
    { id: 'data-health', label: 'Risks', icon: 'monitoring' },
    { id: 'ai-copilot', label: 'Copilot', icon: 'auto_awesome' },
    { id: 'more', label: 'More', icon: 'menu' },
  ];

  const allNavGroups = [
    {
      group: 'Operate',
      items: [
        { id: 'overview' as ViewType, label: 'Overview', icon: 'dashboard' },
        { id: 'product-decisions' as ViewType, label: 'Product Decisions', icon: 'checklist', badge: '36' },
        { id: 'why' as ViewType, label: 'Product Detail / Why', icon: 'manage_search' },
        { id: 'data-health' as ViewType, label: 'Data Health', icon: 'monitoring', badge: '99.2%' },
        { id: 'policy-studio' as ViewType, label: 'Policy Studio', icon: 'tune' },
      ],
    },
    {
      group: 'Automate',
      items: [
        { id: 'ai-copilot' as ViewType, label: 'AI Copilot', icon: 'auto_awesome' },
        { id: 'automations' as ViewType, label: 'Automations', icon: 'smart_toy', badge: '6 active' },
        { id: 'ai-control-center' as ViewType, label: 'AI Governance', icon: 'admin_panel_settings', badge: 'Gov' },
      ],
    },
    {
      group: 'Data & Wiring',
      items: [
        { id: 'imports-mapping' as ViewType, label: 'Imports & Mapping', icon: 'sync_alt' },
        { id: 'connectors' as ViewType, label: 'Connectors', icon: 'cable', badge: '4 active' },
      ],
    },
    {
      group: 'Platform & Agency',
      items: [
        { id: 'agency-command' as ViewType, label: 'Agency Command', icon: 'domain' },
        { id: 'os-modules' as ViewType, label: 'OS Modules', icon: 'extension', badge: '8/8' },
        { id: 'audit-log' as ViewType, label: 'Audit Log', icon: 'history' },
        { id: 'plans-billing' as ViewType, label: 'Plans & Billing', icon: 'credit_card', badge: 'Active' },
        { id: 'settings' as ViewType, label: 'Settings', icon: 'settings' },
      ],
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TABLET ICON RAIL (Hidden on Mobile & Desktop, visible on md: to xl:) */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex xl:hidden fixed left-0 top-0 h-full w-16 bg-[#0F172A] border-r border-slate-800/80 z-40 flex-col items-center justify-between py-3">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Logo */}
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-700/60 shadow-inner">
            <img src={USER_AVATAR_URL} alt="Plumb Logo" className="w-full h-full object-cover" />
          </div>

          <div className="w-8 h-px bg-slate-800 my-1"></div>

          {/* Quick Icons */}
          <div className="flex flex-col items-center gap-1.5 w-full px-2">
            {[
              { id: 'overview' as ViewType, icon: 'dashboard', title: 'Overview' },
              { id: 'product-decisions' as ViewType, icon: 'checklist', title: 'Decisions' },
              { id: 'why' as ViewType, icon: 'manage_search', title: 'Why' },
              { id: 'data-health' as ViewType, icon: 'monitoring', title: 'Data Health' },
              { id: 'policy-studio' as ViewType, icon: 'tune', title: 'Policies' },
              { id: 'ai-copilot' as ViewType, icon: 'auto_awesome', title: 'Copilot' },
              { id: 'automations' as ViewType, icon: 'smart_toy', title: 'Automations' },
              { id: 'connectors' as ViewType, icon: 'cable', title: 'Connectors' },
              { id: 'agency-command' as ViewType, icon: 'domain', title: 'Agency Command' },
            ].map((nav) => (
              <button
                key={nav.id}
                type="button"
                title={nav.title}
                onClick={() => onSelectView(nav.id)}
                className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                  currentView === nav.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{nav.icon}</span>
              </button>
            ))}

            {/* Expand Drawer button on Tablet */}
            <button
              type="button"
              title="All Navigation"
              onClick={() => setIsMoreMenuOpen(true)}
              className="w-11 h-11 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">menu_open</span>
            </button>
          </div>
        </div>

        {/* Bottom avatar / settings */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            title="Settings"
            onClick={() => onSelectView('settings')}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
              currentView === 'settings' ? 'bg-blue-600 text-white' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">settings</span>
          </button>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Telemetry Live"></div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE BOTTOM NAVIGATION (Visible only on < md: 360px - 767px)         */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F172A] border-t border-slate-800/90 z-40 px-2 flex items-center justify-around">
        {mainBottomTabs.map((tab) => {
          const isActive = tab.id === 'more' ? isMoreMenuOpen : currentView === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (tab.id === 'more') {
                  setIsMoreMenuOpen(!isMoreMenuOpen);
                } else {
                  setIsMoreMenuOpen(false);
                  onSelectView(tab.id as ViewType);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors relative min-w-[60px] ${
                isActive ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-0 right-2 px-1 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-mono leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ========================================================================= */}
      {/* 3. FULL NAVIGATION HIERARCHY SHEET (More menu / Drawer)                   */}
      {/* ========================================================================= */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="bg-[#0F172A] text-white w-full max-w-sm h-full shadow-2xl flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-200">
            {/* Sheet Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-700/60">
                  <img src={USER_AVATAR_URL} alt="Plumb" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Plumb Control OS</div>
                  <div className="text-[11px] text-slate-400">Complete Workspace Hierarchy</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Nav Groups */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
              {allNavGroups.map((grp) => (
                <div key={grp.group}>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                    {grp.group}
                  </div>
                  <div className="space-y-0.5">
                    {grp.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onSelectView(item.id);
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left ${
                          currentView === item.id
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Safety section */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onOpenKillSwitchModal();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-rose-950/40 border border-rose-800/50 text-rose-300 hover:bg-rose-900/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-rose-400">shield</span>
                    <span className="font-semibold">Tenant Safety Circuit</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-900/80 text-rose-200">
                    {isKillSwitchArmed ? 'Armed' : 'Disarmed'}
                  </span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Nordic Tech Retailer AB</span>
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live Telemetry
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
