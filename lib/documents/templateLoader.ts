// lib/documents/templateLoader.ts
import fs from 'fs';
import path from 'path';
import { ContractTemplate } from '../../types/template';

const templatesDirectory = path.join(process.cwd(), 'content', 'templates');

export function getTemplateBySlug(category: string, slug: string): ContractTemplate | null {
  try {
    const filePath = path.join(templatesDirectory, category, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      // Try searching recursively in all subdirectories of templates
      const all = getAllTemplates();
      const found = all.find((t) => t.slug === slug && t.category === category);
      return found || null;
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as ContractTemplate;
  } catch (error) {
    console.error(`Error reading template ${category}/${slug}:`, error);
    return null;
  }
}

export function getAllTemplates(): ContractTemplate[] {
  const templates: ContractTemplate[] = [];
  
  if (!fs.existsSync(templatesDirectory)) {
    return templates;
  }

  try {
    const categories = fs.readdirSync(templatesDirectory);
    for (const category of categories) {
      const categoryPath = path.join(templatesDirectory, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;
      
      const files = fs.readdirSync(categoryPath);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(categoryPath, file);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          templates.push(JSON.parse(fileContents) as ContractTemplate);
        }
      }
    }
  } catch (error) {
    console.error('Error listing all templates:', error);
  }
  return templates;
}
