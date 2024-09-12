import type { ICompletedTodo, ITodo, IUncompletedTodo } from '~/types'

export const isUncompletedTodo = (todo: ITodo): todo is IUncompletedTodo => !todo.checked
export const isCompletedTodo = (todo: ITodo): todo is ICompletedTodo => todo.checked
export const hasTaskId = (todo: ITodo) => 'task_id' in todo
export const isUncompletedTodosArr = (todos: unknown): todos is IUncompletedTodo[] => {
  if (!Array.isArray(todos)) return false
  let isCorrectArr = true

  todos.forEach((todo) => {
    if (!todo.checked) isCorrectArr = todo.checked
  })

  return isCorrectArr
}
