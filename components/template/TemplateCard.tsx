import React from 'react';
import Link from 'next/link';
import { ContractTemplate } from '../../types/template';
import { Clock, Eye, FileText } from 'lucide-react';

interface TemplateCardProps {
  template: ContractTemplate;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/templates/${template.category}/${template.slug}`} className="block h-full">
      <div className="flex flex-col justify-between h-full min-h-[180px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 cursor-pointer hover:border-[var(--color-accent)] hover:shadow-[0_4px_16px_rgba(27,79,216,0.10)] transition-all duration-200">
        <div>
          <div className="flex justify-between items-start mb-2.5">
            <span className="text-[11px] font-semibold tracking-wider text-[var(--color-text-secondary)] bg-[var(--color-surface-2)] px-2.5 py-1 rounded-full uppercase">
              {template.category}
            </span>
          </div>
          
          <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
            {template.title}
          </h3>
          
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
            {template.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>~{template.estimatedFillMinutes} mins</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-[var(--color-accent)]">
            <FileText className="w-3.5 h-3.5" />
            <span>Fill template</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
