import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'Introduction', 
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'Installation', 
      label: 'Installation',
    },
    {
      type: 'category',
      label: 'Props',
      items: [
        { type: 'doc', id: 'Props/graph', label: 'Graph' },
        { type: 'doc', id: 'Props/NodeComponent', label: 'NodeComponent' },
        { type: 'doc', id: 'Props/LinkComponent', label: 'LinkComponent' },
        { type: 'doc', id: 'Props/zoomScale', label: 'ZoomScale' },
        { type: 'doc', id: 'Props/linkForce', label: 'LinkForce' },
        { type: 'doc', id: 'Props/gravityForce', label: 'GravityForce' },
        { type: 'doc', id: 'Props/chargeForce', label: 'ChargeForce' }, 
      
      ],
    },
  ],
};

export default sidebars;
