<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
const todosStore = useTodosStore()
const { todosState } = todosStore
const { shownTodos } = storeToRefs(todosStore)

await todosStore.getTodos()
</script>

<template>
  <div class="todo-list">
    <div
      v-if="todosState.loading"
      class="todo-list__loading loading"
    />
    <template v-else>
      <PerfectScrollbar>
        <VueDraggableNext handle=".drag-handler">
          <TodoItem
            v-for="todo in shownTodos"
            :key="todo.id"
            class="todo-list__item"
            :data="todo"
          />
        </VueDraggableNext>
      </PerfectScrollbar>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import 'todo-list';
</style>
