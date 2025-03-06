console.log("InstallationComponent chargé !");

import React from "react";
import "../components/Global.css";

const Installation: React.FC = () => {
  return (
    <div className="intro-wrapper">
      {/* Section Installation */}
      <section className="intro-section">
        <h1>📦 Installation</h1>
        <p>Install the library using npm:</p>
        <pre>
          <code>npm i d3-graph-react</code>
        </pre>
      </section>
    </div>
  );
};

export default Installation;
