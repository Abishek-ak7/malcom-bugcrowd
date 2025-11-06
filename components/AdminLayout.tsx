'use client';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminGuard from './AdminGuard';
import Image from 'next/image';
import Logo from '../public/image.png';

interface AdminLayoutProps {
  title?: string;
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Sidebar items
  const navItems = [
    { href: '/admin', label: 'Reports', icon: 'description' },
    { href: '/users', label: 'Users', icon: 'group' },
    { href: '/admin-bounty', label: 'Programs', icon: 'apps' },
    { href: '/admin-jobs', label: 'Careers', icon: 'work' },
    { href: '/admin-candidates', label: 'Candidates', icon: 'person_search' },
    { href: '/admin-accepted', label: 'Accepted Applicants', icon: 'check_circle' },
    { href: '/admin-rejected', label: 'Rejected Candidates', icon: 'cancel' },
  ];

  return (
    <AdminGuard>
    <div className="bg-white font-display text-gray-800 min-h-screen flex flex-col">
      {/* ✅ Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src={Logo} // 👈 place your image inside /public/images/
                alt="Malcom Company Logo"
                width={150} // 👈 set width in px
                height={150} // 👈 set height in px
                priority
              />
            </div>

          {/* Desktop Navbar */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: '/admin-bounty', label: 'Programs' },
              { href: '/users', label: 'Users' },
              { href: '/admin-jobs', label: 'Careers' },
              { href: '/admin-candidates', label: 'Candidates' },
              { href: '/admin-accepted', label: 'Accepted' },
              { href: '/admin-rejected', label: 'Rejected' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition ${
                  pathname === item.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700"
          >
            <span className="material-symbols-outlined text-3xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-md animate-slideDown">
            <nav className="flex flex-col space-y-4 p-4 text-gray-700">
              {[
                { href: '/admin-bounty', label: 'Programs' },
                { href: '/users', label: 'Users' },
                { href: '/admin-jobs', label: 'Careers' },
                { href: '/admin-candidates', label: 'Candidates' },
                { href: '/admin-accepted', label: 'Accepted' },
                { href: '/admin-rejected', label: 'Rejected' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 font-medium ${
                    pathname === item.href
                      ? 'text-blue-600 font-semibold'
                      : 'hover:text-blue-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">arrow_right</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ✅ Layout Content */}
      <div className="flex flex-1">
        {/* Sidebar (Visible on large screens) */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
          <nav className="flex-1 px-4 py-4 mt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* ✅ Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {title && (
            <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 bg-white">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                {title}
              </h2>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-gray-700">
                  notifications
                </span>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </header>
          )}

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>

      {/* ✅ Dropdown Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
    </div>
    </AdminGuard>
  );
};

export default AdminLayout;
