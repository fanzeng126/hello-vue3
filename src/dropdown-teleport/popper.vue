<template>
  <teleport
    v-show="show"
    to="body">
    <div
      v-mussel-scrollbar
      :class="[
        'editor-popper',
        show ? 'show' : ''
      ]"
      :style="localStyle"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave">
      <slot />
    </div>
  </teleport>
</template>
<script>
import { ref, toRefs, reactive, watch } from 'vue'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    style: { // 图案位置
      type: Object,
      default: () => {}
    }
  },
  setup (props, { emit }) {
    const show = ref(false)
    const { visible, style } = toRefs(props)
    show.value = visible.value

    const localStyle = reactive({})
    Object.assign(localStyle, style.value)

    watch(style, function (newVal, oldVal) {
      Object.assign(localStyle, style.value)
    })

    const mouseenter = function () {
      emit('mouseenter')
    }
    const mouseleave = function () {
      emit('mouseleave')
    }
    return {
      localStyle,
      show,
      mouseenter,
      mouseleave
    }
  },
  data () {
    return {
      timer: null
    }
  },
  emits: [
    'mouseenter',
    'mouseleave'
  ],
  watch: {
    visible (newVal) {
      if (newVal) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.show = true
      } else {
        this.timer = setTimeout(() => {
          this.show = false
        }, 100)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
 .editor-popper{
  z-index: 10;
  transition: all ease .1s;
  position: absolute;
  font-size: $documentFontSize;
  overflow: hidden;
  box-sizing: border-box;
  line-height: $normalLineHeight;
  max-height: 0;
}
.editor-popper.show {
  padding: $wrapMargin 0;
  box-shadow: $boxShadowLevel1;
  border-radius: $normalBlockBorderRadius;
  border: $wrapBorder;
  max-height: 300px;
}
</style>
