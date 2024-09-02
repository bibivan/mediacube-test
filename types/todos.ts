import type { TNullable } from '~/types/common'

export enum ETodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface ITodosStoreState<T> {
  data: TNullable<T>
  loading: boolean
  shownByStatus: TNullable<ETodoStatus>
  error: unknown
}

export interface ITodo {
  id: number
  user_id: number
  title: string
  due_on: TNullable<string>
  status: ETodoStatus
}

// todo: убрать мусор, если не пригодится
export interface INewTodoPayload {
  title: TNullable<string>
  status: ETodoStatus
}

export interface IUpdatedTodoPayload {
  id: number
  user_id: number
  title: string
  due_on: TNullable<string>
  status: boolean
}

export interface ITodoItemState {
  todoTitle: string
  todoStatus: boolean
  isEditing: boolean
  isLoading: boolean
  requestFailed: boolean
}
