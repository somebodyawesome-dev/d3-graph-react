import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { NodeType } from '../Graph';
import { SelectorsProvider } from '../hooks/useSelectorProvider';
import { useSimulation } from '../hooks/useSimulation';
import { createSimCapture, sampleGraph, Sim } from './testUtils';

type HookProps = {
  graph: { nodes: { id: string }[]; links: { source: number; target: number }[] };
  linkForce?: { strength: number; length: number };
  gravityForce?: { strength: number; center_x: number; center_y: number };
  chargeForce?: { strength: number };
  isNodeDraggable?: boolean;
  ambientAlphaTarget?: number;
  onSimulationCreated?: (sim: Sim) => void;
};

const wrapper = ({ children }: { children: ReactNode }) => <SelectorsProvider>{children}</SelectorsProvider>;

const renderSimulation = (initialProps: HookProps) =>
  renderHook((props: HookProps) => useSimulation(props), { wrapper, initialProps });

describe('useSimulation()', () => {
  it('creates a simulation, reports it via onSimulationCreated and preserves user node ids', () => {
    const cap = createSimCapture();
    const { result } = renderSimulation({ graph: sampleGraph(), onSimulationCreated: cap.captureAndStop });

    expect(cap.sims).toHaveLength(1);
    expect(result.current.simulation).toBe(cap.current);
    expect(result.current.simulationNodes.map((n) => n.id)).toEqual(['alpha', 'beta', 'gamma']);
  });

  it('resolves link endpoints to node objects even without a link force', () => {
    const cap = createSimCapture();
    const { result } = renderSimulation({ graph: sampleGraph(), onSimulationCreated: cap.captureAndStop });

    const [first, second] = result.current.simulationLinks;
    expect((first.source as NodeType).id).toBe('alpha');
    expect((first.target as NodeType).id).toBe('beta');
    expect((second.source as NodeType).id).toBe('beta');
    expect((second.target as NodeType).id).toBe('gamma');
  });

  it('does not recreate the simulation for a content-equal graph with a new identity', () => {
    const cap = createSimCapture();
    const { rerender } = renderSimulation({ graph: sampleGraph(), onSimulationCreated: cap.captureAndStop });

    rerender({ graph: sampleGraph(), onSimulationCreated: cap.captureAndStop });
    expect(cap.sims).toHaveLength(1);
  });

  it('stops the previous simulation when the graph changes', () => {
    const cap = createSimCapture();
    const { rerender } = renderSimulation({ graph: sampleGraph(), onSimulationCreated: cap.captureAndStop });

    const firstSim = cap.current;
    const stopSpy = jest.spyOn(firstSim, 'stop');
    rerender({
      graph: { nodes: [{ id: 'x' }, { id: 'y' }], links: [{ source: 0, target: 1 }] },
      onSimulationCreated: cap.captureAndStop,
    });

    expect(cap.sims).toHaveLength(2);
    expect(stopSpy).toHaveBeenCalled();
    expect(firstSim.on('tick')).toBeUndefined();
  });

  it('stops the simulation on unmount', () => {
    const cap = createSimCapture();
    const { unmount } = renderSimulation({ graph: sampleGraph(), onSimulationCreated: cap.captureAndStop });

    const stopSpy = jest.spyOn(cap.current, 'stop');
    unmount();
    expect(stopSpy).toHaveBeenCalled();
    expect(cap.current.on('tick')).toBeUndefined();
  });

  it('does not reheat when force props keep equal values but change identity', () => {
    const cap = createSimCapture();
    const graph = sampleGraph();
    const { rerender } = renderSimulation({
      graph,
      chargeForce: { strength: -10 },
      gravityForce: { strength: 0.05, center_x: 100, center_y: 100 },
      linkForce: { strength: 1, length: 200 },
      onSimulationCreated: cap.captureAndStop,
    });

    const sim = cap.current;
    act(() => {
      sim.stop();
      sim.alpha(0.12);
    });

    // fresh inline objects, same values — the classic consumer pattern
    rerender({
      graph,
      chargeForce: { strength: -10 },
      gravityForce: { strength: 0.05, center_x: 100, center_y: 100 },
      linkForce: { strength: 1, length: 200 },
      onSimulationCreated: cap.captureAndStop,
    });

    expect(sim.alpha()).toBeCloseTo(0.12);
    act(() => sim.stop());
  });

  it('reheats with alpha(1) and no lingering alphaTarget when a force value changes', () => {
    const cap = createSimCapture();
    const graph = sampleGraph();
    const { rerender } = renderSimulation({
      graph,
      chargeForce: { strength: -10 },
      onSimulationCreated: cap.captureAndStop,
    });

    const sim = cap.current;
    act(() => {
      sim.stop();
      sim.alpha(0.05);
    });

    rerender({ graph, chargeForce: { strength: -50 }, onSimulationCreated: cap.captureAndStop });

    expect(sim.alpha()).toBe(1);
    // the leak that froze physics after the first drag: alphaTarget must stay 0
    expect(sim.alphaTarget()).toBe(0);
    act(() => sim.stop());
  });

  it('removes a force when its prop is removed', () => {
    const cap = createSimCapture();
    const graph = sampleGraph();
    const { rerender } = renderSimulation({
      graph,
      chargeForce: { strength: -10 },
      onSimulationCreated: cap.captureAndStop,
    });

    const sim = cap.current;
    expect(sim.force('charge')).toBeDefined();
    rerender({ graph, onSimulationCreated: cap.captureAndStop });
    expect(sim.force('charge')).toBeUndefined();
    act(() => sim.stop());
  });

  it('applies ambientAlphaTarget so the simulation keeps floating', () => {
    const cap = createSimCapture();
    renderSimulation({ graph: sampleGraph(), ambientAlphaTarget: 0.15, onSimulationCreated: cap.capture });

    const sim = cap.current;
    expect(sim.alphaTarget()).toBeCloseTo(0.15);
    act(() => sim.stop());
  });
});
