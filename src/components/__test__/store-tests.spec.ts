import { describe, it, expect, vi } from 'vitest';
import { useMainStore } from '/src/store';

import Store from '../Store.vue';

// 元件測試
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type { TestingOptions } from '@pinia/testing';

// https://pinia.vuejs.org/cookbook/testing.html
describe('store-tests', () => {
  describe('<Store>', () => {
    const factory = (
      options: TestingOptions = {
        createSpy: vi.fn(),
      },
    ) => {
      const wrapper = mount(Store, {
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
    it.skip('stubActions 模擬行為', async () => {
      // 預設情況：怎麼操作 Store，都不會影響到 Store 本身的 State 值
      // 如果要有互動行為 stubActions: false 來關閉對 Store Action 的隔離
      const options = {
        createSpy: vi.fn(), // global 是 true 時，需要提供 createSpy 來避免錯誤
        stubActions: false,
      };
      const { wrapper, store } = factory(options);

      const spy = vi.spyOn(store, 'handleLogin');
      await wrapper.find('[data-test="button_login"]').trigger('click');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
