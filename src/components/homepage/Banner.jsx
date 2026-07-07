'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Zap, Users, Clock, Trophy, Target, BarChart3, ListChecks } from 'lucide-react';

const Banner = () => {
  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-14 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-gradient-to-r from-blue-500/5 via-indigo-500/8 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-center">

          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Premium Badge - Task focused */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200/30 text-blue-700 text-xs font-semibold mb-4 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span>#1 Task Management Platform</span>
              <Sparkles size={10} className="text-blue-500" />
            </div>

            {/* Main Title - Task focused */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-[1.05] mb-3">
              Turn your to-dos
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient">
                  into achievements
                </span>
                {/* Decorative underline */}
                <svg className="absolute -bottom-0.5 left-0 w-full h-2.5 -z-0" viewBox="0 0 300 10">
                  <path d="M10 8 C30 2 60 2 80 8 C100 14 130 14 150 8 C170 2 200 2 220 8 C240 14 270 14 290 8"
                    stroke="url(#gradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Description - Task focused */}
            <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-5">
              The smartest way to organize tasks, track progress, and celebrate
              <span className="hidden sm:inline"> every small win—</span>
              <span className="sm:hidden"> —</span>
              built for modern teams and individuals.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 mb-5">
              <Link
                href="/register"
                className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm"
              >
                Start free trial
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-[7px] font-bold rounded-full shadow-md">
                  POPULAR
                </span>
              </Link>
              <Link
                href="/tasks"
                className="w-full sm:w-auto group bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 active:scale-95 text-sm flex items-center gap-2"
              >
                <ListChecks size={15} />
                <span>See tasks</span>
              </Link>
            </div>

            {/* Stats - Task focused */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-xs text-gray-600">
                  <span className="font-bold text-gray-900">50K+</span> tasks completed
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-blue-500" />
                <span className="text-xs text-gray-600">
                  <span className="font-bold text-gray-900">10K+</span> active users
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy size={14} className="text-yellow-500" />
                <span className="text-xs text-gray-600">
                  <span className="font-bold text-gray-900">4.9</span> star rating
                </span>
              </div>
            </div>
          </div>

          {/* Right - Visual Card - Task Progress Dashboard */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-5">
                {/* Decorative elements */}
                <div className="absolute -top-2.5 -right-2.5 w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl shadow-lg flex items-center justify-center">
                  <Trophy size={16} className="text-white" />
                </div>

                {/* Card header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                    QT
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs">Today's Progress</h3>
                    <p className="text-[10px] text-gray-500">8 tasks remaining</p>
                  </div>
                </div>

                {/* Progress indicators - Task focused */}
                <div className="space-y-2.5">
                  {[
                    { label: 'UI Design', progress: 100, color: 'from-emerald-500 to-emerald-400', status: '✅ Done' },
                    { label: 'Development', progress: 65, color: 'from-blue-500 to-blue-400', status: '⏳ 5 left' },
                    { label: 'Testing', progress: 30, color: 'from-indigo-500 to-indigo-400', status: '⏳ 12 left' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className="text-gray-500">{item.status}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievement */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/80">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      {['A', 'B', 'C'].map((letter, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-[7px] font-bold text-gray-600"
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">+5 more</span>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Sparkles size={10} className="text-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-600">3 done</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>

        {/* Bottom feature pills - Task focused */}
        <div className="mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {[
            '✅ Unlimited tasks',
            '⚡ Real-time sync',
            '📊 Advanced analytics',
            '🎯 Goal tracking',
            '💬 Team collaboration'
          ].map((text) => (
            <span key={text} className="px-2.5 py-1 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-full text-[10px] sm:text-xs text-gray-600 font-medium">
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Banner;