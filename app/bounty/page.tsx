'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../redux/userSlice';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Logo from '../../public/image.png';

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
    setMenuOpen(false);
  };

  // ✅ Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Fetch bounties from Supabase
  const fetchBounties = async (searchQuery = '', filterBy = '') => {
    try {
      setLoading(true);

      let query = supabase
        .from('bounty')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery.trim() !== '') query = query.ilike('name', `%${searchQuery}%`);
      if (filterBy && filterBy.trim() !== '') query = query.eq('category', filterBy);

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

  // ✅ Load data & real-time updates
  useEffect(() => {
    fetchBounties();

    const channel = supabase
      .channel('bounty-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bounty' }, () =>
        fetchBounties(search, filter || '')
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  // ✅ Debounced search/filter refresh
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBounties(search, filter || '');
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, filter]);

  const filters = ['Web App', 'Mobile App', 'API', 'Blockchain', 'Cloud Infrastructure', 'IoT', 'Network'];

  return (
    <div className="bg-white font-display min-h-screen flex flex-col text-gray-900">
      {/* ✅ Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          {/* Logo */}
           <div className="flex items-center space-x-2">
              <Image
                src={Logo} // 👈 place your image inside /public/images/
                alt="Malcom Company Logo"
                width={150} // 👈 set width in px
                height={150} // 👈 set height in px
                priority
              />
            </div>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-600 font-medium">Home</Link>
            <Link href="/bounty" className="text-blue-600 font-bold">Active Programs</Link>
            <Link href="/compaigns" className="hover:text-blue-600 font-medium">Compaigns</Link>
            <button onClick={() => handleProtectedNav('/careers')} className="hover:text-blue-600 font-medium">
              Careers
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/profile')}
                  className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-xl">account_circle</span>
                  )}
                  <span className="hidden sm:inline text-sm font-medium">{user?.name || 'Profile'}</span>
                </button>
                <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:underline">
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

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800">
            <span className="material-symbols-outlined text-3xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
            <nav className="flex flex-col space-y-4 p-4 text-gray-700">
              <Link href="/" onClick={() => setMenuOpen(false)} className="font-semibold text-blue-600">
                Home
              </Link>
              <Link href="/bounty" onClick={() => setMenuOpen(false)} className="font-bold text-blue-600">
                Active Programs
              </Link>
              <Link href="/compaigns" onClick={() => setMenuOpen(false)} className="font-medium hover:text-blue-600">
                Compaigns
              </Link>
              <button onClick={() => handleProtectedNav('/careers')} className="text-left font-medium hover:text-blue-600">
                Careers
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-xl">account_circle</span>
                    )}
                    <span className="text-sm font-medium">{user?.name || 'Profile'}</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="text-red-600 font-medium hover:underline text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 text-center"
                >
                  Login / Signup
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

{/* ✅ Search and Filters */}
      <div className="bg-white sticky top-[65px] border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* 🔍 Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchBounties(search, filter || '');
            }}
            className="flex w-full lg:w-[40%] bg-gray-100 rounded-full px-4 py-2 h-12 items-center shadow-sm"
          >
            <span className="material-symbols-outlined text-gray-500 text-xl">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a program..."
              className="flex-1 bg-transparent px-4 outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Search
            </button>
          </form>

          {/* 🧭 Filters */}
          <div className="flex flex-wrap sm:flex-nowrap justify-center lg:justify-end gap-2 sm:gap-3 overflow-x-auto py-2 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  fetchBounties(search, f);
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm sm:text-base font-medium transition ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-sm'
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
                className="text-sm text-red-600 hover:underline font-medium"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Small Screen Divider */}
        <div className="border-t border-gray-100 block lg:hidden"></div>
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
                    className="w-12 h-12 rounded-lg object-cover"
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

      {/* ✅ Simple Dropdown Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ActiveBountyPrograms;
