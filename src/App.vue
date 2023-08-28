<script setup lang="ts"></script>

<template>
  <div>
    <hello-world msg="Hello Vitest" />

    <bank-component />
    <double-test>
      <p>hello double</p>
    </double-test>

    <pinia-component />
  </div>
</template>
