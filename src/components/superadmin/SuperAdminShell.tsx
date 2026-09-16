import React, { useState, useEffect } from 'react';
import { SuperAdminHeader } from './SuperAdminHeader';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { SuperAdminResponsiveNav } from './SuperAdminResponsiveNav';
import { MobileSuperAdmin } from './MobileSuperAdmin';
import { PlatformOverviewScreen } from './PlatformOverviewScreen';
import { TenantsScreen } from './TenantsScreen';
import { TenantOperationsScreen } from './TenantOperationsScreen';
import { PlanBuilderScreen } from './PlanBuilderScreen';
import { ConnectorFleetScreen } from './ConnectorFleetScreen';
import { MerchantPublicationOpsScreen } from './MerchantPublicationOpsScreen';
import { AIPlatformOpsScreen } from './AIPlatformOpsScreen';
import { BillingOpsScreen } from './BillingOpsScreen';
import { IncidentCenterScreen } from './IncidentCenterScreen';
import { AuditSecurityScreen } from './AuditSecurityScreen';
import { SupportSessionModal } from './SupportSessionModal';
import { GlobalKillSwitchModal } from './GlobalKillSwitchModal';
import {
  SuperAdminViewType,
  PlatformTenantItem,
  PLATFORM_INCIDENTS,
} from '../../data/superAdminMockData';

interface SuperAdminShellProps {
  onSwitchToCustomerDashboard: () => void;
}

export const SuperAdminShell: React.FC<SuperAdminShellProps> = ({ onSwitchToCustomerDashboard }) => {
  const [currentView, setCurrentView] = useState<SuperAdminViewType>('platform-overview');
  const [selectedTenant, setSelectedTenant] = useState<PlatformTenantItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Viewport tracking for mobile-specific interaction model
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      `Support session initiated for ${supportModalTenant?.name} (Ticket: ${ticketId}). Session recorded with cryptographic integrity.`
    );
    setTimeout(() => setSessionActiveToast(null), 4000);
  };

  // If mobile viewport, render dedicated Mobile Super Admin
  if (isMobile) {
    return (
      <>
        <MobileSuperAdmin
          onSwitchToCustomerDashboard={onSwitchToCustomerDashboard}
          onOpenGlobalKillSwitch={() => setIsGlobalKillSwitchOpen(true)}
          isGlobalKillSwitchArmed={isGlobalKillSwitchArmed}
        />
        <GlobalKillSwitchModal
          isOpen={isGlobalKillSwitchOpen}
          onClose={() => setIsGlobalKillSwitchOpen(false)}
          isArmed={isGlobalKillSwitchArmed}
          onToggleArm={setIsGlobalKillSwitchArmed}
        />
      </>
    );
  }

  return (
    <div className="bg-[#0F172A] text-slate-800 min-h-screen flex flex-col font-sans antialiased">
      {/* 1. TOP HEADER (Platform Admin Enterprise Header) */}
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

      {/* 3. RESPONSIVE NAVIGATION (Tablet rail md: to xl:) */}
      <SuperAdminResponsiveNav
        currentView={currentView}
        onSelectView={setCurrentView}
        openIncidentsCount={activeIncidentsCount}
      />

      {/* 4. MAIN PLATFORM CONTENT AREA (Standard Plumb light/slate enterprise surfaces) */}
      <div className="xl:pl-64 md:pl-16 pl-0 min-h-screen flex flex-col bg-[#F8FAFC]">
        <main className="pt-14 p-6 space-y-6 max-w-7xl w-full mx-auto flex-1">
          {sessionActiveToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-800 flex items-center justify-between animate-in fade-in duration-150">
              <span className="font-semibold">✓ {sessionActiveToast}</span>
              <span className="text-[11px] text-emerald-600">Time-bounded (60m)</span>
            </div>
          )}

          {/* Scope & Mode Header Banner */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 rounded-md bg-slate-900 text-amber-300 font-mono text-xs font-bold">
                PLATFORM ADMIN
              </div>
              <span className="text-slate-300">|</span>
              <div className="text-xs text-slate-600 font-medium">
                Global Fleet Scope: <strong className="font-semibold text-slate-900">32 Active Tenants</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fleet Telemetry Sync: Nominal</span>
            </div>
          </div>

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
        <footer className="mt-auto border-t border-slate-200/80 bg-white px-6 py-3 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Fleet: 32 Tenants Provisioned
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Google Merchant API: Nominal
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Plumb Super Admin · Platform Node: eu-central-01 · Session ID: b881...22a4
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
