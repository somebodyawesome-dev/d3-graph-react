import { forwardRef, ReactNode } from 'react';
import { Node, NodeComponentType, NodeType } from '../Graph';

export const NodeRenderer = <N extends Node>({
  nodes,
  simNodes,
  nodeRefs,
  NodeComponent,
}: {
  nodes: N[];
  simNodes: NodeType[];
  nodeRefs: React.RefObject<HTMLDivElement>[];
  NodeComponent?: NodeComponentType<N>;
}) => (
  <>
    {simNodes.map((val, index) => {
      const node = nodes[val.index];
      return (
        <ForignObjectWrapper key={`node-${index}`} ref={nodeRefs[index]} node={val}>
          {NodeComponent && <NodeComponent node={node} />}
        </ForignObjectWrapper>
      );
    })}
  </>
);
const ForignObjectWrapper = forwardRef<HTMLDivElement, { children?: ReactNode; node: NodeType }>(
  ({ children, node: { x, y } }, ref) => {
    return (
      <g
        className="node"
        // cx={85} cy={32}
        transform={`translate(${x},${y})`}
      >
        <foreignObject x="0" y="0" className="w-fit h-fit overflow-visible">
          <div className="w-min flex" ref={ref}>
            {children ?? <DefaultNodeComponent name="Node" />}
          </div>
        </foreignObject>
      </g>
    );
  },
);
const DefaultNodeComponent = (params: { name: string }) => {
  const { name } = params;
  return (
    <div className="bg-white border-4 whitespace-  border-solid border-gray-300 rounded-xl px-2 min-w-[100px] min-h-[50px] flex justify-center items-center">
      <h1 className=" font-bold text-gray-600 text-sm text-center">{name}</h1>
    </div>
  );
};
