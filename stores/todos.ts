import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { ComputedRef } from 'vue'

export const useTodosStore = defineStore('todos_store', () => {
  const config = useRuntimeConfig()
  const todosState = useStoreStateInstance<ITodo[]>()

  const todos: ComputedRef<TNullable<ITodo[]>> = computed(() => todosState.data || null)

  const getTodos = async () => {
    todosState.loading = true

    await useCommonFetch(`/users/${config.public.userId}/todos`, {
      onResponse({ response }) {
        if (isTodosArray(response._data)) todosState.data = response._data
        console.log(response._data)
      },
      onResponseError({ response }) {
        todosState.error = response
        console.error(response)
      }
    })

    todosState.loading = false
  }

  const addTodo = async (payload: INewTodoPayload) => {
    await useClientFetch('/users/6941284/todos', {
      body: {
        ...payload
      }
    })
  }

  return {
    todosState,
    todos,
    getTodos,
    addTodo
  }
})
