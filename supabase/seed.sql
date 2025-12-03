-- =============================================================================
-- Draper Seed Data
-- =============================================================================
-- This script is IDEMPOTENT: safe to run multiple times
-- It creates realistic test data for development and demonstration
-- =============================================================================

-- Configuration: Test User Credentials
-- Email: demo@draperads.com
-- Password: demo1234
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. DISABLE TRIGGER TEMPORARILY (to avoid auto-created workspaces)
-- -----------------------------------------------------------------------------

-- Disable the trigger that auto-creates workspaces
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- -----------------------------------------------------------------------------
-- 2. CREATE TEST USERS (using Supabase auth helpers)
-- -----------------------------------------------------------------------------

-- Create the demo user in auth.users if not exists
DO $$
DECLARE
  demo_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = demo_user_id) THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      aud,
      confirmation_token
    ) VALUES (
      demo_user_id,
      '00000000-0000-0000-0000-000000000000',
      'demo@draperads.com',
      crypt('demo1234', gen_salt('bf')),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Alex Demo"}',
      NOW(),
      NOW(),
      'authenticated',
      'authenticated',
      ''
    );
  END IF;
END $$;

-- Create a second team member
DO $$
DECLARE
  team_user_id UUID := '00000000-0000-0000-0000-000000000002';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = team_user_id) THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      aud,
      confirmation_token
    ) VALUES (
      team_user_id,
      '00000000-0000-0000-0000-000000000000',
      'team@draperads.com',
      crypt('team1234', gen_salt('bf')),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Jordan Team"}',
      NOW(),
      NOW(),
      'authenticated',
      'authenticated',
      ''
    );
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 2. CREATE WORKSPACES
-- -----------------------------------------------------------------------------

-- Primary agency workspace
INSERT INTO workspaces (id, name, slug, plan, billing_email, description, is_personal, settings)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'Stellar Digital Agency',
  'stellar-digital',
  'premium',
  'billing@stellardigital.io',
  'Full-service digital marketing agency specializing in e-commerce and SaaS',
  false,
  '{"timezone": "America/New_York", "currency": "USD", "notifications": {"email": true, "slack": true}}'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  plan = EXCLUDED.plan,
  billing_email = EXCLUDED.billing_email,
  description = EXCLUDED.description;

-- Personal workspace for demo user (simulating the auto-created one)
INSERT INTO workspaces (id, name, slug, plan, is_personal, settings)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  'Alex''s Workspace',
  'ws-00000000',
  'essentials',
  true,
  '{"timezone": "America/New_York"}'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name;

-- Client workspace (for agency to manage)
INSERT INTO workspaces (id, name, slug, plan, billing_email, description, is_personal, settings)
VALUES (
  '10000000-0000-0000-0000-000000000003',
  'TechStart Inc.',
  'techstart-inc',
  'essentials',
  'marketing@techstart.io',
  'B2B SaaS startup - performance marketing client',
  false,
  '{"timezone": "America/Los_Angeles", "currency": "USD"}'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- -----------------------------------------------------------------------------
-- 3. CREATE PROFILES (linked to auth.users)
-- -----------------------------------------------------------------------------

INSERT INTO profiles (id, full_name, avatar_url, role, job_title, timezone, current_workspace_id, email_notifications, slack_notifications)
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    'Alex Demo',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    'admin',
    'Head of Paid Media',
    'America/New_York',
    '10000000-0000-0000-0000-000000000001',
    true,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Jordan Team',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    'member',
    'PPC Specialist',
    'America/Chicago',
    '10000000-0000-0000-0000-000000000001',
    true,
    false
  )
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  current_workspace_id = EXCLUDED.current_workspace_id;

-- -----------------------------------------------------------------------------
-- 4. CREATE WORKSPACE MEMBERSHIPS
-- -----------------------------------------------------------------------------

-- Demo user is owner of agency workspace
INSERT INTO workspace_members (workspace_id, user_id, role, is_default)
VALUES 
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'owner', true),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'owner', false),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'admin', false)
ON CONFLICT (workspace_id, user_id) DO UPDATE SET
  role = EXCLUDED.role;

-- Team user is member of agency workspace
INSERT INTO workspace_members (workspace_id, user_id, role, is_default, invited_by, invited_at)
VALUES 
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'member', true, '00000000-0000-0000-0000-000000000001', NOW() - INTERVAL '30 days')
ON CONFLICT (workspace_id, user_id) DO UPDATE SET
  role = EXCLUDED.role;

-- -----------------------------------------------------------------------------
-- 5. CREATE AD ACCOUNTS
-- -----------------------------------------------------------------------------

-- Google Ads - Primary ecommerce account
INSERT INTO ad_accounts (id, workspace_id, platform, platform_account_id, name, currency, timezone, status, monthly_budget, current_spend, audit_score, health_status, is_favorite)
VALUES 
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'google_ads',
    '123-456-7890',
    'Stellar Digital - Primary',
    'USD',
    'America/New_York',
    'active',
    50000.00,
    38247.52,
    78,
    'healthy',
    true
  )
ON CONFLICT (workspace_id, platform, platform_account_id) DO UPDATE SET
  name = EXCLUDED.name,
  current_spend = EXCLUDED.current_spend,
  audit_score = EXCLUDED.audit_score;

-- Google Ads - Brand campaigns
INSERT INTO ad_accounts (id, workspace_id, platform, platform_account_id, name, currency, timezone, status, monthly_budget, current_spend, audit_score, health_status, is_favorite)
VALUES 
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'google_ads',
    '123-456-7891',
    'Stellar Digital - Brand',
    'USD',
    'America/New_York',
    'active',
    15000.00,
    11823.17,
    92,
    'healthy',
    false
  )
ON CONFLICT (workspace_id, platform, platform_account_id) DO UPDATE SET
  current_spend = EXCLUDED.current_spend,
  audit_score = EXCLUDED.audit_score;

-- Meta Ads account
INSERT INTO ad_accounts (id, workspace_id, platform, platform_account_id, name, currency, timezone, status, monthly_budget, current_spend, audit_score, health_status, is_favorite)
VALUES 
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'meta_ads',
    'act_1234567890',
    'Stellar Digital - Meta',
    'USD',
    'America/New_York',
    'active',
    25000.00,
    21456.89,
    65,
    'warning',
    true
  )
ON CONFLICT (workspace_id, platform, platform_account_id) DO UPDATE SET
  current_spend = EXCLUDED.current_spend,
  audit_score = EXCLUDED.audit_score,
  health_status = EXCLUDED.health_status;

-- Microsoft Ads account
INSERT INTO ad_accounts (id, workspace_id, platform, platform_account_id, name, currency, timezone, status, monthly_budget, current_spend, audit_score, health_status, is_favorite)
VALUES 
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000001',
    'microsoft_ads',
    'MS-9876543210',
    'Stellar Digital - Microsoft',
    'USD',
    'America/New_York',
    'active',
    8000.00,
    5632.41,
    71,
    'healthy',
    false
  )
ON CONFLICT (workspace_id, platform, platform_account_id) DO UPDATE SET
  current_spend = EXCLUDED.current_spend,
  audit_score = EXCLUDED.audit_score;

-- TechStart client account (different workspace)
INSERT INTO ad_accounts (id, workspace_id, platform, platform_account_id, name, currency, timezone, status, monthly_budget, current_spend, audit_score, health_status, is_favorite)
VALUES 
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000003',
    'google_ads',
    '234-567-8901',
    'TechStart SaaS Campaigns',
    'USD',
    'America/Los_Angeles',
    'active',
    20000.00,
    14892.33,
    84,
    'healthy',
    true
  )
ON CONFLICT (workspace_id, platform, platform_account_id) DO UPDATE SET
  current_spend = EXCLUDED.current_spend,
  audit_score = EXCLUDED.audit_score;

-- Account with issues (for demonstrating alerts)
INSERT INTO ad_accounts (id, workspace_id, platform, platform_account_id, name, currency, timezone, status, monthly_budget, current_spend, audit_score, health_status, is_favorite)
VALUES 
  (
    '20000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000001',
    'amazon_ads',
    'AMZN-1234567890',
    'Amazon Sponsored Products',
    'USD',
    'America/New_York',
    'active',
    12000.00,
    11847.92,
    45,
    'critical',
    false
  )
ON CONFLICT (workspace_id, platform, platform_account_id) DO UPDATE SET
  current_spend = EXCLUDED.current_spend,
  audit_score = EXCLUDED.audit_score,
  health_status = EXCLUDED.health_status;

-- -----------------------------------------------------------------------------
-- 6. CREATE CAMPAIGNS
-- -----------------------------------------------------------------------------

-- Google Ads campaigns (Primary account)
INSERT INTO campaigns (id, ad_account_id, platform_campaign_id, name, type, status, budget_type, budget_amount, impressions, clicks, cost, conversions, conversion_value)
VALUES 
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'GC001', 'Brand - Exact Match', 'search', 'enabled', 'daily', 500.00, 245000, 18500, 8234.56, 892, 45678.90),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'GC002', 'Non-Brand - Product Categories', 'search', 'enabled', 'daily', 800.00, 892000, 32100, 14523.89, 456, 23456.78),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'GC003', 'Shopping - All Products', 'shopping', 'enabled', 'daily', 600.00, 1234000, 45600, 9876.54, 678, 34567.89),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 'GC004', 'Performance Max - Conversions', 'pmax', 'enabled', 'daily', 400.00, 567000, 23400, 5612.53, 234, 12345.67),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', 'GC005', 'Display - Remarketing', 'display', 'paused', 'daily', 200.00, 890000, 4500, 1234.56, 45, 2345.67)
ON CONFLICT (ad_account_id, platform_campaign_id) DO UPDATE SET
  impressions = EXCLUDED.impressions,
  clicks = EXCLUDED.clicks,
  cost = EXCLUDED.cost,
  conversions = EXCLUDED.conversions,
  conversion_value = EXCLUDED.conversion_value;

-- Meta Ads campaigns
INSERT INTO campaigns (id, ad_account_id, platform_campaign_id, name, type, status, budget_type, budget_amount, impressions, clicks, cost, conversions, conversion_value)
VALUES 
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000003', 'MC001', 'Prospecting - Lookalike', 'display', 'enabled', 'daily', 400.00, 2345000, 28900, 8234.56, 234, 11234.56),
  ('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000003', 'MC002', 'Retargeting - Website Visitors', 'display', 'enabled', 'daily', 300.00, 456000, 12300, 4567.89, 156, 7890.12),
  ('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000003', 'MC003', 'Catalog Sales - Dynamic', 'shopping', 'enabled', 'daily', 350.00, 1890000, 34500, 8654.44, 289, 14567.89)
ON CONFLICT (ad_account_id, platform_campaign_id) DO UPDATE SET
  impressions = EXCLUDED.impressions,
  clicks = EXCLUDED.clicks,
  cost = EXCLUDED.cost,
  conversions = EXCLUDED.conversions;

-- TechStart campaigns
INSERT INTO campaigns (id, ad_account_id, platform_campaign_id, name, type, status, budget_type, budget_amount, impressions, clicks, cost, conversions, conversion_value)
VALUES 
  ('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000005', 'TC001', 'SaaS - Free Trial', 'search', 'enabled', 'daily', 350.00, 123000, 4560, 5678.90, 234, 0),
  ('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000005', 'TC002', 'SaaS - Demo Requests', 'search', 'enabled', 'daily', 300.00, 89000, 2340, 4321.09, 89, 0),
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000005', 'TC003', 'Competitor Keywords', 'search', 'enabled', 'daily', 250.00, 67000, 1890, 4892.34, 67, 0)
ON CONFLICT (ad_account_id, platform_campaign_id) DO UPDATE SET
  impressions = EXCLUDED.impressions,
  clicks = EXCLUDED.clicks,
  cost = EXCLUDED.cost,
  conversions = EXCLUDED.conversions;

-- -----------------------------------------------------------------------------
-- 7. CREATE PERFORMANCE DATA (last 30 days)
-- -----------------------------------------------------------------------------

-- Generate daily performance data for the primary Google Ads account
INSERT INTO performance_daily (ad_account_id, campaign_id, date, impressions, clicks, cost, conversions, conversion_value, avg_cpc, ctr, conversion_rate, roas, quality_score)
SELECT 
  '20000000-0000-0000-0000-000000000001',
  '30000000-0000-0000-0000-000000000001',
  (CURRENT_DATE - (n || ' days')::INTERVAL)::DATE,
  (7000 + floor(random() * 3000))::BIGINT,
  (500 + floor(random() * 200))::BIGINT,
  (250 + random() * 100)::DECIMAL(12,2),
  (25 + floor(random() * 15))::DECIMAL(12,2),
  (1200 + random() * 500)::DECIMAL(12,2),
  (0.45 + random() * 0.15)::DECIMAL(8,2),
  (0.065 + random() * 0.02)::DECIMAL(6,4),
  (0.045 + random() * 0.02)::DECIMAL(6,4),
  (4.5 + random() * 1.5)::DECIMAL(8,2),
  (7 + floor(random() * 3))::DECIMAL(4,2)
FROM generate_series(1, 30) AS n
ON CONFLICT (ad_account_id, campaign_id, date) DO UPDATE SET
  impressions = EXCLUDED.impressions,
  clicks = EXCLUDED.clicks,
  cost = EXCLUDED.cost;

-- Account-level performance (aggregated)
INSERT INTO performance_daily (ad_account_id, date, impressions, clicks, cost, conversions, conversion_value, avg_cpc, ctr, conversion_rate, roas)
SELECT 
  '20000000-0000-0000-0000-000000000001',
  (CURRENT_DATE - (n || ' days')::INTERVAL)::DATE,
  (25000 + floor(random() * 10000))::BIGINT,
  (1800 + floor(random() * 600))::BIGINT,
  (1100 + random() * 400)::DECIMAL(12,2),
  (80 + floor(random() * 40))::DECIMAL(12,2),
  (4000 + random() * 2000)::DECIMAL(12,2),
  (0.55 + random() * 0.15)::DECIMAL(8,2),
  (0.07 + random() * 0.015)::DECIMAL(6,4),
  (0.04 + random() * 0.015)::DECIMAL(6,4),
  (3.8 + random() * 1.2)::DECIMAL(8,2)
FROM generate_series(1, 30) AS n
WHERE NOT EXISTS (
  SELECT 1 FROM performance_daily 
  WHERE ad_account_id = '20000000-0000-0000-0000-000000000001' 
  AND campaign_id IS NULL 
  AND date = (CURRENT_DATE - (n || ' days')::INTERVAL)::DATE
)
ON CONFLICT (ad_account_id, campaign_id, date) DO NOTHING;

-- Meta Ads performance
INSERT INTO performance_daily (ad_account_id, date, impressions, clicks, cost, conversions, conversion_value, avg_cpc, ctr, conversion_rate, roas)
SELECT 
  '20000000-0000-0000-0000-000000000003',
  (CURRENT_DATE - (n || ' days')::INTERVAL)::DATE,
  (45000 + floor(random() * 20000))::BIGINT,
  (2200 + floor(random() * 800))::BIGINT,
  (650 + random() * 250)::DECIMAL(12,2),
  (50 + floor(random() * 30))::DECIMAL(12,2),
  (2500 + random() * 1500)::DECIMAL(12,2),
  (0.28 + random() * 0.08)::DECIMAL(8,2),
  (0.045 + random() * 0.015)::DECIMAL(6,4),
  (0.022 + random() * 0.01)::DECIMAL(6,4),
  (3.5 + random() * 1.0)::DECIMAL(8,2)
FROM generate_series(1, 30) AS n
ON CONFLICT (ad_account_id, campaign_id, date) DO UPDATE SET
  impressions = EXCLUDED.impressions,
  clicks = EXCLUDED.clicks,
  cost = EXCLUDED.cost;

-- -----------------------------------------------------------------------------
-- 8. CREATE ALERTS
-- -----------------------------------------------------------------------------

-- Active alerts
INSERT INTO alerts (id, ad_account_id, campaign_id, type, level, title, message, metric_name, metric_value, threshold_value, status, created_at)
VALUES 
  (
    '40000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000002',
    'cpc_change',
    'warning',
    'CPC increased by 23%',
    'The average CPC for "Non-Brand - Product Categories" has increased from $0.45 to $0.55 over the last 7 days.',
    'avg_cpc',
    0.55,
    0.45,
    'active',
    NOW() - INTERVAL '2 hours'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000003',
    NULL,
    'budget_pacing',
    'critical',
    'Budget pacing ahead of schedule',
    'Meta Ads account is spending 18% faster than the daily budget allows. At this rate, budget will be exhausted 5 days early.',
    'spend_rate',
    1.18,
    1.00,
    'active',
    NOW() - INTERVAL '30 minutes'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000006',
    NULL,
    'quality_score',
    'critical',
    'Account health critically low',
    'Amazon Ads account audit score has dropped to 45. Multiple optimization opportunities identified.',
    'audit_score',
    45,
    60,
    'active',
    NOW() - INTERVAL '1 day'
  ),
  (
    '40000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000003',
    'conversion_drop',
    'warning',
    'Conversion rate dropped 15%',
    'Shopping campaign conversion rate decreased from 3.2% to 2.7% compared to the previous week.',
    'conversion_rate',
    0.027,
    0.032,
    'active',
    NOW() - INTERVAL '4 hours'
  )
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  metric_value = EXCLUDED.metric_value;

-- Resolved alerts (for history)
INSERT INTO alerts (id, ad_account_id, campaign_id, type, level, title, message, status, acknowledged_by, acknowledged_at, resolved_at, created_at)
VALUES 
  (
    '40000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000001',
    'spend_spike',
    'info',
    'Unusual spend increase detected',
    'Brand campaign spend increased by 35% compared to the same day last week. This coincided with a competitor going offline.',
    'resolved',
    '00000000-0000-0000-0000-000000000001',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '3 days'
  )
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 9. CREATE SUGGESTIONS
-- -----------------------------------------------------------------------------

INSERT INTO suggestions (id, ad_account_id, campaign_id, type, priority, title, description, impact_estimate, details, status, created_at)
VALUES 
  (
    '50000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000002',
    'negative_keyword_conflict',
    'high',
    '12 negative keywords blocking valuable traffic',
    'Your account-level negative keyword list is blocking search terms that have historically converted well.',
    'Potential +$2,400/month in conversion value',
    '{"conflicts": [{"negative": "free", "blocking": "free trial software", "monthly_searches": 12000}, {"negative": "cheap", "blocking": "cheap enterprise solutions", "monthly_searches": 8500}]}',
    'pending',
    NOW() - INTERVAL '1 day'
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000003',
    'bid_adjustment',
    'medium',
    'Increase mobile bid adjustments',
    'Mobile devices show 28% higher conversion rate but receive 15% less impression share. Consider increasing mobile bid adjustments.',
    'Estimated +18% conversions',
    '{"current_mobile_adjustment": 0, "recommended_adjustment": 25, "mobile_conversion_rate": 0.038, "desktop_conversion_rate": 0.029}',
    'pending',
    NOW() - INTERVAL '12 hours'
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000006',
    'audience_expansion',
    'medium',
    'Expand lookalike audience threshold',
    'Current 1% lookalike is showing audience fatigue. Consider expanding to 2-3% to maintain frequency under 4.',
    'Reach +45% more users',
    '{"current_audience_size": 2100000, "current_frequency": 5.2, "recommended_threshold": "2%", "estimated_new_size": 3800000}',
    'pending',
    NOW() - INTERVAL '6 hours'
  ),
  (
    '50000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000004',
    'budget_reallocation',
    'high',
    'Reallocate budget from Display to PMax',
    'Performance Max is outperforming Display remarketing by 2.3x ROAS. Consider shifting $200/day from Display.',
    'Estimated +$1,200/week in revenue',
    '{"display_roas": 1.8, "pmax_roas": 4.1, "recommended_shift": 200}',
    'pending',
    NOW() - INTERVAL '2 days'
  )
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  details = EXCLUDED.details;

-- -----------------------------------------------------------------------------
-- 10. CREATE ALERT CONFIGS
-- -----------------------------------------------------------------------------

INSERT INTO alert_configs (id, workspace_id, ad_account_id, created_by, name, type, level, metric, threshold_value, threshold_type, lookback_period, notify_email, notify_slack, is_enabled)
VALUES 
  (
    '60000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    NULL,
    '00000000-0000-0000-0000-000000000001',
    'Budget Pacing Alert',
    'budget_pacing',
    'warning',
    'spend_rate',
    1.15,
    'above',
    '24h',
    true,
    true,
    true
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'CPC Spike Detection',
    'cpc_change',
    'warning',
    'avg_cpc',
    0.20,
    'change_percent',
    '7d',
    true,
    false,
    true
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    NULL,
    '00000000-0000-0000-0000-000000000001',
    'Conversion Drop Alert',
    'conversion_drop',
    'critical',
    'conversions',
    0.25,
    'change_percent',
    '7d',
    true,
    true,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  is_enabled = EXCLUDED.is_enabled;

-- -----------------------------------------------------------------------------
-- 11. CREATE AUTOMATION RULES
-- -----------------------------------------------------------------------------

INSERT INTO automation_rules (id, workspace_id, ad_account_id, created_by, name, description, trigger_type, trigger_config, action_type, action_config, is_enabled, run_count)
VALUES 
  (
    '70000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Pause Low Performers',
    'Automatically pause keywords with CTR < 1% and > 100 impressions',
    'schedule',
    '{"schedule": "daily", "time": "06:00", "timezone": "America/New_York"}',
    'pause_campaign',
    '{"conditions": {"ctr": {"lt": 0.01}, "impressions": {"gt": 100}}, "entity": "keyword"}',
    true,
    45
  ),
  (
    '70000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    NULL,
    '00000000-0000-0000-0000-000000000001',
    'Weekend Budget Adjustment',
    'Reduce budgets by 20% on weekends when B2B traffic drops',
    'schedule',
    '{"schedule": "weekly", "days": ["saturday", "sunday"], "time": "00:00"}',
    'adjust_budget',
    '{"adjustment_type": "percent", "value": -20, "scope": "account"}',
    true,
    12
  ),
  (
    '70000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'High Frequency Alert',
    'Alert when ad frequency exceeds 5 in any ad set',
    'metric_threshold',
    '{"metric": "frequency", "threshold": 5, "operator": "gt"}',
    'send_alert',
    '{"channels": ["email", "slack"], "template": "frequency_warning"}',
    true,
    8
  )
ON CONFLICT (id) DO UPDATE SET
  run_count = EXCLUDED.run_count;

-- -----------------------------------------------------------------------------
-- 12. CREATE AUDIT SCORES
-- -----------------------------------------------------------------------------

INSERT INTO audit_scores (id, ad_account_id, overall_score, previous_score, campaigns_score, ad_groups_score, keywords_score, ads_score, performance_score, pmax_score, findings, recommendations)
VALUES 
  (
    '80000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    78,
    75,
    85,
    72,
    68,
    82,
    88,
    71,
    '{"issues": [{"category": "keywords", "severity": "medium", "description": "23 keywords have Quality Score below 5"}, {"category": "ad_groups", "severity": "low", "description": "7 ad groups have fewer than 3 ads"}]}',
    '{"actions": [{"priority": "high", "action": "Review and improve low QS keywords", "impact": "+12% impression share"}, {"priority": "medium", "action": "Add responsive search ads to thin ad groups", "impact": "+8% CTR"}]}'
  ),
  (
    '80000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000003',
    65,
    68,
    70,
    62,
    NULL,
    58,
    72,
    NULL,
    '{"issues": [{"category": "ads", "severity": "high", "description": "Ad fatigue detected - 4 ads showing frequency > 6"}, {"category": "targeting", "severity": "medium", "description": "Audience overlap of 35% between 2 ad sets"}]}',
    '{"actions": [{"priority": "high", "action": "Refresh creative assets", "impact": "-25% CPM"}, {"priority": "high", "action": "Consolidate overlapping audiences", "impact": "+15% reach efficiency"}]}'
  ),
  (
    '80000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000006',
    45,
    52,
    38,
    42,
    55,
    41,
    48,
    NULL,
    '{"issues": [{"category": "campaigns", "severity": "critical", "description": "Budget not being fully utilized - only 67% delivery"}, {"category": "keywords", "severity": "high", "description": "45% of keywords have no impressions in last 30 days"}, {"category": "ads", "severity": "critical", "description": "3 ad groups have disapproved ads"}]}',
    '{"actions": [{"priority": "critical", "action": "Fix disapproved ads immediately", "impact": "Restore 100% delivery"}, {"priority": "high", "action": "Remove or restructure zero-impression keywords", "impact": "+22% budget efficiency"}]}'
  )
ON CONFLICT (id) DO UPDATE SET
  overall_score = EXCLUDED.overall_score,
  previous_score = EXCLUDED.previous_score,
  findings = EXCLUDED.findings;

-- -----------------------------------------------------------------------------
-- 13. CREATE NEGATIVE KEYWORD CONFLICTS
-- -----------------------------------------------------------------------------

INSERT INTO suggestions (id, ad_account_id, type, priority, title, description, status)
VALUES ('50000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', 'negative_keyword_conflict', 'high', 'Negative keyword conflicts detected', 'Review conflicting keywords', 'pending')
ON CONFLICT (id) DO NOTHING;

INSERT INTO negative_keyword_conflicts (id, suggestion_id, ad_account_id, negative_keyword, negative_source, conflicting_keyword, campaign_name, ad_group_name, status)
VALUES 
  (
    '90000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0000-000000000001',
    'free',
    'Account-level negative list',
    'free trial software',
    'Non-Brand - Product Categories',
    'Software Solutions',
    'pending'
  ),
  (
    '90000000-0000-0000-0000-000000000002',
    '50000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0000-000000000001',
    'cheap',
    'Account-level negative list',
    'affordable enterprise software',
    'Non-Brand - Product Categories',
    'Enterprise Solutions',
    'pending'
  ),
  (
    '90000000-0000-0000-0000-000000000003',
    '50000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0000-000000000001',
    'open source',
    'Campaign negative list',
    'open source alternative to [brand]',
    'Brand - Exact Match',
    'Brand Terms',
    'pending'
  )
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status;

-- -----------------------------------------------------------------------------
-- 14. RE-ENABLE TRIGGER FOR NEW USER SIGNUPS
-- -----------------------------------------------------------------------------

-- Re-create the trigger for future user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- -----------------------------------------------------------------------------
-- DONE! Summary of seeded data:
-- -----------------------------------------------------------------------------
-- • 2 test users (demo@draperads.com / demo1234, team@draperads.com / team1234)
-- • 3 workspaces (agency + personal + client)
-- • 6 ad accounts across Google, Meta, Microsoft, Amazon
-- • 11 campaigns with realistic metrics
-- • 30 days of performance data
-- • 5 alerts (4 active, 1 resolved)
-- • 4 optimization suggestions
-- • 3 alert configurations
-- • 3 automation rules
-- • 3 audit scores
-- • 3 negative keyword conflicts
-- -----------------------------------------------------------------------------

