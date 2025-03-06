import React, { useState } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const LinkForcePage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section LinkForce */}
        <section className="intro-section">
          <h1>🔗 LinkForce</h1>
          <p>
            <code>linkForce</code> Is an optional prop that configures the strength and length of the links.
          </p>
          <br />
          {/* Example Usage */}
          <h2>📌 Example Usage</h2>
          <pre>
            <code>
{`const graphData = {
  nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
  links: [{ source: 0, target: 1 }, { source: 1, target: 2 }],
};

const MyGraph = () => (
  <Graph graph={graphData} linkForce={{ strength: 1, length: 100 }} />
);`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <LinkForcePlayground />
      </div>
    </div>
  );
};

const LinkForcePlayground: React.FC = () => {
  const [linkStrength, setLinkStrength] = useState(1);
  const [linkLength, setLinkLength] = useState(100);

  const graphData = {
    nodes: [
      { id: 1, name: "Node 1" },
      { id: 2, name: "Node 2" },
      { id: 3, name: "Node 3" },
      { id: 4, name: "Node 4" },
    ],
    links: [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 1, target: 3 },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row border w-full">
      {/* Panneau de configuration */}
      <div id="panel" className="w-full md:w-1/2 flex flex-col border-r px-4 py-4">
        <h2>🎮 Playground</h2>

        {/* Paramètres Link Force */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Link Force</h3>
          <p>Link Strength:</p>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={linkStrength}
            onChange={(e) => setLinkStrength(parseFloat(e.target.value))}
            className="input w-full input-bordered"
          />

          <p className="mt-2">Link Length:</p>
          <input
            type="number"
            step="10"
            min="10"
            max="300"
            value={linkLength}
            onChange={(e) => setLinkLength(parseFloat(e.target.value))}
            className="input w-full input-bordered"
          />
        </div>
      </div>

      {/* Affichage du Graph */}
      <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          linkForce={{ strength: linkStrength, length: linkLength }}
          zoomScale={[0.5, 8]}
          chargeForce={{ strength: -30 }}
          gravityForce={{ center_x: 200, center_y: 200, strength: 0.05 }}
          NodeComponent={({ node: { name } }) => (
            <div className="bg-gray-400 p-2 rounded border border-white break-normal text-nowrap">
              {name}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default LinkForcePage;
