import type { TNullable } from '~/types/common'

export enum EShownTodos {
  ALL,
  UNCOMPLETED,
  COMPLETED
}

export interface ITodosStoreState {
  data: {
    completed: TNullable<ICompletedTodo[]>
    uncompleted: TNullable<IUncompletedTodo[]>
  }
  shownTodos: EShownTodos
  loading: boolean
  error: unknown
}

export interface IUncompletedTodo {
  added_at: string
  added_by_uid: string
  assigned_by_uid: TNullable<string>
  checked: boolean
  child_order: number
  collapsed: boolean
  completed_at: TNullable<string>
  content: string
  day_order: number
  deadline: TNullable<string>
  description: string
  due: TNullable<string>
  duration: TNullable<string>
  id: string
  is_deleted: boolean
  labels: []
  parent_id: TNullable<string>
  priority: number
  project_id: string
  responsible_uid: TNullable<string>
  section_id: TNullable<string>
  sync_id: TNullable<string>
  updated_at: string
  user_id: string
  v2_id: string
  v2_parent_id: TNullable<string>
  v2_project_id: string
  v2_section_id: TNullable<string>
}

export interface ICompletedTodoRaw {
  content: string
  meta_data: TNullable<any>
  user_id: string
  task_id: string
  note_count: number
  project_id: string
  section_id: string
  completed_at: string
  id: string
}

export interface ICompletedTodo extends ICompletedTodoRaw {
  checked: boolean
}

export type ITodo = ICompletedTodo | IUncompletedTodo

export interface ITodoItemState {
  todoTitle: string
  isEditing: boolean
  isLoading: boolean
}
