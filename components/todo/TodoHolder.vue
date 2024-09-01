<script setup lang="ts"></script>

<template>
  <section class="todo-holder">
    <div class="todo-holder__container">
      <div class="todo-holder__content">
        <img
          class="todo-holder__img"
          src="/public/img/Illustration.svg"
          alt="todo-img"
        />

        <h1 class="todo-holder__title">Today I need to</h1>
        <TodoAdd class="todo-holder__new-todo" />
        <TodoList />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.todo-holder {
  padding: 32px 0;
  border-radius: $border-radius-lg;
  background-color: $color-bg-section;
  min-height: 720px;
  width: 100%;
  max-width: 730px;

  &__container {
    margin: 0 auto;
    padding: 0 10px;
    max-width: 430px;
    width: 100%;
  }

  &__content {
    @include flex-column-center;
  }

  &__img {
    display: block;
    margin-bottom: 48px;
    width: 180px;
    height: 180px;
  }

  &__title {
    margin-bottom: 52px;
    font-family: $font-base;
    font-size: 24px;
    font-weight: 700;
    line-height: 29.05px;
    letter-spacing: -0.02em;
    text-align: left;
  }

  &__new-todo {
    margin-bottom: 40px;
  }
}
</style>
