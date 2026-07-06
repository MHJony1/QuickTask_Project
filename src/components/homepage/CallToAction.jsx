import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-8 md:p-16 text-center overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Ready to supercharge your productivity?
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of users who are organizing their lives with QuickTask. 
          Start your free account today and experience the difference.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            Create Your Account
          </Link>
          <Link 
            href="/login" 
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg backdrop-blur-sm transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;