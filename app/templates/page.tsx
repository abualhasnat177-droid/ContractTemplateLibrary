import React from 'react';
import Link from 'next/link';
import { getAllTemplates } from '../../lib/documents/templateLoader';
import TemplatesPageClient from '../../components/template/TemplatesPageClient';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Free Legal Contract Templates Library (2026) — ContractHub',
  description: 'Browse, customize, and download 200+ attorney-reviewed legal contract templates. PDF and DOCX downloads — no account required.',
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 h-14 bg-[var(--color-bg)] border-b border-[var(--color-border)] px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
          <FileText className="w-5 h-5 text-[var(--color-accent)]" />
          <span>ContractHub</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/templates" className="text-sm font-semibold text-[var(--color-accent)]">
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
        <TemplatesPageClient initialTemplates={templates} />
      </main>
    </div>
  );
}
