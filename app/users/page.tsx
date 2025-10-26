"use client";
import Link from "next/link";
import React from "react";

const UserManagement = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-gray-800 font-display">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
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

            {/* Navbar */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Compaign
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

      {/* Body Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg  font-semibold"
                >
                  <span className="material-symbols-outlined">description</span>
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 font-semibold rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined">group</span>
                  <span>Users</span>
                </a>
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

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
              User Management
            </h1>
            <p className="mt-1 text-gray-600">
              Manage all users on the Malcom_Company platform.
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-800 sm:pl-6">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
                      Role
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
                      Status
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    {
                      name: "Lindsay Walton",
                      email: "lindsay.walton@example.com",
                      role: "Admin",
                      status: "Active",
                      img: "https://randomuser.me/api/portraits/women/65.jpg",
                      color: "success",
                    },
                    {
                      name: "Courtney Henry",
                      email: "courtney.henry@example.com",
                      role: "Researcher",
                      status: "Inactive",
                      img: "https://randomuser.me/api/portraits/women/68.jpg",
                      color: "warning",
                    },
                  ].map((user, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <img
                            src={user.img}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="font-medium text-gray-800">
                              {user.name}
                            </div>
                            <div className="text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            user.color === "success"
                              ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                              : "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 mr-1.5 rounded-full ${
                              user.color === "success"
                                ? "bg-green-600"
                                : "bg-yellow-500"
                            }`}
                          ></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end gap-4">
                          <button className="text-blue-600 hover:text-blue-800">
                            <span className="material-symbols-outlined text-xl">
                              edit
                            </span>
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <span className="material-symbols-outlined text-xl">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Add Button */}
      <button
        title="Add New User"
        className="group fixed bottom-8 right-8 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg px-4 py-3 hover:bg-blue-700 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
        <span className="ml-2 hidden text-sm font-semibold group-hover:block">
          Add User
        </span>
      </button>
    </div>
  );
};

export default UserManagement;
