'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { SidebarProvider, useSidebar } from '@/components/layout/sidebar-context';
import { Menu, X } from 'lucide-react';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-[var(--color-void)] bg-grid-pattern-dense">
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar />
      </div>
      
      <div className={`transition-all duration-300 ${collapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        <DashboardHeader
          accountName="Titan Home Solutions"
          accountId="966-043-4837"
        />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
