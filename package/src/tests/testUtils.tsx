import { act } from '@testing-library/react';
import { Simulation, SimulationLinkDatum } from 'd3-force';
import { NodeType } from '../Graph';

export type Sim = Simulation<NodeType, SimulationLinkDatum<NodeType>>;

export const sampleGraph = () => ({
  nodes: [{ id: 'alpha' }, { id: 'beta' }, { id: 'gamma' }],
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
  ],
});

// captures simulations handed out through the onSimulationCreated prop so
// tests can drive/stop them deterministically
export function createSimCapture() {
  const sims: Sim[] = [];
  return {
    sims,
    get current(): Sim {
      return sims[sims.length - 1];
    },
    capture: (sim: Sim) => {
      sims.push(sim);
    },
    captureAndStop: (sim: Sim) => {
      sims.push(sim);
      sim.stop();
    },
  };
}

// advances the simulation synchronously: tick(n) computes physics without
// emitting events, then the registered tick listener flushes a React render
export function tickSim(sim: Sim, n = 30) {
  act(() => {
    sim.stop();
    sim.tick(n);
    const listener = sim.on('tick') as (() => void) | undefined;
    if (listener) listener();
  });
}
