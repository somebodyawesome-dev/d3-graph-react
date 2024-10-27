import { ReactNode } from 'react';
import { DEFAULT_LINK_LENGTH } from '../Graph';
export const GraphContainer = ({
  children,
  containerClassName,
  containerId,
  svgClassName,
}: {
  children: ReactNode;
  containerId?: string;
  containerClassName?: string;
  svgClassName?: string;
}) => (
  <div id={containerId || 'container'} className={containerClassName || 'w-full flex'}>
    <svg className={svgClassName || 'w-full min-h-full'}>
      <defs>
        <marker
          id="arrowhead"
          viewBox="-0 -5 10 10"
          refX={DEFAULT_LINK_LENGTH / 2 - 15}
          refY={0}
          orient="auto"
          markerWidth={13}
          markerHeight={13}
        >
          <path fill="#999" stroke="none" d="M 0,-5 L 10 ,0 L 0,5"></path>
        </marker>
      </defs>
      <g>{children}</g>
    </svg>
  </div>
);
