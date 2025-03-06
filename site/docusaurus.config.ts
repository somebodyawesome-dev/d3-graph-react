module.exports = {
  title: "D3 JS",
  tagline: "Facilitating the use of D3-force with React and TypeScript",
  url: "https://your-site.com",
  baseUrl: "/d3-graph-react/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/node.png",
  organizationName: "somebodyawesome-dev",
  projectName: "d3-graph-react",
  headTags: [
    {
      tagName: "link",
      attributes: {
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap",
        rel: "stylesheet",
      },
    },
  ],
  stylesheets: [
    {
      href: "/css/tailwind.css",
      type: "text/css",
    },
  ],
  scripts: [],

  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      style: "dark",
      title: "D3-GRAPH-REACT",
      logo: {
        alt: "d3-graph-react Logo",
        src: "img/nodes.png",
      },
      items: [
        {
          to: "docs/Introduction",
          activeBasePath: "docs",
          label: "DOCUMENTS",
          position: "left",
        },
        {
          to: "docs/Playground",
          label: "PLAYGROUND",
          position: "left",
        },
        
        {
          href: "https://www.npmjs.com/package/d3-graph-react",
          label: "FOLLOW US",
          position: "right",
          className: "navbar__link--external",
        },
        
        
        {
          href: "https://github.com/somebodyawesome-dev/d3-graph-react",
          label: "GITHUB",
          position: "right",
        },
      ],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          breadcrumbs: false, 
          editUrl:
            "https://github.com/somebodyawesome-dev/d3-graph-react/tree/main/site/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
