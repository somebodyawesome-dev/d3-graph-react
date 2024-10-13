import { ReactNode } from 'react';
import { DEFAULT_LINK_LENGTH } from '../Graph';
export const GraphContainer = ({ children }: { children: ReactNode }) => (
  <div id="container" className="w-full flex">
    <svg className="w-full min-h-full">
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
