import { computed, reactive, type WritableComputedRef } from 'vue'
import { defineStore } from 'pinia'
import {
  ERequestStatus,
  ETodoStatus,
  type ITodosStoreState,
  type IUpdatedTodoPayload,
  type TDefaultStoreState
} from '~/types'
import type { ComputedRef } from 'vue'
import type { TNullable, ITodo, INewTodoPayload } from '~/types'
import { isTodo } from '~/utils/todoTypeGuards'

export const useTodosStore = defineStore('todos_store', () => {
  const config = useRuntimeConfig()
  const todosState = reactive<ITodosStoreState<ITodo[]>>({
    data: null,
    loading: false,
    shownByStatus: null,
    error: null
  })

  const filterByStatus = (status: ETodoStatus) => {
    const data = todosState.data?.filter((item: ITodo) => item.status === status)
    return data?.length ? data : null
  }

  const updateTodo = (data: ITodo) => {
    const todoIndex = todosState.data?.findIndex((item: ITodo) => item.id === data.id)
    if (todoIndex !== -1 && todoIndex !== undefined && todosState.data) {
      todosState.data[todoIndex] = data
    }
  }

  const shownTodos: WritableComputedRef<TNullable<ITodo[]>> = computed(() => {
    if (todosState.shownByStatus === ETodoStatus.COMPLETED) {
      return filterByStatus(ETodoStatus.COMPLETED)
    }

    if (todosState.shownByStatus === ETodoStatus.PENDING) {
      return filterByStatus(ETodoStatus.PENDING)
    }

    return todosState.data
  })

  const completedTodosCount = computed(() => {
    const todos = filterByStatus(ETodoStatus.COMPLETED)
    return todos?.length ? todos.length : 0
  })

  const uncompletedTodosCount = computed(() => {
    const todos = filterByStatus(ETodoStatus.PENDING)
    return todos?.length ? todos.length : 0
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

  const addTodo = async (payload: INewTodoPayload): Promise<ERequestStatus> => {
    try {
      const data = await useClientFetch(`/users/${config.public.userId}/todos`, {
        method: 'POST',
        body: payload
      })

      if (isTodo(data)) todosState.data?.unshift(data)
      useNuxtApp().$toast('Дело успешно добавлено')
      return ERequestStatus.SUCCESS
    } catch (e) {
      console.error(e)
      useNuxtApp().$toast('Произошла ошибка при добавлении дела')
      return ERequestStatus.FAILED
    }
  }

  const saveTodo = async (payload: ITodo): Promise<ERequestStatus> => {
    try {
      await useClientFetch('/todos/' + payload.id, {
        method: 'PATCH',
        body: payload
      })

      return ERequestStatus.SUCCESS
    } catch (e) {
      console.error(e)
      useNuxtApp().$toast('Произошла ошибка при обновлении дела')
      return ERequestStatus.FAILED
    }
  }

  const deleteTodo = async (payload: ITodo): Promise<ERequestStatus> => {
    try {
      await useClientFetch('/todos/' + payload.id, {
        method: 'DELETE'
      })

      const filteredData: TNullable<ITodo[]> =
        todosState.data?.filter((item: ITodo) => item.id !== payload.id) || null

      if (filteredData) todosState.data = filteredData
      return ERequestStatus.SUCCESS
    } catch (e) {
      console.error(e)
      useNuxtApp().$toast('Произошла ошибка при удалении дела')
      return ERequestStatus.FAILED
    }
  }

  const completedAllTodos = async () => {
    todosState.loading = true
    await Promise.all(
      todosState.data?.map((item: ITodo) => {
        item.status = ETodoStatus.COMPLETED
        return saveTodo(item)
      }) as Iterable<ERequestStatus>
    )
    console.log('ehre')
    todosState.loading = false
  }

  const deleteCompletedTodos = async () => {
    todosState.loading = true
    await Promise.all(
      todosState.data?.map((item) => {
        if (item.status === ETodoStatus.COMPLETED) return deleteTodo(item)
        else return deleteTodo(item)
      }) as Iterable<ERequestStatus>
    )

    todosState.data = null
    todosState.loading = false
  }

  return {
    todosState,
    shownTodos,
    completedTodosCount,
    uncompletedTodosCount,
    filterByStatus,
    updateTodo,
    getTodos,
    addTodo,
    saveTodo,
    deleteTodo,
    completedAllTodos,
    deleteCompletedTodos
  }
})
