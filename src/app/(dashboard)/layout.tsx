import { Sidebar } from '@/components/layout/sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-void)] bg-grid-pattern-dense">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <DashboardHeader
          accountName="Titan Home Solutions"
          accountId="966-043-4837"
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
