import React, { ReactNode } from 'react';
import { ContractTemplate, TemplateField } from '../../types/template';

export interface ParsedElement {
  type: 'text' | 'field';
  content: string;
  fieldId?: string;
  field?: TemplateField;
}

export function parseClauseBody(
  body: string,
  fields: TemplateField[]
): ParsedElement[] {
  const result: ParsedElement[] = [];
  const regex = /{([a-zA-Z0-9_]+)}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(body)) !== null) {
    const fieldId = match[1];
    const textBefore = body.substring(lastIndex, match.index);
    
    if (textBefore) {
      result.push({ type: 'text', content: textBefore });
    }

    const field = fields.find((f) => f.id === fieldId);
    result.push({
      type: 'field',
      content: match[0],
      fieldId,
      field,
    });

    lastIndex = regex.lastIndex;
  }

  const textAfter = body.substring(lastIndex);
  if (textAfter) {
    result.push({ type: 'text', content: textAfter });
  }

  return result;
}
