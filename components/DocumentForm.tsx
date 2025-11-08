'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Document, DocumentTypeEnum, DocumentSecurity, DocumentStatus } from '@/types';
import { X } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentFormProps {
  document: Document | null;
  onClose: () => void;
}

export default function DocumentForm({ document, onClose }: DocumentFormProps) {
  const { addDocument, updateDocument, currentUser } = useStore();
  const isEditing = !!document;

  const [formData, setFormData] = useState<Partial<Document>>(
    document || {
      documentTitle: '',
      documentNumber: '',
      documentVersion: '1.0',
      dateCreated: format(new Date(), 'yyyy-MM-dd'),
      createdBy: currentUser?.name || '',
      documentType: 'Procedure',
      documentCategory: '',
      documentSecurity: 'Internal',
      status: 'Draft',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && document) {
      updateDocument(document.id, formData);
    } else {
      const newDocument: Document = {
        id: Date.now().toString(),
        ...formData,
      } as Document;
      addDocument(newDocument);
    }

    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Document' : 'New Document'}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Title *
            </label>
            <input
              type="text"
              name="documentTitle"
              value={formData.documentTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Document Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Number *
            </label>
            <input
              type="text"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Document Version */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Version *
            </label>
            <input
              type="text"
              name="documentVersion"
              value={formData.documentVersion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date Created */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Created *
            </label>
            <input
              type="date"
              name="dateCreated"
              value={formData.dateCreated}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Created By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created By *
            </label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date of Issue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Issue
            </label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Issued By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issued By
            </label>
            <input
              type="text"
              name="issuedBy"
              value={formData.issuedBy || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Issuer Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issuer Role
            </label>
            <input
              type="text"
              name="issuerRole"
              value={formData.issuerRole || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Effective From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Effective From Date
            </label>
            <input
              type="date"
              name="effectiveFromDate"
              value={formData.effectiveFromDate || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date of Next Issue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Next Issue
            </label>
            <input
              type="date"
              name="dateOfNextIssue"
              value={formData.dateOfNextIssue || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type *
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Manual">Manual</option>
              <option value="Procedure">Procedure</option>
              <option value="Process">Process</option>
              <option value="Work Instruction">Work Instruction</option>
              <option value="Policy">Policy</option>
              <option value="Checklist">Checklist</option>
              <option value="Format">Format</option>
              <option value="Template">Template</option>
              <option value="Masters">Masters</option>
            </select>
          </div>

          {/* Document Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Category *
            </label>
            <input
              type="text"
              name="documentCategory"
              value={formData.documentCategory}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Document Security */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Security *
            </label>
            <select
              name="documentSecurity"
              value={formData.documentSecurity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Confidential">Confidential</option>
              <option value="Internal">Internal</option>
              <option value="Restricted">Restricted</option>
              <option value="Public">Public</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Draft">Draft</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Effective">Effective</option>
              <option value="Obsolete">Obsolete</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
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
            {isEditing ? 'Update Document' : 'Create Document'}
          </button>
        </div>
      </form>
    </div>
  );
}
