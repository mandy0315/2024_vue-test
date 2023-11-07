import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

describe('[vitest]單元測試', () => {
  describe('框架 + Setup & Teardown', () => {
    // Setup & Teardown (beforeEach / afterEach)
    beforeEach(() => {
      console.log('每個測試案例前執行');
    });
    afterEach(() => {
      console.log('每個測試案例後執行');
    });

    it('函式案例', () => {
      const add = (x: number, y: number) => Number(x) + Number(y);
      expect(add(1, 1)).toBe(2);
    });

    // describe＆it(.skip / .only / .fails / .todo)
    describe.todo('框架相關 API', () => {
      it.todo('待完成', () => {});
      it.only('只執行', () => {});
      it.fails('測試失敗', () => {});
      it.skip('跳過測試', () => {});
    });
  });

  describe('斷言相關 API', () => {
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
    it('元件快照測試', () => {
      const wrapper = mount(HelloWorld);
      const target = wrapper.find('[data-test="vitest-link"]');
      // toMatchSnapshot 新增檔案儲存快照; toMatchInlineSnapshot 快照內嵌在測試檔案中
      // 更新快照 pnpm test:update
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
});
