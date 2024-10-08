<script setup lang="ts">
import {
  ERequestCommand,
  ERequestStatus,
  type IPostRequestPayload,
  type ITodo,
  type ITodoItemState
} from '~/types'
import SvgTrash from '~/components/svg/SvgTrash.vue'

const props = defineProps<{
  data: ITodo
}>()

const { syncTodoWithServ } = useTodosStore()
const state = reactive<ITodoItemState>({
  todoTitle: props.data.content,
  isChecked: props.data.checked,
  isEditing: false,
  isLoading: false
})

const sendRequest = async (
  payload: IPostRequestPayload<ERequestCommand>
): Promise<ERequestStatus> => {
  if (payload) {
    state.isLoading = true
    const status = await syncTodoWithServ(payload)

    state.isEditing = false
    state.isLoading = false

    return status
  }

  return ERequestStatus.FAILED
}

const handleEditTodo = () => (state.isEditing = true)

const handleResetEditing = () => {
  state.todoTitle = props.data.content
  state.isEditing = false
}

const handleUpdateTodo = async () => {
  const payload = getTodoPayload(ERequestCommand.UPDATE, {
    content: state.todoTitle,
    id: props.data.id
  })

  const result: ERequestStatus = await sendRequest(payload)
  if (result === ERequestStatus.FAILED) state.todoTitle = props.data.content
}

const handleChangeTodoStatus = async (event: Event) => {
  let payload
  const isChecked = (event.target as HTMLInputElement).checked

  if (isChecked) {
    payload = getTodoPayload(ERequestCommand.COMPLETE, {
      id: props.data.id,
      date_completed: new Date().toISOString()
    })
  } else {
    payload = getTodoPayload(ERequestCommand.UNCOMPLETE, {
      id: getDeletedTodoId(props.data)
    })
  }

  const result: ERequestStatus = await sendRequest(payload)
  if (result === ERequestStatus.FAILED) state.isChecked = !isChecked
}

const handleDeleteTodo = async () => {
  const payload = getTodoPayload(ERequestCommand.DELETE, {
    id: getDeletedTodoId(props.data)
  })

  await sendRequest(payload)
}
</script>

<template>
  <div
    v-if="data"
    class="todos-item"
    :class="{ loading: state.isLoading, 'todos-item_checked': data.checked }"
  >
    <button class="drag-handler todos-item__btn todos-item__btn_drag">
      <SvgDragHandler />
    </button>
    <BaseCheckbox
      :id="'completed_checkbox_' + data.id"
      v-model="state.isChecked"
      class="todos-item__checkbox"
      :disabled="state.isEditing"
      theme="default"
      type="checkbox"
      @change="handleChangeTodoStatus"
    />
    <p
      v-if="!state.isEditing"
      class="todos-item__title"
    >
      {{ data.content }}
    </p>
    <input
      v-if="state.isEditing"
      v-model="state.todoTitle"
      class="todos-item__input input"
      type="text"
    />
    <div class="todos-item__actions">
      <button
        v-if="state.isEditing"
        class="todos-item__btn todos-item__btn_save"
        :disabled="!state.todoTitle"
        @click="handleUpdateTodo"
      >
        <SvgCheckmark />
      </button>
      <button
        v-if="state.isEditing"
        class="todos-item__btn todos-item__btn_reset"
        @click="handleResetEditing"
      >
        <SvgCross />
      </button>
      <button
        v-if="!state.isEditing && !data.checked"
        class="todos-item__btn todos-item__btn_edit"
        @click="handleEditTodo"
      >
        <SvgPencil />
      </button>
      <button
        class="todos-item__btn todos-item__btn_delete"
        @click="handleDeleteTodo"
      >
        <SvgTrash />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'todos-item';
</style>
