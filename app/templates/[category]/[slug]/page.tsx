import React from 'react';
import Link from 'next/link';
import { getTemplateBySlug, getAllTemplates } from '../../../../lib/documents/templateLoader';
import TemplateEditorClient from '../../../../components/template/TemplateEditorClient';
import { FileText } from 'lucide-react';
import { notFound } from 'next/navigation';

interface TemplatePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TemplatePageProps) {
  const resolvedParams = await params;
  const template = getTemplateBySlug(resolvedParams.category, resolvedParams.slug);
  
  if (!template) {
    return {
      title: 'Template Not Found — ContractHub',
    };
  }

  return {
    title: `${template.title} — Free PDF/DOCX Template (2026)`,
    description: `${template.description.slice(0, 150)} Free download. Attorney-reviewed. Fill smart fields and download in under two minutes.`,
  };
}

// Generate static parameters for all templates at build time (SSG)
export async function generateStaticParams() {
  const templates = getAllTemplates();
  return templates.map((t) => ({
    category: t.category,
    slug: t.slug,
  }));
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  const template = getTemplateBySlug(category, slug);

  if (!template) {
    notFound();
  }

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

      {/* Main content body */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-4">
          <Link href={`/templates/${category}`} className="text-xs text-[var(--color-accent)] hover:underline capitalize">
            ← Back to {category} templates
          </Link>
        </div>
        <TemplateEditorClient template={template} />
      </main>
    </div>
  );
}
