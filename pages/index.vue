<script lang="ts" setup>
// const config = useRuntimeConfig()
// const todos = await useCommonFetch(`/users/${config.public.userId}/todos`)
// import { useTodosStore } from '~/stores/todos'

const { getTodos } = useTodosStore()
const newTodo = reactive<INewTodoPayload>({
  title: null,
  due_on: new Date().toString(),
  status: ETodoStatus.PENDING
})

getTodos()
</script>

<template>
  <main>
    <div class="flex">
      <button @click="getTodos">Some text</button>
      <NuxtLink to="/other">other</NuxtLink>
      <form action="/">
        <input
          v-model="newTodo"
          type="text"
        />
        <button>Send</button>
      </form>
      butt
    </div>
  </main>
</template>
<style scoped lang="scss">
.flex {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}
</style>
