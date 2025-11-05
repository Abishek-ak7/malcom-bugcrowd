'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../redux/userSlice';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';

interface Bounty {
  id: string;
  name: string;
  tagline: string;
  reward_min: number;
  reward_max: number;
  category: string;
  logo_url: string;
  description?: string;
  created_at?: string;
}

const ActiveBountyPrograms: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.currentUser);
  const isLoggedIn = !!user;

  // ✅ Logout
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  // ✅ Protected navigation
  const handleProtectedNav = (path: string) => {
    if (!isLoggedIn) router.push('/signup');
    else router.push(path);
  };

  // ✅ Fetch bounties from Supabase
  const fetchBounties = async (searchQuery = '', filterBy = '') => {
    try {
      setLoading(true);

      let query = supabase
        .from('bounty')
        .select('*')
        .order('created_at', { ascending: false });

      // ✅ Apply search query
      if (searchQuery.trim() !== '') {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      // ✅ Apply category filter
      if (filterBy && filterBy.trim() !== '') {
        query = query.eq('category', filterBy);
      }

      const { data, error } = await query;

      if (error) throw error;

      setBounties(data || []);
    } catch (err: any) {
      console.error('Fetch error:', err);
      toast.error('Failed to load bounty programs');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Search (on button click or Enter)
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    fetchBounties(search, filter || '');
  };

  // ✅ Real-time Updates (listen for Supabase table changes)
  useEffect(() => {
    fetchBounties();

    const channel = supabase
      .channel('bounty-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bounty' },
        () => fetchBounties(search, filter || '')
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ Optional: auto-refresh on search/filter change (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBounties(search, filter || '');
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, filter]);

  const filters = [
    'Web App',
    'Mobile App',
    'API',
    'Blockchain',
    'Cloud Infrastructure',
    'IoT',
    'Network',
  ];

  return (
    <div className="bg-background-light font-display min-h-screen flex flex-col">
      {/* ✅ Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-3xl">
              bug_report
            </span>
            <h2 className="text-gray-900 text-xl font-bold">Malcom_Company</h2>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/bounty" className="text-blue-600 font-bold">
              Active Programs
            </Link>
            <Link href="/compaigns" className="hover:text-blue-600 font-medium">
              Compaigns
            </Link>
            <button
              onClick={() => handleProtectedNav('/careers')}
              className="hover:text-blue-600 font-medium"
            >
              Careers
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/profile')}
                  className="flex items-center gap-2 rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-xl">
                      account_circle
                    </span>
                  )}
                  <span className="hidden sm:inline text-sm font-medium">
                    {user?.name || 'Profile'}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Login / Signup
              </Link>
            )}
          </nav>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* ✅ Search and Filters */}
      <div className="bg-white sticky top-[65px] border-b border-gray-200">
        <div className="container mx-auto p-4 flex flex-col sm:flex-row items-center gap-3">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full sm:w-auto bg-gray-100 rounded-full px-4 h-12"
          >
            <span className="material-symbols-outlined text-gray-500">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a program..."
              className="flex-1 bg-transparent px-4 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700"
            >
              Search
            </button>
          </form>

          <div className="flex gap-3 overflow-x-auto py-2 sm:py-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  fetchBounties(search, f);
                }}
                className={`px-4 py-2 rounded-full font-medium ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
            {filter && (
              <button
                onClick={() => {
                  setFilter(null);
                  fetchBounties(search, '');
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Programs Grid */}
      <main className="flex-1 container mx-auto p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading bounties...</p>
        ) : bounties.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {bounties.map((b) => (
              <Link
                href={`/vulnerability/${b.id}`}
                key={b.id}
                className="flex flex-col gap-3 rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={b.logo_url || '/default-logo.png'}
                    alt={`${b.name} logo`}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <p className="text-gray-900 text-lg font-semibold">{b.name}</p>
                    <p className="text-gray-600 text-sm">{b.tagline}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Reward:</p>
                  <p className="text-green-600 text-lg font-bold">
                    ${b.reward_min} - ${b.reward_max}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {b.category}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No bounties found.</p>
        )}
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2025 Malcom_Company — All rights reserved.
      </footer>
    </div>
  );
};

export default ActiveBountyPrograms;
