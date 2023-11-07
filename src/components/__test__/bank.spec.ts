import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BankComponent from '../Bank.vue';

describe('執行開戶', async () => {
  it('輸入帳戶名稱，開戶完成，狀態欄位顯示開戶完成', async () => {
    const wrapper = mount(BankComponent);

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="button_open-account"]').trigger('click');

    expect(wrapper.get('[data-test="status"]').text()).toBe('開戶完成');
  });
  it('輸入帳戶名稱，已經有帳戶，狀態欄位顯示用戶已經開戶過！', async () => {
    const wrapper = mount(BankComponent);

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="button_open-account"]').trigger('click');

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="button_open-account"]').trigger('click');

    expect(wrapper.get('[data-test="status"]').text()).toBe('用戶已經開戶過！');
  });
});

describe('執行存款', () => {
  it('輸入帳戶名稱、金額，存款完成，狀態欄位顯示用戶餘額 1000 元', async () => {
    const wrapper = mount(BankComponent);

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="button_open-account"]').trigger('click');

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="input_money"]').setValue('1000');
    await wrapper.get('[data-test="button_deposit"]').trigger('click');

    expect(wrapper.get('[data-test="status"]').text()).toBe('用戶餘額 1000 元');
  });
  it('輸入帳戶名稱、金額，沒有此帳戶不能存款，狀態欄位顯示目前沒有此用戶', async () => {
    const wrapper = mount(BankComponent);

    await wrapper.get('[data-test="input_account"]').setValue('小花');
    await wrapper.get('[data-test="input_money"]').setValue('1000');
    await wrapper.get('[data-test="button_deposit"]').trigger('click');

    expect(wrapper.get('[data-test="status"]').text()).toBe('目前沒有此用戶');
  });
});

describe('執行提款', () => {
  it('輸入帳戶名稱、金額，提款成功，狀態欄位顯示用戶餘額 0 元', async () => {
    const wrapper = mount(BankComponent);

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="button_open-account"]').trigger('click');

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="input_money"]').setValue('1000');
    await wrapper.get('[data-test="button_deposit"]').trigger('click');

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="input_money"]').setValue('1000');
    await wrapper.get('[data-test="button_withdraw"]').trigger('click');

    expect(wrapper.get('[data-test="status"]').text()).toBe('用戶餘額 0 元');
  });
  it('輸入帳戶名稱、金額，沒有此帳戶不能提款，狀態欄位顯示目前沒有此用戶', async () => {
    const wrapper = mount(BankComponent);

    await wrapper.get('[data-test="input_account"]').setValue('小花');
    await wrapper.get('[data-test="input_money"]').setValue('1000');
    await wrapper.get('[data-test="button_withdraw"]').trigger('click');

    expect(wrapper.get('[data-test="status"]').text()).toBe('目前沒有此用戶');
  });
  it('輸入帳戶名稱、金額，餘額不足不能提款，狀態欄位顯示用戶餘額不足，餘額 1000 元', async () => {
    const wrapper = mount(BankComponent);

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="button_open-account"]').trigger('click');

    await wrapper.get('[data-test="input_account"]').setValue('小明');
    await wrapper.get('[data-test="input_money"]').setValue('1000');
    await wrapper.get('[data-test="button_withdraw"]').trigger('click');

    expect(wrapper.get('[data-test="status"]').text()).toBe('用戶餘額不足，餘額 0 元');
  });
});
