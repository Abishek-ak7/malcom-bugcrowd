'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  title?: string;
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
  const pathname = usePathname();

  // ✅ Sidebar items
  const navItems = [
    { href: '/admin', label: 'Reports', icon: 'description' },
    { href: '/users', label: 'Users', icon: 'group' },
    { href: '/admin-bounty', label: 'Programs', icon: 'apps' },
    { href: '/admin-jobs', label: 'Careers', icon: 'work' },
    { href: '/admin-candidates', label: 'Candidates', icon: 'person_search' },
    { href: '/admin-accepted', label: 'Accepted Applicants', icon: 'check_circle' }, // ✅ NEW
    { href: '/admin-rejected', label: 'Rejected Candidates', icon: 'cancel' }, // ✅ NEW
  ];

  return (
    <div className="bg-white font-display text-gray-800 min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-3xl">
                bug_report
              </span>
              <h1 className="text-2xl font-bold text-gray-800">
                Malcom_Company
              </h1>
            </div>

            {/* Top Navbar */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/admin-bounty"
                className={`hover:text-blue-600 font-medium ${
                  pathname === '/admin-bounty' ? 'text-blue-600' : ''
                }`}
              >
                Programs
              </Link>
              <Link
                href="/users"
                className={`hover:text-blue-600 font-medium ${
                  pathname === '/users' ? 'text-blue-600' : ''
                }`}
              >
                Users
              </Link>
              <Link
                href="/admin-jobs"
                className={`hover:text-blue-600 font-medium ${
                  pathname === '/admin-jobs' ? 'text-blue-600' : ''
                }`}
              >
                Careers
              </Link>
              <Link
                href="/admin-candidates"
                className={`hover:text-blue-600 font-medium ${
                  pathname === '/admin-candidates' ? 'text-blue-600' : ''
                }`}
              >
                Candidates
              </Link>
              <Link
                href="/admin-accepted"
                className={`hover:text-blue-600 font-medium ${
                  pathname === '/admin-accepted' ? 'text-blue-600' : ''
                }`}
              >
                Accepted
              </Link>
              <Link
                href="/admin-rejected"
                className={`hover:text-blue-600 font-medium ${
                  pathname === '/admin-rejected' ? 'text-blue-600' : ''
                }`}
              >
                Rejected
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
          <nav className="flex-1 px-4 py-4 mt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {title && (
            <header className="h-20 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
              <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-gray-700">
                  notifications
                </span>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </header>
          )}

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
