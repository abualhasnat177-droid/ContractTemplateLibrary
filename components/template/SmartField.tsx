'use client';

import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import { TemplateField } from '../../types/template';
import { formatValue } from '../../lib/utils';

interface SmartFieldProps {
  field: TemplateField;
}

export default function SmartField({ field }: SmartFieldProps) {
  const { fieldValues, activeField, setActiveField, setField } = useEditorStore();
  const value = fieldValues[field.id] || '';
  const formattedValue = formatValue(value, field.type);
  const isActive = activeField === field.id;
  const isFilled = value.trim() !== '';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveField(field.id);
    // Find the input element in the editor panel and focus it
    const inputElement = document.getElementById(`input-${field.id}`);
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputElement.focus();
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`smart-field ${isFilled ? 'filled' : ''} ${
        isActive ? 'ring-2 ring-[var(--color-accent)] ring-offset-2' : ''
      }`}
      title={field.label}
    >
      {isFilled ? formattedValue : `[${field.label}]`}
    </span>
  );
}
