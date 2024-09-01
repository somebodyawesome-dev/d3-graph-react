import { Graph, GraphType } from "d3-graph-react";
import { useEffect, useState } from "react";
import "./example.css";

function PlayGround() {
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
      // Update size-related state if needed
      // Example: _setZoomScale([updatedMinZoom, updatedMaxZoom]);

      // Adjust Gravity Force for phone mode
      if (window.innerWidth <= 640) {
        setGravityForce({ center_x: 150, center_y: 150, strength: 0.05 });
      } else {
        setGravityForce({ center_x: 200, center_y: 200, strength: 0.05 });
      }
    }

    // Initial call to handleResize
    handleResize();

    // Attach resize listener
    window.addEventListener("resize", handleResize);
    return () => {
      // Cleanup: remove resize listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row border ">
      {/* Panel for controls */}
      <div
        id="panel"
        className="w-full md:w-1/2 flex flex-col border-r px-4 py-2 md:py-4 md:px-6 overflow-auto"
      >
        {/* Controls for draggable */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Node:</h3>
          <div className="flex items-center gap-2">
            <input
              onChange={() => setDraggable(!draggable)}
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              checked={draggable}
            />
            <span className="text-sm">Draggable</span>
          </div>
        </div>

        {/* Controls for zoom scale */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Zoom Scale</h3>
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">Minimum</label>
              <input
                type="text"
                placeholder="Minimum Value"
                defaultValue={"0.5"}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    _setZoomScale([value, zoomScale[1]]);
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Maximum</label>
              <input
                type="text"
                placeholder="Maximum Value"
                defaultValue={"8"}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    _setZoomScale([zoomScale[0], value]);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Controls for link force */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Link Force</h3>
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">Length</label>
              <input
                type="text"
                placeholder="Length Value"
                defaultValue={"200"}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setLinkForce({ ...linkForce, length: value });
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Strength</label>
              <input
                type="text"
                placeholder="Strength Value"
                defaultValue={"1"}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setLinkForce({ ...linkForce, strength: value });
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Controls for gravity force */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Gravity Force</h3>
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">X</label>
              <input
                type="text"
                defaultValue={gravityForce.center_x}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setGravityForce({ ...gravityForce, center_x: value });
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Y</label>
              <input
                type="text"
                defaultValue={gravityForce.center_y}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setGravityForce({ ...gravityForce, center_y: value });
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Strength</label>
              <input
                type="text"
                placeholder="Strength Value"
                defaultValue={gravityForce.strength}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setGravityForce({ ...gravityForce, strength: value });
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Controls for charge force */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Charge Force</h3>
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">Strength</label>
              <input
                type="text"
                placeholder="Strength Value"
                defaultValue={chargeForce.strength}
                className="input w-full input-bordered py-1 px-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setChargeForce({ strength: value });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Graph container */}
      <div id="nodes" className="w-full h-[50dvh]  md:w-full md:h-[80dvh] flex">
        <Graph
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
            <div className="bg-gray-400 p-2 rounded border border-white break-normal">
              {name}
            </div>
          )}
          LinkComponent={({
            sourceNode,
            sourceNodeRef,
            targetNode,
            targetNodeRef,
          }) => {
            if (
              !sourceNode ||
              !targetNode ||
              !sourceNodeRef?.current ||
              !targetNodeRef?.current
            )
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
  );
}

export default PlayGround;
