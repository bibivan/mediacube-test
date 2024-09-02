<script setup lang="ts">
import {
  ERequestStatus,
  ETodoStatus,
  type ITodo,
  type ITodoItemState,
  type IUpdatedTodoPayload,
  type TNullable
} from '~/types'
import type { ComputedRef, WritableComputedRef } from 'vue'
import { isTodo } from '~/utils/typegurads/todo'
import { imageMeta } from 'image-meta'

const props = defineProps<{
  data: ITodo
}>()

// const { updateTodo, deleteTodo, saveTodo } = useTodosStore()
// const state = reactive<ITodoItemState>({
//   todoTitle: props.data.title,
//   todoStatus: props.data.status === ETodoStatus.COMPLETED,
//   isEditing: false,
//   isLoading: false,
//   requestFailed: false
// })
//
// const pendRequest = async (func: (arg: ITodo) => Promise<ERequestStatus>, payload: ITodo) => {
//   if (payload) {
//     console.log('in request', payload)
//     state.isLoading = true
//     updateTodo(payload)
//     const requestResult = await func(payload)
//
//     if (requestResult === ERequestStatus.FAILED) {
//       state.requestFailed = true
//       updateTodo(props.data)
//       state.requestFailed = false
//     }
//
//     state.isEditing = false
//     state.isLoading = false
//   }
// }
//
// const handleUpdateTodo = () => {
//   pendRequest(saveTodo, {
//     id: props.data.id,
//     user_id: props.data.user_id,
//     due_on: props.data.due_on,
//     status: state.todoStatus ? ETodoStatus.COMPLETED : ETodoStatus.PENDING,
//     title: state.todoTitle
//   })
// }
//
// const handleResetTodo = () => {
//   if (props.data) {
//     state.todoTitle = props.data.title
//     state.isEditing = false
//   }
// }
//
// const handleEditTodo = () => (state.isEditing = true)
// const handleDeleteTodo = () => pendRequest(deleteTodo, props.data)
//
// watch(
//   () => props.data,
//   () => {
//     state.todoStatus = props.data.status === ETodoStatus.COMPLETED
//     state.todoTitle = props.data.title
//   },
//   { deep: true }
// )
</script>

<template>
  <div>{{ data.content }}</div>
  <!--  <div-->
  <!--    v-if="data"-->
  <!--    class="todo-item"-->
  <!--    :class="{ loading: state.isLoading }"-->
  <!--  >-->
  <!--    <button class="drag-handler todo-item__btn todo-item__btn_drag" />-->
  <!--    <BaseCheckbox-->
  <!--      :id="'completed_checkbox_' + data.id"-->
  <!--      v-model="state.todoStatus"-->
  <!--      class="todo-item__checkbox"-->
  <!--      :disabled="state.isEditing"-->
  <!--      theme="default"-->
  <!--      type="checkbox"-->
  <!--      @change="handleUpdateTodo"-->
  <!--    />-->
  <!--    <p-->
  <!--      v-if="!state.isEditing"-->
  <!--      class="todo-item__title"-->
  <!--    >-->
  <!--      {{ data.title }}-->
  <!--    </p>-->
  <!--    <input-->
  <!--      v-if="state.isEditing"-->
  <!--      v-model="state.todoTitle"-->
  <!--      class="todo-item__input input"-->
  <!--      type="text"-->
  <!--    />-->
  <!--    <div class="todo-item__actions">-->
  <!--      <button-->
  <!--        v-if="state.isEditing"-->
  <!--        class="todo-item__btn todo-item__btn_save"-->
  <!--        :disabled="!state.todoTitle"-->
  <!--        @click="handleUpdateTodo"-->
  <!--      />-->
  <!--      <button-->
  <!--        v-if="state.isEditing"-->
  <!--        class="todo-item__btn todo-item__btn_reset"-->
  <!--        @click="handleResetTodo"-->
  <!--      />-->
  <!--      <button-->
  <!--        v-if="!state.isEditing"-->
  <!--        class="todo-item__btn todo-item__btn_edit"-->
  <!--        @click="handleEditTodo"-->
  <!--      />-->
  <!--      <button-->
  <!--        class="todo-item__btn todo-item__btn_delete"-->
  <!--        @click="handleDeleteTodo"-->
  <!--      />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped lang="scss">
@import 'todo-item';
</style>
