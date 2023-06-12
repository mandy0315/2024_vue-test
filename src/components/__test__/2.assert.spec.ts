import { describe, it, expect } from 'vitest';

describe('測試情境描述', () => {
  it('純值比對', () => {
    expect(1).toBe(1);
    expect(1).not.toBe(2); // .not 反向斷言
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(undefined).toBeUndefined(); // toBeDefined 不是 undefined
    expect(null).toBeNull();
    expect(NaN).toBeNaN();
    expect('我有顆蘋果').toMatch('蘋果');
    expect('我有顆蘋果').toBeTypeOf('string');
  });
  it('數字比對', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
    expect(2).toBeGreaterThan(1);
    expect(1).toBeGreaterThanOrEqual(1);
    expect(1).toBeLessThan(2);
    expect(1).toBeLessThanOrEqual(1);
  });
  it('陣列比對', () => {
    expect([1, 2, 3]).toContain(3);
    expect([{ food: 'apply' }, { food: 'peach' }]).toContainEqual({ food: 'apply' });
    expect([1, 2, 3]).toHaveLength(3);
  });
  it('物件比對', () => {
    expect({ food: 'apply' }).toEqual({ food: 'apply' });
    expect({ food: 'apply' }).toHaveProperty('food');
    expect({ food: 'apply' }).toHaveProperty('food', 'apply');
  });
});
