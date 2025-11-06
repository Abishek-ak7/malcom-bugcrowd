'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../redux/userSlice';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Logo from '../../public/image.png';

const CareersPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.currentUser);
  const isLoggedIn = !!user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Jobs
  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error.message);
      toast.error('Failed to load job listings');
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  // ✅ Protected Navigation
  const handleProtectedNav = (path: string) => {
    if (!isLoggedIn) router.push('/signup');
    else router.push(path);
    setMenuOpen(false);
  };

  // ✅ Apply Job
  const handleApply = async (job: any) => {
    if (!isLoggedIn) {
      toast.error('Please log in first to apply.');
      router.push('/login');
      return;
    }

    try {
      const { id: user_id, name: username, email: user_email } = user;
      const { error } = await supabase.from('applications').insert([
        {
          user_id,
          username,
          user_email,
          job_id: job.id,
          job_title: job.title,
          job_location: job.location,
        },
      ]);

      if (error) throw error;

      toast.success(`🎉 ${username}, you successfully applied for ${job.title}!`, {
        style: {
          background: '#16a34a',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '10px',
          padding: '14px 20px',
          fontSize: '15px',
        },
        icon: '✅',
        duration: 4000,
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application.');
    }
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.location} ${job.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
            <Link href="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/compaigns" className="hover:text-blue-600 font-medium">
              Compaigns
            </Link>
            <button
              onClick={() => handleProtectedNav('/bounty')}
              className="hover:text-blue-600 font-medium"
            >
              Active Programs
            </button>
            <Link
              href="/careers"
              className="text-blue-600 font-bold hover:text-blue-700"
            >
              Careers
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/profile')}
                  className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800"
          >
            <span className="material-symbols-outlined text-3xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
            <nav className="flex flex-col space-y-4 p-4 text-gray-700">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-semibold hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                href="/compaigns"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600 font-medium"
              >
                Compaigns
              </Link>
              <button
                onClick={() => handleProtectedNav('/bounty')}
                className="text-left hover:text-blue-600 font-medium"
              >
                Active Programs
              </button>
              <Link
                href="/careers"
                onClick={() => setMenuOpen(false)}
                className="font-bold text-blue-600"
              >
                Careers
              </Link>

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
                    <span className="text-sm font-medium">
                      {user?.name || 'Profile'}
                    </span>
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

      {/* ✅ Main Content */}
      <main className="container mx-auto px-4 py-10 flex-1">
        {/* Headline */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Careers at Malcom
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Join our mission to make the digital world safer. At Malcom, we’re
            building a team of passionate innovators dedicated to cybersecurity.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-10 max-w-xl mx-auto w-full px-2 sm:px-0">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, keyword, or location"
              className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Job Listings */}
        {loading ? (
          <p className="text-center text-gray-500 mt-12">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">
            No jobs found matching your search.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="mt-1 text-gray-600">{job.location}</p>
                <p className="mt-4 text-gray-700 flex-grow text-sm leading-relaxed">
                  {job.description}
                </p>
                <button
                  onClick={() => handleApply(job)}
                  className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-10">
        <p className="text-center text-gray-500 text-sm">
          © 2025 Malcom_Company — All rights reserved.
        </p>
      </footer>

      {/* ✅ Dropdown Animation */}
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
      `}</style>
    </div>
  );
};

export default CareersPage;
