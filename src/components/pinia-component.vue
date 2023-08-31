<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '/src/store';

const store = useMainStore();
const count = computed(() => store.count);
const loginInfo = computed(() => store.loginInfo);
const increment = () => store.increment();
</script>

<template>
  <div>
    <button data-test="button_increment" @click="increment()">新增數量</button>
    <button data-test="login" @click="store.handleLogin()">登入</button>
    <p data-test="adminName">adminName: {{ loginInfo.adminName }}</p>
    <p data-test="count">{{ count }}</p>
  </div>
</template>
