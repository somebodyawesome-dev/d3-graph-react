import React, { useState } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const LinkComponentPage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section LinkComponent */}
        <section className="intro-section">
          <h1>🔗 LinkComponent</h1>
          <p>
            <code>LinkComponent</code> permet de personnaliser l'affichage des liens entre les nœuds du graphe.
          </p>
          <br />
          {/* Example Usage */}
          <h2>📌 Example Usage</h2>
          <pre>
            <code>
{`const CustomLink = ({ sourceNode, targetNode }) => (
  <line
    x1={sourceNode.x}
    y1={sourceNode.y}
    x2={targetNode.x}
    y2={targetNode.y}
    stroke="red"
    strokeWidth={2}
  />
);

const graphData = {
  nodes: [{ id: 1 }, { id: 2 }],
  links: [{ source: 0, target: 1 }],
};

const MyGraph = () => (
  <Graph graph={graphData} LinkComponent={CustomLink} />
);`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <LinkComponentPlayground />
      </div>
    </div>
  );
};

const LinkComponentPlayground: React.FC = () => {
  const [linkColor, setLinkColor] = useState("gray");
  const [linkWidth, setLinkWidth] = useState(2);

  const CustomLink: React.FC<{ sourceNode: any; targetNode: any }> = ({ sourceNode, targetNode }) => (
    <line
      x1={sourceNode.x}
      y1={sourceNode.y}
      x2={targetNode.x}
      y2={targetNode.y}
      stroke={linkColor}
      strokeWidth={linkWidth}
    />
  );

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

        {/* Paramètres des Liens */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Link Settings</h3>
          <p>Link color :</p>
          <select
            onChange={(e) => setLinkColor(e.target.value)}
            className="input w-full input-bordered"
          >
            <option value="gray">Gray</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>

          <p className="mt-2">Link Thickness :</p>
          <input
            type="number"
            min="1"
            max="10"
            value={linkWidth}
            onChange={(e) => setLinkWidth(parseInt(e.target.value, 10))}
            className="input w-full input-bordered"
          />
        </div>
      </div>

      {/* Affichage du Graph */}
      <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          LinkComponent={CustomLink}
          zoomScale={[0.5, 8]}
          linkForce={{ length: 200, strength: 1 }}
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

export default LinkComponentPage;
