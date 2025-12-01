import { createServerClient } from '@/lib/supabase/server';
import type { 
  Workspace, 
  WorkspaceMember, 
  WorkspaceWithMembership, 
  WorkspaceMemberWithProfile,
  WorkspaceRole
} from '@/types/database.types';

// Type for the joined query result
interface WorkspaceMembershipQueryResult {
  role: WorkspaceRole;
  is_default: boolean | null;
  joined_at: string | null;
  workspace: Workspace | null;
}

/**
 * Get the current user's workspace on the server
 * Returns the workspace from their profile's current_workspace_id
 */
export async function getWorkspaceServer(): Promise<WorkspaceWithMembership | null> {
  const supabase = await createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Get user's profile with current workspace
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_workspace_id')
    .eq('id', user.id)
    .single() as { data: { current_workspace_id: string | null } | null };

  if (!profile?.current_workspace_id) return null;

  // Get the workspace with membership info
  const { data: membership } = await supabase
    .from('workspace_members')
    .select(`
      role,
      is_default,
      joined_at,
      workspace:workspaces (*)
    `)
    .eq('workspace_id', profile.current_workspace_id)
    .eq('user_id', user.id)
    .single() as { data: WorkspaceMembershipQueryResult | null };

  if (!membership?.workspace) return null;

  return {
    ...membership.workspace,
    membership: {
      role: membership.role,
      is_default: membership.is_default,
      joined_at: membership.joined_at,
    },
  };
}

/**
 * Get all workspaces the current user is a member of
 */
export async function getUserWorkspacesServer(): Promise<WorkspaceWithMembership[]> {
  const supabase = await createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: memberships } = await supabase
    .from('workspace_members')
    .select(`
      role,
      is_default,
      joined_at,
      workspace:workspaces (*)
    `)
    .eq('user_id', user.id)
    .order('is_default', { ascending: false }) as { 
      data: WorkspaceMembershipQueryResult[] | null 
    };

  if (!memberships) return [];

  return memberships
    .filter((m): m is WorkspaceMembershipQueryResult & { workspace: Workspace } => m.workspace !== null)
    .map(m => ({
      ...m.workspace,
      membership: {
        role: m.role,
        is_default: m.is_default,
        joined_at: m.joined_at,
      },
    }));
}

/**
 * Get all members of a workspace
 */
export async function getWorkspaceMembersServer(
  workspaceId: string
): Promise<WorkspaceMemberWithProfile[]> {
  const supabase = await createServerClient();

  // First verify user has access to this workspace
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: membership } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .single() as { data: { role: WorkspaceMember['role'] } | null };

  if (!membership) return [];

  // Get all members with their profiles
  interface MemberWithProfileResult extends WorkspaceMember {
    profile: {
      full_name: string | null;
      avatar_url: string | null;
      job_title: string | null;
    } | null;
  }

  const { data: members } = await supabase
    .from('workspace_members')
    .select(`
      *,
      profile:profiles (
        full_name,
        avatar_url,
        job_title
      )
    `)
    .eq('workspace_id', workspaceId)
    .order('role', { ascending: true }) as { data: MemberWithProfileResult[] | null };

  if (!members) return [];

  return members.map(m => ({
    ...m,
    profile: m.profile ?? { full_name: null, avatar_url: null, job_title: null },
    email: '', // Email not available through this query
  }));
}

/**
 * Check if current user is admin of a workspace
 */
export async function isWorkspaceAdminServer(workspaceId: string): Promise<boolean> {
  const supabase = await createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: membership } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .single() as { data: { role: WorkspaceMember['role'] } | null };

  return membership?.role === 'owner' || membership?.role === 'admin';
}

/**
 * Switch current user's workspace
 */
export async function switchWorkspaceServer(workspaceId: string): Promise<boolean> {
  const supabase = await createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  // Verify user is a member of this workspace
  const { data: membership } = await supabase
    .from('workspace_members')
    .select('id')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .single() as { data: { id: string } | null };

  if (!membership) return false;

  // Update profile
  const { error } = await supabase
    .from('profiles')
    .update({ current_workspace_id: workspaceId } as { current_workspace_id: string })
    .eq('id', user.id);

  return !error;
}

