import { select as d3Select } from 'd3-selection';
import { D3ZoomEvent, zoom as d3Zoom, zoomTransform } from 'd3-zoom';
import { useEffect } from 'react';

export function useZoom(zoomScale: [number, number], onZoom?: (event: D3ZoomEvent<SVGElement, unknown>) => void) {
  useEffect(() => {
    const selector = d3Select('#container').select<SVGElement>('svg');
    const zoomObject = d3Zoom<SVGElement, unknown>().scaleExtent(zoomScale);
    const elementsHolder = selector.select<SVGGraphicsElement>('g');

    const onZoomEvent = (d3Event: D3ZoomEvent<SVGElement, unknown>) => {
      const transform = d3Event.transform;
      elementsHolder.attr('transform', transform.toString());
      onZoom?.(d3Event);
    };

    const initZoomConfig = () => {
      let currentTransform = zoomTransform(elementsHolder.node()!);
      if (currentTransform.k < zoomScale[0]) {
        currentTransform = currentTransform.scale(zoomScale[0] / currentTransform.k);
        elementsHolder.attr('transform', currentTransform.toString());
      }
      if (currentTransform.k > zoomScale[1]) {
        currentTransform = currentTransform.scale(zoomScale[1] / currentTransform.k);
        elementsHolder.attr('transform', currentTransform.toString());
      }

      zoomObject.on('zoom', onZoomEvent);
      zoomObject.transform(selector, currentTransform);
      selector.call(zoomObject).on('dblclick.zoom', null);
    };

    initZoomConfig();

    return () => {
      selector.on('.zoom', null);
      zoomObject.on('zoom', null);
    };
  }, [zoomScale, onZoom]);
}
