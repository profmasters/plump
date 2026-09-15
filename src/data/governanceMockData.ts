import {
  CopilotMessage,
  AutomationItem,
  AutomationRunLog,
  AIProviderStatus,
  AIRoutingPolicyItem,
  AIPromptRegistryItem,
  AIReleaseManifest,
  PlanEntitlement,
  OperationalLimit,
  BYOKCredentialStatus
} from '../types';

export const COPILOT_SUGGESTED_QUERIES = [
  'Why did 42 products move to GUARD_HIGH in Germany?',
  'Which feed issues expose the most Controlled Spend?',
  'Explain yesterday’s Merchant publication failures.',
  'Draft a safer policy for products with delayed inbound stock.',
  'Which products have strong ROAS but should not be suppressed despite low cover?'
];

export const INITIAL_COPILOT_MESSAGES: CopilotMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    timestamp: '10:41 CET',
    query: 'Why did 42 products move to GUARD_HIGH in Germany?',
    content: 'Why did 42 products move to GUARD_HIGH in Germany?'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    timestamp: '10:41 CET',
    answerType: 'Analysis',
    authorityLevel: 'A1 ASSIST',
    content:
      'Deterministic analysis of the Decision Ledger confirms 42 SKUs in Market DE were re-evaluated following the 08:30 CET inbound logistics feed sync. 31 of these SKUs triggered Rule INV_STOCKOUT_48H due to stock cover dropping below 2.0 days while active PMax campaigns maintained aggressive bid targets.',
    bullets: [
      'Primary Trigger: Stock cover dropped from avg 6.4 days to 1.8 days due to delayed PO #PO-88192 (Festool & Bosch power tool lines).',
      'Economic Exposure: €18,420/mo in Controlled Spend was actively burning on inventory projected to stock out before next shipment.',
      'Deterministic Decision: Engine shifted 31 SKUs to GUARD_HIGH (reducing custom_label_0 target bid tier) and staged 11 border-line SKUs for operator review.',
      'Google Merchant API status: Supplemental feed payload was verified and acknowledged at 08:34 CET with 0 schema rejection errors.'
    ],
    proposedAction: {
      actionType: 'prepare_review',
      label: 'Prepare Review: Inspect 11 border-line SKUs staged for HOLD',
      targetSkus: ['FES-576012', 'MAK-7712', 'BOSCH-9921', 'DEW-9912'],
      tierTarget: 'HOLD',
      estimatedSavingsEur: 4200
    },
    provenance: {
      factsCount: 14,
      reasonCodes: ['INV_STOCKOUT_48H', 'PO_DELAY_72H', 'MARGIN_EROSION_14D'],
      ledgerVersion: 'Decision Ledger v2.4.8-prod',
      provider: 'Google Gemini (Tenant Provider Policy · EU Residency)',
      model: 'gemini-1.5-pro-strict',
      acuConsumed: 18,
      citedLedgerEvents: ['#DL-8842', '#DL-8839', '#DL-8812']
    },
    evidenceFacts: [
      {
        id: 'fact-1',
        label: 'Inbound PO Status',
        value: 'Delayed (+72h ETA shift to Sep 18)',
        dataset: 'SAP S/4HANA Logistics Feed',
        freshness: '12m ago',
        verified: true
      },
      {
        id: 'fact-2',
        label: 'Mean Stock Cover',
        value: '1.8 Days of Cover (DOC)',
        dataset: 'Warehouse WMS Inventory Balance',
        freshness: '8m ago',
        verified: true
      },
      {
        id: 'fact-3',
        label: 'Controlled Spend at Risk',
        value: '€18,420 /mo across 42 SKUs',
        dataset: 'Google Ads Cost Telemetry API',
        freshness: '3m ago',
        verified: true
      },
      {
        id: 'fact-4',
        label: 'Policy Evaluation Hash',
        value: 'sha256:d891cfa90... (Rule INV_STOCKOUT_48H)',
        dataset: 'Plumb Policy Engine v2.4.8',
        freshness: 'Synchronous',
        verified: true
      }
    ],
    affectedSkus: [
      {
        sku: 'FES-576012',
        name: 'Festool TS 55 Plunge Cut Saw 1200W',
        market: 'DE',
        currentTier: 'HOLD',
        proposedTier: 'HOLD',
        monthlySpendEur: 3420,
        reasonCode: 'INV_STOCKOUT_48H'
      },
      {
        sku: 'MAK-7712',
        name: 'Makita DSP600Z Twin 18V Brushless Saw',
        market: 'DE',
        currentTier: 'GUARD_MEDIUM',
        proposedTier: 'GUARD_HIGH',
        monthlySpendEur: 2150,
        reasonCode: 'PO_DELAY_72H'
      },
      {
        sku: 'BOSCH-9921',
        name: 'Bosch Expert SDS Clean Drill Bit 12mm',
        market: 'DE',
        currentTier: 'GUARD_HIGH',
        proposedTier: 'HOLD',
        monthlySpendEur: 1890,
        reasonCode: 'MARGIN_EROSION_14D'
      }
    ]
  },
  {
    id: 'msg-3',
    sender: 'user',
    timestamp: '10:48 CET',
    query: 'Which products have strong ROAS but should not be suppressed despite low cover?',
    content: 'Which products have strong ROAS but should not be suppressed despite low cover?'
  },
  {
    id: 'msg-4',
    sender: 'assistant',
    timestamp: '10:48 CET',
    answerType: 'Recommendation',
    authorityLevel: 'A2 RECOMMEND',
    content:
      'Identified 6 high-velocity SKUs in DE & FR with ROAS > 4.5x where blanket suppression would harm net contribution. Instead of switching to HOLD, the deterministic policy engine recommends a Bounded Bid Moderation tier (GUARD_LOW) while inventory buffer clears.',
    bullets: [
      'DeWalt DCD996P2 Hammer Drill (ROAS: 5.4x, DOC: 3.2 days, Spend: €1,450/mo) — Inbound PO-8834 confirmed in transit arriving within 48h.',
      'Bosch GSB 18V-55 Combi Drill (ROAS: 4.8x, DOC: 3.8 days, Spend: €980/mo) — Safety stock exists in secondary Munich hub.',
      'Festool Domino DF 500 Joiner (ROAS: 6.2x, DOC: 2.9 days, Spend: €2,100/mo) — Margin buffer is 38.4%, easily absorbing air-freight expedited replenishment.'
    ],
    proposedAction: {
      actionType: 'prepare_review',
      label: 'Prepare Review: Create ROAS Exception Policy (Stage 6 SKUs in Review)',
      targetSkus: ['DEW-9912', 'BOSCH-GSB-55', 'FES-DF500'],
      tierTarget: 'GUARD_LOW',
      estimatedSavingsEur: 1850
    },
    provenance: {
      factsCount: 9,
      reasonCodes: ['HIGH_ROAS_EXCEPTION', 'CONFIRMED_IN_TRANSIT'],
      ledgerVersion: 'Decision Ledger v2.4.8-prod',
      provider: 'Google Gemini (Tenant Provider Policy · EU Residency)',
      model: 'gemini-1.5-pro-strict',
      acuConsumed: 16,
      citedLedgerEvents: ['#DL-8850', '#DL-8848']
    },
    evidenceFacts: [
      {
        id: 'fact-roas-1',
        label: 'ROAS Threshold',
        value: 'Min 4.5x target achieved (Avg 5.46x)',
        dataset: 'Google Ads Performance API',
        freshness: '4m ago',
        verified: true
      },
      {
        id: 'fact-roas-2',
        label: 'Inbound PO Verification',
        value: 'PO-8834 carrier scanned (DHL Freight)',
        dataset: 'Carrier Telemetry API',
        freshness: '18m ago',
        verified: true
      }
    ],
    affectedSkus: [
      {
        sku: 'DEW-9912',
        name: 'DeWalt DCD996P2 XR 18V Hammer Drill',
        market: 'DE',
        currentTier: 'GUARD_MEDIUM',
        proposedTier: 'GUARD_LOW',
        monthlySpendEur: 1450,
        reasonCode: 'HIGH_ROAS_EXCEPTION'
      },
      {
        sku: 'FES-DF500',
        name: 'Festool Domino DF 500 Q-Plus Joiner',
        market: 'FR',
        currentTier: 'GUARD_HIGH',
        proposedTier: 'GUARD_LOW',
        monthlySpendEur: 2100,
        reasonCode: 'CONFIRMED_IN_TRANSIT'
      }
    ]
  }
];

export const MOCK_AUTOMATIONS: AutomationItem[] = [
  {
    id: 'auto-1',
    name: 'Daily Feed Risk Review',
    description:
      'Every morning, identify Merchant issues affecting more than €5,000 Controlled Spend and prepare a risk notification for the commerce team.',
    status: 'Active',
    trigger: 'Schedule: Daily 06:00 CET',
    triggerType: 'schedule',
    scope: 'All Markets · Google Merchant API',
    authorityLevel: 'A2 RECOMMEND',
    isProtectedControl: false,
    approvalType: 'Standard Approval',
    requiresFourEyes: false,
    lastRunTime: 'Today 06:00 CET',
    lastRunOutcome: 'SUCCESS',
    successRate: 99.8,
    acuUsagePerRun: 14,
    monthlyAcuConsumed: 420,
    monthlyRunsCount: 30,
    monthlyRunsLimit: 30,
    nextRunTime: 'Tomorrow 06:00 CET',
    owner: 'Commerce Operations Lead',
    permittedTools: ['catalog.query', 'merchant_api.diagnostics', 'slack.notify'],
    maxToolCalls: 4,
    timeoutSeconds: 45,
    retryPolicy: 'Exponential backoff (3 attempts)'
  },
  {
    id: 'auto-2',
    name: 'Low Cover Investigation',
    description:
      'When ≥10 SKUs in one market fall below 4 days cover, inspect logistics telemetry and prepare an actionable risk review.',
    status: 'Active',
    trigger: 'Event: ≥10 SKUs DOC < 4.0d in market',
    triggerType: 'event',
    scope: 'Market DE · Munich Central Hub',
    authorityLevel: 'A3 PREPARE',
    isProtectedControl: false,
    approvalType: 'Standard Approval',
    requiresFourEyes: false,
    lastRunTime: 'Yesterday 14:22 CET',
    lastRunOutcome: 'SUCCESS',
    successRate: 100,
    acuUsagePerRun: 22,
    monthlyAcuConsumed: 660,
    monthlyRunsCount: 18,
    monthlyRunsLimit: 50,
    nextRunTime: 'Event-driven',
    owner: 'Risk Engineering',
    permittedTools: ['catalog.query', 'erp.inbound_lookup', 'review.stage_changes'],
    maxToolCalls: 6,
    timeoutSeconds: 60,
    retryPolicy: 'Linear retry (2 attempts)'
  },
  {
    id: 'auto-3',
    name: 'Publication Failure Triage',
    description:
      'Investigate failed Merchant verification events on supplemental data sources and prepare remediation steps.',
    status: 'Active',
    trigger: 'Event: Merchant Push Verification Failure',
    triggerType: 'event',
    scope: 'Google Merchant API · Supplemental data source',
    authorityLevel: 'A3 PREPARE',
    isProtectedControl: false,
    approvalType: 'Standard Approval',
    requiresFourEyes: false,
    lastRunTime: '2 days ago',
    lastRunOutcome: 'SUCCESS',
    successRate: 98.9,
    acuUsagePerRun: 18,
    monthlyAcuConsumed: 180,
    monthlyRunsCount: 6,
    monthlyRunsLimit: 40,
    nextRunTime: 'Event-driven',
    owner: 'Feed Integration Lead',
    permittedTools: ['merchant_api.inspect_errors', 'catalog.revalidate_schema'],
    maxToolCalls: 5,
    timeoutSeconds: 90,
    retryPolicy: 'Immediate single retry'
  },
  {
    id: 'auto-4',
    name: 'Negative Margin Protective Interlock',
    description:
      'Detect live ad spend exceeding €100/wk on products with negative contribution margin and immediately stage HOLD tier.',
    status: 'Active',
    trigger: 'Event: Margin < 0.0% & Ad Spend > €100/wk',
    triggerType: 'event',
    scope: 'All Connected Channels',
    authorityLevel: 'A5 PROTECTED CONTROL',
    isProtectedControl: true,
    approvalType: 'Four-Eyes Required',
    requiresFourEyes: true,
    lastRunTime: 'Today 08:14 CET',
    lastRunOutcome: 'AWAITING_FOUR_EYES',
    successRate: 100,
    acuUsagePerRun: 28,
    monthlyAcuConsumed: 840,
    monthlyRunsCount: 12,
    monthlyRunsLimit: 30,
    nextRunTime: 'Event-driven',
    owner: 'Finance & Risk Lead',
    permittedTools: ['catalog.query_margin', 'ledger.stage_hold_interlock'],
    maxToolCalls: 8,
    timeoutSeconds: 30,
    retryPolicy: 'Fail-safe pause on error'
  },
  {
    id: 'auto-5',
    name: 'Inbound PO Delay Buffer Adjuster',
    description:
      'When an inbound ERP purchase order delivery slips >72h, adjust the stockout safety buffer for impacted campaigns.',
    status: 'Paused',
    trigger: 'Event: SAP PO ETA shift > 72h',
    triggerType: 'event',
    scope: 'Market DE & NL',
    authorityLevel: 'A4 BOUNDED AUTO',
    isProtectedControl: true,
    approvalType: 'Protected Control Approval',
    requiresFourEyes: false,
    lastRunTime: 'Sep 10 11:20 CET',
    lastRunOutcome: 'SIMULATED',
    successRate: 99.2,
    acuUsagePerRun: 12,
    monthlyAcuConsumed: 240,
    monthlyRunsCount: 14,
    monthlyRunsLimit: 25,
    nextRunTime: 'Paused by operator',
    owner: 'Supply Chain Lead',
    permittedTools: ['erp.lookup_po', 'policy.adjust_buffer'],
    maxToolCalls: 4,
    timeoutSeconds: 40,
    retryPolicy: 'Exponential backoff (3 attempts)'
  },
  {
    id: 'auto-6',
    name: 'High ROAS Degradation Audit',
    description:
      'Weekly audit of top 20% revenue-generating SKUs experiencing >25% ROAS drop over a 7-day rolling window.',
    status: 'Active',
    trigger: 'Schedule: Weekly Mon 07:30 CET',
    triggerType: 'schedule',
    scope: 'All Markets · PMax Campaigns',
    authorityLevel: 'A2 RECOMMEND',
    isProtectedControl: false,
    approvalType: 'Standard Approval',
    requiresFourEyes: false,
    lastRunTime: 'Sep 11 07:30 CET',
    lastRunOutcome: 'SUCCESS',
    successRate: 100,
    acuUsagePerRun: 16,
    monthlyAcuConsumed: 64,
    monthlyRunsCount: 4,
    monthlyRunsLimit: 10,
    nextRunTime: 'Mon Sep 18 07:30 CET',
    owner: 'Performance Marketing Lead',
    permittedTools: ['google_ads.fetch_metrics', 'catalog.query_roas'],
    maxToolCalls: 6,
    timeoutSeconds: 60,
    retryPolicy: 'Linear retry (2 attempts)'
  }
];

export const MOCK_AUTOMATION_RUNS: AutomationRunLog[] = [
  {
    id: 'run-101',
    automationId: 'auto-4',
    timestamp: 'Today 08:14:22 CET',
    outcome: 'AWAITING_FOUR_EYES',
    toolsUsed: ['catalog.query_margin', 'ledger.stage_hold_interlock'],
    acuConsumed: 28,
    durationMs: 820,
    approver: 'Pending (H. Schmidt or F. Weber)',
    evidenceHash: 'sha256:7e129b...a812',
    summary: 'Staged 4 SKUs with -3.8% contribution margin. Spend at risk: €1,240/wk. Four-Eyes review requested.'
  },
  {
    id: 'run-102',
    automationId: 'auto-1',
    timestamp: 'Today 06:00:03 CET',
    outcome: 'SUCCESS',
    toolsUsed: ['catalog.query', 'merchant_api.diagnostics', 'slack.notify'],
    acuConsumed: 14,
    durationMs: 640,
    approver: 'Autonomous (A2 Rule)',
    evidenceHash: 'sha256:4a01cb...88fe',
    summary: 'Scanned 1,248 SKUs across 4 markets. 0 feed errors exceeding €5,000 threshold. Summary posted to #commerce-ops.'
  },
  {
    id: 'run-103',
    automationId: 'auto-2',
    timestamp: 'Yesterday 14:22:15 CET',
    outcome: 'SUCCESS',
    toolsUsed: ['catalog.query', 'erp.inbound_lookup', 'review.stage_changes'],
    acuConsumed: 22,
    durationMs: 1140,
    approver: 'Autonomous (A3 Rule)',
    evidenceHash: 'sha256:9f31da...11ab',
    summary: 'Detected 14 SKUs under 4d DOC in DE. Staged review package #REV-4402 for operator approval.'
  }
];

export const MOCK_AI_PROVIDERS: AIProviderStatus[] = [
  {
    id: 'prov-google',
    name: 'Google Gemini',
    enabled: true,
    health: 'Operational',
    eligibleModels: ['gemini-1.5-pro-strict', 'gemini-1.5-flash-fast'],
    p50LatencyMs: 210,
    p95LatencyMs: 580,
    errorRatePercent: 0.01,
    estimatedCostMonthUsd: 73.55,
    routingPriority: 1,
    circuitBreakerState: 'Closed (Armed)'
  },
  {
    id: 'prov-openai',
    name: 'OpenAI',
    enabled: true,
    health: 'Operational',
    eligibleModels: ['gpt-4o-2024-08-06', 'gpt-4o-mini'],
    p50LatencyMs: 340,
    p95LatencyMs: 920,
    errorRatePercent: 0.04,
    estimatedCostMonthUsd: 118.2,
    routingPriority: 2,
    circuitBreakerState: 'Closed (Armed)'
  },
  {
    id: 'prov-anthropic',
    name: 'Anthropic',
    enabled: true,
    health: 'Operational',
    eligibleModels: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku'],
    p50LatencyMs: 380,
    p95LatencyMs: 1120,
    errorRatePercent: 0.08,
    estimatedCostMonthUsd: 92.4,
    routingPriority: 3,
    circuitBreakerState: 'Closed (Armed)'
  }
];

export const MOCK_ROUTING_POLICIES: AIRoutingPolicyItem[] = [
  {
    id: 'route-1',
    featureName: 'Policy Copilot',
    primaryRoute: 'Google Gemini (gemini-1.5-pro-strict)',
    fallbackRoute: 'Anthropic (claude-3-5-sonnet-20241022)',
    tenantPolicy: 'Tenant provider policy · EU data residency',
    constraint: 'Latency < 1.2s · High Reasoning · Deterministic Grounding'
  },
  {
    id: 'route-2',
    featureName: 'Automations Triage',
    primaryRoute: 'OpenAI (gpt-4o-2024-08-06)',
    fallbackRoute: 'Google Gemini (gemini-1.5-flash-fast)',
    tenantPolicy: 'Provider eligibility · Strict JSON schema',
    constraint: 'Zero Mutation Enforced · Anti-Bypass Guard'
  },
  {
    id: 'route-3',
    featureName: 'Catalog Anomaly Triage (AI-assisted signal)',
    primaryRoute: 'Google Gemini (gemini-1.5-flash-fast)',
    fallbackRoute: 'OpenAI (gpt-4o-mini)',
    tenantPolicy: 'Provider eligibility · High throughput',
    constraint: 'Triage score only (Deterministic engine authoritative) · <5 ACU · p95 < 400ms'
  },
  {
    id: 'route-4',
    featureName: 'Feed Error Diagnostic Parser',
    primaryRoute: 'Google Gemini (gemini-1.5-flash-fast)',
    fallbackRoute: 'Anthropic (claude-3-5-haiku)',
    tenantPolicy: 'Tenant provider policy · Redacted telemetry',
    constraint: 'Schema Validation Strict · No PII'
  }
];

export const MOCK_PROMPT_REGISTRY: AIPromptRegistryItem[] = [
  {
    id: 'prompt-1',
    name: 'copilot_policy_explainer',
    activeVersion: 'v3.4.1',
    evalScorePercent: 99.8,
    lastPromoted: '2026-09-02 by @h-schmidt',
    owner: 'Governance & AI Engineering'
  },
  {
    id: 'prompt-2',
    name: 'feed_error_triage',
    activeVersion: 'v2.1.0',
    evalScorePercent: 100,
    lastPromoted: '2026-09-08 by @perf-lead',
    owner: 'Feed Integration Operations'
  },
  {
    id: 'prompt-3',
    name: 'margin_risk_investigator',
    activeVersion: 'v4.0.2',
    evalScorePercent: 99.5,
    lastPromoted: '2026-09-11 by @risk-eng',
    owner: 'Finance & Risk Engineering'
  },
  {
    id: 'prompt-4',
    name: 'low_cover_prioritizer',
    activeVersion: 'v1.8.4',
    evalScorePercent: 99.2,
    lastPromoted: '2026-08-28 by @supply-ops',
    owner: 'Supply Chain Analytics'
  }
];

export const MOCK_RELEASE_MANIFEST: AIReleaseManifest = {
  releaseTag: 'rel-2026-09-w38-causal',
  releaseHash: 'sha256:7f9b8c2d119e044fa9b84410cd99812a14e91024',
  modelStack: 'Gemini 1.5 Pro + Flash (Primary) · GPT-4o Fallback',
  routePolicy: 'v4.2-strict-causal',
  promptVersion: 'bundle-2026.09.12-prod',
  outputSchema: 'JSON-Schema-Draft-7 (Strict Typed)',
  toolManifest: 'plumb_governed_tools_v12 (Read-only + Staged Review)',
  safetyPolicy: 'Zero-Mutation Default · Anti-Bypass-v3 Enforced',
  acuRateCard: 'Standard Enterprise (1 ACU / 1K in, 3 ACU / 1K out)',
  evalResult: 'All 142 Benchmarks Passed (Latest eval result: 99.8% Grounding · 0 Bypass tolerated)',
  deployedAt: 'Sep 12, 2026 14:00 CET',
  isCurrentProduction: true
};

export const MOCK_LAST_KNOWN_GOOD_MANIFEST: AIReleaseManifest = {
  releaseTag: 'rel-2026-09-w37-stable',
  releaseHash: 'sha256:3a1b8c9d004e88ff6c721155ab778019ef441021',
  modelStack: 'Gemini 1.5 Pro + Flash',
  routePolicy: 'v4.1-strict',
  promptVersion: 'bundle-2026.09.05-prod',
  outputSchema: 'JSON-Schema-Draft-7 (Strict)',
  toolManifest: 'plumb_governed_tools_v11',
  safetyPolicy: 'Zero-Mutation Default',
  acuRateCard: 'Standard Enterprise',
  evalResult: 'All Benchmarks Passed',
  deployedAt: 'Sep 5, 2026 10:00 CET',
  isCurrentProduction: false
};

export const MOCK_ENTITLED_MODULES: PlanEntitlement[] = [
  { moduleName: 'Inventory Guard', included: true, details: 'Real-time DOC tracking & automated bid tier suppression' },
  { moduleName: 'Profit Guard', included: true, details: 'Contribution margin exposure & negative return guard' },
  { moduleName: 'Experiment & Measurement', included: true, details: 'Causal Geo-Switchback & DiD incrementality engine' },
  { moduleName: 'Feed Health', included: true, details: 'Google Merchant API · Supplemental data source dispatcher' },
  { moduleName: 'Price Guard', included: true, details: 'Competitor price parity & margin corridor protector' },
  { moduleName: 'Budget Guard', included: true, details: 'PMax portfolio spend pacing & runaway burn prevention' },
  { moduleName: 'Agency Command Center', included: true, details: 'Multi-store client overview & consolidated governance' },
  { moduleName: 'Traffic Quality Integrations', included: true, details: 'Invalid traffic & bot click suppression interlock' }
];

export const MOCK_OPERATIONAL_LIMITS: OperationalLimit[] = [
  { label: 'Connected Storefronts', current: 4, limit: 10, unit: 'Stores', warningThresholdPercent: 80 },
  { label: 'Active Markets', current: 4, limit: 8, unit: 'Markets (DE, FR, NL, UK)', warningThresholdPercent: 80 },
  { label: 'Controlled Spend Tier', current: 284500, limit: 500000, unit: '€/month', warningThresholdPercent: 80 },
  { label: 'Active User Seats', current: 12, limit: 25, unit: 'Seats', warningThresholdPercent: 80 },
  { label: 'AI Monthly ACU Budget', current: 18420, limit: 25000, unit: 'ACU / month', warningThresholdPercent: 70 },
  { label: 'Max ACU per Request', current: 28, limit: 50, unit: 'ACU ceiling', warningThresholdPercent: 80 },
  { label: 'Active Automations', current: 6, limit: 20, unit: 'Workflows', warningThresholdPercent: 75 },
  { label: 'Concurrent AI Runs', current: 2, limit: 10, unit: 'Runs', warningThresholdPercent: 70 }
];

export const MOCK_INVOICES = [
  { id: 'INV-2026-09', date: 'Sep 01, 2026', period: 'Sep 2026', amountEur: 4500, status: 'Paid', method: 'Mastercard •• 4242' },
  { id: 'INV-2026-08', date: 'Aug 01, 2026', period: 'Aug 2026', amountEur: 4500, status: 'Paid', method: 'Mastercard •• 4242' },
  { id: 'INV-2026-07', date: 'Jul 01, 2026', period: 'Jul 2026', amountEur: 4500, status: 'Paid', method: 'Mastercard •• 4242' },
  { id: 'INV-2026-06', date: 'Jun 01, 2026', period: 'Jun 2026', amountEur: 4500, status: 'Paid', method: 'Mastercard •• 4242' }
];

export const MOCK_BYOK_CREDENTIALS: BYOKCredentialStatus[] = [
  {
    provider: 'Google Cloud Vertex AI',
    status: 'Configured',
    validationStatus: 'Valid',
    lastVerified: '2026-09-14 18:22 CET',
    secretRotationRequired: false,
    secretRotationDue: 'In 48 days'
  },
  {
    provider: 'OpenAI Direct Tenant Endpoint',
    status: 'Configured',
    validationStatus: 'Valid',
    lastVerified: '2026-09-14 18:20 CET',
    secretRotationRequired: false,
    secretRotationDue: 'In 52 days'
  },
  {
    provider: 'Anthropic Bedrock Gateway',
    status: 'Not configured',
    validationStatus: 'Pending verification',
    lastVerified: 'Never',
    secretRotationRequired: false
  }
];

