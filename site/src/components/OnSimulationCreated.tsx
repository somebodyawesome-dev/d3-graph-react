import React, { useRef } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const OnSimulationCreatedPage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section OnSimulationCreated */}
        <section className="intro-section">
          <h1>⚙️ OnSimulationCreated</h1>
          <p>
            <code>onSimulationCreated</code> is called once per simulation instance, right after it is created, with
            the underlying{" "}
            <a href="https://d3js.org/d3-force/simulation" target="_blank" rel="noreferrer">
              d3 force simulation
            </a>
            . Use it for imperative control: reheating the layout, stopping it, reading node positions, or adding
            custom forces. A new simulation is created whenever the <code>graph</code> prop changes, and the callback
            fires again for it.
          </p>
          <br />
          {/* Example Usage */}
          <h2>📌 Example Usage</h2>
          <pre>
            <code>
              {`const simRef = useRef(null);

const MyGraph = () => (
  <Graph
    graph={graphData}
    onSimulationCreated={(simulation) => {
      simRef.current = simulation;
    }}
  />
);

// later, e.g. in a button handler:
simRef.current?.alpha(1).restart(); // reheat the layout
simRef.current?.stop();             // freeze it`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <OnSimulationCreatedPlayground />
      </div>
    </div>
  );
};

const OnSimulationCreatedPlayground: React.FC = () => {
  const simRef = useRef<any>(null);

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

          <div className="mb-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold mb-2">Imperative control</h3>
            <button
              className="border border-white rounded px-3 py-1"
              onClick={() => simRef.current?.alpha(1).restart()}
            >
              🔥 Reheat layout
            </button>
            <button className="border border-white rounded px-3 py-1" onClick={() => simRef.current?.stop()}>
              🧊 Freeze layout
            </button>
          </div>
        </div>

        {/* Affichage du Graph */}
        <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
          <Graph
            graph={graphData}
            onSimulationCreated={(simulation) => {
              simRef.current = simulation;
            }}
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

export default OnSimulationCreatedPage;
