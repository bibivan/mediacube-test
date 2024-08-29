<script lang="ts" setup>
const todos = await useAPIFetch('/users/7370530/todos')
</script>

<template>
  <main>
    <div v-if="todos">
      {{ todos }}
    </div>
  </main>
</template>
<style scoped lang="scss"></style>
