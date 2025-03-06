import React, { useState } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const ZoomScalePage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        {/* Section ZoomScale */}
        <section className="intro-section">
          <h1>🔍 ZoomScale</h1>
          <p>
            <code>zoomScale</code> définit les limites de zoom du graphe. La valeur par défaut est <code>[0.5, 8]</code>.
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
  <Graph graph={graphData} zoomScale={[0.5, 8]} />
);`}
            </code>
          </pre>
        </section>

        {/* Playground */}
        <ZoomScalePlayground />
      </div>
    </div>
  );
};

const ZoomScalePlayground: React.FC = () => {
  const [zoomMin, setZoomMin] = useState(0.5);
  const [zoomMax, setZoomMax] = useState(8);

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

        {/* Paramètres Zoom Scale */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Zoom Scale</h3>
          <p>Minimum zoom:</p>
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="5"
            value={zoomMin}
            onChange={(e) => setZoomMin(parseFloat(e.target.value))}
            className="input w-full input-bordered"
          />

          <p className="mt-2">Maximum zoom:</p>
          <input
            type="number"
            step="0.1"
            min="1"
            max="10"
            value={zoomMax}
            onChange={(e) => setZoomMax(parseFloat(e.target.value))}
            className="input w-full input-bordered"
          />
        </div>
      </div>

      {/* Affichage du Graph */}
      <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          zoomScale={[zoomMin, zoomMax]}
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

export default ZoomScalePage;
