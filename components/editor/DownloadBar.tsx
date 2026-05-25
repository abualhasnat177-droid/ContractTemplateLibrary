'use client';

import React, { useState } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { ContractTemplate } from '../../types/template';
import { Download, FileDown, AlertCircle } from 'lucide-react';

interface DownloadBarProps {
  template: ContractTemplate;
}

export default function DownloadBar({ template }: DownloadBarProps) {
  const { fieldValues, enabledClauses, aiCustomizations } = useEditorStore();
  const [downloadingFormat, setDownloadingFormat] = useState<'pdf' | 'docx' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setDownloadingFormat(format);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          fieldValues,
          enabledClauses,
          aiCustomizations,
          format,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to download ${format.toUpperCase()}`);
      }

      // Download file stream
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.slug}-${new Date().toISOString().slice(0, 10)}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected error occurred during download.');
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
          Export Document
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)]">
          No account required
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleDownload('pdf')}
          disabled={downloadingFormat !== null}
          className="flex items-center justify-center gap-2 h-10 px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-medium rounded-md transition-colors disabled:opacity-50"
        >
          <FileDown className="w-4 h-4" />
          {downloadingFormat === 'pdf' ? 'Generating PDF...' : 'Download PDF'}
        </button>

        <button
          onClick={() => handleDownload('docx')}
          disabled={downloadingFormat !== null}
          className="flex items-center justify-center gap-2 h-10 px-4 bg-transparent border-2 border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] text-xs font-medium rounded-md transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {downloadingFormat === 'docx' ? 'Generating DOCX...' : 'Download DOCX'}
        </button>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-2.5 p-3 rounded bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs mt-1">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
