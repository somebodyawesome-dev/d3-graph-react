"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[284],{2530:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>m,frontMatter:()=>i,metadata:()=>h,toc:()=>p});var n=r(2540),s=r(3023),a=r(3696),o=r(5607);const d=()=>{const[e,t]=(0,a.useState)([.5,8]),[r,s]=(0,a.useState)({length:200,strength:1}),[d,l]=(0,a.useState)({center_x:200,center_y:200,strength:.05}),[i,c]=(0,a.useState)({strength:-10}),[h,u]=(0,a.useState)(!0);return(0,a.useEffect)((()=>{function e(){window.innerWidth<=640?l({center_x:150,center_y:150,strength:.05}):l({center_x:200,center_y:200,strength:.05})}return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]),(0,n.jsxs)("div",{className:"flex flex-col md:flex-row border w-full",children:[(0,n.jsxs)("div",{id:"panel",className:"w-full md:w-1/2 flex flex-col border-r px-4 py-2 md:py-4 md:px-6 overflow-auto",children:[(0,n.jsx)("h2",{children:"\ud83c\udfae Playground"}),(0,n.jsx)("div",{className:"mb-4",children:(0,n.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Node"})}),(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Zoom Scale"}),(0,n.jsx)("input",{type:"text",defaultValue:"0.5",className:"input w-full input-bordered",onChange:r=>{const n=parseFloat(r.target.value);isNaN(n)||t([n,e[1]])}}),(0,n.jsx)("input",{type:"text",defaultValue:"8",className:"input w-full input-bordered",onChange:r=>{const n=parseFloat(r.target.value);isNaN(n)||t([e[0],n])}})]}),(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Link Force"}),(0,n.jsx)("input",{type:"text",defaultValue:"200",className:"input w-full input-bordered",onChange:e=>{const t=parseFloat(e.target.value);isNaN(t)||s({...r,length:t})}}),(0,n.jsx)("input",{type:"text",defaultValue:"1",className:"input w-full input-bordered",onChange:e=>{const t=parseFloat(e.target.value);isNaN(t)||s({...r,strength:t})}})]})]}),(0,n.jsx)("div",{id:"nodes",className:"w-full h-[50dvh] md:w-full md:h-[80dvh] flex",children:(0,n.jsx)(o.T,{containerId:"container-custom-id",graph:{links:[{source:0,target:1},{source:1,target:2},{source:1,target:3}],nodes:[{id:1,name:"Node 1"},{id:2,name:"Node 2"},{id:3,name:"Node 3"},{id:4,name:"Node 4"}]},isNodeDraggable:h,linkForce:r,zoomScale:e,gravityForce:d,chargeForce:i,NodeComponent:e=>{let{node:{name:t}}=e;return(0,n.jsx)("div",{className:"bg-gray-400 p-2 rounded border border-white break-normal text-nowrap",children:t})},LinkComponent:e=>{let{sourceNode:t,sourceNodeRef:r,targetNode:s,targetNodeRef:a}=e;if(!(t&&s&&r?.current&&a?.current))return null;const{offsetWidth:o,offsetHeight:d}=r.current,{offsetWidth:l,offsetHeight:i}=a.current;return(0,n.jsx)("path",{className:"link",fill:"none",markerEnd:"url(#arrowhead)",d:`M ${t.x+o/2},${t.y+d/2} \n                  L ${s.x+l/2} ${s.y+i/2}`,stroke:"gray",strokeWidth:1})}})})]})},l=()=>(0,n.jsxs)("div",{className:"graph-page",children:[" ",(0,n.jsxs)("div",{className:"intro-wrapper",children:[(0,n.jsxs)("section",{className:"intro-section",children:[(0,n.jsx)("h1",{children:"\ud83d\udcca Graph"}),(0,n.jsxs)("p",{children:[(0,n.jsx)("code",{children:"graph"})," Contains nodes and links arrays to represent the graph structure."]}),(0,n.jsx)("br",{}),(0,n.jsx)("h2",{children:"\ud83d\udccc Example Usage"}),(0,n.jsx)("pre",{children:(0,n.jsx)("code",{children:"const graphData = {\n  nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],\n  links: [\n    { source: 0, target: 1 },\n    { source: 1, target: 2 },\n  ],\n};\n\nconst MyGraph = () => (\n  <Graph\n    graph={graphData}\n    zoomScale={[0.5, 8]}\n    linkForce={{ strength: 1, length: 100 }}\n    gravityForce={{ strength: 0.1, center_x: 0, center_y: 0 }}\n    chargeForce={{ strength: -30 }}\n  />\n);"})})]}),(0,n.jsx)(d,{})]})]}),i={},c=void 0,h={id:"Props/graph",title:"graph",description:"",source:"@site/docs/Props/graph.mdx",sourceDirName:"Props",slug:"/Props/graph",permalink:"/d3-graph-react/docs/Props/graph",draft:!1,unlisted:!1,editUrl:"https://github.com/somebodyawesome-dev/d3-graph-react/tree/main/site/docs/Props/graph.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/d3-graph-react/docs/Installation"},next:{title:"NodeComponent",permalink:"/d3-graph-react/docs/Props/NodeComponent"}},u={},p=[];function g(e){return(0,n.jsx)(l,{})}function m(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(g,{...e})}):g()}}}]);