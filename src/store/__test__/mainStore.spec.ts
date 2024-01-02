import { describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMainStore } from '/src/store';

// https://pinia.vuejs.org/cookbook/testing.html
describe('store-tests', () => {
  describe('store 單元測試', () => {
    it('呼叫 increment，數量為2', () => {
      setActivePinia(createPinia());

      const store = useMainStore();
      store.$patch({ count: 1 });
      store.increment();

      const actual = store.count;
      const expected = 2;

      expect(actual).toBe(expected);
    });
  });
});
