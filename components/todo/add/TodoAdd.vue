<script setup lang="ts">
import { ERequestStatus, ETodoStatus, type INewTodoPayload } from '~/types'

const { addTodo } = useTodosStore()
const newTodo = reactive<INewTodoPayload>({
  title: null,
  status: ETodoStatus.PENDING
})

const isPendingOfTodoAdding = ref<boolean>(false)

const handleAddTodo = async () => {
  isPendingOfTodoAdding.value = true

  if (newTodo.title) {
    const requestResult = await addTodo(newTodo)
    if (requestResult === ERequestStatus.SUCCESS) newTodo.title = null
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
      v-model="newTodo.title"
      class="todo-add__input input"
      placeholder="Add new todo..."
      type="text"
    />
    <button
      v-show="newTodo.title"
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
