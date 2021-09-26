<template>
  <div
    ref="modal"
    v-show="modelValue"
    class="vt-modal"
    @click="clickModal">
    <div
      v-if="modelValue"
      ref="wrapper"
      class="wrapper">
      <header>
        这是头部标题
        <vt-icon
          icon="close"
          @click="hide" />
      </header>
      <slot />
      <footer>
        <vt-button
          type="info"
          @click="cancel">
          取消
        </vt-button>
        <vt-button
          type="primary"
          @click="ok">
          确认
        </vt-button>
      </footer>
    </div>
  </div>
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
  emits: ['update:modelValue', 'onClickButton'],
  setup (props, { emit, slots }) {
    const {
      modelValue,
      modalAppendToBody,
      wrapperClosable
    } = toRefs(props)
    const modal = ref(null)
    const wrapper = ref(null)

    const hide = async () => {
      anime({ target: modal, timer: 180, animationName: 'fade-out' })
      await anime({ target: wrapper, timer: 200, animationName: 'out-ty-240' })
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

    watch(modelValue, async (val) => {
      if (val) {
        anime({ target: modal, timer: 180, animationName: 'fade-in' })
        setTimeout(() => {
          anime({ target: wrapper, timer: 200, animationName: 'in-ty-240' })
        }, 1)
      }
      listenKeydown({ flag: val, callBack: esc })
    })

    return {
      modal,
      wrapper,
      clickModal,
      hide
    }
  },
  methods: {
    ok () {
      this.$emit('onClickButton', 'ok', this)
    },
    cancel () {
      this.$emit('onClickButton', 'cancel', this)
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
  .wrapper {
    font-size: 24px;
    width: 700px;
    height: 400px;
    background: #fff;
    margin: auto;
    border-radius: 4px;
    color: #333;
    display: flex;
    flex-direction: column;
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    }
    footer {
      padding: 10px;
      text-align: right;
      & > button:first-child {
        margin-right: 8px;
      }
    }
  }
}
</style>
