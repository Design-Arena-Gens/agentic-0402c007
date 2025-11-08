'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import DocumentList from '@/components/DocumentList';
import DocumentTypes from '@/components/DocumentTypes';
import Workflows from '@/components/Workflows';
import UserManagement from '@/components/UserManagement';
import AuditLogs from '@/components/AuditLogs';
import Settings from '@/components/Settings';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'documents':
        return <DocumentList />;
      case 'document-types':
        return <DocumentTypes />;
      case 'workflows':
        return <Workflows />;
      case 'users':
        return <UserManagement />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
