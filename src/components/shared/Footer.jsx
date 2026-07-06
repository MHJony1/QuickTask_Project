import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter mb-4 block">
              Quick<span className="text-gray-900">Task</span>
            </Link>
            <p className="text-gray-500 max-w-sm">
              The simplest way to manage your daily tasks and boost your productivity. Designed for efficiency, built for everyone.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/tasks" className="hover:text-blue-600 transition">Features</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Company/Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="#" className="hover:text-blue-600 transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} QuickTask. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-blue-600 transition">Twitter</Link>
            <Link href="#" className="hover:text-blue-600 transition">GitHub</Link>
            <Link href="#" className="hover:text-blue-600 transition">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;