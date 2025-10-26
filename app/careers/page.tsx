
"use client";
import Link from "next/link";
import React from "react";

const CareersPage: React.FC = () => {
  const jobs = [
    {
      title: "Senior Security Engineer",
      location: "Remote",
      description:
        "Drive the architecture and implementation of our core security infrastructure. You'll be a key player in protecting our platform and our clients.",
    },
    {
      title: "Lead Product Designer",
      location: "San Francisco, CA",
      description:
        "Lead the design of a user-centric and intuitive platform for security researchers and organizations. Your work will define the Malcom experience.",
    },
    {
      title: "Backend Engineer (Go)",
      location: "Remote",
      description:
        "Develop and maintain the scalable, high-performance backend services that power Malcom. Experience with Go and microservices is a plus.",
    },
    {
      title: "Marketing Manager",
      location: "New York, NY",
      description:
        "Craft and execute marketing strategies to grow our community of researchers and attract new enterprise clients. You will own our brand's voice.",
    },
    {
      title: "Frontend Engineer (React)",
      location: "Remote",
      description:
        "Build beautiful, responsive, and accessible user interfaces using modern web technologies like React and Tailwind CSS.",
    },
    {
      title: "DevOps Engineer",
      location: "Austin, TX",
      description:
        "Automate, manage, and scale our cloud infrastructure. Ensure our platform is reliable, secure, and performs at its best for our users.",
    },
  ];

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
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary font-medium"
              >
                Home
              </Link>
              <Link
                href="/compaigns"
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary font-medium"
              >
                Compaigns
              </Link>
                <Link
                href="/bounty"
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary font-medium"
              >
                Active Programs
              </Link>
              <Link
                href="careers"
                className="text-blue-600 font-bold"
                
              >
                Careers
              </Link>
            </nav>
            <button className="md:hidden text-text-light dark:text-text-dark">
              <span className="material-symbols-outlined">menu</span>
            </button>
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
            Join our mission to make the digital world a safer place. At
            Malcom, we're building a team of passionate individuals dedicated
            to innovation and excellence in cybersecurity.
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
              placeholder="Search by role, keyword, or location"
              className="form-input block w-full rounded-full border-gray-300 dark:border-gray-600 bg-background-light dark:bg-card-background-dark py-3 pl-10 pr-4 text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, idx) => (
            <div
              key={idx}
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
              <Link
                href="#"
                className="mt-6 inline-block w-full text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors duration-300"
              >
                View &amp; Apply
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card-background-light dark:bg-card-background-dark border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                bug_report
              </span>
              <h2 className="text-text-light dark:text-text-dark text-lg font-bold">
                Malcom
              </h2>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary"
                href="#"
              >
                About Us
              </Link>
              <Link
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary"
                href="#"
              >
                Blog
              </Link>
              <Link
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary"
                href="#"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mt-8 text-sm">
            © 2024 Malcom_Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
