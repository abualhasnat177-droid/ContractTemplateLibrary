import { ContractTemplate, TemplateField } from '../../types/template';

export function extractFieldsFromTemplate(template: ContractTemplate): TemplateField[] {
  return template.fields;
}

export function interpolateFields(text: string, values: Record<string, string>): string {
  return text.replace(/{([a-zA-Z0-9_]+)}/g, (match, key) => {
    return values[key] !== undefined && values[key] !== '' ? values[key] : `[${key.toUpperCase().replace(/_/g, ' ')}]`;
  });
}
