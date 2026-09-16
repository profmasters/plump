import React from 'react';
import { USER_AVATAR_URL } from '../data/mockData';

export type ViewType =
  | 'overview'
  | 'product-decisions'
  | 'why'
  | 'data-health'
  | 'policy-studio'
  | 'connectors'
  | 'ai-copilot'
  | 'automations'
  | 'ai-control-center'
  | 'plans-billing'
  | 'agency-command'
  | 'os-modules'
  | 'audit-log'
  | 'imports-mapping'
  | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  tickNumber: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, tickNumber }) => {
  return (
    <aside className="hidden xl:flex fixed left-0 top-0 h-full w-64 bg-[#0F172A] border-r border-slate-800/80 z-50 flex-col justify-between overflow-y-auto selection:bg-blue-600 selection:text-white">
      <div className="flex flex-col">
        {/* App Header / Logo */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-700/60 shadow-inner shrink-0">
              <img
                src={USER_AVATAR_URL}
                alt="Plumb Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold tracking-tight text-white">Plumb</span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400 font-medium">v2.4.8</span>
              </div>
              <span className="text-xs text-slate-400 block font-normal leading-tight">Control OS</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-mono text-emerald-400 font-medium">Live</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-5 text-xs font-medium">
          {/* Core Controls */}
          <div>
            <div className="px-2.5 pb-1.5 text-[11px] font-medium text-slate-400">Core Controls</div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => onSelectView('overview')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'overview'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[17px]">dashboard</span>
                  <span>Overview</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('product-decisions')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'product-decisions'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'product-decisions' ? 'text-white' : 'text-slate-400'}`}>
                    checklist
                  </span>
                  <span>Product Decisions</span>
                </div>
                <span className={`px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border ${
                  currentView === 'product-decisions'
                    ? 'bg-blue-700/80 text-blue-100 border-blue-500'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  36
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('why')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'why'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'why' ? 'text-white' : 'text-slate-400'}`}>
                    manage_search
                  </span>
                  <span>Product Detail / Why</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('data-health')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'data-health'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'data-health' ? 'text-white' : 'text-slate-400'}`}>
                    monitoring
                  </span>
                  <span>Data Health</span>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-emerald-400 font-medium">99.2%</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('imports-mapping')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'imports-mapping'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'imports-mapping' ? 'text-white' : 'text-slate-400'}`}>
                    sync_alt
                  </span>
                  <span>Imports &amp; Mapping</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('connectors')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'connectors'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'connectors' ? 'text-white' : 'text-slate-400'}`}>
                    cable
                  </span>
                  <span>Connectors</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">4 active</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('overview')}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[17px] text-slate-400">store</span>
                  <span>Google Control</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('overview')}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[17px] text-slate-400">publish</span>
                  <span>Publication</span>
                </div>
              </button>
            </div>
          </div>

          {/* Intelligence & Policies */}
          <div>
            <div className="px-2.5 pb-1.5 text-[11px] font-medium text-slate-400">Intelligence &amp; Policies</div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => onSelectView('policy-studio')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'policy-studio'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[17px] text-slate-400">tune</span>
                  <span>Policy Studio</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('overview')}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[17px] text-slate-400">science</span>
                  <span>Experiments</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('os-modules')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'os-modules'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'os-modules' ? 'text-white' : 'text-slate-400'}`}>
                    extension
                  </span>
                  <span>OS Modules</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">8/8</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('ai-copilot')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'ai-copilot'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'ai-copilot' ? 'text-white' : 'text-purple-400'}`}>
                    auto_awesome
                  </span>
                  <span>AI Copilot</span>
                </div>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${
                  currentView === 'ai-copilot'
                    ? 'bg-blue-700 text-white border-blue-500'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                }`}>
                  AI
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('automations')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'automations'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'automations' ? 'text-white' : 'text-slate-400'}`}>
                    smart_toy
                  </span>
                  <span>Automations</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">6 active</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('ai-control-center')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'ai-control-center'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'ai-control-center' ? 'text-white' : 'text-slate-400'}`}>
                    admin_panel_settings
                  </span>
                  <span>AI Control Center</span>
                </div>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${
                  currentView === 'ai-control-center'
                    ? 'bg-blue-700 text-white border-blue-500'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  Gov
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('audit-log')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'audit-log'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'audit-log' ? 'text-white' : 'text-slate-400'}`}>
                    history
                  </span>
                  <span>Audit Log</span>
                </div>
              </button>
            </div>
          </div>

          {/* Admin & Settings */}
          <div>
            <div className="px-2.5 pb-1.5 text-[11px] font-medium text-slate-400">Admin &amp; Settings</div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => onSelectView('agency-command')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'agency-command'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'agency-command' ? 'text-white' : 'text-slate-400'}`}>
                    domain
                  </span>
                  <span>Agency Command</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('plans-billing')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'plans-billing'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'plans-billing' ? 'text-white' : 'text-slate-400'}`}>
                    credit_card
                  </span>
                  <span>Plans &amp; Billing</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Active</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView('settings')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors text-left ${
                  currentView === 'settings'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[17px] ${currentView === 'settings' ? 'text-white' : 'text-slate-400'}`}>
                    settings
                  </span>
                  <span>Settings</span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Engine Footer status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Telemetry Engine</span>
          <span className="text-emerald-400 font-medium font-mono text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Nominal (18ms)
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 mt-0.5 truncate">
          Tick #{tickNumber} · TLS 1.3
        </div>
      </div>
    </aside>
  );
};
