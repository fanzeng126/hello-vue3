<template>
  <div
    ref="drawer"
    v-show="modelValue"
    class="drawer"
    :class="classes">
    <slot />
  </div>
</template>
<script>
import { ref, toRefs, watch, onMounted } from 'vue'
import { anime } from '../utils/anime'

const useClasses = (position, className) => {
  return [`vt-drawer--${position.value}`, className.value]
}

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['top', 'left', 'right', 'bottom'].includes(val)
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const {
      modelValue,
      modalAppendToBody,
      position,
      className
    } = toRefs(props)
    const drawer = ref(null)

    watch(modelValue, () => {
      anime({ target: drawer, timer: 200, animationName: `in-${position.value}` })
    })

    const hide = async () => {
      await anime({ target: drawer, timer: 180, animationName: `out-${position.value}` })
      emit('update:modelValue', false)
    }

    onMounted(() => {
      if (modalAppendToBody.value) {
        document.body.appendChild(drawer.value)
      }
    })

    const classes = useClasses(position, className)

    return {
      drawer,
      hide,
      classes
    }
  }
}
</script>
<style lang="postcss" scoped>
.drawer {
  position: fixed;
  background: #fff;
  font-size: 1rem;
  z-index: 6;
  display: flex;
  box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%),
    0 16px 24px 2px rgb(0 0 0 / 14%),
    0 6px 30px 5px rgb(0 0 0 / 12%);
}
.vt-drawer--right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
}
.vt-drawer--left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
}
.vt-drawer--top {
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
}
.vt-drawer--bottom {
  left: 0;
  right: 0;
  bottom: 0;
  height: 40%;
}

</style>
