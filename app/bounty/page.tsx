"use client";

import Link from "next/link";
import React, { useState } from "react";

const ActiveBountyPrograms: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display">
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
                <Link className="text-base font-medium text-black hover:text-primary dark:hover:text-primary hover:underline" href="/">
                  Home
                </Link>
                <Link className="text-base font-medium text-blue-600  hover:text-primary dark:hover:text-primary hover:underline" href="/bounty">
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-10 bg-background-light  p-4 pt-20 flex flex-col animate-fadeIn">
          <nav className="flex-1">
            <ul className="space-y-4">
              {["Home", "Active Programs", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-2xl font-semibold text-text-primary  hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <a
              href="#"
              className="block w-full text-center py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Login / Signup
            </a>
          </div>
        </div>
      )}

      {/* Secondary Header */}
      <div className="sticky top-[60px] z-10 bg-background-light  backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <h1 className="text-text-primary  text-xl font-bold">
            Active Bounty Programs
          </h1>
          <button className="flex items-center justify-center h-10 w-10 rounded-full text-text-primary ">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="flex items-center rounded-lg bg-gray-100  h-12">
            <span className="material-symbols-outlined pl-4 text-text-secondary ">
              search
            </span>
            <input
              type="text"
              placeholder="Search for a program..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-text-primary  placeholder:text-text-secondary "
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 p-4 pt-0 overflow-x-auto">
          {["Industry", "Reward Range", "Sort by: Newest"].map((filter, i) => (
            <button
              key={filter}
              className={`flex h-10 items-center justify-center gap-x-2 rounded-full px-4 ${
                i < 2
                  ? "bg-secondary  text-primary "
                  : "bg-gray-100  text-text-secondary "
              }`}
            >
              <p className="text-sm font-medium">{filter}</p>
              <span className="material-symbols-outlined text-xl">
                arrow_drop_down
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <main className="flex-1 pb-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-4">
          {programs.map((p) => (
            <Link href="/vulnerability"
              key={p.name}
              className="flex flex-col gap-3 pb-3 rounded-xl border border-gray-200  p-4 bg-white "
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <p className="text-text-primary  text-lg font-semibold">
                    {p.name}
                  </p>
                  <p className="text-text-secondary  text-sm">
                    {p.tagline}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-text-secondary  text-sm font-medium">
                  Reward:
                </p>
                <p className="text-green-500 text-lg font-bold">
                  {p.rewardRange}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.badgeColor}`}
                >
                  {p.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

// ✅ Dummy Data
const programs = [
  {
    name: "Innovate Inc.",
    tagline: "Pioneering the future of tech.",
    rewardRange: "$100 - $5,000",
    category: "Web App",
    badgeColor:
      "bg-blue-100 text-blue-800 ",
    logo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvk1dsXIrPLa0dtvSrzl2Onw1_PzbMEwSH_X-SrqAUA_CELudDFWultrDDgNcTDdUkXzGwJOnh4-tvBtX0rpoluCKFNiLnsjVNYn_9KDq2xN7PUrfHx0P-3-9qKxENWe13tOROXESTz-pTb-HISAKq3Pkt-VPK0BhDT3PhusaLbQoVv77Jx1UC44DFAcRbn-t88vdOODdAJ1PyRxsklZi7hMkzw-Y8hiMWDU9qDeO0PmHjEERxAB0MEmoqCavqFB5e5z5hrAGD7FoK",
  },
  {
    name: "SecureSoft",
    tagline: "Your digital fortress.",
    rewardRange: "$200 - $10,000",
    category: "Mobile App",
    badgeColor:
      "bg-orange-100 text-orange-800 ",
    logo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAafHli8VtMoXDUoFhieG51FcqmhjpxwKtDD3xev8IGHd65_wggoyHe8G326PeyOaVtKUNqeDY8Cb9NskO0LmtoSJHZ6o8I7bou74_t2BswuItZJkop_zSh0dt-k2rD0M0qq76Gl_eQgvBpa588ZFaVpJN_LSa2hH8nrdexUKA2-LpXfothq4dlNKMsai-PfCPK3wxsbRI5EA608R0AEPFRR-rfmYT7hq2RmcK9D-hbwz7KPZl14wQixCLofXPn_HWBnmKZ-NYYYUss",
  },
  {
    name: "DataCore",
    tagline: "Unlocking data potential.",
    rewardRange: "$50 - $2,500",
    category: "API",
    badgeColor:
      "bg-purple-100 text-purple-800 ",
    logo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkiMywtFZrSV88_u3aJR1YuW2Rp1OFoMFsZ7OnNuur6D0EYmEITH1edL6bBXOuCtAkcKytDDNmQeWjebl7FEu2H-nJWqkJ_0ZOvmH5f5FxVAZnBm6_XEYEIbioAfAADoB0C326M_Szp1197RPWoUyJylfK-I_9L_jePBD7rEW1SQehkr13xwTc_VpwbfoO_DqP6iSUc56bjj0pFmNY2U4A_MVImGKMGpWvST6cseBMlchYFQHQOOs4gMTz-LexPP3-h0wOxF0sf29k",
  },
  // add others similarly if needed
];

export default ActiveBountyPrograms;
