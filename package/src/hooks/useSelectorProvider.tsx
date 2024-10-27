import { BaseType, Selection } from 'd3-selection';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';

import { select as d3Select } from 'd3-selection';

export type ISelectorsContext = {
  containerSelector: () => Selection<BaseType, unknown, HTMLElement, any>;
  svgSelector: () => Selection<SVGElement, unknown, HTMLElement, any>;
  gSelector: () => Selection<SVGGraphicsElement, unknown, HTMLElement, any>;
};
const DEFAULT_CONTAINER_ID = 'container';

export const SelectorsContext = createContext<ISelectorsContext | null>(null);
export const useSelectorsContext = () => {
  const value = useContext(SelectorsContext);
  if (!value) {
    throw new Error('SelectorsContext used outside of selector provider');
  }
  return value;
};

export const SelectorsProvider: FC<{ children: ReactNode; containerId?: string }> = ({ children, containerId }) => {
  const containerSelector = useMemo(() => () => d3Select(`#${containerId || DEFAULT_CONTAINER_ID}`), [containerId]);
  const svgSelector = useMemo(() => () => containerSelector().select<SVGElement>('svg'), [containerSelector]);
  const gSelector = useMemo(() => () => svgSelector().select<SVGGraphicsElement>('g'), [svgSelector]);

  return (
    <SelectorsContext.Provider value={{ containerSelector, svgSelector, gSelector }}>
      {children}
    </SelectorsContext.Provider>
  );
};
