'use client';

import { useState, useRef, useEffect } from 'react';
import { useWorkspace } from '@/lib/workspace';
import type { WorkspaceWithMembership } from '@/types/database.types';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  Check,
  Plus,
  Settings,
  Users,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface WorkspaceSwitcherProps {
  className?: string;
  collapsed?: boolean;
}

export function WorkspaceSwitcher({ className, collapsed }: WorkspaceSwitcherProps) {
  const {
    workspace,
    workspaces,
    isLoading,
    switchWorkspace,
    createWorkspace,
    role,
  } = useWorkspace();

  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  const handleSwitchWorkspace = async (ws: WorkspaceWithMembership): Promise<void> => {
    if (ws.id === workspace?.id) {
      setIsOpen(false);
      return;
    }
    await switchWorkspace(ws.id);
    setIsOpen(false);
  };

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim() || isSaving) return;
    setIsSaving(true);
    const newWorkspace = await createWorkspace(newWorkspaceName.trim());
    setIsSaving(false);
    if (newWorkspace) {
      setNewWorkspaceName('');
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  const getRoleColor = (memberRole: string) => {
    switch (memberRole) {
      case 'owner': return 'text-[var(--color-signal-yellow)]';
      case 'admin': return 'text-[var(--color-signal-cyan)]';
      case 'member': return 'text-[var(--color-signal-green)]';
      default: return 'text-[var(--color-text-dim)]';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className={cn('flex items-center gap-3 px-3 py-2', className)}>
        <div className="w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] flex items-center justify-center animate-pulse">
          <Loader2 className="w-4 h-4 text-[var(--color-text-dim)] animate-spin" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="h-3 w-24 bg-[var(--color-surface)] animate-pulse" />
            <div className="h-2 w-16 bg-[var(--color-surface)] animate-pulse mt-1" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-3 w-full px-3 py-2.5 transition-colors',
          'border border-[var(--color-border-harsh)] bg-[var(--color-surface)]',
          'hover:border-[var(--color-signal-green)] hover:bg-[var(--color-terminal)]',
          isOpen && 'border-[var(--color-signal-green)] bg-[var(--color-terminal)]'
        )}
      >
        <div className="w-8 h-8 bg-[var(--color-void)] border border-[var(--color-signal-green)] flex items-center justify-center flex-shrink-0">
          {workspace?.logo_url ? (
            <img src={workspace.logo_url} alt={workspace.name} className="w-full h-full object-cover" />
          ) : workspace?.is_personal ? (
            <Sparkles className="w-4 h-4 text-[var(--color-signal-yellow)]" />
          ) : (
            <span className="text-[9px] font-mono font-bold text-[var(--color-signal-green)]">
              {workspace ? getInitials(workspace.name) : '??'}
            </span>
          )}
        </div>

        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)] truncate">
                {workspace?.name ?? 'SELECT_WORKSPACE'}
              </p>
              <p className="text-[8px] font-mono text-[var(--color-text-dim)] truncate flex items-center gap-1">
                <span className={getRoleColor(role ?? '')}>{role?.toUpperCase() ?? 'NO_ROLE'}</span>
                <span className="text-[var(--color-text-dim)]">•</span>
                <span>{workspace?.plan?.toUpperCase() ?? 'FREE'}</span>
              </p>
            </div>
            <ChevronDown className={cn('w-3 h-3 text-[var(--color-text-muted)] transition-transform flex-shrink-0', isOpen && 'rotate-180')} />
          </>
        )}
      </button>

      {isOpen && !collapsed && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] shadow-lg">
          <div className="px-3 py-2 border-b border-[var(--color-border-harsh)]">
            <p className="text-[9px] font-mono text-[var(--color-text-dim)] tracking-wider">WORKSPACES ({workspaces.length})</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => handleSwitchWorkspace(ws)}
                className={cn(
                  'flex items-center gap-3 w-full px-3 py-2.5 transition-colors hover:bg-[var(--color-surface)]',
                  ws.id === workspace?.id && 'bg-[var(--color-signal-green)]/10'
                )}
              >
                <div className="w-7 h-7 bg-[var(--color-void)] border border-[var(--color-border-harsh)] flex items-center justify-center flex-shrink-0">
                  {ws.logo_url ? (
                    <img src={ws.logo_url} alt={ws.name} className="w-full h-full object-cover" />
                  ) : ws.is_personal ? (
                    <Sparkles className="w-3 h-3 text-[var(--color-signal-yellow)]" />
                  ) : (
                    <span className="text-[8px] font-mono font-bold text-[var(--color-text-raw)]">{getInitials(ws.name)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] font-mono font-bold text-[var(--color-text-raw)] truncate">{ws.name}</p>
                  <p className="text-[8px] font-mono text-[var(--color-text-dim)]">
                    <span className={getRoleColor(ws.membership.role)}>{ws.membership.role.toUpperCase()}</span>
                  </p>
                </div>
                {ws.id === workspace?.id && <Check className="w-4 h-4 text-[var(--color-signal-green)] flex-shrink-0" />}
              </button>
            ))}
          </div>
          <div className="border-t border-[var(--color-border-harsh)]">
            {isCreating ? (
              <div className="p-3 space-y-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateWorkspace();
                    if (e.key === 'Escape') setIsCreating(false);
                  }}
                  placeholder="Workspace name..."
                  className="w-full px-2 py-1.5 text-[10px] font-mono bg-[var(--color-void)] border border-[var(--color-border-harsh)] text-[var(--color-text-raw)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-signal-green)] focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateWorkspace}
                    disabled={!newWorkspaceName.trim() || isSaving}
                    className="flex-1 px-2 py-1.5 text-[9px] font-mono font-bold bg-[var(--color-signal-green)] text-[var(--color-void)] hover:bg-[var(--color-signal-green)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSaving ? 'CREATING...' : 'CREATE'}
                  </button>
                  <button
                    onClick={() => { setIsCreating(false); setNewWorkspaceName(''); }}
                    className="px-2 py-1.5 text-[9px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-raw)] border border-[var(--color-border-harsh)] hover:border-[var(--color-text-muted)] transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-[10px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-signal-green)] hover:bg-[var(--color-surface)] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>CREATE WORKSPACE</span>
              </button>
            )}
          </div>
          {workspace && (
            <div className="border-t border-[var(--color-border-harsh)] py-1">
              <button className="flex items-center gap-2 w-full px-3 py-2 text-[9px] font-mono text-[var(--color-text-dim)] hover:text-[var(--color-text-raw)] hover:bg-[var(--color-surface)] transition-colors">
                <Users className="w-3.5 h-3.5" />
                <span>MANAGE MEMBERS</span>
              </button>
              {(role === 'owner' || role === 'admin') && (
                <button className="flex items-center gap-2 w-full px-3 py-2 text-[9px] font-mono text-[var(--color-text-dim)] hover:text-[var(--color-text-raw)] hover:bg-[var(--color-surface)] transition-colors">
                  <Settings className="w-3.5 h-3.5" />
                  <span>WORKSPACE SETTINGS</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
