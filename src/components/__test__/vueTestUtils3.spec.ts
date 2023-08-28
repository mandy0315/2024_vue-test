import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';
import DoubleTest from '../double-test.vue';

describe.only('vue test utils 測試替身', () => {
  it('shallowMount', () => {
    const wrapper = mount(DoubleTest);

    expect(wrapper.get('[data-test="double"]').html()).toContain('<child-component></child-component>');
  });
  it('mount', () => {
    const wrapper = mount(HelloWorld, {
      shallow: true,
    });

    expect(wrapper.get('[data-test="double"]').html()).toContain('<child-component-stub></child-component-stub>');
  });
  describe('global.stubs', () => {
    it('stubs', () => {
      const wrapper = mount(DoubleTest, {
        global: {
          stubs: {
            ChildComponent: true,
          },
        },
      });
      expect(wrapper.get('[data-test="double"]').html()).toContain('<child-component-stub></child-component-stub>');
    });
    it('template', () => {
      const wrapper = mount(DoubleTest, {
        global: {
          stubs: {
            ChildComponent: {
              template: '<p>render double2</p>',
            },
          },
        },
      });
      expect(wrapper.get('[data-test="double"]').html()).toContain('<p>render double2</p>');
    });
  });
});
