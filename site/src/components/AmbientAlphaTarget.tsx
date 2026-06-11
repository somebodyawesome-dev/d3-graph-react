import React, { useState } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const AmbientAlphaTargetPage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section AmbientAlphaTarget */}
        <section className="intro-section">
          <h1>🫧 AmbientAlphaTarget</h1>
          <p>
            By default the simulation behaves like a standard d3 force simulation: it animates, then settles to rest
            (and reheats whenever you drag a node or change a force). Set <code>ambientAlphaTarget</code> to a small
            value to keep the graph gently floating forever instead of settling. The default value is <code>0</code>{" "}
            (settle to rest); values around <code>0.02</code> – <code>0.1</code> give a nice ambient motion. Note that
            a non-zero value keeps the simulation running permanently, which costs CPU.
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
  <Graph graph={graphData} ambientAlphaTarget={0.05} />
);`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <AmbientAlphaTargetPlayground />
      </div>
    </div>
  );
};

const AmbientAlphaTargetPlayground: React.FC = () => {
  const [ambient, setAmbient] = useState(0.05);

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
    <div className="flex justify-center items-center min-h-screen p-6 pg-section">
      <div className="flex flex-col md:flex-row border w-full bg-black rounded-xl">
        {/* Panneau de configuration */}
        <div id="panel" className="w-full md:w-1/2 flex flex-col border-r px-4 py-4">
          <h2>🎮 Playground</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ambient Alpha Target</h3>
            <p>0 = settle to rest, higher = keep floating:</p>
            <input
              type="number"
              step="0.01"
              min="0"
              max="0.3"
              value={ambient}
              onChange={(e) => setAmbient(parseFloat(e.target.value))}
              className="input w-full input-bordered"
            />
          </div>
        </div>

        {/* Affichage du Graph */}
        <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
          <Graph
            graph={graphData}
            ambientAlphaTarget={ambient}
            linkForce={{ length: 200, strength: 1 }}
            chargeForce={{ strength: -30 }}
            gravityForce={{ center_x: 200, center_y: 200, strength: 0.05 }}
            NodeComponent={({ node: { name } }) => (
              <div className="bg-gray-400 p-2 rounded border border-white break-normal text-nowrap">{name}</div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AmbientAlphaTargetPage;
