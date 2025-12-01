/**
 * Test campaign fixtures for E2E and unit testing.
 */

export const testCampaigns = {
  // Active search campaign
  searchCampaign: {
    id: '10000000-0000-0000-0000-000000000001',
    name: 'Brand Search - US',
    type: 'search' as const,
    status: 'active' as const,
    budget: 1000,
    spent: 450,
    impressions: 50000,
    clicks: 2500,
    conversions: 125,
    cpc: 0.18,
    ctr: 0.05,
    conversionRate: 0.05,
  },
  
  // Shopping campaign
  shoppingCampaign: {
    id: '10000000-0000-0000-0000-000000000002',
    name: 'Product Feed - Electronics',
    type: 'shopping' as const,
    status: 'active' as const,
    budget: 2500,
    spent: 1800,
    impressions: 120000,
    clicks: 4800,
    conversions: 240,
    cpc: 0.375,
    ctr: 0.04,
    conversionRate: 0.05,
  },
  
  // Paused campaign
  pausedCampaign: {
    id: '10000000-0000-0000-0000-000000000003',
    name: 'Q3 Promo - Paused',
    type: 'display' as const,
    status: 'paused' as const,
    budget: 500,
    spent: 350,
    impressions: 80000,
    clicks: 800,
    conversions: 24,
    cpc: 0.4375,
    ctr: 0.01,
    conversionRate: 0.03,
  },
  
  // Social campaign
  socialCampaign: {
    id: '10000000-0000-0000-0000-000000000004',
    name: 'Meta - Retargeting',
    type: 'social' as const,
    status: 'active' as const,
    budget: 1500,
    spent: 900,
    impressions: 200000,
    clicks: 6000,
    conversions: 180,
    cpc: 0.15,
    ctr: 0.03,
    conversionRate: 0.03,
  },
};

export type TestCampaign = typeof testCampaigns[keyof typeof testCampaigns];
export type CampaignType = TestCampaign['type'];
export type CampaignStatus = TestCampaign['status'];

