import React, { useState } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const GravityForcePage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section GravityForce */}
        <section className="intro-section">
          <h1>🌍 GravityForce</h1>
          <p>
            <code>gravityForce</code> est une prop optionnelle qui configure la gravité avec <code>strength</code>, <code>center_x</code> et <code>center_y</code>.
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
  <Graph graph={graphData} gravityForce={{ strength: 0.1, center_x: 200, center_y: 200 }} />
);`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <GravityForcePlayground />
      </div>
    </div>
  );
};

const GravityForcePlayground: React.FC = () => {
  const [gravityStrength, setGravityStrength] = useState(0.1);
  const [centerX, setCenterX] = useState(200);
  const [centerY, setCenterY] = useState(200);

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

        {/* Paramètres Gravity Force */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Gravity Force</h3>
          <p>Gravitational Force:</p>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={gravityStrength}
            onChange={(e) => setGravityStrength(parseFloat(e.target.value))}
            className="input w-full input-bordered"
          />

          <p className="mt-2">Center Position(X):</p>
          <input
            type="number"
            step="10"
            min="0"
            max="500"
            value={centerX}
            onChange={(e) => setCenterX(parseInt(e.target.value, 10))}
            className="input w-full input-bordered"
          />

          <p className="mt-2">Center Position(Y):</p>
          <input
            type="number"
            step="10"
            min="0"
            max="500"
            value={centerY}
            onChange={(e) => setCenterY(parseInt(e.target.value, 10))}
            className="input w-full input-bordered"
          />
        </div>
      </div>

      {/* Affichage du Graph */}
      <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          gravityForce={{ strength: gravityStrength, center_x: centerX, center_y: centerY }}
          zoomScale={[0.5, 8]}
          linkForce={{ length: 200, strength: 1 }}
          chargeForce={{ strength: -30 }}
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

export default GravityForcePage;
