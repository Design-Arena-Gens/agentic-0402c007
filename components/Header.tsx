'use client';

import { useStore } from '@/lib/store';
import { Bell, User, LogOut } from 'lucide-react';

export default function Header() {
  const { currentUser, notifications } = useStore();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">DocumentManagement</h1>
            <span className="ml-4 text-sm text-blue-200">
              Pharmaceutical DMS | 21 CFR Part 11 Compliant
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors">
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-blue-700 px-3 py-2 rounded-lg">
                <User className="h-5 w-5" />
                <div className="text-sm">
                  <div className="font-semibold">{currentUser?.name}</div>
                  <div className="text-blue-200 text-xs">{currentUser?.role}</div>
                </div>
              </div>
              <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
