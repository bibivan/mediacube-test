<script setup lang="ts">
import { ERequestCommand, ERequestStatus, type IAddRequestArgs } from '~/types'

const { syncTodoWithServ } = useTodosStore()
const newTodo = reactive<IAddRequestArgs>({
  content: ''
})

const isPendingOfTodoAdding = ref<boolean>(false)

const handleAddTodo = async () => {
  isPendingOfTodoAdding.value = true

  if (newTodo.content) {
    const payload = getTodoPayload(ERequestCommand.ADD, newTodo)
    const requestResult = await syncTodoWithServ(payload)
    if (requestResult === ERequestStatus.SUCCESS) newTodo.content = ''
  }

  isPendingOfTodoAdding.value = false
}
</script>

<template>
  <form
    class="todo-add"
    action="/public"
    @submit.prevent="handleAddTodo"
  >
    <input
      v-model="newTodo.content"
      class="todo-add__input input"
      placeholder="Add new todo..."
      type="text"
    />
    <button
      v-show="newTodo.content"
      class="todo-add__btn btn"
    >
      <template v-if="!isPendingOfTodoAdding">Send</template>
      <BaseSpinner
        v-if="isPendingOfTodoAdding"
        class="todo-add__spinner"
      />
    </button>
  </form>
</template>

<style scoped lang="scss">
@import 'todo-add';
</style>
