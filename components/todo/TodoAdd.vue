<script setup lang="ts">
import { ETodoStatus, type INewTodoPayload, type ITodo } from '~/types/modules'

const { addTodo } = useTodosStore()
const newTodo = reactive<INewTodoPayload>({
  title: null,
  status: ETodoStatus.PENDING
})

const isPendingOfTodoAdding = ref<boolean>(false)

const handleAddTodo = async () => {
  isPendingOfTodoAdding.value = true

  if (newTodo.title) await addTodo(newTodo)

  newTodo.title = null
  isPendingOfTodoAdding.value = false
}
</script>

<template>
  <form
    class="todo-add"
    action="/"
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
      Send
      <BaseSpinner
        v-if="isPendingOfTodoAdding"
        class="todo-add__spinner"
      />
    </button>
  </form>
</template>

<style scoped lang="scss">
.todo-add {
  display: flex;
  width: 100%;

  &__input {
    width: 100%;
  }

  &__btn {
    margin-left: 16px;
  }

  &__spinner {
    margin-left: 10px;
    width: 17px;
    height: 17px;
  }
}
</style>
