<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
const todosStore = useTodosStore()
const { todosState, updateTodo: handleUpdateTodo } = todosStore
const { uncompletedTodos } = storeToRefs(todosStore)

await todosStore.getAllTodos()
</script>

<template>
  <div class="todo-list">
    <div
      v-if="todosState.loading"
      class="todo-list__loading loading"
    />
    <template v-else>
      <PerfectScrollbar>
        <VueDraggableNext
          v-model="uncompletedTodos as unknown[]"
          handle=".drag-handler"
        >
          <TodoItem
            v-for="todo in uncompletedTodos"
            :key="todo.id"
            class="todo-list__item"
            :data="todo"
            @on-update-todo="handleUpdateTodo"
          />
        </VueDraggableNext>
      </PerfectScrollbar>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import 'todo-list';
</style>
