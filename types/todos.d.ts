declare interface ITodo {
  id: number
  user_id: number
  title: string
  due_on: string
  status: ETodoStatus
}

declare interface INewTodoPayload {
  title: TNullable<string>
  due_on: TNullable<string>
  status: TNullable<ETodoStatus>
}
