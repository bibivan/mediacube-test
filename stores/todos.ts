import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {
  ERequestStatus,
  ERequestCommand,
  type IGetResponse,
  type IPostRequestPayload,
  type IPostResponse,
  type ITodosStoreState,
  type IUncompletedTodo,
  type ICompletedTodoRaw,
  type ICompletedTodo,
  type ITodo,
  type TNullable
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
    error: null,
    syncToken: '*'
  })

  // mutations
  const addUncompletedTodo = (todo: IUncompletedTodo) => todosState.data.uncompleted?.unshift(todo)

  const addCompletedTodo = (todo: ICompletedTodo) => todosState.data.completed?.unshift(todo)

  const updateTodo = (todo: IUncompletedTodo) => {
    todosState.data.uncompleted =
      todosState.data.uncompleted?.map((item) => (item.id === todo.id ? todo : item)) ||
      todosState.data.uncompleted
  }

  const deleteCompletedTodo = (todo: ITodo) => {
    todosState.data.completed =
      todosState.data.completed?.filter((item) => item.task_id !== todo.id) ||
      todosState.data.completed
  }

  const deleteUncompletedTodo = (todo: ITodo) => {
    todosState.data.uncompleted =
      todosState.data.uncompleted?.filter((item) => item.id !== todo.id) ||
      todosState.data.uncompleted
  }

  const sortTodos = () => todosState.data.uncompleted?.sort((a, b) => a.child_order - b.child_order)

  const handleReceivedTodo = (reqType: ERequestCommand, todo: ITodo) => {
    if (reqType === ERequestCommand.ADD && isUncompletedTodo(todo)) {
      addUncompletedTodo(todo)
      sortTodos()
    }
    if (reqType === ERequestCommand.UPDATE && isUncompletedTodo(todo)) {
      updateTodo(todo)
    }
    if (reqType === ERequestCommand.COMPLETE && isCompletedTodo(todo)) {
      todo.task_id = todo.id
      deleteUncompletedTodo(todo)
      addCompletedTodo(todo)
    }
    if (reqType === ERequestCommand.UNCOMPLETE && isUncompletedTodo(todo)) {
      deleteCompletedTodo(todo)
      addUncompletedTodo(todo)
      sortTodos()
    }
    if (reqType === ERequestCommand.DELETE) {
      deleteCompletedTodo(todo)
      deleteUncompletedTodo(todo)
    }
  }

  // actions
  const getUncompletedTodos = async () => {
    await useServerFetch<IGetResponse<ITodo>>('sync', {
      method: 'POST',
      body: {
        sync_token: '*',
        resource_types: ['items']
      },
      onResponse({ response }) {
        todosState.data.uncompleted = response._data.items
        todosState.syncToken = response._data.sync_token
        sortTodos()
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

        todosState.syncToken = response._data.sync_token
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
      payload.sync_token = todosState.syncToken

      const data: IPostResponse = await useClientFetch('sync', {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      todosState.syncToken = data.sync_token
      payload.commands.forEach((command) => {
        if (data.sync_status[command.uuid] === ERequestStatus.SUCCESS) {
          let id: TNullable<string> = null

          if ('id' in command.args) {
            id = command.args.id
          } else if (command.type === ERequestCommand.ADD && command.temp_id) {
            id = data.temp_id_mapping[command.temp_id]
          } else if (
            command.type === ERequestCommand.REORDER &&
            isUncompletedTodosArr(data?.items)
          ) {
            todosState.data.uncompleted = data?.items
          }

          if (id) {
            const todo = data.items.find((item: ITodo) => item.id === id) || data.items[0]
            handleReceivedTodo(command.type, todo)
          }
        } else throw new Error('Ошибка обработки данных')
      })

      useNuxtApp().$toast('Данные успешно обновлены')
      return ERequestStatus.SUCCESS
    } catch (e) {
      console.error(e)
      useNuxtApp().$toast('Что-то пошло не так...')

      return ERequestStatus.FAILED
    }
  }

  return {
    todosState,
    getAllTodos,
    getUncompletedTodos,
    getCompletedTodos,
    syncTodoWithServ
  }
})
