'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface AccountTab {
  id: string;
  name: string;
  accountId: string;
  platform: 'google' | 'meta' | 'amazon' | 'microsoft';
}

interface AccountTabsContextType {
  tabs: AccountTab[];
  activeTabId: string | null;
  addTab: (account: AccountTab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  closeOtherTabs: (id: string) => void;
  closeAllTabs: () => void;
}

const STORAGE_KEY = 'adpilot-account-tabs';
const AccountTabsContext = createContext<AccountTabsContextType | undefined>(undefined);

function loadTabsFromStorage(): { tabs: AccountTab[]; activeTabId: string | null } {
  if (typeof window === 'undefined') return { tabs: [], activeTabId: null };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { tabs: parsed.tabs || [], activeTabId: parsed.activeTabId || null };
    }
  } catch (e) { console.error('Failed to load tabs:', e); }
  return { tabs: [], activeTabId: null };
}

function saveTabsToStorage(tabs: AccountTab[], activeTabId: string | null): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs, activeTabId })); }
  catch (e) { console.error('Failed to save tabs:', e); }
}

export function AccountTabsProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<AccountTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const { tabs: storedTabs, activeTabId: storedActiveId } = loadTabsFromStorage();
    setTabs(storedTabs);
    setActiveTabId(storedActiveId);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) saveTabsToStorage(tabs, activeTabId);
  }, [tabs, activeTabId, isHydrated]);

  const addTab = useCallback((account: AccountTab) => {
    setTabs((current) => {
      if (current.find((t) => t.id === account.id)) {
        setActiveTabId(account.id);
        return current;
      }
      return [...current, account];
    });
    setActiveTabId(account.id);
  }, []);

  const removeTab = useCallback((id: string) => {
    setTabs((current) => {
      const idx = current.findIndex((t) => t.id === id);
      if (idx === -1) return current;
      const newTabs = current.filter((t) => t.id !== id);
      if (id === activeTabId && newTabs.length > 0) {
        setActiveTabId(newTabs[Math.min(idx, newTabs.length - 1)].id);
      } else if (newTabs.length === 0) {
        setActiveTabId(null);
      }
      return newTabs;
    });
  }, [activeTabId]);

  const setActiveTab = useCallback((id: string) => setActiveTabId(id), []);
  const closeOtherTabs = useCallback((id: string) => {
    setTabs((current) => current.filter((t) => t.id === id));
    setActiveTabId(id);
  }, []);
  const closeAllTabs = useCallback(() => { setTabs([]); setActiveTabId(null); }, []);

  return (
    <AccountTabsContext.Provider value={{ tabs, activeTabId, addTab, removeTab, setActiveTab, closeOtherTabs, closeAllTabs }}>
      {children}
    </AccountTabsContext.Provider>
  );
}

export function useAccountTabs() {
  const ctx = useContext(AccountTabsContext);
  if (!ctx) throw new Error('useAccountTabs must be used within AccountTabsProvider');
  return ctx;
}

export function useActiveAccount(): AccountTab | null {
  const { tabs, activeTabId } = useAccountTabs();
  return tabs.find((t) => t.id === activeTabId) || null;
}
