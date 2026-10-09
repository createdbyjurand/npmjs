import {afterEach, describe, expect, it, vi} from 'vitest';
import {generateCloaks} from './generate-cloaks.ts';

afterEach(() => vi.restoreAllMocks());

describe('generateCloaks', () => {
  it('returns ten cloaks by default', () => {
    const cloaks = generateCloaks();
    expect(cloaks).toHaveLength(10);
    for (const cloak of cloaks) expect(cloak).toHaveLength(9);
  });

  it('returns the requested number of cloaks with custom settings', () => {
    const cloaks = generateCloaks(20, 18, 18, 3, 12);
    expect(cloaks).toHaveLength(20);
    for (const cloak of cloaks) expect(cloak).toHaveLength(18);
  });

  it('returns short cloaks without filtering for four or five hyphens', () => {
    expect(generateCloaks(1, 3, 3, 1, 1)).toEqual([expect.stringMatching(/^[a-z0-9]-[a-z0-9]$/)]);
  });

  it('returns an empty array for zero, without generating cloaks', () => {
    expect(generateCloaks(0)).toEqual([]);
  });

  it('accepts the maximum count', () => {
    expect(generateCloaks(1000, 3, 3)).toHaveLength(1000);
  });

  it.each([-1, 1.5, NaN, Infinity, 1001])('rejects invalid count %s', count => {
    expect(() => generateCloaks(count)).toThrow(RangeError);
  });

  it('rejects invalid cloak settings', () => {
    expect(() => generateCloaks(1, 4, 4, 1, 1)).toThrow(RangeError);
  });

  it('imports and generates without printing, and shares the implementation with the Ai aliases', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.resetModules();
    const api = await import('./index.ts');
    expect(api.generateCloakAi).toBe(api.generateCloak);
    expect(api.generateCloaksAi).toBe(api.generateCloaks);
    api.generateCloaks();
    expect(log).not.toHaveBeenCalled();
  });
});
