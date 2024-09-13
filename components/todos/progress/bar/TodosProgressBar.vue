<script setup lang="ts">
import { EProgressColor, type ITodo } from '~/types'

const props = defineProps<{
  data: ITodo[]
  progressColor: EProgressColor
  name: string
  progress: number
}>()

const tasksCount = computed(() => {
  return `${props.data.length} ` + pluralize('task', props.data.length)
})
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__text">
      <p class="progress-bar__todos-count">{{ tasksCount }}</p>
      <h2 class="progress-bar__todos-status">{{ name }}</h2>
    </div>
    <div
      class="progress-bar__progress progress"
      :class="'progress_color_' + progressColor"
    >
      <span
        class="progress__line"
        :style="{ width: progress + '%' }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'todos-progress-bar';
</style>
