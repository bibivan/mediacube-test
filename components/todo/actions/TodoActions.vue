<script setup lang="ts">
import { ETodoStatus } from '~/types'

const todosStore = useTodosStore()
const {
  todosState,
  completedAllTodos: handleCompletedAllTodos,
  deleteCompletedTodos: handleDeleteCompletedTodos
} = todosStore
const { completedTodosCount, uncompletedTodosCount, shownTodos } = storeToRefs(todosStore)

watch([completedTodosCount, uncompletedTodosCount], () => {
  if (completedTodosCount.value === 0 || uncompletedTodosCount.value === 0) {
    todosState.shownByStatus = null
  }
})
</script>

<template>
  <div
    v-if="!todosState.loading && shownTodos?.length"
    v-bind="$attrs"
    class="todo-actions"
  >
    <button
      class="todo-actions__action todo-actions__action_check"
      :class="{ 'todo-actions__action_hidden': !uncompletedTodosCount }"
      @click="handleCompletedAllTodos"
    >
      Check all
    </button>

    <button
      class="todo-actions__action"
      :class="{ 'todo-actions__action_active': !todosState.shownByStatus }"
      @click="todosState.shownByStatus = null"
    >
      All
    </button>
    <button
      v-show="completedTodosCount && completedTodosCount !== todosState.data?.length"
      class="todo-actions__action"
      :class="{ 'todo-actions__action_active': todosState.shownByStatus === ETodoStatus.COMPLETED }"
      @click="todosState.shownByStatus = ETodoStatus.COMPLETED"
    >
      Completed
    </button>
    <button
      v-show="uncompletedTodosCount"
      class="todo-actions__action"
      :class="{ 'todo-actions__action_active': todosState.shownByStatus === ETodoStatus.PENDING }"
      @click="todosState.shownByStatus = ETodoStatus.PENDING"
    >
      Pending
    </button>
    <button
      class="todo-actions__action todo-actions__action_clear"
      :class="{ 'todo-actions__action_hidden': completedTodosCount !== todosState.data?.length }"
      @click="handleDeleteCompletedTodos"
    >
      Clear all
    </button>
  </div>
  <div
    v-if="!shownTodos?.length"
    class="no-todos-message"
  >
    Congrat, you have no more tasks to do
  </div>
</template>

<style scoped lang="scss">
@import 'todo-actions';
</style>
