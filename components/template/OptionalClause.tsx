'use client';

import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import { TemplateClause } from '../../types/template';

interface OptionalClauseProps {
  clause: TemplateClause;
  children: React.ReactNode;
}

export default function OptionalClause({ clause, children }: OptionalClauseProps) {
  const { enabledClauses, toggleClause } = useEditorStore();
  const isEnabled = enabledClauses[clause.id] ?? clause.enabledByDefault;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleClause(clause.id, !isEnabled);
  };

  return (
    <div
      onClick={handleToggle}
      className={`optional-clause relative group cursor-pointer my-2 p-1 rounded hover:bg-[var(--color-surface-2)] transition-all duration-200 ${
        isEnabled ? 'active' : ''
      }`}
      title={clause.optionalLabel || 'Toggle Clause'}
    >
      <div className="absolute left-[-28px] top-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={() => toggleClause(clause.id, !isEnabled)}
          className="w-4 h-4 text-[var(--color-accent)] border-[var(--color-border)] rounded focus:ring-[var(--color-accent)] cursor-pointer"
        />
      </div>
      {children}
    </div>
  );
}
