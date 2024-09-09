<script setup lang="ts">
import {
  ERequestCommand,
  ERequestStatus,
  type IPostRequestPayload,
  type ITodo,
  type ITodoItemState
} from '~/types'

const props = defineProps<{
  data: ITodo
}>()

const emit = defineEmits<{
  onUpdateTodo: [ITodo]
}>()

const proxyTodo = computed({
  get: () => props.data,
  set: (value) => emit('onUpdateTodo', value)
})

const { deleteTodo, moveByStatus, syncTodoWithServ } = useTodosStore()
const state = reactive<ITodoItemState>({
  todoTitle: props.data.content,
  isEditing: false,
  isLoading: false
})

const sendRequest = async (payload: IPostRequestPayload<ERequestCommand>) => {
  if (payload) {
    state.isLoading = true
    const status = await syncTodoWithServ(payload)

    state.isEditing = false
    state.isLoading = false

    return status
  }
}

const handleEditTodo = () => (state.isEditing = true)

const handleResetEditing = () => {
  state.todoTitle = proxyTodo.value.content
  state.isEditing = false
}

const handleUpdateTodo = async () => {
  const oldTodoContent = proxyTodo.value.content
  proxyTodo.value.content = state.todoTitle

  const payload = getTodoPayload(ERequestCommand.UPDATE, {
    content: proxyTodo.value.content,
    id: proxyTodo.value.id
  })

  const requestStatus = await sendRequest(payload)
  if (requestStatus !== ERequestStatus.SUCCESS) proxyTodo.value.content = oldTodoContent
}

const handleChangeTodoStatus = async () => {
  let payload

  if (!proxyTodo.value.checked && 'task_id' in proxyTodo.value) {
    payload = getTodoPayload(ERequestCommand.UNCOMPLETE, {
      id: proxyTodo.value.task_id
    })
  } else {
    payload = getTodoPayload(ERequestCommand.COMPLETE, {
      id: proxyTodo.value.id,
      date_completed: new Date().toISOString()
    })
  }

  const requestStatus = await sendRequest(payload)
  if (requestStatus !== ERequestStatus.SUCCESS) {
    proxyTodo.value.checked = !proxyTodo.value.checked
    moveByStatus(proxyTodo.value)
  }
}

const handleDeleteTodo = async () => {
  const payload = getTodoPayload(ERequestCommand.DELETE, {
    id: proxyTodo.value.id
  })

  const requestStatus = await sendRequest(payload)

  if (requestStatus === ERequestStatus.SUCCESS) {
    console.log('here')
    deleteTodo(proxyTodo.value)
  }
}
</script>

<template>
  <div
    v-if="data"
    class="todo-item"
    :class="{ loading: state.isLoading }"
  >
    <button class="drag-handler todo-item__btn todo-item__btn_drag" />
    <BaseCheckbox
      :id="'completed_checkbox_' + proxyTodo.id"
      v-model="proxyTodo.checked"
      class="todo-item__checkbox"
      :disabled="state.isEditing"
      theme="default"
      type="checkbox"
      @change="handleChangeTodoStatus"
    />
    <p
      v-if="!state.isEditing"
      class="todo-item__title"
    >
      {{ proxyTodo.content }}
    </p>
    <input
      v-if="state.isEditing"
      v-model="state.todoTitle"
      class="todo-item__input input"
      type="text"
    />
    <div class="todo-item__actions">
      <button
        v-if="state.isEditing"
        class="todo-item__btn todo-item__btn_save"
        :disabled="!state.todoTitle"
        @click="handleUpdateTodo"
      />
      <button
        v-if="state.isEditing"
        class="todo-item__btn todo-item__btn_reset"
        @click="handleResetEditing"
      />
      <button
        v-if="!state.isEditing"
        class="todo-item__btn todo-item__btn_edit"
        @click="handleEditTodo"
      />
      <button
        class="todo-item__btn todo-item__btn_delete"
        @click="handleDeleteTodo"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'todo-item';
</style>
