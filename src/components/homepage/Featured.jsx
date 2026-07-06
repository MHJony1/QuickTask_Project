import React from 'react';
import { Layout, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    title: "Kanban Task Management",
    description: "Organize your workflow visually with our intuitive drag-and-drop Kanban board.",
    icon: <Layout className="text-blue-600" size={28} />,
  },
  {
    title: "Secure Authentication",
    description: "Your data is safe with our robust, industry-standard authentication system.",
    icon: <ShieldCheck className="text-blue-600" size={28} />,
  },
  {
    title: "Premium Unlimited Access",
    description: "Unlock unlimited task creation and advanced features with a simple one-time payment.",
    icon: <Zap className="text-blue-600" size={28} />,
  },
  {
    title: "Performance Tracking",
    description: "Keep track of your productivity and stay on top of your goals every single day.",
    icon: <BarChart3 className="text-blue-600" size={28} />,
  }
];

const Featured = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Why Choose QuickTask?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Everything you need to boost your productivity, managed in one clean and simple platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;