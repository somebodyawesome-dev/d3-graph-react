import '@testing-library/jest-dom';

// jsdom reports 0 for offsetWidth/offsetHeight; stub fixed dimensions so the
// link geometry (node centers) is non-degenerate and assertable.
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  get() {
    return 100;
  },
});
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  get() {
    return 50;
  },
});

// d3-zoom's defaultExtent reads svg.width.baseVal.value, which jsdom does
// not implement; without this stub every wheel/zoom gesture throws.
Object.defineProperty(SVGSVGElement.prototype, 'width', {
  configurable: true,
  get() {
    return { baseVal: { value: 800 } };
  },
});
Object.defineProperty(SVGSVGElement.prototype, 'height', {
  configurable: true,
  get() {
    return { baseVal: { value: 600 } };
  },
});

// NOTE: do NOT polyfill SVGSVGElement.createSVGPoint here. d3-selection's
// pointer() only takes the getScreenCTM code path when createSVGPoint exists;
// since jsdom implements neither, d3 falls back to getBoundingClientRect and
// drag/zoom coordinates equal client coordinates, which is what the
// interaction tests rely on. Adding createSVGPoint without getScreenCTM
// would crash every simulated drag/zoom gesture.
