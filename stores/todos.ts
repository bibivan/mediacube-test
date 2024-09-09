import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getTodoStatus } from '~/utils'
import { isCompletedTodo, isUncompletedTodo } from '~/utils/typegurads/todos'
import {
  ERequestStatus,
  ERequestCommand,
  ETodoStatus,
  type TNullable,
  type IGetResponse,
  type IPostRequestPayload,
  type IPostResponse,
  type ITodosStoreState,
  type IUncompletedTodo,
  type ICompletedTodoRaw,
  type ICompletedTodo,
  type ITodo
} from '~/types'

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

      todosState.data.uncompleted = uncompletedTodos.length ? uncompletedTodos : null
      todosState.data.completed = completedTodos.length ? completedTodos : null
    }
  })

  // mutations
  const updateTodo = (todo: ITodo) => {
    const todosType: ETodoStatus = getTodoStatus(todo.checked)

    const currentTodos =
      todosType === ETodoStatus.COMPLETED ? todosState.data.completed : todosState.data.uncompleted

    if (currentTodos) {
      const updatedTodos = currentTodos.map((item: ITodo) => {
        return item.id === todo.id ? todo : item
      })

      if (todosType === ETodoStatus.COMPLETED) {
        todosState.data.completed = updatedTodos as ICompletedTodo[]
      } else {
        todosState.data.uncompleted = updatedTodos as IUncompletedTodo[]
      }
    }
  }

  const moveByStatus = (todo: ITodo) => {
    const prevTodoStatus: ETodoStatus = getTodoStatus(!todo.checked)

    todosState.data[prevTodoStatus]?.filter((item: ITodo) => item.id !== todo.id)

    if (isCompletedTodo(todo)) todosState.data[ETodoStatus.COMPLETED]?.push(todo)
    if (isUncompletedTodo(todo)) todosState.data[ETodoStatus.UNCOMPLETED]?.push(todo)
  }

  const deleteTodo = (todo: ITodo) => {
    const todosType: ETodoStatus = getTodoStatus(todo.checked)

    const filterTodos = <T extends ITodo>(
      todos: TNullable<T[]>,
      todoId: string
    ): TNullable<T[]> => {
      return todos?.filter((item: T) => item.id !== todoId) || null
    }

    if (todosType === ETodoStatus.COMPLETED) {
      todosState.data.completed = filterTodos(todosState.data.completed, todo.id)
    } else {
      todosState.data.uncompleted = filterTodos(todosState.data.uncompleted, todo.id)
    }
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

      return checkPostResponse(data, 'Данные успешно обновлены')
    } catch (e) {
      return handleRequestError(e, 'Что-то пошло не так...')
    }
  }

  return {
    todosState,
    allTodos,
    moveByStatus,
    updateTodo,
    deleteTodo,
    getAllTodos,
    getUncompletedTodos,
    getCompletedTodos,
    syncTodoWithServ
  }
})
