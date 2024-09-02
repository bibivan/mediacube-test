import { ETodoStatus, type ITodo } from '~/types'

export const isTodoStatus = (value: unknown): value is ETodoStatus => {
  return Object.values(ETodoStatus).includes(value as ETodoStatus)
}

export const isTodo = (item: unknown): item is ITodo => {
  if (!isObject(item)) return false

  return (
    typeof item === 'object' &&
    typeof item.id === 'number' &&
    typeof item.user_id === 'number' &&
    typeof item.title === 'string' &&
    (typeof item.due_on === 'string' || item.due_on === null) &&
    isTodoStatus(item.status)
  )
}

export const isKeyOfITodo = (key: string): key is keyof ITodo => {
  return key === 'title' || key === 'completed'
}

export const isTodosArray = (items: unknown): items is ITodo[] => {
  if (Array.isArray(items)) return items.every(isTodo)
  return false
}
