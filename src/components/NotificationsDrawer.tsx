import React from 'react';
import { InterventionEvent } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  interventions: InterventionEvent[];
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  interventions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-blue-600">notifications</span>
            <h3 className="text-sm font-semibold text-slate-900">Live Telemetry &amp; Feed Alerts</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100 text-xs">
          {interventions.map((item) => (
            <div key={item.id} className="py-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-400 text-[11px]">{item.timeCet} CET</span>
                <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-medium border ${
                  item.tierChange === 'HOLD'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {item.tierChange}
                </span>
              </div>
              <div className="font-medium text-slate-900">
                Target: <span className="font-mono">{item.target}</span> via {item.source}
              </div>
              <p className="text-slate-600 text-[11px]">{item.reason}</p>
              <div className="text-[10px] text-slate-400 font-mono">Executor: {item.executor}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Sync interval: 15s</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100 font-medium cursor-pointer"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};
