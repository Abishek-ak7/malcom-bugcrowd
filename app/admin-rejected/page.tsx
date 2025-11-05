'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';

const AdminRejected = () => {
  const [rejectedList, setRejectedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  // ✅ Fetch rejected candidates
  const fetchRejected = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rejected_candidates')
      .select('*')
      .order('rejected_at', { ascending: false });

    if (error) {
      console.error(error);
      toast.error('Failed to fetch rejected candidates');
    } else {
      setRejectedList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRejected();
  }, []);

  return (
    <AdminLayout title="Rejected Candidates">
      {loading ? (
        <p className="text-gray-500">Loading rejected candidates...</p>
      ) : rejectedList.length === 0 ? (
        <p className="text-gray-500">No rejected candidates found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Job Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Job Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Rejected At</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rejectedList.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{candidate.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{candidate.user_email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{candidate.job_title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{candidate.job_location}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(candidate.rejected_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelected(candidate)}
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

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selected.username}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Rejected for <span className="font-semibold">{selected.job_title}</span> —{' '}
              {selected.job_location}
            </p>

            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {selected.user_email}</p>
              <p><strong>Job ID:</strong> {selected.job_id}</p>
              <p><strong>User ID:</strong> {selected.user_id}</p>
              <p>
                <strong>Rejected At:</strong>{' '}
                {new Date(selected.rejected_at).toLocaleString()}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelected(null)}
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

export default AdminRejected;
