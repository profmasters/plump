import React from 'react';
import { SuperAdminViewType } from '../../data/superAdminMockData';

interface SuperAdminResponsiveNavProps {
  currentView: SuperAdminViewType;
  onSelectView: (view: SuperAdminViewType) => void;
  openIncidentsCount: number;
}

export const SuperAdminResponsiveNav: React.FC<SuperAdminResponsiveNavProps> = ({
  currentView,
  onSelectView,
  openIncidentsCount,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isRailExpanded, setIsRailExpanded] = React.useState(false);

  // High frequency destinations for mobile platform operations:
  // Overview | Tenants | Incidents | AI Fleet | Menu
  const mobileTabs: { id: SuperAdminViewType | 'menu'; label: string; icon: string; badge?: string }[] = [
    { id: 'platform-overview', label: 'Overview', icon: 'speed' },
    { id: 'tenants', label: 'Tenants', icon: 'domain', badge: '48' },
    { id: 'incident-center', label: 'Incidents', icon: 'emergency', badge: openIncidentsCount > 0 ? `${openIncidentsCount}` : undefined },
    { id: 'ai-platform-ops', label: 'AI Fleet', icon: 'memory' },
    { id: 'menu', label: 'More', icon: 'grid_view' },
  ];

  const fullAdminSections = [
    {
      group: 'Infrastructure',
      items: [
        { id: 'platform-overview' as SuperAdminViewType, label: 'Platform Overview', icon: 'speed' },
        { id: 'tenants' as SuperAdminViewType, label: 'Tenant Registry', icon: 'domain' },
        { id: 'tenant-operations' as SuperAdminViewType, label: 'Tenant Operations', icon: 'manage_accounts' },
        { id: 'connector-fleet' as SuperAdminViewType, label: 'Connector Fleet', icon: 'hub' },
        { id: 'merchant-publication-ops' as SuperAdminViewType, label: 'Merchant Publication Ops', icon: 'publish' },
      ],
    },
    {
      group: 'AI & Commercial',
      items: [
        { id: 'ai-platform-ops' as SuperAdminViewType, label: 'AI Platform Operations', icon: 'memory' },
        { id: 'plan-builder' as SuperAdminViewType, label: 'Plan Builder & Entitlements', icon: 'receipt_long' },
        { id: 'billing-ops' as SuperAdminViewType, label: 'Stripe & Billing Ops', icon: 'account_balance' },
      ],
    },
    {
      group: 'Operations & Audit',
      items: [
        { id: 'incident-center' as SuperAdminViewType, label: 'Incident Center', icon: 'emergency' },
        { id: 'audit-security' as SuperAdminViewType, label: 'Audit & Security Ledger', icon: 'security' },
      ],
    },
  ];

  return (
    <>
      {/* Tablet Icon Rail (md: to xl:) with Touch Expand Toggle */}
      {isRailExpanded && (
        <div
          className="hidden md:block xl:hidden fixed inset-0 bg-black/40 z-35 backdrop-blur-2xs transition-opacity"
          onClick={() => setIsRailExpanded(false)}
        />
      )}

      <aside
        className={`hidden md:flex xl:hidden fixed left-0 top-14 bottom-0 bg-[#080C14] border-r border-slate-800 z-40 flex-col justify-between py-3 transition-all duration-200 shadow-xl ${
          isRailExpanded ? 'w-60 px-3 items-start' : 'w-16 px-2 items-center'
        }`}
      >
        <div className="flex flex-col gap-2 w-full">
          {/* Header with Touch Expand / Collapse Button */}
          <div className="flex items-center justify-between w-full pb-1 border-b border-slate-800/80">
            {isRailExpanded ? (
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-xs font-bold text-amber-300 truncate">PLATFORM OPS</span>
              </div>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400 mx-auto" />
            )}

            <button
              type="button"
              onClick={() => setIsRailExpanded(!isRailExpanded)}
              className="w-7 h-7 rounded bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
              title={isRailExpanded ? 'Collapse Navigation' : 'Expand Labels (Touch)'}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isRailExpanded ? 'chevron_left' : 'chevron_right'}
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-1 w-full mt-1">
            {[
              { id: 'platform-overview' as SuperAdminViewType, icon: 'speed', label: 'Overview' },
              { id: 'tenants' as SuperAdminViewType, icon: 'domain', label: 'Tenants' },
              { id: 'tenant-operations' as SuperAdminViewType, icon: 'manage_accounts', label: 'Tenant Ops' },
              { id: 'connector-fleet' as SuperAdminViewType, icon: 'hub', label: 'Connectors' },
              { id: 'merchant-publication-ops' as SuperAdminViewType, icon: 'publish', label: 'Merchant API' },
              { id: 'ai-platform-ops' as SuperAdminViewType, icon: 'memory', label: 'AI Platform' },
              { id: 'plan-builder' as SuperAdminViewType, icon: 'receipt_long', label: 'Plan Builder' },
              { id: 'incident-center' as SuperAdminViewType, icon: 'emergency', label: 'Incidents' },
              { id: 'audit-security' as SuperAdminViewType, icon: 'security', label: 'Audit Ledger' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                title={item.label}
                onClick={() => {
                  onSelectView(item.id);
                  if (isRailExpanded) setIsRailExpanded(false);
                }}
                className={`rounded-lg flex items-center transition-colors ${
                  isRailExpanded
                    ? 'w-full px-2.5 py-2 justify-start gap-2.5'
                    : 'w-11 h-11 justify-center'
                } ${
                  currentView === item.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
                {isRailExpanded && (
                  <span className="text-xs truncate">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {isRailExpanded && (
          <div className="text-[10px] font-mono text-slate-500 px-2 py-1">
            Fleet: 48 Tenants Active
          </div>
        )}
      </aside>

      {/* Mobile Bottom Navigation (< md:) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#080C14] border-t border-slate-800 z-40 px-2 flex items-center justify-around text-white">
        {mobileTabs.map((tab) => {
          const isActive = tab.id === 'menu' ? isMenuOpen : currentView === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (tab.id === 'menu') {
                  setIsMenuOpen(!isMenuOpen);
                } else {
                  setIsMenuOpen(false);
                  onSelectView(tab.id as SuperAdminViewType);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors relative min-w-[56px] ${
                isActive ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-0 right-1 px-1 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-mono leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Full Super Admin Navigation Sheet on Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end">
          <div className="bg-[#0B0F19] text-white w-full max-w-sm h-full shadow-2xl flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold">
                  PLATFORM ADMIN
                </span>
                <span className="text-xs text-slate-400">All Operations</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
              {fullAdminSections.map((sec) => (
                <div key={sec.group}>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1.5 px-2">
                    {sec.group}
                  </div>
                  <div className="space-y-0.5">
                    {sec.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onSelectView(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left ${
                          currentView === item.id
                            ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
