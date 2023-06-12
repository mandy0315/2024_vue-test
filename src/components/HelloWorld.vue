<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h1 data-test="title" class="text-6xl text-green-700">{{ msg }}</h1>

  <a data-test="vitest-link" href="https://vitest.dev/">快照測試</a>
</template>
