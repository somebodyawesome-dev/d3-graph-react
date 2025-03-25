import { constantHash } from '../hash';

describe('constantHash()', () => {
  it('should hash primitive values correctly', () => {
    expect(constantHash(42)).toBe('42');
    expect(constantHash('hello')).toBe('"hello"');
    expect(constantHash(null)).toBe('null');
    expect(constantHash(undefined)).toBe('undefined');
    expect(constantHash(true)).toBe('true');
  });

  it('should handle Date objects', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    expect(constantHash(date)).toBe(date.toJSON());
  });

  it('should handle arrays', () => {
    expect(constantHash([1, 2, 3])).toBe('@1,2,3,');
  });
  

  it('should hash objects with sorted keys', () => {
    const a = { b: 2, a: 1 };
    const b = { a: 1, b: 2 };
    expect(constantHash(a)).toBe(constantHash(b)); 
  });

  it('should generate stable hashes for the same object reference', () => {
    const obj = { foo: 'bar' };
    const hash1 = constantHash(obj);
    const hash2 = constantHash(obj);
    expect(hash1).toBe(hash2);
  });

  it('should handle nested structures', () => {
    const nested = { a: [1, { b: 'x' }] };
    const hash = constantHash(nested);
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });

  it('should return consistent result for repeated identical structures', () => {
    const obj1 = { x: { y: 1 } };
    const obj2 = { x: { y: 1 } };
    expect(constantHash(obj1)).toBe(constantHash(obj2));
  });
});
