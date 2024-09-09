import { v4 as uuidv4 } from 'uuid'
import {
  ERequestCommand,
  ERequestStatus,
  ETodoStatus,
  type IPostRequestArgs,
  type IPostRequestPayload,
  type IPostResponse,
  type ITodo
} from '~/types'

export const getTodoPayload = (
  name: ERequestCommand,
  args: IPostRequestArgs
): IPostRequestPayload<ERequestCommand> => {
  return {
    commands: [
      {
        type: name,
        uuid: uuidv4(),
        temp_id: ERequestCommand.ADD ? uuidv4() : undefined,
        args
      }
    ]
  }
}

export const checkPostResponse = (
  res: IPostResponse,
  message: string
): ERequestStatus.SUCCESS | never => {
  const status: ERequestStatus.SUCCESS = Object.values(res.sync_status)[0]

  if (status === ERequestStatus.SUCCESS) {
    useNuxtApp().$toast(message)
    return ERequestStatus.SUCCESS
  } else throw new Error('Ошибка сервера')
}

export const handleRequestError = (e: unknown, message: string): ERequestStatus.FAILED => {
  console.error(e)
  useNuxtApp().$toast(message)
  return ERequestStatus.FAILED
}

export const getTodoStatus = (status: ITodo['checked']): ETodoStatus => {
  return status ? ETodoStatus.COMPLETED : ETodoStatus.UNCOMPLETED
}
