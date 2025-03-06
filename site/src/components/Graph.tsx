import React from "react";
import { Graph, GraphType } from "d3-graph-react";
import { useEffect, useState } from "react";
import "./Global.css";
import "../pages/playground.css"; 

const GraphPage: React.FC = () => {
  return (
    <div className="graph-page"> 
      <div className="intro-wrapper">
        {/* Section Graph */}
        <section className="intro-section">
          <h1>📊 Graph</h1>
          <p>
            <code>graph</code> Contains nodes and links arrays to represent the graph structure.
          </p>
          <br/>
          {/* Example Usage */}
          <h2>📌 Example Usage</h2>
          <pre>
            <code>
{`const graphData = {
  nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
  ],
};

const MyGraph = () => (
  <Graph
    graph={graphData}
    zoomScale={[0.5, 8]}
    linkForce={{ strength: 1, length: 100 }}
    gravityForce={{ strength: 0.1, center_x: 0, center_y: 0 }}
    chargeForce={{ strength: -30 }}
  />
);`}
            </code>
          </pre>
        </section>

        {/* Section Playground */}
        <PlayGround />
      </div>
    </div>
  );
};

// Composant PlayGround pour manipuler les paramètres dynamiquement
const PlayGround: React.FC = () => {
  const [zoomScale, _setZoomScale] = useState<[number, number]>([0.5, 8]);
  const [linkForce, setLinkForce] = useState<GraphType["linkForce"]>({
    length: 200,
    strength: 1,
  });
  const [gravityForce, setGravityForce] = useState<GraphType["gravityForce"]>({
    center_x: 200,
    center_y: 200,
    strength: 0.05,
  });
  const [chargeForce, setChargeForce] = useState<GraphType["chargeForce"]>({
    strength: -10,
  });
  const [draggable, setDraggable] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setGravityForce({ center_x: 150, center_y: 150, strength: 0.05 });
      } else {
        setGravityForce({ center_x: 200, center_y: 200, strength: 0.05 });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row border w-full">
      {/* Panneau de configuration */}
      <div id="panel" className="w-full md:w-1/2 flex flex-col border-r px-4 py-2 md:py-4 md:px-6 overflow-auto">
        <h2>🎮 Playground</h2>

        {/* Option: Draggable Nodes */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Node</h3>
        </div>

        {/* Paramètres Zoom */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Zoom Scale</h3>
          <input
            type="text"
            defaultValue={"0.5"}
            className="input w-full input-bordered"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) _setZoomScale([value, zoomScale[1]]);
            }}
          />
          <input
            type="text"
            defaultValue={"8"}
            className="input w-full input-bordered"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) _setZoomScale([zoomScale[0], value]);
            }}
          />
        </div>

        {/* Paramètres Link Force */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Link Force</h3>
          <input
            type="text"
            defaultValue={"200"}
            className="input w-full input-bordered"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) setLinkForce({ ...linkForce, length: value });
            }}
          />
          <input
            type="text"
            defaultValue={"1"}
            className="input w-full input-bordered"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) setLinkForce({ ...linkForce, strength: value });
            }}
          />
        </div>
      </div>

      {/* Affichage du Graph */}
      <div id="nodes" className="w-full h-[50dvh] md:w-full md:h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={{
            links: [
              { source: 0, target: 1 },
              { source: 1, target: 2 },
              { source: 1, target: 3 },
            ],
            nodes: [
              { id: 1, name: "Node 1" },
              { id: 2, name: "Node 2" },
              { id: 3, name: "Node 3" },
              { id: 4, name: "Node 4" },
            ],
          }}
          isNodeDraggable={draggable}
          linkForce={linkForce}
          zoomScale={zoomScale}
          gravityForce={gravityForce}
          chargeForce={chargeForce}
          NodeComponent={({ node: { name } }) => (
            <div className="bg-gray-400 p-2 rounded border border-white break-normal text-nowrap">
              {name}
            </div>
          )}
          LinkComponent={({ sourceNode, sourceNodeRef, targetNode, targetNodeRef }) => {
            if (!sourceNode || !targetNode || !sourceNodeRef?.current || !targetNodeRef?.current)
              return null;
            const { offsetWidth: sourceOffsetWidth, offsetHeight: sourceOffsetHeight } = sourceNodeRef.current!;
            const { offsetWidth: targetOffsetWidth, offsetHeight: targetOffsetHeight } = targetNodeRef.current!;
            return (
              <path
                className="link"
                fill="none"
                markerEnd="url(#arrowhead)"
                d={`M ${sourceNode.x + sourceOffsetWidth / 2},${sourceNode.y + sourceOffsetHeight / 2} 
                  L ${targetNode.x + targetOffsetWidth / 2} ${targetNode.y + targetOffsetHeight / 2}`}
                stroke={"gray"}
                strokeWidth={1}
              ></path>
            );
          }}
        />
      </div>
    </div>
  );
};

export default GraphPage;
