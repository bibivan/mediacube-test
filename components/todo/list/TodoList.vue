<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { ERequestCommand, EShownTodos, type IReorderRequestArgs } from '~/types'

const todosStore = useTodosStore()
const { todosState, syncTodoWithServ } = todosStore

const handleReorderTodos = () => {
  const args: IReorderRequestArgs = {
    items:
      todosState.data.uncompleted?.map((item, index) => ({
        id: item.id,
        child_order: index
      })) || []
  }
  const payload = getTodoPayload(ERequestCommand.REORDER, args)
  syncTodoWithServ(payload)
}

await todosStore.getAllTodos()
</script>

<template>
  <div class="todo-list">
    <div
      v-if="todosState.loading"
      class="todo-list__loading loading"
    />
    <PerfectScrollbar>
      <VueDraggableNext
        v-if="
          todosState.data.uncompleted?.length && todosState.shownTodos !== EShownTodos.COMPLETED
        "
        v-model="todosState.data.uncompleted"
        class="todo-list__wrapper"
        handle=".drag-handler"
        @change="handleReorderTodos"
      >
        <TodoItem
          v-for="todo in todosState.data.uncompleted"
          :key="'uncompleted-todos' + todo.id"
          class="todo-list__item"
          :data="todo"
        />
      </VueDraggableNext>
      <VueDraggableNext
        v-if="
          todosState.data.completed?.length && todosState.shownTodos !== EShownTodos.UNCOMPLETED
        "
        class="todo-list__wrapper"
        handle=".drag-handler"
      >
        <TodoItem
          v-for="todo in todosState.data.completed"
          :key="'completed-todos' + todo.id"
          class="todo-list__item"
          :data="todo"
        />
      </VueDraggableNext>
    </PerfectScrollbar>
  </div>
</template>

<style scoped lang="scss">
@import 'todo-list';
</style>
