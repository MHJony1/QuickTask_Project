'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckSquare, Home, LogOut } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // কারেন্ট পাথ চেক করার জন্য
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
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

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black text-blue-600 tracking-tighter"
        >
          Quick<span className="text-gray-900">Task</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={getLinkClass('/')}>
            <Home size={18} /> Home
            {pathname === '/' && (
              <motion.div
                layoutId="nav"
                className="absolute -bottom-[25px] w-full h-0.5 bg-blue-600"
              />
            )}
          </Link>

          <Link href="/tasks" className={getLinkClass('/tasks')}>
            <CheckSquare size={18} /> Tasks
            {pathname === '/tasks' && (
              <div className="absolute -bottom-[25px] w-full h-0.5 bg-blue-600" />
            )}
          </Link>

          {session && (
            <Link href="/dashboard" className={getLinkClass('/dashboard')}>
              <LayoutDashboard size={18} /> Dashboard
              {pathname === '/dashboard' && (
                <div className="absolute -bottom-[25px] w-full h-0.5 bg-blue-600" />
              )}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="h-10 w-24 bg-gray-100 rounded-full animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-3 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-200">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {session.user.name}
              </span>
              <button
                onClick={handleSignOut}
                className="text-red-500 hover:bg-red-100 p-1.5 rounded-full transition-all"
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
      </div>
    </nav>
  );
};

export default Navbar;
