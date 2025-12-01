/**
 * Test user fixtures for E2E and unit testing.
 * These represent different user personas and roles.
 */

export const testUsers = {
  // Admin user with full access
  admin: {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'admin@adpilot.test',
    password: 'AdminPass123!',
    role: 'admin' as const,
    fullName: 'Admin User',
  },
  
  // Agency user managing multiple clients
  agency: {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'agency@adpilot.test',
    password: 'AgencyPass123!',
    role: 'agency' as const,
    fullName: 'Agency Manager',
  },
  
  // Freelancer user
  freelancer: {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'freelancer@adpilot.test',
    password: 'FreelancePass123!',
    role: 'freelancer' as const,
    fullName: 'Freelance Marketer',
  },
  
  // Enterprise user
  enterprise: {
    id: '00000000-0000-0000-0000-000000000004',
    email: 'enterprise@adpilot.test',
    password: 'EnterprisePass123!',
    role: 'enterprise' as const,
    fullName: 'Enterprise User',
  },
  
  // Regular user (in-house)
  user: {
    id: '00000000-0000-0000-0000-000000000005',
    email: 'user@adpilot.test',
    password: 'UserPass123!',
    role: 'user' as const,
    fullName: 'In-House Marketer',
  },
};

export type TestUser = typeof testUsers[keyof typeof testUsers];
export type UserRole = TestUser['role'];

