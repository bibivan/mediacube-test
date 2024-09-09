<script setup lang="ts">
import { EShownTodos } from '~/types'

const { todosState } = useTodosStore()
</script>

<template>
  <div
    v-if="!todosState.loading"
    v-bind="$attrs"
    class="todo-actions"
  >
    <button
      class="todo-actions__action"
      :class="{ 'todo-actions__action_active': !todosState.shownTodos }"
      @click="todosState.shownTodos = 0"
    >
      All
    </button>
    <button
      v-show="todosState.data.completed"
      class="todo-actions__action"
      :class="{ 'todo-actions__action_active': todosState.shownTodos === EShownTodos.COMPLETED }"
      @click="todosState.shownTodos = EShownTodos.COMPLETED"
    >
      Completed
    </button>
    <button
      class="todo-actions__action"
      :class="{ 'todo-actions__action_active': todosState.shownTodos === EShownTodos.UNCOMPLETED }"
      @click="todosState.shownTodos = EShownTodos.UNCOMPLETED"
    >
      Pending
    </button>
  </div>
  <div
    v-else-if="!todosState.data.completed?.length && todosState.data.uncompleted?.length"
    class="no-todos-message"
  >
    Congrat, you have no more tasks to do
  </div>
</template>

<style scoped lang="scss">
@import 'todo-actions';
</style>
