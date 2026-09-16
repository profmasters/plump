import React, { useState, useEffect } from 'react';
import { ViewType } from '../Sidebar';
import { MarketCode, OperatingMode, ProductDecisionItem } from '../../types';
import { USER_AVATAR_URL } from '../../data/mockData';
import { MobileHomeView } from './MobileHomeView';
import { MobileProductDecisionsView } from './MobileProductDecisionsView';
import { MobileProductWhyPage } from './MobileProductWhyPage';
import { MobileRisksView } from './MobileRisksView';
import { MobileCopilotView } from './MobileCopilotView';
import { MobileMoreView } from './MobileMoreView';
import { MobileScopeSheet } from './MobileScopeSheet';
import { MobileApprovalFlow } from './MobileApprovalFlow';
import { MobileKillSwitchFlow } from './MobileKillSwitchFlow';
import { MobilePolicyStudioView } from './MobilePolicyStudioView';
import { MobileAutomationsView } from './MobileAutomationsView';

interface MobileShellProps {
  currentView: ViewType;
  onSelectView: (v: ViewType) => void;
  currentMarket: MarketCode | 'ALL';
  onChangeMarket: (m: MarketCode | 'ALL') => void;
  operatingMode: OperatingMode;
  onChangeOperatingMode: (mode: OperatingMode) => void;
  isKillSwitchArmed: boolean;
  onToggleKillSwitch: (armed: boolean) => void;
  products: ProductDecisionItem[];
  selectedProductIds: Set<string>;
  onToggleProductSelect: (id: string) => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onSwitchToPlatformAdmin?: () => void;
  onOverrideTier?: (sku: string, tier: string) => void;
}

export type MobileTab = 'home' | 'decisions' | 'risks' | 'copilot' | 'more';

export const MobileShell: React.FC<MobileShellProps> = ({
  currentView,
  onSelectView,
  currentMarket,
  onChangeMarket,
  operatingMode,
  onChangeOperatingMode,
  isKillSwitchArmed,
  onToggleKillSwitch,
  products,
  selectedProductIds,
  onToggleProductSelect,
  onOpenNotifications,
  unreadNotificationsCount,
  onSwitchToPlatformAdmin,
  onOverrideTier,
}) => {
  // Mobile active bottom tab
  const [activeTab, setActiveTab] = useState<MobileTab>('home');

  // Full-screen modal / page states
  const [selectedWhyProduct, setSelectedWhyProduct] = useState<ProductDecisionItem | null>(null);
  const [isScopeSheetOpen, setIsScopeSheetOpen] = useState<boolean>(false);
  const [isApprovalFlowOpen, setIsApprovalFlowOpen] = useState<boolean>(false);
  const [isKillSwitchFlowOpen, setIsKillSwitchFlowOpen] = useState<boolean>(false);

  // Keyboard awareness state: hides bottom nav when virtual keyboard is raised
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleViewportResize = () => {
      if (window.visualViewport) {
        const isKeyboard = window.visualViewport.height < window.innerHeight * 0.85;
        setIsKeyboardVisible(isKeyboard);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        setIsKeyboardVisible(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardVisible(false);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize);
    }
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Browser / Hardware Back Button Synchronization (popstate):
  // When an overlay / full-screen flow is open, browser back dismisses it gracefully
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      setSelectedWhyProduct(null);
      setIsApprovalFlowOpen(false);
      setIsKillSwitchFlowOpen(false);
      setIsScopeSheetOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openWhyPage = (p: ProductDecisionItem) => {
    window.history.pushState({ modal: 'why', sku: p.sku }, '');
    setSelectedWhyProduct(p);
  };

  const closeWhyPage = () => {
    setSelectedWhyProduct(null);
    if (window.history.state?.modal === 'why') {
      window.history.back();
    }
  };

  const openApprovalFlow = () => {
    window.history.pushState({ modal: 'approval' }, '');
    setIsApprovalFlowOpen(true);
  };

  const closeApprovalFlow = () => {
    setIsApprovalFlowOpen(false);
    if (window.history.state?.modal === 'approval') {
      window.history.back();
    }
  };

  const openKillSwitchFlow = () => {
    window.history.pushState({ modal: 'killswitch' }, '');
    setIsKillSwitchFlowOpen(true);
  };

  const closeKillSwitchFlow = () => {
    setIsKillSwitchFlowOpen(false);
    if (window.history.state?.modal === 'killswitch') {
      window.history.back();
    }
  };

  const openScopeSheet = () => {
    window.history.pushState({ modal: 'scope' }, '');
    setIsScopeSheetOpen(true);
  };

  const closeScopeSheet = () => {
    setIsScopeSheetOpen(false);
    if (window.history.state?.modal === 'scope') {
      window.history.back();
    }
  };

  // Bottom navigation items (EXACTLY 5 DESTINATIONS AS MANDATED)
  const bottomNavItems: { id: MobileTab; label: string; icon: string; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'decisions', label: 'Decisions', icon: 'checklist', badge: `${products.length}` },
    { id: 'risks', label: 'Risks', icon: 'monitoring' },
    { id: 'copilot', label: 'Copilot', icon: 'auto_awesome' },
    { id: 'more', label: 'More', icon: 'menu' },
  ];

  // If a full-screen Product Why page is open, render it full screen
  if (selectedWhyProduct) {
    return (
      <MobileProductWhyPage
        product={selectedWhyProduct}
        onBack={closeWhyPage}
        onOverrideTier={onOverrideTier}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. COMPACT MOBILE TOP BAR (56–64px height)                                */}
      {/* Exactly: Logo, Tenant/Scope, Control badge, Notification, Avatar           */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200/80 px-3.5 flex items-center justify-between shadow-2xs">
        {/* Left: Plumb Logo + Tenant Name / Current Scope Button */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-700 shrink-0">
            <img src={USER_AVATAR_URL} alt="Plumb" className="w-full h-full object-cover" />
          </div>

          <button
            type="button"
            onClick={() => setIsScopeSheetOpen(true)}
            className="flex items-center gap-1 text-left min-w-0 max-w-[155px] sm:max-w-[200px] hover:bg-slate-50 px-1.5 py-1 rounded-md transition-colors"
          >
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 block truncate">
                Nordic Tech AB
              </span>
              <span className="text-[10px] text-slate-500 font-mono block leading-none">
                Scope: {currentMarket === 'ALL' ? 'Global' : currentMarket}
              </span>
            </div>
            <span className="material-symbols-outlined text-[15px] text-slate-400 shrink-0">
              expand_more
            </span>
          </button>
        </div>

        {/* Right: Control mode badge, Notification icon, Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Control mode badge */}
          <button
            type="button"
            onClick={() => setIsScopeSheetOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-800"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Control</span>
          </button>

          {/* Notifications Icon */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          {/* User Avatar */}
          <button
            type="button"
            onClick={() => setActiveTab('more')}
            className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0"
          >
            <img src={USER_AVATAR_URL} alt="User" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. DEDICATED MOBILE SCREEN CONTENT                                        */}
      {/* ========================================================================= */}
      <main className="flex-1 p-4 pb-24 max-w-lg mx-auto w-full">
        {activeTab === 'home' && (
          <MobileHomeView
            operatingMode={operatingMode}
            onNavigateToDecisions={() => setActiveTab('decisions')}
            onNavigateToWhy={(sku) => {
              const target = sku ? products.find((p) => p.sku === sku) : products[0];
              if (target) openWhyPage(target);
            }}
            onNavigateToRisks={() => setActiveTab('risks')}
            onNavigateToApprovals={openApprovalFlow}
          />
        )}

        {activeTab === 'decisions' && (
          <MobileProductDecisionsView
            products={products}
            selectedProductIds={selectedProductIds}
            onToggleProductSelect={onToggleProductSelect}
            onOpenWhyPage={(p) => openWhyPage(p)}
            onOpenReviewModal={openApprovalFlow}
          />
        )}

        {activeTab === 'risks' && (
          <MobileRisksView />
        )}

        {activeTab === 'copilot' && (
          <MobileCopilotView
            onOpenReviewModal={openApprovalFlow}
            onOpenWhyPage={(p) => openWhyPage(p)}
            allProducts={products}
          />
        )}

        {activeTab === 'more' && (
          <>
            {currentView === 'policy-studio' ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onSelectView('overview')}
                  className="text-xs font-semibold text-blue-600 flex items-center gap-1 mb-2"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Back to Menu</span>
                </button>
                <MobilePolicyStudioView
                  onOpenSimulation={() => {}}
                  onOpenReviewModal={openApprovalFlow}
                />
              </div>
            ) : currentView === 'automations' ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onSelectView('overview')}
                  className="text-xs font-semibold text-blue-600 flex items-center gap-1 mb-2"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Back to Menu</span>
                </button>
                <MobileAutomationsView
                  onOpenReviewModal={openApprovalFlow}
                />
              </div>
            ) : (
              <MobileMoreView
                onSelectView={(v) => onSelectView(v)}
                onOpenSafetyControls={openKillSwitchFlow}
                onOpenScopeSheet={openScopeSheet}
                onSwitchToPlatformAdmin={onSwitchToPlatformAdmin}
                isKillSwitchArmed={isKillSwitchArmed}
              />
            )}
          </>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3. MOBILE BOTTOM NAVIGATION (EXACTLY 5 ITEMS, NO 6TH ITEM)                */}
      {/* Hidden when virtual keyboard is raised to avoid layout collisions         */}
      {/* ========================================================================= */}
      <nav
        className={`fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-40 px-2 items-center justify-around shadow-lg pb-safe transition-transform duration-150 ${
          isKeyboardVisible ? 'hidden' : 'flex'
        }`}
      >
        {bottomNavItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'more') {
                  onSelectView('overview');
                }
              }}
              className={`flex-1 h-full flex flex-col items-center justify-center transition-colors relative min-w-[56px] ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              <span className="text-[11px] tracking-tight mt-0.5 font-medium">{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-2 right-[25%] px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[9px] font-mono leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ========================================================================= */}
      {/* 4. MODALS & SHEETS                                                        */}
      {/* ========================================================================= */}
      {/* Scope Sheet */}
      <MobileScopeSheet
        isOpen={isScopeSheetOpen}
        onClose={closeScopeSheet}
        currentMarket={currentMarket}
        onChangeMarket={onChangeMarket}
        operatingMode={operatingMode}
        onChangeOperatingMode={onChangeOperatingMode}
      />

      {/* Full-Screen Approval Flow */}
      <MobileApprovalFlow
        isOpen={isApprovalFlowOpen}
        onClose={closeApprovalFlow}
        onApprove={() => {
          closeApprovalFlow();
        }}
        onReject={() => {
          closeApprovalFlow();
        }}
      />

      {/* Full-Screen Safety Circuit / Kill Switch Flow */}
      <MobileKillSwitchFlow
        isOpen={isKillSwitchFlowOpen}
        onClose={closeKillSwitchFlow}
        isArmed={isKillSwitchArmed}
        operatingMode={operatingMode}
        onToggleArm={onToggleKillSwitch}
      />
    </div>
  );
};
