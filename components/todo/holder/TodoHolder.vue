<script setup lang="ts"></script>

<template>
  <section class="todo-holder">
    <div class="todo-holder__container">
      <div class="todo-holder__content">
        <img
          class="todo-holder__img"
          src="/img/Illustration.svg"
          alt="todo-img"
        />

        <h1 class="todo-holder__title">Today I need to</h1>
        <TodoAdd class="todo-holder__new-todo" />
        <TodoList class="todo-holder__list" />
        <TodoActions class="todo-holder__actions" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import 'todo-holder';
</style>
