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
 * GET /api/workspaces
 * List all workspaces the current user is a member of
 */
export async function GET() {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: memberships, error } = await supabase
    .from('workspace_members')
    .select(`
      role,
      is_default,
      joined_at,
      workspace:workspaces (*)
    `)
    .eq('user_id', user.id)
    .order('is_default', { ascending: false });
  
  // Cast to expected shape
  const typedMemberships = memberships as WorkspaceMembershipQueryResult[] | null;

  if (error) {
    console.error('Error fetching workspaces:', error);
    return NextResponse.json({ error: 'Failed to fetch workspaces' }, { status: 500 });
  }

  const workspaces = (typedMemberships ?? [])
    .filter((m): m is WorkspaceMembershipQueryResult & { workspace: Workspace } => m.workspace !== null)
    .map(m => ({
      ...m.workspace,
      membership: {
        role: m.role,
        is_default: m.is_default,
        joined_at: m.joined_at,
      },
    }));

  return NextResponse.json(workspaces);
}

/**
 * POST /api/workspaces
 * Create a new workspace
 */
export async function POST(request: Request) {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, description } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    + '-' + Math.random().toString(36).substring(2, 8);

  // Create workspace
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .insert({
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      is_personal: false,
    } as { name: string; slug: string; description: string | null; is_personal: boolean })
    .select()
    .single();

  if (workspaceError || !workspace) {
    console.error('Error creating workspace:', workspaceError);
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 });
  }

  const workspaceData = workspace as Workspace;

  // Add current user as owner
  const { error: memberError } = await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspaceData.id,
      user_id: user.id,
      role: 'owner',
      is_default: false,
    } as { workspace_id: string; user_id: string; role: string; is_default: boolean });

  if (memberError) {
    console.error('Error adding owner:', memberError);
    // Clean up workspace
    await supabase.from('workspaces').delete().eq('id', workspaceData.id);
    return NextResponse.json({ error: 'Failed to set up workspace' }, { status: 500 });
  }

  return NextResponse.json(workspaceData, { status: 201 });
}


