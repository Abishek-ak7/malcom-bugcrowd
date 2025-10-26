"use client"

import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light p-4">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-800">Malcom_Company</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-slate-800 tracking-tight text-2xl font-bold leading-tight text-center">
          Create Your Malcom Account
        </h1>

        {/* Input fields */}
        <div className="space-y-4">
          <label className="flex flex-col">
            <p className="text-slate-800 text-sm font-medium leading-normal pb-2">Username</p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 bg-white focus:border-primary h-12 placeholder:text-slate-400 p-3 text-sm font-normal leading-normal"
              placeholder="Enter your username"
              type="text"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-slate-800 text-sm font-medium leading-normal pb-2">Email</p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 bg-white focus:border-primary h-12 placeholder:text-slate-400 p-3 text-sm font-normal leading-normal"
              placeholder="Enter your email"
              type="email"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-slate-800 text-sm font-medium leading-normal pb-2">Password</p>
            <div className="flex w-full flex-1 items-stretch">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-800 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 bg-white focus:border-primary h-12 placeholder:text-slate-400 p-3 pr-2 text-sm font-normal leading-normal"
                placeholder="Enter your password"
                type={passwordVisible ? "text" : "password"}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-slate-500 flex border border-slate-300 bg-white items-center justify-center px-3 rounded-r-lg border-l-0 hover:bg-slate-50"
              >
                <span className="material-symbols-outlined text-base">
                  {passwordVisible ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </label>
        </div>

        {/* Signup button */}
        <button className="flex w-full items-center justify-center rounded-lg bg-blue-600 h-12 text-white text-sm font-semibold tracking-wide  transition-colors">
          Sign Up
        </button>

        {/* OR divider */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400">OR</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white h-12 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
            <img
              className="h-5 w-5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU1kpBe1c7telfKRuTftnccY5VKpiCJquiAutNoSuzoi9YcPu45AjYLx6jIfkxMbQe7mXUX5xZHcCqs9FJsfWmTYcCDdxQwHM4lc1grZEtBDcIy2slKqWI_T753mNsMnonAS8ELzvKqYsWKnDevP_ExwxrrGisnhAVubagh9rhlx71D7_QfUx-4knQn09mWc12Y8-oZVx3NCl4fYQbUGL7eqRsmom5eEvyp0OOU0tP6fN4o7_Q8D2rSxCDtvHXHJyZiDeZD8VAhFoV"
              alt="Google logo"
            />
            Sign up with Google
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white h-12 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
            <img
              className="h-5 w-5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQEhT7zqmNQvlmIKLxX-CFwaeBW_cYGFOugn_0S0Hom6smeVHwajEnbES1YIihJTs8wy-7eOpnU8rdjQ5XsAeuQ5nxIM7ppvA3i0Vvxu1FJ7BMMnooLe28H-8HEaHhB4myhq6z3wgCv9EEBhy-qls8kJ0z-2VMx9iACQy6oIfEwh8RyKpkRsYGXoLU9SbNk7Nw-ajiPM2FgYqX-ONlQ7yhC8WKNv4P7iy9-DnnIELBtH3W-kX4tK2_xNCTghh-4IVTa5bySmFPIL00"
              alt="GitHub logo"
            />
            Sign up with GitHub
          </button>
        </div>

        {/* Already have account */}
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link className="font-medium text-primary hover:underline" href="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
