import React from "react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div
      className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 relative overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    { title: "Dynamic Visualization", description: "Create interactive graphs with D3.js in React.", icon: "📈" },
    { title: "Intuitive Drag & Drop", description: "Easily move nodes to organize your graphs.", icon: "🏗️" },
    { title: "Smooth Zoom & Pan", description: "Navigate through your data visualizations with ease.", icon: "🔎" },
    { title: "Optimized Performance", description: "Fast rendering with React’s optimized updates.", icon: "🚀" },
    { title: "Advanced Customization", description: "Customize the style and appearance of your graphs.", icon: "🎨" },
    { title: "Easy Integration", description: "Simple API for quick setup in your projects.", icon: "🔧" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Why Choose Our Library?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
