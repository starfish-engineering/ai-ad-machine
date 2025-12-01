-- Workspaces Migration
-- Evolves organizations into workspaces with multi-user support
-- This migration:
-- 1. Drops existing policies that depend on old functions
-- 2. Drops old helper functions
-- 3. Renames organizations → workspaces and updates schema
-- 4. Creates workspace_members junction table
-- 5. Creates new helper functions
-- 6. Creates new workspace-based RLS policies

-- ============================================
-- DROP EXISTING POLICIES (from 00002_rls_policies.sql)
-- ============================================

-- Organizations policies
DROP POLICY IF EXISTS "Users can view own organization" ON organizations;
DROP POLICY IF EXISTS "Owners can update organization" ON organizations;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view org profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update org profiles" ON profiles;

-- Ad accounts policies
DROP POLICY IF EXISTS "Users can view org ad accounts" ON ad_accounts;
DROP POLICY IF EXISTS "Admins can insert ad accounts" ON ad_accounts;
DROP POLICY IF EXISTS "Admins can update ad accounts" ON ad_accounts;
DROP POLICY IF EXISTS "Admins can delete ad accounts" ON ad_accounts;

-- Campaigns policies
DROP POLICY IF EXISTS "Users can view org campaigns" ON campaigns;
DROP POLICY IF EXISTS "Service can manage campaigns" ON campaigns;

-- Performance data policies
DROP POLICY IF EXISTS "Users can view org performance" ON performance_daily;

-- Alert configs policies
DROP POLICY IF EXISTS "Users can view org alert configs" ON alert_configs;
DROP POLICY IF EXISTS "Members can create alert configs" ON alert_configs;
DROP POLICY IF EXISTS "Members can update own alert configs" ON alert_configs;
DROP POLICY IF EXISTS "Members can delete own alert configs" ON alert_configs;

-- Alerts policies
DROP POLICY IF EXISTS "Users can view org alerts" ON alerts;
DROP POLICY IF EXISTS "Users can update org alerts" ON alerts;

-- Suggestions policies
DROP POLICY IF EXISTS "Users can view org suggestions" ON suggestions;
DROP POLICY IF EXISTS "Users can update org suggestions" ON suggestions;

-- Negative keyword conflicts policies
DROP POLICY IF EXISTS "Users can view org negative keyword conflicts" ON negative_keyword_conflicts;
DROP POLICY IF EXISTS "Users can update org negative keyword conflicts" ON negative_keyword_conflicts;

-- Automation rules policies
DROP POLICY IF EXISTS "Users can view org automation rules" ON automation_rules;
DROP POLICY IF EXISTS "Members can create automation rules" ON automation_rules;
DROP POLICY IF EXISTS "Members can update own automation rules" ON automation_rules;
DROP POLICY IF EXISTS "Members can delete own automation rules" ON automation_rules;

-- Rule executions policies
DROP POLICY IF EXISTS "Users can view org rule executions" ON rule_executions;

-- Audit scores policies
DROP POLICY IF EXISTS "Users can view org audit scores" ON audit_scores;

-- Investigations policies
DROP POLICY IF EXISTS "Users can view org investigations" ON investigations;
DROP POLICY IF EXISTS "Users can create investigations" ON investigations;
DROP POLICY IF EXISTS "Users can update own investigations" ON investigations;
DROP POLICY IF EXISTS "Users can delete own investigations" ON investigations;

-- ============================================
-- DROP OLD HELPER FUNCTIONS
-- ============================================

DROP FUNCTION IF EXISTS get_user_org_id();
DROP FUNCTION IF EXISTS is_org_admin();

-- ============================================
-- RENAME ORGANIZATIONS → WORKSPACES
-- ============================================

ALTER TABLE organizations RENAME TO workspaces;

-- Add workspace-specific columns
ALTER TABLE workspaces ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE workspaces ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE workspaces ADD COLUMN IF NOT EXISTS is_personal BOOLEAN DEFAULT false;
ALTER TABLE workspaces ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}';

-- ============================================
-- WORKSPACE MEMBERS (JUNCTION TABLE)
-- ============================================

CREATE TABLE workspace_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  is_default BOOLEAN DEFAULT false,
  notifications_enabled BOOLEAN DEFAULT true,
  invited_by UUID REFERENCES auth.users(id),
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);
CREATE INDEX idx_workspace_members_workspace ON workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_default ON workspace_members(user_id, is_default) WHERE is_default = true;

-- Enable RLS on workspace_members
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;

-- ============================================
-- WORKSPACE INVITATIONS
-- ============================================

CREATE TABLE workspace_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workspace_invitations_email ON workspace_invitations(email);
CREATE INDEX idx_workspace_invitations_token ON workspace_invitations(token);

-- Enable RLS on workspace_invitations
ALTER TABLE workspace_invitations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- UPDATE PROFILES TABLE
-- ============================================

ALTER TABLE profiles RENAME COLUMN organization_id TO current_workspace_id;

-- ============================================
-- UPDATE FOREIGN KEY REFERENCES
-- ============================================

ALTER TABLE ad_accounts RENAME COLUMN organization_id TO workspace_id;
ALTER TABLE alert_configs RENAME COLUMN organization_id TO workspace_id;
ALTER TABLE automation_rules RENAME COLUMN organization_id TO workspace_id;

-- ============================================
-- UPDATE INDEXES
-- ============================================

DROP INDEX IF EXISTS idx_ad_accounts_org;
CREATE INDEX idx_ad_accounts_workspace ON ad_accounts(workspace_id);

DROP INDEX IF EXISTS idx_alert_configs_org;
CREATE INDEX idx_alert_configs_workspace ON alert_configs(workspace_id);

-- ============================================
-- NEW HELPER FUNCTIONS
-- ============================================

-- Get current user's selected workspace ID
CREATE OR REPLACE FUNCTION get_current_workspace_id()
RETURNS UUID AS $$
  SELECT current_workspace_id FROM profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if user is a member of a workspace
CREATE OR REPLACE FUNCTION is_workspace_member(workspace_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members 
    WHERE workspace_id = workspace_uuid AND user_id = auth.uid()
  )
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if user is admin or owner of a workspace
CREATE OR REPLACE FUNCTION is_workspace_admin(workspace_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members 
    WHERE workspace_id = workspace_uuid 
      AND user_id = auth.uid() 
      AND role IN ('owner', 'admin')
  )
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Get all workspace IDs the user is a member of
CREATE OR REPLACE FUNCTION get_user_workspace_ids()
RETURNS SETOF UUID AS $$
  SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Get user's role in a workspace
CREATE OR REPLACE FUNCTION get_workspace_role(workspace_uuid UUID)
RETURNS TEXT AS $$
  SELECT role FROM workspace_members 
  WHERE workspace_id = workspace_uuid AND user_id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================
-- TRIGGERS
-- ============================================

CREATE TRIGGER update_workspace_members_updated_at
  BEFORE UPDATE ON workspace_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Ensure only one default workspace per user
CREATE OR REPLACE FUNCTION ensure_single_default_workspace()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE workspace_members 
    SET is_default = false 
    WHERE user_id = NEW.user_id 
      AND id != NEW.id 
      AND is_default = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_single_default_workspace
  BEFORE INSERT OR UPDATE ON workspace_members
  FOR EACH ROW
  WHEN (NEW.is_default = true)
  EXECUTE FUNCTION ensure_single_default_workspace();

-- Update handle_new_user to create workspace and membership
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_workspace_id UUID;
BEGIN
  -- Create profile
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Create personal workspace
  INSERT INTO workspaces (name, slug, is_personal)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)) || '''s Workspace',
    'ws-' || substr(NEW.id::text, 1, 8),
    true
  )
  RETURNING id INTO new_workspace_id;
  
  -- Add user as owner of their workspace
  INSERT INTO workspace_members (workspace_id, user_id, role, is_default)
  VALUES (new_workspace_id, NEW.id, 'owner', true);
  
  -- Set as current workspace
  UPDATE profiles SET current_workspace_id = new_workspace_id WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- MIGRATE EXISTING DATA
-- ============================================

-- Create workspace memberships for existing users with workspaces
INSERT INTO workspace_members (workspace_id, user_id, role, is_default)
SELECT 
  p.current_workspace_id,
  p.id,
  COALESCE(p.role, 'member'),
  true
FROM profiles p
WHERE p.current_workspace_id IS NOT NULL
ON CONFLICT (workspace_id, user_id) DO NOTHING;

-- ============================================
-- NEW WORKSPACE-BASED RLS POLICIES
-- ============================================

-- WORKSPACES
CREATE POLICY "Members can view workspaces they belong to"
  ON workspaces FOR SELECT
  USING (is_workspace_member(id));

CREATE POLICY "Admins can update workspaces"
  ON workspaces FOR UPDATE
  USING (is_workspace_admin(id));

CREATE POLICY "Authenticated users can create workspaces"
  ON workspaces FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- WORKSPACE MEMBERS
CREATE POLICY "Members can view workspace members"
  ON workspace_members FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "Admins can insert workspace members"
  ON workspace_members FOR INSERT
  WITH CHECK (is_workspace_admin(workspace_id));

CREATE POLICY "Admins can update workspace members"
  ON workspace_members FOR UPDATE
  USING (is_workspace_admin(workspace_id));

CREATE POLICY "Admins can delete workspace members"
  ON workspace_members FOR DELETE
  USING (is_workspace_admin(workspace_id) AND user_id != auth.uid());

-- Allow users to leave workspaces
CREATE POLICY "Users can remove themselves from workspaces"
  ON workspace_members FOR DELETE
  USING (user_id = auth.uid() AND role != 'owner');

-- WORKSPACE INVITATIONS
CREATE POLICY "Members can view workspace invitations"
  ON workspace_invitations FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "Admins can create invitations"
  ON workspace_invitations FOR INSERT
  WITH CHECK (is_workspace_admin(workspace_id));

CREATE POLICY "Admins can update invitations"
  ON workspace_invitations FOR UPDATE
  USING (is_workspace_admin(workspace_id));

CREATE POLICY "Admins can delete invitations"
  ON workspace_invitations FOR DELETE
  USING (is_workspace_admin(workspace_id));

-- Users can view invitations by token (for accepting)
CREATE POLICY "Anyone can view invitations by token"
  ON workspace_invitations FOR SELECT
  USING (true);

-- PROFILES
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can view profiles in their workspaces"
  ON profiles FOR SELECT
  USING (
    id IN (
      SELECT wm.user_id 
      FROM workspace_members wm 
      WHERE wm.workspace_id IN (SELECT get_user_workspace_ids())
    )
  );

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

-- AD ACCOUNTS
CREATE POLICY "Members can view workspace ad accounts"
  ON ad_accounts FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "Admins can insert ad accounts"
  ON ad_accounts FOR INSERT
  WITH CHECK (is_workspace_admin(workspace_id));

CREATE POLICY "Admins can update ad accounts"
  ON ad_accounts FOR UPDATE
  USING (is_workspace_admin(workspace_id));

CREATE POLICY "Admins can delete ad accounts"
  ON ad_accounts FOR DELETE
  USING (is_workspace_admin(workspace_id));

-- CAMPAIGNS
CREATE POLICY "Members can view workspace campaigns"
  ON campaigns FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

CREATE POLICY "Service role can manage campaigns"
  ON campaigns FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- PERFORMANCE DAILY
CREATE POLICY "Members can view workspace performance"
  ON performance_daily FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

-- ALERT CONFIGS
CREATE POLICY "Members can view workspace alert configs"
  ON alert_configs FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "Members can create alert configs"
  ON alert_configs FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id));

CREATE POLICY "Members can update own alert configs"
  ON alert_configs FOR UPDATE
  USING (
    is_workspace_member(workspace_id) AND 
    (created_by = auth.uid() OR is_workspace_admin(workspace_id))
  );

CREATE POLICY "Members can delete own alert configs"
  ON alert_configs FOR DELETE
  USING (
    is_workspace_member(workspace_id) AND 
    (created_by = auth.uid() OR is_workspace_admin(workspace_id))
  );

-- ALERTS
CREATE POLICY "Members can view workspace alerts"
  ON alerts FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

CREATE POLICY "Members can update workspace alerts"
  ON alerts FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

-- SUGGESTIONS
CREATE POLICY "Members can view workspace suggestions"
  ON suggestions FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

CREATE POLICY "Members can update workspace suggestions"
  ON suggestions FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

-- NEGATIVE KEYWORD CONFLICTS
CREATE POLICY "Members can view workspace negative keyword conflicts"
  ON negative_keyword_conflicts FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

CREATE POLICY "Members can update workspace negative keyword conflicts"
  ON negative_keyword_conflicts FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

-- AUTOMATION RULES
CREATE POLICY "Members can view workspace automation rules"
  ON automation_rules FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "Members can create automation rules"
  ON automation_rules FOR INSERT
  WITH CHECK (is_workspace_member(workspace_id));

CREATE POLICY "Members can update own automation rules"
  ON automation_rules FOR UPDATE
  USING (
    is_workspace_member(workspace_id) AND 
    (created_by = auth.uid() OR is_workspace_admin(workspace_id))
  );

CREATE POLICY "Members can delete own automation rules"
  ON automation_rules FOR DELETE
  USING (
    is_workspace_member(workspace_id) AND 
    (created_by = auth.uid() OR is_workspace_admin(workspace_id))
  );

-- RULE EXECUTIONS
CREATE POLICY "Members can view workspace rule executions"
  ON rule_executions FOR SELECT
  USING (
    rule_id IN (
      SELECT id FROM automation_rules WHERE is_workspace_member(workspace_id)
    )
  );

-- AUDIT SCORES
CREATE POLICY "Members can view workspace audit scores"
  ON audit_scores FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

-- INVESTIGATIONS
CREATE POLICY "Members can view workspace investigations"
  ON investigations FOR SELECT
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

CREATE POLICY "Members can create investigations"
  ON investigations FOR INSERT
  WITH CHECK (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    )
  );

CREATE POLICY "Users can update own investigations"
  ON investigations FOR UPDATE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Users can delete own investigations"
  ON investigations FOR DELETE
  USING (
    ad_account_id IN (
      SELECT id FROM ad_accounts WHERE is_workspace_member(workspace_id)
    ) AND created_by = auth.uid()
  );
