'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import type { 
  Workspace, 
  WorkspaceMember,
  WorkspaceWithMembership,
  WorkspaceRole 
} from '@/types/database.types';

interface WorkspaceContextValue {
  workspace: WorkspaceWithMembership | null;
  workspaceId: string | null;
  workspaces: WorkspaceWithMembership[];
  isLoading: boolean;
  isInitialized: boolean;
  role: WorkspaceMember['role'] | null;
  isOwner: boolean;
  isAdmin: boolean;
  canManageMembers: boolean;
  canManageSettings: boolean;
  switchWorkspace: (workspaceId: string) => Promise<void>;
  refreshWorkspaces: () => Promise<void>;
  createWorkspace: (name: string) => Promise<Workspace | null>;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);
const WORKSPACE_STORAGE_KEY = 'adpilot_current_workspace';

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<WorkspaceWithMembership[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const supabase = createBrowserClient();

  const workspace = workspaces.find(w => w.id === currentWorkspaceId) ?? null;
  const role = workspace?.membership.role ?? null;
  const isOwner = role === 'owner';
  const isAdmin = role === 'owner' || role === 'admin';
  const canManageMembers = isAdmin;
  const canManageSettings = isAdmin;

  const fetchWorkspaces = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setWorkspaces([]);
        setCurrentWorkspaceId(null);
        return;
      }

      const { data: memberships, error: membershipError } = await (supabase as any)
        .from('workspace_members')
        .select('role, is_default, joined_at, workspace:workspaces (*)')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (membershipError) {
        console.error('Error fetching workspaces:', membershipError);
        return;
      }

      const workspacesWithMembership: WorkspaceWithMembership[] = (memberships ?? [])
        .filter((m: any) => m.workspace)
        .map((m: any) => ({
          ...m.workspace,
          membership: {
            role: m.role,
            is_default: m.is_default,
            joined_at: m.joined_at,
          },
        }));

      setWorkspaces(workspacesWithMembership);

      const storedWorkspaceId = typeof window !== 'undefined' 
        ? localStorage.getItem(WORKSPACE_STORAGE_KEY) 
        : null;
      const defaultWorkspace = workspacesWithMembership.find(w => w.membership.is_default);
      
      let targetWorkspaceId = storedWorkspaceId;
      
      if (storedWorkspaceId && !workspacesWithMembership.find(w => w.id === storedWorkspaceId)) {
        targetWorkspaceId = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem(WORKSPACE_STORAGE_KEY);
        }
      }
      
      if (!targetWorkspaceId) {
        targetWorkspaceId = defaultWorkspace?.id ?? workspacesWithMembership[0]?.id ?? null;
      }

      if (targetWorkspaceId) {
        setCurrentWorkspaceId(targetWorkspaceId);
        if (typeof window !== 'undefined') {
          localStorage.setItem(WORKSPACE_STORAGE_KEY, targetWorkspaceId);
        }
        
        await (supabase as any)
          .from('profiles')
          .update({ current_workspace_id: targetWorkspaceId })
          .eq('id', user.id);
      }
    } catch (error) {
      console.error('Error in fetchWorkspaces:', error);
    }
  }, [supabase]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await fetchWorkspaces();
      setIsLoading(false);
      setIsInitialized(true);
    };
    init();
  }, [fetchWorkspaces]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        await fetchWorkspaces();
      } else if (event === 'SIGNED_OUT') {
        setWorkspaces([]);
        setCurrentWorkspaceId(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(WORKSPACE_STORAGE_KEY);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase, fetchWorkspaces]);

  const switchWorkspace = useCallback(async (workspaceId: string) => {
    const targetWorkspace = workspaces.find(w => w.id === workspaceId);
    if (!targetWorkspace) {
      console.error('Workspace not found:', workspaceId);
      return;
    }

    setCurrentWorkspaceId(workspaceId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, workspaceId);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await (supabase as any)
        .from('profiles')
        .update({ current_workspace_id: workspaceId })
        .eq('id', user.id);
    }
  }, [workspaces, supabase]);

  const refreshWorkspaces = useCallback(async () => {
    setIsLoading(true);
    await fetchWorkspaces();
    setIsLoading(false);
  }, [fetchWorkspaces]);

  const createWorkspace = useCallback(async (name: string): Promise<Workspace | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        + '-' + Math.random().toString(36).substring(2, 8);

      const { data: workspace, error: workspaceError } = await (supabase as any)
        .from('workspaces')
        .insert({ name, slug, is_personal: false })
        .select()
        .single();

      if (workspaceError || !workspace) {
        console.error('Error creating workspace:', workspaceError);
        return null;
      }

      const { error: memberError } = await (supabase as any)
        .from('workspace_members')
        .insert({
          workspace_id: workspace.id,
          user_id: user.id,
          role: 'owner',
          is_default: false,
        });

      if (memberError) {
        console.error('Error adding member:', memberError);
        await (supabase as any).from('workspaces').delete().eq('id', workspace.id);
        return null;
      }

      await fetchWorkspaces();
      return workspace as Workspace;
    } catch (error) {
      console.error('Error in createWorkspace:', error);
      return null;
    }
  }, [supabase, fetchWorkspaces]);

  const value: WorkspaceContextValue = {
    workspace,
    workspaceId: currentWorkspaceId,
    workspaces,
    isLoading,
    isInitialized,
    role,
    isOwner,
    isAdmin,
    canManageMembers,
    canManageSettings,
    switchWorkspace,
    refreshWorkspaces,
    createWorkspace,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}

export function useRequiredWorkspace() {
  const { workspace, workspaceId, isLoading, isInitialized } = useWorkspace();
  
  if (!isInitialized || isLoading) {
    return { workspace: null, workspaceId: null, isLoading: true };
  }
  
  if (!workspace || !workspaceId) {
    throw new Error('No workspace available');
  }
  
  return { workspace, workspaceId, isLoading: false };
}
