<script setup lang="ts"></script>

<template>
  <div class="flex">
    <span>other page</span>
    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.flex {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}
</style>
