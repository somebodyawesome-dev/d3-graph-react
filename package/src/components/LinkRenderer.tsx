import { SimulationLinkDatum } from 'd3-force';
import { Link, LinkComponentType, NodeType } from '../Graph';

export const LinkRenderer = <L extends Link>({
  simLinks,
  links,
  nodeRefs,
  LinkComponent,
}: {
  simLinks: SimulationLinkDatum<NodeType>[];
  links: L[];
  nodeRefs: React.RefObject<HTMLDivElement>[];
  LinkComponent?: LinkComponentType<L>;
}) => (
  <>
    {simLinks.map((val, index) => {
      const link = links[index];
      // endpoints stay raw indices when they reference a missing node
      if (typeof val.source !== 'object' || typeof val.target !== 'object') return null;
      const sourceNode = val.source;
      const targetNode = val.target;
      const sourceNodeRef = nodeRefs[sourceNode.index];
      const targetNodeRef = nodeRefs[targetNode.index];

      if (!sourceNodeRef || !targetNodeRef) return null;

      return LinkComponent ? (
        <LinkComponent
          link={link}
          key={`link-${index}`}
          sourceNode={sourceNode}
          sourceNodeRef={sourceNodeRef}
          targetNode={targetNode}
          targetNodeRef={targetNodeRef}
        />
      ) : (
        <DefaultLinkComponent
          key={`links-${index}`}
          link={link}
          sourceNode={sourceNode}
          sourceNodeRef={sourceNodeRef}
          targetNode={targetNode}
          targetNodeRef={targetNodeRef}
        />
      );
    })}
  </>
);
export const DefaultLinkComponent: LinkComponentType<any> = ({
  sourceNode,
  sourceNodeRef,
  targetNode,
  targetNodeRef,
}) => {
  if (!sourceNode || !targetNode || !sourceNodeRef.current || !targetNodeRef.current) return null;
  const { offsetWidth: sourceOffsetWidth, offsetHeight: sourceOffsetHeight } = sourceNodeRef.current;
  const { offsetWidth: targetOffsetWidth, offsetHeight: targetOffsetHeight } = targetNodeRef.current;
  return (
    <path
      className="link"
      fill="none"
      markerEnd="url(#arrowhead)"
      d={`M ${sourceNode.x + sourceOffsetWidth / 2},${sourceNode.y + sourceOffsetHeight / 2} L ${
        targetNode.x + targetOffsetWidth / 2
      } ${targetNode.y + targetOffsetHeight / 2}`}
      stroke={'gray'}
      strokeWidth={1}
    ></path>
  );
};
