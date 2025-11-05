'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  // 🔹 Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    dispatch(loginStart());

    try {
      // 🔹 Call your backend API route
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

            if (res.ok && data.user) {
          dispatch(
            loginSuccess({
              id: data.user.id,
              name: data.user.username || "User",
              email: data.user.email,
              avatar: data.user.avatar || "",
            })
          );

          setMessage("Login successful! Redirecting...");
          setTimeout(() => router.push(data.redirect || "/"), 1200);
        }
else {
        dispatch(loginFailure(data.message || 'Invalid credentials'));
        setMessage(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error(error);
      dispatch(loginFailure('Network error'));
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <Link
            className="flex items-center justify-center size-10 rounded-full text-black dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10"
            href="/"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
        </div>
      </header>

      {/* Main Login Form */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-8 text-center">
            <svg
              className="mx-auto h-12 w-auto text-blue-600 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.59L7.71 13.3a.996.996 0 111.41-1.41L11 13.17V7a1 1 0 012 0v6.17l1.88-1.88a.996.996 0 111.41 1.41L13.41 16.6a1 1 0 01-1.41 0z" />
            </svg>

            <h1 className="text-[#0d141b] tracking-light text-[32px] font-bold leading-tight pt-6 pb-3">
              Log In to Malcom_Company
            </h1>
            <p className="text-[#4c739a] dark:text-gray-400 text-base">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-background-dark rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-[#0d141b] font-medium pb-2 block"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-[#cfdbe7] text-black bg-gray-200 p-[15px] h-14 text-base placeholder:text-[#020202]"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-[#0d141b] font-medium pb-2 block"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-[#cfdbe7] text-black bg-gray-200 p-[15px] h-14 text-base placeholder:text-[#000000] pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#4c739a] hover:text-blue-600"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-14 rounded-lg font-bold text-base text-white ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>

              {/* Message */}
              {message && (
                <p
                  className={`text-center text-sm font-medium mt-3 ${
                    message.toLowerCase().includes('success')
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >
                  {message}
                </p>
              )}

              {/* Signup Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-[#4c739a]">
                  Don’t have an account?{' '}
                  <Link
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
