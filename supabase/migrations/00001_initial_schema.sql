-- AdPilot Database Schema
-- Initial migration: Core tables for PPC management platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & ORGANIZATIONS
-- ============================================

-- Organizations (agencies, companies)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'essentials' CHECK (plan IN ('essentials', 'premium', 'enterprise')),
  billing_email TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  monthly_spend_limit DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  job_title TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  email_notifications BOOLEAN DEFAULT true,
  slack_notifications BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AD ACCOUNTS & PLATFORMS
-- ============================================

-- Connected ad platform accounts
CREATE TABLE ad_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('google_ads', 'meta_ads', 'microsoft_ads', 'amazon_ads')),
  platform_account_id TEXT NOT NULL,
  name TEXT NOT NULL,
  currency TEXT DEFAULT 'USD',
  timezone TEXT DEFAULT 'America/New_York',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'disconnected', 'error')),
  is_favorite BOOLEAN DEFAULT false,
  
  -- OAuth tokens (encrypted in production)
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  
  -- Cached metrics
  monthly_budget DECIMAL(12,2),
  current_spend DECIMAL(12,2) DEFAULT 0,
  audit_score INTEGER CHECK (audit_score >= 0 AND audit_score <= 100),
  health_status TEXT CHECK (health_status IN ('healthy', 'warning', 'critical')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,
  
  UNIQUE(organization_id, platform, platform_account_id)
);

-- ============================================
-- CAMPAIGNS & PERFORMANCE
-- ============================================

-- Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  platform_campaign_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('search', 'display', 'shopping', 'video', 'pmax', 'app', 'smart')),
  status TEXT DEFAULT 'enabled' CHECK (status IN ('enabled', 'paused', 'removed', 'ended')),
  budget_type TEXT CHECK (budget_type IN ('daily', 'lifetime', 'shared')),
  budget_amount DECIMAL(12,2),
  
  -- Performance metrics (cached)
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  cost DECIMAL(12,2) DEFAULT 0,
  conversions DECIMAL(12,2) DEFAULT 0,
  conversion_value DECIMAL(12,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(ad_account_id, platform_campaign_id)
);

-- Daily performance snapshots
CREATE TABLE performance_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  cost DECIMAL(12,2) DEFAULT 0,
  conversions DECIMAL(12,2) DEFAULT 0,
  conversion_value DECIMAL(12,2) DEFAULT 0,
  avg_cpc DECIMAL(8,2),
  ctr DECIMAL(6,4),
  conversion_rate DECIMAL(6,4),
  roas DECIMAL(8,2),
  quality_score DECIMAL(4,2),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(ad_account_id, campaign_id, date)
);

-- ============================================
-- ALERTS & MONITORING
-- ============================================

-- Alert configurations
CREATE TABLE alert_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  ad_account_id UUID REFERENCES ad_accounts(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'budget_pacing', 'spend_spike', 'cpc_change', 'ctr_drop',
    'conversion_drop', 'quality_score', 'impression_share', 'anomaly'
  )),
  level TEXT DEFAULT 'warning' CHECK (level IN ('info', 'warning', 'critical')),
  
  -- Thresholds
  metric TEXT,
  threshold_value DECIMAL(12,4),
  threshold_type TEXT CHECK (threshold_type IN ('above', 'below', 'change_percent')),
  deviation_allowed DECIMAL(6,2),
  lookback_period TEXT DEFAULT '24h',
  
  -- Notifications
  notify_email BOOLEAN DEFAULT true,
  notify_slack BOOLEAN DEFAULT false,
  notify_users UUID[],
  
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggered alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_config_id UUID REFERENCES alert_configs(id) ON DELETE SET NULL,
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  
  type TEXT NOT NULL,
  level TEXT DEFAULT 'warning',
  title TEXT NOT NULL,
  message TEXT,
  metric_name TEXT,
  metric_value DECIMAL(12,4),
  threshold_value DECIMAL(12,4),
  
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'snoozed')),
  acknowledged_by UUID REFERENCES profiles(id),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  snoozed_until TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- OPTIMIZATIONS & SUGGESTIONS
-- ============================================

-- Optimization suggestions
CREATE TABLE suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  
  type TEXT NOT NULL CHECK (type IN (
    'negative_keyword_conflict', 'add_keywords', 'pause_keywords',
    'budget_reallocation', 'bid_adjustment', 'ad_copy', 'landing_page',
    'impression_share', 'quality_score', 'audience_expansion'
  )),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  
  title TEXT NOT NULL,
  description TEXT,
  impact_estimate TEXT,
  
  -- Details stored as JSONB for flexibility
  details JSONB,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'dismissed', 'snoozed')),
  applied_by UUID REFERENCES profiles(id),
  applied_at TIMESTAMPTZ,
  dismissed_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Negative keyword conflicts (specific table for detail view)
CREATE TABLE negative_keyword_conflicts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  suggestion_id UUID NOT NULL REFERENCES suggestions(id) ON DELETE CASCADE,
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  
  negative_keyword TEXT NOT NULL,
  negative_source TEXT, -- campaign name or shared list name
  conflicting_keyword TEXT NOT NULL,
  campaign_name TEXT,
  ad_group_name TEXT,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'removed', 'paused', 'snoozed')),
  resolved_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AUTOMATION RULES
-- ============================================

-- Automation rules / workflows
CREATE TABLE automation_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  ad_account_id UUID REFERENCES ad_accounts(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  
  name TEXT NOT NULL,
  description TEXT,
  
  -- Trigger conditions (JSONB for flexibility)
  trigger_type TEXT CHECK (trigger_type IN ('schedule', 'metric_threshold', 'event')),
  trigger_config JSONB,
  
  -- Actions to take
  action_type TEXT CHECK (action_type IN (
    'pause_campaign', 'enable_campaign', 'adjust_bid', 'adjust_budget',
    'add_negative', 'send_alert', 'custom_script'
  )),
  action_config JSONB,
  
  is_enabled BOOLEAN DEFAULT true,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  run_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rule execution logs
CREATE TABLE rule_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_id UUID NOT NULL REFERENCES automation_rules(id) ON DELETE CASCADE,
  
  status TEXT CHECK (status IN ('success', 'failed', 'skipped')),
  message TEXT,
  changes_made JSONB,
  
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- AUDIT & ANALYSIS
-- ============================================

-- PPC Audit scores
CREATE TABLE audit_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  previous_score INTEGER,
  
  -- Category scores
  campaigns_score INTEGER,
  ad_groups_score INTEGER,
  keywords_score INTEGER,
  ads_score INTEGER,
  performance_score INTEGER,
  pmax_score INTEGER,
  
  -- Detailed findings
  findings JSONB,
  recommendations JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investigation sessions (PPC Investigator)
CREATE TABLE investigations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  
  name TEXT,
  query_config JSONB, -- filters, date range, metrics selected
  
  -- Root cause tree data
  root_cause_tree JSONB,
  ai_summary TEXT,
  
  is_saved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_ad_accounts_org ON ad_accounts(organization_id);
CREATE INDEX idx_campaigns_account ON campaigns(ad_account_id);
CREATE INDEX idx_performance_daily_account_date ON performance_daily(ad_account_id, date);
CREATE INDEX idx_alerts_account_status ON alerts(ad_account_id, status);
CREATE INDEX idx_suggestions_account_status ON suggestions(ad_account_id, status);
CREATE INDEX idx_alert_configs_org ON alert_configs(organization_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ad_accounts_updated_at
  BEFORE UPDATE ON ad_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_alert_configs_updated_at
  BEFORE UPDATE ON alert_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_automation_rules_updated_at
  BEFORE UPDATE ON automation_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
