import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsible: false,
      items: [
        { type: "doc", id: "Introduction", label: "Introduction" },
        { type: "doc", id: "Installation", label: "Installation" },
        { type: "doc", id: "QuickStart", label: "Quick Start" },
      ],
    },
    {
      type: "category",
      label: "API Reference",
      collapsible: false,
      items: [
        { type: "doc", id: "Props/overview", label: "Overview" },
        { type: "doc", id: "Props/graph", label: "graph" },
        { type: "doc", id: "Props/NodeComponent", label: "NodeComponent" },
        { type: "doc", id: "Props/LinkComponent", label: "LinkComponent" },
        { type: "doc", id: "Props/zoomScale", label: "zoomScale" },
        { type: "doc", id: "Props/linkForce", label: "linkForce" },
        { type: "doc", id: "Props/gravityForce", label: "gravityForce" },
        { type: "doc", id: "Props/chargeForce", label: "chargeForce" },
        { type: "doc", id: "Props/ambientAlphaTarget", label: "ambientAlphaTarget" },
        { type: "doc", id: "Props/onSimulationCreated", label: "onSimulationCreated" },
      ],
    },
    {
      type: "category",
      label: "Explore",
      collapsible: false,
      items: [{ type: "doc", id: "Playground", label: "Playground" }],
    },
  ],
};

export default sidebars;
