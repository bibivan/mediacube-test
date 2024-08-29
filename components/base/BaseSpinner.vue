<script setup lang="ts">
defineProps<{
  theme: 'default'
}>()
</script>

<template>
  <div :class="'spinner spinner_' + theme"></div>
</template>

<style scoped lang="scss">
.spinner {
  position: relative;
  width: 85px;
  height: 85px;

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: block;

    width: 50px;
    height: 50px;

    border-radius: 50%;
  }

  &::before {
    opacity: 0.2;
  }

  &::after {
    border: 5px solid;
    animation: 1s linear 0s normal none infinite running rot;
  }

  &_easynutrition {
    &::before {
      border-color: $color-easynutrition-light;
    }

    &::after {
      border-color: $color-easynutrition;
      border-top-color: $color-easynutrition-light;
    }
  }
}

@keyframes rot {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
