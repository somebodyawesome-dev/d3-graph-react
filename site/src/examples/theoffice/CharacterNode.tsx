import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface GraphNode {
  id: number;
  name: string;
  type?: string;
  image?: string;
  size?: number;
  color?: string;
}

const CharacterNode = ({ node }: { node: GraphNode }) => {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid white",
        backgroundColor: "#fff",
        boxShadow: "0 0 5px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={useBaseUrl(`/img/theoffice/${node.image}`)}
        alt={node.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default CharacterNode;
