'use client';

import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import { ContractTemplate, TemplateField, TemplateClause } from '../../types/template';

interface EditorPanelProps {
  template: ContractTemplate;
}

export default function EditorPanel({ template }: EditorPanelProps) {
  const { fieldValues, setField, enabledClauses, toggleClause, activeField, setActiveField } = useEditorStore();

  // Group fields by their group property
  const fieldsByGroup = template.fields.reduce<Record<string, TemplateField[]>>((acc, field) => {
    const group = field.group || 'General Details';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(field);
    return acc;
  }, {});

  const optionalClauses = template.clauses.filter((c) => c.optional);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 space-y-6">
      <div>
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 mb-4">
          Contract Details
        </h2>
        
        <div className="space-y-6">
          {Object.entries(fieldsByGroup).map(([groupName, fields]) => (
            <div key={groupName} className="space-y-4">
              <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                {groupName}
              </h3>
              
              <div className="space-y-3">
                {fields.map((field) => {
                  const value = fieldValues[field.id] || '';
                  const isActive = activeField === field.id;

                  return (
                    <div key={field.id} className="flex flex-col space-y-1">
                      <label
                        htmlFor={`input-${field.id}`}
                        className={`text-xs font-medium transition-colors ${
                          isActive ? 'text-[var(--color-accent)] font-semibold' : 'text-[var(--color-text-secondary)]'
                        }`}
                      >
                        {field.label} {field.required && <span className="text-[var(--color-error)]">*</span>}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          id={`input-${field.id}`}
                          value={value}
                          onChange={(e) => setField(field.id, e.target.value)}
                          onFocus={() => setActiveField(field.id)}
                          onBlur={() => setActiveField(null)}
                          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                          rows={4}
                          className={`w-full px-3 py-2 bg-[var(--color-bg)] border rounded-md text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all ${
                            isActive ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]' : 'border-[var(--color-border)]'
                          }`}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={`input-${field.id}`}
                          value={value || field.defaultValue || ''}
                          onChange={(e) => setField(field.id, e.target.value)}
                          onFocus={() => setActiveField(field.id)}
                          onBlur={() => setActiveField(null)}
                          className={`w-full px-3 py-2 bg-[var(--color-bg)] border rounded-md text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all ${
                            isActive ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]' : 'border-[var(--color-border)]'
                          }`}
                        >
                          <option value="">Select option...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={`input-${field.id}`}
                          type={field.type === 'date' ? 'date' : 'text'}
                          value={value}
                          onChange={(e) => setField(field.id, e.target.value)}
                          onFocus={() => setActiveField(field.id)}
                          onBlur={() => setActiveField(null)}
                          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                          className={`w-full px-3 py-2 bg-[var(--color-bg)] border rounded-md text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all ${
                            isActive ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]' : 'border-[var(--color-border)]'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {optionalClauses.length > 0 && (
        <div className="border-t border-[var(--color-border)] pt-4">
          <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-3">
            Optional Clauses
          </h3>
          <div className="space-y-3">
            {optionalClauses.map((clause) => {
              const isEnabled = enabledClauses[clause.id] ?? clause.enabledByDefault;
              return (
                <label key={clause.id} className="flex items-start gap-3 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) => toggleClause(clause.id, e.target.checked)}
                    className="w-4 h-4 text-[var(--color-accent)] border-[var(--color-border)] rounded focus:ring-[var(--color-accent)] cursor-pointer mt-0.5"
                  />
                  <span className="text-[var(--color-text-secondary)] font-medium select-none">
                    {clause.optionalLabel || clause.heading || 'Include Clause'}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
