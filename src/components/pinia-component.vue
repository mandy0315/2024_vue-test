<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '/src/store';

const store = useMainStore();
const count = computed(() => store.count);
</script>

<template>
  <div>
    <p>pinia: {{ count }}</p>
  </div>
</template>
