import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import type { Workspace, WorkspaceMember } from '@/types/database.types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Type for the joined query result
interface WorkspaceMembershipQueryResult {
  role: WorkspaceMember['role'];
  is_default: boolean;
  joined_at: string;
  workspace: Workspace | null;
}

/**
 * GET /api/workspaces/[id]
 * Get a specific workspace
 */
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check membership and get workspace
  const { data: membership, error } = await supabase
    .from('workspace_members')
    .select(`
      role,
      is_default,
      joined_at,
      workspace:workspaces (*)
    `)
    .eq('workspace_id', id)
    .eq('user_id', user.id)
    .single();

  // Cast to expected shape
  const typedMembership = membership as WorkspaceMembershipQueryResult | null;

  if (error || !typedMembership?.workspace) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
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

/**
 * PATCH /api/workspaces/[id]
 * Update a workspace (admin only)
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is admin
  const { data: membership } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', id)
    .eq('user_id', user.id)
    .single() as { data: { role: WorkspaceMember['role'] } | null };

  if (!membership || !['owner', 'admin'].includes(membership.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { name, description, logo_url, settings } = body;

  const updateData: Partial<Workspace> = {};
  if (name !== undefined) updateData.name = name.trim();
  if (description !== undefined) updateData.description = description?.trim() || null;
  if (logo_url !== undefined) updateData.logo_url = logo_url;
  if (settings !== undefined) updateData.settings = settings;

  const { data: workspace, error } = await supabase
    .from('workspaces')
    .update(updateData as Record<string, unknown>)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating workspace:', error);
    return NextResponse.json({ error: 'Failed to update workspace' }, { status: 500 });
  }

  return NextResponse.json(workspace);
}

/**
 * DELETE /api/workspaces/[id]
 * Delete a workspace (owner only)
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is owner
  const { data: membership } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', id)
    .eq('user_id', user.id)
    .single() as { data: { role: WorkspaceMember['role'] } | null };

  if (!membership || membership.role !== 'owner') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Check if this is a personal workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('is_personal')
    .eq('id', id)
    .single() as { data: { is_personal: boolean } | null };

  if (workspace?.is_personal) {
    return NextResponse.json({ error: 'Cannot delete personal workspace' }, { status: 400 });
  }

  const { error } = await supabase
    .from('workspaces')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting workspace:', error);
    return NextResponse.json({ error: 'Failed to delete workspace' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}


