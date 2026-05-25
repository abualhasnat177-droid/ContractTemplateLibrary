// types/template.ts

export interface TemplateField {
  id: string;                 // e.g. "client_name"
  label: string;              // e.g. "Client Full Name"
  type: 'text' | 'date' | 'currency' | 'email' | 'phone' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required: boolean;
  defaultValue?: string;
  options?: string[];         // for type: 'select'
  group: string;              // Groups fields in the editor panel: "Parties", "Payment", etc.
}

export interface TemplateClause {
  id: string;
  heading?: string;
  body: string;               // Template literal with {field_id} placeholders
  optional: boolean;          // If true, show toggle checkbox
  optionalLabel?: string;     // e.g. "Include non-compete clause?"
  enabledByDefault: boolean;
  riskLevel?: 'low' | 'medium' | 'high'; // Pre-tagged by attorney
}

export interface ContractTemplate {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  whatsCovered: string[];
  whenToUse: string;
  jurisdictions: string[];    // e.g. ["US", "UK", "CA"]
  jurisdictionNotes?: Record<string, string>; // state/country-specific notes
  lastReviewedAt: string;     // ISO date
  reviewerName: string;
  estimatedFillMinutes: number;
  fields: TemplateField[];
  clauses: TemplateClause[];
  relatedTemplates: string[]; // slugs of 3 related templates
  faq: { question: string; answer: string }[];
  tags: string[];
  subcategory?: string;       // Optional subcategory for template organization
}
