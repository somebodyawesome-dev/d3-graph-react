# d3-graph-react

## 1.3.0

### Minor Changes

- Fix simulation and interaction bugs, add `ambientAlphaTarget` / `onSimulationCreated` props

  - **Behavior change:** the graph now settles to rest like a standard d3 force simulation instead of floating forever. The old perpetual motion was a side-effect of an `alphaTarget` leak that also froze all physics after the first drag. To keep a gentle perpetual float, pass the new `ambientAlphaTarget` prop (e.g. `0.05`).
  - Drag, zoom and force updates now reheat and cool the simulation correctly; physics keeps working after interacting with the canvas.
  - Pan/zoom no longer breaks or resets when force/zoom props are passed as inline objects (the common consumer pattern).
  - Simulations are properly stopped on unmount and when the graph changes (no more leaked tickers).
  - Default links now render: endpoints are resolved without requiring `linkForce`, and a broken `isEmpty` check that always hid the default link component was removed (dropping the `lodash-es` dependency).
  - Multiple `<Graph>` instances on one page no longer interfere with each other: DOM selections are ref-scoped instead of document-wide id lookups, and arrowhead marker ids are namespaced per instance.
  - Simulation nodes now preserve the user-provided node `id` (previously replaced by the array index).
  - In-place mutations of the `graph` prop are now detected and re-initialize the simulation.
  - New `onSimulationCreated` prop exposes the underlying d3 simulation for imperative control.

## 1.2.0

### Minor Changes

- added new props to graph component
- added support for touche events

## 1.1.3

### Minor Changes

- added new props to graph component

## 1.1.2

### Minor Changes

- introduced onZoom prop and updateed README file
- added keywords to package.json
- refactor Graph component into smaller more organized components
