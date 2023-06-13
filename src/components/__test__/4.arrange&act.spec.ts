import { beforeEach, describe, expect, it } from 'vitest';
import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

describe('vue test utils', () => {
  let wrapper: VueWrapper<InstanceType<typeof HelloWorld>>; // InstanceType<typeof HelloWorld> 為 HelloWorld 的實例類型 ;
  let stubWrapper: VueWrapper<InstanceType<typeof HelloWorld>>;
  beforeEach(() => {
    // 容器 mount | shallowMount
    wrapper = mount(HelloWorld);
    stubWrapper = shallowMount(HelloWorld);
  });
  it('目標元素', () => {
    // find
    expect(wrapper.find({ ref: 'dog' }).text()).toBe('小黑');
    expect(wrapper.find('[data-test="dog"]').text()).toBe('小白');

    // findAll
    expect(wrapper.findAll('[data-test="cat"]')[0].text()).toBe('小黑');

    // find & exists
    expect(wrapper.find('.not-exist').exists()).toBeFalsy();
  });
  it('目標資訊', () => {
    // attributes
    expect(wrapper.find('[data-test="link"]').attributes('href')).toBe('https://v1.test-utils.vuejs.org/ru/');

    // class
    expect(wrapper.find('[data-test="link"]').classes()).toContain('link');

    // text
    expect(wrapper.find('[data-test="target"]').text()).toBe('ParentChild');
    expect(stubWrapper.find('[data-test="target"]').text()).toBe('Parent');

    // html
    expect(wrapper.find('[data-test="target"]').html()).toContain('<p>Child</p>');
    expect(stubWrapper.find('[data-test="target"]').html()).toContain('<child-component-stub></child-component-stub>');
  });
  it('目標事件', async () => {
    // 事件都是非同步的，所以要用 async/await

    // trigger 觸發事件
    await wrapper.find('[data-test="btn"]').trigger('click');
    expect;
    expect(wrapper.find('[data-test="count"]').text()).toBe('1');

    // setValue 表格設定
    // - input 輸入
    await wrapper.find('[data-test="text"]').setValue('Hello, World!');
    expect(wrapper.find('[data-test="text-result"]').text()).toBe('Hello, World!');

    // - radio 單選
    await wrapper.findAll('[data-test="radio"]')[0].setValue(true);
    expect(wrapper.find('[data-test="radio-result"]').text()).toBe('1');
    await wrapper.findAll('[data-test="radio"]')[1].setValue(true);
    expect(wrapper.find('[data-test="radio-result"]').text()).toBe('2');

    // - checkbox 多選
    await wrapper.findAll('[data-test="checkbox"]')[0].setValue(true);
    expect(wrapper.find('[data-test="checkbox-result"]').text()).toBe('1');
    await wrapper.findAll('[data-test="checkbox"]')[1].setValue(true);
    expect(wrapper.find('[data-test="checkbox-result"]').text()).toBe('1,2');
    await wrapper.findAll('[data-test="checkbox"]')[0].setValue(false);
    expect(wrapper.find('[data-test="checkbox-result"]').text()).toBe('2');

    // - selected 下拉選單
    await wrapper.find('[data-test="selected"]').setValue('orange');
    expect(wrapper.find('[data-test="selected-result"]').text()).toBe('orange');
  });
});
