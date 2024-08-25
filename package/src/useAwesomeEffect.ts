import { DependencyList, EffectCallback, useEffect } from 'react';
import { constantHash } from './hash';

export function useAwesomeEffect(effect: EffectCallback, deps?: DependencyList) {
  return useEffect(effect, [constantHash(deps)]);
}
