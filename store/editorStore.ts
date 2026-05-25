// store/editorStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorStore {
  templateId: string | null;
  fieldValues: Record<string, string>;   // { field_id: value }
  enabledClauses: Record<string, boolean>;
  aiCustomizations: Record<string, string>; // { clause_id: custom_text }
  riskFlags: string[];                   // clause IDs flagged by AI
  activeField: string | null;
  isDirty: boolean;

  setTemplateId: (id: string | null) => void;
  setField: (id: string, value: string) => void;
  toggleClause: (id: string, enabled: boolean) => void;
  applyAiCustomization: (clauseId: string, text: string) => void;
  revertClause: (clauseId: string) => void;
  setRiskFlags: (flags: string[]) => void;
  setActiveField: (id: string | null) => void;
  loadDraft: (values: Record<string, string>, clauses: Record<string, boolean>) => void;
  resetEditor: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      templateId: null,
      fieldValues: {},
      enabledClauses: {},
      aiCustomizations: {},
      riskFlags: [],
      activeField: null,
      isDirty: false,

      setTemplateId: (id) => set({ templateId: id }),

      setField: (id, value) =>
        set((s) => ({ fieldValues: { ...s.fieldValues, [id]: value }, isDirty: true })),

      toggleClause: (id, enabled) =>
        set((s) => ({ enabledClauses: { ...s.enabledClauses, [id]: enabled }, isDirty: true })),

      applyAiCustomization: (clauseId, text) =>
        set((s) => ({ aiCustomizations: { ...s.aiCustomizations, [clauseId]: text }, isDirty: true })),

      revertClause: (clauseId) =>
        set((s) => {
          const { [clauseId]: _, ...rest } = s.aiCustomizations;
          return { aiCustomizations: rest };
        }),

      setRiskFlags: (flags) => set({ riskFlags: flags }),
      setActiveField: (id) => set({ activeField: id }),

      loadDraft: (values, clauses) =>
        set({ fieldValues: values, enabledClauses: clauses, isDirty: false }),

      resetEditor: () =>
        set({ fieldValues: {}, enabledClauses: {}, aiCustomizations: {}, riskFlags: [], isDirty: false }),
    }),
    {
      name: 'contracthub-editor',
      partialize: (s) => ({ templateId: s.templateId, fieldValues: s.fieldValues, enabledClauses: s.enabledClauses }),
    }
  )
);
