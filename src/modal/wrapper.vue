<template>
  <div
    ref="modal"
    v-show="modelValue"
    class="vt-modal"
    @click="clickModal" />
</template>

<script>
import { toRefs, watch, ref } from 'vue'

const fadeOut = async function (target) {
  target.value.classList.add('fade-out')
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 180)
  })
  target.value.classList.remove('fade-out')
}

const fadeIn = async function (target) {
  target.value.classList.add('fade-in')
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 180)
  })
  target.value.classList.remove('fade-in')
}

const listenKeydown = function ({ flag, callBack }) {
  if (flag) {
    window.addEventListener('keydown', callBack)
  } else {
    window.removeEventListener('keydown', callBack)
  }
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
      await fadeOut(modal)
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

    watch(modelValue, (val) => {
      if (val) {
        fadeIn(modal)
        if (modalAppendToBody.value) {
          document.body.appendChild(modal.value)
        }
      }
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
}
</style>
