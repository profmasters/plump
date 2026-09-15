import React, { useState } from 'react';
import { MOCK_OS_MODULES, OSModuleItem, ModuleProvisionState } from '../data/supportingScreensMockData';

export const OSModulesView: React.FC = () => {
  const [modules, setModules] = useState<OSModuleItem[]>(MOCK_OS_MODULES);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Core Guard', 'Causal Science', 'Catalog & Merchant', 'Agency & Governance', 'Integration Interlock'];

  const filteredModules = selectedCategory === 'ALL'
    ? modules
    : modules.filter(m => m.category === selectedCategory);

  const getProvisionBadge = (state: ModuleProvisionState) => {
    switch (state) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Provisioned':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Setup Required':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Degraded':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Paused':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Available':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Not Entitled':
      default:
        return 'bg-slate-100 text-slate-400 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Versioned Entitlement Context */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">extension</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">OS Modules &amp; Provisioning Matrix</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
              Plan Version: ENT-CONTROL-v7
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Module availability derives strictly from Versioned Entitlements · Operational status reflects live data readiness &amp; evaluation health
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-600">Active Engine:</span>
          <strong className="text-emerald-700">7 Active · 1 Provisioned</strong>
        </div>
      </div>

      {/* 2. Category Filter Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Modules Catalog Grid (Enterprise density, no consumer app store fluff) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white rounded-lg border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{mod.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400">({mod.category})</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{mod.tagline}</div>
                </div>

                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${getProvisionBadge(mod.provisionState)}`}>
                  {mod.provisionState}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {mod.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              {/* Dependencies */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Dependencies:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mod.dependencies.map((dep, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px]">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scope & Data Readiness */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div>
                  <span className="text-slate-400 block font-sans">Data Readiness:</span>
                  <span className={`font-semibold ${
                    mod.dataReadiness.includes('Ready') ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {mod.dataReadiness}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans">Evaluation &amp; Health:</span>
                  <span className="text-slate-800 font-semibold">{mod.healthPercent}% · {mod.lastRunOrEval}</span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Scope: <strong>{mod.scope}</strong></span>
                <span className="text-blue-700 font-mono text-[10px]">{mod.entitlementState}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
