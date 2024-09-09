<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { EShownTodos } from '~/types'

const todosStore = useTodosStore()
const { todosState, updateTodo: handleUpdateTodo } = todosStore
const { allTodos } = storeToRefs(todosStore)

await todosStore.getAllTodos()
</script>

<template>
  <div class="todo-list">
    <div
      v-if="todosState.loading"
      class="todo-list__loading loading"
    />
    <template v-else-if="todosState.shownTodos === EShownTodos.ALL">
      <PerfectScrollbar>
        <VueDraggableNext
          v-if="Array.isArray(allTodos)"
          v-model="allTodos"
          handle=".drag-handler"
        >
          <TodoItem
            v-for="todo in allTodos"
            :key="'all-todos' + todo.id"
            class="todo-list__item"
            :data="todo"
            @on-update-todo="handleUpdateTodo"
          />
        </VueDraggableNext>
      </PerfectScrollbar>
    </template>
    <template v-else-if="todosState.shownTodos === EShownTodos.COMPLETED">
      <PerfectScrollbar>
        <VueDraggableNext
          v-if="Array.isArray(todosState.data.completed)"
          v-model="todosState.data.completed"
          handle=".drag-handler"
        >
          <TodoItem
            v-for="todo in todosState.data.completed"
            :key="'completed-todos' + todo.id"
            class="todo-list__item"
            :data="todo"
            @on-update-todo="handleUpdateTodo"
          />
        </VueDraggableNext>
      </PerfectScrollbar>
    </template>
    <template v-else-if="todosState.shownTodos === EShownTodos.UNCOMPLETED">
      <PerfectScrollbar>
        <VueDraggableNext
          v-if="Array.isArray(todosState.data.uncompleted)"
          v-model="todosState.data.uncompleted"
          handle=".drag-handler"
        >
          <TodoItem
            v-for="todo in todosState.data.uncompleted"
            :key="'uncompleted-todos' + todo.id"
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
