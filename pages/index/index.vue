<script lang="ts" setup>
const { todosState, getAllTodos } = useTodosStore()

await getAllTodos()
</script>

<template>
  <main class="main">
    <section class="todos-holder">
      <div class="todos-holder__container">
        <div class="todos-holder__content">
          <img
            class="todos-holder__img"
            src="public/img/Illustration.svg"
            alt="todo-img"
          />

          <h1 class="todos-holder__title">Today I need to</h1>
          <TodosAddNew class="todos-holder__new-todo" />

          <TodosCleared
            v-if="!todosState.data.completed?.length && !todosState.data.uncompleted?.length"
            class="todos-holder__no-todos"
          />
          <template v-else>
            <TodosList class="todos-holder__list" />
            <TodosProgressInfo class="todos-holder__progress" />
            <TodosActions class="todos-holder__actions" />
          </template>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
@import 'index';
</style>
