import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMainStore } from '/src/store';

import PiniaComponent from '/src/components/pinia-component.vue';

// 元件測試
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

// https://pinia.vuejs.org/cookbook/testing.html
describe('mainStore | Testing stores ', () => {
  it('呼叫 increment 函式，數量為2', () => {
    setActivePinia(createPinia());

    const store = useMainStore();
    store.$patch({ count: 1 });
    store.increment();

    const actual = store.count;
    const expected = 2;

    expect(actual).toBe(expected);
  });

  it('元件測試', () => {
    const options = {
      createSpy: vi.fn(), // global 是 true 時，需要提供 createSpy 來避免錯誤
      initialState: {
        mainStore: {
          count: 1,
        },
      },
    };
    const wrapper = mount(PiniaComponent, {
      global: {
        plugins: [createTestingPinia(options)],
      },
    });
    expect(wrapper.html()).toContain('1');
  });
});
