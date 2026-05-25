'use client';

import React, { useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { ContractTemplate } from '../../types/template';
import DocumentPreview from './DocumentPreview';
import EditorPanel from '../editor/EditorPanel';
import DownloadBar from '../editor/DownloadBar';
import JurisdictionBadge from './JurisdictionBadge';
import { Clock, Shield, Calendar } from 'lucide-react';

interface TemplateEditorClientProps {
  template: ContractTemplate;
}

export default function TemplateEditorClient({ template }: TemplateEditorClientProps) {
  const { templateId, setTemplateId, resetEditor, setField } = useEditorStore();

  useEffect(() => {
    // Reset editor if switching templates
    if (templateId !== template.id) {
      resetEditor();
      setTemplateId(template.id);
      
      // Initialize default values
      template.fields.forEach((field) => {
        if (field.defaultValue) {
          setField(field.id, field.defaultValue);
        }
      });
    }
  }, [template.id, templateId, setTemplateId, resetEditor, setField, template.fields]);

  return (
    <div className="space-y-8">
      {/* Back button and metadata header */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-[11px] font-semibold tracking-wider text-[var(--color-text-secondary)] bg-[var(--color-surface-2)] px-2.5 py-1 rounded-full uppercase">
            {template.category}
          </span>
          <JurisdictionBadge jurisdictions={template.jurisdictions} />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-2">
          {template.title}
        </h1>
        
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-3xl mb-4">
          {template.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Estimated fill time: ~{template.estimatedFillMinutes} minutes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-700 dark:text-green-500" />
            <span>Reviewed by: {template.reviewerName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {new Date(template.lastReviewedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Editor Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: interactive Document Preview */}
        <div className="lg:col-span-7 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-3">
            <h2 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
              Document Preview
            </h2>
            <span className="text-[10px] text-[var(--color-text-muted)] italic">
              Click on fields in the document to edit them
            </span>
          </div>
          <DocumentPreview template={template} />
        </div>

        {/* Right Side: Form controls and downloads */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          <EditorPanel template={template} />
          <DownloadBar template={template} />
          
          {/* Whats covered section */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5">
            <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-3">
              What's Covered in this Template
            </h3>
            <ul className="space-y-2">
              {template.whatsCovered.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  <span className="text-[var(--color-accent)] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      {template.faq && template.faq.length > 0 && (
        <div className="border-t border-[var(--color-border)] pt-8 max-w-3xl">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {template.faq.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                  {faq.question}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
