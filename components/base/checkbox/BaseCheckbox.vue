<script setup lang="ts" generic="T">
defineProps<{
  id: string
  theme: string
  disabled: boolean
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
      type="checkbox"
      :disabled="disabled"
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

<style lang="scss">
@import 'base-checkbox';
</style>
