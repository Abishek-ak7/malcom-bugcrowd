"use client";
import Link from "next/link";
import React from "react";

const ManageBountyPrograms: React.FC = () => {
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
                Campaigns
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Blogs
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Careers
              </a>
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-semibold"
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
            <h2 className="text-2xl font-semibold text-gray-800">
              Manage Bounty Programs
            </h2>
            <button className="flex h-10 items-center justify-center gap-2 px-4 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined">add_circle</span>
              Add New Program
            </button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Search Bar */}
            <div className="mb-6 w-full md:w-1/2 lg:w-1/3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full items-center rounded-lg h-full border border-gray-200 bg-white">
                  <div className="text-gray-400 flex items-center justify-center pl-4">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    placeholder="Search for a program..."
                    className="flex w-full px-4 border-none focus:outline-none text-base rounded-r-lg"
                  />
                </div>
              </label>
            </div>

            {/* Program Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {/* Card Example */}
              {[
                {
                  name: "Example Corp. Web App Bounty",
                  status: "Active",
                  statusColor: "green",
                  submissions: 124,
                  bounty: "$25,000",
                },
                {
                  name: "API Security Bounty",
                  status: "Paused",
                  statusColor: "orange",
                  submissions: 78,
                  bounty: "$15,000",
                },
                {
                  name: "Mobile App Vulnerability Program",
                  status: "Active",
                  statusColor: "green",
                  submissions: 210,
                  bounty: "$50,000",
                },
              ].map((program, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded-xl shadow-md bg-white overflow-hidden hover:shadow-lg transition"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{program.name}</h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-${program.statusColor}-100 text-${program.statusColor}-800`}
                      >
                        {program.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-600 mb-4">
                      <p>Submissions: {program.submissions}</p>
                      <p>Total Bounty: {program.bounty}</p>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <button className="flex items-center gap-2 min-w-[84px] rounded-lg h-9 px-4 bg-blue-100 text-blue-600 text-sm font-medium hover:bg-blue-200 transition">
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                        Edit
                      </button>
                      <button className="flex items-center gap-2 min-w-[84px] rounded-lg h-9 px-4 bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200 transition">
                        <span className="material-symbols-outlined text-base">
                          delete
                        </span>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-xl text-center">
                <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                  inbox
                </span>
                <h3 className="text-xl font-semibold">No more programs</h3>
                <p className="text-gray-500 mt-2 mb-4">
                  Get started by creating your first program.
                </p>
                <button className="flex items-center justify-center gap-2 min-w-[120px] rounded-lg h-10 px-4 bg-blue-600 text-white text-sm font-medium shadow-md hover:bg-blue-700 transition">
                  <span className="material-symbols-outlined">add_circle</span>
                  Add New Program
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManageBountyPrograms;
