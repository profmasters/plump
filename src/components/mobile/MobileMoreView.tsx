import React from 'react';
import { ViewType } from '../Sidebar';
import { AuthorizedAppSwitcher } from '../common/AuthorizedAppSwitcher';

interface MobileMoreViewProps {
  onSelectView: (v: ViewType) => void;
  onOpenSafetyControls: () => void;
  onOpenScopeSheet: () => void;
  onSwitchToPlatformAdmin?: () => void;
  isKillSwitchArmed: boolean;
}

export const MobileMoreView: React.FC<MobileMoreViewProps> = ({
  onSelectView,
  onOpenSafetyControls,
  onOpenScopeSheet,
  onSwitchToPlatformAdmin,
  isKillSwitchArmed,
}) => {
  const secondaryNavGroups = [
    {
      group: 'Governance & Rules',
      items: [
        { id: 'policy-studio' as ViewType, label: 'Policy Studio', desc: 'Active rulesets & blast radius simulation', icon: 'tune' },
        { id: 'automations' as ViewType, label: 'Automations', desc: 'Autonomous pipelines & execution logs', icon: 'smart_toy' },
        { id: 'ai-control-center' as ViewType, label: 'AI Governance', desc: 'ACU limits & hallucination safety', icon: 'admin_panel_settings' },
      ],
    },
    {
      group: 'Data & Integrations',
      items: [
        { id: 'connectors' as ViewType, label: 'Connectors', desc: 'ERP, Google Merchant API, Google Ads', icon: 'cable' },
        { id: 'imports-mapping' as ViewType, label: 'Imports & Mapping', desc: 'Catalog schema & custom_label bindings', icon: 'sync_alt' },
      ],
    },
    {
      group: 'Enterprise Management',
      items: [
        { id: 'agency-command' as ViewType, label: 'Agency Command', desc: 'Cross-tenant oversight & shared clients', icon: 'domain' },
        { id: 'os-modules' as ViewType, label: 'OS Modules', desc: 'Plumb engine capability status', icon: 'extension' },
        { id: 'audit-log' as ViewType, label: 'Audit Log', desc: 'Tamper-evident operational event history', icon: 'history' },
        { id: 'plans-billing' as ViewType, label: 'Plans & Billing', desc: 'Subscription tier & ACU quotas', icon: 'credit_card' },
        { id: 'settings' as ViewType, label: 'Settings', desc: 'Organization profile, users, permissions', icon: 'settings' },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-24 text-slate-800">
      {/* Title */}
      <div className="pt-1">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Workspace Menu</h1>
        <p className="text-xs text-slate-500">Global navigation, safety controls &amp; authorized apps</p>
      </div>

      {/* 1. SAFETY CONTROLS (LOCATED UNDER MORE AS MANDATED) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-rose-600">shield</span>
            <h2 className="text-sm font-bold text-slate-900">Safety Controls</h2>
          </div>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              isKillSwitchArmed ? 'bg-slate-100 text-slate-700' : 'bg-rose-100 text-rose-800'
            }`}
          >
            {isKillSwitchArmed ? 'Armed' : 'Tripped'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The Tenant Safety Circuit provides an instant emergency interlock to freeze all Google Merchant API supplemental feed mutations.
        </p>

        <button
          type="button"
          onClick={onOpenSafetyControls}
          className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">security</span>
          <span>Open Safety Controls Flow</span>
        </button>
      </section>

      {/* 2. AUTHORIZED APP SWITCHER */}
      {onSwitchToPlatformAdmin && (
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <AuthorizedAppSwitcher
            currentApp="customer-dashboard"
            onSwitchApp={(app) => {
              if (app === 'platform-admin') {
                onSwitchToPlatformAdmin();
              }
            }}
            variant="sheet"
          />
        </section>
      )}

      {/* 3. WORKSPACE & TENANT SCOPE CARD */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Current Workspace
          </span>
          <div className="text-sm font-bold text-slate-900 mt-0.5">Nordic Tech Retailer AB</div>
          <div className="text-[11px] text-slate-500">Adobe Commerce / ERP · 4 Storefronts</div>
        </div>

        <button
          type="button"
          onClick={onOpenScopeSheet}
          className="h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
        >
          <span>Switch</span>
          <span className="material-symbols-outlined text-[15px]">expand_more</span>
        </button>
      </section>

      {/* 4. SECONDARY NAV GROUPS */}
      <div className="space-y-4">
        {secondaryNavGroups.map((grp) => (
          <div key={grp.group} className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              {grp.group}
            </span>

            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
              {grp.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  className="w-full p-3.5 text-left flex items-start gap-3 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-[18px] pt-1 shrink-0">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 5. TELEMETRY STATUS FOOTER */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 space-y-1.5 font-mono text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-700">Live Telemetry Loop Active</span>
        </div>
        <div className="text-[11px] text-slate-400">Plumb Control OS · v2.4.0 · TLS 1.3 / E-G4</div>
      </div>
    </div>
  );
};
