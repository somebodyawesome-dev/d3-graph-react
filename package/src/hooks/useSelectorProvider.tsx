import { Selection } from 'd3-selection';
import { createContext, FC, ReactNode, RefObject, useContext, useId, useMemo, useRef } from 'react';

import { select as d3Select } from 'd3-selection';

export type ISelectorsContext = {
  containerRef: RefObject<HTMLDivElement>;
  markerId: string;
  containerSelector: () => Selection<HTMLDivElement | null, unknown, null, undefined>;
  svgSelector: () => Selection<SVGElement, unknown, null, undefined>;
  gSelector: () => Selection<SVGGraphicsElement, unknown, null, undefined>;
};

export const SelectorsContext = createContext<ISelectorsContext | null>(null);
export const useSelectorsContext = () => {
  const value = useContext(SelectorsContext);
  if (!value) {
    throw new Error('SelectorsContext used outside of selector provider');
  }
  return value;
};

// selections are derived from a ref instead of a document-wide id lookup so
// multiple Graph instances on the same page don't grab each other's DOM
export const SelectorsProvider: FC<{ children: ReactNode; containerId?: string }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const markerId = 'arrowhead-' + useId().replace(/:/g, '');
  const value = useMemo<ISelectorsContext>(() => {
    const containerSelector = () => d3Select(containerRef.current);
    const svgSelector = () => containerSelector().select<SVGElement>('svg');
    const gSelector = () => svgSelector().select<SVGGraphicsElement>('g');
    return { containerRef, markerId, containerSelector, svgSelector, gSelector };
  }, [markerId]);

  return <SelectorsContext.Provider value={value}>{children}</SelectorsContext.Provider>;
};
