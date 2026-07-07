import React from 'react';
import Link from 'next/link';
import {
  Layout,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  Target
} from 'lucide-react';

const features = [
  {
    title: "Kanban Task Management",
    description: "Organize your workflow visually with our intuitive drag-and-drop Kanban board.",
    icon: <Layout className="text-blue-600" size={24} />,
    gradient: "from-blue-500 to-blue-400",
    bgGradient: "from-blue-50 to-blue-100/30",
    color: "blue",
    stat: "10k+ tasks organized"
  },
  {
    title: "Secure Authentication",
    description: "Your data is safe with our robust, industry-standard authentication system.",
    icon: <ShieldCheck className="text-indigo-600" size={24} />,
    gradient: "from-indigo-500 to-indigo-400",
    bgGradient: "from-indigo-50 to-indigo-100/30",
    color: "indigo",
    stat: "Bank-grade security"
  },
  {
    title: "Premium Unlimited Access",
    description: "Unlock unlimited task creation and advanced features with a simple one-time payment.",
    icon: <Zap className="text-purple-600" size={24} />,
    gradient: "from-purple-500 to-purple-400",
    bgGradient: "from-purple-50 to-purple-100/30",
    color: "purple",
    stat: "No limits, ever"
  },
  {
    title: "Performance Tracking",
    description: "Keep track of your productivity and stay on top of your goals every single day.",
    icon: <BarChart3 className="text-emerald-600" size={24} />,
    gradient: "from-emerald-500 to-emerald-400",
    bgGradient: "from-emerald-50 to-emerald-100/30",
    color: "emerald",
    stat: "Track your growth"
  }
];

const Featured = () => {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          {/* Mini badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200/30 text-blue-700 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles size={12} className="text-blue-500" />
            <span>Why QuickTask</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">peak productivity</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Everything you need to boost your productivity, managed in one clean and simple platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-6 sm:p-7 lg:p-8 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Decorative circle */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Feature stat */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <CheckCircle2 size={14} className={`text-${feature.color}-500`} />
                  <span>{feature.stat}</span>
                </div>

                {/* Learn more link */}
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-colors"
                >
                  Learn more
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-bl-3xl transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="inline-flex items-center gap-6 sm:gap-8 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              <span className="text-xs sm:text-sm text-gray-600">
                <span className="font-bold text-gray-900">10k+</span> users
              </span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-indigo-500" />
              <span className="text-xs sm:text-sm text-gray-600">
                <span className="font-bold text-gray-900">4.9</span> rating
              </span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <Link
              href="/register"
              className="group flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Get started</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;