'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen">
            <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <Link className="flex items-center justify-center size-10 rounded-full text-black dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10" href="/">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
        </div>
      </header>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <svg    className="mx-auto h-12 w-auto text-blue-600 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.59L7.71 13.3a.996.996 0 111.41-1.41L11 13.17V7a1 1 0 012 0v6.17l1.88-1.88a.996.996 0 111.41 1.41L13.41 16.6a1 1 0 01-1.41 0z" />
            </svg>

            <h1 className="text-[#0d141b]  tracking-light text-[32px] font-bold leading-tight pt-6 pb-3 text-center">
              Log In to Malcom_Company
            </h1>
            <p className="text-[#4c739a] dark:text-gray-400 text-base font-normal leading-normal text-center">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-background-dark rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="flex flex-col">
                <label 
                  htmlFor="email" 
                  className="text-[#0d141b]  text-base font-medium leading-normal pb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] bg-gray-200 h-14 placeholder:text-[#4c739a] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label 
                  htmlFor="password" 
                  className="text-[#0d141b] text-base font-medium leading-normal pb-2"
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
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7]  bg-gray-200  h-14 placeholder:text-[#4c739a] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#4c739a] dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="mt-4 text-right">
                <a 
                  href="#" 
                  className="text-sm font-medium text-blue-600 hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full h-14 bg-blue-600 text-white font-bold text-base rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                >
                  Log In
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#4c739a] dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link 
                    href="/signup" 
                    className="font-medium text-blue-600 hover:underline transition-colors"
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