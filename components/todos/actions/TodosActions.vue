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
  <div
    class="todos-actions"
    :class="{ 'todos-actions_events-none': todosState.loading }"
  >
    <button
      class="todos-actions__action todos-actions__action_check"
      :class="{
        'todos-actions__action_hidden': !todosState.data.uncompleted?.length
      }"
      @click="handleCheckAll"
    >
      Check all
    </button>

    <button
      class="todos-actions__action"
      :class="{ 'todos-actions__action_active': !todosState.shownTodos }"
      @click="todosState.shownTodos = 0"
    >
      All
    </button>
    <button
      v-show="todosState.data.completed"
      class="todos-actions__action"
      :class="{
        'todos-actions__action_active': todosState.shownTodos === EShownTodos.COMPLETED
      }"
      @click="todosState.shownTodos = EShownTodos.COMPLETED"
    >
      Completed
    </button>
    <button
      class="todos-actions__action"
      :class="{
        'todos-actions__action_active': todosState.shownTodos === EShownTodos.UNCOMPLETED
      }"
      @click="todosState.shownTodos = EShownTodos.UNCOMPLETED"
    >
      Pending
    </button>

    <button
      class="todos-actions__action todos-actions__action_clear"
      :class="{
        'todos-actions__action_hidden': todosState.data.uncompleted?.length
      }"
      @click="handleClearAllDone"
    >
      Clear completed
    </button>
  </div>
</template>

<style scoped lang="scss">
@import 'todos-actions';
</style>
