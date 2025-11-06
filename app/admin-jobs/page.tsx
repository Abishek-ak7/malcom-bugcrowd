'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

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
    <AdminLayout title="Add Job">
      <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Add New Job Listing
        </h1>
        <p className="text-gray-600 mb-6">
          Create a new job post to appear on the Careers page.
        </p>

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
    </AdminLayout>
  );
};

export default AddJobPage;
