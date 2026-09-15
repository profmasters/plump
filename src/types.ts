export type MarketCode = 'DE' | 'FR' | 'NL' | 'UK';

export type OperatingMode = 'Observe' | 'Recommend' | 'Control (Active)';

export type TierType = 'HOLD' | 'GUARD_HIGH' | 'GUARD_MEDIUM' | 'GUARD_LOW' | 'NORMAL';

export interface ProductDecisionItem {
  id: string;
  sku: string;
  gtin: string;
  name: string;
  category: string;
  brand: string;
  market: MarketCode;
  doc: number; // Days of Cover
  atsUnits: number; // Available to sell units
  inboundUnits: number;
  inboundNote?: string;
  contributionMarginEur: number;
  marginPercent: number;
  adSpendEur: number;
  roas: number;
  roasNote?: string;
  confidence: number;
  currentTier: TierType;
  proposedTier: TierType;
  reasonCode: string;
  reasonDescription: string;
  imageUrl: string;
  hubLocation: string;
  ruleCode: string;
  affectedCampaignsCount: number;
  estimatedMonthlySavingsEur: number;
}

export interface RiskItem {
  sku: string;
  productName: string;
  market: MarketCode;
  exposureEur: number;
  reasonCode: string;
  actionTaken: TierType;
}

export interface GuardModule {
  id: string;
  name: string;
  subtitle: string;
  status: 'Active' | 'Monitoring' | 'Paused';
  dotColor: 'emerald' | 'amber' | 'rose' | 'slate';
}

export interface MarketHealthItem {
  code: MarketCode;
  name: string;
  platform: string;
  monthlySpendEur: number;
  syncStatus: string;
  syncPercent: number;
  syncedAgo?: string;
  warnings?: number;
}

export interface InterventionEvent {
  id: string;
  timeCet: string;
  source: 'Engine' | 'AI Copilot' | 'Batch' | 'Manual';
  target: string;
  tierChange: string;
  reason: string;
  executor: string;
  badgeType: 'engine' | 'ai' | 'batch' | 'manual';
}

export interface ProposedChange {
  id: string;
  sku: string;
  productName: string;
  market: MarketCode;
  currentTier: TierType;
  proposedTier: TierType;
  reasonCode: string;
  monthlySpendEur: number;
  projectedSavingsEur: number;
  status: 'pending' | 'approved' | 'rejected';
  adCampaign: string;
  imageUrl: string;
}

export type AIAuthorityLevel =
  | 'A0 OFF'
  | 'A1 ASSIST'
  | 'A2 RECOMMEND'
  | 'A3 PREPARE'
  | 'A4 BOUNDED AUTO'
  | 'A5 PROTECTED CONTROL';

export interface CopilotSourceFact {
  id: string;
  label: string;
  value: string;
  dataset: string;
  freshness: string;
  verified: boolean;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  query?: string;
  answerType?: 'Analysis' | 'Recommendation' | 'Draft Action';
  authorityLevel?: AIAuthorityLevel;
  content?: string;
  bullets?: string[];
  proposedAction?: {
    actionType: 'prepare_review' | 'simulate_policy' | 'inspect_sku';
    label: string;
    targetSkus: string[];
    tierTarget?: TierType;
    estimatedSavingsEur?: number;
  };
  provenance?: {
    factsCount: number;
    reasonCodes: string[];
    ledgerVersion: string;
    provider: string;
    model: string;
    acuConsumed: number;
    citedLedgerEvents: string[];
  };
  evidenceFacts?: CopilotSourceFact[];
  affectedSkus?: {
    sku: string;
    name: string;
    market: MarketCode;
    currentTier: TierType;
    proposedTier: TierType;
    monthlySpendEur: number;
    reasonCode: string;
  }[];
}

export interface AutomationItem {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Budget Exhausted' | 'Awaiting Approval' | 'Kill-switched' | 'Failed';
  trigger: string;
  triggerType: 'schedule' | 'event';
  scope: string;
  authorityLevel: AIAuthorityLevel;
  isProtectedControl: boolean;
  approvalType?: 'Standard Approval' | 'Protected Control Approval' | 'Four-Eyes Required';
  requiresFourEyes: boolean;
  lastRunTime: string;
  lastRunOutcome: 'SUCCESS' | 'AWAITING_FOUR_EYES' | 'SIMULATED' | 'FAILED' | 'SKIPPED';
  successRate: number;
  acuUsagePerRun: number;
  monthlyAcuConsumed: number;
  monthlyRunsCount: number;
  monthlyRunsLimit: number;
  nextRunTime: string;
  owner: string;
  permittedTools: string[];
  maxToolCalls: number;
  timeoutSeconds: number;
  retryPolicy: string;
}

export interface AutomationRunLog {
  id: string;
  automationId: string;
  timestamp: string;
  outcome: 'SUCCESS' | 'AWAITING_FOUR_EYES' | 'SIMULATED' | 'FAILED';
  toolsUsed: string[];
  acuConsumed: number;
  durationMs: number;
  approver?: string;
  evidenceHash: string;
  summary: string;
}

export interface AIProviderStatus {
  id: string;
  name: 'OpenAI' | 'Anthropic' | 'Google Gemini';
  enabled: boolean;
  health: 'Operational' | 'Degraded' | 'Circuit Open';
  eligibleModels: string[];
  p50LatencyMs: number;
  p95LatencyMs: number;
  errorRatePercent: number;
  estimatedCostMonthUsd: number;
  routingPriority: number;
  circuitBreakerState: 'Closed (Armed)' | 'Half-Open' | 'Tripped (Isolated)';
}

export interface AIRoutingPolicyItem {
  id: string;
  featureName: string;
  primaryRoute: string;
  fallbackRoute: string;
  tenantPolicy: string;
  constraint: string;
}

export interface AIPromptRegistryItem {
  id: string;
  name: string;
  activeVersion: string;
  evalScorePercent: number;
  lastPromoted: string;
  owner: string;
}

export interface AIReleaseManifest {
  releaseTag: string;
  releaseHash: string;
  modelStack: string;
  routePolicy: string;
  promptVersion: string;
  outputSchema: string;
  toolManifest: string;
  safetyPolicy: string;
  acuRateCard: string;
  evalResult: string;
  deployedAt: string;
  isCurrentProduction: boolean;
}

export interface PlanEntitlement {
  moduleName: string;
  included: boolean;
  details: string;
}

export interface OperationalLimit {
  label: string;
  current: number;
  limit: number;
  unit: string;
  warningThresholdPercent: number;
  isRestricted?: boolean;
}

export interface BYOKCredentialStatus {
  provider: string;
  status: 'Configured' | 'Not configured';
  validationStatus: 'Valid' | 'Invalid' | 'Pending verification';
  lastVerified: string;
  secretRotationRequired: boolean;
  secretRotationDue?: string;
}

