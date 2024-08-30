export const isETodoStatus = (value: unknown): value is ETodoStatus => {
  return Object.values(ETodoStatus).includes(value as ETodoStatus)
}

export const isTodo = (item: unknown): item is ITodo => {
  if (!isObject(item)) return false

  return (
    typeof item === 'object' &&
    typeof item.id === 'number' &&
    typeof item.user_id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.due_on === 'string' &&
    isETodoStatus(item.status)
  )
}

export const isTodosArray = (items: unknown): items is ITodo[] => {
  if (Array.isArray(items)) return items.every(isTodo)
  return false
}
