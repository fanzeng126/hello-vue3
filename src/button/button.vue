<template>
  <button
    autofocus
    class="vt-button"
    :type="nativeType"
    :disabled="buttonDisabled || loading"
    :class="classes">
    <vt-icon
      v-if="loading"
      icon="loading"
      class-name="" />
    <vt-icon :icon="icon" v-else-if="icon" />
    <slot />
  </button>
</template>

<script>
import { toRefs, computed, inject } from 'vue'
import './button.pcss'

const useButtonSize = (size) => {
  return computed(() => {
    const elFormItem = inject('elFormItem', {})
    return elFormItem.elFormItemSize || size?.value
  })
}
const userButtonDisabled = (disabled) => {
  return computed(() => {
    const elFormItem = inject('elFormItem', {})
    return elFormItem.disabled || disabled?.value
  })
}

const useClasses = ({ props, buttonSize, buttonDisabled }) => {
  return computed(() => [
    buttonSize.value ? `vt-button--${buttonSize.value}` : '',
    props.type ? `vt-button--${props.type}` : '',
    {
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-loading': props.loading,
      'is-disabled': buttonDisabled.value
    }
  ])
}
export default {
  props: {
    size: {
      type: String,
      validator (val) {
        if (val === '') return true
        return ['Large', 'normal', 'medium', 'small', 'mini'].includes(val)
      },
      default: 'normal'
    },
    type: {
      type: String,
      validator: (val) => ['primary', 'success', 'warning', 'danger', 'info', 'text'].includes(val),
      default: 'primary'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String
    }
  },
  setup (props) {
    const { size, disabled } = toRefs(props)
    const buttonSize = useButtonSize(size)
    const buttonDisabled = userButtonDisabled(disabled)
    const classes = useClasses({
      props,
      buttonSize,
      buttonDisabled
    })

    return {
      buttonSize,
      buttonDisabled,
      classes
    }
  }
}
</script>
