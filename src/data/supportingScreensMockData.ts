import { MarketCode, OperatingMode } from '../types';

// ==========================================
// 1. AGENCY COMMAND CENTER TYPES & MOCKS
// ==========================================
export interface TenantPortfolioItem {
  id: string;
  name: string;
  legalEntity: string;
  commerceStack: string; // e.g. "Adobe Commerce + SAP S/4HANA"
  markets: MarketCode[];
  controlledSpendEur: number;
  atRiskSpendEur: number; // observational exposure
  dataConfidencePercent: number;
  operatingMode: OperatingMode;
  publicationHealth: 'Optimal' | 'Degraded' | 'Attention Required';
  activeModulesCount: number;
  totalModulesCount: number;
  pendingApprovalsCount: number;
  criticalIssuesCount: number;
  lastActivityTime: string;
  rbacIsolationVerified: boolean;
  activeTemplate: string;
}

export const MOCK_PORTFOLIO_TENANTS: TenantPortfolioItem[] = [
  {
    id: 'ten-starlight',
    name: 'Starlight Tools Europe',
    legalEntity: 'Starlight Europe GmbH',
    commerceStack: 'Adobe Commerce + SAP S/4HANA',
    markets: ['DE', 'FR', 'NL', 'UK'],
    controlledSpendEur: 284500,
    atRiskSpendEur: 38400,
    dataConfidencePercent: 99.2,
    operatingMode: 'Control (Active)',
    publicationHealth: 'Optimal',
    activeModulesCount: 8,
    totalModulesCount: 8,
    pendingApprovalsCount: 2,
    criticalIssuesCount: 0,
    lastActivityTime: '3m ago',
    rbacIsolationVerified: true,
    activeTemplate: 'Enterprise High-Velocity Margin v4'
  },
  {
    id: 'ten-nordic-audio',
    name: 'Nordic Sound Labs',
    legalEntity: 'Nordic Audio Solutions AB',
    commerceStack: 'Shopify Plus + Microsoft Dynamics',
    markets: ['DE', 'UK'],
    controlledSpendEur: 142000,
    atRiskSpendEur: 19800,
    dataConfidencePercent: 98.4,
    operatingMode: 'Recommend',
    publicationHealth: 'Optimal',
    activeModulesCount: 6,
    totalModulesCount: 8,
    pendingApprovalsCount: 5,
    criticalIssuesCount: 1,
    lastActivityTime: '12m ago',
    rbacIsolationVerified: true,
    activeTemplate: 'Strict Profit Guard Corridor v2'
  },
  {
    id: 'ten-kronos-apparel',
    name: 'Kronos Workwear Group',
    legalEntity: 'Kronos Safety B.V.',
    commerceStack: 'WooCommerce + Infor CloudSuite ERP',
    markets: ['NL', 'DE', 'FR'],
    controlledSpendEur: 98200,
    atRiskSpendEur: 42100,
    dataConfidencePercent: 91.8,
    operatingMode: 'Observe',
    publicationHealth: 'Attention Required',
    activeModulesCount: 4,
    totalModulesCount: 8,
    pendingApprovalsCount: 0,
    criticalIssuesCount: 2,
    lastActivityTime: '28m ago',
    rbacIsolationVerified: true,
    activeTemplate: 'Standard Inventory Suppression v1'
  },
  {
    id: 'ten-helix-wellness',
    name: 'Helix Precision Health',
    legalEntity: 'Helix BioCommerce SA',
    commerceStack: 'Custom Headless (Next.js + Medusa + SAP)',
    markets: ['FR', 'DE'],
    controlledSpendEur: 186000,
    atRiskSpendEur: 11200,
    dataConfidencePercent: 99.7,
    operatingMode: 'Control (Active)',
    publicationHealth: 'Optimal',
    activeModulesCount: 7,
    totalModulesCount: 8,
    pendingApprovalsCount: 1,
    criticalIssuesCount: 0,
    lastActivityTime: '4m ago',
    rbacIsolationVerified: true,
    activeTemplate: 'Enterprise High-Velocity Margin v4'
  }
];

// ==========================================
// 2. OS MODULES CATALOG & PROVISIONING
// ==========================================
export type ModuleProvisionState =
  | 'Active'
  | 'Provisioned'
  | 'Setup Required'
  | 'Degraded'
  | 'Paused'
  | 'Available'
  | 'Not Entitled';

export interface OSModuleItem {
  id: string;
  name: string;
  category: 'Core Guard' | 'Causal Science' | 'Catalog & Merchant' | 'Agency & Governance' | 'Integration Interlock';
  tagline: string;
  provisionState: ModuleProvisionState;
  entitlementState: 'Included in ENT-CONTROL-v7' | 'Add-on Required' | 'Contract Locked';
  dependencies: string[];
  dataReadiness: 'Ready (100%)' | 'Partial (Signals missing)' | 'Unconfigured';
  lastRunOrEval: string;
  scope: string;
  healthPercent: number;
  description: string;
  technicalNote?: string;
}

export const MOCK_OS_MODULES: OSModuleItem[] = [
  {
    id: 'mod-inventory',
    name: 'Inventory Guard',
    category: 'Core Guard',
    tagline: 'Real-time DOC tracking & automated bid tier suppression',
    provisionState: 'Active',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['inventory.read', 'warehouses.read', 'SKU identity readiness'],
    dataReadiness: 'Ready (100%)',
    lastRunOrEval: '2m ago · Eval score: 100%',
    scope: 'All connected warehouses across DE, FR, NL, UK',
    healthPercent: 100,
    description: 'Enforces stockout hazard suppression and slow-moving liquidity tiers before ad spend burns margin on depleted stock.'
  },
  {
    id: 'mod-profit',
    name: 'Profit Guard',
    category: 'Core Guard',
    tagline: 'Contribution margin exposure & negative return guard',
    provisionState: 'Active',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['economics.read (COGS/Fees)', 'orders.read', 'catalog.read'],
    dataReadiness: 'Ready (100%)',
    lastRunOrEval: '4m ago · Eval score: 99.8%',
    scope: 'Order-level & SKU-level net contribution margins',
    healthPercent: 99.8,
    description: 'Exposes actual contribution margin (CM2/CM3) into the control pipeline to eliminate spend on products with negative net margin.'
  },
  {
    id: 'mod-experiment',
    name: 'Experiment & Measurement',
    category: 'Causal Science',
    tagline: 'Causal Geo-Switchback & DiD incrementality engine',
    provisionState: 'Active',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['orders.read', 'Google Ads read-only', 'Geographic zoning data'],
    dataReadiness: 'Ready (100%)',
    lastRunOrEval: '18m ago · Model run #GEO-884',
    scope: 'Markets DE & FR (DiD Synthetic Control Clusters)',
    healthPercent: 100,
    description: 'Conducts verified econometric switchback tests to report Measured Economic Impact rather than naive attribution.'
  },
  {
    id: 'mod-feed-health',
    name: 'Feed Health',
    category: 'Catalog & Merchant',
    tagline: 'Google Merchant API · Supplemental data source dispatcher',
    provisionState: 'Active',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['Google Merchant API OAuth', 'Primary catalog feed binding'],
    dataReadiness: 'Ready (100%)',
    lastRunOrEval: '3m ago · 4,820 items updated',
    scope: 'Supplemental data source (custom_label_0..4)',
    healthPercent: 99.98,
    description: 'Directly dispatches Plumb-computed control labels via Google Merchant API without altering primary product descriptions or prices.'
  },
  {
    id: 'mod-price',
    name: 'Price Guard',
    category: 'Core Guard',
    tagline: 'Competitor price parity & margin corridor protector',
    provisionState: 'Active',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['Valid economics (COGS/fees)', 'Pricing signals', 'Market currency parity'],
    dataReadiness: 'Ready (100%)',
    lastRunOrEval: '11m ago · Corridor scan',
    scope: 'Monitored catalog SKUs with external price benchmarks',
    healthPercent: 98.6,
    description: 'Maintains bid elasticity corridors based on live competitive price benchmarks and minimum margin tolerances.'
  },
  {
    id: 'mod-budget',
    name: 'Budget Guard',
    category: 'Core Guard',
    tagline: 'PMax portfolio spend pacing & runaway burn prevention',
    provisionState: 'Active',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['Google Ads read-only', 'Daily campaign pacing targets'],
    dataReadiness: 'Ready (100%)',
    lastRunOrEval: '5m ago · Campaign pacing telemetry',
    scope: 'PMax & Shopping campaign portfolios in 4 markets',
    healthPercent: 100,
    description: 'Monitors intraday spend trajectories to prevent premature exhaustion or rogue budget burn during anomalous spikes.'
  },
  {
    id: 'mod-agency',
    name: 'Agency Command Center',
    category: 'Agency & Governance',
    tagline: 'Multi-store client overview & consolidated governance',
    provisionState: 'Active',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['Multi-tenant agency entitlement', 'Tenant federation permissions'],
    dataReadiness: 'Ready (100%)',
    lastRunOrEval: '1m ago · Portfolio aggregator',
    scope: 'Federated portfolio view (4 active tenants)',
    healthPercent: 100,
    description: 'Provides aggregated cross-tenant visibility for agencies while maintaining cryptographic tenant isolation and independent RBAC.'
  },
  {
    id: 'mod-traffic-quality',
    name: 'Traffic Quality integrations',
    category: 'Integration Interlock',
    tagline: 'Invalid traffic & bot click suppression interlock',
    provisionState: 'Provisioned',
    entitlementState: 'Included in ENT-CONTROL-v7',
    dependencies: ['External IVT vendor webhook / API credentials (Lunio / CHEQ)'],
    dataReadiness: 'Partial (Signals missing)',
    lastRunOrEval: '28m ago · Vendor heartbeat',
    scope: 'IP & Placement exclusion feed interlock',
    healthPercent: 94.2,
    description: 'Integration-first ingestion bridge for external invalid-traffic signals. Plumb executes feed and placement interlocks without acting as an internal fraud-classifier.'
  }
];

// ==========================================
// 3. ENTERPRISE AUDIT LOG / OPERATIONS LEDGER
// ==========================================
export type AuditEventType =
  | 'Data Import'
  | 'Identity Mapping'
  | 'Decision'
  | 'Policy'
  | 'Override'
  | 'Approval'
  | 'AI Draft'
  | 'Automation Run'
  | 'Merchant Publication'
  | 'Verification'
  | 'Rollback'
  | 'Entitlement Change'
  | 'Billing Event'
  | 'Connector Event'
  | 'Login / Security Event'
  | 'Operator Action';

export interface AuditLogEntry {
  id: string;
  timestampCet: string;
  eventType: AuditEventType;
  actor: string;
  actorRole: string;
  tenantScope: string;
  object: string;
  action: string;
  result: 'SUCCESS' | 'BLOCKED' | 'ROLLED_BACK' | 'REQUIRES_FOUR_EYES';
  evidence: string;
  correlationId: string;
  integrityState: 'Verified (SHA-256)' | 'Hash Link Valid';
  eventHash: string;
  previousHash: string;
  policyVersion?: string;
  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;
  approvalChain?: {
    requiredPolicy: string;
    approver1: string;
    approver2?: string;
    timestamp: string;
  };
}

export const MOCK_AUDIT_ENTRIES: AuditLogEntry[] = [
  {
    id: 'ev-9941',
    timestampCet: '2026-09-15 11:42:10',
    eventType: 'Merchant Publication',
    actor: 'Plumb Kernel Service (svc-worker-de-04)',
    actorRole: 'System Dispatcher',
    tenantScope: 'Starlight Europe GmbH (DE)',
    object: 'Google Merchant API · Supplemental (4,820 items)',
    action: 'Dispatch custom_label batch update via Merchant API',
    result: 'SUCCESS',
    evidence: 'GMC Batch Response #GMC-99214-OK · 0 errors',
    correlationId: 'corr-pub-9921401',
    integrityState: 'Verified (SHA-256)',
    eventHash: '7f9c8d1e...b4a0',
    previousHash: '3a1e2f8c...9d01',
    policyVersion: 'bundle-2026.09.05-prod',
    beforeState: { pendingBatchSize: 4820, lastVerifiedDispatch: '2026-09-15 10:42:00' },
    afterState: { pendingBatchSize: 0, dispatchAckReceived: true, verifiedItems: 4820 }
  },
  {
    id: 'ev-9940',
    timestampCet: '2026-09-15 11:38:04',
    eventType: 'Approval',
    actor: 'h.schmidt@starlight-tools.de',
    actorRole: 'Enterprise Owner',
    tenantScope: 'Starlight Europe GmbH (ALL)',
    object: 'RULE_PROFIT_02 (A5 Protected Control)',
    action: 'Approve manual override for Festool TS 55 (FES-576012)',
    result: 'SUCCESS',
    evidence: 'Four-Eyes Governance: Single approval valid (within blast radius <€5,000)',
    correlationId: 'corr-appr-8821092',
    integrityState: 'Verified (SHA-256)',
    eventHash: '3a1e2f8c...9d01',
    previousHash: '8b4d1c9e...55a2',
    policyVersion: 'v4.1-strict',
    beforeState: { sku: 'FES-576012', currentTier: 'GUARD_HIGH' },
    afterState: { sku: 'FES-576012', currentTier: 'HOLD' },
    approvalChain: {
      requiredPolicy: 'Protected Control Approval (Standard single-approver)',
      approver1: 'h.schmidt@starlight-tools.de (Enterprise Owner)',
      timestamp: '2026-09-15 11:38:04 CET'
    }
  },
  {
    id: 'ev-9939',
    timestampCet: '2026-09-15 11:15:22',
    eventType: 'Rollback',
    actor: 'm.bauer@starlight-tools.de',
    actorRole: 'Security Administrator',
    tenantScope: 'Starlight Europe GmbH (System)',
    object: 'AI Release Manifest v2026.09.12-rc2',
    action: 'Controlled Rollback to Last Known Good (v2026.09.05-prod)',
    result: 'ROLLED_BACK',
    evidence: 'Eval suite #EVAL-218 verified · Worker fleet synced across all nodes',
    correlationId: 'corr-roll-7719203',
    integrityState: 'Verified (SHA-256)',
    eventHash: '8b4d1c9e...55a2',
    previousHash: '1c4e9f2a...88b3',
    policyVersion: 'bundle-2026.09.05-prod',
    beforeState: { activeRelease: 'v2026.09.12-rc2', hash: 'e4f8812c' },
    afterState: { activeRelease: 'v2026.09.05-prod', hash: 'c9a8421f' },
    approvalChain: {
      requiredPolicy: 'Four-Eyes Required (System Infrastructure Mutation)',
      approver1: 'm.bauer@starlight-tools.de (Security Admin)',
      approver2: 'h.schmidt@starlight-tools.de (Enterprise Owner)',
      timestamp: '2026-09-15 11:15:20 CET'
    }
  },
  {
    id: 'ev-9938',
    timestampCet: '2026-09-15 10:50:11',
    eventType: 'Connector Event',
    actor: 'Adobe Commerce Integration Connector',
    actorRole: 'Automated Connector Daemon',
    tenantScope: 'Starlight Europe GmbH (DE)',
    object: 'Magento REST Endpoint /V1/inventory/stock-items',
    action: 'Incremental inventory delta sync (1,240 records)',
    result: 'SUCCESS',
    evidence: 'HTTP 200 OK · Duration 420ms · 0 schema drift warnings',
    correlationId: 'corr-conn-6621004',
    integrityState: 'Verified (SHA-256)',
    eventHash: '1c4e9f2a...88b3',
    previousHash: '5e7a9b1c...22d4'
  }
];

// ==========================================
// 4. CONNECTORS & CONNECTOR DETAIL
// ==========================================
export interface ConnectorItem {
  id: string;
  name: string;
  type:
    | 'Magento / Adobe Commerce'
    | 'WooCommerce'
    | 'Shopify Plus'
    | 'Custom REST'
    | 'CSV / SFTP'
    | 'ERP / WMS'
    | 'Google Merchant API'
    | 'Google Ads read-only';
  health: 'Healthy' | 'Degraded' | 'Attention Required' | 'Syncing';
  authStatus: 'Validated' | 'Configured' | 'Re-authorization Required';
  lastSyncTime: string;
  freshnessSec: number;
  dataCoveragePercent: number;
  markets: MarketCode[];
  capabilities: string[];
  schedule: string;
  rateLimitStatus: string;
  errorRate: number;
  syncLatencyMs: number;
  credentialMetadata: {
    configured: boolean;
    validated: boolean;
    lastVerified: string;
    rotationRequired: boolean;
  };
}

export const MOCK_CONNECTORS: ConnectorItem[] = [
  {
    id: 'conn-adobe',
    name: 'Adobe Commerce (Frankfurt Primary)',
    type: 'Magento / Adobe Commerce',
    health: 'Healthy',
    authStatus: 'Validated',
    lastSyncTime: '3m ago',
    freshnessSec: 180,
    dataCoveragePercent: 99.4,
    markets: ['DE', 'FR', 'NL', 'UK'],
    capabilities: ['catalog.read', 'inventory.read', 'orders.read', 'warehouses.read', 'webhooks'],
    schedule: 'Streaming Webhooks + 15m Reconciliation Polling',
    rateLimitStatus: 'Optimal (12% of 10,000 req/min quota)',
    errorRate: 0.01,
    syncLatencyMs: 240,
    credentialMetadata: {
      configured: true,
      validated: true,
      lastVerified: 'Sep 15, 2026 11:40 CET',
      rotationRequired: false
    }
  },
  {
    id: 'conn-sap',
    name: 'SAP S/4HANA Finance & WMS',
    type: 'ERP / WMS',
    health: 'Healthy',
    authStatus: 'Validated',
    lastSyncTime: '8m ago',
    freshnessSec: 480,
    dataCoveragePercent: 100,
    markets: ['DE', 'FR', 'NL', 'UK'],
    capabilities: ['economics.read', 'inventory.read', 'warehouses.read', 'inbound.read'],
    schedule: 'Scheduled Batch every 30m',
    rateLimitStatus: 'Optimal (Internal VPC Gateway)',
    errorRate: 0.0,
    syncLatencyMs: 410,
    credentialMetadata: {
      configured: true,
      validated: true,
      lastVerified: 'Sep 15, 2026 11:35 CET',
      rotationRequired: false
    }
  },
  {
    id: 'conn-gmc',
    name: 'Google Merchant API Dispatcher',
    type: 'Google Merchant API',
    health: 'Healthy',
    authStatus: 'Validated',
    lastSyncTime: '3m ago',
    freshnessSec: 180,
    dataCoveragePercent: 100,
    markets: ['DE', 'FR', 'NL', 'UK'],
    capabilities: ['catalog.read', 'Supplemental data source'],
    schedule: 'Event-driven on policy decision confirmation',
    rateLimitStatus: 'Optimal (Quota 25,000 calls/day · 18% used)',
    errorRate: 0.02,
    syncLatencyMs: 185,
    credentialMetadata: {
      configured: true,
      validated: true,
      lastVerified: 'Sep 15, 2026 11:42 CET',
      rotationRequired: false
    }
  },
  {
    id: 'conn-gads',
    name: 'Google Ads Telemetry Bridge',
    type: 'Google Ads read-only',
    health: 'Healthy',
    authStatus: 'Validated',
    lastSyncTime: '12m ago',
    freshnessSec: 720,
    dataCoveragePercent: 99.8,
    markets: ['DE', 'FR', 'NL', 'UK'],
    capabilities: ['orders.read', 'Google Ads read-only'],
    schedule: 'Hourly performance telemetry sync',
    rateLimitStatus: 'Optimal (Developer Token Approved)',
    errorRate: 0.0,
    syncLatencyMs: 520,
    credentialMetadata: {
      configured: true,
      validated: true,
      lastVerified: 'Sep 15, 2026 11:30 CET',
      rotationRequired: false
    }
  }
];

// ==========================================
// 5. IMPORTS & SCHEMA MAPPING WORKSPACE
// ==========================================
export interface ImportHistoryBatch {
  id: string;
  source: string;
  sourceType: 'CSV / SFTP' | 'Adobe Commerce' | 'ERP Manual Upload' | 'REST Push';
  totalRows: number;
  acceptedRows: number;
  rejectedRows: number;
  warningsCount: number;
  duplicateIssues: number;
  mappingCoverageSkuPercent: number;
  mappingCoverageSpendPercent: number;
  status: 'Ready' | 'Quality review' | 'Identity reconciliation' | 'Validation';
  importedAt: string;
  fileOrBatchName: string;
}

export const MOCK_IMPORT_BATCHES: ImportHistoryBatch[] = [
  {
    id: 'imp-8821',
    source: 'SAP S/4HANA Financial COGS Export',
    sourceType: 'ERP Manual Upload',
    totalRows: 14850,
    acceptedRows: 14812,
    rejectedRows: 18,
    warningsCount: 20,
    duplicateIssues: 0,
    mappingCoverageSkuPercent: 99.7,
    mappingCoverageSpendPercent: 100,
    status: 'Ready',
    importedAt: 'Today 10:30 CET',
    fileOrBatchName: 'cogs_financial_ledger_2026_09_15.csv'
  },
  {
    id: 'imp-8820',
    source: 'Warehouse Inventory Snapshot (Frankfurt + Lyon)',
    sourceType: 'CSV / SFTP',
    totalRows: 22400,
    acceptedRows: 22390,
    rejectedRows: 4,
    warningsCount: 6,
    duplicateIssues: 0,
    mappingCoverageSkuPercent: 99.9,
    mappingCoverageSpendPercent: 99.8,
    status: 'Ready',
    importedAt: 'Today 09:15 CET',
    fileOrBatchName: 'sftp://wms.starlight.internal/snapshots/inv_daily.json'
  },
  {
    id: 'imp-8819',
    source: 'Supplemental Catalog Enriched Attributes',
    sourceType: 'Adobe Commerce',
    totalRows: 8640,
    acceptedRows: 8520,
    rejectedRows: 72,
    warningsCount: 48,
    duplicateIssues: 0,
    mappingCoverageSkuPercent: 98.6,
    mappingCoverageSpendPercent: 99.1,
    status: 'Ready',
    importedAt: 'Yesterday 18:40 CET',
    fileOrBatchName: 'magento_delta_sync_feed_batch_391.xml'
  }
];

export interface SchemaFieldMapping {
  id: string;
  externalField: string;
  sourceSample: string;
  canonicalModelField: string;
  status: 'Approved' | 'AI Suggested' | 'Ambiguous / Unmapped';
  confidencePercent: number;
  aiEvidence?: string;
  sourceRecordsSample?: string;
}

export const MOCK_SCHEMA_MAPPINGS: SchemaFieldMapping[] = [
  {
    id: 'map-1',
    externalField: 'item_sku_primary',
    sourceSample: '"FES-576012"',
    canonicalModelField: 'canonical product identity (sku)',
    status: 'Approved',
    confidencePercent: 100
  },
  {
    id: 'map-2',
    externalField: 'stock_physical_ats',
    sourceSample: '2',
    canonicalModelField: 'on_hand (atsUnits)',
    status: 'Approved',
    confidencePercent: 100
  },
  {
    id: 'map-3',
    externalField: 'alloc_reserved_orders',
    sourceSample: '0',
    canonicalModelField: 'reserved (inbound / allocation)',
    status: 'Approved',
    confidencePercent: 100
  },
  {
    id: 'map-4',
    externalField: 'unit_cogs_net_eur',
    sourceSample: '645.20',
    canonicalModelField: 'COGS / economics (unitCostEur)',
    status: 'Approved',
    confidencePercent: 100
  },
  {
    id: 'map-5',
    externalField: 'wh_location_id_sap',
    sourceSample: '"DE-FRA-01"',
    canonicalModelField: 'warehouse identity (hubLocation)',
    status: 'AI Suggested',
    confidencePercent: 96.4,
    aiEvidence: 'Matches German central bonded distribution hub syntax across 14,800 records.',
    sourceRecordsSample: 'DE-FRA-01, FR-LYO-02, NL-AMS-01'
  },
  {
    id: 'map-6',
    externalField: 'store_view_country_iso',
    sourceSample: '"DE"',
    canonicalModelField: 'market (marketCode)',
    status: 'AI Suggested',
    confidencePercent: 99.8,
    aiEvidence: 'Conforms to ISO-3166 alpha-2 market partition requirements.',
    sourceRecordsSample: 'DE, FR, NL, UK'
  }
];

// ==========================================
// 6. ENTERPRISE SETTINGS STATE
// ==========================================
export type SettingsSection =
  | 'general'
  | 'markets'
  | 'team'
  | 'sso'
  | 'security'
  | 'notifications'
  | 'approvals'
  | 'retention'
  | 'ai-governance'
  | 'billing-contacts'
  | 'developer-api';
