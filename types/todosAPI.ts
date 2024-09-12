import type { IUncompletedTodo, ITodo } from '~/types/todosData'
import type { ERequestStatus } from '~/types/common'

export enum ERequestCommand {
  ADD = 'item_add',
  COMPLETE = 'item_complete',
  UNCOMPLETE = 'item_uncomplete',
  UPDATE = 'item_update',
  REORDER = 'item_reorder',
  DELETE = 'item_delete'
}

export interface IGetResponse<T> {
  items: T[]
}

export interface IPostResponse {
  sync_status: { [key: string]: ERequestStatus.SUCCESS }
  sync_token: string
  items: ITodo[]
  temp_id_mapping: { [key: string]: string }
}

export interface IAddRequestArgs {
  content: string
}

export interface ICompleteRequestArgs {
  id: string
  date_completed: string
}

export interface IUncompleteRequestArgs {
  id: string
}

export interface IUpdateRequestArgs {
  content: string
  id: string
}

export interface IReorderRequestArgs {
  items: Pick<IUncompletedTodo, 'id' | 'child_order'>[]
}

export interface IDeleteRequestArgs {
  id: string
}

export type IPostRequestArgs =
  | IAddRequestArgs
  | ICompleteRequestArgs
  | IUncompleteRequestArgs
  | IUpdateRequestArgs
  | IReorderRequestArgs
  | IDeleteRequestArgs

export interface IPostRequestCommand<T extends ERequestCommand> {
  type: ERequestCommand
  uuid: string
  temp_id: T extends ERequestCommand.ADD ? string : undefined
  args: T extends ERequestCommand.ADD
    ? IAddRequestArgs
    : T extends ERequestCommand.COMPLETE
      ? ICompleteRequestArgs
      : T extends ERequestCommand.UNCOMPLETE
        ? IUncompleteRequestArgs
        : T extends ERequestCommand.UPDATE
          ? IUpdateRequestArgs
          : T extends ERequestCommand.REORDER
            ? IReorderRequestArgs
            : IDeleteRequestArgs
}

export interface IPostRequestPayloadRaw {
  sync_token: string
  limit_notes: number
  resource_types: ['all']
  with_dateist_version: number
  with_web_static_version: boolean
}

export interface IPostRequestPayload<T extends ERequestCommand> extends IPostRequestPayloadRaw {
  commands: IPostRequestCommand<T>[]
}
