module.exports = {
  title: "D3 JS",
  tagline: "Facilitating the use of D3-force with React and TypeScript",
  url: "https://your-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/node.png",
  organizationName: "somebodyawesome-dev", // Usually your GitHub org/user name.
  projectName: "d3-graph-react", // Usually your repo name.
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
  scripts: [
    // Add your custom JavaScript file path relative to the `static` directory
    "./src/lib/custom.js",
  ],

  themeConfig: {
    colorMode: {
      disableSwitch: true, // This disables the theme toggle button
    },
    navbar: {
      style: "dark",
      title: "d3-graph-react",
      logo: {
        alt: "d3-graph-react Logo",
        src: "img/nodes.png",
      },
      items: [
        {
          to: "docs/Introduction",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
       
        {
          href: "https://github.com/somebodyawesome-dev/d3-graph-react",
          label: "GitHub",
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
