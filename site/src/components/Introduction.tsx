import React from "react";
import "./Global.css";

const Introduction: React.FC = () => {
  return (
    <div className="intro-wrapper">
      {/* Section Introduction */}
      <section className="intro-section">
        <h1>🚀 Introduction</h1>
        <p>
          This package provides a customizable and interactive force-directed graph 
          component for React, leveraging D3.js for simulations and transformations. 
          The component allows users to visualize networks with nodes and links, and 
          it supports features such as dragging, zooming, and customizable node and link rendering.
        </p>
      </section>

      {/* Section About */}
      <section className="intro-section about">
        <h2>📌 About This Project</h2>
        <p>
          This project aims to simplify the use of D3.js in React applications by providing 
          a library that facilitates smooth visualizations and features.
        </p>
        <p>
          Whether you are a beginner or an experienced developer, our library and documentation 
          will assist you in creating interactive and dynamic data visualizations with ease.
        </p>
      </section>

      {/* Section Key Features */}
      <section className="intro-section features">
        <h2>🔥 Key Features</h2>
        <ul>
          {[
            "TypeScript Support",
            "Easy integration",
            "Custom data support",
            "Customization",
            "Force-directed simulation of nodes and links",
            "Customizable node and link components",
            "Drag-and-drop functionality for nodes",
            "Zooming and panning of the graph",
            "Flexible force configuration for link distance, gravity, and charge",
          ].map((feature, index) => (
            <li key={index}>✔️ {feature}</li>
          ))}
        </ul>
      </section>

      {/* Section Getting Started */}
      <section className="intro-section getting-started">
        <h2>🚀 Getting Started</h2>
        <p>
          To get started, follow our comprehensive guide that covers everything from 
          installation to creating your first D3 visualization.
        </p>
        <p>
          Our step-by-step tutorials and examples will make it easy for you to understand 
          and implement D3 in your React projects.
        </p>
      </section>
    </div>
  );
};

export default Introduction;
