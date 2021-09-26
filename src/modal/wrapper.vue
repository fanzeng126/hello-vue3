<template>
  <div
    ref="modal"
    v-show="modelValue"
    class="vt-modal"
    @click="clickModal" />
</template>

<script>
import { toRefs, watch, ref } from 'vue'
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

    const hide = () => {
      modal.value.classList.add('fade-out')
      setTimeout(() => {
        emit('update:modelValue', false)
        modal.value.classList.remove('fade-out')
      }, 180)
    }

    const clickModal = function (e) {
      if (e.target === modal.value) {
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

    watch(modelValue, (val) => {
      if (val) {
        modal.value.classList.add('fade-in')
        setTimeout(() => {
          modal.value.classList.remove('fade-in')
        }, 200)
        if (modalAppendToBody.value) {
          document.body.appendChild(modal.value)
        }
        window.addEventListener('keydown', esc)
      } else {
        window.removeEventListener('keydown', esc)
      }
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
}
</style>
