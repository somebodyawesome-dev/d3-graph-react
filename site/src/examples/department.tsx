interface Node {
  id: number;
  name: string;
  type: "main" | "department" | "team";
  size: number;
  color: string;
}

interface Link {
  source: number;
  target: number;
}

const nodes: Node[] = [
  { id: 0, name: "Product Owner", type: "main", size: 140, color: "#FFD788" },
  { id: 1, name: "Dev Team", type: "department", size: 110, color: "#1e90ff" },
  { id: 2, name: "QA Team", type: "department", size: 110, color: "#9c27b0" },
  {
    id: 3,
    name: "DevOps Team",
    type: "department",
    size: 110,
    color: "#4db6ac",
  },
  { id: 4, name: "Frontend Dev", type: "team", size: 90, color: "#ffcc00" },
  { id: 5, name: "Backend Dev", type: "team", size: 90, color: "#ff7043" },
  { id: 6, name: "Mobile Dev", type: "team", size: 90, color: "#26a69a" },
  {
    id: 7,
    name: "Automated Testing",
    type: "team",
    size: 90,
    color: "#ab47bc",
  },
  { id: 8, name: "Manual Testing", type: "team", size: 90, color: "#8e24aa" },
  { id: 9, name: "CI/CD", type: "team", size: 90, color: "#78909c" },
  { id: 10, name: "Infrastructure", type: "team", size: 90, color: "#ff1744" },
];

const links: Link[] = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 1, target: 4 },
  { source: 1, target: 5 },
  { source: 1, target: 6 },
  { source: 2, target: 7 },
  { source: 2, target: 8 },
  { source: 3, target: 9 },
  { source: 3, target: 10 },
];
const DepartmentNode = ({ node }: { node: Node }) => {
  if (!node || !node.type) {
    return null;
  }

  const isOval = node.type === "team";

  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: node.color || "#ccc",
        width: isOval ? (node.size || 80) * 1.3 : node.size || 80,
        height: node.size || 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid white",
        borderRadius: isOval ? "50% / 30%" : "50%",
        fontSize: "2rem",
        padding: "10px",
      }}
    >
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
export { nodes, links };
