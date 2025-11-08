'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { ElectronicSignature } from '@/types';
import { X, PenTool } from 'lucide-react';

interface SignatureModalProps {
  stepName: string;
  onSubmit: (signature: ElectronicSignature, comments?: string) => void;
  onClose: () => void;
}

export default function SignatureModal({ stepName, onSubmit, onClose }: SignatureModalProps) {
  const { currentUser } = useStore();
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    const signature: ElectronicSignature = {
      signatureId: Date.now().toString(),
      signedBy: currentUser.name,
      signedByRole: currentUser.role,
      signedAt: new Date().toISOString(),
      meaning: stepName,
      reason,
      password, // In production, this should be hashed
    };

    onSubmit(signature, comments);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <PenTool className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Electronic Signature</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-900">
              <strong>21 CFR Part 11 Compliance:</strong> Your electronic signature has the same
              legal effect as a handwritten signature. By signing, you confirm the accuracy and
              completeness of this action.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signing As
              </label>
              <input
                type="text"
                value={`${currentUser?.name} (${currentUser?.role})`}
                disabled
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action
              </label>
              <input
                type="text"
                value={stepName}
                disabled
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Signature *
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="e.g., Technical review complete"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                placeholder="Add any additional comments..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

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
                Sign & Approve
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
