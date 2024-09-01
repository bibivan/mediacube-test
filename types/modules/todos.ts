export enum ETodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
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
