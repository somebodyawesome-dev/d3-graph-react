import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import { Graph, GraphType } from "d3-graph-react";
import "./playground.css";

function PlayGround() {
  const [zoomScale, setZoomScale] = useState<[number, number]>([0.5, 8]);
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
      setGravityForce({
        center_x: window.innerWidth <= 640 ? 150 : 200,
        center_y: window.innerWidth <= 640 ? 150 : 200,
        strength: 0.05,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout title="Playground"> 
      <div className="flex flex-col md:flex-row border w-full p-4">
        
        {/* Panneau de contrôle */}
        <div className="w-full md:w-1/3 flex flex-col border-r px-4 py-2 overflow-auto">
          <h3 className="text-lg font-semibold mb-2">Configurations</h3>

          {/* Draggable */}
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={draggable}
                onChange={() => setDraggable(!draggable)}
                className="form-checkbox"
              />
              <span className="text-sm">Draggable</span>
            </label>
          </div>

          {/* Zoom Scale */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Zoom Minimum</label>
            <input
              type="number"
              value={zoomScale[0]}
              className="input w-full"
              onChange={(e) => setZoomScale([parseFloat(e.target.value), zoomScale[1]])}
            />
            <label className="block text-sm mb-2 mt-2">Zoom Maximum</label>
            <input
              type="number"
              value={zoomScale[1]}
              className="input w-full"
              onChange={(e) => setZoomScale([zoomScale[0], parseFloat(e.target.value)])}
            />
          </div>

          {/* Link Force */}
          <div className="mb-4">
            <h3 className=" text-lg font-semibold mb-2">Link Force</h3>
            <label className="block text-sm mb-2">Length</label>
            <input
              type="number"
              value={linkForce.length}
              className="input w-full"
              onChange={(e) => setLinkForce({ ...linkForce, length: parseFloat(e.target.value) })}
            />
            <label className="block text-sm mb-2 mt-2">Strength</label>
            <input
              type="number"
              value={linkForce.strength}
              className="input w-full"
              onChange={(e) => setLinkForce({ ...linkForce, strength: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        {/* Graph */}
        <div id="nodes" className="w-full h-[50dvh] md:h-[80dvh] flex">
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
            LinkComponent={({
              sourceNode,
              sourceNodeRef,
              targetNode,
              targetNodeRef,
            }) => {
              if (!sourceNode || !targetNode || !sourceNodeRef?.current || !targetNodeRef?.current)
                return null;
              const {
                offsetWidth: sourceOffsetWidth,
                offsetHeight: sourceOffsetHeight,
              } = sourceNodeRef.current!;
              const {
                offsetWidth: targetOffsetWidth,
                offsetHeight: targetOffsetHeight,
              } = targetNodeRef.current!;
              return (
                <path
                  className="link"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  d={`M ${sourceNode.x + sourceOffsetWidth / 2},${
                    sourceNode.y + sourceOffsetHeight / 2
                  } L ${targetNode.x + targetOffsetWidth / 2} ${
                    targetNode.y + targetOffsetHeight / 2
                  }`}
                  stroke={"gray"}
                  strokeWidth={1}
                ></path>
              );
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default PlayGround;
