'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';

const AdminCandidates = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  // ✅ Fetch all applications
  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('applied_at', { ascending: false });

    if (error) {
      console.error(error);
      toast.error('Failed to fetch candidates');
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ Remove candidate from applications
  const removeFromApplications = async (id: string) => {
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) {
      console.error(error);
      toast.error('Failed to remove candidate from applications');
    } else {
      // Remove locally for instant UI update
      setApplications((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // ✅ Accept candidate -> move to accepted_candidates & remove from applications
  const handleAccept = async (candidate: any) => {
    try {
      const { error } = await supabase.from('accepted_candidates').insert([
        {
          user_id: candidate.user_id,
          username: candidate.username,
          user_email: candidate.user_email,
          job_id: candidate.job_id,
          job_title: candidate.job_title,
          job_location: candidate.job_location,
          applied_at: candidate.applied_at,
        },
      ]);

      if (error) throw error;

      await removeFromApplications(candidate.id);
      toast.success(`✅ ${candidate.username} moved to Accepted Candidates`);
      setSelectedApp(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to accept candidate');
    }
  };

  // ✅ Reject candidate -> move to rejected_candidates & remove from applications
  const handleReject = async (candidate: any) => {
    try {
      const { error } = await supabase.from('rejected_candidates').insert([
        {
          user_id: candidate.user_id,
          username: candidate.username,
          user_email: candidate.user_email,
          job_id: candidate.job_id,
          job_title: candidate.job_title,
          job_location: candidate.job_location,
          applied_at: candidate.applied_at,
        },
      ]);

      if (error) throw error;

      await removeFromApplications(candidate.id);
      toast.success(`❌ ${candidate.username} moved to Rejected Candidates`);
      setSelectedApp(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to reject candidate');
    }
  };

  return (
    <AdminLayout title="Candidates">
      {loading ? (
        <p className="text-gray-500">Loading candidates...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No candidates found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                  Job Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                  Applied At
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {app.username || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {app.user_email || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {app.job_title || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {app.job_location || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.applied_at
                      ? new Date(app.applied_at).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Modal for Candidate Details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedApp.username}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Applied for{' '}
              <span className="font-semibold text-gray-800">
                {selectedApp.job_title || '—'}
              </span>{' '}
              ({selectedApp.job_location || '—'}) on{' '}
              {new Date(selectedApp.applied_at).toLocaleDateString()}
            </p>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Email:</strong> {selectedApp.user_email}
              </p>
              <p>
                <strong>Job ID:</strong> {selectedApp.job_id || '—'}
              </p>
              <p>
                <strong>User ID:</strong> {selectedApp.user_id || '—'}
              </p>
            </div>

            {/* ✅ Accept / Reject Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => handleAccept(selectedApp)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(selectedApp)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCandidates;
