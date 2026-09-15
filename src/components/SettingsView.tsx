import React, { useState } from 'react';
import { SettingsSection } from '../data/supportingScreensMockData';

export const SettingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [fourEyesThresholdEur, setFourEyesThresholdEur] = useState<number>(5000);
  const [fourEyesSkuCount, setFourEyesSkuCount] = useState<number>(50);
  const [killSwitchScope, setKillSwitchScope] = useState<string>('TENANT_GLOBAL');
  const [retentionDays, setRetentionDays] = useState<number>(365);
  const [requireSamlSso, setRequireSamlSso] = useState<boolean>(true);
  const [byokStatus, setByokStatus] = useState<string>('KMS-Vaulted');

  const navItems: { id: SettingsSection; label: string; icon: string }[] = [
    { id: 'general', label: 'Tenant Profile & General', icon: 'domain' },
    { id: 'markets', label: 'Markets & Hub Partitions', icon: 'language' },
    { id: 'team', label: 'Team & RBAC Roles', icon: 'group' },
    { id: 'sso', label: 'SAML SSO & Identity', icon: 'verified_user' },
    { id: 'security', label: 'Security & KMS Secrets', icon: 'lock' },
    { id: 'approvals', label: 'Four-Eyes & Thresholds', icon: 'gavel' },
    { id: 'retention', label: 'Data Retention & Audit', icon: 'timer' },
    { id: 'ai-governance', label: 'AI Authority & Routing', icon: 'psychology' },
    { id: 'billing-contacts', label: 'Billing Contacts & Tax', icon: 'receipt_long' },
    { id: 'developer-api', label: 'Developer API & Webhooks', icon: 'terminal' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-800">settings</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Enterprise Settings &amp; Tenant Governance</h1>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
              Tenant ID: ten-starlight-prod-01
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure tenant security, approval thresholds, RBAC governance, and KMS-vaulted API keys
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Settings configuration saved and verified against tenant governance schema.')}
            className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* 2. Structured Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200/80 p-2 shadow-xs space-y-1 text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={`material-symbols-outlined text-[17px] ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Configuration Panel (9 cols) */}
        <div className="lg:col-span-9 bg-white rounded-lg border border-slate-200/80 p-6 shadow-xs space-y-6 text-xs">
          {/* GENERAL SETTINGS */}
          {activeSection === 'general' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">Tenant Legal Identity &amp; Profile</h2>
                <p className="text-slate-500">Legal entity name and primary operational coordinates</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Legal Company Name</label>
                  <input
                    type="text"
                    defaultValue="Starlight Europe GmbH"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Corporate Tax ID / VAT</label>
                  <input
                    type="text"
                    defaultValue="DE 304 918 201"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Default Operating Currency</label>
                  <input
                    type="text"
                    defaultValue="EUR (€)"
                    disabled
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Primary Operational Hub</label>
                  <input
                    type="text"
                    defaultValue="German Central Hub (Frankfurt Bonded)"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* APPROVALS & FOUR-EYES THRESHOLDS */}
          {activeSection === 'approvals' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">Four-Eyes Governance &amp; Thresholds Policy</h2>
                <p className="text-slate-500">
                  Thresholds represent tenant-governance policy values, not hardcoded global constants
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Spend Blast-Radius Threshold for Four-Eyes Requirement
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={fourEyesThresholdEur}
                      onChange={(e) => setFourEyesThresholdEur(Number(e.target.value))}
                      className="w-44 px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-50 font-mono font-bold text-slate-900 focus:bg-white focus:outline-none"
                    />
                    <span className="text-slate-500">EUR affected spend per mutation</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Any policy, manual override, or automation run impacting &gt; €{fourEyesThresholdEur.toLocaleString()} requires dual cryptographic approval.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    SKU Volume Threshold for Dual Signatory
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={fourEyesSkuCount}
                      onChange={(e) => setFourEyesSkuCount(Number(e.target.value))}
                      className="w-44 px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-50 font-mono font-bold text-slate-900 focus:bg-white focus:outline-none"
                    />
                    <span className="text-slate-500">SKUs in a single batch mutation</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
                  <strong>Kill-Switch Scope:</strong> Tenant administrators have configured immediate suppression for Google Merchant API dispatch across all connected supplemental data sources upon trigger.
                </div>
              </div>
            </div>
          )}

          {/* SAML SSO & IDENTITY */}
          {activeSection === 'sso' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">SAML 2.0 / OIDC Enterprise Single Sign-On</h2>
                <p className="text-slate-500">Enforce corporate identity provider with hardware 2FA</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <div className="font-semibold text-slate-900">Enforce SAML SSO for all domain users</div>
                    <div className="text-slate-500 text-[11px]">Bypasses standard email/password authentication</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireSamlSso}
                    onChange={(e) => setRequireSamlSso(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">IdP Entity ID</label>
                    <input
                      type="text"
                      defaultValue="https://idp.starlight-tools.de/saml/metadata"
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-50 font-mono text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">SSO ACS URL</label>
                    <input
                      type="text"
                      defaultValue="https://control.plumb.io/saml/acs/ten-starlight"
                      disabled
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-slate-100 font-mono text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY & KMS SECRETS */}
          {activeSection === 'security' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">Security &amp; Vaulted Credentials</h2>
                <p className="text-slate-500">
                  Zero raw secrets, tokens, or private keys are exposed in the client UI
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Google Cloud KMS Envelope Encryption</div>
                    <div className="text-slate-500 text-[11px]">All OAuth refresh tokens and SFTP secrets encrypted with tenant-specific DEK</div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Active (TLS 1.3 + KMS)
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">BYOK Key Management Status</div>
                    <div className="text-slate-500 text-[11px]">Cloud HSM Key: projects/plumb-core/locations/europe-west3/keyRings/starlight</div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {byokStatus}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER SECTIONS */}
          {!['general', 'approvals', 'sso', 'security'].includes(activeSection) && (
            <div className="py-8 text-center space-y-2">
              <span className="material-symbols-outlined text-[32px] text-slate-400">tune</span>
              <h3 className="font-semibold text-slate-900">
                {navItems.find((n) => n.id === activeSection)?.label}
              </h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                Governance parameters configured under immutable policy bundle <code>bundle-2026.09.05-prod</code>. Changes require Security Administrator sign-off.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
