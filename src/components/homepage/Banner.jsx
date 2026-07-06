import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

const Banner = () => {
  return (
    <section className="relative w-full pt-12 pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
          <Zap size={14} fill="currentColor" />
          <span>Streamline your workflow today</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 leading-[1.1]">
          Master your tasks, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Achieve your goals.
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          QuickTask provides the ultimate platform to organize, prioritize, and complete your projects with ease. Start your journey for free.
        </p>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Get Started Now <ArrowRight size={18} />
          </Link>
          <Link 
            href="/tasks" 
            className="w-full sm:w-auto bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all"
          >
            Explore Features
          </Link>
        </div>

        {/* Feature List */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
          {['Unlimited Projects', 'Kanban Board', 'Stripe Payment Ready', 'Secure Authentication'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;