import { NextRequest, NextResponse } from 'next/server';
import { getAllTemplates } from '../../../lib/documents/templateLoader';
import { generatePdf } from '../../../lib/documents/pdfRenderer';
import { generateDocx } from '../../../lib/documents/docxRenderer';
import { DownloadSchema } from '../../../schemas/download.schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body with Zod
    const validation = DownloadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid parameters: ' + validation.error.message },
        { status: 400 }
      );
    }

    const { templateId, fieldValues, enabledClauses, aiCustomizations, format, brandOptions } = validation.data;

    // Load template
    const templates = getAllTemplates();
    const template = templates.find((t) => t.id === templateId || t.slug === templateId);

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Generate output
    if (format === 'pdf') {
      const pdfBytes = await generatePdf(
        template,
        fieldValues,
        enabledClauses,
        aiCustomizations,
        brandOptions
      );

      return new NextResponse(Buffer.from(pdfBytes) as any, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${template.slug}-${new Date().toISOString().slice(0, 10)}.pdf"`,
        },
      });
    } else if (format === 'docx') {
      const docxBuffer = await generateDocx(
        template,
        fieldValues,
        enabledClauses,
        aiCustomizations
      );

      return new NextResponse(docxBuffer as any, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="${template.slug}-${new Date().toISOString().slice(0, 10)}.docx"`,
        },
      });
    }

    return NextResponse.json(
      { error: 'Unsupported format' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error during download generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate file: ' + (error.message || error) },
      { status: 500 }
    );
  }
}
