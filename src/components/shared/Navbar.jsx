'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  Home,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  console.log("session", session);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSignOut = async () => {
    closeMobileMenu();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
          router.refresh();
        },
      },
    });
  };

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-2 font-semibold transition-all duration-300 relative ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
      }`;
  };

  const getMobileLinkClass = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${isActive
      ? 'text-blue-600 bg-blue-50/80'
      : 'text-gray-600 hover:bg-gray-50/80 hover:text-blue-600'
      }`;
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    ...(session
      ? [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]
      : []),
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-lg'
        : 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 relative" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight">
            <span className="text-blue-600">Quick</span>
            <span className="text-gray-900">Task</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-8">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={getLinkClass(href)}>
              <Icon size={18} className="transition-transform group-hover:scale-110" />
              <span>{label}</span>
              {pathname === href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop auth area */}
          <div className="hidden md:flex items-center">
            {isPending ? (
              <div className="h-10 w-28 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 py-1.5 pl-1.5 pr-3 rounded-full border border-gray-200 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                  {session.user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all shrink-0"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-gray-600 font-semibold hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-full font-bold hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile avatar */}
          {session && !isPending && (
            <div className="md:hidden w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-700 p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 relative"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-gray-100/80 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className={getMobileLinkClass(href)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {pathname === href && (
                    <motion.div
                      layoutId="mobile-active"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"
                    />
                  )}
                </Link>
              ))}

              <div className="border-t border-gray-100/80 my-3" />

              {isPending ? (
                <div className="h-12 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl animate-pulse" />
              ) : session ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 py-3 px-4 bg-gradient-to-r from-blue-50/50 to-transparent rounded-xl">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all shrink-0"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="text-center text-gray-700 font-semibold py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;