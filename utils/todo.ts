import { v4 as uuidv4 } from 'uuid'
import { ERequestCommand, type IRequestArgs, type IRequestPayload } from '~/types'

export const getTodoPayload = (
  name: ERequestCommand,
  args: IRequestArgs
): IRequestPayload<ERequestCommand> => {
  return {
    type: name,
    uuid: uuidv4(),
    args
  }
}
