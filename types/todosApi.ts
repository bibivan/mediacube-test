import type { IUncompletedTodo } from '~/types/todosData'
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
  | IUpdateRequestArgs
  | IReorderRequestArgs
  | IDeleteRequestArgs

export interface IPostRequestPayload<T extends ERequestCommand> {
  commands: [
    {
      type: ERequestCommand
      uuid: string
      temp_id?: string
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
  ]
}
