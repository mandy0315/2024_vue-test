<script setup lang="ts">
const baseInfo = {
  name: '小明',
  age: 18,
};
</script>

<template>
  <div>
    <slot name="header"></slot>
    <slot :baseInfo="baseInfo"></slot>
    <slot name="footer"></slot>
  </div>
</template>
