import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'merchant_operator' | 'merchant_admin' | 'platform_operator' | 'super_admin';

export interface UserSession {
  userId: string;
  email: string;
  displayName: string;
  tenantId: string;
  tenantName: string;
  role: UserRole;
  claims: string[];
}

export const SESSIONS_BY_ROLE: Record<'merchant_admin' | 'super_admin', UserSession> = {
  merchant_admin: {
    userId: 'usr_nordic_001',
    email: 'henrik@nordictech.se',
    displayName: 'Henrik Lindqvist',
    tenantId: 'tenant_nordic_tech',
    tenantName: 'Nordic Tech Retailer AB',
    role: 'merchant_admin',
    claims: [
      'access:customer-dashboard',
      'action:tenant-killswitch',
      'action:approve-decisions',
      'action:manual-tier-override',
      'action:export-audit-trail',
    ],
  },
  super_admin: {
    userId: 'usr_plumb_operator_99',
    email: 'operator@plumb.io',
    displayName: 'Plumb Platform Ops',
    tenantId: 'tenant_global_fleet',
    tenantName: 'Global Tenant Fleet (Multi-Tenant)',
    role: 'super_admin',
    claims: [
      'access:customer-dashboard',
      'access:platform-admin',
      'action:tenant-killswitch',
      'action:global-killswitch',
      'action:manage-tenants',
      'action:incident-mitigation',
      'action:approve-decisions',
      'action:manual-tier-override',
    ],
  },
};

interface AuthContextType {
  session: UserSession;
  hasClaim: (claim: string) => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  canAccessPlatformAdmin: boolean;
  canAccessCustomerDashboard: boolean;
  switchRole: (role: 'merchant_admin' | 'super_admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default session is Merchant Admin (Henrik) - customer tenant scope
  const [activeRole, setActiveRole] = useState<'merchant_admin' | 'super_admin'>('merchant_admin');
  const [session, setSession] = useState<UserSession>(SESSIONS_BY_ROLE.merchant_admin);

  useEffect(() => {
    setSession(SESSIONS_BY_ROLE[activeRole]);
  }, [activeRole]);

  const hasClaim = (claim: string): boolean => {
    return session.claims.includes(claim);
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(session.role);
  };

  const canAccessPlatformAdmin = hasClaim('access:platform-admin');
  const canAccessCustomerDashboard = hasClaim('access:customer-dashboard');

  const switchRole = (newRole: 'merchant_admin' | 'super_admin') => {
    setActiveRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        hasClaim,
        hasRole,
        canAccessPlatformAdmin,
        canAccessCustomerDashboard,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
