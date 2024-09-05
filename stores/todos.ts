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
  type TNullable,
  type IUncompletedTodo,
  type ICompletedTodo
} from '~/types'
import { isCompletedTodo, isUncompletedTodo } from '~/utils/typegurads/todos'

export const useTodosStore = defineStore('todos_store', () => {
  // Data
  const todosState = reactive<ITodosStoreState>({
    data: {
      completed: null,
      uncompleted: null
    },
    shownTodos: 0,
    loading: false,
    error: null
  })

  // getters
  const allTodos = computed<TNullable<ITodo[]>>({
    get: () => {
      if (todosState.data.uncompleted && todosState.data.completed)
        return [...todosState.data.uncompleted, ...todosState.data.completed]
      else return null
    },
    set: (value) => {
      const uncompletedTodos = [] as IUncompletedTodo[]
      const completedTodos = [] as ICompletedTodo[]

      value?.forEach((todo) => {
        if (isUncompletedTodo(todo)) uncompletedTodos.push(todo)
        if (isCompletedTodo(todo)) completedTodos.push(todo)
      })

      todosState.data.uncompleted = uncompletedTodos
      todosState.data.completed = completedTodos
    }
  })

  const updateTodo = (todo: ITodo) => {
    const todoIndex = allTodos.value?.findIndex((item: ITodo) => item.id === todo.id)

    if (todoIndex !== -1 && todoIndex !== undefined && allTodos.value) {
      allTodos.value[todoIndex] = todo
    }
  }

  const deleteTodo = (todo: ITodo) => {
    return allTodos.value?.filter((item: ITodo) => item.id !== todo.id)
  }

  // actions
  const getUncompletedTodos = async () => {
    await useServerFetch<IGetResponse<ITodo>>('sync', {
      method: 'POST',
      body: {
        sync_token: '*',
        resource_types: '["items"]'
      },
      onResponse({ response }) {
        todosState.data.uncompleted = response._data.items
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
        todosState.data.completed = response._data.items.map((item: ICompletedTodoRaw) => ({
          ...item,
          checked: true
        }))
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
    allTodos,
    updateTodo,
    deleteTodo,
    getAllTodos,
    getUncompletedTodos,
    getCompletedTodos,
    syncTodoWithServ
  }
})
