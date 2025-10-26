"use client";
import Link from "next/link";
import React, { useState } from "react";

const AddJobPage: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ jobTitle, jobDescription, requirements });
    setJobTitle("");
    setJobDescription("");
    setRequirements("");
    alert("Job Listing Added!");
  };

  return (
    <div className="bg-background-light font-display text-text-primary  min-h-screen flex flex-col">
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary  sm:text-4xl">
          Add New Job Listing
        </h1>

        <div className="mt-8 bg-background-light rounded-xl border border-secondary shadow-sm p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Job Title */}
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium text-text-primary  pb-2">
                  Job Title
                </p>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Security Engineer"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary  focus:outline-0 focus:ring-2 focus:ring-primary/50 y border border-gray-300  bg-background-light  h-12 placeholder:text-text-secondary  p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Job Description */}
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium text-text-primary dark:text-white pb-2">
                  Job Description
                </p>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the role and responsibilities..."
                  className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-text-primary  focus:outline-0 focus:ring-2 focus:ring-primary/50  border border-gray-300  bg-background-light  min-h-36 placeholder:text-text-secondary p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Requirements */}
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium text-text-primary  pb-2">
                  Requirements
                </p>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="List the necessary skills and qualifications..."
                  className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50  border border-gray-300  bg-background-light min-h-36 placeholder:text-text-secondary p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
              >
                Add Job Listing
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddJobPage;
