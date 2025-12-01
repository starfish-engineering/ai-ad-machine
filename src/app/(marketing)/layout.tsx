import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <Header />
      <main className="pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
