import React from 'react';

interface JurisdictionBadgeProps {
  jurisdictions: string[];
}

export default function JurisdictionBadge({ jurisdictions }: JurisdictionBadgeProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {jurisdictions.map((j) => (
        <span
          key={j}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-border)]"
        >
          {j}
        </span>
      ))}
    </div>
  );
}
