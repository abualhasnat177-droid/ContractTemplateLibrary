import React from 'react';
import Link from 'next/link';
import { getAllTemplates } from '../../../lib/documents/templateLoader';
import TemplatesPageClient from '../../../components/template/TemplatesPageClient';
import { FileText } from 'lucide-react';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CATEGORY_NAMES: Record<string, string> = {
  freelance: 'Freelance & Services',
  nda: 'Non-Disclosure & Confidentiality',
  startup: 'Startup & Equity',
  consulting: 'Consulting & Coaching',
  employment: 'Employment & HR',
  'real-estate': 'Real Estate',
  creator: 'Creator & Influencer',
  healthcare: 'Healthcare',
  vendor: 'Vendor & Procurement',
  miscellaneous: 'Miscellaneous Legal',
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryName = CATEGORY_NAMES[resolvedParams.category] || 'Legal';
  return {
    title: `Free ${categoryName} Contract Templates — ContractHub`,
    description: `Browse, fill and download professional ${categoryName.toLowerCase()} contract templates. Premium PDF and Word DOCX formats.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  if (!CATEGORY_NAMES[category]) {
    notFound();
  }

  const allTemplates = getAllTemplates();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 h-14 bg-[var(--color-bg)] border-b border-[var(--color-border)] px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
          <FileText className="w-5 h-5 text-[var(--color-accent)]" />
          <span>ContractHub</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/templates" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
            Browse Templates
          </Link>
          <span className="text-sm font-medium text-[var(--color-text-muted)] cursor-not-allowed">
            Pricing
          </span>
          <Link
            href="/templates"
            className="flex items-center justify-center h-8 px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-semibold rounded-md transition-colors"
          >
            Start Free
          </Link>
        </nav>
      </header>

      {/* Content Container */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-4">
          <Link href="/templates" className="text-xs text-[var(--color-accent)] hover:underline">
            ← Back to all templates
          </Link>
        </div>
        <TemplatesPageClient initialTemplates={allTemplates} initialCategory={category} />
      </main>
    </div>
  );
}
