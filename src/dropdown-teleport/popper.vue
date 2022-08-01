<template>
  <teleport
    v-if="show"
    to="body">
    <div
      class="editor-popper"
      :style="style"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave">
      <slot />
    </div>
  </teleport>
</template>
<script>
import { reactive, ref, toRefs } from 'vue'
import { getRectStyle } from '../utils/getRectStyle'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    level: { // 级联选择器时的弹窗位置变化
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    const show = ref(false)
    const { visible } = toRefs(props)
    show.value = visible.value
    const style = reactive({ 'max-height': '0px' })
    const mouseenter = function () {
      emit('mouseenter')
    }
    const mouseleave = function () {
      emit('mouseleave')
    }
    return {
      style,
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
        const htmlFontSize = this.$htmlFontSize()
        this.$nextTick(() => {
          const {
            top,
            left,
            width,
            upOrUnder
          } = getRectStyle(this.$parent.$el)
          this.style.top = (top / htmlFontSize) + 'rem'
          this.style.left = (((this.level - 1) * width + left) / htmlFontSize) + 'rem'
          this.style.width = (width / htmlFontSize) + 'rem'
          this.style['max-height'] = `${300 / htmlFontSize}rem`
          this.style.padding = `${5 / htmlFontSize}rem 0`
          if (!upOrUnder) {
            this.style.transform = 'translateY(-100%)'
          }
        })
      } else {
        this.style['max-height'] = '0px'
        this.style.padding = '0px'
        this.style.transform = 'none'
        this.timer = setTimeout(() => {
          this.show = false
        }, 100)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.editor-popper {
  z-index: 10;
  transition: all ease .1s;
  position: absolute;
  font-size: $documentFontSize;
  overflow: auto;
  border-radius: $normalBlockBorderRadius;
  box-shadow: $boxShadowLevel1;
  border: $wrapBorder;
  box-sizing: border-box;
  padding: $wrapMargin 0;
  line-height: $normalLineHeight;
}
</style>
