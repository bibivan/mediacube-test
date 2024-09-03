import { computed, reactive, type WritableComputedRef } from 'vue'
import { defineStore } from 'pinia'
import {
  ERequestStatus,
  ERequestCommand,
  type IGetResponse,
  type IPostRequestPayload,
  type ITodo,
  type ITodosStoreState,
  type IPostResponse,
  type ICompletedTodoRaw,
  type TNullable
} from '~/types'

export const useTodosStore = defineStore('todos_store', () => {
  // Data
  const todosState = reactive<ITodosStoreState<ITodo[]>>({
    data: null,
    loading: false,
    error: null
  })

  // mutations
  const filterBy = (key: keyof ITodo, value: boolean | string) => {
    const data = todosState.data?.filter((item: ITodo) => item[key] === value)
    return data?.length ? data : null
  }

  const reorderTodosData = (isCompleted: boolean, value: TNullable<ITodo[]>) => {
    if (isCompleted) {
      todosState.data = filterBy('checked', !isCompleted)
      value?.forEach((item) => {
        todosState.data?.push(item)
      })
    } else {
      todosState.data = filterBy('checked', isCompleted)
      value?.forEach((item) => {
        todosState.data?.unshift(item)
      })
    }
  }

  const updateTodo = (data: ITodo) => {
    const todoIndex = todosState.data?.findIndex((item: ITodo) => item.id === data.id)
    if (todoIndex !== -1 && todoIndex !== undefined && todosState.data) {
      todosState.data[todoIndex] = data
    }
  }

  const deleteTodo = (data: ITodo) => {
    return todosState.data?.filter((item: ITodo) => item.id !== data.id)
  }

  // getters
  const uncompletedTodos = computed({
    get: () => filterBy('checked', false),
    set: (value) => {
      reorderTodosData(false, value)
    }
  })

  const completedTodos = computed({
    get: () => filterBy('checked', true),
    set: (value) => {
      reorderTodosData(true, value)
    }
  })

  // actions
  const getUncompletedTodos = async () => {
    await useServerFetch<IGetResponse<ITodo>>('sync', {
      method: 'POST',
      body: {
        sync_token: '*',
        resource_types: '["items"]'
      },
      onResponse({ response }) {
        todosState.data = todosState.data
          ? [...response._data.items, ...todosState.data]
          : response._data.items
      },
      onResponseError({ response }) {
        todosState.error = response
        console.error(response)
      }
    })
  }

  const getCompletedTodos = async () => {
    await useServerFetch<Record<'items', ICompletedTodoRaw[]>>('/completed/get_all', {
      method: 'GET',
      onResponse({ response }) {
        response._data.items.forEach((item: ICompletedTodoRaw) => {
          if (!todosState.data) todosState.data = []

          todosState.data?.push({
            ...item,
            checked: true
          })
        })
      },
      onResponseError({ response }) {
        todosState.error = response
        console.error(response)
      }
    })
  }

  const getAllTodos = async () => {
    todosState.loading = true
    await Promise.all([getUncompletedTodos(), getCompletedTodos()])
    todosState.loading = false
  }

  const syncTodoWithServ = async (
    payload: IPostRequestPayload<ERequestCommand>
  ): Promise<ERequestStatus> => {
    try {
      const data: IPostResponse = await useClientFetch('sync', {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      return checkPostResponse(data, 'Дело успешно добавлено')
    } catch (e) {
      return handleRequestError(e, 'Произошла ошибка при добавлении дела')
    }
  }

  return {
    todosState,
    uncompletedTodos,
    completedTodos,
    reorderTodosData,
    filterBy,
    updateTodo,
    deleteTodo,
    getAllTodos,
    getUncompletedTodos,
    getCompletedTodos,
    syncTodoWithServ
  }
})
