import React, { useState } from 'react';
import {
  CopilotMessage,
  MarketCode,
  OperatingMode,
  ProductDecisionItem
} from '../types';
import {
  COPILOT_SUGGESTED_QUERIES,
  INITIAL_COPILOT_MESSAGES
} from '../data/governanceMockData';

interface AICopilotViewProps {
  currentMarket: MarketCode;
  operatingMode: OperatingMode;
  onOpenReviewModal: () => void;
  onOpenWhyDrawer?: (product: ProductDecisionItem) => void;
  allProducts: ProductDecisionItem[];
}

export const AICopilotView: React.FC<AICopilotViewProps> = ({
  currentMarket,
  operatingMode,
  onOpenReviewModal,
  onOpenWhyDrawer,
  allProducts
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);
  const [activeMessageId, setActiveMessageId] = useState<string>('msg-2');
  const [inputText, setInputText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Active message for evidence inspector
  const activeMessage = messages.find((m) => m.id === activeMessageId) || messages[messages.length - 1];

  const handleSelectSuggestedQuery = (query: string) => {
    handleSendMessage(query);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsgId = `usr-${Date.now()}`;
    const newUserMsg: CopilotMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: 'Just now',
      query: text,
      content: text
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsAnalyzing(true);

    setTimeout(() => {
      let answerType: 'Analysis' | 'Recommendation' | 'Draft Action' = 'Analysis';
      let authorityLevel: 'A1 ASSIST' | 'A2 RECOMMEND' | 'A3 PREPARE' = 'A1 ASSIST';
      let content = '';
      let bullets: string[] = [];
      let targetSkus: string[] = ['FES-576012', 'MAK-7712', 'BOSCH-9921'];

      if (text.toLowerCase().includes('merchant') || text.toLowerCase().includes('publication')) {
        answerType = 'Analysis';
        authorityLevel = 'A1 ASSIST';
        content =
          'Audit of Google Merchant API telemetry for yesterday shows 18,420 items submitted via Supplemental data source. 0 schema rejections occurred, but 6 SKUs encountered temporary attribute warnings for missing GTIN-13 identifiers.';
        bullets = [
          'Supplemental push event #PUB-9912 was verified with 99.98% delivery rate.',
          'Missing GTIN warnings affected €1,450/mo in Controlled Spend in the NL marketplace.',
          'No destructive bid resets were executed. Fallback custom_label values remained intact.'
        ];
      } else if (text.toLowerCase().includes('safer policy') || text.toLowerCase().includes('delayed inbound')) {
        answerType = 'Draft Action';
        authorityLevel = 'A3 PREPARE';
        content =
          'Policy draft generated for delayed inbound inventory: When ERP purchase order ETA shifts >72h and local days of cover drops below 3.0 days, automatically prepare a transition to GUARD_HIGH rather than immediate unmoderated spend.';
        bullets = [
          'Threshold buffer: Set dynamic minimum cover to 3.5 days for high-velocity Tier 1 SKUs.',
          'Simulation outcome: Protects approximately €9,800/mo in at-risk spend during logistical transit gaps.',
          'Safety Rule: Execution requires staged review approval before updating Google Merchant custom labels.'
        ];
      } else if (text.toLowerCase().includes('controlled spend') || text.toLowerCase().includes('feed issues')) {
        answerType = 'Analysis';
        authorityLevel = 'A1 ASSIST';
        content =
          'Cross-referencing Merchant diagnostic errors against active ad spend reveals that GTIN mismatch in Germany currently exposes €4,250/mo in Controlled Spend across 8 electrical tools.';
        bullets = [
          'Highest exposure SKU: Festool TS 55 Plunge Saw (€3,420/mo) pending GTIN checksum verification.',
          'Supplemental data source has preserved custom_label_0=HOLD to prevent wasted spend while awaiting ERP master data correction.'
        ];
      } else {
        answerType = 'Recommendation';
        authorityLevel = 'A2 RECOMMEND';
        content = `Deterministic assessment of tenant data for Market ${currentMarket} indicates all active policy modules are operating within nominal thresholds. 42 SKUs remain evaluated with €18,420/mo in at-risk spend mitigated.`;
        bullets = [
          'Logistics feed: Inbound deliveries verified through SAP S/4HANA (sync 12m ago).',
          'Merchant status: Supplemental data source operational with 99.98% push success rate.',
          'Recommended action: Stage review for 4 border-line items nearing 2-day cover threshold.'
        ];
      }

      const asstMsgId = `asst-${Date.now()}`;
      const newAsstMsg: CopilotMessage = {
        id: asstMsgId,
        sender: 'assistant',
        timestamp: 'Just now',
        answerType,
        authorityLevel,
        content,
        bullets,
        proposedAction: {
          actionType: 'prepare_review',
          label: 'Prepare Review: Stage in Review Modal (Non-mutating)',
          targetSkus,
          tierTarget: 'GUARD_HIGH',
          estimatedSavingsEur: 2400
        },
        provenance: {
          factsCount: 11,
          reasonCodes: ['DOC_BELOW_THRESHOLD', 'ERP_PO_VERIFIED'],
          ledgerVersion: 'Decision Ledger v2.4.8-prod',
          provider: 'Google Gemini (Tenant Provider Policy · EU Residency)',
          model: 'gemini-1.5-pro-strict',
          acuConsumed: 14,
          citedLedgerEvents: ['#DL-8862', '#DL-8858']
        },
        evidenceFacts: [
          {
            id: 'ef-1',
            label: 'Market Scope Evaluated',
            value: `Market ${currentMarket} (Strict Tenancy)`,
            dataset: 'Plumb Catalog Graph',
            freshness: 'Synchronous',
            verified: true
          },
          {
            id: 'ef-2',
            label: 'Decision Ledger Anchor',
            value: 'Ledger Block #8862',
            dataset: 'Plumb Decision Ledger',
            freshness: '2m ago',
            verified: true
          }
        ],
        affectedSkus: [
          {
            sku: 'FES-576012',
            name: 'Festool TS 55 Plunge Cut Saw 1200W',
            market: currentMarket,
            currentTier: 'HOLD',
            proposedTier: 'HOLD',
            monthlySpendEur: 3420,
            reasonCode: 'INV_STOCKOUT_48H'
          }
        ]
      };

      setMessages((prev) => [...prev, newAsstMsg]);
      setActiveMessageId(asstMsgId);
      setIsAnalyzing(false);
    }, 650);
  };

  return (
    <div className="space-y-5">
      {/* Scope and Context Header */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <span className="material-symbols-outlined text-[19px]">auto_awesome</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight">AI Copilot</h1>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                Authority: A1–A3 Governed
              </span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Deterministic Grounding
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Assistant layer over Plumb’s deterministic Commerce Control Engine · Never mutates financial truth
            </p>
          </div>
        </div>

        {/* Tenant and Operating Context Chips */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 flex items-center gap-1.5">
            <span className="text-slate-400">Tenant:</span>
            <strong className="font-semibold text-slate-900">Starlight Europe GmbH</strong>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 flex items-center gap-1.5">
            <span className="text-slate-400">Market:</span>
            <strong className="font-semibold text-slate-900">{currentMarket}</strong>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 flex items-center gap-1.5">
            <span className="text-slate-400">Mode:</span>
            <strong className="font-semibold text-slate-900">{operatingMode}</strong>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 flex items-center gap-1.5">
            <span className="text-slate-400">ACU Remaining:</span>
            <strong className="font-semibold text-emerald-700">6,580 / 25,000</strong>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left/Center Workspace (7 cols) + Right Evidence Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left/Center Workspace */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Suggested Operational Questions */}
          <div className="bg-slate-50 rounded-lg border border-slate-200/80 p-3 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-slate-400">quick_phrases</span>
              <span>Suggested Operational Inquiries</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COPILOT_SUGGESTED_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestedQuery(q)}
                  className="text-xs text-left px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors shadow-2xs text-slate-700 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Conversational Analysis Area */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex-1 flex flex-col justify-between space-y-4 min-h-[460px]">
            <div className="space-y-4 overflow-y-auto max-h-[520px] pr-1">
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex items-start justify-end gap-2.5">
                      <div className="bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-lg max-w-lg shadow-2xs">
                        <div className="font-medium">{msg.query}</div>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono text-right">{msg.timestamp}</div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold shrink-0">
                        OP
                      </div>
                    </div>
                  );
                }

                const isSelected = activeMessageId === msg.id;

                return (
                  <div
                    key={msg.id}
                    onClick={() => setActiveMessageId(msg.id)}
                    className={`rounded-lg border p-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Header Badges: Answer Type, Authority, and Provenance */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                            msg.answerType === 'Analysis'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : msg.answerType === 'Recommendation'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-purple-50 text-purple-800 border-purple-200'
                          }`}
                        >
                          {msg.answerType || 'Analysis'}
                        </span>

                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                          {msg.authorityLevel || 'A1 ASSIST'}
                        </span>

                        <span className="text-[11px] text-slate-500 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Explicit Provenance Tag */}
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                        <span className="material-symbols-outlined text-[13px] text-emerald-600">verified</span>
                        <span>Generated from deterministic Plumb facts</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="mt-3 text-xs text-slate-800 leading-relaxed font-normal">
                      <p>{msg.content}</p>

                      {msg.bullets && msg.bullets.length > 0 && (
                        <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700 pl-3 border-l-2 border-slate-200">
                          {msg.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="leading-snug">
                              • {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Governed Action: Transform protected action into Prepare Review */}
                    {msg.proposedAction && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="material-symbols-outlined text-[16px] text-amber-600">shield</span>
                          <span className="font-medium text-slate-800">Governed Action:</span>
                          <span>Protected action transformed to operator staging</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenReviewModal();
                          }}
                          className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">rate_review</span>
                          <span>{msg.proposedAction.label}</span>
                        </button>
                      </div>
                    )}

                    {/* Provenance Footer */}
                    {msg.provenance && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span>Facts: <strong>{msg.provenance.factsCount}</strong></span>
                          <span>•</span>
                          <span>Codes: <strong>{msg.provenance.reasonCodes.join(', ')}</strong></span>
                          <span>•</span>
                          <span>Ledger: <strong>{msg.provenance.ledgerVersion}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{msg.provenance.model}</span>
                          <span className="px-1 py-0.2 rounded bg-slate-100 text-slate-700 font-bold">
                            {msg.provenance.acuConsumed} ACU
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {isAnalyzing && (
                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/40 text-xs text-blue-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span className="font-medium">Evaluating deterministic Plumb facts &amp; Decision Ledger...</span>
                </div>
              )}
            </div>

            {/* Enterprise Input Box */}
            <div className="pt-3 border-t border-slate-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="space-y-2"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask Copilot about policies, spend exposure, Merchant errors, or SKU decisions..."
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-24 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-sans"
                  />
                  <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isAnalyzing}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-md text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span>Inquire</span>
                      <span className="material-symbols-outlined text-[14px]">send</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Tenant Provider Policy · Data Residency Compliant · Non-mutating
                    </span>
                    <span>•</span>
                    <span>Never overrides financial ledger</span>
                  </div>
                  <span>Est. 12–25 ACU / query</span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right-Side Deterministic Evidence Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-slate-700">fact_check</span>
                <h2 className="text-sm font-semibold text-slate-900">Deterministic Evidence Inspector</h2>
              </div>
              <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                Latest eval: 99.8% (Suite #EVAL-218)
              </span>
            </div>

            {/* Source Facts Section */}
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                <span>Deterministic Source Facts</span>
                <span className="font-mono text-[11px] text-slate-500">
                  {activeMessage?.evidenceFacts?.length || 4} verified
                </span>
              </div>
              <div className="space-y-2">
                {activeMessage?.evidenceFacts?.map((fact) => (
                  <div
                    key={fact.id}
                    className="p-2.5 rounded-md bg-slate-50 border border-slate-200/80 text-xs flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="font-medium text-slate-900 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                        <span>{fact.label}</span>
                      </div>
                      <div className="font-mono text-slate-700 text-[11px] mt-0.5 font-semibold">
                        {fact.value}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        Source: {fact.dataset}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 shrink-0">
                      {fact.freshness}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reason Codes & Policy Version */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block font-medium">Policy Ruleset</span>
                <span className="font-mono font-bold text-slate-900 text-xs mt-0.5 block">v2.4.8-prod</span>
                <span className="text-[10px] text-emerald-700 font-mono">Hash: sha256:d891c...</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block font-medium">Warehouse / Hub</span>
                <span className="font-mono font-bold text-slate-900 text-xs mt-0.5 block">DE Central Hub</span>
                <span className="text-[10px] text-slate-500 font-mono">Munich DC-02</span>
              </div>
            </div>

            {/* Referenced Reason Codes */}
            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">Referenced Reason Codes</span>
              <div className="flex flex-wrap gap-1.5">
                {(activeMessage?.provenance?.reasonCodes || ['INV_STOCKOUT_48H', 'PO_DELAY_72H', 'MARGIN_EROSION_14D']).map((code) => (
                  <span
                    key={code}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>

            {/* Affected SKUs in this Context */}
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Affected SKUs in Context</span>
                <span className="font-mono text-[11px] text-slate-500">
                  {activeMessage?.affectedSkus?.length || 3} items
                </span>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-md overflow-hidden text-xs">
                {(activeMessage?.affectedSkus || []).map((skuItem) => (
                  <div key={skuItem.sku} className="p-2.5 bg-white flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <div className="font-mono font-semibold text-slate-900">{skuItem.sku}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{skuItem.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium text-rose-700">€{skuItem.monthlySpendEur.toLocaleString()}/mo</div>
                      <span className="font-mono text-[10px] px-1 rounded bg-slate-100 text-slate-700">
                        {skuItem.currentTier} → {skuItem.proposedTier}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cited Decision Ledger Events */}
            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1">Cited Decision Ledger Events</span>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                {(activeMessage?.provenance?.citedLedgerEvents || ['#DL-8842', '#DL-8839', '#DL-8812']).map((ev) => (
                  <span key={ev} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                    {ev}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Safety Footer */}
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between font-mono">
            <span>TLS 1.3 Verified · Tenant Provider Policy</span>
            <span className="text-emerald-700 font-medium">Anti-Bypass Guard Armed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
