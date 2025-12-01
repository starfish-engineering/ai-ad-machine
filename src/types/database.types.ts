/**
 * Database types generated from Supabase schema.
 * 
 * To regenerate:
 * 1. Start local Supabase: pnpm supabase:start
 * 2. Run: pnpm db:types
 * 
 * For now, these are placeholder types that will be replaced
 * once migrations are run and types are generated.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'admin' | 'agency' | 'freelancer' | 'enterprise' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'agency' | 'freelancer' | 'enterprise' | 'user';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'agency' | 'freelancer' | 'enterprise' | 'user';
          created_at?: string;
          updated_at?: string;
        };
      };
      campaigns: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'search' | 'shopping' | 'display' | 'social' | 'video';
          status: 'active' | 'paused' | 'completed' | 'draft';
          budget: number;
          spent: number;
          platform: 'google' | 'meta' | 'amazon' | 'microsoft' | 'linkedin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: 'search' | 'shopping' | 'display' | 'social' | 'video';
          status?: 'active' | 'paused' | 'completed' | 'draft';
          budget: number;
          spent?: number;
          platform: 'google' | 'meta' | 'amazon' | 'microsoft' | 'linkedin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: 'search' | 'shopping' | 'display' | 'social' | 'video';
          status?: 'active' | 'paused' | 'completed' | 'draft';
          budget?: number;
          spent?: number;
          platform?: 'google' | 'meta' | 'amazon' | 'microsoft' | 'linkedin';
          created_at?: string;
          updated_at?: string;
        };
      };
      automation_rules: {
        Row: {
          id: string;
          user_id: string;
          campaign_id: string | null;
          name: string;
          trigger_type: 'schedule' | 'threshold' | 'event';
          trigger_config: Json;
          action_type: 'pause' | 'adjust_bid' | 'adjust_budget' | 'alert' | 'report';
          action_config: Json;
          is_active: boolean;
          last_triggered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          campaign_id?: string | null;
          name: string;
          trigger_type: 'schedule' | 'threshold' | 'event';
          trigger_config: Json;
          action_type: 'pause' | 'adjust_bid' | 'adjust_budget' | 'alert' | 'report';
          action_config: Json;
          is_active?: boolean;
          last_triggered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          campaign_id?: string | null;
          name?: string;
          trigger_type?: 'schedule' | 'threshold' | 'event';
          trigger_config?: Json;
          action_type?: 'pause' | 'adjust_bid' | 'adjust_budget' | 'alert' | 'report';
          action_config?: Json;
          is_active?: boolean;
          last_triggered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'admin' | 'agency' | 'freelancer' | 'enterprise' | 'user';
      campaign_type: 'search' | 'shopping' | 'display' | 'social' | 'video';
      campaign_status: 'active' | 'paused' | 'completed' | 'draft';
      platform: 'google' | 'meta' | 'amazon' | 'microsoft' | 'linkedin';
    };
  };
}

// Convenience type aliases
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> = 
  Database['public']['Enums'][T];

// Entity type aliases
export type User = Tables<'users'>;
export type Campaign = Tables<'campaigns'>;
export type AutomationRule = Tables<'automation_rules'>;

