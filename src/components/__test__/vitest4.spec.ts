import { describe, it, expect, vi } from 'vitest';

const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};
describe('Mocking API', () => {
  describe('模擬時間', () => {
    it('設定模擬時間', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2022-10-13')); // 設定模擬時間
      expect(vi.getMockedSystemTime()).toEqual(new Date('2022-10-13'));
    });

    it.skip('恢復時間', () => {
      vi.useFakeTimers(); // 使用模擬時間
      vi.setSystemTime(new Date('2022-10-13')); // 設定模擬時間
      vi.useRealTimers(); // 恢復模擬時間

      expect(formatDateTime(new Date())).toEqual(formatDateTime(new Date('2023-08-25')));
    });
  });
  describe('模擬計時器', () => {
    it('次數', () => {
      vi.useFakeTimers(); // 使用模擬計時器
      let count = 0;

      const mockFn = vi.fn(() => {
        count++;
        setTimeout(() => {
          mockFn();
        }, 1000);
      });
      mockFn();

      expect(count).toBe(1);
      vi.runOnlyPendingTimers(); // 執行下個計時器
      expect(count).toBe(2);
    });
    it('是否呼叫', () => {
      vi.useFakeTimers(); // 使用模擬計時器
      const mockFn = vi.fn();

      setTimeout(mockFn, 1000);

      vi.advanceTimersByTime(999); // 模擬時間前進 999 毫秒
      expect(mockFn).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1); // 計時器被提前 1000 毫秒執行
      expect(mockFn).toHaveBeenCalled();
    });
  });
  describe('模擬函式', () => {
    it('vi.fn', () => {
      const mockFn = vi.fn();
      mockFn();

      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('vi.spyOn', () => {
      // vi.spy 物件既有的方法，不破壞原有功能的方法替身
      let count = 0;
      const obj = {
        add: () => count++,
      };

      const spy = vi.spyOn(obj, 'add');
      obj.add();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(count).toBe(1);
    });
  });
});
