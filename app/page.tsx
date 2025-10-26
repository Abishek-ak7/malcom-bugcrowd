'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BugVerse() {


  return (
    <div className={`min-h-screen`}>
      <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
        <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-text-light dark:text-text-dark">Malcom_Company</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
            
              
              <button className="p-2 rounded-md md:hidden">
                <span className="material-symbols-outlined">menu</span>
              </button>
              
              <nav className="hidden md:flex items-center gap-6">
                <a className="text-base font-medium text-black hover:text-primary dark:hover:text-primary hover:underline" href="#">
                  Home
                </a>
                <Link className="text-base font-medium text-black  hover:text-primary dark:hover:text-primary hover:underline" href="/bounty">
                  Active Programs
                </Link>
                <Link className="text-base font-medium text-black  hover:text-primary dark:hover:text-primary hover:underline" href="/compaigns">
                  Compaigns
                </Link>
                <Link className="text-base font-medium text-black hover:text-primary dark:hover:text-primary hover:underline" href="/careers">
                  Careers
                </Link>
                <Link  className="flex items-center justify-center rounded-lg  px-4 py-2 text-base font-bold text-white bg-blue-600 transition-colors" href="/login">
                  Login/Signup
                </Link>
              </nav>
            </div>
          </header>

          {/* Hero Section */}
        <div className="flex items-center justify-center min-h-[536] bg-background-light dark:bg-background-dark">
            <div className="flex flex-col gap-6 items-center justify-center text-center rounded-xl p-6">
                <div className="flex flex-col gap-4">
                    <h1 className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-tighter sm:text-5xl">
                      Find and Fix Vulnerabilities Faster
                    </h1>
                    <h2 className="text-text-light dark:text-text-dark text-base font-normal leading-normal sm:text-lg max-w-2xl mx-auto">
                      Malcom_Company connects organizations with a global network of ethical hackers to identify and resolve security vulnerabilities.
                    </h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                    <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-white text-base font-bold leading-normal tracking-wide bg-blue-600 transition-colors">
                        Launch a Program
                    </button>
                    <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-secondary-light dark:bg-secondary-dark text-primary text-base font-bold leading-normal tracking-wide hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                        Browse Programs
                    </button>
                </div>
              </div>
          </div>


          {/* Features Section */}
        <div className="px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-none">
            {/* Feature 1 */}
            <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">
                  Secure Reports
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Submit and receive vulnerability reports through our secure and confidential system.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">
                  Verified Researchers
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Our community of security researchers is vetted to ensure high-quality, actionable reports.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">
                  Easy Rewards
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Our streamlined system ensures you get paid quickly and easily for your valuable contributions.
                </p>
              </div>
            </div>
          </div>
        </div>



          {/* Footer */}
         <footer className="bg-background-light dark:bg-background-dark px-4 py-10">
  {/* Links */}
  <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 mb-6">
    <a
      className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal hover:text-primary dark:hover:text-primary hover:underline"
      href="#"
    >
      About Us
    </a>
    <a
      className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal hover:text-primary dark:hover:text-primary hover:underline"
      href="#"
    >
      Contact
    </a>
    <a
      className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal hover:text-primary dark:hover:text-primary hover:underline"
      href="#"
    >
      Privacy Policy
    </a>
    <a
      className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal hover:text-primary dark:hover:text-primary hover:underline"
      href="#"
    >
      Terms of Service
    </a>
  </div>



  {/* Copyright */}
  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal text-center">
    © 2023 Malcom_Company, Inc.
  </p>
</footer>

        </div>
      </div>
    </div>
  );
}