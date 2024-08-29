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

const slots = useSlots()
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
      {{ !label && !slots.label ? value : label }}

      <slot name="label" />
    </label>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

.base-checkbox {
  $this: &;

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

    @include text-regular-3-mobile;

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

    @include text-regular-3-mobile;

    cursor: pointer;

    display: flex;

    width: 100%;

    color: $color-text;

    transition: color 0.15s ease-in-out;

    &::before {
      @include desktop {
        width: 30px;
        height: 30px;

        background: center / 18px no-repeat;
        border-width: 3px;
        border-radius: 8px;
      }

      content: '';

      display: block;
      flex-grow: 0;
      flex-shrink: 0;

      box-sizing: border-box;
      width: 16px;
      height: 16px;
      margin-right: 10px;

      background: center / 10px no-repeat;
      border: 1px solid $color-text;
      border-radius: 4px;

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

  &_easynutrition {
    /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
    #{$this}__input:focus:not(:checked) + #{$this}__label {
      &::before {
        border-color: $color-easynutrition;
      }
    }

    /* стили для чекбокса, находящегося в ховере и не находящегося в состоянии checked */
    #{$this}__input:hover:not(:checked) + #{$this}__label {
      @include hover {
        color: $color-easynutrition;

        &::before {
          border-color: $color-easynutrition;
        }
      }
    }

    /* стили для активного чекбокс (при нажатии на неё) */
    #{$this}__input:not(:disabled):active + #{$this}__label {
      color: $color-easynutrition-dark;

      &::before {
        border-color: $color-easynutrition-dark;
      }
    }

    /* стили для радиокнопки, находящегося в состоянии checked */
    #{$this}__input:checked + #{$this}__label {
      color: $color-easynutrition;

      &::before {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2300adbb' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
        border-color: $color-easynutrition;
      }
    }
  }
}
</style>
