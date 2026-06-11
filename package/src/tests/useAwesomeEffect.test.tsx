import { renderHook } from '@testing-library/react';
import { useAwesomeEffect } from '../useAwesomeEffect';

describe('useAwesomeEffect()', () => {
  it('runs the effect on mount', () => {
    const effect = jest.fn();
    renderHook(() => useAwesomeEffect(effect, [{ nodes: [1] }]));
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('does not re-run for value-equal deps with a new identity', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ deps }) => useAwesomeEffect(effect, deps), {
      initialProps: { deps: [{ nodes: [1, 2], links: [{ source: 0, target: 1 }] }] },
    });
    rerender({ deps: [{ nodes: [1, 2], links: [{ source: 0, target: 1 }] }] });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('re-runs when dep content changes', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ deps }) => useAwesomeEffect(effect, deps), {
      initialProps: { deps: [{ nodes: [1, 2] }] },
    });
    rerender({ deps: [{ nodes: [1, 2, 3] }] });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('re-runs when a dep object is mutated in place', () => {
    const effect = jest.fn();
    const graph = { nodes: [1, 2] };
    const { rerender } = renderHook(({ deps }) => useAwesomeEffect(effect, deps), {
      initialProps: { deps: [graph] },
    });
    graph.nodes.push(3);
    rerender({ deps: [graph] });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('runs the cleanup of the previous effect when deps change', () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { rerender, unmount } = renderHook(({ deps }) => useAwesomeEffect(effect, deps), {
      initialProps: { deps: [1] },
    });
    rerender({ deps: [2] });
    expect(cleanup).toHaveBeenCalledTimes(1);
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(2);
  });
});
