'use client';

import { Settings as SettingsIcon, Shield, FileText, Bell, Users } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compliance Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Compliance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">21 CFR Part 11 Mode</span>
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Electronic Signatures</span>
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Audit Trail Enabled</span>
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Document Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Document Settings</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700">Document Retention Period</label>
              <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>5 Years</option>
                <option>7 Years</option>
                <option>10 Years</option>
                <option>Indefinite</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Version Control</span>
              <input
                type="checkbox"
                checked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Auto Archival</span>
              <input
                type="checkbox"
                checked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Document Expiry Alerts</span>
              <input
                type="checkbox"
                checked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Workflow Notifications</span>
              <input
                type="checkbox"
                checked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Review Reminders</span>
              <input
                type="checkbox"
                checked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Access Control Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Access Control</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Role-Based Access</span>
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Two-Factor Authentication</span>
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Session Timeout</label>
              <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>2 Hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory Standards */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Regulatory Compliance Standards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">21 CFR Part 11</h4>
            <p className="text-sm text-green-800">
              FDA regulations on electronic records and signatures
            </p>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">ISO 9001</h4>
            <p className="text-sm text-green-800">Quality management system standards</p>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">ICH Q7</h4>
            <p className="text-sm text-green-800">
              Good Manufacturing Practice for Active Pharmaceutical Ingredients
            </p>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">GMP</h4>
            <p className="text-sm text-green-800">
              Good Manufacturing Practice guidelines
            </p>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">EU GMP Annex 11</h4>
            <p className="text-sm text-green-800">Computerized systems validation</p>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">GAMP 5</h4>
            <p className="text-sm text-green-800">
              Good Automated Manufacturing Practice
            </p>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Version:</span>{' '}
            <span className="font-medium text-gray-900">1.0.0</span>
          </div>
          <div>
            <span className="text-gray-600">Database:</span>{' '}
            <span className="font-medium text-gray-900">In-Memory (Demo)</span>
          </div>
          <div>
            <span className="text-gray-600">Last Backup:</span>{' '}
            <span className="font-medium text-gray-900">N/A</span>
          </div>
          <div>
            <span className="text-gray-600">System Status:</span>{' '}
            <span className="font-medium text-green-600">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
