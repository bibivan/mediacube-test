import type { TNullable } from '~/types/common'

export type TDefaultStoreState<T extends any = any> = {
  data: TNullable<T>
  loading: boolean
  error: unknown
}
