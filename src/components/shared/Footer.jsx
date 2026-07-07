'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 relative">
      {/* Gradient decorative line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">

          {/* Logo & Description - 5 columns */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-2 group mb-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 relative"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-blue-600">Quick</span>
                <span className="text-gray-900">Task</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-md text-sm">
              The simplest way to manage your daily tasks and boost your productivity.
              Designed for efficiency, built for everyone.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links - 2.5 columns */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tasks" className="text-gray-500 hover:text-blue-600 transition-colors text-sm group flex items-center gap-1">
                  Features
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition-colors text-sm group flex items-center gap-1">
                  Dashboard
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-500 hover:text-blue-600 transition-colors text-sm group flex items-center gap-1">
                  Pricing
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company - 2.5 columns */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm group flex items-center gap-1">
                  About Us
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm group flex items-center gap-1">
                  Terms of Service
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm group flex items-center gap-1">
                  Privacy Policy
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter - 2 columns */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-gray-500 text-sm mb-3">
              Get the latest updates and news
            </p>
            <div className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} QuickTask. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              Cookies
            </Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm group"
          >
            <span>Back to top</span>
            <span className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;