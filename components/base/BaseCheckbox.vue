<script setup lang="ts" generic="T, K">
defineProps<{
  value?: string | number | boolean | K
  id: string
  theme: string
  checked?: boolean
  label?: string
}>()

defineEmits<{
  input: [Event]
  change: [Event]
}>()

const modelValue = defineModel<T>()
</script>

<template>
  <div :class="'base-checkbox base-checkbox_' + theme">
    <input
      :id="id"
      v-model="modelValue"
      class="base-checkbox__input"
      :value="value"
      type="checkbox"
      :checked="checked"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
    />
    <label
      class="base-checkbox__label"
      :for="id"
    >
      <slot name="label" />
    </label>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

.base-checkbox {
  position: relative;

  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  &__error {
    @include desktop {
      left: 40px;
      font-size: 2rem;
    }

    position: absolute;
    top: 100%;
    left: 26px;
    color: $color-danger;
  }

  /* для элемента label связанного с .base-checkbox */
  &__label {
    @include desktop {
      font-size: 2rem;
    }

    cursor: pointer;

    display: flex;

    width: 100%;

    color: $color-text;

    transition: color 0.15s ease-in-out;

    &::before {
      content: '';

      display: block;
      flex-grow: 0;
      flex-shrink: 0;

      box-sizing: border-box;
      width: 16px;
      height: 16px;
      margin-right: 10px;

      background: center / 10px no-repeat;
      border: 1px solid $color-input-border;
      border-radius: 2px;

      transition: border-color 0.15s ease-in-out;
    }
  }

  /* стили для радиокнопки, находящейся в состоянии disabled */
  &__input:disabled + &__label {
    color: $color-disable;

    &::before {
      background-color: $color-disable;
    }
  }

  /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
  //&__input:focus:not(:checked) + &__label {
  //  &::before {
  //    border-color: $color-bg-btn;
  //  }
  //}

  /* стили для чекбокса, находящегося в ховере и не находящегося в состоянии checked */
  &__input:hover:not(:checked) + &__label {
    @include hover {
      color: $color-bg-btn;

      &::before {
        border-color: $color-bg-btn;
      }
    }
  }

  /* стили для активного чекбокс (при нажатии на неё) */
  &__input:not(:disabled):active + &__label {
    color: $color-primary-dark;

    &::before {
      border-color: $color-primary-dark;
    }
  }

  /* стили для радиокнопки, находящегося в состоянии checked */
  &__input:checked + &__label {
    background-color: $color-bg-section;

    &::before {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
      border-color: $color-bg-btn;
    }
  }
}
</style>
