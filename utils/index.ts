import { v4 as uuidv4 } from 'uuid'
import {
  ERequestCommand,
  ERequestStatus,
  type IPostRequestArgs,
  type IPostRequestPayload,
  type IPostResponse
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
