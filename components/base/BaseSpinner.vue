<script setup lang="ts"></script>

<template>
  <span class="spinner" />
</template>

<style lang="scss">
.spinner {
  position: relative;
  width: 25px;
  height: 25px;

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: block;

    width: 80%;
    height: 80%;

    border-radius: 50%;
  }

  &::before {
    opacity: 0.2;
  }

  &::after {
    border: 2px solid $color-bg-section;

    border-top-color: transparent;
    animation: 1s linear 0s normal none infinite running rot;
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
