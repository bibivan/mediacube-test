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
</script>

<template>
  <div class="todos-list">
    <div
      v-if="todosState.loading"
      class="todos-list__loading loading"
    />
    <PerfectScrollbar>
      <VueDraggableNext
        v-if="
          todosState.data.uncompleted?.length && todosState.shownTodos !== EShownTodos.COMPLETED
        "
        v-model="todosState.data.uncompleted"
        class="todos-list__wrapper"
        handle=".drag-handler"
        @change="handleReorderTodos"
      >
        <TodosItem
          v-for="todo in todosState.data.uncompleted"
          :key="'uncompleted-todos' + todo.id"
          class="todos-list__item"
          :data="todo"
        />
      </VueDraggableNext>
      <VueDraggableNext
        v-if="
          todosState.data.completed?.length && todosState.shownTodos !== EShownTodos.UNCOMPLETED
        "
        class="todos-list__wrapper"
        handle=".drag-handler"
      >
        <TodosItem
          v-for="todo in todosState.data.completed"
          :key="'completed-todos' + todo.id"
          class="todos-list__item"
          :data="todo"
        />
      </VueDraggableNext>
    </PerfectScrollbar>
  </div>
</template>

<style scoped lang="scss">
@import 'todos-list';
</style>
