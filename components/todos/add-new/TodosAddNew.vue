<script setup lang="ts">
import { ERequestCommand, ERequestStatus, type IAddRequestArgs } from '~/types'

const { syncTodoWithServ } = useTodosStore()

const newTodo = reactive<IAddRequestArgs>({ content: '' })
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
    class="todos-add-new"
    action="/public"
    @submit.prevent="handleAddTodo"
  >
    <input
      v-model="newTodo.content"
      class="todos-add-new__input input"
      placeholder="Add new todo..."
      type="text"
    />
    <button
      class="todos-add-new__btn btn"
      :class="{ 'todos-add-new__btn_shown': newTodo.content }"
    >
      <template v-if="!isPendingOfTodoAdding">Send</template>
      <BaseSpinner
        v-if="isPendingOfTodoAdding"
        class="todos-add-new__spinner"
      />
    </button>
  </form>
</template>

<style scoped lang="scss">
@import 'todos-add-new';
</style>
