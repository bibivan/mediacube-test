<script setup lang="ts"></script>

<template>
  <NuxtLayout name="404">
    <div class="main">
      <section class="section">
        <div class="container">
          <div>
            <h1>Похоже, запрашиваемая вами страница не найдена.</h1>
            <NuxtLink
              class="link"
              to="/"
            >
              На главную
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
h1,
a {
  display: block;
  color: $color-disable;
  margin-bottom: 10px;
  text-align: center;
}
</style>
