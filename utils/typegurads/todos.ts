import type { ICompletedTodo, ITodo, IUncompletedTodo } from '~/types'

export const isUncompletedTodo = (todo: ITodo): todo is IUncompletedTodo => !todo.checked
export const isCompletedTodo = (todo: ITodo): todo is ICompletedTodo => todo.checked
