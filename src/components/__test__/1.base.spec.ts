import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

describe('測試情境描述', () => {
  beforeEach(() => {
    console.log('每個測試案例前執行');
  });
  it('函式測試案例', () => {
    const add = (x: number, y: number) => Number(x) + Number(y);
    expect(add(1, 1)).toBe(2);
  });
  it('元件測試案例', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } });

    expect(wrapper.find('[data-test="title"]').text()).toBe('Hello Vitest');
  });

  // it(.skip 跳過 / .only 只執行 / .fails 預期失敗 / .todo 未完成)
  it.fails('測試失敗案例', () => {
    const add = (x: number, y: number) => Number(x) + Number(y);
    expect(add(1, 2)).toBe(12);
  });
  it.skip('跳過測試案例', () => {
    const add = (x: number, y: number) => Number(x) + Number(y);
    expect(add(1, 1)).toBe(2);
  });

  afterEach(() => {
    console.log('每個測試案例後執行');
  });
});
