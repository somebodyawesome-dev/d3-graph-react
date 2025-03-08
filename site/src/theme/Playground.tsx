import React, { useEffect, useState } from "react";
import { Graph, GraphType } from "d3-graph-react";
import "../pages/playground.css";

function PlayGround() {
  const [selectedExample, setSelectedExample] = useState("enterpriseNetwork");
  const [zoomScale, setZoomScale] = useState<[number, number]>([0.5, 8]);
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

  // Différents types de graphes
  const graphExamples = {
     enterpriseNetwork : {
      nodes: [
        { id: 0, name: "Central Server" },
        { id: 1, name: "IT Department" },
        { id: 2, name: "HR Department" },
        { id: 3, name: "Finance Department" },
        { id: 4, name: "Marketing Department" },
        { id: 5, name: "Customer Support" },
        { id: 6, name: "Database" },
        { id: 7, name: "Cloud Storage" },
        { id: 8, name: "Firewall" },
        { id: 9, name: "WiFi" },
        { id: 10, name: "Employees" },
      ],
      links: [
        { source: 9, target: 0 }, 
        { source: 10, target: 9 }, 
        { source: 0, target: 1 }, 
        { source: 0, target: 2 }, 
        { source: 0, target: 3 },  
        { source: 0, target: 4 },  
        { source: 0, target: 5 },  
        { source: 0, target: 6 },  
        { source: 0, target: 7 },  
        { source: 0, target: 8 },  
      ],
    },
    
    connectedCities: {
      nodes: [
        { id: 1, name: "Tunis" },
        { id: 2, name: "Sousse" },
        { id: 3, name: "Monastir" },
        { id: 4, name: "Gabès" },
        { id: 5, name: "Sfax" },
        { id: 6, name: "Kairouan" },
        { id: 7, name: "Djerba" },
        { id: 8, name: "Bizerte" },
        { id: 9, name: "Tozeur" },
      ],
      links: [
        { source: 0, target: 1 },
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 3, target: 4 },
        { source: 4, target: 5 },
        { source: 5, target: 6 },
        { source: 6, target: 7 },
        { source: 7, target: 8 },
        { source: 8, target: 0 },
      ],
    },
   connectedStates : {
      nodes: [
        { id: 1, name: "USA" },
        { id: 2, name: "NY" },
        { id: 3, name: "Albany" },
        { id: 4, name: "TX" },
        { id: 5, name: "Dallas" },
        { id: 6, name: "El Paso" },
        { id: 7, name: "Austin" },
        { id: 8, name: "Houston" },
        { id: 9, name: "AL" },
        { id: 10, name: "Jackson" },
        { id: 11, name: "Montgomery" },
        { id: 12, name: "Madison" },
        { id: 13, name: "CT" },
        { id: 14, name: "Hartford" },
        { id: 15, name: "CO" },
        { id: 16, name: "Cheyenne" },
        { id: 17, name: "Denver" },
      ],
      links: [
        { source: 0, target: 1 }, 
        { source: 1, target: 2 }, 
        { source: 0, target: 3 }, 
        { source: 3, target: 4 }, 
        { source: 3, target: 5 }, 
        { source: 3, target: 6 }, 
        { source: 3, target: 7 }, 
        { source: 0, target: 8 }, 
        { source: 8, target: 9 }, 
        { source: 8, target: 10 }, 
        { source: 8, target: 11 }, 
        { source: 0, target: 12 }, 
        { source: 12, target: 13 }, 
        { source: 0, target: 14 }, 
        { source: 14, target: 15 }, 
        { source: 14, target: 16 }, 
      ],
    },
    securityNetwork : {
      nodes: [
        { id: 1, name: "User" },
        { id: 2, name: "User" },
        { id: 3, name: "User" },
        { id: 4, name: "Home" },
        { id: 5, name: "Mobile" },
        { id: 6, name: "Security" },
        { id: 7, name: "Report" },
        { id: 8, name: "Business" },
        { id: 9, name: "Store" },
        { id: 10, name: "Analytics" },
        { id: 11, name: "Tape Storage" },
        { id: 12, name: "Customer Support" },
        { id: 13, name: "Storage" },
      ],
      links: [
        { source: 0, target: 5 },  
        { source: 1, target: 5 },  
        { source: 2, target: 5 },  
        { source: 3, target: 5 },  
        { source: 4, target: 5 },  
        { source: 5, target: 6 }, 
        { source: 5, target: 7 },  
        { source: 5, target: 8 },  
        { source: 5, target: 9 },  
        { source: 9, target: 10 }, 
        { source: 5, target: 11 }, 
        { source: 5, target: 12 }, 
      ],
    }    
  };
  

  const [nodeNames, setNodeNames] = useState(
    graphExamples[selectedExample].nodes.map((n) => n.name)
  );

  useEffect(() => {
    setNodeNames(graphExamples[selectedExample].nodes.map((n) => n.name));
  }, [selectedExample]);

  const handleNodeNameChange = (index: number, newName: string) => {
    const updatedNames = [...nodeNames];
    updatedNames[index] = newName;
    setNodeNames(updatedNames);
  };

  const graphData = {
    nodes: graphExamples[selectedExample].nodes.map((n, index) => ({
      ...n,
      name: nodeNames[index],
    })),
    links: graphExamples[selectedExample].links,
  };

  return (
    <div className="flex flex-col md:flex-row border w-full">
      {/* Panel des contrôles */}
      <div id="panel" className="w-full md:w-1/3 flex flex-col border-r px-4 py-2 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Exemples :</h3>
        <select
          value={selectedExample}
          onChange={(e) => setSelectedExample(e.target.value)}
          className="input w-full input-bordered py-1 px-2"
        >
          <option value="enterpriseNetwork">Enterprise Network</option>
          <option value="connectedCities">Connected Cities</option>
          <option value="connectedStates">States and Cities</option>
          <option value="securityNetwork">Security and Storage</option>
        </select>

        {/* Contrôles */}
        <div className="mt-4">
          <label className="flex items-center">
            <input type="checkbox" onChange={() => setDraggable(!draggable)} checked={draggable} />
            <span className="ml-2">Draggable</span>
          </label>
        </div>

        {/* Zoom Scale */}
        <h3 className="text-lg font-semibold mt-4">Zoom Scale</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm mb-1">Minimum</label>
            <input type="number" value={zoomScale[0]} className="input w-full" readOnly />
          </div>
          <div>
            <label className="block text-sm mb-1">Maximum</label>
            <input type="number" value={zoomScale[1]} className="input w-full" readOnly />
          </div>
        </div>

        {/* Link Force */}
        <h3 className="text-lg font-semibold mt-4">Link Force</h3>
         <div className="grid grid-cols-2 gap-2">
       <div>
       <label className="block text-sm mb-1">Length</label>
       <input type="number" value={linkForce.length} className="input w-full" readOnly />
       </div>
       <div>
        <label className="block text-sm mb-1">Strength</label>
        <input type="number" value={linkForce.strength} className="input w-full" readOnly />
       </div>
      </div>
     {/* Gravity Force */}
      <h3 className="text-lg font-semibold mt-4">Gravity Force</h3>
      <div className="grid grid-cols-3 gap-2">
      <div>
      <label className="block text-sm mb-1">X</label>
      <input type="number" value={gravityForce.center_x} className="input w-full" readOnly />
      </div>
      <div>
      <label className="block text-sm mb-1">Y</label>
      <input type="number" value={gravityForce.center_y} className="input w-full" readOnly />
      </div>
      <div>
       <label className="block text-sm mb-1">Z</label>
       <input type="number" value={gravityForce.strength} className="input w-full" readOnly />
      </div>
      </div>
        {/* Charge Force */}
        <h3 className="text-lg font-semibold mt-4">Charge Force</h3>
        <input type="number" value={chargeForce.strength} className="input w-full" readOnly />
      </div>

      {/* Affichage du graphe */}
      <div id="nodes" className="w-full md:w-2/3 h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
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
        />
      </div>
    </div>
  );
}

export default PlayGround;
