import { describe, expect, it } from 'vitest';
import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';
import SlotComponent from '../slot-component.vue';

describe('vue test utils', () => {
  it('目標元素', () => {
    const wrapper = mount(HelloWorld);

    // get/find 都能取的元素;`get` 没有找到任何元素會抛出錯誤。`find` 不會做任何事。
    // 適合使用: get 取得元素 find 斷言元素存不存
    expect(wrapper.get({ ref: 'dog' }).text()).toBe('小黑');
    expect(wrapper.get('[data-test="dog"]').text()).toBe('小白');

    expect(wrapper.findAll('[data-test="cat"]')[0].text()).toBe('小黑');

    // find & exists
    expect(wrapper.find('.not-exist').exists()).toBeFalsy();
  });
  it('目標資訊', () => {
    const wrapper = mount(HelloWorld);
    const stubWrapper = shallowMount(HelloWorld);

    // attributes
    expect(wrapper.get('[data-test="link"]').attributes('href')).toBe('https://v1.test-utils.vuejs.org/ru/');

    // class
    expect(wrapper.get('[data-test="link"]').classes()).toContain('link');

    // text
    expect(wrapper.get('[data-test="target"]').text()).toBe('ParentChild');
    expect(stubWrapper.get('[data-test="target"]').text()).toBe('Parent');

    // html
    expect(wrapper.get('[data-test="target"]').html()).toContain('<p>Child</p>');
    expect(stubWrapper.get('[data-test="target"]').html()).toContain('<child-component-stub></child-component-stub>');
  });
  it('目標事件', async () => {
    const wrapper = mount(HelloWorld);
    // 事件都是非同步的，所以要用 async/await

    // trigger 觸發事件
    await wrapper.get('[data-test="btn"]').trigger('click');
    expect;
    expect(wrapper.get('[data-test="count"]').text()).toBe('1');

    // setValue 表格設定
    // - input 輸入
    await wrapper.get('[data-test="text"]').setValue('Hello, World!');
    expect(wrapper.get('[data-test="text-result"]').text()).toBe('Hello, World!');

    // - radio 單選
    const radio = wrapper.get('[data-test="radio"]');
    const firstRadio = radio.findAll('label')[0].get('input');
    const lastRadio = radio.findAll('label')[1].get('input');
    await firstRadio.setValue(true);
    expect(wrapper.find('[data-test="radio-result"]').text()).toBe('1');
    await lastRadio.setValue(true);
    expect(wrapper.find('[data-test="radio-result"]').text()).toBe('2');

    // - checkbox 多選
    const checkbox = wrapper.get('[data-test="checkbox"]');
    const firstCheckbox = checkbox.findAll('label')[0].get('input');
    const lastCheckbox = checkbox.findAll('label')[1].get('input');

    await firstCheckbox.setValue(true);
    expect(wrapper.find('[data-test="checkbox-result"]').text()).toBe('1');
    await lastCheckbox.setValue(true);
    expect(wrapper.find('[data-test="checkbox-result"]').text()).toBe('1,2');
    await firstCheckbox.setValue(false);
    expect(wrapper.find('[data-test="checkbox-result"]').text()).toBe('2');

    // - selected 下拉選單
    await wrapper.find('[data-test="selected"]').setValue('orange');
    expect(wrapper.find('[data-test="selected-result"]').text()).toBe('orange');
  });
  it('元件資料設定', async () => {
    const wrapper: VueWrapper<any> = mount(HelloWorld, {
      props: {
        msg: 'Hello1',
      },
    });
    // data
    // -wrapper.vm 訪問 vue 實力
    wrapper.vm.count = 10;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="count"]').text()).toBe('10');

    // props
    await wrapper.setProps({ msg: 'Hello2' });
    // - 斷言是否傳入對 props 參數給元件
    expect(wrapper.props('msg')).toEqual('Hello2');
    expect(wrapper.props()).toEqual({
      msg: 'Hello2',
    });
    // - 斷言 title 元素是否有正確的文字
    expect(wrapper.find('[data-test="title"]').text()).toEqual('Hello2');
  });
  it('emit 事件', async () => {
    const wrapper = mount(HelloWorld);
    await wrapper.get('[data-test="first"]').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('changePage'); // emit 屬性名稱是否正確
    await wrapper.get('[data-test="first"]').trigger('click');
    expect(wrapper.emitted().changePage).toHaveLength(2); // emit 次數是否正確
    expect(wrapper.emitted().changePage[0]).toEqual(['first']); // emit 參數是否正確
  });
  describe('slot 插槽', () => {
    it('未傳入 slot', () => {
      const wrapper = mount(SlotComponent);
      // 快照測試
      expect(wrapper.html()).toMatchInlineSnapshot('"<div></div>"');
    });
    it('已傳入 slot', () => {
      const wrapper = mount(SlotComponent, {
        slots: {
          header: '<p>haeder slot</p>',
          default: '<p>default slot</p>',
          footer: '<p>footer slot</p>',
        },
      });
      // 快照測試
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div>
          <p>haeder slot</p>
          <p>default slot</p>
          <p>footer slot</p>
        </div>"
      `);
    });
    it('作用域插槽', () => {
      const wrapper = mount(SlotComponent, {
        slots: {
          default: `
          <template v-slot="{ baseInfo }">
            <p>姓名:{{ baseInfo.name }}</p>
            <p>年齡:{{ baseInfo.age }}</p>
          </template>
          `,
        },
      });
      // 快照測試
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div>
          <p>姓名:小明</p>
          <p>年齡:18</p>
        </div>"
      `);
    });
  });
});
