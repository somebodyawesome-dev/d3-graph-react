import React, { useState } from "react";
import { Graph } from "d3-graph-react";
import "../components/Global.css";
import "../pages/playground.css";

const ChargeForcePage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section ChargeForce */}
        <section className="intro-section">
          <h1>⚡ ChargeForce</h1>
          <p>
          <code>chargeForce</code> allows configuring the charge force.  
          A negative value **repels** the nodes, while a positive value **attracts** them.
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
  <Graph graph={graphData} chargeForce={{ strength: -30 }} />
);`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <ChargeForcePlayground />
      </div>
    </div>
  );
};

const ChargeForcePlayground: React.FC = () => {
  const [chargeStrength, setChargeStrength] = useState(-30);

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
    <div  className="flex justify-center items-center min-h-screen p-6 pg-section">
    <div className="flex flex-col md:flex-row border w-full bg-black rounded-xl">
      {/* Panneau de configuration */}
      <div id="panel" className="w-full md:w-1/2 flex flex-col border-r px-4 py-4">
        <h2>🎮 Playground</h2>

        {/* Paramètres Charge Force */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Charge Force</h3>
          <p>Charge Force:</p>
          <input
            type="number"
            step="5"
            min="-100"
            max="100"
            value={chargeStrength}
            onChange={(e) => setChargeStrength(parseFloat(e.target.value))}
            className="input w-full input-bordered"
          />
          <p className="mt-2 text-sm">
          A negative value repels the nodes. A positive value attracts them.</p>
        </div>
      </div>

      {/* Affichage du Graph */}
      <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          chargeForce={{ strength: chargeStrength }}
          zoomScale={[0.5, 8]}
          linkForce={{ length: 200, strength: 1 }}
          gravityForce={{ center_x: 200, center_y: 200, strength: 0.05 }}
          NodeComponent={({ node: { name } }) => (
            <div className="bg-gray-400 p-2 rounded border border-white break-normal text-nowrap">
              {name}
            </div>
          )}
        />
      </div>
    </div>
    </div>
  );
};

export default ChargeForcePage;
