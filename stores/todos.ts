import { computed, reactive, type WritableComputedRef } from 'vue'
import { defineStore } from 'pinia'
import {
  ERequestStatus,
  ETodoStatus,
  type IGetResponse,
  type IRequestPayload,
  type INewTodoPayload,
  type ITodo,
  type ITodosStoreState,
  type TNullable
} from '~/types'
import type { ComputedRef } from 'vue'
import { isTodo } from '~/utils/typegurads/todo'

export const useTodosStore = defineStore('todos_store', () => {
  const syncToken = useCookie('syncToken', { default: () => '*' })
  const todosState = reactive<ITodosStoreState<ITodo[]>>({
    data: null,
    loading: false,
    shownByStatus: null,
    error: null
  })

  const filterByStatus = (status: boolean = true) => {
    const data = todosState.data?.filter((item: ITodo) => item.checked === status)
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
      return filterByStatus()
    }

    if (todosState.shownByStatus === ETodoStatus.PENDING) {
      return filterByStatus()
    }

    return todosState.data
  })

  const completedTodosCount = computed(() => {
    const todos = filterByStatus()
    return todos?.length ? todos.length : 0
  })

  const uncompletedTodosCount = computed(() => {
    const todos = filterByStatus()
    return todos?.length ? todos.length : 0
  })

  const getTodos = async () => {
    todosState.loading = true

    await useServerFetch<IGetResponse<ITodo>>('sync', {
      method: 'POST',
      body: {
        sync_token: '*',
        resource_types: '["items"]'
      },
      onResponse({ response }) {
        todosState.data = response._data.items
        syncToken.value = response._data.sync_token
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
      const data = await useClientFetch('', {
        method: 'POST',
        body: {
          commands: `
          [
    {
        "type": "item_add", 
        "uuid": "997d4b43-55f1-48a9-9e66-de5785dfd69b", 
        "args": {
            "content": "Buy Milk", 
            "project_id": "2203306141",
            "labels": ["Food", "Shopping"]
        }
    }]`
        }
      })

      console.log(data)

      // if (isTodo(data)) todosState.data?.unshift(data)
      useNuxtApp().$toast('Дело успешно добавлено')
      return ERequestStatus.SUCCESS
    } catch (e) {
      console.error(e)
      useNuxtApp().$toast('Произошла ошибка при добавлении дела')
      return ERequestStatus.FAILED
    }
  }

  // const saveTodo = async (payload: ITodo): Promise<ERequestStatus> => {
  //   try {
  //     await useClientFetch('/todos/' + payload.id, {
  //       method: 'PATCH',
  //       body: payload
  //     })
  //
  //     return ERequestStatus.SUCCESS
  //   } catch (e) {
  //     console.error(e)
  //     useNuxtApp().$toast('Произошла ошибка при обновлении дела')
  //     return ERequestStatus.FAILED
  //   }
  // }
  //
  // const deleteTodo = async (payload: ITodo): Promise<ERequestStatus> => {
  //   try {
  //     await useClientFetch('/todos/' + payload.id, {
  //       method: 'DELETE'
  //     })
  //
  //     const filteredData: TNullable<ITodo[]> =
  //       todosState.data?.filter((item: ITodo) => item.id !== payload.id) || null
  //
  //     if (filteredData) todosState.data = filteredData
  //     return ERequestStatus.SUCCESS
  //   } catch (e) {
  //     console.error(e)
  //     useNuxtApp().$toast('Произошла ошибка при удалении дела')
  //     return ERequestStatus.FAILED
  //   }
  // }
  //
  // const completedAllTodos = async () => {
  //   todosState.loading = true
  //   await Promise.all(
  //     todosState.data?.map((item: ITodo) => {
  //       item.status = ETodoStatus.COMPLETED
  //       return saveTodo(item)
  //     }) as Iterable<ERequestStatus>
  //   )
  //   console.log('ehre')
  //   todosState.loading = false
  // }
  //
  // const deleteCompletedTodos = async () => {
  //   todosState.loading = true
  //   await Promise.all(
  //     todosState.data?.map((item) => {
  //       if (item.status === ETodoStatus.COMPLETED) return deleteTodo(item)
  //       else return deleteTodo(item)
  //     }) as Iterable<ERequestStatus>
  //   )
  //
  //   todosState.data = null
  //   todosState.loading = false
  // }

  return {
    todosState,
    shownTodos,
    completedTodosCount,
    uncompletedTodosCount,
    filterByStatus,
    updateTodo,
    getTodos,
    addTodo
    // saveTodo,
    // deleteTodo,
    // completedAllTodos,
    // deleteCompletedTodos
  }
})
