"use client";
import Link from "next/link";
import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-white font-display text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-3xl">
                bug_report
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Malcom_Company</h1>
            </div>

            {/* Navbar */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Compaigns
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Blogs
              </a>
             <Link className="text-base font-medium text-black hover:text-primary dark:hover:text-primary hover:underline" href="/admin-jobs">
                  Careers
                </Link>
            </nav>

      

            {/* Mobile Menu */}
            <button className="lg:hidden text-gray-700">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
          <nav className="flex-1 px-4 py-4 mt-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-semibold"
                >
                  <span className="material-symbols-outlined">description</span>
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/users"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined">group</span>
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin-bounty"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined">apps</span>
                  <span>Programs</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Topbar */}
          <header className="h-20 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
            <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-gray-700">
                notifications
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </header>

          {/* Reports Section */}
          <main className="flex-1 p-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white border border-gray-200">
                    <div className="text-gray-500 flex items-center justify-center pl-4">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                      placeholder="Search reports..."
                      className="flex w-full px-4 border-none focus:outline-none text-base rounded-r-lg"
                    />
                  </div>
                </label>
              </div>
              <div className="flex gap-4">
                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white px-4 border border-gray-200">
                  <p className="text-gray-700 text-sm font-medium">Severity</p>
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    expand_more
                  </span>
                </button>
                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-white px-4 border border-gray-200">
                  <p className="text-gray-700 text-sm font-medium">Status</p>
                  <span className="material-symbols-outlined text-gray-700 text-base">
                    expand_more
                  </span>
                </button>
              </div>
            </div>

            {/* Report Cards */}
            <div className="space-y-4">
              {/* Report 1 */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Cross-Site Scripting (XSS) in User Profile
                  </h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium mt-2 sm:mt-0">
                    High
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row text-sm text-gray-500 mb-4 gap-4">
                  <p>
                    Submitted by:{" "}
                    <span className="font-medium text-gray-800">
                      SecurityResearcher123
                    </span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="font-medium text-gray-800">2024-10-26</span>
                  </p>
                </div>
                <div className="flex gap-3 justify-end">
                  <button className="h-10 px-4 rounded-lg text-sm font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    View
                  </button>
                  <button className="h-10 px-4 rounded-lg text-sm font-semibold bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                    Approve
                  </button>
                  <button className="h-10 px-4 rounded-lg text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>

              {/* Report 2 */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Insecure Direct Object Reference (IDOR) on File Upload
                  </h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium mt-2 sm:mt-0">
                    Critical
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row text-sm text-gray-500 mb-4 gap-4">
                  <p>
                    Submitted by:{" "}
                    <span className="font-medium text-gray-800">
                      EthicalHacker456
                    </span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="font-medium text-gray-800">2024-10-25</span>
                  </p>
                </div>
                <div className="flex gap-3 justify-end">
                  <button className="h-10 px-4 rounded-lg text-sm font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    View
                  </button>
                  <button className="h-10 px-4 rounded-lg text-sm font-semibold bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                    Approve
                  </button>
                  <button className="h-10 px-4 rounded-lg text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
