'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddJobPage: React.FC = () => {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle || !jobDescription || !location) {
      toast.error('Please fill all the fields before submitting.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('careers').insert([
        {
          title: jobTitle,
          description: jobDescription,
          location,
        },
      ]);

      if (error) throw error;

      toast.success('✅ Job successfully added to Careers!', {
        style: {
          background: '#16a34a',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '10px',
          padding: '14px 20px',
          fontSize: '15px',
        },
      });

      // Reset fields
      setJobTitle('');
      setJobDescription('');
      setLocation('');

      // Redirect back to admin careers page
      router.push('/admin-jobs');
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to add job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light font-display text-text-primary min-h-screen flex flex-col">
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
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin-jobs"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
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
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add New Job Listing
        </h1>
        <p className="mt-2 text-gray-600">
          Create a new job post to appear on the Careers page.
        </p>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Job Title */}
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium text-gray-800 pb-2">
                  Job Title
                </p>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Security Engineer"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </label>
            </div>

            {/* Location */}
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium text-gray-800 pb-2">
                  Job Location
                </p>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Chennai, India"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </label>
            </div>

            {/* Job Description */}
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium text-gray-800 pb-2">
                  Job Description
                </p>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the role and responsibilities..."
                  className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </label>
            </div>

       

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Adding...' : 'Add Job Listing'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2025 Malcom_Company — All rights reserved.
      </footer>
    </div>
  );
};

export default AddJobPage;
