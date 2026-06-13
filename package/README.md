<p align="center">
  <img src="https://raw.githubusercontent.com/somebodyawesome-dev/d3-graph-react/main/site/static/img/logo.png" width="128" alt="d3-graph-react logo" />
</p>

<h1 align="center">d3-graph-react</h1>

<p align="center"><strong>Force-directed graphs, the React way.</strong></p>

<p align="center">
  <a href="https://www.npmjs.com/package/d3-graph-react"><img src="https://img.shields.io/npm/v/d3-graph-react?color=6366f1&label=npm" alt="npm version" /></a>
  <a href="https://github.com/somebodyawesome-dev/d3-graph-react/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-a78bfa" alt="MIT license" /></a>
  <a href="https://somebodyawesome-dev.github.io/d3-graph-react/"><img src="https://img.shields.io/badge/docs-website-22d3ee" alt="documentation" /></a>
</p>

**d3-graph-react** wraps the power of [d3-force](https://d3js.org/d3-force) in a fully typed
React component. Describe your network as plain data, render nodes and links as ordinary React
components, and let the simulation handle the physics — drag, zoom and pan included, without
writing a single line of D3.

📚 **[Documentation & live playground →](https://somebodyawesome-dev.github.io/d3-graph-react/)**

## Why?

D3 and React both want to own the DOM. d3-graph-react draws a clean line between the two:
**D3 computes** (force simulation, drag physics, zoom transforms) and **React renders** (every
node and link is a component you control).

- ⚛️ **Nodes are just React components** — render avatars, cards, badges, anything.
- 🖱️ **Drag, zoom & pan built in** — no event wiring, touch supported.
- 🧲 **Tunable physics** — link, charge and gravity forces as simple props.
- 🌊 **Ambient motion** — keep the graph gently floating with one prop.
- 🛠️ **Escape hatch to raw D3** — grab the simulation via `onSimulationCreated`.
- 🦺 **TypeScript-first** — generic over your node and link data.

## Installation

```bash
npm install d3-graph-react
```

All D3 dependencies are bundled. Requires `react` and `react-dom` ^18.2.

## Quick start

```tsx
import { Graph } from "d3-graph-react";

const team = {
  nodes: [
    { id: 1, name: "Ava" },
    { id: 2, name: "Liam" },
    { id: 3, name: "Mia" },
  ],
  links: [
    { source: 0, target: 1 }, // indices into the nodes array, not ids
    { source: 0, target: 2 },
  ],
};

export const TeamGraph = () => (
  <div style={{ height: 500, display: "flex" }}>
    <Graph
      graph={team}
      chargeForce={{ strength: -250 }}
      linkForce={{ length: 130, strength: 1 }}
      gravityForce={{ strength: 0.06, center_x: 250, center_y: 250 }}
      NodeComponent={({ node }) => <strong>{node.name}</strong>}
    />
  </div>
);
```

> [!TIP]
> Forces are opt-in: a force is only added to the simulation when you pass its prop. Starting
> with the charge + link + gravity trio above gives a good layout for almost any graph.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `graph` | `{ nodes, links }` | **required** | Graph data. Links reference nodes **by array index**. |
| `NodeComponent` | `FC<{ node }>` | built-in box | Custom node renderer — receives your node data, fully typed. |
| `LinkComponent` | `FC<{ link, sourceNode, targetNode, … }>` | built-in line | Custom link renderer with both endpoints' positions and DOM refs. |
| `zoomScale` | `[number, number]` | `[0.5, 8]` | Min/max zoom factor. |
| `onZoom` | `(event) => void` | — | Called on every zoom/pan gesture with the d3 zoom event. |
| `linkForce` | `{ strength, length }` | off | Spring force pulling linked nodes to a target distance. |
| `gravityForce` | `{ strength, center_x, center_y }` | off | Pulls the graph toward a center point. |
| `chargeForce` | `{ strength }` | off | Node repulsion (negative) or attraction (positive). |
| `isNodeDraggable` | `boolean` | `true` | Enables drag-and-drop on nodes. |
| `ambientAlphaTarget` | `number` | `0` | Keeps the simulation gently floating instead of settling (`0.02–0.1` works well; costs permanent CPU). |
| `onSimulationCreated` | `(simulation) => void` | — | Called once per simulation instance with the raw d3-force simulation. |
| `containerId` / `containerClassName` / `svgClassName` | `string` | — | Styling hooks for the container div and svg. |

The simulation settles to rest after animating and automatically reheats when you drag a node
or change a force prop.

Full reference with live, interactive examples for every prop:
**[API documentation](https://somebodyawesome-dev.github.io/d3-graph-react/docs/Props/overview)**

## License

MIT © [somebodyawesome-dev](https://github.com/somebodyawesome-dev)
