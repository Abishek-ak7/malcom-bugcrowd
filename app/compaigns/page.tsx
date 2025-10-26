"use client";

import Link from "next/link";
import React, { useState } from "react";

const CreateCampaign: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scope: "",
    rules: "",
    minReward: "",
    maxReward: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <Link className="flex items-center justify-center size-10 rounded-full text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10" href="/">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            New Campaign
          </h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 md:p-8 space-y-8"
        >
          {/* Program Title */}
          <div>
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Program Title</p>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Malcom_Company Web App"
                className="form-input w-full rounded-lg text-text-light dark:text-text-dark 
                focus:outline-none focus:ring-2 focus:ring-primary/50 
                border border-border-light dark:border-border-dark 
                bg-background-light dark:bg-background-dark h-12 px-4 
                placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
              />
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Description</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A brief overview of your program and what you're looking for."
                className="form-textarea w-full rounded-lg text-text-light dark:text-text-dark 
                focus:outline-none focus:ring-2 focus:ring-primary/50 
                border border-border-light dark:border-border-dark 
                bg-background-light dark:bg-background-dark min-h-32 p-4 
                placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
              />
            </label>
          </div>

          {/* Scope */}
          <div>
            <label className="flex flex-col">
              <div className="flex items-center gap-2 pb-2">
                <p className="text-base font-medium">Scope</p>
                <span className="material-symbols-outlined text-base text-text-light/60 dark:text-text-dark/60 cursor-pointer">
                  info
                </span>
              </div>
              <textarea
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                placeholder="Define the assets that are in scope for testing (e.g., example.com, api.example.com)."
                className="form-textarea w-full rounded-lg text-text-light dark:text-text-dark 
                focus:outline-none focus:ring-2 focus:ring-primary/50 
                border border-border-light dark:border-border-dark 
                bg-background-light dark:bg-background-dark min-h-32 p-4 
                placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
              />
            </label>
          </div>

          {/* Rules */}
          <div>
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Rules</p>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="Outline the rules of engagement, such as what types of vulnerabilities are accepted and any restrictions."
                className="form-textarea w-full rounded-lg text-text-light dark:text-text-dark 
                focus:outline-none focus:ring-2 focus:ring-primary/50 
                border border-border-light dark:border-border-dark 
                bg-background-light dark:bg-background-dark min-h-32 p-4 
                placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
              />
            </label>
          </div>

          {/* Reward Range */}
          <div>
            <p className="text-base font-medium pb-2">Reward Range ($)</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="w-full flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light/50 dark:text-text-dark/50">
                  $
                </span>
                <input
                  name="minReward"
                  type="number"
                  value={formData.minReward}
                  onChange={handleChange}
                  placeholder="Min"
                  className="form-input w-full rounded-lg text-text-light dark:text-text-dark 
                  focus:outline-none focus:ring-2 focus:ring-primary/50 
                  border border-border-light dark:border-border-dark 
                  bg-background-light dark:bg-background-dark h-12 pl-7 pr-4 
                  placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
                />
              </label>
              <div className="h-[1px] w-4 bg-border-light dark:bg-border-dark hidden sm:block"></div>
              <label className="w-full flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light/50 dark:text-text-dark/50">
                  $
                </span>
                <input
                  name="maxReward"
                  type="number"
                  value={formData.maxReward}
                  onChange={handleChange}
                  placeholder="Max"
                  className="form-input w-full rounded-lg text-text-light dark:text-text-dark 
                  focus:outline-none focus:ring-2 focus:ring-primary/50 
                  border border-border-light dark:border-border-dark 
                  bg-background-light dark:bg-background-dark h-12 pl-7 pr-4 
                  placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center 
              transition-all duration-300 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateCampaign;
