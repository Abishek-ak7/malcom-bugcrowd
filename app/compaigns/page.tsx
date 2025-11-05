"use client";

import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "react-hot-toast";

const CreateCampaign: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scope: "",
    rules: "",
    minReward: "",
    maxReward: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Please provide a company title");
      return;
    }

    setUploading(true);
    try {
      // Step 1️⃣ Upload logo to Supabase storage
      let logoUrl: string | null = null;

      if (logo) {
        const ext = logo.name.split(".").pop();
        const filePath = `logos/${formData.title.replace(/\s+/g, "_")}_${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("logos")
          .upload(filePath, logo);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("logos")
          .getPublicUrl(filePath);

        logoUrl = publicUrlData.publicUrl;
      }

      // Step 2️⃣ Insert into the `compaigns` table
      const { error: insertError } = await supabase.from("compaigns").insert([
        {
          name: formData.title,
          description: formData.description,
          scope: formData.scope,
          rules: formData.rules,
          reward_min: formData.minReward,
          reward_max: formData.maxReward,
          logo_url: logoUrl,
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      toast.success("Campaign created successfully!");
      setFormData({
        title: "",
        description: "",
        scope: "",
        rules: "",
        minReward: "",
        maxReward: "",
      });
      setLogo(null);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to create campaign");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      {/* ✅ Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center p-4">
          <Link
            className="flex items-center justify-center size-10 rounded-full text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10"
            href="/"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            New Campaign
          </h1>
        </div>
      </header>

      {/* ✅ Success Message */}
      {success && (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-4 bg-green-100 border border-green-300 text-green-800 rounded-lg shadow-sm text-center animate-fadeIn">
          <h4 className="text-xl font-semibold mb-1">
            🎉 Congratulations, {formData.title || "Company"}!
          </h4>
          <p className="text-sm">
            Your campaign has been successfully created and stored in the
            database.  
            Security researchers will soon see your program under{" "}
            <span className="font-semibold">Active Programs</span>!
          </p>
        </div>
      )}

      {/* ✅ Form */}
      {!success && (
        <main className="flex-1 px-4 py-6">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 md:p-8 space-y-8"
          >
            {/* Company Logo Upload */}
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Company Logo</p>
                {!logo ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <label className="cursor-pointer">
                      <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                        cloud_upload
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upload your company logo (PNG, JPG)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800 p-3">
                    <div className="flex items-center space-x-3">
                      <span className="material-symbols-outlined text-gray-500">
                        image
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {logo.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLogo(null)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                )}
              </label>
            </div>

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
                disabled={uploading}
                className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center 
                transition-all duration-300 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {uploading ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </form>
        </main>
      )}
    </div>
  );
};

export default CreateCampaign;
