'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../redux/userSlice';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../public/image.png'

export default function BugVerse() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.currentUser);
  const isLoggedIn = !!user;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleProtectedNav = (path: string) => {
    if (!isLoggedIn) router.push('/signup');
    else router.push(path);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-white font-display min-h-screen flex flex-col text-gray-900">
      {/* ✅ Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
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
              <Link
                href="/"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Home
              </Link>
              <Link
                href="/compaigns"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Compaigns
              </Link>
              <button
                onClick={() => handleProtectedNav('/bounty')}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Programs
              </button>
              <button
                onClick={() => handleProtectedNav('/careers')}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Careers
              </button>

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
                  className="rounded-lg px-5 py-2 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Login / Signup
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
            <nav className="flex flex-col space-y-4 p-4 text-gray-700">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-semibold text-blue-600"
              >
                Home
              </Link>
              <Link
                href="/compaigns"
                onClick={() => setMenuOpen(false)}
                className="font-medium hover:text-blue-600"
              >
                Compaigns
              </Link>
              <button
                onClick={() => handleProtectedNav('/bounty')}
                className="text-left font-medium hover:text-blue-600"
              >
                Programs
              </button>
              <button
                onClick={() => handleProtectedNav('/careers')}
                className="text-left font-medium hover:text-blue-600"
              >
                Careers
              </button>

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

      {/* ✅ Hero Section */}
      <section className="relative flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 max-w-3xl">
          Empowering Ethical Hackers,<br /> Protecting the Digital Future.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Join Malcom_Company’s BugVerse to launch security programs, hunt bugs,
          and strengthen systems with top cybersecurity experts.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleProtectedNav('/compaigns')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
          >
            Launch a Program
          </button>
          <button
            onClick={() => handleProtectedNav('/bounty')}
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-transform hover:scale-105"
          >
            Browse Programs
          </button>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Why Choose Malcom_Company?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: 'security',
                title: 'Trusted Security Platform',
                desc: 'Enterprise-grade encryption and real-time monitoring for secure operations.',
              },
              {
                icon: 'group',
                title: 'Top Ethical Hackers',
                desc: 'Access a global network of verified security researchers and experts.',
              },
              {
                icon: 'insights',
                title: 'Actionable Reports',
                desc: 'Receive clear, verified reports to strengthen your digital infrastructure.',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition-all"
              >
                <span className="material-symbols-outlined text-blue-600 text-5xl mb-4">
                  {f.icon}
                </span>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ How It Works */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                title: 'Launch a Program',
                desc: 'Organizations define their scope and publish it on our platform.',
              },
              {
                step: '2',
                title: 'Hackers Hunt Bugs',
                desc: 'Ethical hackers report vulnerabilities responsibly for review.',
              },
              {
                step: '3',
                title: 'Verify & Reward',
                desc: 'You validate, patch issues, and reward the researcher accordingly.',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 border border-gray-200 rounded-xl hover:shadow-md transition-all"
              >
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {s.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Trusted By */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">
            Trusted by Teams Worldwide
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-90">
            {['Google', 'Meta', 'AWS', 'Microsoft', 'Oracle'].map((brand) => (
              <div
                key={brand}
                className="text-gray-400 text-lg font-semibold hover:text-blue-600 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-10 mt-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 text-base hover:text-blue-600 hover:underline"
              >
                {item}
              </a>
            )
          )}
        </div>
        <p className="text-gray-500 text-sm text-center">
          © 2025 Malcom_Company — Empowering Cybersecurity Innovation
        </p>
      </footer>

      {/* ✅ Simple Animation for Dropdown */}
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
}
