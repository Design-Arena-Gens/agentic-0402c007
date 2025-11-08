'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Shield, Search, FileText, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function AuditLogs() {
  const { auditLogs } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const uniqueActions = Array.from(new Set(auditLogs.map((log) => log.action)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
        </div>
        <div className="text-sm text-gray-600">
          Total Logs: <span className="font-semibold">{auditLogs.length}</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900">
              21 CFR Part 11 Compliant Audit Trail
            </h4>
            <p className="text-sm text-blue-800 mt-1">
              All document actions are automatically logged with user identification, timestamp,
              action details, and electronic signatures where applicable. Audit records are
              immutable and traceable.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signature
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.userName}</div>
                      <div className="text-xs text-gray-500">{log.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{log.documentNumber}</div>
                      <div className="text-xs text-gray-500">{log.documentTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {log.electronicSignature ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Signed
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Log View */}
      {selectedLog && (
        <div className="bg-white rounded-lg shadow p-6">
          {(() => {
            const log = auditLogs.find((l) => l.id === selectedLog);
            if (!log) return null;

            return (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Audit Log Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Timestamp</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">User</div>
                    <div className="text-sm font-medium text-gray-900">
                      {log.userName} ({log.userId})
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Action</div>
                    <div className="text-sm font-medium text-gray-900">{log.action}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Document</div>
                    <div className="text-sm font-medium text-gray-900">
                      {log.documentNumber} - {log.documentTitle}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">IP Address</div>
                    <div className="text-sm font-medium text-gray-900">{log.ipAddress}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">User Agent</div>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {log.userAgent}
                    </div>
                  </div>
                </div>

                {log.changes && Object.keys(log.changes).length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Changes</div>
                    {Object.entries(log.changes).map(([key, value]) => (
                      <div key={key} className="text-sm mb-2">
                        <span className="font-medium text-gray-900">{key}:</span>{' '}
                        <span className="text-red-600">{JSON.stringify(value.old)}</span> →{' '}
                        <span className="text-green-600">{JSON.stringify(value.new)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {log.electronicSignature && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-green-900 mb-2">
                      Electronic Signature
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-green-700">Signed By:</span>{' '}
                        <span className="font-medium text-green-900">
                          {log.electronicSignature.signedBy}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-700">Role:</span>{' '}
                        <span className="font-medium text-green-900">
                          {log.electronicSignature.signedByRole}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-700">Meaning:</span>{' '}
                        <span className="font-medium text-green-900">
                          {log.electronicSignature.meaning}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-700">Signed At:</span>{' '}
                        <span className="font-medium text-green-900">
                          {new Date(log.electronicSignature.signedAt).toLocaleString()}
                        </span>
                      </div>
                      {log.electronicSignature.reason && (
                        <div className="md:col-span-2">
                          <span className="text-green-700">Reason:</span>{' '}
                          <span className="font-medium text-green-900">
                            {log.electronicSignature.reason}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
