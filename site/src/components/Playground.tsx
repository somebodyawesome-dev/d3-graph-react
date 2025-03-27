import React, { useEffect, useState } from "react";
import { Graph, GraphType } from "d3-graph-react";
import { characters, relationships } from "../examples/theoffice/theoffice";
import { nodes as departmentNodes, links as departmentLinks, DepartmentNode } from "../examples/department";
import CharacterNode from "../examples/theoffice/CharacterNode";
import "../pages/playground.css";

interface GraphNode {
  id: number;
  name: string;
  type: "main" | "department" | "team" | string;
  image?: string;
  size?: number;
  color?: string;
}

const CustomLink = ({ sourceNode, sourceNodeRef, targetNode, targetNodeRef, link }: any) => {
  if (!sourceNode || !targetNode || !sourceNodeRef?.current || !targetNodeRef?.current) return null;

  const { offsetWidth: sw, offsetHeight: sh } = sourceNodeRef.current!;
  const { offsetWidth: tw, offsetHeight: th } = targetNodeRef.current!;

  return (
    <path
      d={`M ${sourceNode.x + sw / 2},${sourceNode.y + sh / 2} 
          L ${targetNode.x + tw / 2} ${targetNode.y + th / 2}`}
      stroke={link?.color || "gray"}
      strokeWidth={2}
      strokeDasharray={link?.type === "Hookup/Fling" ? "5,3" : undefined}
      fill="none"
      markerEnd="url(#arrowhead)" 
    />
  );
};


function Playground() {
  const [selectedExample, setSelectedExample] = useState("department");
  const [zoomMin, setZoomMin] = useState(0.5);
  const [zoomMax, setZoomMax] = useState(8);
  const [draggable, setDraggable] = useState(true);
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexedCharacters = characters.map((char, index) => ({
    ...char,
    index,
  }));

  const indexedRelationships = relationships
  .map((rel) => {
    const sourceIndex = characters.findIndex((c) => c.id === rel.source);
    const targetIndex = characters.findIndex((c) => c.id === rel.target);
    if (sourceIndex === -1 || targetIndex === -1) return null;

    return {
      source: sourceIndex,
      target: targetIndex,
      color: rel.color,      
      type: rel.type,
    };
  })
  .filter(Boolean);

  let graphData;
  if (selectedExample === "department") {
    const mappedNodes = departmentNodes.map((node) => ({
      ...node,
      image: "", 
    }));
  
    graphData = {
      nodes: mappedNodes,
      links: departmentLinks,
      nodeComponent: DepartmentNode,
    };
  }
   else {
    graphData = {
      nodes: indexedCharacters,
      links: indexedRelationships,
      linkComponent: CustomLink,
      nodeComponent: CharacterNode,
    };
  }

  const [graphKey, setGraphKey] = useState(0);
  
  return (
    <div className="flex flex-col md:flex-row border w-full bg-black text-white">
      <div className="md:w-[50%] flex flex-col border-r px-4 py-2 overflow-auto bg-black">
        <h3 className="text-lg font-semibold mb-2">Exemple Graphique :</h3>
        <select
          className="bg-black text-white border border-gray-600 rounded px-2 py-1"
          value={selectedExample}
          onChange={(e) => setSelectedExample(e.target.value)}
        >
          <option value="department">Agile Organization</option>
          <option value="theoffice">Relationships in The Office</option>
        </select>

        <div className="mt-4 border-t pt-2">
          <h3 className="text-lg font-semibold">Paramètres du Graph</h3>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="draggable"
              checked={draggable}
              onChange={() => setDraggable(!draggable)}
              className="mr-2"
            />
            <label htmlFor="draggable">Draggable</label>
          </div>

          <h4 className="text-md font-semibold mt-3">Zoom Scale</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Min</label>
              <input
                type="number"
                value={zoomMin}
                onChange={(e) => setZoomMin(parseFloat(e.target.value))}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Max</label>
              <input
                type="number"
                value={zoomMax}
                onChange={(e) => setZoomMax(parseFloat(e.target.value))}
                className="input w-full"
              />
            </div>
          </div>

          <h4 className="text-md font-semibold mt-3">Link Force</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Length</label>
              <input
                type="number"
                value={linkForce.length}
                onChange={(e) => setLinkForce({ ...linkForce, length: parseFloat(e.target.value) })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Strength</label>
              <input
                type="number"
                value={linkForce.strength}
                onChange={(e) => setLinkForce({ ...linkForce, strength: parseFloat(e.target.value) })}
                className="input w-full"
              />
            </div>
          </div>

          <h4 className="text-md font-semibold mt-3">Gravity Force</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm">X</label>
              <input
                type="number"
                value={gravityForce.center_x}
                onChange={(e) => setGravityForce({ ...gravityForce, center_x: parseFloat(e.target.value) })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Y</label>
              <input
                type="number"
                value={gravityForce.center_y}
                onChange={(e) => setGravityForce({ ...gravityForce, center_y: parseFloat(e.target.value) })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Strength</label>
              <input
                type="number"
                value={gravityForce.strength}
                onChange={(e) => setGravityForce({ ...gravityForce, strength: parseFloat(e.target.value) })}
                className="input w-full"
              />
            </div>
          </div>

          <h4 className="text-md font-semibold mt-3">Charge Force</h4>
          <input
            type="number"
            value={chargeForce.strength}
            onChange={(e) => setChargeForce({ strength: parseFloat(e.target.value) })}
            className="input w-full"
          />
        </div>

        {selectedExample === "theoffice" && (
          <div className="mt-4 px-3 py-1 rounded bg-black text-white text-xs shadow  self-start border border-white">
            <h4 className="font-semibold mb-1 text-xs">Legend</h4>
            <ul className="flex gap-3 items-center">
              <li className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#e91e63" }}></span>
                <span>Married</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#2196f3" }}></span>
                <span>Engaged</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#4caf50" }}></span>
                <span>Dated</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#ff9800" }}></span>
                <span>Hookup / Fling</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div id="nodes" className="w-full md:w-[60%] h-[80dvh] flex">
        <Graph
          key={`${graphKey}-${selectedExample}`}
          containerId="container-custom-id"
          graph={graphData}
          isNodeDraggable={draggable}
          linkForce={linkForce}
          zoomScale={[zoomMin, zoomMax]}
          gravityForce={gravityForce}
          chargeForce={chargeForce}
          NodeComponent={graphData.nodeComponent}
          LinkComponent={graphData.linkComponent}
        />
      </div>
    </div>
  );
}

export default Playground;
