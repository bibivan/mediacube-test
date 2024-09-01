<script lang="ts" setup></script>

<template>
  <main class="main">
    <TodoHolder />
  </main>
  <NuxtLink
    class="link"
    to="/other"
  >
    other
  </NuxtLink>
</template>
<style scoped lang="scss">
.main {
  @include flex-center;
  padding: 10px;
  min-height: 100vh;
  background: $color-bg-html;
}

.link {
  position: fixed;
  left: 50%;
  top: 35px;
  transform: translateX(-50%);
}
</style>
