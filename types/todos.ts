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
