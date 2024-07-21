
# Installation Guide

## Prerequisites
Before you start, ensure you have the following installed:
- Node.js (version >= 12.0.0)
- npm (Node Package Manager)

## Installation Steps

### Step 1: Install the Package
You can install the package via npm. Open your terminal and run the following command:

```bash
npm install @esdra-class/d3-graph-react
```

### Step 2: Import Components
You can import the components from the package. Open your file and add the following import statements:

```bash
import { Graph, GraphType } from "@esdra-class/d3-graph-react";
import "./App.css";
import { useState } from "react";

function App() {
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

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-full flex">
        <Graph
          graph={{
            links: [{ source: 0, target: 1 }],
            nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
          }}
          isNodeDraggable={draggable}
          linkForce={linkForce}
          zoomScale={zoomScale}
          gravityForce={gravityForce}
          chargeForce={chargeForce}
          NodeComponent={() => (
            <div className="bg-transparent border-4 whitespace-  border-solid border-gray-300 rounded-xl px-2 min-w-[100px] min-h-[50px] flex justify-center items-center">
              Ba3
            </div>
          )}
          LinkComponent={({ sourceNode, sourceNodeRef, targetNode, targetNodeRef }) => {
            if (!sourceNode || !targetNode || !sourceNodeRef.current || !targetNodeRef.current) return null;

            const { offsetWidth: sourceOffsetWidth, offsetHeight: sourceOffsetHeight } = sourceNodeRef.current!;
            const { offsetWidth: targetOffsetWidth, offsetHeight: targetOffsetHeight } = targetNodeRef.current!;

            return (
              <path
                className="link"
                fill="none"
                markerEnd="url(#arrowhead)"
                d={`M ${sourceNode.x + sourceOffsetWidth / 2},${sourceNode.y + sourceOffsetHeight / 2} L ${targetNode.x + targetOffsetWidth / 2} ${targetNode.y + targetOffsetHeight / 2}`}
                stroke="gray"
                strokeWidth={1}
              />
            );
          }}
        />
      </div>
      {/* panel */}
      <div className="w-1/3 flex flex-col border-blue-400 border-2 px-2">
        {/* Controls for Graph */}
      </div>
    </div>
  );
}
```

### Step 3: Configure and Use
Configure the Graph component according to your application needs. Here’s an example of how to configure and use the Graph component:

```bash
function App() {
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

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-full flex">
        <Graph
          graph={{
            links: [{ source: 0, target: 1 }],
            nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
          }}
          isNodeDraggable={draggable}
          linkForce={linkForce}
          zoomScale={zoomScale}
          gravityForce={gravityForce}
          chargeForce={chargeForce}
          NodeComponent={() => (
            <div className="bg-transparent border-4 whitespace-  border-solid border-gray-300 rounded-xl px-2 min-w-[100px] min-h-[50px] flex justify-center items-center">
              Ba3
            </div>
          )}
          LinkComponent={({ sourceNode, sourceNodeRef, targetNode, targetNodeRef }) => {
            if (!sourceNode || !targetNode || !sourceNodeRef.current || !targetNodeRef.current) return null;

            const { offsetWidth: sourceOffsetWidth, offsetHeight: sourceOffsetHeight } = sourceNodeRef.current!;
            const { offsetWidth: targetOffsetWidth, offsetHeight: targetOffsetHeight } = targetNodeRef.current!;

            return (
              <path
                className="link"
                fill="none"
                markerEnd="url(#arrowhead)"
                d={`M ${sourceNode.x + sourceOffsetWidth / 2},${sourceNode.y + sourceOffsetHeight / 2} L ${targetNode.x + targetOffsetWidth / 2} ${targetNode.y + targetOffsetHeight / 2}`}
                stroke="gray"
                strokeWidth={1}
              />
            );
          }}
        />
      </div>
      {/* panel */}
      <div className="w-1/3 flex flex-col border-blue-400 border-2 px-2">
        {/* Controls for Graph */}
      </div>
    </div>
  );
}
```

### Step 4: Customize

Customize the components as per your application's requirements, adjusting properties and styles as needed.

# Additional Information
- [React Graph](https://github.com/react-graph-graph/react-graph-graph)
