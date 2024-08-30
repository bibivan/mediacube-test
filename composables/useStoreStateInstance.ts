import { reactive } from 'vue'

export const useStoreStateInstance = <T>() => {
  return reactive<TDefaultState<T>>({
    data: null,
    loading: false,
    error: null
  })
}
