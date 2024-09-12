import { v4 as uuidv4 } from 'uuid'
import {
  ERequestCommand,
  type IPostRequestArgs,
  type IPostRequestPayload,
  type IPostRequestPayloadRaw,
  type ITodo
} from '~/types'

export const getTodoPayloadRaw = (): IPostRequestPayloadRaw => {
  return {
    resource_types: ['all'],
    limit_notes: 1,
    sync_token: '*',
    with_dateist_version: 1,
    with_web_static_version: true
  }
}

export const getTodoPayload = (
  name: ERequestCommand,
  args: IPostRequestArgs
): IPostRequestPayload<ERequestCommand> => {
  const payload = getTodoPayloadRaw() as IPostRequestPayload<ERequestCommand>

  payload.commands = [
    {
      type: name,
      uuid: uuidv4(),
      temp_id: name === ERequestCommand.ADD ? '_' + Date.now() : undefined,
      args
    }
  ]

  return payload
}

export const getDeletedTodoId = (todo: ITodo) => {
  return isCompletedTodo(todo) && hasTaskId(todo) ? todo.task_id : todo.id
}
