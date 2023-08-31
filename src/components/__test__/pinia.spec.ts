import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMainStore } from '/src/store';

import PiniaComponent from '/src/components/pinia-component.vue';

// 元件測試
import { mount } from '@vue/test-utils';
import { createTestingPinia, TestingOptions } from '@pinia/testing';

// https://pinia.vuejs.org/cookbook/testing.html
describe('pinia stores testing', () => {
  describe('測試 store 函式', () => {
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

  describe('store 與 元件測試', () => {
    const factory = (
      options: TestingOptions = {
        createSpy: vi.fn(),
      },
    ) => {
      const wrapper = mount(PiniaComponent, {
        global: {
          plugins: [createTestingPinia(options)],
        },
      });

      const store = useMainStore();

      return {
        wrapper,
        store,
      };
    };
    it('initialState 狀態初始化', () => {
      /** 參數讓我們操作與改變 Store */
      const options = {
        createSpy: vi.fn(), // global 是 true 時，需要提供 createSpy 來避免錯誤
        initialState: {
          mainStore: {
            count: 10,
          },
        },
      };
      const { wrapper, store } = factory(options);
      expect(store.count).toBe(10);
      expect(wrapper.find('[data-test="count"]').text()).toBe('10');
    });
    it('stubActions 模擬行為', async () => {
      // 預設情況：怎麼操作 Store，都不會影響到 Store 本身的 State 值
      // 如果要有互動行為 stubActions: false 來關閉對 Store Action 的隔離
      const options = {
        createSpy: vi.fn(), // global 是 true 時，需要提供 createSpy 來避免錯誤
        stubActions: false,
      };
      const { wrapper, store } = factory(options);

      const spy = vi.spyOn(store, 'handleLogin');
      await wrapper.find('[data-test="login"]').trigger('click');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
