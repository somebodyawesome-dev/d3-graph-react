# Introduction

This package provides a customizable and interactive force-directed graph component for React, leveraging D3.js for simulations and transformations. The component allows users to visualize networks with nodes and links, and it supports features such as dragging, zooming, and customizable node and link rendering.

## About This Project

This project aims to simplify the use of D3.js in React applications by providing a library that facilitates smooth visualizations and features. Whether you are a beginner or an experienced developer, our library and documentation will assist you in creating interactive and dynamic data visualizations with ease.

## Key Features

- **TypeScript Support**
- **Easy integration**
- **Custom data support**
- **Customization**
- **Force-directed simulation of nodes and links**
- **Customizable node and link components**
- **Drag-and-drop functionality for nodes**
- **Zooming and panning of the graph**
- **Flexible force configuration for link distance, gravity, and charge**

## Getting Started

To get started, follow our comprehensive guide that covers everything from installation to creating your first D3 visualization. Our step-by-step tutorials and examples will make it easy for you to understand and implement D3 in your React projects.

### Installation

Install the library using npm:

```bash
npm i d3-graph-react
```

### `Graph` Component

- `graph`: Contains nodes and links arrays to represent the graph structure.
- `NodeComponent`: Optional. Custom React component for rendering nodes.
- `LinkComponent`: Optional. Custom React component for rendering links.
- `zoomScale`: Optional. Defines the scale limits for zooming. Default is [0.5, 8].
- `linkForce`: Optional. Configures the link force with strength and length.
- `gravityForce`: Optional. Configures the gravity force with strength, center_x, and center_y.
- `chargeForce`: Optional. Configures the charge force with strength.
- `isNodeDraggable`: Optional. Enables or disables node dragging. Default is true.

### Example Usage:

```javascript
const graphData = {
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
);
```

### TODO

- [ ] throttle simulation update
- [ ] combine useEffects
- [ ] memo some values e.g: selector,...
