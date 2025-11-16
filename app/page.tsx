'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../redux/userSlice';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../public/MalcomBG.png';
import LiquidBG from '@/components/LiquidBG';

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

  return (
    <div className="relative min-h-screen text-gray-200">

      {/* FULLSCREEN BACKGROUND */}
      <div className="fixed inset-0 -z-50 ">
        <LiquidBG />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">

              <Image src={Logo} alt="Logo" width={140} height={140} priority />

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="hover:text-white">Home</Link>
                <Link href="/compaigns" className="hover:text-white">Compaigns</Link>
                <button onClick={() => handleProtectedNav('/bounty')} className="hover:text-white">Programs</button>
                <button onClick={() => handleProtectedNav('/careers')} className="hover:text-white">Careers</button>

                {isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.push('/profile')}
                      className="flex items-center gap-2 border border-white/20 rounded-full p-2 hover:bg-white/10 transition"
                    >
                      {user?.avatar ? (
                        <img src={user.avatar} className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="material-symbols-outlined text-xl">account_circle</span>
                      )}
                      <span>{user?.name || 'Profile'}</span>
                    </button>

                    <button className="text-red-400 hover:text-red-300" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500">
                    Login / Signup
                  </Link>
                )}
              </nav>

              {/* Mobile Toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                <span className="material-symbols-outlined text-3xl">{menuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 animate-slideDown">
              <nav className="flex flex-col p-4 space-y-4">

                <Link href="/" onClick={() => setMenuOpen(false)} className="text-blue-400">
                  Home
                </Link>

                <Link href="/compaigns" onClick={() => setMenuOpen(false)}>Compaigns</Link>

                <button onClick={() => handleProtectedNav('/bounty')}>Programs</button>

                <button onClick={() => handleProtectedNav('/careers')}>Careers</button>

                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 border border-white/20 p-2 rounded-full"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="material-symbols-outlined text-xl">account_circle</span>
                      )}
                      <span>{user?.name}</span>
                    </button>

                    <button
                      className="text-red-400"
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-blue-600 text-center rounded-lg hover:bg-blue-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login / Signup
                  </Link>
                )}

              </nav>
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            Empowering Ethical Hackers,<br /> Protecting the Digital Future.
          </h1>

          <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
            Launch programs, hunt bugs, protect systems — all inside BugVerse.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleProtectedNav('/compaigns')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow"
            >
              Launch a Program
            </button>

            <button
              onClick={() => handleProtectedNav('/bounty')}
              className="px-8 py-3 border border-blue-400 text-blue-300 rounded-lg hover:bg-white/10"
            >
              Browse Programs
            </button>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-6 text-center">

            <h2 className="text-3xl text-white font-bold mb-12">Why Choose Malcom_Company?</h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: 'security', title: 'Trusted Platform', desc: 'Enterprise-grade protection & monitoring.' },
                { icon: 'group', title: 'Expert Hackers', desc: 'Global elite security researchers.' },
                { icon: 'insights', title: 'Actionable Reports', desc: 'Fix vulnerabilities fast & confidently.' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl"
                >
                  <span className="material-symbols-outlined text-blue-400 text-5xl mb-4">{f.icon}</span>
                  <h3 className="text-xl text-white font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-300">{f.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 border-t border-white/10">
          <div className="container mx-auto px-6 text-center">

            <h2 className="text-3xl text-white font-bold mb-12">How It Works</h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { step: '1', title: 'Launch a Program', desc: 'Set scope & start accepting reports.' },
                { step: '2', title: 'Hackers Report Bugs', desc: 'Researchers identify vulnerabilities.' },
                { step: '3', title: 'Verify & Reward', desc: 'Fix issues and reward researchers.' },
              ].map((s, i) => (
                <div key={i} className="p-8 bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl">
                  <div className="text-3xl text-blue-400 font-bold mb-4">{s.step}</div>
                  <h3 className="text-xl text-white font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-300">{s.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* TRUSTED */}
        <section className="py-16 border-t border-white/10 text-center">
          <h2 className="text-2xl text-white font-bold mb-8">Trusted by Leading Organizations</h2>

          <div className="flex items-center justify-center gap-8 flex-wrap text-gray-400">
            {['Google', 'Meta', 'AWS', 'Microsoft', 'Oracle'].map((brand) => (
              <span key={brand} className="hover:text-white transition">{brand}</span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 border-t border-white/10 text-center text-gray-400">
          <div className="flex justify-center gap-6 flex-wrap mb-4">
            {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="hover:text-white">{item}</a>
            ))}
          </div>

          <p>© 2025 Malcom_Company — Cybersecurity Innovation</p>
        </footer>

        {/* Slide Animation */}
        <style jsx>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown {
            animation: slideDown 0.2s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
