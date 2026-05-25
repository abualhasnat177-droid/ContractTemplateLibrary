// lib/documents/docxRenderer.ts
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { ContractTemplate } from '../../types/template';
import { interpolateFields } from './fieldExtractor';

export async function generateDocx(
  template: ContractTemplate,
  fieldValues: Record<string, string>,
  enabledClauses: Record<string, boolean>,
  aiCustomizations: Record<string, string>
): Promise<Buffer> {
  const children: any[] = [];

  // Title
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: template.title.toUpperCase(),
          bold: true,
          size: 28, // 14pt
          font: 'Times New Roman',
        }),
      ],
    })
  );

  // Description
  children.push(
    new Paragraph({
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: template.description,
          italics: true,
          size: 22, // 11pt
          font: 'Times New Roman',
        }),
      ],
    })
  );

  // Clauses
  for (const clause of template.clauses) {
    const isEnabled = enabledClauses[clause.id] ?? clause.enabledByDefault;
    if (!isEnabled && clause.optional) continue;

    if (clause.heading) {
      children.push(
        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: clause.heading,
              bold: true,
              size: 22, // 11pt
              font: 'Times New Roman',
            }),
          ],
        })
      );
    }

    const body = aiCustomizations[clause.id] ?? clause.body;
    const filled = interpolateFields(body, fieldValues);
    
    // Split by paragraph
    const paragraphs = filled.split(/\r?\n/);
    for (const text of paragraphs) {
      if (text.trim() === '') continue;
      children.push(
        new Paragraph({
          spacing: { after: 120, line: 360 }, // 1.5 line spacing
          children: [
            new TextRun({
              text,
              size: 22, // 11pt
              font: 'Times New Roman',
            }),
          ],
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
