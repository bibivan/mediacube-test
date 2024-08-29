declare type TNullable<T> = T | null

declare type TDefaultState<T extends any = any> = {
  data: TNullable<T>
  loading: boolean
  error: unknown
}

declare module 'lodash'
declare module 'dayjs'
