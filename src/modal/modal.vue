<template>
  <div
    ref="modal"
    v-show="modelValue"
    class="vt-modal"
    @click="clickModal" />
</template>

<script>
import { toRefs, watch, ref, onMounted } from 'vue'
import { anime } from '../utils/anime'
import { listenKeydown } from '../utils/listenEvent'

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
  setup (props, { emit, slots }) {
    const {
      modelValue,
      modalAppendToBody,
      wrapperClosable
    } = toRefs(props)
    const modal = ref(null)

    const hide = async () => {
      await anime({ target: modal, timer: 180, animationName: 'fade-out' })
      emit('update:modelValue', false)
    }

    const clickModal = function () {
      if (event.target === modal.value) {
        if (wrapperClosable.value) {
          hide()
        }
      }
    }

    const esc = function () {
      if (event.keyCode === 27) {
        hide()
      }
    }
    onMounted(() => {
      if (modalAppendToBody.value) {
        document.body.appendChild(modal.value)
      }
    })

    watch(modelValue, (val) => {
      if (val) anime({ target: modal, timer: 180, animationName: 'fade-in' })
      listenKeydown({ flag: val, callBack: esc })
    })

    return {
      modal,
      clickModal,
      hide
    }
  }
}
</script>
<style lang="postcss" scoped>
.vt-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-content: center;
  z-index: 5;
}
</style>
