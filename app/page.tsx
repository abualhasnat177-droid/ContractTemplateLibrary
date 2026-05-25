import React from 'react';
import Link from 'next/link';
import { getAllTemplates } from '../lib/documents/templateLoader';
import TemplateCard from '../components/template/TemplateCard';
import { FileText, Shield, Sparkles, Check, X, ArrowRight } from 'lucide-react';

export default function Home() {
  const templates = getAllTemplates();
  const featuredTemplates = templates.slice(0, 3); // Take our 3 templates

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Attorney-Reviewed Legal Templates</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-6 leading-tight">
          The contract template library built for freelancers and small teams.
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Browse, fill smart fields, and download a ready-to-sign PDF or DOCX in under two minutes. No account, no per-seat fees, no sales calls.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/templates"
            className="flex items-center justify-center gap-2 h-11 px-6 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold rounded-md transition-colors"
          >
            Browse Free Templates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-[var(--color-border)]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
              Featured Templates
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Start editing instantly without creating an account
            </p>
          </div>
          <Link
            href="/templates"
            className="text-xs font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1"
          >
            View all 200+ templates
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTemplates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </section>

      {/* Competitive Comparison */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[var(--color-border)]">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Why ContractHub?
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            We build for creators, freelancers, and builders — not corporate legal departments.
          </p>
        </div>

        <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
          <table className="w-full text-left border-collapse bg-[var(--color-surface)]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="p-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase">Feature / Pricing</th>
                <th className="p-4 text-xs font-bold text-[var(--color-accent)] uppercase bg-[var(--color-accent-light)]">ContractHub</th>
                <th className="p-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase">PandaDoc</th>
                <th className="p-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase">DocuSign CLM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-sm">
              <tr>
                <td className="p-4 font-semibold text-[var(--color-text-primary)]">Base Cost (10 Users)</td>
                <td className="p-4 font-bold text-[var(--color-success)] bg-[var(--color-accent-light)]">$29 / month flat</td>
                <td className="p-4 text-[var(--color-text-secondary)]">$490 / month ($49/user)</td>
                <td className="p-4 text-[var(--color-text-secondary)]">Enterprise Contract</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--color-text-secondary)]">Browse Without Account</td>
                <td className="p-4 bg-[var(--color-accent-light)]"><Check className="w-5 h-5 text-[var(--color-success)]" /></td>
                <td className="p-4"><X className="w-5 h-5 text-[var(--color-error)]" /></td>
                <td className="p-4"><X className="w-5 h-5 text-[var(--color-error)]" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--color-text-secondary)]">Smart Fill Editor</td>
                <td className="p-4 bg-[var(--color-accent-light)]"><Check className="w-5 h-5 text-[var(--color-success)]" /></td>
                <td className="p-4"><Check className="w-5 h-5 text-[var(--color-success)]" /></td>
                <td className="p-4"><Check className="w-5 h-5 text-[var(--color-success)]" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--color-text-secondary)]">Downloads (PDF + DOCX)</td>
                <td className="p-4 bg-[var(--color-accent-light)] font-medium">Free (3/day) / Unlimited</td>
                <td className="p-4 text-[var(--color-text-secondary)]">Account Required</td>
                <td className="p-4 text-[var(--color-text-secondary)]">Account Required</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--color-text-secondary)]">Implementation Time</td>
                <td className="p-4 bg-[var(--color-accent-light)] font-bold text-[var(--color-success)]">Instant (under 2m)</td>
                <td className="p-4">1–2 Days setup</td>
                <td className="p-4">2–3 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-[var(--color-border)] text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 text-[var(--color-accent)] mb-3" />
            <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">Lawyer Reviewed</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Every template is drafted and reviewed by experienced business attorneys.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[var(--color-accent)] mb-3" />
            <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">Instant Exports</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Download clean, print-ready PDF and editable Word DOCX files immediately.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FileText className="w-8 h-8 text-[var(--color-accent)] mb-3" />
            <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">No Login Required</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Start editing and customizing your contract directly without creating an account.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-8 px-6 text-center text-xs text-[var(--color-text-muted)]">
        <p className="mb-2">© {new Date().getFullYear()} ContractHub. All rights reserved.</p>
        <p className="max-w-md mx-auto leading-normal">
          Disclaimer: ContractHub provides legal templates for educational and informational purposes. We do not provide legal advice, and our service is not a substitute for a licensed attorney.
        </p>
      </footer>
    </div>
  );
}
