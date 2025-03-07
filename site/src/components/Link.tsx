import React, { useState, useEffect, useRef } from "react";
import { Graph } from "d3-graph-react";
import "./Global.css";
import "../pages/playground.css";

const nodeWidth = 60; // Largeur des nœuds
const nodeHeight = 40; // Hauteur réduite des nœuds

const LinkComponentPage: React.FC = () => {
  return (
    <div className="graph-page">
      <div className="intro-wrapper">
        <section className="intro-section">
          <h1>🔗 LinkComponent</h1>
          <p>
            <code>LinkComponent</code> Allows customizing the display of links between the graph nodes.
          </p>
          <br />
          <h2>📌 Example Usage</h2>
        </section>
        <LinkComponentPlayground />
      </div>
    </div>
  );
};

const LinkComponentPlayground: React.FC = () => {
  const [linkColor, setLinkColor] = useState("gray");
  const [linkWidth, setLinkWidth] = useState(2);
  const nodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    console.log("Node refs updated:", nodeRefs.current);
  }, []);

  const CustomLink: React.FC<{ sourceNode: any; targetNode: any }> = ({ sourceNode, targetNode }) => {
    const getNodeCenter = (nodeId: number) => {
      const nodeElement = nodeRefs.current[nodeId];
      if (nodeElement) {
        return { x: nodeWidth / 2, y: nodeHeight / 2 };
      }
      return { x: nodeWidth / 2, y: nodeHeight / 2 };
    };

    const sourceOffset = getNodeCenter(sourceNode.id);
    const targetOffset = getNodeCenter(targetNode.id);

    return (
      <line
        x1={sourceNode.x + sourceOffset.x}
        y1={sourceNode.y + sourceOffset.y}
        x2={targetNode.x + targetOffset.x}
        y2={targetNode.y + targetOffset.y}
        stroke={linkColor}
        strokeWidth={linkWidth}
      />
    );
  };

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
      <div id="panel" className="w-full md:w-1/2 flex flex-col border-r px-4 py-4">
        <h2>🎮 Playground</h2>
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

      <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          LinkComponent={CustomLink}
          zoomScale={[0.5, 8]}
          linkForce={{ length: 200, strength: 1 }}
          chargeForce={{ strength: -30 }}
          gravityForce={{ center_x: 200, center_y: 200, strength: 0.05 }}
          NodeComponent={({ node }) => (
            <div
              ref={(el) => (nodeRefs.current[node.id] = el)}
              className="bg-gray-400 p-2 rounded border border-white break-normal text-nowrap"
              style={{
                width: nodeWidth,
                height: nodeHeight,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              {node.name}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default LinkComponentPage;
