'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  // ✅ Fetch reports
  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      toast.error('Failed to fetch reports');
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-700 border border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-700 border border-orange-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      default:
        return 'bg-green-100 text-green-700 border border-green-300';
    }
  };

  return (
    <AdminLayout title="Reports">
      {loading ? (
        <p className="text-gray-500">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reports.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer p-6 flex flex-col justify-between"
              onClick={() => setSelectedReport(r)}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {r.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${getSeverityColor(
                      r.severity
                    )}`}
                  >
                    {r.severity}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Company:</strong> {r.company_name || '—'}
                </p>

                <p className="text-sm text-gray-600 mb-2 truncate">
                  <strong>URL:</strong>{' '}
                  <a
                    href={r.url}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {r.url}
                  </a>
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Reported by <span className="font-medium">{r.username}</span>
                </p>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                {new Date(r.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal for Viewing Full Report */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedReport.title}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${getSeverityColor(
                  selectedReport.severity
                )}`}
              >
                {selectedReport.severity}
              </span>
              <p className="text-sm text-gray-600">
                Reported by <b>{selectedReport.username}</b> on{' '}
                {new Date(selectedReport.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Company:</strong> {selectedReport.company_name || '—'}
              </p>
              <p>
                <strong>Vulnerable URL:</strong>{' '}
                <a
                  href={selectedReport.url}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {selectedReport.url}
                </a>
              </p>
              <p>
                <strong>Steps to Reproduce:</strong>
                <br />
                <span className="whitespace-pre-wrap text-gray-700">
                  {selectedReport.steps || 'No steps provided.'}
                </span>
              </p>
            </div>

            {/* Optional File */}
            {selectedReport.file_url && (
              <div className="mt-5">
                <strong>Attached File:</strong>
                {selectedReport.file_url.endsWith('.png') ||
                selectedReport.file_url.endsWith('.jpg') ||
                selectedReport.file_url.endsWith('.jpeg') ? (
                  <img
                    src={selectedReport.file_url}
                    alt="Report Screenshot"
                    className="rounded-lg mt-3 border object-contain max-h-64"
                  />
                ) : (
                  <a
                    href={selectedReport.file_url}
                    target="_blank"
                    className="block mt-3 text-blue-600 hover:underline"
                  >
                    View Attachment
                  </a>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

export default AdminDashboard;
