import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

describe('測試情境描述', () => {
  it('測試替身-監聽函式', () => {
    console.log(vi.fn());
    const sayHi = (name: string) => `Hi, ${name}`;
    const spySayHi = vi.fn(sayHi);
    spySayHi('John');

    expect(spySayHi).toHaveBeenCalled(); // 是否調用
    expect(spySayHi).toHaveBeenCalledTimes(1); // 調用n次
    expect(spySayHi).toHaveBeenCalledWith('John'); // 調用參數
    expect(spySayHi).toHaveReturned(); // 是否有返回值
    expect(spySayHi).toHaveReturnedTimes(1); // 返回值n次
    expect(spySayHi).toHaveReturnedWith('Hi, John'); // 最後返回值
    expect(spySayHi).toHaveLastReturnedWith('Hi, John'); // 最後返回值
    expect(spySayHi).toHaveNthReturnedWith(1, 'Hi, John'); // n次的返回值
  });
  it('元件快照測試', () => {
    const wrapper = mount(HelloWorld);
    const target = wrapper.find('[data-test="vitest-link"]');
    // toMatchSnapshot 新增檔案儲存快照; toMatchInlineSnapshot 快照內嵌在測試檔案中
    expect(target).toMatchSnapshot();
  });
  it('測試異常情境', () => {
    const badPath = () => {
      throw new Error('Error');
    };
    // toThrowError 匹配函式是否拋出異常; toThrowErrorMatchingSnapshot 儲存快照異常 ; toThrowErrorMatchingInlineSnapshot 快照異常內嵌在測試檔案中
    expect(() => badPath()).toThrowError('Error'); // 拋出異常訊息
    expect(() => badPath()).toThrowErrorMatchingInlineSnapshot('"Error"'); // 拋出異常的訊息快照
  });
});
