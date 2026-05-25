'use client';

import React from 'react';
import { ContractTemplate } from '../../types/template';
import { useEditorStore } from '../../store/editorStore';
import { parseClauseBody } from '../../lib/documents/templateParser';
import SmartField from './SmartField';
import OptionalClause from './OptionalClause';

interface DocumentPreviewProps {
  template: ContractTemplate;
}

export default function DocumentPreview({ template }: DocumentPreviewProps) {
  const { enabledClauses, aiCustomizations } = useEditorStore();

  return (
    <div className="document-preview select-text">
      <h1>{template.title}</h1>
      
      {template.clauses.map((clause) => {
        const isEnabled = enabledClauses[clause.id] ?? clause.enabledByDefault;
        const bodyText = aiCustomizations[clause.id] ?? clause.body;
        const parsedSegments = parseClauseBody(bodyText, template.fields);

        const renderedContent = (
          <div key={clause.id} className="mb-4">
            {clause.heading && (
              <div className="section-heading">{clause.heading}</div>
            )}
            <p className="indent-8 text-justify">
              {parsedSegments.map((segment, index) => {
                if (segment.type === 'text') {
                  return <span key={index}>{segment.content}</span>;
                } else if (segment.field) {
                  return <SmartField key={index} field={segment.field} />;
                } else {
                  return <span key={index} className="text-red-500">{segment.content}</span>;
                }
              })}
            </p>
          </div>
        );

        if (clause.optional) {
          return (
            <OptionalClause key={clause.id} clause={clause}>
              {renderedContent}
            </OptionalClause>
          );
        }

        return renderedContent;
      })}
    </div>
  );
}
