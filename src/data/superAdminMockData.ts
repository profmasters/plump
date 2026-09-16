// ============================================================================
// PLUMB SUPER ADMIN — ENTERPRISE INFRASTRUCTURE & PLATFORM DATA
// ============================================================================

export type SuperAdminViewType =
  | 'platform-overview'
  | 'tenants'
  | 'tenant-operations'
  | 'plan-builder'
  | 'connector-fleet'
  | 'merchant-publication-ops'
  | 'ai-platform-ops'
  | 'billing-ops'
  | 'incident-center'
  | 'audit-security';

export interface PlatformMetric {
  label: string;
  value: string;
  subtext: string;
  change?: string;
  status: 'nominal' | 'warning' | 'critical';
}

export interface PlatformTenantItem {
  id: string;
  name: string;
  slug: string;
  region: 'EU-CENTRAL (Frankfurt)' | 'EU-WEST (Amsterdam)' | 'UK-SOUTH (London)' | 'US-EAST (N. Virginia)';
  commerceStack: string;
  planDisplayName: string;
  planVersion: string; // e.g. "ENT-CONTROL-v7"
  entitlementVersion: string; // e.g. "ENT-REV-2026-08"
  operatingMode: 'Control (Active)' | 'Recommend' | 'Observe';
  controlledSpendEur: number;
  controllableSpendEur: number;
  atRiskSpendEur: number;
  marketCount: number;
  markets: string[];
  connectorHealth: 'Healthy' | 'Degraded' | 'Incident';
  merchantHealth: 'Verified' | 'Pending Verification' | 'Wiring Mismatch';
  aiStatus: 'Nominal' | 'Throttled' | 'Circuit Open';
  billingState: 'Active / Paid' | 'Grace Period (3d)' | 'Enterprise Invoiced';
  riskScore: 'Low' | 'Moderate' | 'Elevated';
  lastActivity: string;
  supportAccessAllowed: boolean;
  contactEmail: string;
}

export interface TenantOperationDetail {
  tenant: PlatformTenantItem;
  feedLastPush: string;
  supplementalFeedId: string;
  googleAdsAccountId: string;
  activePoliciesCount: number;
  fourEyesThresholdEur: number;
  byokStatus: 'Plumb Managed Cloud HSM' | 'Customer Key Vault (AWS KMS)' | 'None';
  recentIncidents: {
    id: string;
    title: string;
    severity: 'P1' | 'P2' | 'P3';
    status: 'Resolved' | 'Monitoring' | 'Active';
    timestamp: string;
  }[];
  auditSnapshot: {
    id: string;
    action: string;
    actor: string;
    timestamp: string;
  }[];
}

export interface CanonicalPlanVersion {
  id: string;
  displayName: string; // Display Plan Name, e.g. "Enterprise Control"
  planVersion: string; // Immutable Version, e.g. "ENT-CONTROL-v7"
  status: 'Draft' | 'Validating' | 'Published' | 'Superseded';
  releaseDate: string;
  activeTenantsCount: number;
  operationalLimits: {
    maxControlledSpendEur: number;
    maxSkuCatalog: number;
    maxMarkets: number;
    maxOperators: number;
    maxAutomations: number;
  };
  entitlements: {
    inventoryGuard: boolean;
    profitGuard: boolean;
    priceGuard: boolean;
    experimentationCausal: boolean;
    merchantSupplementalPush: boolean;
    fourEyesGovernance: boolean;
    auditChainingSha256: boolean;
    byokCustomHsm: boolean;
  };
  aiLimits: {
    monthlyAcuBudget: number;
    authorityCeiling: 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5';
    allowedProviders: string[];
    finOpsCircuitBreakerEur: number;
  };
  supersededBy?: string;
}

export interface ConnectorFleetItem {
  id: string;
  provider: 'Adobe Commerce / Magento' | 'SAP S/4HANA' | 'Shopify Plus' | 'commercetools' | 'Akeneo PIM';
  connectorType: 'Bi-directional ERP' | 'Storefront Catalog' | 'Order & Inventory Stream';
  affectedTenantsCount: number;
  healthyCount: number;
  degradedCount: number;
  failedCount: number;
  authFailures24h: number;
  p95LatencyMs: number;
  rateLimitPressurePercent: number;
  lastIncidentTimestamp: string;
  status: 'Operational' | 'Warning' | 'Disrupted';
}

export interface MerchantPublicationJob {
  id: string;
  tenantName: string;
  market: string;
  batchId: string;
  productsAffectedCount: number;
  controlledSpendEur: number;
  lifecycleStage: 'Prepared' | 'Published' | 'Merchant Processing' | 'Processed Value Verified' | 'Wiring Verified';
  httpStatus: number;
  verificationLatencySec: number;
  wiringCompatible: boolean;
  rollbackReadiness: 'Instant (Signed LKG)' | 'Cold Reseed' | 'Manual Required';
  timestamp: string;
}

export interface AIProviderFleetItem {
  providerId: string;
  providerName: 'Google Gemini' | 'Anthropic' | 'OpenAI' | 'Private Bedrock Endpoint';
  models: {
    id: string;
    name: string;
    tier: 'Primary Production' | 'Fallback Secondary' | 'Offline Evaluator';
    p95LatencyMs: number;
    availabilityPercent: number;
    errorRatePercent: number;
    currentMonthlyCostEur: number;
    monthlyCostBudgetEur: number;
    isCircuitBreakerTripped: boolean;
  }[];
  activeRouteWeightPercent: number;
  lastKnownGoodRelease: string;
  currentEvalScore: number; // e.g. 99.4%
}

export interface BillingTenantRow {
  id: string;
  tenantName: string;
  stripeCustomerId: string;
  planDisplayName: string;
  planVersion: string;
  billingState: 'Active / Paid' | 'Payment Due' | 'Grace Period (3d remaining)' | 'Manual Enterprise Wire';
  invoiceState: 'Paid (Current)' | 'Draft' | 'Past Due';
  paymentMethodMasked: string; // e.g. "SEPA Direct Debit •••• 9104"
  configuredGracePolicy: 'Strict 72h Suspension' | '14-Day Enterprise Grace' | 'Manual Executive Override';
  entitlementState: 'Full Operational' | 'Read-Only Warning' | 'Provisioning Frozen';
  contractType: 'Annual Committed Enterprise' | 'Quarterly Flexible' | 'Multi-Year Master Services';
  monthlyContractValueEur: number;
  renewalDate: string;
}

export interface PlatformIncident {
  id: string;
  incidentType: 'Merchant' | 'Ads Wiring' | 'Connector' | 'Data' | 'AI Provider' | 'Automation' | 'Billing' | 'Security';
  severity: 'P1 - Critical Outage' | 'P2 - Degraded Control' | 'P3 - Minor Telemetry Latency';
  status: 'Active Investigation' | 'Mitigating' | 'Monitoring' | 'Resolved';
  startedAt: string;
  affectedTenantsCount: number;
  affectedTenantsList: string[];
  financialExposureEur: number;
  owner: string;
  mitigation: string;
  currentEvidence: string;
  circuitBreakerTripped: boolean;
}

export interface PlatformAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  adminAction: string;
  affectedTenant: string;
  privilegeScope: 'PLATFORM_SUPER_ADMIN' | 'SUPPORT_SESSION_ELEVATED' | 'BILLING_FINOPS_WRITE' | 'CIRCUIT_BREAK_OVERRIDE';
  supportSessionId?: string;
  correlationId: string;
  reason: string;
  hashSha256: string;
  evidence: string;
}

// ============================================================================
// MOCK DATA ARRAYS
// ============================================================================

export const PLATFORM_METRICS: PlatformMetric[] = [
  {
    label: 'Controlled Spend Across Tenants',
    value: '€14.8M',
    subtext: '48 active enterprise tenants',
    change: '+12.4% MoM',
    status: 'nominal',
  },
  {
    label: 'Publication Success Rate',
    value: '99.982%',
    subtext: 'Google Merchant API · Supplemental',
    change: 'Zero false approvals',
    status: 'nominal',
  },
  {
    label: 'Active Incident Exposure',
    value: '€24,800',
    subtext: '1 tenant in P2 Ads wiring check',
    status: 'warning',
  },
  {
    label: 'Platform AI FinOps Burn',
    value: '€18,420',
    subtext: '62.4% of €29,500 fleet budget',
    change: 'Run-rate stable',
    status: 'nominal',
  },
];

export const PLATFORM_TENANTS: PlatformTenantItem[] = [
  {
    id: 'ten-001',
    name: 'Nordic Tech Retailer AB',
    slug: 'nordic-tech',
    region: 'EU-CENTRAL (Frankfurt)',
    commerceStack: 'Adobe Commerce + SAP S/4HANA',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v7',
    entitlementVersion: 'ENT-REV-2026-08',
    operatingMode: 'Control (Active)',
    controlledSpendEur: 284500,
    controllableSpendEur: 312000,
    atRiskSpendEur: 18420,
    marketCount: 4,
    markets: ['DE', 'FR', 'NL', 'UK'],
    connectorHealth: 'Healthy',
    merchantHealth: 'Verified',
    aiStatus: 'Nominal',
    billingState: 'Active / Paid',
    riskScore: 'Low',
    lastActivity: '12s ago · Merchant batch #88219 verified',
    supportAccessAllowed: true,
    contactEmail: 'h.schmidt@nordictech.se',
  },
  {
    id: 'ten-002',
    name: 'Alpen Direct Sports AG',
    slug: 'alpen-sports',
    region: 'EU-CENTRAL (Frankfurt)',
    commerceStack: 'Shopify Plus + Microsoft Dynamics 365',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v7',
    entitlementVersion: 'ENT-REV-2026-08',
    operatingMode: 'Control (Active)',
    controlledSpendEur: 520000,
    controllableSpendEur: 580000,
    atRiskSpendEur: 42100,
    marketCount: 6,
    markets: ['DE', 'AT', 'CH', 'IT', 'FR', 'UK'],
    connectorHealth: 'Healthy',
    merchantHealth: 'Verified',
    aiStatus: 'Nominal',
    billingState: 'Active / Paid',
    riskScore: 'Low',
    lastActivity: '45s ago · Stockout guard triggered (6 SKUs)',
    supportAccessAllowed: true,
    contactEmail: 'ops@alpensports.ch',
  },
  {
    id: 'ten-003',
    name: 'Iberia Maison & Jardin SL',
    slug: 'iberia-maison',
    region: 'EU-WEST (Amsterdam)',
    commerceStack: 'commercetools + SAP S/4HANA Cloud',
    planDisplayName: 'Performance Core',
    planVersion: 'PERF-CORE-v5',
    entitlementVersion: 'CORE-REV-2026-05',
    operatingMode: 'Recommend',
    controlledSpendEur: 164000,
    controllableSpendEur: 198000,
    atRiskSpendEur: 31800,
    marketCount: 3,
    markets: ['ES', 'PT', 'FR'],
    connectorHealth: 'Degraded',
    merchantHealth: 'Pending Verification',
    aiStatus: 'Nominal',
    billingState: 'Grace Period (3d)',
    riskScore: 'Moderate',
    lastActivity: '3m ago · Connector latency P95 > 2400ms',
    supportAccessAllowed: false,
    contactEmail: 'ad-ops@iberiamaison.es',
  },
  {
    id: 'ten-004',
    name: 'Benelux Horeca Supplies BV',
    slug: 'benelux-horeca',
    region: 'EU-WEST (Amsterdam)',
    commerceStack: 'Magento 2.4 Enterprise + Infor M3',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v7',
    entitlementVersion: 'ENT-REV-2026-08',
    operatingMode: 'Control (Active)',
    controlledSpendEur: 410000,
    controllableSpendEur: 440000,
    atRiskSpendEur: 14200,
    marketCount: 3,
    markets: ['NL', 'BE', 'DE'],
    connectorHealth: 'Healthy',
    merchantHealth: 'Verified',
    aiStatus: 'Nominal',
    billingState: 'Enterprise Invoiced',
    riskScore: 'Low',
    lastActivity: '1m ago · Margin floor interlock auto-applied',
    supportAccessAllowed: true,
    contactEmail: 'procurement@beneluxhoreca.nl',
  },
  {
    id: 'ten-005',
    name: 'Caledonian Toolworks Ltd',
    slug: 'caledonian-tools',
    region: 'UK-SOUTH (London)',
    commerceStack: 'Shopify Plus + NetSuite OneWorld',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v6',
    entitlementVersion: 'ENT-REV-2026-02',
    operatingMode: 'Observe',
    controlledSpendEur: 92000,
    controllableSpendEur: 230000,
    atRiskSpendEur: 48900,
    marketCount: 2,
    markets: ['UK', 'IE'],
    connectorHealth: 'Healthy',
    merchantHealth: 'Wiring Mismatch',
    aiStatus: 'Throttled',
    billingState: 'Active / Paid',
    riskScore: 'Elevated',
    lastActivity: '8m ago · Google Ads custom_label_2 mismatch detected',
    supportAccessAllowed: true,
    contactEmail: 'digital@caledoniantools.co.uk',
  },
];

export const CANONICAL_PLAN_VERSIONS: CanonicalPlanVersion[] = [
  {
    id: 'plan-v7',
    displayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v7',
    status: 'Published',
    releaseDate: '2026-06-15',
    activeTenantsCount: 34,
    operationalLimits: {
      maxControlledSpendEur: 1000000,
      maxSkuCatalog: 250000,
      maxMarkets: 12,
      maxOperators: 25,
      maxAutomations: 50,
    },
    entitlements: {
      inventoryGuard: true,
      profitGuard: true,
      priceGuard: true,
      experimentationCausal: true,
      merchantSupplementalPush: true,
      fourEyesGovernance: true,
      auditChainingSha256: true,
      byokCustomHsm: true,
    },
    aiLimits: {
      monthlyAcuBudget: 150000,
      authorityCeiling: 'A5',
      allowedProviders: ['Google Gemini Pro', 'Anthropic Claude Sonnet', 'OpenAI GPT-4o'],
      finOpsCircuitBreakerEur: 1500,
    },
  },
  {
    id: 'plan-v8-draft',
    displayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v8',
    status: 'Validating',
    releaseDate: '2026-10-01 (Planned)',
    activeTenantsCount: 0,
    operationalLimits: {
      maxControlledSpendEur: 2500000,
      maxSkuCatalog: 500000,
      maxMarkets: 20,
      maxOperators: 50,
      maxAutomations: 100,
    },
    entitlements: {
      inventoryGuard: true,
      profitGuard: true,
      priceGuard: true,
      experimentationCausal: true,
      merchantSupplementalPush: true,
      fourEyesGovernance: true,
      auditChainingSha256: true,
      byokCustomHsm: true,
    },
    aiLimits: {
      monthlyAcuBudget: 300000,
      authorityCeiling: 'A5',
      allowedProviders: ['Google Gemini Pro', 'Anthropic Claude Sonnet', 'OpenAI GPT-4o'],
      finOpsCircuitBreakerEur: 3000,
    },
  },
  {
    id: 'plan-v6-sup',
    displayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v6',
    status: 'Superseded',
    releaseDate: '2025-11-20',
    activeTenantsCount: 4,
    operationalLimits: {
      maxControlledSpendEur: 500000,
      maxSkuCatalog: 100000,
      maxMarkets: 8,
      maxOperators: 15,
      maxAutomations: 25,
    },
    entitlements: {
      inventoryGuard: true,
      profitGuard: true,
      priceGuard: true,
      experimentationCausal: false,
      merchantSupplementalPush: true,
      fourEyesGovernance: true,
      auditChainingSha256: true,
      byokCustomHsm: false,
    },
    aiLimits: {
      monthlyAcuBudget: 75000,
      authorityCeiling: 'A4',
      allowedProviders: ['Anthropic Claude Sonnet', 'OpenAI GPT-4o'],
      finOpsCircuitBreakerEur: 800,
    },
    supersededBy: 'ENT-CONTROL-v7',
  },
  {
    id: 'plan-perf-v5',
    displayName: 'Performance Core',
    planVersion: 'PERF-CORE-v5',
    status: 'Published',
    releaseDate: '2026-03-10',
    activeTenantsCount: 10,
    operationalLimits: {
      maxControlledSpendEur: 250000,
      maxSkuCatalog: 50000,
      maxMarkets: 4,
      maxOperators: 5,
      maxAutomations: 10,
    },
    entitlements: {
      inventoryGuard: true,
      profitGuard: true,
      priceGuard: false,
      experimentationCausal: false,
      merchantSupplementalPush: true,
      fourEyesGovernance: false,
      auditChainingSha256: true,
      byokCustomHsm: false,
    },
    aiLimits: {
      monthlyAcuBudget: 35000,
      authorityCeiling: 'A2',
      allowedProviders: ['Google Gemini Flash'],
      finOpsCircuitBreakerEur: 300,
    },
  },
];

export const CONNECTOR_FLEET_DATA: ConnectorFleetItem[] = [
  {
    id: 'conn-f-01',
    provider: 'Adobe Commerce / Magento',
    connectorType: 'Storefront Catalog',
    affectedTenantsCount: 22,
    healthyCount: 21,
    degradedCount: 1,
    failedCount: 0,
    authFailures24h: 0,
    p95LatencyMs: 340,
    rateLimitPressurePercent: 24,
    lastIncidentTimestamp: '2026-09-02T14:10:00Z',
    status: 'Operational',
  },
  {
    id: 'conn-f-02',
    provider: 'SAP S/4HANA',
    connectorType: 'Bi-directional ERP',
    affectedTenantsCount: 18,
    healthyCount: 18,
    degradedCount: 0,
    failedCount: 0,
    authFailures24h: 0,
    p95LatencyMs: 620,
    rateLimitPressurePercent: 38,
    lastIncidentTimestamp: '2026-08-14T09:30:00Z',
    status: 'Operational',
  },
  {
    id: 'conn-f-03',
    provider: 'Shopify Plus',
    connectorType: 'Storefront Catalog',
    affectedTenantsCount: 12,
    healthyCount: 12,
    degradedCount: 0,
    failedCount: 0,
    authFailures24h: 0,
    p95LatencyMs: 180,
    rateLimitPressurePercent: 12,
    lastIncidentTimestamp: 'None recorded',
    status: 'Operational',
  },
  {
    id: 'conn-f-04',
    provider: 'commercetools',
    connectorType: 'Order & Inventory Stream',
    affectedTenantsCount: 6,
    healthyCount: 5,
    degradedCount: 1,
    failedCount: 0,
    authFailures24h: 2,
    p95LatencyMs: 1850,
    rateLimitPressurePercent: 78,
    lastIncidentTimestamp: '2026-09-15T08:20:00Z',
    status: 'Warning',
  },
];

export const MERCHANT_PUBLICATION_JOBS: MerchantPublicationJob[] = [
  {
    id: 'pub-job-901',
    tenantName: 'Nordic Tech Retailer AB',
    market: 'DE',
    batchId: 'BATCH-20260915-081',
    productsAffectedCount: 36,
    controlledSpendEur: 18420,
    lifecycleStage: 'Processed Value Verified',
    httpStatus: 200,
    verificationLatencySec: 4.2,
    wiringCompatible: true,
    rollbackReadiness: 'Instant (Signed LKG)',
    timestamp: '2m ago',
  },
  {
    id: 'pub-job-902',
    tenantName: 'Alpen Direct Sports AG',
    market: 'AT',
    batchId: 'BATCH-20260915-080',
    productsAffectedCount: 12,
    controlledSpendEur: 9600,
    lifecycleStage: 'Wiring Verified',
    httpStatus: 200,
    verificationLatencySec: 3.8,
    wiringCompatible: true,
    rollbackReadiness: 'Instant (Signed LKG)',
    timestamp: '5m ago',
  },
  {
    id: 'pub-job-903',
    tenantName: 'Caledonian Toolworks Ltd',
    market: 'UK',
    batchId: 'BATCH-20260915-079',
    productsAffectedCount: 8,
    controlledSpendEur: 6200,
    lifecycleStage: 'Merchant Processing',
    httpStatus: 200,
    verificationLatencySec: 18.4,
    wiringCompatible: false, // Wiring issue
    rollbackReadiness: 'Instant (Signed LKG)',
    timestamp: '14m ago',
  },
  {
    id: 'pub-job-904',
    tenantName: 'Iberia Maison & Jardin SL',
    market: 'ES',
    batchId: 'BATCH-20260915-078',
    productsAffectedCount: 22,
    controlledSpendEur: 14500,
    lifecycleStage: 'Prepared',
    httpStatus: 202,
    verificationLatencySec: 0,
    wiringCompatible: true,
    rollbackReadiness: 'Instant (Signed LKG)',
    timestamp: '22m ago',
  },
];

export const AI_PROVIDER_FLEET: AIProviderFleetItem[] = [
  {
    providerId: 'prov-gemini',
    providerName: 'Google Gemini',
    activeRouteWeightPercent: 65,
    lastKnownGoodRelease: 'v2026.09.12-rc4',
    currentEvalScore: 99.6,
    models: [
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        tier: 'Primary Production',
        p95LatencyMs: 680,
        availabilityPercent: 99.98,
        errorRatePercent: 0.02,
        currentMonthlyCostEur: 8200,
        monthlyCostBudgetEur: 14000,
        isCircuitBreakerTripped: false,
      },
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        tier: 'Fallback Secondary',
        p95LatencyMs: 220,
        availabilityPercent: 99.99,
        errorRatePercent: 0.01,
        currentMonthlyCostEur: 2400,
        monthlyCostBudgetEur: 4500,
        isCircuitBreakerTripped: false,
      },
    ],
  },
  {
    providerId: 'prov-anthropic',
    providerName: 'Anthropic',
    activeRouteWeightPercent: 25,
    lastKnownGoodRelease: 'v2026.09.10-p2',
    currentEvalScore: 99.2,
    models: [
      {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        tier: 'Primary Production',
        p95LatencyMs: 890,
        availabilityPercent: 99.94,
        errorRatePercent: 0.05,
        currentMonthlyCostEur: 5400,
        monthlyCostBudgetEur: 7500,
        isCircuitBreakerTripped: false,
      },
    ],
  },
  {
    providerId: 'prov-openai',
    providerName: 'OpenAI',
    activeRouteWeightPercent: 10,
    lastKnownGoodRelease: 'v2026.08.30',
    currentEvalScore: 98.8,
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        tier: 'Fallback Secondary',
        p95LatencyMs: 940,
        availabilityPercent: 99.89,
        errorRatePercent: 0.11,
        currentMonthlyCostEur: 2420,
        monthlyCostBudgetEur: 3500,
        isCircuitBreakerTripped: false,
      },
    ],
  },
];

export const BILLING_OPERATIONS_DATA: BillingTenantRow[] = [
  {
    id: 'bill-01',
    tenantName: 'Nordic Tech Retailer AB',
    stripeCustomerId: 'cus_NrdTech_9410A',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v7',
    billingState: 'Active / Paid',
    invoiceState: 'Paid (Current)',
    paymentMethodMasked: 'SEPA Direct Debit •••• 9104',
    configuredGracePolicy: '14-Day Enterprise Grace',
    entitlementState: 'Full Operational',
    contractType: 'Annual Committed Enterprise',
    monthlyContractValueEur: 4500,
    renewalDate: '2027-04-30',
  },
  {
    id: 'bill-02',
    tenantName: 'Alpen Direct Sports AG',
    stripeCustomerId: 'cus_Alpen_8812B',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v7',
    billingState: 'Active / Paid',
    invoiceState: 'Paid (Current)',
    paymentMethodMasked: 'Mastercard •••• 4410',
    configuredGracePolicy: '14-Day Enterprise Grace',
    entitlementState: 'Full Operational',
    contractType: 'Multi-Year Master Services',
    monthlyContractValueEur: 6800,
    renewalDate: '2028-01-15',
  },
  {
    id: 'bill-03',
    tenantName: 'Iberia Maison & Jardin SL',
    stripeCustomerId: 'cus_Iberia_2299C',
    planDisplayName: 'Performance Core',
    planVersion: 'PERF-CORE-v5',
    billingState: 'Grace Period (3d remaining)',
    invoiceState: 'Past Due',
    paymentMethodMasked: 'Visa Corporate •••• 1089',
    configuredGracePolicy: 'Strict 72h Suspension',
    entitlementState: 'Read-Only Warning',
    contractType: 'Quarterly Flexible',
    monthlyContractValueEur: 1800,
    renewalDate: '2026-09-30',
  },
  {
    id: 'bill-04',
    tenantName: 'Benelux Horeca Supplies BV',
    stripeCustomerId: 'cus_Bnlx_3341E',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v7',
    billingState: 'Manual Enterprise Wire',
    invoiceState: 'Paid (Current)',
    paymentMethodMasked: 'ACH / Wire Transfer (Direct ERP)',
    configuredGracePolicy: '14-Day Enterprise Grace',
    entitlementState: 'Full Operational',
    contractType: 'Annual Committed Enterprise',
    monthlyContractValueEur: 5200,
    renewalDate: '2027-07-01',
  },
  {
    id: 'bill-05',
    tenantName: 'Caledonian Toolworks Ltd',
    stripeCustomerId: 'cus_Caledon_7721F',
    planDisplayName: 'Enterprise Control',
    planVersion: 'ENT-CONTROL-v6',
    billingState: 'Active / Paid',
    invoiceState: 'Paid (Current)',
    paymentMethodMasked: 'American Express •••• 2011',
    configuredGracePolicy: '14-Day Enterprise Grace',
    entitlementState: 'Full Operational',
    contractType: 'Annual Committed Enterprise',
    monthlyContractValueEur: 3200,
    renewalDate: '2026-11-15',
  },
];

export const PLATFORM_INCIDENTS: PlatformIncident[] = [
  {
    id: 'INC-2026-084',
    incidentType: 'Ads Wiring',
    severity: 'P2 - Degraded Control',
    status: 'Active Investigation',
    startedAt: '28m ago',
    affectedTenantsCount: 1,
    affectedTenantsList: ['Caledonian Toolworks Ltd (UK)'],
    financialExposureEur: 6200,
    owner: 'Engineering / Ad Integration Guild',
    mitigation: 'Feed updates paused for custom_label_2; fallback to campaign ROAS bid floors active.',
    currentEvidence: 'Google Ads asset group reporting missing tier tag custom_label_2 on 8 SKUs. Google Merchant supplemental push succeeded, but Google Ads campaign sync queue reports 18m propagation lag.',
    circuitBreakerTripped: false,
  },
  {
    id: 'INC-2026-081',
    incidentType: 'Connector',
    severity: 'P3 - Minor Telemetry Latency',
    status: 'Mitigating',
    startedAt: '2h 15m ago',
    affectedTenantsCount: 1,
    affectedTenantsList: ['Iberia Maison & Jardin SL (ES)'],
    financialExposureEur: 14500,
    owner: 'Platform Ingestion Team',
    mitigation: 'Rate-limiting window increased to 500 req/sec; queue processing resumed with exponential backoff.',
    currentEvidence: 'commercetools inventory webhook endpoint returned HTTP 429 during large mid-day catalog delta.',
    circuitBreakerTripped: false,
  },
  {
    id: 'INC-2026-079',
    incidentType: 'AI Provider',
    severity: 'P3 - Minor Telemetry Latency',
    status: 'Resolved',
    startedAt: 'Yesterday 18:40',
    affectedTenantsCount: 3,
    affectedTenantsList: ['Nordic Tech Retailer AB', 'Alpen Direct Sports AG', 'Benelux Horeca Supplies BV'],
    financialExposureEur: 0,
    owner: 'AI Platform Operations',
    mitigation: 'Automated circuit breaker failed over primary traffic from Claude 3.5 to Gemini 1.5 Pro within 1.2s.',
    currentEvidence: 'Anthropic US-EAST endpoint experienced 4.2% timeout spike for 12 minutes. Zero customer decisions were delayed; deterministic rule engine ran autonomously.',
    circuitBreakerTripped: true,
  },
];

export const PLATFORM_AUDIT_LOGS: PlatformAuditEntry[] = [
  {
    id: 'PAUD-9910',
    timestamp: '2026-09-15T11:42:19Z',
    actor: 'platform-eng@plumb.internal [SuperAdmin]',
    adminAction: 'CANONICAL_PLAN_VALIDATE',
    affectedTenant: 'PLATFORM_GLOBAL',
    privilegeScope: 'PLATFORM_SUPER_ADMIN',
    correlationId: 'CORR-PLN-VAL-8812',
    reason: 'Stage ENT-CONTROL-v8 validation run against staging tenant cluster',
    hashSha256: '9f83ab29fbc801289cf8841a029c301e742189d28e71b28749a02931bc782914',
    evidence: 'Validated schema backward compatibility for 250k SKU partition limit increase.',
  },
  {
    id: 'PAUD-9909',
    timestamp: '2026-09-15T11:20:04Z',
    actor: 'sec-ops@plumb.internal [SecurityGuild]',
    adminAction: 'SUPPORT_SESSION_ENTERED',
    affectedTenant: 'Caledonian Toolworks Ltd',
    privilegeScope: 'SUPPORT_SESSION_ELEVATED',
    supportSessionId: 'SUP-CAL-2026-09-15',
    correlationId: 'CORR-SUP-CAL-049',
    reason: 'Investigate Google Ads asset group wiring latency (INC-2026-084)',
    hashSha256: '88271afbc899014382cc9941a8084201e77189d28e71b28749a02931bc009182',
    evidence: 'Explicit customer approval granted in ticket #TK-88412. Session recorded with read-only wiring audit privilege.',
  },
  {
    id: 'PAUD-9908',
    timestamp: '2026-09-15T10:04:55Z',
    actor: 'billing-ops@plumb.internal [FinOps]',
    adminAction: 'GRACE_PERIOD_EXTEND',
    affectedTenant: 'Iberia Maison & Jardin SL',
    privilegeScope: 'BILLING_FINOPS_WRITE',
    correlationId: 'CORR-BIL-GRC-771',
    reason: 'Customer corporate card update in progress; finance team requested 72h grace interlock override.',
    hashSha256: '33182afbc899014382cc9941a8084201e77189d28e71b28749a02931bc994821',
    evidence: 'Commerce operations maintained in Recommend mode. Zero ad accounts frozen.',
  },
  {
    id: 'PAUD-9907',
    timestamp: '2026-09-15T09:15:30Z',
    actor: 'ai-ops@plumb.internal [AI Platform]',
    adminAction: 'AI_CIRCUIT_BREAKER_RESET',
    affectedTenant: 'PLATFORM_GLOBAL',
    privilegeScope: 'CIRCUIT_BREAK_OVERRIDE',
    correlationId: 'CORR-AI-CBT-102',
    reason: 'Anthropic US-EAST endpoint restored to 99.98% availability after upstream cloud incident resolved.',
    hashSha256: 'e8921afbc899014382cc9941a8084201e77189d28e71b28749a02931bc334182',
    evidence: 'Synthetic eval benchmark returned 99.4% agreement score. Route weight restored to 25%.',
  },
];
