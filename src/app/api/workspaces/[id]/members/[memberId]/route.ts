import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import type { WorkspaceMember } from '@/types/database.types';

interface RouteParams {
  params: Promise<{ id: string; memberId: string }>;
}

/**
 * PATCH /api/workspaces/[id]/members/[memberId]
 * Update a member's role (admin only)
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  const { id, memberId } = await params;
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is admin
  const { data: userMembership } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', id)
    .eq('user_id', user.id)
    .single() as { data: { role: WorkspaceMember['role'] } | null };

  if (!userMembership || !['owner', 'admin'].includes(userMembership.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Get the target member
  const { data: targetMember } = await supabase
    .from('workspace_members')
    .select('role, user_id')
    .eq('id', memberId)
    .eq('workspace_id', id)
    .single() as { data: { role: WorkspaceMember['role']; user_id: string } | null };

  if (!targetMember) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  // Cannot modify owner unless you are the owner
  if (targetMember.role === 'owner' && userMembership.role !== 'owner') {
    return NextResponse.json({ error: 'Cannot modify owner' }, { status: 403 });
  }

  const body = await request.json();
  const { role } = body;

  // Validate role
  const allowedRoles = userMembership.role === 'owner' 
    ? ['owner', 'admin', 'member', 'viewer']
    : ['admin', 'member', 'viewer'];

  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  // If transferring ownership, demote current owner
  if (role === 'owner' && userMembership.role === 'owner') {
    await supabase
      .from('workspace_members')
      .update({ role: 'admin' } as { role: string })
      .eq('workspace_id', id)
      .eq('user_id', user.id);
  }

  const { data: member, error } = await supabase
    .from('workspace_members')
    .update({ role } as { role: string })
    .eq('id', memberId)
    .select()
    .single();

  if (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }

  return NextResponse.json(member);
}

/**
 * DELETE /api/workspaces/[id]/members/[memberId]
 * Remove a member from workspace
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id, memberId } = await params;
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get the target member
  const { data: targetMember } = await supabase
    .from('workspace_members')
    .select('role, user_id')
    .eq('id', memberId)
    .eq('workspace_id', id)
    .single() as { data: { role: WorkspaceMember['role']; user_id: string } | null };

  if (!targetMember) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  // Cannot remove owner
  if (targetMember.role === 'owner') {
    return NextResponse.json({ error: 'Cannot remove owner' }, { status: 403 });
  }

  // Check if user is admin or removing themselves
  const isRemovingSelf = targetMember.user_id === user.id;
  
  if (!isRemovingSelf) {
    const { data: userMembership } = await supabase
      .from('workspace_members')
      .select('role')
      .eq('workspace_id', id)
      .eq('user_id', user.id)
      .single() as { data: { role: WorkspaceMember['role'] } | null };

    if (!userMembership || !['owner', 'admin'].includes(userMembership.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const { error } = await supabase
    .from('workspace_members')
    .delete()
    .eq('id', memberId);

  if (error) {
    console.error('Error removing member:', error);
    return NextResponse.json({ error: 'Failed to remove member' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}


