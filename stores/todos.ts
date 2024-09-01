import { computed } from 'vue'
import { defineStore } from 'pinia'
import { ETodoStatus } from '~/types/modules'
import type { ComputedRef } from 'vue'
import type { ITodo, INewTodoPayload } from '~/types/modules'
import { isTodo } from '~/utils/todoTypeGuards'

export const useTodosStore = defineStore('todos_store', () => {
  const config = useRuntimeConfig()
  const todosState = useStoreStateInstance<ITodo[]>()

  const completedTodos: ComputedRef<TNullable<ITodo[]>> = computed(() => {
    const data = todosState.data?.filter((item: ITodo) => item.status === ETodoStatus.COMPLETED)
    return data?.length ? data : null
  })

  const pendedTodos: ComputedRef<TNullable<ITodo[]>> = computed(() => {
    const data = todosState.data?.filter((item: ITodo) => item.status === ETodoStatus.PENDING)
    return data?.length ? data : null
  })

  const getTodos = async () => {
    todosState.loading = true

    await useCommonFetch(`/users/${config.public.userId}/todos`, {
      onResponse({ response }) {
        if (isTodosArray(response._data)) todosState.data = response._data
      },
      onResponseError({ response }) {
        todosState.error = response
        console.error(response)
      }
    })

    todosState.loading = false
  }

  const addTodo = async (payload: INewTodoPayload) => {
    try {
      const data = await useClientFetch('/users/6941284/todos', {
        method: 'POST',
        body: payload
      })

      if (isTodo(data)) todosState.data?.unshift(data)
    } catch (e) {
      console.error(e)
    }
  }

  const updateTodo = async (payload: ITodo): Promise<void> => {
    try {
      const data = await useClientFetch('/todos/' + payload.id, {
        method: 'PATCH',
        body: payload
      })

      if (isTodo(data) && todosState.data) {
        const todoIndex = todosState.data?.findIndex((item: ITodo) => item.id === data.id)
        if (todoIndex !== -1 && todoIndex !== undefined) todosState.data[todoIndex] = data
      }
    } catch (e) {
      console.error(e)
    }
  }

  const deleteTodo = async (payload: ITodo): Promise<void> => {
    try {
      await useClientFetch('/todos/' + payload.id, {
        method: 'DELETE'
      })

      const filteredData: TNullable<ITodo[]> =
        todosState.data?.filter((item: ITodo) => item.id !== payload.id) || null

      if (filteredData) todosState.data = filteredData
    } catch (e) {
      console.error(e)
    }
  }

  return {
    todosState,
    completedTodos,
    pendedTodos,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
  }
})
