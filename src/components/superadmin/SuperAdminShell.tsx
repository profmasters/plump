import React, { useState } from 'react';
import { SuperAdminHeader } from './components/superadmin/SuperAdminHeader';
import { SuperAdminSidebar } from './components/superadmin/SuperAdminSidebar';
import { SuperAdminResponsiveNav } from './components/superadmin/SuperAdminResponsiveNav';
import { PlatformOverviewScreen } from './components/superadmin/PlatformOverviewScreen';
import { TenantsScreen } from './components/superadmin/TenantsScreen';
import { TenantOperationsScreen } from './components/superadmin/TenantOperationsScreen';
import { PlanBuilderScreen } from './components/superadmin/PlanBuilderScreen';
import { ConnectorFleetScreen } from './components/superadmin/ConnectorFleetScreen';
import { MerchantPublicationOpsScreen } from './components/superadmin/MerchantPublicationOpsScreen';
import { AIPlatformOpsScreen } from './components/superadmin/AIPlatformOpsScreen';
import { BillingOpsScreen } from './components/superadmin/BillingOpsScreen';
import { IncidentCenterScreen } from './components/superadmin/IncidentCenterScreen';
import { AuditSecurityScreen } from './components/superadmin/AuditSecurityScreen';
import { SupportSessionModal } from './components/superadmin/SupportSessionModal';
import { GlobalKillSwitchModal } from './components/superadmin/GlobalKillSwitchModal';
import {
  SuperAdminViewType,
  PlatformTenantItem,
  PLATFORM_INCIDENTS,
} from './data/superAdminMockData';

interface SuperAdminShellProps {
  onSwitchToCustomerDashboard: () => void;
}

export const SuperAdminShell: React.FC<SuperAdminShellProps> = ({ onSwitchToCustomerDashboard }) => {
  const [currentView, setCurrentView] = useState<SuperAdminViewType>('platform-overview');
  const [selectedTenant, setSelectedTenant] = useState<PlatformTenantItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Super admin modals
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportModalTenant, setSupportModalTenant] = useState<PlatformTenantItem | null>(null);
  const [isGlobalKillSwitchOpen, setIsGlobalKillSwitchOpen] = useState(false);
  const [isGlobalKillSwitchArmed, setIsGlobalKillSwitchArmed] = useState(true);
  const [sessionActiveToast, setSessionActiveToast] = useState<string | null>(null);

  const activeIncidentsCount = PLATFORM_INCIDENTS.filter((i) => i.status !== 'Resolved').length;

  const handleOpenSupportModal = (tenant: PlatformTenantItem) => {
    setSupportModalTenant(tenant);
    setIsSupportModalOpen(true);
  };

  const handleConfirmSupportSession = (ticketId: string, reason: string) => {
    setSessionActiveToast(
      `Support session initiated for ${supportModalTenant?.name} (Ticket: ${ticketId}). Session recorded with SHA-256 integrity.`
    );
    setTimeout(() => setSessionActiveToast(null), 4000);
  };

  return (
    <div className="bg-[#080C14] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. TOP HEADER (Platform Admin) */}
      <SuperAdminHeader
        currentView={currentView}
        onSelectView={setCurrentView}
        onSwitchToCustomerDashboard={onSwitchToCustomerDashboard}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenGlobalKillSwitch={() => setIsGlobalKillSwitchOpen(true)}
        isGlobalKillSwitchArmed={isGlobalKillSwitchArmed}
      />

      {/* 2. SIDEBAR (Desktop 1280px+) */}
      <SuperAdminSidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        openIncidentsCount={activeIncidentsCount}
      />

      {/* 3. RESPONSIVE NAVIGATION (Tablet rail md: to xl:, Mobile bottom bar < md:) */}
      <SuperAdminResponsiveNav
        currentView={currentView}
        onSelectView={setCurrentView}
        openIncidentsCount={activeIncidentsCount}
      />

      {/* 4. MAIN PLATFORM CONTENT AREA */}
      <div className="xl:pl-64 md:pl-16 pl-0 min-h-screen flex flex-col bg-[#080C14] pb-16 md:pb-0">
        <main className="pt-14 p-4 sm:p-6 space-y-6 max-w-7xl w-full mx-auto flex-1">
          {sessionActiveToast && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-xs font-mono text-emerald-300 flex items-center justify-between animate-in fade-in duration-150">
              <span>✓ {sessionActiveToast}</span>
              <span className="text-[11px] text-emerald-400">Time-bounded (60m)</span>
            </div>
          )}

          {currentView === 'platform-overview' && (
            <PlatformOverviewScreen onNavigateTo={setCurrentView} />
          )}

          {currentView === 'tenants' && (
            <TenantsScreen
              onSelectTenant={(t) => setSelectedTenant(t)}
              onNavigateTo={setCurrentView}
            />
          )}

          {currentView === 'tenant-operations' && (
            <TenantOperationsScreen
              tenant={selectedTenant}
              onNavigateTo={setCurrentView}
              onOpenSupportSessionModal={handleOpenSupportModal}
            />
          )}

          {currentView === 'plan-builder' && (
            <PlanBuilderScreen />
          )}

          {currentView === 'connector-fleet' && (
            <ConnectorFleetScreen />
          )}

          {currentView === 'merchant-publication-ops' && (
            <MerchantPublicationOpsScreen />
          )}

          {currentView === 'ai-platform-ops' && (
            <AIPlatformOpsScreen />
          )}

          {currentView === 'billing-ops' && (
            <BillingOpsScreen />
          )}

          {currentView === 'incident-center' && (
            <IncidentCenterScreen />
          )}

          {currentView === 'audit-security' && (
            <AuditSecurityScreen />
          )}
        </main>

        {/* Platform Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-[#080C14] px-6 py-3 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Fleet: 48 Tenants Provisioned
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Global Ingestion: Nominal
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            Plumb Super Admin · Platform Node: eu-central-01 · Session SHA: b881...22a4
          </div>
        </footer>
      </div>

      {/* 5. SUPER ADMIN MODALS */}
      <SupportSessionModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        tenant={supportModalTenant}
        onConfirmSession={handleConfirmSupportSession}
      />

      <GlobalKillSwitchModal
        isOpen={isGlobalKillSwitchOpen}
        onClose={() => setIsGlobalKillSwitchOpen(false)}
        isArmed={isGlobalKillSwitchArmed}
        onToggleArm={setIsGlobalKillSwitchArmed}
      />
    </div>
  );
};
