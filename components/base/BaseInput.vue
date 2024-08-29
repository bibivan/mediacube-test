<script setup lang="ts">
import { useVuelidate, type Validation } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'

type TInputType = 'number' | 'text'

const props = withDefaults(
  defineProps<{
    id: string
    disabled?: boolean
    theme: string
    type?: TInputType
    placeholder?: string
    requiredVal?: boolean
    errorInstance?: Validation
    isEmail?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    errorInstance: undefined
  }
)

const emit = defineEmits<{
  input: [Event]
  change: [Event]
  blur: [Event]
}>()

const modelValue = defineModel<TNullable<string | number>>()
const isFocused = ref<boolean>(false)

const handleBlur = (event: Event) => {
  emit('blur', event)
  isFocused.value = false
  v$.value.$touch()
}

const validationRules = computed(() => ({
  modelValue: {
    required: props.requiredVal ? helpers.withMessage('Обязательное поле', required) : () => true,
    email: props.isEmail ? helpers.withMessage('Неправильный Email', email) : () => true
  }
}))
const v$ = useVuelidate(validationRules, { modelValue })
</script>

<template>
  <div
    :class="[
      'base-input base-input_' + theme,
      {
        'base-input_success': errorInstance
          ? !errorInstance?.$silentErrors?.length
          : !v$?.$silentErrors?.length && !!modelValue
      }
    ]"
  >
    <SvgCheckmark class="base-input__checkmark" />
    <input
      :id="id"
      v-model="modelValue"
      class="base-input__input"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
      @blur="handleBlur"
      @focus="isFocused = true"
    />
    <label
      v-if="errorInstance?.$errors?.length && !isFocused"
      :for="id"
      class="base-input__error"
    >
      {{ errorInstance.$errors[0]?.$message }}
    </label>
    <label
      v-if="v$?.$errors?.length && !isFocused"
      :for="id"
      class="base-input__error"
    >
      {{ v$.$errors[0]?.$message }}
    </label>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  @include input-props;
}
</style>
