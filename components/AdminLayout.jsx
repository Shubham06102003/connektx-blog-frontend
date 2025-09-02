'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/auth';
import { 
  Home, 
  FileText, 
  FolderOpen, 
  LogOut, 
  Menu, 
  X,
  BarChart3
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  ];

  const handleLogout = () => {
    auth.logout();
    router.push('/admin/login');
  };

  const isActivePage = (href) => {
    return pathname === href || (href !== '/admin' && pathname.startsWith(href));
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-200 shadow-sm flex flex-col h-screen
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-gray-100">
          <Link href="/" className="text-lg font-bold text-blue-700 tracking-tight">
            Admin
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActivePage(item.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* Logout */}
        <div className="p-4 border-t border-gray-100 mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-white border border-gray-200 rounded shadow"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 min-h-screen flex flex-col items-stretch">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          {children}
        </div>
      </main>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
