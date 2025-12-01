/**
 * Database types auto-generated from Supabase schema.
 * DO NOT EDIT MANUALLY - run: pnpm db:types
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ad_accounts: {
        Row: {
          access_token: string | null
          audit_score: number | null
          created_at: string | null
          currency: string | null
          current_spend: number | null
          health_status: string | null
          id: string
          is_favorite: boolean | null
          last_synced_at: string | null
          monthly_budget: number | null
          name: string
          platform: string
          platform_account_id: string
          refresh_token: string | null
          status: string | null
          timezone: string | null
          token_expires_at: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          access_token?: string | null
          audit_score?: number | null
          created_at?: string | null
          currency?: string | null
          current_spend?: number | null
          health_status?: string | null
          id?: string
          is_favorite?: boolean | null
          last_synced_at?: string | null
          monthly_budget?: number | null
          name: string
          platform: string
          platform_account_id: string
          refresh_token?: string | null
          status?: string | null
          timezone?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          access_token?: string | null
          audit_score?: number | null
          created_at?: string | null
          currency?: string | null
          current_spend?: number | null
          health_status?: string | null
          id?: string
          is_favorite?: boolean | null
          last_synced_at?: string | null
          monthly_budget?: number | null
          name?: string
          platform?: string
          platform_account_id?: string
          refresh_token?: string | null
          status?: string | null
          timezone?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_accounts_organization_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_configs: {
        Row: {
          ad_account_id: string | null
          created_at: string | null
          created_by: string | null
          deviation_allowed: number | null
          id: string
          is_enabled: boolean | null
          level: string | null
          lookback_period: string | null
          metric: string | null
          name: string
          notify_email: boolean | null
          notify_slack: boolean | null
          notify_users: string[] | null
          threshold_type: string | null
          threshold_value: number | null
          type: string
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          ad_account_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deviation_allowed?: number | null
          id?: string
          is_enabled?: boolean | null
          level?: string | null
          lookback_period?: string | null
          metric?: string | null
          name: string
          notify_email?: boolean | null
          notify_slack?: boolean | null
          notify_users?: string[] | null
          threshold_type?: string | null
          threshold_value?: number | null
          type: string
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          ad_account_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deviation_allowed?: number | null
          id?: string
          is_enabled?: boolean | null
          level?: string | null
          lookback_period?: string | null
          metric?: string | null
          name?: string
          notify_email?: boolean | null
          notify_slack?: boolean | null
          notify_users?: string[] | null
          threshold_type?: string | null
          threshold_value?: number | null
          type?: string
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_configs_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_configs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_configs_organization_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          ad_account_id: string
          alert_config_id: string | null
          campaign_id: string | null
          created_at: string | null
          id: string
          level: string | null
          message: string | null
          metric_name: string | null
          metric_value: number | null
          resolved_at: string | null
          snoozed_until: string | null
          status: string | null
          threshold_value: number | null
          title: string
          type: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          ad_account_id: string
          alert_config_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          level?: string | null
          message?: string | null
          metric_name?: string | null
          metric_value?: number | null
          resolved_at?: string | null
          snoozed_until?: string | null
          status?: string | null
          threshold_value?: number | null
          title: string
          type: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          ad_account_id?: string
          alert_config_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          level?: string | null
          message?: string | null
          metric_name?: string | null
          metric_value?: number | null
          resolved_at?: string | null
          snoozed_until?: string | null
          status?: string | null
          threshold_value?: number | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_acknowledged_by_fkey"
            columns: ["acknowledged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_alert_config_id_fkey"
            columns: ["alert_config_id"]
            isOneToOne: false
            referencedRelation: "alert_configs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_scores: {
        Row: {
          ad_account_id: string
          ad_groups_score: number | null
          ads_score: number | null
          campaigns_score: number | null
          created_at: string | null
          findings: Json | null
          id: string
          keywords_score: number | null
          overall_score: number | null
          performance_score: number | null
          pmax_score: number | null
          previous_score: number | null
          recommendations: Json | null
        }
        Insert: {
          ad_account_id: string
          ad_groups_score?: number | null
          ads_score?: number | null
          campaigns_score?: number | null
          created_at?: string | null
          findings?: Json | null
          id?: string
          keywords_score?: number | null
          overall_score?: number | null
          performance_score?: number | null
          pmax_score?: number | null
          previous_score?: number | null
          recommendations?: Json | null
        }
        Update: {
          ad_account_id?: string
          ad_groups_score?: number | null
          ads_score?: number | null
          campaigns_score?: number | null
          created_at?: string | null
          findings?: Json | null
          id?: string
          keywords_score?: number | null
          overall_score?: number | null
          performance_score?: number | null
          pmax_score?: number | null
          previous_score?: number | null
          recommendations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_scores_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          action_config: Json | null
          action_type: string | null
          ad_account_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_enabled: boolean | null
          last_run_at: string | null
          name: string
          next_run_at: string | null
          run_count: number | null
          trigger_config: Json | null
          trigger_type: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          action_config?: Json | null
          action_type?: string | null
          ad_account_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          last_run_at?: string | null
          name: string
          next_run_at?: string | null
          run_count?: number | null
          trigger_config?: Json | null
          trigger_type?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          action_config?: Json | null
          action_type?: string | null
          ad_account_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          last_run_at?: string | null
          name?: string
          next_run_at?: string | null
          run_count?: number | null
          trigger_config?: Json | null
          trigger_type?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_rules_organization_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          ad_account_id: string
          budget_amount: number | null
          budget_type: string | null
          clicks: number | null
          conversion_value: number | null
          conversions: number | null
          cost: number | null
          created_at: string | null
          id: string
          impressions: number | null
          name: string
          platform_campaign_id: string
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          ad_account_id: string
          budget_amount?: number | null
          budget_type?: string | null
          clicks?: number | null
          conversion_value?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          id?: string
          impressions?: number | null
          name: string
          platform_campaign_id: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          ad_account_id?: string
          budget_amount?: number | null
          budget_type?: string | null
          clicks?: number | null
          conversion_value?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          id?: string
          impressions?: number | null
          name?: string
          platform_campaign_id?: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      investigations: {
        Row: {
          ad_account_id: string
          ai_summary: string | null
          created_at: string | null
          created_by: string | null
          id: string
          is_saved: boolean | null
          name: string | null
          query_config: Json | null
          root_cause_tree: Json | null
          updated_at: string | null
        }
        Insert: {
          ad_account_id: string
          ai_summary?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_saved?: boolean | null
          name?: string | null
          query_config?: Json | null
          root_cause_tree?: Json | null
          updated_at?: string | null
        }
        Update: {
          ad_account_id?: string
          ai_summary?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_saved?: boolean | null
          name?: string | null
          query_config?: Json | null
          root_cause_tree?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investigations_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investigations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      negative_keyword_conflicts: {
        Row: {
          ad_account_id: string
          ad_group_name: string | null
          campaign_name: string | null
          conflicting_keyword: string
          created_at: string | null
          id: string
          negative_keyword: string
          negative_source: string | null
          resolved_at: string | null
          status: string | null
          suggestion_id: string
        }
        Insert: {
          ad_account_id: string
          ad_group_name?: string | null
          campaign_name?: string | null
          conflicting_keyword: string
          created_at?: string | null
          id?: string
          negative_keyword: string
          negative_source?: string | null
          resolved_at?: string | null
          status?: string | null
          suggestion_id: string
        }
        Update: {
          ad_account_id?: string
          ad_group_name?: string | null
          campaign_name?: string | null
          conflicting_keyword?: string
          created_at?: string | null
          id?: string
          negative_keyword?: string
          negative_source?: string | null
          resolved_at?: string | null
          status?: string | null
          suggestion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "negative_keyword_conflicts_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negative_keyword_conflicts_suggestion_id_fkey"
            columns: ["suggestion_id"]
            isOneToOne: false
            referencedRelation: "suggestions"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_daily: {
        Row: {
          ad_account_id: string
          avg_cpc: number | null
          campaign_id: string | null
          clicks: number | null
          conversion_rate: number | null
          conversion_value: number | null
          conversions: number | null
          cost: number | null
          created_at: string | null
          ctr: number | null
          date: string
          id: string
          impressions: number | null
          quality_score: number | null
          roas: number | null
        }
        Insert: {
          ad_account_id: string
          avg_cpc?: number | null
          campaign_id?: string | null
          clicks?: number | null
          conversion_rate?: number | null
          conversion_value?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          id?: string
          impressions?: number | null
          quality_score?: number | null
          roas?: number | null
        }
        Update: {
          ad_account_id?: string
          avg_cpc?: number | null
          campaign_id?: string | null
          clicks?: number | null
          conversion_rate?: number | null
          conversion_value?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          id?: string
          impressions?: number | null
          quality_score?: number | null
          roas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_daily_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_daily_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_workspace_id: string | null
          email_notifications: boolean | null
          full_name: string | null
          id: string
          job_title: string | null
          phone: string | null
          role: string | null
          slack_notifications: boolean | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_workspace_id?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id: string
          job_title?: string | null
          phone?: string | null
          role?: string | null
          slack_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_workspace_id?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          phone?: string | null
          role?: string | null
          slack_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["current_workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      rule_executions: {
        Row: {
          changes_made: Json | null
          completed_at: string | null
          id: string
          message: string | null
          rule_id: string
          started_at: string | null
          status: string | null
        }
        Insert: {
          changes_made?: Json | null
          completed_at?: string | null
          id?: string
          message?: string | null
          rule_id: string
          started_at?: string | null
          status?: string | null
        }
        Update: {
          changes_made?: Json | null
          completed_at?: string | null
          id?: string
          message?: string | null
          rule_id?: string
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rule_executions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      suggestions: {
        Row: {
          ad_account_id: string
          applied_at: string | null
          applied_by: string | null
          campaign_id: string | null
          created_at: string | null
          description: string | null
          details: Json | null
          dismissed_reason: string | null
          expires_at: string | null
          id: string
          impact_estimate: string | null
          priority: string | null
          status: string | null
          title: string
          type: string
        }
        Insert: {
          ad_account_id: string
          applied_at?: string | null
          applied_by?: string | null
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          details?: Json | null
          dismissed_reason?: string | null
          expires_at?: string | null
          id?: string
          impact_estimate?: string | null
          priority?: string | null
          status?: string | null
          title: string
          type: string
        }
        Update: {
          ad_account_id?: string
          applied_at?: string | null
          applied_by?: string | null
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          details?: Json | null
          dismissed_reason?: string | null
          expires_at?: string | null
          id?: string
          impact_estimate?: string | null
          priority?: string | null
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "suggestions_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suggestions_applied_by_fkey"
            columns: ["applied_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suggestions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_invitations: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string | null
          id: string
          invited_by: string
          role: string
          status: string | null
          token: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at?: string | null
          id?: string
          invited_by: string
          role?: string
          status?: string | null
          token?: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          invited_by?: string
          role?: string
          status?: string | null
          token?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_invitations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          created_at: string | null
          id: string
          invited_at: string | null
          invited_by: string | null
          is_default: boolean | null
          joined_at: string | null
          notifications_enabled: boolean | null
          role: string
          updated_at: string | null
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_default?: boolean | null
          joined_at?: string | null
          notifications_enabled?: boolean | null
          role?: string
          updated_at?: string | null
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_default?: boolean | null
          joined_at?: string | null
          notifications_enabled?: boolean | null
          role?: string
          updated_at?: string | null
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          billing_email: string | null
          created_at: string | null
          description: string | null
          id: string
          is_personal: boolean | null
          logo_url: string | null
          monthly_spend_limit: number | null
          name: string
          plan: string | null
          settings: Json | null
          slug: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          billing_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_personal?: boolean | null
          logo_url?: string | null
          monthly_spend_limit?: number | null
          name: string
          plan?: string | null
          settings?: Json | null
          slug: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_personal?: boolean | null
          logo_url?: string | null
          monthly_spend_limit?: number | null
          name?: string
          plan?: string | null
          settings?: Json | null
          slug?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_workspace_id: { Args: never; Returns: string }
      get_user_workspace_ids: { Args: never; Returns: string[] }
      get_workspace_role: { Args: { workspace_uuid: string }; Returns: string }
      is_workspace_admin: { Args: { workspace_uuid: string }; Returns: boolean }
      is_workspace_member: {
        Args: { workspace_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

// ===========================================
// TYPE ALIASES FOR CONVENIENCE
// ===========================================

export type Workspace = Tables<'workspaces'>;
export type WorkspaceMember = Tables<'workspace_members'>;
export type WorkspaceInvitation = Tables<'workspace_invitations'>;
export type Profile = Tables<'profiles'>;
export type AdAccount = Tables<'ad_accounts'>;
export type Campaign = Tables<'campaigns'>;
export type Alert = Tables<'alerts'>;
export type AlertConfig = Tables<'alert_configs'>;
export type Suggestion = Tables<'suggestions'>;
export type PerformanceDaily = Tables<'performance_daily'>;
export type AutomationRule = Tables<'automation_rules'>;
export type RuleExecution = Tables<'rule_executions'>;
export type AuditScore = Tables<'audit_scores'>;
export type Investigation = Tables<'investigations'>;
export type NegativeKeywordConflict = Tables<'negative_keyword_conflicts'>;

// Insert types
export type WorkspaceInsert = TablesInsert<'workspaces'>;
export type WorkspaceMemberInsert = TablesInsert<'workspace_members'>;
export type AdAccountInsert = TablesInsert<'ad_accounts'>;
export type CampaignInsert = TablesInsert<'campaigns'>;

// Update types
export type WorkspaceUpdate = TablesUpdate<'workspaces'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

// ===========================================
// COMPOSITE TYPES FOR UI
// ===========================================

/** Workspace with the current user's membership info */
export interface WorkspaceWithMembership extends Workspace {
  membership: {
    role: WorkspaceMember['role'];
    is_default: boolean | null;
    joined_at: string | null;
  };
}

/** Workspace member with profile details */
export interface WorkspaceMemberWithProfile extends WorkspaceMember {
  profile: Pick<Profile, 'full_name' | 'avatar_url' | 'job_title'> | null;
  email?: string;
}

/** Ad account with workspace info */
export interface AdAccountWithWorkspace extends AdAccount {
  workspace: Workspace | null;
}

/** Campaign with ad account info */
export interface CampaignWithAccount extends Campaign {
  ad_account: AdAccount | null;
}

/** Alert with related entities */
export interface AlertWithRelations extends Alert {
  campaign: Campaign | null;
  ad_account: AdAccount | null;
}

// ===========================================
// ROLE TYPES
// ===========================================

export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer';
export type Platform = 'google_ads' | 'meta_ads' | 'microsoft_ads' | 'amazon_ads';
export type AdAccountStatus = 'active' | 'paused' | 'disconnected' | 'error';
export type CampaignStatus = 'enabled' | 'paused' | 'removed' | 'ended';
export type CampaignType = 'search' | 'display' | 'shopping' | 'video' | 'pmax' | 'app' | 'smart';
export type AlertLevel = 'info' | 'warning' | 'critical';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'snoozed';
export type HealthStatus = 'healthy' | 'warning' | 'critical';
