<script setup lang="ts">
import { ERequestCommand, EShownTodos, type IPostRequestPayload } from '~/types'
import { v4 as uuidv4 } from 'uuid'

const { todosState, syncTodoWithServ } = useTodosStore()

const handleClearAllDone = async () => {
  todosState.loading = true
  if (todosState.data.completed) {
    const payload = getTodoPayloadRaw() as IPostRequestPayload<ERequestCommand>

    payload.commands = todosState.data.completed.map((item) => ({
      type: ERequestCommand.DELETE,
      uuid: uuidv4(),
      temp_id: undefined,
      args: { id: getDeletedTodoId(item) }
    }))

    await syncTodoWithServ(payload)
  }

  todosState.loading = false
}

const handleCheckAll = async () => {
  todosState.loading = true
  if (todosState.data.uncompleted) {
    const payload = getTodoPayloadRaw() as IPostRequestPayload<ERequestCommand>

    payload.commands = todosState.data.uncompleted.map((item) => ({
      type: ERequestCommand.COMPLETE,
      uuid: uuidv4(),
      temp_id: undefined,
      args: {
        id: item.id,
        date_completed: new Date().toISOString()
      }
    }))

    await syncTodoWithServ(payload)
  }

  todosState.loading = false
}
</script>

<template>
  <div>
    <div
      v-if="todosState.data.completed?.length || todosState.data.uncompleted?.length"
      class="todo-actions"
      :class="{ 'todo-actions_events-none': todosState.loading }"
    >
      <button
        class="todo-actions__action todo-actions__action_check"
        :class="{
          'todo-actions__action_hidden': !todosState.data.uncompleted?.length
        }"
        @click="handleCheckAll"
      >
        Check all
      </button>

      <button
        class="todo-actions__action"
        :class="{ 'todo-actions__action_active': !todosState.shownTodos }"
        @click="todosState.shownTodos = 0"
      >
        All
      </button>
      <button
        v-show="todosState.data.completed"
        class="todo-actions__action"
        :class="{
          'todo-actions__action_active': todosState.shownTodos === EShownTodos.COMPLETED
        }"
        @click="todosState.shownTodos = EShownTodos.COMPLETED"
      >
        Completed
      </button>
      <button
        class="todo-actions__action"
        :class="{
          'todo-actions__action_active': todosState.shownTodos === EShownTodos.UNCOMPLETED
        }"
        @click="todosState.shownTodos = EShownTodos.UNCOMPLETED"
      >
        Pending
      </button>

      <button
        class="todo-actions__action todo-actions__action_clear"
        :class="{
          'todo-actions__action_hidden': todosState.data.uncompleted?.length
        }"
        @click="handleClearAllDone"
      >
        Clear completed
      </button>
    </div>
    <div
      v-if="!todosState.data.completed?.length && !todosState.data.uncompleted?.length"
      class="no-todos-message"
    >
      Congrat, you have no more tasks to do
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'todo-actions';
</style>
