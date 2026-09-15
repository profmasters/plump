import React from 'react';
import { SuperAdminViewType } from '../../data/superAdminMockData';

interface SuperAdminSidebarProps {
  currentView: SuperAdminViewType;
  onSelectView: (view: SuperAdminViewType) => void;
  openIncidentsCount: number;
}

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  currentView,
  onSelectView,
  openIncidentsCount,
}) => {
  const navSections: {
    title: string;
    items: {
      id: SuperAdminViewType;
      label: string;
      icon: string;
      badge?: string;
      badgeVariant?: 'blue' | 'rose' | 'amber' | 'slate';
    }[];
  }[] = [
    {
      title: 'Platform Infrastructure',
      items: [
        { id: 'platform-overview', label: 'Platform Overview', icon: 'speed' },
        { id: 'tenants', label: 'Tenant Registry', icon: 'domain', badge: '48' },
        { id: 'tenant-operations', label: 'Tenant Operations', icon: 'manage_accounts' },
        { id: 'connector-fleet', label: 'Connector Fleet', icon: 'hub', badge: '58' },
        { id: 'merchant-publication-ops', label: 'Merchant Publication Ops', icon: 'publish', badge: '99.9%' },
      ],
    },
    {
      title: 'AI & FinOps',
      items: [
        { id: 'ai-platform-ops', label: 'AI Platform Operations', icon: 'memory', badge: 'Fleet' },
      ],
    },
    {
      title: 'Commercial & Governance',
      items: [
        { id: 'plan-builder', label: 'Plan Builder & Entitlements', icon: 'receipt_long', badge: 'v7 active' },
        { id: 'billing-ops', label: 'Stripe & Billing Ops', icon: 'account_balance' },
      ],
    },
    {
      title: 'Operations & Reliability',
      items: [
        {
          id: 'incident-center',
          label: 'Incident Center',
          icon: 'emergency',
          badge: openIncidentsCount > 0 ? `${openIncidentsCount} open` : undefined,
          badgeVariant: 'rose',
        },
        { id: 'audit-security', label: 'Audit & Security Ledger', icon: 'security' },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-[#080C14] border-r border-slate-800 flex flex-col justify-between overflow-y-auto z-40 hidden xl:flex">
      <div className="p-3 space-y-5 text-xs font-medium">
        {navSections.map((sec) => (
          <div key={sec.title}>
            <div className="px-2.5 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              {sec.title}
            </div>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md transition-colors text-left ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`material-symbols-outlined text-[17px] ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-mono shrink-0 ${
                          item.badgeVariant === 'rose'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : isActive
                            ? 'bg-amber-400/20 text-amber-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Super Admin Status Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-[11px] font-mono">Control Daemon</span>
          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Synced (9ms)
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
          Hash: e7b2...94a1 · TLS 1.3 Strict
        </div>
      </div>
    </aside>
  );
};
