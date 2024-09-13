<script setup lang="ts">
import { EProgressColor, type ITodo, type TNullable } from '~/types'

const { todosState } = useTodosStore()

const allTodosCount = computed(() => {
  return (todosState.data.completed?.length || 0) + (todosState.data.uncompleted?.length || 0)
})

const getPercents = <T,>(arr: TNullable<T[]>) => {
  if (!allTodosCount.value) return 0
  return ((arr?.length || 0) / allTodosCount.value) * 100
}

const completedProgress = computed(() => getPercents<ITodo>(todosState.data.completed))
const uncompletedProgress = computed(() => getPercents<ITodo>(todosState.data.uncompleted))
</script>

<template>
  <div class="progress-info">
    <TodosProgressBar
      v-if="todosState.data.completed"
      :data="todosState.data.completed"
      :progress-color="EProgressColor.VIOLET"
      :progress="completedProgress"
      name="completed"
      class="progress-info__item"
    />
    <TodosProgressBar
      v-if="todosState.data.uncompleted"
      :data="todosState.data.uncompleted"
      :progress-color="EProgressColor.PINK"
      :progress="uncompletedProgress"
      name="To be finished"
      class="progress-info__item"
    />
  </div>
</template>

<style scoped lang="scss">
@import 'todos-progress-info';
</style>
