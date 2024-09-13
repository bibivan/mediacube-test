<script setup lang="ts">
const isDark = useCookie('darkTheme', { default: () => false })

const setTheme = (val: boolean) => {
  if (val) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

watch(isDark, (val) => setTheme(val))
onMounted(() => setTheme(isDark.value))
</script>

<template>
  <button
    class="dark-mode-switcher btn"
    @click="isDark = !isDark"
  />
</template>

<style scoped lang="scss">
@import 'dark-mode-switcher';
</style>
