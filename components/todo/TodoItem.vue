<script setup lang="ts">
import { ETodoStatus, type ITodo } from '~/types/modules'

const props = defineProps<{
  data: ITodo
}>()

const { updateTodo, deleteTodo } = useTodosStore()
const state = reactive<{
  todo: TNullable<ITodo>
  isEditing: boolean
  isUpdating: boolean
  todoIsCompleted: boolean
}>({
  todo: null,
  isEditing: false,
  isUpdating: false,
  todoIsCompleted: false
})

const pendRequest = async (func: (arg: ITodo) => Promise<void>) => {
  if (state.todo) {
    state.isUpdating = true
    await func(state.todo)

    state.isEditing = false
    state.isUpdating = false
  }
}

const handleResetTodo = () => {
  if (state.todo) {
    state.todo.title = props.data.title
    state.isEditing = false
  }
}

const handleEditTodo = () => (state.isEditing = true)
const handleUpdateTodo = () => pendRequest(updateTodo)
const handleDeleteTodo = () => pendRequest(deleteTodo)

watch(
  () => props.data,
  (val: ITodo) => {
    state.todo = Object.assign({}, val)
    state.todoIsCompleted = val.status === ETodoStatus.COMPLETED
  },
  { immediate: true }
)

watch(
  () => state.todoIsCompleted,
  () => {
    if (state.todo && 'status' in state.todo) {
      state.todo.status = state.todoIsCompleted ? ETodoStatus.COMPLETED : ETodoStatus.PENDING
      handleUpdateTodo()
    }
  }
)
</script>

<template>
  <div
    v-if="state.todo"
    class="todo-item"
    :class="{ loading: state.isUpdating }"
  >
    <button class="drag-handler todo-item__btn todo-item__btn_drag" />
    <BaseCheckbox
      :id="'completed_checkbox_' + state.todo.id"
      v-model="state.todoIsCompleted"
      class="todo-item__checkbox"
      theme="default"
      type="checkbox"
    />
    <p
      v-if="!state.isEditing"
      class="todo-item__title"
    >
      {{ state.todo.title }}
    </p>
    <input
      v-if="state.isEditing"
      v-model="state.todo.title"
      class="todo-item__input input"
      type="text"
    />
    <div class="todo-item__handlers">
      <button
        v-if="state.isEditing"
        class="todo-item__btn todo-item__btn_save"
        :disabled="!state.todo.title"
        @click="handleUpdateTodo"
      />
      <button
        v-if="state.isEditing"
        class="todo-item__btn todo-item__btn_reset"
        :disabled="!state.todo.title"
        @click="handleResetTodo"
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
.todo-item {
  @include flex-items-center;
  width: calc(100% - #{$custom-scrollbar-indent});
  gap: 5px;
  height: 20px;

  &:not(:last-child) {
    margin-bottom: 18px;
  }

  &.loading {
    cursor: not-allowed;

    &::before {
      background-color: $color-disable;
    }
  }

  &__title {
    padding: 0 10px;
    font-family: $font-base;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
  }

  &__input {
    height: 20px;
    padding: 9px;
  }

  &__handlers {
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  &__btn {
    width: 16px;
    height: 16px;
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.65;

    &_drag {
      margin-right: 8px;
      cursor: grab;
      opacity: 0;
      background-image: url('/public/img/drag-handler.svg');
    }

    &_save {
      background-image: url('/public/img/checkmark.svg');
    }

    &_reset {
      background-image: url('/public/img/cross.svg');
    }

    &_edit {
      background-image: url('/public/img/pencil.svg');
    }

    &_delete {
      cursor: pointer;
      opacity: 0.7;
      background-image: url('/public/img/trash.svg');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    @include hover {
      &:hover {
        opacity: 1;
      }
    }
  }

  @include hover {
    &:hover &__btn_drag {
      opacity: 0.5;
    }
  }
}
</style>
