import React from 'react';
import { ContractTemplate } from '../../types/template';
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  templates: ContractTemplate[];
}

export default function TemplateGrid({ templates }: TemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-[var(--color-text-secondary)] text-sm mb-2">No templates found matching your criteria.</p>
        <p className="text-[var(--color-text-muted)] text-xs">Try resetting filters or searching for something else.</p>
      </div>
    );
  }

  // Check if any template has a subcategory
  const hasSubcategories = templates.some(t => t.subcategory);

  if (hasSubcategories) {
    // Group templates by subcategory
    const grouped = templates.reduce((acc, template) => {
      const sub = template.subcategory || 'General';
      if (!acc[sub]) acc[sub] = [];
      acc[sub].push(template);
      return acc;
    }, {} as Record<string, ContractTemplate[]>);

    return (
      <div className="space-y-12">
        {Object.entries(grouped).map(([subcat, subcatTemplates]) => (
          <div key={subcat} className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2">
              <span>{subcat}</span>
              <span className="text-xs font-normal text-[var(--color-text-secondary)]">({subcatTemplates.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcatTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
