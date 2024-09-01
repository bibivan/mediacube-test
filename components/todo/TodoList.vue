<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
const todosStore = useTodosStore()
const { todosState } = storeToRefs(todosStore)

todosStore.getTodos()
</script>

<template>
  <div class="todo-list">
    <!--    <div-->
    <!--      v-if="todosState.loading"-->
    <!--      class="todo-list__loading loading"-->
    <!--    />-->
    <PerfectScrollbar>
      <VueDraggableNext
        v-if="todosState.data"
        v-model="todosState.data"
        handle=".drag-handler"
      >
        <TodoItem
          v-for="todo in todosState.data"
          :key="todo.id"
          class="todo-list__item"
          :data="todo"
        />
      </VueDraggableNext>
    </PerfectScrollbar>
  </div>
</template>

<style scoped lang="scss">
.todo-list {
  @include flex-column-left;
  position: relative;
  width: 100%;
  height: 100px;

  &__item {
    font-family: $font-base;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    background-color: white;
  }

  &__spinner {
    margin: auto;

    &::after {
      border: 2px solid $color-primary;
      border-top-color: transparent;
    }
  }

  &__loading {
    position: absolute;
    inset: 0;
    overflow: hidden;

    &::before {
      border-radius: $border-radius-md;
    }
  }
}

.ps {
  width: calc(100% + #{$custom-scrollbar-indent});
  height: 100px;
}
</style>
