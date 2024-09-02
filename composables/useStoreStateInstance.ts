import { reactive } from 'vue'
import type { TDefaultStoreState } from '~/types'

export const useStoreStateInstance = <T>() => {
  return reactive<TDefaultStoreState<T>>({
    data: null,
    loading: false,
    error: null
  })
}
