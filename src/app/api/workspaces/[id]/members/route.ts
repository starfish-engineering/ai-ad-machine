import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import type { WorkspaceMember, Profile } from '@/types/database.types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Type for the member query result with profile join
interface MemberWithProfileResult {
  id: string;
  user_id: string;
  role: WorkspaceMember['role'];
  is_default: boolean;
  joined_at: string;
  created_at: string;
  profile: {
    full_name: string | null;
    avatar_url: string | null;
    job_title: string | null;
  } | null;
}

/**
 * GET /api/workspaces/[id]/members
 * List all members of a workspace
 */
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is a member of this workspace
  const { data: membership } = await supabase
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', id)
    .eq('user_id', user.id)
    .single() as { data: { role: WorkspaceMember['role'] } | null };

  if (!membership) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Get all members with their profiles
  const { data: members, error } = await supabase
    .from('workspace_members')
    .select(`
      id,
      user_id,
      role,
      is_default,
      joined_at,
      created_at,
      profile:profiles (
        full_name,
        avatar_url,
        job_title
      )
    `)
    .eq('workspace_id', id)
    .order('role');

  // Cast to expected shape
  const typedMembers = members as MemberWithProfileResult[] | null;

  if (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }

  return NextResponse.json(typedMembers);
}

/**
 * POST /api/workspaces/[id]/members
 * Invite a new member (admin only)
 */
export async function POST(request: Request, { params }: RouteParams) {
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
  const { email, role = 'member' } = body;

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!['admin', 'member', 'viewer'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  // Create invitation
  const { data: invitation, error } = await supabase
    .from('workspace_invitations')
    .insert({
      workspace_id: id,
      email: email.toLowerCase().trim(),
      role,
      invited_by: user.id,
    } as { workspace_id: string; email: string; role: string; invited_by: string })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      return NextResponse.json({ error: 'Invitation already pending for this email' }, { status: 409 });
    }
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
  }

  // TODO: Send invitation email
  // await sendInvitationEmail(email, invitation.token, workspace);

  return NextResponse.json(invitation, { status: 201 });
}


