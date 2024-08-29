<script lang="ts" setup>
import type { Validation } from '@vuelidate/core'

withDefaults(
  defineProps<{
    errorInstance: Validation
    validatedProperty?: string
    nestedValidatedProperty?: string
    position?: string
    className?: string
  }>(),
  {
    position: 'absolute',
    className: '',
    validatedProperty: undefined,
    nestedValidatedProperty: undefined
  }
)
</script>

<template>
  <template v-if="validatedProperty">
    <div :class="`${className} error-message error-message_position_${position}`">
      {{ errorInstance[validatedProperty]?.$errors[0]?.$message }}
    </div>
  </template>
  <template v-else>
    <div :class="`${className} error-message error-message_position_${position}`">
      {{ errorInstance.$errors[0]?.$message }}
    </div>
  </template>
</template>

<style scoped lang="scss">
.error-message {
  @include desktop {
    font-size: 2rem;
  }

  @include text-regular-3-mobile;

  display: block;
  line-height: 1;
  color: $color-danger;

  &_position_absolute {
    position: absolute;
    top: calc(100% + 4px);
  }
}
</style>
