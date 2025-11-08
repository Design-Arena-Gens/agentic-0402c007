'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Workflow, WorkflowStep, WorkflowTemplate } from '@/types';
import { X } from 'lucide-react';

interface WorkflowFormProps {
  onClose: () => void;
}

export default function WorkflowForm({ onClose }: WorkflowFormProps) {
  const { documents, workflowTemplates, addWorkflow, currentUser } = useStore();
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const document = documents.find((d) => d.id === selectedDocument);
    const template = workflowTemplates.find((t) => t.id === selectedTemplate);

    if (!document || !template || !currentUser) return;

    const workflowSteps: WorkflowStep[] = template.steps.map((step) => ({
      id: `${Date.now()}-${step.stepNumber}`,
      ...step,
      status: step.stepNumber === 1 ? 'Pending' : 'Pending',
    }));

    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      workflowName: template.name,
      documentId: document.id,
      documentNumber: document.documentNumber,
      documentTitle: document.documentTitle,
      initiatedBy: currentUser.name,
      initiatedAt: new Date().toISOString(),
      currentStep: 1,
      status: 'In Progress',
      steps: workflowSteps,
    };

    addWorkflow(newWorkflow);
    onClose();
  };

  const selectedDoc = documents.find((d) => d.id === selectedDocument);
  const applicableTemplates = workflowTemplates.filter(
    (t) =>
      !selectedDoc || t.applicableDocumentTypes.includes(selectedDoc.documentType)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Initiate Workflow</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Document *
          </label>
          <select
            value={selectedDocument}
            onChange={(e) => {
              setSelectedDocument(e.target.value);
              setSelectedTemplate('');
            }}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a document...</option>
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.documentNumber} - {doc.documentTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Workflow Template *
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            required
            disabled={!selectedDocument}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Choose a template...</option>
            {applicableTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          {selectedDocument && applicableTemplates.length === 0 && (
            <p className="text-sm text-red-600 mt-2">
              No applicable workflow templates for this document type
            </p>
          )}
        </div>

        {selectedTemplate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Workflow Preview</h4>
            {workflowTemplates
              .find((t) => t.id === selectedTemplate)
              ?.steps.map((step) => (
                <div key={step.stepNumber} className="text-sm text-blue-800 mb-1">
                  Step {step.stepNumber}: {step.stepName} ({step.assignedRole})
                </div>
              ))}
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Initiate Workflow
          </button>
        </div>
      </form>
    </div>
  );
}
