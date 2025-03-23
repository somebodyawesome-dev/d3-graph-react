import React, { useEffect, useState } from "react";
import { Graph, GraphType } from "d3-graph-react";
import "../pages/playground.css";

interface GraphNode {
  id: string;
  name: string;
  type: string;
  size?: number;
  color?: string;
  icon?: string;
}

function PlayGround() {
  const [selectedExample, setSelectedExample] = useState("agileProject");
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
  const BasicNode = ({ node }: { node: GraphNode }) => {
    if (!node || !node.type) {
      return null;
    }
    const isSquare = selectedExample === "customGraph" && node.type === "team";
    const isRectangle = selectedExample === "iconGraph";
    const isOval = selectedExample === "agileProject" && node.type === "team";

    return (
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: node.color || "#ccc",
          width: isRectangle
            ? (node.size || 80) * 1.5
            : isOval
            ? (node.size || 80) * 1.3
            : node.size || 80,
          height: node.size || 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid white",
          borderRadius: isRectangle
            ? "10px"
            : isOval
            ? "50% / 30%"
            : isSquare
            ? "15%"
            : "50%",
          fontSize: "2rem",
          padding: "10px",
        }}
      >
        <div style={{ fontSize: "2rem" }}>{node.icon ? node.icon : ""}</div>

        <div
          style={{
            fontSize: "0.8rem",
            color: "white",
            marginTop: "5px",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          }}
        >
          {node.name || node.type}
        </div>
      </div>
    );
  };
  const graphExamples = {
    customGraph: {
      nodes: [
        {
          id: "0",
          name: "Headquarters",
          type: "main",
          size: 140,
          color: "#ff9800",
        },
        {
          id: "1",
          name: "Human Resources",
          type: "department",
          size: 110,
          color: "#3b82f6",
        },
        {
          id: "2",
          name: "IT Department",
          type: "department",
          size: 110,
          color: "#9333ea",
        },
        {
          id: "3",
          name: "Marketing",
          type: "department",
          size: 110,
          color: "#ec4899",
        },
        {
          id: "4",
          name: "Finance",
          type: "department",
          size: 110,
          color: "#4caf50",
        },
        {
          id: "5",
          name: "Recruitment",
          type: "team",
          size: 90,
          color: "#60a5fa",
        },
        {
          id: "6",
          name: "Talent Management",
          type: "team",
          size: 90,
          color: "#60a5fa",
        },
        { id: "7", name: "Web Dev", type: "team", size: 90, color: "#a855f7" },
        {
          id: "8",
          name: "IT Support",
          type: "team",
          size: 90,
          color: "#a855f7",
        },
        {
          id: "9",
          name: "Advertising",
          type: "team",
          size: 90,
          color: "#f472b6",
        },
        {
          id: "10",
          name: "Public Relations",
          type: "team",
          size: 90,
          color: "#f472b6",
        },
        {
          id: "11",
          name: "Accounting",
          type: "team",
          size: 90,
          color: "#66bb6a",
        },
        { id: "12", name: "Audit", type: "team", size: 90, color: "#66bb6a" },
      ],
      links: [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "0", target: "3" },
        { source: "0", target: "4" },
        { source: "1", target: "5" },
        { source: "1", target: "6" },
        { source: "2", target: "7" },
        { source: "2", target: "8" },
        { source: "3", target: "9" },
        { source: "3", target: "10" },
        { source: "4", target: "11" },
        { source: "4", target: "12" },
      ],
      nodeComponent: BasicNode,
    },
    agileProject: {
      nodes: [
        {
          id: "0",
          name: "Product Owner",
          type: "main",
          size: 140,
          color: "#FFD788",
        },
        {
          id: "1",
          name: "Dev Team",
          type: "department",
          size: 110,
          color: "#1e90ff",
        },
        {
          id: "2",
          name: "QA Team",
          type: "department",
          size: 110,
          color: "#9c27b0",
        },
        {
          id: "3",
          name: "DevOps Team",
          type: "department",
          size: 110,
          color: "#4db6ac",
        },
        {
          id: "4",
          name: "Frontend Dev",
          type: "team",
          size: 90,
          color: "#ffcc00",
        },
        {
          id: "5",
          name: "Backend Dev",
          type: "team",
          size: 90,
          color: "#ff7043",
        },
        {
          id: "6",
          name: "Mobile Dev",
          type: "team",
          size: 90,
          color: "#26a69a",
        },
        {
          id: "7",
          name: "Automated Testing",
          type: "team",
          size: 90,
          color: "#ab47bc",
        },
        {
          id: "8",
          name: "Manual Testing",
          type: "team",
          size: 90,
          color: "#8e24aa",
        },
        { id: "9", name: "CI/CD", type: "team", size: 90, color: "#78909c" },
        {
          id: "10",
          name: "Infrastructure",
          type: "team",
          size: 90,
          color: "#ff1744",
        },
      ],

      links: [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "0", target: "3" },
        { source: "1", target: "4" },
        { source: "1", target: "5" },
        { source: "1", target: "6" },
        { source: "2", target: "7" },
        { source: "2", target: "8" },
        { source: "3", target: "9" },
        { source: "3", target: "10" },
      ],
      nodeComponent: BasicNode,
    },
    iconGraph: {
      nodes: [
        { id: "0", type: "security", size: 110, icon: "🔒", color: "#ff0000" },
        { id: "1", type: "user", size: 90, icon: "👤", color: "#1e90ff" },
        { id: "2", type: "home", size: 90, icon: "🏠", color: "#ffcc00" },
        { id: "3", type: "mobile", size: 90, icon: "📱", color: "#8e44ad" },
        { id: "4", type: "report", size: 90, icon: "📄", color: "#2ecc71" },
        { id: "5", type: "business", size: 90, icon: "💼", color: "#f39c12" },
        { id: "6", type: "store", size: 90, icon: "🏪", color: "#3498db" },
        { id: "7", type: "analytics", size: 90, icon: "📊", color: "#e74c3c" },
        { id: "8", type: "storage", size: 90, icon: "🖥️", color: "#9b59b6" },
        { id: "9", type: "internet", size: 90, icon: "🌍", color: "#16a085" },
        { id: "10", type: "chat", size: 70, icon: "💬", color: "#2c3e50" },
        { id: "11", type: "calendar", size: 70, icon: "📅", color: "#27ae60" },
        { id: "12", type: "education", size: 70, icon: "🎓", color: "#c0392b" },
        { id: "13", type: "customer", size: 70, icon: "👩‍💼", color: "#f1c40f" },
        { id: "14", type: "alarm", size: 70, icon: "⏰", color: "#d35400" },
        {
          id: "15",
          type: "tape_storage",
          size: 70,
          icon: "💾",
          color: "#34495e",
        },
      ],
      links: [
        { source: "1", target: "0" },
        { source: "2", target: "0" },
        { source: "3", target: "0" },
        { source: "4", target: "0" },
        { source: "5", target: "0" },
        { source: "6", target: "0" },
        { source: "7", target: "0" },
        { source: "0", target: "9" },
        { source: "9", target: "10" },
        { source: "10", target: "11" },
        { source: "11", target: "12" },
        { source: "9", target: "13" },
        { source: "14", target: "10" },
        { source: "0", target: "8" },
        { source: "8", target: "15" },
      ],
      nodeComponent: BasicNode,
    },

    officeArchitecture: {
      nodes: [
        {
          id: "0",
          name: "CEO",
          type: "executive",
          size: 150,
          color: "#ff0000",
          icon: "👨‍💼",
        },
        {
          id: "1",
          name: "CTO",
          type: "executive",
          size: 130,
          color: "#1e90ff",
          icon: "👨‍💻",
        },
        {
          id: "2",
          name: "CFO",
          type: "executive",
          size: 130,
          color: "#4caf50",
          icon: "💰",
        },
        {
          id: "3",
          name: "COO",
          type: "executive",
          size: 130,
          color: "#f39c12",
          icon: "📊",
        },
        {
          id: "4",
          name: "Software Dev",
          type: "department",
          size: 110,
          color: "#9c27b0",
          icon: "💻",
        },
        {
          id: "5",
          name: "Infrastructure",
          type: "department",
          size: 110,
          color: "#8e44ad",
          icon: "🖥️",
        },
        {
          id: "6",
          name: "Accounting",
          type: "department",
          size: 110,
          color: "#27ae60",
          icon: "📑",
        },
        {
          id: "7",
          name: "Payroll",
          type: "department",
          size: 110,
          color: "#16a085",
          icon: "💵",
        },
        {
          id: "8",
          name: "HR Department",
          type: "department",
          size: 110,
          color: "#e67e22",
          icon: "👥",
        },
        {
          id: "9",
          name: "Customer Support",
          type: "department",
          size: 110,
          color: "#f1c40f",
          icon: "🎧",
        },
        {
          id: "10",
          name: "Frontend Team",
          type: "team",
          size: 90,
          color: "#e74c3c",
          icon: "🌐",
        },
        {
          id: "11",
          name: "Backend Team",
          type: "team",
          size: 90,
          color: "#3498db",
          icon: "🖥️",
        },
        {
          id: "12",
          name: "Tech Support",
          type: "team",
          size: 90,
          color: "#f1c40f",
          icon: "🛠️",
        },
      ],
      links: [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "0", target: "3" },
        { source: "1", target: "4" },
        { source: "1", target: "5" },
        { source: "2", target: "6" },
        { source: "2", target: "7" },
        { source: "3", target: "8" },
        { source: "3", target: "9" },
        { source: "4", target: "10" },
        { source: "4", target: "11" },
        { source: "9", target: "12" },
      ],
      nodeComponent: BasicNode,
    },
  };

  const graphData = React.useMemo(() => {
    const selectedGraph = graphExamples[selectedExample];

    if (!selectedGraph) return { nodes: [], links: [] };

    const nodeIds = new Set(selectedGraph.nodes.map((node) => Number(node.id)));

    return {
      ...selectedGraph,
      nodes: selectedGraph.nodes.map((node) => ({
        ...node,
        id: Number(node.id),
      })),
      links: selectedGraph.links
        .filter(
          (link) =>
            nodeIds.has(Number(link.source)) && nodeIds.has(Number(link.target))
        )
        .map((link) => ({
          source: Number(link.source),
          target: Number(link.target),
        })),
    };
  }, [selectedExample]);

  return (
    <div className="flex flex-col md:flex-row border w-full">
      <div className="w-full md:w-1/3 flex flex-col border-r px-4 py-2 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Exemple Graphique :</h3>
        <select
          value={selectedExample}
          onChange={(e) => setSelectedExample(e.target.value)}
          className="input w-full input-bordered py-1 px-2"
        >
          <option value="customGraph">Company Organizational Structure</option>
          <option value="agileProject">Agile Project</option>
          <option value="iconGraph">Security and Network System</option>
          <option value="officeArchitecture">Office Architecture</option>
        </select>

        <div className="mt-4 border-t pt-2">
          <h3 className="text-lg font-semibold">Paramètres du Graph</h3>

          {/* Draggable */}
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

          {/* Zoom Scale */}
          <h4 className="text-md font-semibold mt-3">Zoom Scale</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Min</label>
              <input
                type="number"
                value={zoomScale[0]}
                className="input w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm">Max</label>
              <input
                type="number"
                value={zoomScale[1]}
                className="input w-full"
                readOnly
              />
            </div>
          </div>

          {/* Link Force */}
          <h4 className="text-md font-semibold mt-3">Link Force</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Length</label>
              <input
                type="number"
                value={linkForce.length}
                className="input w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm">Strength</label>
              <input
                type="number"
                value={linkForce.strength}
                className="input w-full"
                readOnly
              />
            </div>
          </div>

          {/* Gravity Force */}
          <h4 className="text-md font-semibold mt-3">Gravity Force</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm">X</label>
              <input
                type="number"
                value={gravityForce.center_x}
                className="input w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm">Y</label>
              <input
                type="number"
                value={gravityForce.center_y}
                className="input w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm">Strength</label>
              <input
                type="number"
                value={gravityForce.strength}
                className="input w-full"
                readOnly
              />
            </div>
          </div>

          {/* Charge Force */}
          <h4 className="text-md font-semibold mt-3">Charge Force</h4>
          <input
            type="number"
            value={chargeForce.strength}
            className="input w-full"
            readOnly
          />
        </div>
      </div>

      <div id="nodes" className="w-full md:w-2/3 h-[80dvh] flex">
        <Graph
          containerId="container-custom-id"
          graph={graphData}
          isNodeDraggable={draggable}
          linkForce={linkForce}
          zoomScale={zoomScale}
          gravityForce={gravityForce}
          chargeForce={chargeForce}
          NodeComponent={graphData.nodeComponent}
        />
      </div>
    </div>
  );
}

export default PlayGround;
