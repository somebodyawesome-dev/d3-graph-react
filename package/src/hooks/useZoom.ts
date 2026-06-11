import { D3ZoomEvent, zoom as d3Zoom, zoomTransform } from 'd3-zoom';
import { useEffect, useRef } from 'react';
import { useSelectorsContext } from './useSelectorProvider';

export function useZoom(zoomScale: [number, number], onZoom?: (event: D3ZoomEvent<SVGElement, unknown>) => void) {
  const { svgSelector, gSelector } = useSelectorsContext();

  // keep the callback in a ref so an inline onZoom prop doesn't re-init the
  // zoom behavior (re-initializing mid-gesture breaks panning)
  const onZoomRef = useRef(onZoom);
  onZoomRef.current = onZoom;

  // primitive deps for the same reason: consumers pass zoomScale inline
  const [minScale, maxScale] = zoomScale;

  useEffect(() => {
    const selection = svgSelector();
    const svgNode = selection.node();
    if (!svgNode) return;

    const zoomBehavior = d3Zoom<SVGElement, unknown>()
      .scaleExtent([minScale, maxScale])
      .on('zoom', (d3Event: D3ZoomEvent<SVGElement, unknown>) => {
        gSelector().attr('transform', d3Event.transform.toString());
        onZoomRef.current?.(d3Event);
      });

    // .call() preserves any transform already stored on the svg node
    selection.call(zoomBehavior).on('dblclick.zoom', null);

    const currentTransform = zoomTransform(svgNode);
    if (currentTransform.k < minScale || currentTransform.k > maxScale) {
      // the new extent excludes the current scale: clamp it
      zoomBehavior.scaleTo(selection, Math.max(minScale, Math.min(maxScale, currentTransform.k)));
    }
    // re-sync the g element without resetting zoom state. The clamp above
    // can't rely on its own zoom event: a still-active gesture (e.g. a wheel
    // zoom within the last 150ms) dispatches to the previous, detached
    // listener set, updating __zoom but never reaching our handler.
    const syncedTransform = zoomTransform(svgNode);
    if (syncedTransform.k !== 1 || syncedTransform.x !== 0 || syncedTransform.y !== 0) {
      gSelector().attr('transform', syncedTransform.toString());
    }

    return () => {
      selection.on('.zoom', null);
      zoomBehavior.on('zoom', null);
    };
  }, [minScale, maxScale, svgSelector, gSelector]);
}
