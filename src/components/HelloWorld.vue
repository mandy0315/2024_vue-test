<script setup lang="ts">
import { ref } from 'vue';
import ChildComponent from './child-component.vue';
import SlotComponent from './slot-component.vue';

defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const count = ref(0);
const textResult = ref('');
const radioResult = ref(1);
const checkboxResult = ref([]);
const selectedResult = ref('');
</script>

<template>
  <h1 data-test="title" class="text-6xl text-green-700">{{ msg }}</h1>

  <a data-test="vitest-link" href="https://vitest.dev/">快照測試</a>

  <section>
    <p ref="dog">小黑</p>
    <p data-test="dog">小白</p>
    <p data-test="cat">小黑</p>
    <p data-test="cat">小白</p>
    <a data-test="link" href="https://v1.test-utils.vuejs.org/ru/" target="_blank" class="link"></a>
  </section>

  <section data-test="target">
    <p>Parent</p>
    <child-component />
  </section>

  <section>
    <p>模擬事件</p>
    <div>
      數量:
      <p data-test="count">{{ count }}</p>
      <button data-test="btn" @click="count++">點我</button>
    </div>
    <div>
      <!-- input -->
      <input v-model="textResult" type="text" data-test="text" />
      <p data-test="text-result">{{ textResult }}</p>
      <!-- radio -->
      <div data-test="radio">
        <label v-for="num in 2" :key="num">
          <input v-model="radioResult" type="radio" :value="num" />
          {{ num }}
        </label>
      </div>
      <p data-test="radio-result">{{ radioResult }}</p>
      <!-- checkbox -->
      <div data-test="checkbox">
        <label v-for="num in 2" :key="num">
          <input data-test="checkbox" type="checkbox" v-model="checkboxResult" :value="num" />
          {{ num }}
        </label>
      </div>
      <p data-test="checkbox-result">{{ checkboxResult.join(',') }}</p>
      <!-- select -->
      <select data-test="selected" v-model="selectedResult">
        <option value="orange">Orange</option>
        <option value="black">Black</option>
      </select>
      <p data-test="selected-result">{{ selectedResult }}</p>
    </div>
  </section>

  <section>
    <p>emit</p>
    <div data-test="first" @click="$emit('changePage', 'first')">第一頁</div>
    <div data-test="prev" @click="$emit('changePage', 'prev')">上一頁</div>
    <div data-test="next" @click="$emit('changePage', 'next')">下一頁</div>
    <div data-test="last" @click="$emit('changePage', 'last')">最後一頁</div>
  </section>

  <section>
    <p>slot</p>
    <slot-component>
      <template #header></template>
      <template #footer></template>
      <template v-slot="{ baseInfo }">
        <p>姓名:{{ baseInfo.name }}</p>
        <p>年齡:{{ baseInfo.age }}</p>
      </template>
    </slot-component>
  </section>

  <section data-test="double">
    <p>double</p>
    <child-component />
  </section>
</template>
