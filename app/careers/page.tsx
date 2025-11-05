'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../redux/userSlice';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';

const CareersPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Get logged-in user from Redux
  const user = useSelector((state: any) => state.user.currentUser);
  const isLoggedIn = !!user;

  // ✅ State for job data & search
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch jobs from Supabase careers table
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

  // ✅ Logout function
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  // ✅ Protected navigation
  const handleProtectedNav = (path: string) => {
    if (!isLoggedIn) router.push('/signup');
    else router.push(path);
  };

  // ✅ Apply button logic
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

      // ✅ Beautiful green success toast
      toast.success(
        `🎉 Congratulations ${username}! You’ve successfully applied for ${job.title}.`,
        {
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
        }
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application.');
    }
  };

  // ✅ Filter jobs by search term
  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.location} ${job.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                bug_report
              </span>
              <h2 className="text-text-light dark:text-text-dark text-xl font-bold">
                Malcom_Company
              </h2>
            </div>

            {/* ✅ Navbar */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary font-medium"
              >
                Home
              </Link>
              <Link
                href="/compaigns"
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary font-medium"
              >
                Compaigns
              </Link>

              <button
                onClick={() => handleProtectedNav('/bounty')}
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary font-medium"
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
                    className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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
                  className="rounded-lg px-4 py-2 text-base font-bold text-white bg-blue-600 transition-colors hover:bg-blue-700"
                >
                  Login / Signup
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-16 flex-1">
        {/* Headline */}
        <div className="text-center">
          <h1 className="text-text-light dark:text-text-dark text-4xl md:text-5xl font-bold tracking-tight">
            Careers at Malcom
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary-light dark:text-text-secondary-dark">
            Join our mission to make the digital world a safer place. At Malcom,
            we're building a team of passionate individuals dedicated to
            innovation and excellence in cybersecurity.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                search
              </span>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, keyword, or location"
              className="form-input block w-full rounded-full border-gray-300 dark:border-gray-600 bg-background-light dark:bg-card-background-dark py-3 pl-10 pr-4 text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary"
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
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-card-background-light dark:bg-card-background-dark rounded-xl p-6 flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                  {job.title}
                </h3>
                <p className="mt-1 text-text-secondary-light dark:text-text-secondary-dark">
                  {job.location}
                </p>
                <p className="mt-4 text-text-light dark:text-text-dark flex-grow">
                  {job.description}
                </p>
                <button
                  onClick={() => handleApply(job)}
                  className="mt-6 inline-block w-full text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card-background-light dark:bg-card-background-dark border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mt-8 text-sm">
            © 2025 Malcom_Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
