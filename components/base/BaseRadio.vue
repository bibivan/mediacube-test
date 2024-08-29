<script setup lang="ts" generic="T, K">
defineProps<{
  value: string | number | boolean | K
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
  <div :class="'base-radio base-radio_' + theme">
    <input
      :id="id"
      v-model="modelValue"
      class="base-radio__input"
      :value="value"
      type="radio"
      :checked="checked"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
    />
    <label
      class="base-radio__label"
      :for="id"
    >
      {{ label ? label : value }}
    </label>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

.base-radio {
  $this: &;

  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  /* для элемента label связанного с .custom-radio */
  &__label {
    @include desktop {
      font-size: 2rem;
    }

    @include text-regular-3-mobile;

    cursor: pointer;
    display: flex;
    width: 100%;
    transition: color 0.15s ease-in-out;

    &::before {
      @include desktop {
        width: 30px;
        height: 30px;
        background: center / 18px no-repeat;
        border-width: 3px;
      }

      content: '';

      display: block;

      box-sizing: border-box;
      width: 16px;
      height: 16px;
      margin-right: 10px;

      background: center / 10px no-repeat;
      border: 1px solid $color-text;
      border-radius: 50%;

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
    /* стили для радиокнопки, находящейся в фокусе и не находящейся в состоянии checked */
    #{$this}__input:focus:not(:checked) + #{$this}__label {
      color: $color-easynutrition;

      &::before {
        border-color: $color-easynutrition;
      }
    }

    /* стили для радиокнопки, находящейся в ховере и не находящейся в состоянии checked */
    #{$this}__input:hover:not(:checked) + #{$this}__label {
      color: $color-easynutrition;

      &::before {
        border-color: $color-easynutrition;
      }
    }

    /* стили для активной радиокнопки (при нажатии на неё) */
    #{$this}__input:not(:disabled):active + #{$this}__label {
      color: $color-easynutrition-dark;

      &::before {
        border-color: $color-easynutrition-dark;
      }
    }

    /* стили для радиокнопки, находящейся в состоянии checked */
    #{$this}__input:checked + #{$this}__label {
      color: $color-easynutrition;

      &::before {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2300adbb'/%3e%3c/svg%3e");
        border-color: $color-easynutrition;
      }
    }
  }
}
</style>
