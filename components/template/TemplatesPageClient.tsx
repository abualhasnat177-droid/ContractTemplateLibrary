'use client';

import React, { useState, useMemo } from 'react';
import { ContractTemplate } from '../../types/template';
import SearchBar from './SearchBar';
import CategorySidebar from './CategorySidebar';
import TemplateGrid from './TemplateGrid';

interface TemplatesPageClientProps {
  initialTemplates: ContractTemplate[];
  initialCategory?: string | null;
}

export default function TemplatesPageClient({ initialTemplates, initialCategory = null }: TemplatesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  const filteredTemplates = useMemo(() => {
    return initialTemplates.filter((template) => {
      // Category filter
      if (selectedCategory && template.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = template.title.toLowerCase().includes(query);
        const matchesDesc = template.description.toLowerCase().includes(query);
        const matchesTags = template.tags?.some((t) => t.toLowerCase().includes(query)) || false;
        
        return matchesTitle || matchesDesc || matchesTags;
      }

      return true;
    });
  }, [initialTemplates, searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar filter */}
      <CategorySidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main content grid */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Legal Template Library
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Showing {filteredTemplates.length} of {initialTemplates.length} attorney-reviewed contracts
          </p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <TemplateGrid templates={filteredTemplates} />
      </div>
    </div>
  );
}
