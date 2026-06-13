import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "d3-graph-react",
  tagline: "Beautiful force-directed graphs for React, powered by D3",
  url: "https://somebodyawesome-dev.github.io",
  baseUrl: "/d3-graph-react/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "somebodyawesome-dev",
  projectName: "d3-graph-react",
  trailingSlash: false,

  headTags: [
    {
      tagName: "link",
      attributes: { rel: "preconnect", href: "https://fonts.googleapis.com" },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    },
  ],

  markdown: {
    mermaid: false,
  },

  themeConfig: {
    image: "img/social-card.png",
    metadata: [
      {
        name: "keywords",
        content:
          "react, d3, d3-force, graph, network, visualization, force-directed, typescript",
      },
      { name: "theme-color", content: "#0a0c12" },
    ],
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      style: "dark",
      title: "d3-graph-react",
      hideOnScroll: false,
      logo: {
        alt: "d3-graph-react logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/Introduction",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/Playground",
          label: "Playground",
          position: "left",
        },
        {
          href: "https://www.npmjs.com/package/d3-graph-react",
          label: "npm",
          position: "right",
          className: "navbar__link--npm navbar__link--external",
        },
        {
          href: "https://github.com/somebodyawesome-dev/d3-graph-react",
          label: "GitHub",
          position: "right",
          className: "navbar__link--github",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "Introduction", to: "docs/Introduction" },
            { label: "Installation", to: "docs/Installation" },
            { label: "Quick Start", to: "docs/QuickStart" },
            { label: "API Reference", to: "docs/Props/overview" },
          ],
        },
        {
          title: "Explore",
          items: [
            { label: "Playground", to: "docs/Playground" },
            {
              label: "Changelog",
              href: "https://github.com/somebodyawesome-dev/d3-graph-react/releases",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/somebodyawesome-dev/d3-graph-react",
            },
            {
              label: "npm",
              href: "https://www.npmjs.com/package/d3-graph-react",
            },
            {
              label: "Report an issue",
              href: "https://github.com/somebodyawesome-dev/d3-graph-react/issues",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} somebodyawesome-dev — released under the MIT License.`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ["bash", "json"],
    },
  } satisfies Preset.ThemeConfig,

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],
};

export default config;
