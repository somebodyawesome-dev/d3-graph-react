import React, { useState } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const NodeComponentPage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section NodeComponent */}
        <section className="intro-section">
          <h1>📍 NodeComponent</h1>
          <p>
            <code>NodeComponent</code> Is an optional prop that allows customizing the display of nodes in the graph.
          </p>
          <br />
          {/* Example Usage */}
          <h2>📌 Example Usage</h2>
          <pre>
            <code>
{`const CustomNode = ({ node }) => (
  <div className="custom-node">
    <strong>{node.label}</strong>
  </div>
);

const graphData = {
  nodes: [{ id: 1, label: "A" }, { id: 2, label: "B" }],
  links: [{ source: 0, target: 1 }],
};

const MyGraph = () => (
  <Graph graph={graphData} NodeComponent={CustomNode} />
);`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <NodeComponentPlayground />
      </div>
    </div>
  );
};

const NodeComponentPlayground: React.FC = () => {
  const [nodeColor, setNodeColor] = useState("bg-blue-500 text-white");

  const CustomNode: React.FC<{ node: { label: string } }> = ({ node }) => (
    <div className={`p-2 rounded border border-white ${nodeColor}`}>
      {node.label}
    </div>
  );

  const graphData = {
    nodes: [
      { id: 1, label: "Node A" },
      { id: 2, label: "Node B" },
      { id: 3, label: "Node C" },
      { id: 4, label: "Node D" },
    ],
    links: [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row border w-full">
      {/* Panneau de configuration */}
      <div id="panel" className="w-full md:w-1/2 flex flex-col border-r px-4 py-4">
        <h2>🎮 Playground</h2>

        {/* Sélection de la couleur des nœuds */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Node Color</h3>
          <select
            onChange={(e) => setNodeColor(e.target.value)}
            className="input w-full input-bordered"
          >
            <option value="bg-blue-500 text-white">Blue</option>
            <option value="bg-green-500 text-white">green</option>
            <option value="bg-red-500 text-white">red</option>
          </select>
        </div>
      </div>

      {/* Affichage du Graph */}
      <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          NodeComponent={CustomNode}
          zoomScale={[0.5, 8]}
          linkForce={{ length: 200, strength: 1 }}
          chargeForce={{ strength: -30 }}
          gravityForce={{ center_x: 200, center_y: 200, strength: 0.05 }}
        />
      </div>
    </div>
  );
};

export default NodeComponentPage;
