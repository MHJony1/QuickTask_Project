'use client';
import React, { useState } from 'react';
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
} from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    return `flex items-center gap-2 font-semibold transition-all duration-300 relative ${
      isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
    }`;
  };

  const getMobileLinkClass = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 font-semibold py-3 px-4 rounded-xl transition-all ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
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
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="text-xl sm:text-2xl font-black text-blue-600 tracking-tighter shrink-0"
        >
          Quick<span className="text-gray-900">Task</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={getLinkClass(href)}>
              <Icon size={18} /> {label}
              {pathname === href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-[25px] w-full h-0.5 bg-blue-600"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right side: desktop auth area + mobile hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop auth area */}
          <div className="hidden md:flex items-center">
            {isPending ? (
              <div className="h-10 w-24 bg-gray-100 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-200">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-700 truncate max-w-[120px]">
                  {session.user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 hover:bg-red-100 p-1.5 rounded-full transition-all shrink-0"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-gray-600 font-semibold hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gray-900 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-600 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: compact avatar (only when logged in) */}
          {session && !isPending && (
            <div className="md:hidden w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className={getMobileLinkClass(href)}
                >
                  <Icon size={18} /> {label}
                </Link>
              ))}

              <div className="border-t border-gray-100 my-2" />

              {isPending ? (
                <div className="h-11 w-full bg-gray-100 rounded-xl animate-pulse" />
              ) : session ? (
                <div className="flex items-center justify-between gap-3 py-2 px-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 truncate">
                      {session.user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-red-500 hover:bg-red-50 py-2 px-3 rounded-lg transition-all shrink-0 text-sm font-semibold"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="text-center text-gray-700 font-semibold py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="text-center bg-gray-900 text-white py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all"
                  >
                    Register
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