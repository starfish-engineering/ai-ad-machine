-- Row Level Security Policies
-- Ensures users can only access their organization's data

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE negative_keyword_conflicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE investigations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Get current user's organization ID
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
  SELECT organization_id FROM profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if user is org admin or owner
CREATE OR REPLACE FUNCTION is_org_admin()
RETURNS BOOLEAN AS $$
  SELECT role IN ('owner', 'admin') FROM profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================
-- ORGANIZATIONS
-- ============================================

-- Users can view their own organization
CREATE POLICY "Users can view own organization"
  ON organizations FOR SELECT
  USING (id = get_user_org_id());

-- Only owners can update organization
CREATE POLICY "Owners can update organization"
  ON organizations FOR UPDATE
  USING (id = get_user_org_id() AND is_org_admin());

-- ============================================
-- PROFILES
-- ============================================

-- Users can view profiles in their organization
CREATE POLICY "Users can view org profiles"
  ON profiles FOR SELECT
  USING (organization_id = get_user_org_id() OR id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

-- Admins can update any profile in their org
CREATE POLICY "Admins can update org profiles"
  ON profiles FOR UPDATE
  USING (organization_id = get_user_org_id() AND is_org_admin());

-- ============================================
-- AD ACCOUNTS
-- ============================================

-- Users can view ad accounts in their organization
CREATE POLICY "Users can view org ad accounts"
  ON ad_accounts FOR SELECT
  USING (organization_id = get_user_org_id());

-- Admins can insert ad accounts
CREATE POLICY "Admins can insert ad accounts"
  ON ad_accounts FOR INSERT
  WITH CHECK (organization_id = get_user_org_id() AND is_org_admin());

-- Admins can update ad accounts
CREATE POLICY "Admins can update ad accounts"
  ON ad_accounts FOR UPDATE
  USING (organization_id = get_user_org_id() AND is_org_admin());

-- Admins can delete ad accounts
CREATE POLICY "Admins can delete ad accounts"
  ON ad_accounts FOR DELETE
  USING (organization_id = get_user_org_id() AND is_org_admin());

-- ============================================
-- CAMPAIGNS
-- ============================================

-- Users can view campaigns for their org's ad accounts
CREATE POLICY "Users can view org campaigns"
  ON campaigns FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- System can insert/update campaigns (via service role)
CREATE POLICY "Service can manage campaigns"
  ON campaigns FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- PERFORMANCE DATA
-- ============================================

-- Users can view performance data for their org
CREATE POLICY "Users can view org performance"
  ON performance_daily FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- ============================================
-- ALERT CONFIGS
-- ============================================

-- Users can view alert configs in their org
CREATE POLICY "Users can view org alert configs"
  ON alert_configs FOR SELECT
  USING (organization_id = get_user_org_id());

-- Members can create alert configs
CREATE POLICY "Members can create alert configs"
  ON alert_configs FOR INSERT
  WITH CHECK (organization_id = get_user_org_id());

-- Members can update their own alert configs
CREATE POLICY "Members can update own alert configs"
  ON alert_configs FOR UPDATE
  USING (
    organization_id = get_user_org_id() AND 
    (created_by = auth.uid() OR is_org_admin())
  );

-- Members can delete their own alert configs
CREATE POLICY "Members can delete own alert configs"
  ON alert_configs FOR DELETE
  USING (
    organization_id = get_user_org_id() AND 
    (created_by = auth.uid() OR is_org_admin())
  );

-- ============================================
-- ALERTS
-- ============================================

-- Users can view alerts for their org's accounts
CREATE POLICY "Users can view org alerts"
  ON alerts FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- Users can update alerts (acknowledge, resolve)
CREATE POLICY "Users can update org alerts"
  ON alerts FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- ============================================
-- SUGGESTIONS
-- ============================================

-- Users can view suggestions for their org
CREATE POLICY "Users can view org suggestions"
  ON suggestions FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- Users can update suggestions (apply, dismiss)
CREATE POLICY "Users can update org suggestions"
  ON suggestions FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- ============================================
-- NEGATIVE KEYWORD CONFLICTS
-- ============================================

CREATE POLICY "Users can view org negative keyword conflicts"
  ON negative_keyword_conflicts FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

CREATE POLICY "Users can update org negative keyword conflicts"
  ON negative_keyword_conflicts FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- ============================================
-- AUTOMATION RULES
-- ============================================

CREATE POLICY "Users can view org automation rules"
  ON automation_rules FOR SELECT
  USING (organization_id = get_user_org_id());

CREATE POLICY "Members can create automation rules"
  ON automation_rules FOR INSERT
  WITH CHECK (organization_id = get_user_org_id());

CREATE POLICY "Members can update own automation rules"
  ON automation_rules FOR UPDATE
  USING (
    organization_id = get_user_org_id() AND 
    (created_by = auth.uid() OR is_org_admin())
  );

CREATE POLICY "Members can delete own automation rules"
  ON automation_rules FOR DELETE
  USING (
    organization_id = get_user_org_id() AND 
    (created_by = auth.uid() OR is_org_admin())
  );

-- ============================================
-- RULE EXECUTIONS
-- ============================================

CREATE POLICY "Users can view org rule executions"
  ON rule_executions FOR SELECT
  USING (
    rule_id IN (
      SELECT id FROM automation_rules WHERE organization_id = get_user_org_id()
    )
  );

-- ============================================
-- AUDIT SCORES
-- ============================================

CREATE POLICY "Users can view org audit scores"
  ON audit_scores FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

-- ============================================
-- INVESTIGATIONS
-- ============================================

CREATE POLICY "Users can view org investigations"
  ON investigations FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

CREATE POLICY "Users can create investigations"
  ON investigations FOR INSERT
  WITH CHECK (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    )
  );

CREATE POLICY "Users can update own investigations"
  ON investigations FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Users can delete own investigations"
  ON investigations FOR DELETE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE organization_id = get_user_org_id()
    ) AND created_by = auth.uid()
  );

