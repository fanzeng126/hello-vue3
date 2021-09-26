<template>
  <div
    ref="drawer"
    v-show="modelValue"
    class="drawer"
    @click="hide">
    <slot />
  </div>
</template>
<script>
import { ref, toRefs, watch } from 'vue'
import { anime } from '../utils/anime'
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
    wrapperClosable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const drawer = ref(null)

    watch(modelValue, () => {
      anime({ target: drawer, timer: 200, animationName: 'in-right' })
    })

    const hide = async () => {
      await anime({ target: drawer, timer: 180, animationName: 'out-right' })
      emit('update:modelValue', false)
    }

    return {
      drawer,
      hide
    }
  }
}
</script>
<style lang="postcss" scoped>
.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40%;
  background: #fff;
  transition: all .2s;
  font-size: 1rem;
  z-index: 6;
  display: flex;
  box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%);
}
</style>
