'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';

const ManageBountyPrograms = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [active, setActive] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = async () => {
    setLoading(true);
    const [pendingRes, activeRes] = await Promise.all([
      supabase.from('compaigns').select('*'),
      supabase.from('bounty').select('*'),
    ]);

    if (pendingRes.error) toast.error('Failed to fetch pending programs');
    else setPending(pendingRes.data || []);

    if (activeRes.error) toast.error('Failed to fetch active programs');
    else setActive(activeRes.data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <AdminLayout title="Manage Bounty Programs">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Pending */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🕓 Pending Programs
            </h3>
            {pending.length === 0 ? (
              <p className="text-gray-500">No pending campaigns found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pending.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl shadow p-5 border border-gray-200"
                  >
                    <img
                      src={p.logo_url || '/default-logo.png'}
                      alt={p.name}
                      className="h-40 w-full object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-lg font-bold text-gray-800">{p.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{p.description}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      💰 {p.reward_min} - {p.reward_max}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Active */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ✅ Active Programs
            </h3>
            {active.length === 0 ? (
              <p className="text-gray-500">No active programs found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {active.map((a) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-xl shadow p-5 border border-gray-200"
                  >
                    <img
                      src={a.logo_url || '/default-logo.png'}
                      alt={a.name}
                      className="h-40 w-full object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-lg font-bold text-gray-800">{a.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{a.tagline}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      💰 {a.reward_min} - {a.reward_max}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </AdminLayout>
  );
};

export default ManageBountyPrograms;
