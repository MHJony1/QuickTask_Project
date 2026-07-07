import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Rocket, CheckCircle2, Zap, Users } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center overflow-hidden shadow-2xl shadow-blue-900/20">

          {/* Decorative elements - Minimal */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-600/15 to-indigo-600/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-600/15 to-purple-600/15 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

          {/* Small floating dots */}
          <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-blue-400/40 rounded-full blur-[1px]" />
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-indigo-400/40 rounded-full blur-[1px]" />

          {/* Badge - Smaller */}
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-[10px] font-semibold mb-4">
            <Sparkles size={10} className="text-yellow-400" />
            <span>Join 10,000+ users</span>
          </div>

          {/* Title - Smaller */}
          <h2 className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight leading-[1.15]">
            Ready to transform
            <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
              your productivity?
            </span>
          </h2>

          {/* Description - Shorter */}
          <p className="relative text-xs sm:text-sm text-gray-400 max-w-lg mx-auto mb-5 leading-relaxed">
            Join thousands of users organizing their lives with QuickTask.
            <span className="hidden sm:inline"> Start free today.</span>
          </p>

          {/* Stats row - Compact */}
          <div className="relative flex flex-wrap justify-center gap-3 sm:gap-5 mb-5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span className="text-white/70 text-[10px] sm:text-xs">
                <span className="font-bold text-white">50K+</span> tasks
              </span>
            </div>
            <div className="hidden xs:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Rocket size={12} className="text-blue-400" />
              <span className="text-white/70 text-[10px] sm:text-xs">
                <span className="font-bold text-white">4.9</span> rating
              </span>
            </div>
            <div className="hidden xs:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Users size={12} className="text-indigo-400" />
              <span className="text-white/70 text-[10px] sm:text-xs">
                <span className="font-bold text-white">10k+</span> users
              </span>
            </div>
          </div>

          {/* Buttons - Smaller */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href="/register"
              className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 relative"
            >
              <span>Get Started Free</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-[6px] font-bold rounded-full shadow-md">
                FREE
              </span>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white px-6 sm:px-8 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95"
            >
              Sign In
            </Link>
          </div>

          {/* Trust indicators - Compact */}
          <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2 text-[9px] sm:text-[10px] text-white/40">
            <span className="flex items-center gap-1">
              <span className="text-emerald-400/60">✓</span> No credit card
            </span>
            <span className="w-px h-2.5 bg-white/10" />
            <span className="flex items-center gap-1">
              <span className="text-emerald-400/60">✓</span> Free forever
            </span>
            <span className="w-px h-2.5 bg-white/10" />
            <span className="flex items-center gap-1">
              <span className="text-emerald-400/60">✓</span> Cancel anytime
            </span>
          </div>
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

export default CallToAction;