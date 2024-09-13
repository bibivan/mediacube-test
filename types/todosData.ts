import type { TNullable } from '~/types/common'

export enum EShownTodos {
  ALL,
  UNCOMPLETED,
  COMPLETED
}

export enum ETodosStatus {
  COMPLETED = 'completed',
  UNCOMPLETED = 'uncompleted'
}

export interface ITodosStoreState {
  data: {
    completed: TNullable<ICompletedTodo[]>
    uncompleted: TNullable<IUncompletedTodo[]>
  }
  shownTodos: EShownTodos
  loading: boolean
  error: unknown
  syncToken: string
}

export interface IUncompletedTodo {
  content: string
  checked: boolean
  child_order: number
  id: string
}

export interface ICompletedTodoRaw {
  content: string
  checked: boolean
  id: string
  task_id: string
}

export interface ICompletedTodo extends ICompletedTodoRaw {
  checked: boolean
}

export type ITodo = ICompletedTodo | IUncompletedTodo

export interface ITodoItemState {
  todoTitle: string
  isEditing: boolean
  isLoading: boolean
  isChecked: boolean
}
