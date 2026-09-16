import React, { useState, useEffect } from 'react';
import { ViewType, Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ResponsiveShell } from './components/ResponsiveShell';
import { MobileShell } from './components/mobile/MobileShell';
import { SuperAdminShell } from './components/superadmin/SuperAdminShell';
import { OverviewView } from './components/OverviewView';
import { ProductDecisionsView } from './components/ProductDecisionsView';
import { AICopilotView } from './components/AICopilotView';
import { AutomationsView } from './components/AutomationsView';
import { AIControlCenterView } from './components/AIControlCenterView';
import { PlansBillingView } from './components/PlansBillingView';
import { AgencyCommandCenterView } from './components/AgencyCommandCenterView';
import { OSModulesView } from './components/OSModulesView';
import { AuditLogView } from './components/AuditLogView';
import { ConnectorsView } from './components/ConnectorsView';
import { ImportsMappingView } from './components/ImportsMappingView';
import { SettingsView } from './components/SettingsView';
import { KillSwitchModal } from './components/KillSwitchModal';
import { ReviewModal } from './components/ReviewModal';
import { WhyDrawer } from './components/WhyDrawer';
import { SimulatePolicyModal } from './components/SimulatePolicyModal';
import { ExportModal } from './components/ExportModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import {
  PRODUCT_DECISIONS,
  TOP_RISKS,
  GUARD_MODULES,
  MARKET_HEALTH,
  RECENT_INTERVENTIONS,
  PROPOSED_CHANGES_MOCK,
} from './data/mockData';
import { MarketCode, OperatingMode, ProductDecisionItem } from './types';
import { AuthProvider, useAuth } from './auth/authContext';
import { PlatformAdminAccessDenied } from './components/common/PlatformAdminAccessDenied';

function AppContent() {
  const { canAccessPlatformAdmin } = useAuth();

  // Application level routing: Customer Operational Dashboard vs Super Admin Platform Ops
  const [activeApplication, setActiveApplication] = useState<'customer-dashboard' | 'platform-admin'>('customer-dashboard');

  // Viewport detection for mobile interaction model
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

  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [currentMarket, setCurrentMarket] = useState<MarketCode | 'ALL'>('ALL');
  const [operatingMode, setOperatingMode] = useState<OperatingMode>('Control (Active)');
  const [isKillSwitchArmed, setIsKillSwitchArmed] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals and Drawers
  const [isKillSwitchModalOpen, setIsKillSwitchModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isSimulatePolicyOpen, setIsSimulatePolicyOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [selectedWhyProduct, setSelectedWhyProduct] = useState<ProductDecisionItem | null>(null);

  // Products and selected rows
  const [products, setProducts] = useState<ProductDecisionItem[]>(PRODUCT_DECISIONS);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
    new Set(['prod-1', 'prod-3', 'prod-6'])
  );

  // Live telemetry loop simulation (Tick counter incrementing every 5s)
  const [tickNumber, setTickNumber] = useState<number>(49102);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickNumber((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Quick keyboard shortcut (⌘K or Ctrl+K to search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('product-search-filter');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for product selection
  const handleToggleProductSelect = (id: string) => {
    setSelectedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleAllProducts = () => {
    if (selectedProductIds.size === products.length) {
      setSelectedProductIds(new Set());
    } else {
      setSelectedProductIds(new Set(products.map((p) => p.id)));
    }
  };

  // Applying approved changes from review modal
  const handleApplyProposedChanges = (approvedIds: string[]) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (approvedIds.includes(item.id)) {
          return {
            ...item,
            currentTier: item.proposedTier,
          };
        }
        return item;
      })
    );
  };

  // Manual tier override from Why Drawer
  const handleOverrideTier = (sku: string, newTier: string) => {
    setProducts((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, currentTier: newTier as any } : item))
    );
    if (selectedWhyProduct && selectedWhyProduct.sku === sku) {
      setSelectedWhyProduct((prev) => prev ? { ...prev, currentTier: newTier as any } : null);
    }
  };

  const handleNavigateToWhy = (sku?: string) => {
    if (sku) {
      const found = products.find((p) => p.sku === sku);
      if (found) {
        setSelectedWhyProduct(found);
        return;
      }
    }
    // Default open first product why drawer
    setSelectedWhyProduct(products[0]);
  };

  // Filter products by market if selected in top bar
  const displayedProducts = currentMarket === 'ALL'
    ? products
    : products.filter((p) => p.market === currentMarket);

  // 1. SUPER ADMIN PLATFORM ROUTE (Hard RBAC Route Guard)
  if (activeApplication === 'platform-admin') {
    if (!canAccessPlatformAdmin) {
      return (
        <PlatformAdminAccessDenied
          onReturnToDashboard={() => setActiveApplication('customer-dashboard')}
        />
      );
    }
    return (
      <SuperAdminShell
        onSwitchToCustomerDashboard={() => setActiveApplication('customer-dashboard')}
      />
    );
  }

  // 2. MOBILE INTERACTION MODEL (< 768px)
  if (isMobile) {
    return (
      <>
        <MobileShell
          currentView={currentView}
          onSelectView={setCurrentView}
          currentMarket={currentMarket}
          onChangeMarket={setCurrentMarket}
          operatingMode={operatingMode}
          onChangeOperatingMode={setOperatingMode}
          isKillSwitchArmed={isKillSwitchArmed}
          onToggleKillSwitch={setIsKillSwitchArmed}
          products={displayedProducts}
          selectedProductIds={selectedProductIds}
          onToggleProductSelect={handleToggleProductSelect}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={RECENT_INTERVENTIONS.length}
          onSwitchToPlatformAdmin={() => setActiveApplication('platform-admin')}
          onOverrideTier={handleOverrideTier}
        />

        {/* Global Drawers & Modals accessible from Mobile when opened */}
        <NotificationsDrawer
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          interventions={RECENT_INTERVENTIONS}
        />

        <SimulatePolicyModal
          isOpen={isSimulatePolicyOpen}
          onClose={() => setIsSimulatePolicyOpen(false)}
        />

        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          products={products}
        />
      </>
    );
  }

  // 3. DESKTOP & TABLET EXPERIENCE (>= 768px)
  return (
    <div className="bg-[#F8FAFC] text-slate-800 text-sm antialiased min-h-screen flex flex-col font-sans">
      {/* 1A. DESKTOP SIDEBAR (Visible on xl: 1280px+) */}
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => {
          if (v === 'why') {
            setSelectedWhyProduct(products[0]);
          } else {
            setCurrentView(v);
          }
        }}
        tickNumber={tickNumber}
      />

      {/* 1B. TABLET COMPACT ICON RAIL (Visible on md: to xl: 768px - 1279px) */}
      <ResponsiveShell
        currentView={currentView}
        onSelectView={(v) => {
          if (v === 'why') {
            setSelectedWhyProduct(products[0]);
          } else {
            setCurrentView(v);
          }
        }}
        unreadCount={RECENT_INTERVENTIONS.length}
        isKillSwitchArmed={isKillSwitchArmed}
        onOpenKillSwitchModal={() => setIsKillSwitchModalOpen(true)}
      />

      {/* 2. MAIN APPLICATION WORKSPACE */}
      <div className="xl:pl-64 md:pl-16 pl-0 min-h-screen flex flex-col bg-[#F8FAFC]">
        {/* Global Header */}
        <Header
          currentMarket={currentMarket}
          onChangeMarket={(m) => setCurrentMarket(m)}
          operatingMode={operatingMode}
          isKillSwitchArmed={isKillSwitchArmed}
          onOpenKillSwitchModal={() => setIsKillSwitchModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={RECENT_INTERVENTIONS.length}
          onSwitchToSuperAdmin={() => setActiveApplication('platform-admin')}
        />

        {/* Dynamic View Canvas */}
        <main className="pt-14 p-4 sm:p-6 space-y-5 max-w-7xl w-full mx-auto flex-1">
          {currentView === 'overview' && (
            <OverviewView
              operatingMode={operatingMode}
              onChangeOperatingMode={setOperatingMode}
              topRisks={TOP_RISKS}
              guardModules={GUARD_MODULES}
              marketHealth={MARKET_HEALTH}
              interventions={RECENT_INTERVENTIONS}
              onNavigateToDecisions={() => setCurrentView('product-decisions')}
              onNavigateToWhy={(sku) => handleNavigateToWhy(sku)}
              onNavigateToPolicyStudio={() => setIsSimulatePolicyOpen(true)}
              onExportAuditTrail={() => setIsExportModalOpen(true)}
            />
          )}

          {currentView === 'product-decisions' && (
            <ProductDecisionsView
              products={displayedProducts}
              selectedProductIds={selectedProductIds}
              operatingMode={operatingMode}
              onToggleProductSelect={handleToggleProductSelect}
              onToggleAllProducts={handleToggleAllProducts}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
              onOpenWhyDrawer={(p) => setSelectedWhyProduct(p)}
              onOpenSimulatePolicy={() => setIsSimulatePolicyOpen(true)}
              onExportLineage={() => setIsExportModalOpen(true)}
            />
          )}

          {currentView === 'data-health' && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-emerald-600">monitoring</span>
                  <h2 className="text-base font-semibold text-slate-900">Data Health &amp; Schema Integrity</h2>
                </div>
                <span className="px-2 py-0.5 rounded font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                  Confidence: 99.2%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 block">Catalog ID Collisions</span>
                  <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">0 collisions</span>
                  <span className="text-xs text-emerald-600 font-medium">100% unique primary keys across ERPs</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 block">Merchant Publication Success</span>
                  <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">99.98%</span>
                  <span className="text-xs text-slate-500">Last sync 3m ago via Google Merchant API · Supplemental data source</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 block">Supplemental Attributes Bound</span>
                  <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">custom_label_0..4</span>
                  <span className="text-xs text-slate-500">Tier, Profit Margin, DOC, Lead Time</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('overview')}
                  className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  ← Back to Overview
                </button>
              </div>
            </div>
          )}

          {currentView === 'policy-studio' && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-blue-600">tune</span>
                  <h2 className="text-base font-semibold text-slate-900">Policy Studio &amp; Active Rulesets</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSimulatePolicyOpen(true)}
                  className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">science</span>
                  <span>Simulate Ruleset</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {GUARD_MODULES.map((gm) => (
                  <div key={gm.id} className="p-4 border border-slate-200 rounded-lg flex items-center justify-between bg-slate-50/50">
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{gm.name}</div>
                      <div className="text-slate-500 mt-0.5">{gm.subtitle}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-xs font-semibold bg-white border border-slate-200 text-emerald-700">
                        {gm.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('overview')}
                  className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  ← Back to Overview
                </button>
              </div>
            </div>
          )}

          {currentView === 'connectors' && (
            <ConnectorsView />
          )}

          {currentView === 'imports-mapping' && (
            <ImportsMappingView />
          )}

          {currentView === 'agency-command' && (
            <AgencyCommandCenterView />
          )}

          {currentView === 'os-modules' && (
            <OSModulesView />
          )}

          {currentView === 'audit-log' && (
            <AuditLogView />
          )}

          {currentView === 'settings' && (
            <SettingsView />
          )}

          {currentView === 'ai-copilot' && (
            <AICopilotView
              currentMarket={currentMarket === 'ALL' ? 'DE' : currentMarket}
              operatingMode={operatingMode}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
              onOpenWhyDrawer={(product) => setSelectedWhyProduct(product)}
              allProducts={products}
            />
          )}

          {currentView === 'automations' && (
            <AutomationsView onOpenReviewModal={() => setIsReviewModalOpen(true)} />
          )}

          {currentView === 'ai-control-center' && (
            <AIControlCenterView />
          )}

          {currentView === 'plans-billing' && (
            <PlansBillingView />
          )}
        </main>

        {/* Refined Footer */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white px-6 py-3 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Storefronts: <strong className="font-normal text-slate-700">4 synced</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Supplemental Dispatch: <strong className="font-normal text-slate-700">3m ago</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Telemetry Loop: <strong className="font-normal text-slate-700">15s</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px] font-mono">
            <span>TLS 1.3 / E-G4</span>
            <span>·</span>
            <span>© 2025 Plumb Control OS</span>
          </div>
        </footer>
      </div>

      {/* 3. MODALS & DRAWERS */}
      <KillSwitchModal
        isOpen={isKillSwitchModalOpen}
        onClose={() => setIsKillSwitchModalOpen(false)}
        isArmed={isKillSwitchArmed}
        operatingMode={operatingMode}
        onToggleArm={(armed) => setIsKillSwitchArmed(armed)}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        proposedChanges={PROPOSED_CHANGES_MOCK}
        onApplyChanges={handleApplyProposedChanges}
      />

      <WhyDrawer
        product={selectedWhyProduct}
        onClose={() => setSelectedWhyProduct(null)}
        onOverrideTier={handleOverrideTier}
      />

      <SimulatePolicyModal
        isOpen={isSimulatePolicyOpen}
        onClose={() => setIsSimulatePolicyOpen(false)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        products={products}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        interventions={RECENT_INTERVENTIONS}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
