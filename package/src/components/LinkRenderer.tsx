import { SimulationLinkDatum } from 'd3-force';
import { isEmpty } from 'lodash-es';
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
      const sourceNode = val.source as NodeType;
      const targetNode = val.target as NodeType;
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
  if (isEmpty(sourceNode) || isEmpty(targetNode) || isEmpty(sourceNodeRef.current) || isEmpty(targetNodeRef.current))
    return null;
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
      // strokeLinecap="butt"
      stroke={'gray'}
      strokeWidth={1}
    ></path>
  );
};
