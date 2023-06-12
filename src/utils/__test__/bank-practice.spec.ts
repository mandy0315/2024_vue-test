import { describe, it, expect } from 'vitest';
import { Bank } from '../bank-practice';

// 練習題銀行開戶提款存款

describe('開戶', () => {
  // happy path
  it('開戶成功，顯示用戶人資訊', () => {
    // Arrange
    const bank = new Bank();
    // Act
    bank.openAccount('John');
    // Assert
    expect(bank.accounts).toContainEqual({ name: 'John', money: 0 });
  });
  it(`開戶成功，回應'開戶完成'`, () => {
    // Arrange
    const bank = new Bank();
    // Act
    const result = bank.openAccount('John');
    // Assert
    expect(result).toBe('開戶完成');
  });
  // sad path
  it(`已經開戶過，回應'用戶已經開戶過！'`, () => {
    // Arrange
    const bank = new Bank();
    // Act
    bank.openAccount('John');
    const result = bank.openAccount('John');
    // Assert
    expect(result).toBe('用戶已經開戶過！');
  });
});
describe('存款', () => {
  // happy path
  it('存款 1000 元，顯示用戶人資訊', () => {
    // Arrange
    const bank = new Bank();
    bank.openAccount('John');
    // Act
    bank.deposit('John', 1000);
    // Assert
    expect(bank.accounts).toContainEqual({ name: 'John', money: 1000 });
  });
  it(`存款成功，回應'用戶餘額剩 {$} 元'`, () => {
    // Arrange
    const bank = new Bank();
    bank.openAccount('John');
    // Act
    const result = bank.deposit('John', 1000);
    // Assert
    expect(result).toBe('用戶餘額 1000 元');
  });
  // sad path
  it(`查不到用戶戶頭，回應'目前沒有此用戶'`, () => {
    // Arrange
    const bank = new Bank();
    // Act
    const result = bank.deposit('John', 1000);
    // Assert
    expect(result).toBe('目前沒有此用戶');
  });
});
describe('提款', () => {
  // happy path
  it('提款 1000 元，顯示用戶人資訊', () => {
    // Arrange
    const bank = new Bank();
    bank.openAccount('John');
    bank.deposit('John', 1000);
    // Act
    bank.withdraw('John', 1000);
    // Assert
    expect(bank.accounts).toContainEqual({ name: 'John', money: 0 });
  });
  it(`提款成功，回應'用戶餘額剩 {$} 元'`, () => {
    // Arrange
    const bank = new Bank();
    bank.openAccount('John');
    bank.deposit('John', 1000);
    // Act
    const result = bank.withdraw('John', 1000);
    // Assert
    expect(result).toBe('用戶餘額 0 元');
  });
  // sad path
  it(`查不到用戶戶頭，回應'目前沒有此用戶'`, () => {
    // Arrange
    const bank = new Bank();
    // Act
    const result = bank.withdraw('John', 1000);
    // Assert
    expect(result).toBe('目前沒有此用戶');
  });
  it(`用戶餘額不足，回應'用戶餘額不足，剩餘 {$} 元'`, () => {
    // Arrange
    const bank = new Bank();
    bank.openAccount('John');
    // Act
    const result = bank.withdraw('John', 1000);
    // Assert
    expect(result).toBe('用戶餘額不足，餘額 0 元');
  });
});
