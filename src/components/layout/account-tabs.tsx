'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccountTabs } from './account-tabs-context';

const platformColors: Record<string, string> = {
  google: 'bg-gradient-to-br from-green-500 to-emerald-600',
  meta: 'bg-gradient-to-br from-blue-500 to-blue-600',
  amazon: 'bg-gradient-to-br from-orange-500 to-orange-600',
  microsoft: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
};

const platformLabels: Record<string, string> = { google: 'G', meta: 'M', amazon: 'A', microsoft: 'MS' };

interface AccountTabsProps { onAddAccount: () => void; }

export function AccountTabs({ onAddAccount }: AccountTabsProps) {
  const { tabs, activeTabId, setActiveTab, removeTab, closeOtherTabs } = useAccountTabs();
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => { checkScroll(); window.addEventListener('resize', checkScroll); return () => window.removeEventListener('resize', checkScroll); }, [tabs]);
  useEffect(() => { const h = () => setShowContextMenu(null); document.addEventListener('click', h); return () => document.removeEventListener('click', h); }, []);

  const scroll = (dir: 'left' | 'right') => scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });

  if (tabs.length === 0) return null;

  return (
    <div className="bg-[var(--color-void)] border-b border-[var(--color-border-harsh)]">
      <div className="flex items-center h-9">
        {canScrollLeft && <button onClick={() => scroll('left')} className="flex-shrink-0 w-6 h-full flex items-center justify-center bg-[var(--color-terminal)] border-r border-[var(--color-border-harsh)] hover:bg-[var(--color-surface)]"><ChevronLeft className="w-3 h-3 text-[var(--color-text-muted)]" /></button>}
        <div ref={scrollRef} onScroll={checkScroll} className="flex-1 flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => (
            <div key={tab.id} onContextMenu={(e) => { e.preventDefault(); setContextMenuPos({ x: e.clientX, y: e.clientY }); setShowContextMenu(tab.id); }}
              className={cn('group flex items-center gap-2 px-3 h-9 border-r border-[var(--color-border-harsh)] cursor-pointer transition-colors min-w-0 flex-shrink-0 max-w-[200px]',
                tab.id === activeTabId ? 'bg-[var(--color-terminal)] border-t-2 border-t-[var(--color-signal-green)]' : 'bg-[var(--color-surface)] hover:bg-[var(--color-terminal)]')}
              onClick={() => setActiveTab(tab.id)}>
              <div className={cn('w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0', platformColors[tab.platform])}><span className="text-white text-[8px] font-bold">{platformLabels[tab.platform]}</span></div>
              <span className={cn('text-[10px] font-mono truncate', tab.id === activeTabId ? 'text-[var(--color-text-raw)]' : 'text-[var(--color-text-muted)]')} title={tab.name}>{tab.name}</span>
              <button onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }} className={cn('flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 hover:bg-[var(--color-signal-red)]/20 hover:text-[var(--color-signal-red)]', tab.id === activeTabId && 'opacity-100')}><X className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
        {canScrollRight && <button onClick={() => scroll('right')} className="flex-shrink-0 w-6 h-full flex items-center justify-center bg-[var(--color-terminal)] border-l border-[var(--color-border-harsh)] hover:bg-[var(--color-surface)]"><ChevronRight className="w-3 h-3 text-[var(--color-text-muted)]" /></button>}
        <button onClick={onAddAccount} className="flex-shrink-0 w-8 h-full flex items-center justify-center border-l border-[var(--color-border-harsh)] hover:bg-[var(--color-surface)] group" title="Open another account"><Plus className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-signal-green)]" /></button>
      </div>
      {showContextMenu && (
        <div className="fixed z-50 bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] shadow-lg py-1 min-w-[150px]" style={{ left: contextMenuPos.x, top: contextMenuPos.y }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => { removeTab(showContextMenu); setShowContextMenu(null); }} className="w-full px-3 py-1.5 text-left text-[11px] font-mono text-[var(--color-text-raw)] hover:bg-[var(--color-surface)]">Close Tab</button>
          <button onClick={() => { closeOtherTabs(showContextMenu); setShowContextMenu(null); }} className="w-full px-3 py-1.5 text-left text-[11px] font-mono text-[var(--color-text-raw)] hover:bg-[var(--color-surface)]">Close Other Tabs</button>
        </div>
      )}
    </div>
  );
}
