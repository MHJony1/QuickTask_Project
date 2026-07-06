'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; // আপনার Better Auth ক্লায়েন্ট পাথ

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        name: formData.name.trim(),
        callbackURL: '/login',
      });

      if (error) {
        toast.error(error.message || 'Registration failed!');
      } else if (data) {
        toast.success('Account created successfully!');
        router.push('/login');
        router.refresh();
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Join QuickTask
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Create an account to manage your tasks efficiently
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="name"
                type="text"
                required
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                required
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
