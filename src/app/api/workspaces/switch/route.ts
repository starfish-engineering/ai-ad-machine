import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import type { Workspace, WorkspaceMember } from '@/types/database.types';

// Type for the joined query result
interface WorkspaceMembershipQueryResult {
  role: WorkspaceMember['role'];
  is_default: boolean;
  joined_at: string;
  workspace: Workspace | null;
}

/**
 * POST /api/workspaces/switch
 * Switch to a different workspace
 */
export async function POST(request: Request) {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { workspaceId } = body;

  if (!workspaceId) {
    return NextResponse.json({ error: 'Workspace ID is required' }, { status: 400 });
  }

  // Verify user is a member of this workspace
  const { data: membership, error: membershipError } = await supabase
    .from('workspace_members')
    .select(`
      role,
      is_default,
      joined_at,
      workspace:workspaces (*)
    `)
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .single();

  // Cast to expected shape
  const typedMembership = membership as WorkspaceMembershipQueryResult | null;

  if (membershipError || !typedMembership?.workspace) {
    return NextResponse.json({ error: 'Workspace not found or access denied' }, { status: 404 });
  }

  // Update profile's current workspace
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ current_workspace_id: workspaceId } as { current_workspace_id: string })
    .eq('id', user.id);

  if (updateError) {
    console.error('Error switching workspace:', updateError);
    return NextResponse.json({ error: 'Failed to switch workspace' }, { status: 500 });
  }

  return NextResponse.json({
    ...typedMembership.workspace,
    membership: {
      role: typedMembership.role,
      is_default: typedMembership.is_default,
      joined_at: typedMembership.joined_at,
    },
  });
}


