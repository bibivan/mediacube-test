<script setup lang="ts"></script>

<template>
  <NuxtLayout name="404">
    <section class="section">
      <div class="container">
        <div class="not-found">
          <div class="not-found__text">
            <h1 class="not-found__headline">Упс! страница не&nbsp;найдена(</h1>
            <p class="not-found__description">
              Похоже, запрашиваемая вами страница не&nbsp;найдена. Но&nbsp;на&nbsp;нашем сайте много
              другой интересной информации
            </p>
          </div>
          <NuxtLink
            class="not-found__go-back btn btn_easynutrition_painted"
            to="/"
          >
            На главную
          </NuxtLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.not-found {
  @include desktop {
    gap: 60px;
    font-size: 3.6rem;
  }

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  min-height: 80vh;

  &__img {
    max-width: 790px;
    color: $color-disable;
  }

  &__headline {
    @include desktop {
      font-size: 3.6rem;
    }

    @include headline-1-mobile;

    text-align: center;
    text-transform: uppercase;
  }

  &__description {
    @include desktop {
      font-size: 2.4rem;
    }

    @include text-regular-1-mobile;

    max-width: 765px;
    color: $color-text;
    text-align: center;
  }
}
</style>
