<template>
  <div
    ref="modal"
    v-show="modelValue"
    class="vt-modal"
    @click="clickModal">
    <div
      class="wrapper"
      :class="{show}">
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
import { fadeOut, fadeIn, listenKeydown } from './pop'

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
    const show = ref(false)

    const hide = async () => {
      show.value = false
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

    onMounted(() => {
      if (modalAppendToBody.value) {
        document.body.appendChild(modal.value)
      }
    })

    watch(modelValue, (val) => {
      if (val) {
        setTimeout(() => {
          show.value = true
        }, 1)
        fadeIn(modal)
      }
      listenKeydown({ flag: val, callBack: esc })
    })

    return {
      modal,
      clickModal,
      show,
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
    transition: all .2s;
    transform: translateY(240px);
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
  .wrapper.show {
    transform: translateY(0);
  }
}
</style>
