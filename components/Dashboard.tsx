'use client';

import { useStore } from '@/lib/store';
import { FileText, GitBranch, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function Dashboard() {
  const { documents, workflows, auditLogs } = useStore();

  const stats = {
    totalDocuments: documents.length,
    effectiveDocuments: documents.filter((d) => d.status === 'Effective').length,
    underReview: documents.filter((d) => d.status === 'Under Review').length,
    activeWorkflows: workflows.filter((w) => w.status === 'In Progress').length,
    recentAuditLogs: auditLogs.slice(0, 5),
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Documents</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalDocuments}</p>
            </div>
            <FileText className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Effective Documents</p>
              <p className="text-3xl font-bold text-gray-900">{stats.effectiveDocuments}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-3xl font-bold text-gray-900">{stats.underReview}</p>
            </div>
            <Clock className="h-12 w-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Workflows</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeWorkflows}</p>
            </div>
            <GitBranch className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Document Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Version
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.slice(0, 5).map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.documentNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{doc.documentTitle}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{doc.documentType}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          doc.status === 'Effective'
                            ? 'bg-green-100 text-green-800'
                            : doc.status === 'Under Review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{doc.documentVersion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900">Compliance Information</h4>
            <p className="text-sm text-blue-800 mt-1">
              This system is designed to comply with 21 CFR Part 11 requirements including electronic
              records, electronic signatures, audit trails, and access controls. All actions are logged
              and traceable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
