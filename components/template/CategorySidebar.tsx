'use client';

import React from 'react';

interface CategorySidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CATEGORIES = [
  { id: null, name: 'All Categories' },
  { id: 'freelance', name: 'Freelance & Services' },
  { id: 'nda', name: 'Non-Disclosure (NDA)' },
  { id: 'startup', name: 'Startup & Equity' },
  { id: 'consulting', name: 'Consulting & Coaching' },
  { id: 'employment', name: 'Employment & HR' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'creator', name: 'Creator & Influencer' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'vendor', name: 'Vendor & Procurement' },
  { id: 'miscellaneous', name: 'Miscellaneous Legal' },
];

export default function CategorySidebar({
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <aside className="w-full md:w-60 h-fit flex-shrink-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 md:sticky md:top-20">
      <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 px-2">
        Browse Categories
      </h2>
      <nav className="space-y-1">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id ?? 'all'}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isActive
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
