import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineComponent } from 'vue';
import HelloWorld from '../HelloWorld.vue';

describe('[vitest&test-utils]元件測試', () => {
  it('目標元素', () => {
    const wrapper = mount(HelloWorld);

    // get/find 取的元素
    // `get` 没有找到任何元素會抛出錯誤 ;`find` 不會做任何事。
    // 除非斷言不存在元素，否則一律使用 `get`。
    expect(wrapper.get({ ref: 'dog' }).text()).toBe('小黑');
    expect(wrapper.get('[data-test="dog"]').text()).toBe('小白');

    expect(wrapper.findAll('[data-test="cat"]')[0].text()).toBe('小黑');

    // 斷言的元素不存在
    expect(wrapper.find('.not-exist').exists()).toBeFalsy();
  });
  it('目標資訊', () => {
    const wrapper = mount(HelloWorld);

    // attributes
    expect(wrapper.get('[data-test="link"]').attributes('href')).toBe('https://v1.test-utils.vuejs.org/ru/');

    // class
    expect(wrapper.get('[data-test="link"]').classes()).toContain('link');

    // text
    expect(wrapper.get('[data-test="title"]').text()).toBe('');

    // html
    expect(wrapper.get('[data-test="title"]').html()).toBe(
      '<h1 data-test="title" class="text-6xl text-green-700"></h1>',
    );
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
    expect(wrapper.get('[data-test="radio-result"]').text()).toBe('1');
    await lastRadio.setValue(true);
    expect(wrapper.get('[data-test="radio-result"]').text()).toBe('2');

    // - checkbox 多選
    const checkbox = wrapper.get('[data-test="checkbox"]');
    const firstCheckbox = checkbox.findAll('label')[0].get('input');
    const lastCheckbox = checkbox.findAll('label')[1].get('input');

    await firstCheckbox.setValue(true);
    expect(wrapper.get('[data-test="checkbox-result"]').text()).toBe('1');
    await lastCheckbox.setValue(true);
    expect(wrapper.get('[data-test="checkbox-result"]').text()).toBe('1,2');
    await firstCheckbox.setValue(false);
    expect(wrapper.get('[data-test="checkbox-result"]').text()).toBe('2');

    // - selected 下拉選單
    await wrapper.get('[data-test="selected"]').setValue('orange');
    expect(wrapper.get('[data-test="selected-result"]').text()).toBe('orange');
  });
  it('資料設定', async () => {
    const wrapper: VueWrapper<any> = mount(HelloWorld);
    wrapper.vm.count = 10;
    await wrapper.vm.$nextTick();
    expect(wrapper.get('[data-test="count"]').text()).toBe('10');
  });
  it('props設定', async () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Hello1',
      },
    });

    expect(wrapper.get('[data-test="title"]').text()).toBe('Hello1');
    await wrapper.setProps({ msg: 'Hello2' });
    // - 斷言是否傳入對 props 參數給元件
    expect(wrapper.props('msg')).toBe('Hello2');
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
    const component = defineComponent({
      name: 'SlotComponent',
      template: `
        <div>
          <slot name="header"></slot>
          <slot :baseInfo="baseInfo"></slot>
          <slot name="footer"></slot>
        </div>
      `,
      setup() {
        return {
          baseInfo: {
            name: '小明',
            age: 18,
          },
        };
      },
    });
    it('未傳入 slot', () => {
      const wrapper = mount(component);
      // 快照測試
      expect(wrapper.html()).toMatchInlineSnapshot('"<div></div>"');
    });
    it('已傳入 slot', () => {
      const wrapper = mount(component, {
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
      const wrapper = mount(component, {
        slots: {
          default: `
          <template #baseInfo>
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
