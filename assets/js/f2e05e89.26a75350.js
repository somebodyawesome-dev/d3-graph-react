"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[247],{6817:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>p,contentTitle:()=>l,default:()=>u,frontMatter:()=>d,metadata:()=>h,toc:()=>g});var t=s(2540),a=s(3023),c=s(3696),n=s(5607);const o=()=>{const[e,r]=(0,c.useState)(-30);return(0,t.jsxs)("div",{className:"flex flex-col md:flex-row border w-full",children:[(0,t.jsxs)("div",{id:"panel",className:"w-full md:w-1/2 flex flex-col border-r px-4 py-4",children:[(0,t.jsx)("h2",{children:"\ud83c\udfae Playground"}),(0,t.jsxs)("div",{className:"mb-4",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Charge Force"}),(0,t.jsx)("p",{children:"Charge Force:"}),(0,t.jsx)("input",{type:"number",step:"5",min:"-100",max:"100",value:e,onChange:e=>r(parseFloat(e.target.value)),className:"input w-full input-bordered"}),(0,t.jsx)("p",{className:"mt-2 text-sm",children:"A negative value repels the nodes. A positive value attracts them."})]})]}),(0,t.jsx)("div",{id:"nodes",className:"w-full h-[50dvh] md:h-[80dvh] flex",children:(0,t.jsx)(n.T,{containerId:"container-custom-id",graph:{nodes:[{id:1,name:"Node 1"},{id:2,name:"Node 2"},{id:3,name:"Node 3"},{id:4,name:"Node 4"}],links:[{source:0,target:1},{source:1,target:2},{source:1,target:3}]},chargeForce:{strength:e},zoomScale:[.5,8],linkForce:{length:200,strength:1},gravityForce:{center_x:200,center_y:200,strength:.05},NodeComponent:e=>{let{node:{name:r}}=e;return(0,t.jsx)("div",{className:"bg-gray-400 p-2 rounded border border-white break-normal text-nowrap",children:r})}})})]})},i=()=>(0,t.jsx)("div",{className:"graph-page",children:(0,t.jsxs)("div",{className:"intro-wrapper",children:[(0,t.jsxs)("section",{className:"intro-section",children:[(0,t.jsx)("h1",{children:"\u26a1 ChargeForce"}),(0,t.jsxs)("p",{children:[(0,t.jsx)("code",{children:"chargeForce"})," allows configuring the charge force. A negative value **repels** the nodes, while a positive value **attracts** them."]}),(0,t.jsx)("br",{}),(0,t.jsx)("h2",{children:"\ud83d\udccc Example Usage"}),(0,t.jsx)("pre",{children:(0,t.jsx)("code",{children:"const graphData = {\n  nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],\n  links: [{ source: 0, target: 1 }, { source: 1, target: 2 }],\n};\n\nconst MyGraph = () => (\n  <Graph graph={graphData} chargeForce={{ strength: -30 }} />\n);"})})]}),(0,t.jsx)(o,{})]})}),d={},l=void 0,h={id:"Props/chargeForce",title:"chargeForce",description:"",source:"@site/docs/Props/chargeForce.mdx",sourceDirName:"Props",slug:"/Props/chargeForce",permalink:"/d3-graph-react/docs/Props/chargeForce",draft:!1,unlisted:!1,editUrl:"https://github.com/somebodyawesome-dev/d3-graph-react/tree/main/site/docs/Props/chargeForce.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"GravityForce",permalink:"/d3-graph-react/docs/Props/gravityForce"}},p={},g=[];function m(e){return(0,t.jsx)(i,{})}function u(e={}){const{wrapper:r}={...(0,a.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(m,{...e})}):m()}}}]);