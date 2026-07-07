'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-12 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-blue-500/5 via-indigo-500/8 to-blue-500/5 rounded-full blur-3xl" />
            </div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rounded-full blur-xl animate-pulse hidden lg:block" />
            <div className="absolute bottom-20 right-10 w-6 h-6 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000 hidden lg:block" />

            <div className="max-w-2xl w-full text-center">
                {/* 404 Number with gradient */}
                <div className="relative mb-6">
                    <div className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter select-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient">
                            404
                        </span>
                    </div>

                    {/* Decorative circle behind 404 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-2xl -z-10" />

                    {/* Small sparkle decoration */}
                    <div className="absolute top-0 right-0 sm:right-10 animate-bounce">
                        <Sparkles size={24} className="text-yellow-400" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Oops! Page not found
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm"
                    >
                        <Home size={18} className="group-hover:scale-110 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto group bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 active:scale-95 text-sm flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Go Back</span>
                    </button>
                </div>

                {/* Helpful links */}
                <div className="mt-8 pt-6 border-t border-gray-200/60 flex flex-wrap justify-center gap-4 text-sm">
                    <Link href="/tasks" className="text-gray-500 hover:text-blue-600 transition-colors">
                        Browse Tasks
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 transition-colors">
                        Dashboard
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/register" className="text-gray-500 hover:text-blue-600 transition-colors">
                        Get Started
                    </Link>
                </div>

                {/* Search suggestion */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Search size={12} />
                    <span>Can't find what you're looking for?</span>
                    <Link href="/" className="text-blue-500 hover:text-blue-600 font-medium">
                        Contact support
                    </Link>
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
}