import type { ITodo } from '~/types/todos'

export enum ERequestCommand {
  ADD = 'item_add',
  UPDATE = 'item_update',
  REORDER = 'item_reorder',
  DELETE = 'item_delete'
}

export interface IGetResponse<T> {
  full_sync: true
  items: T[]
  sync_token: string
  temp_id_mapping: Record<PropertyKey, unknown>
}

export interface IAddRequestArgs {
  content: string
}

export interface IUpdateRequestArgs {
  content: string
  id: string
  [key: string]: string | string[]
}

export interface IReorderRequestArgs {
  items: Pick<ITodo, 'id' | 'child_order'>[]
}

export interface IDeleteRequestArgs {
  id: string
}

export type IRequestArgs =
  | IAddRequestArgs
  | IUpdateRequestArgs
  | IReorderRequestArgs
  | IDeleteRequestArgs

export interface IRequestPayload<T extends ERequestCommand> {
  type: ERequestCommand
  uuid: string
  args: T extends ERequestCommand.ADD
    ? IAddRequestArgs
    : T extends ERequestCommand.UPDATE
      ? IUpdateRequestArgs
      : T extends ERequestCommand.REORDER
        ? IReorderRequestArgs
        : IDeleteRequestArgs
}
