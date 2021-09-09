<template>
  <teleport
    v-if="show"
    to="body">
    <div
      class="editor-popper"
      :style="style">
      <slot />
    </div>
  </teleport>
</template>
<script>
import { reactive, ref, toRefs } from 'vue'
import { getRectStyle } from '../utils/getRectStyle'
export default {
  props: {
    visiable: {
      type: Boolean,
      default: false,
      required: true
    },
    level: { // 级联选择器时的弹窗位置变化
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const show = ref(false)
    const { visiable } = toRefs(props)
    show.value = visiable.value
    const style = reactive({ 'max-height': '0px' })
    return {
      style,
      show
    }
  },
  watch: {
    visiable (newVal) {
      if (newVal) {
        this.show = true
        this.$nextTick(() => {
          const {
            top,
            left,
            width
          } = getRectStyle(this.$parent.$el)
          this.style.top = top + 'px'
          this.style.left = (this.level - 1) * width + left + 'px'
          this.style.width = width + 'px'
          this.style['max-height'] = '300px'
        })
      } else {
        this.style['max-height'] = '0px'
        setTimeout(() => {
          this.show = false
        }, 100)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.editor-popper {
  transition: all ease .1s;
  position: absolute;
  font-size: $documentFontSize;
  overflow: auto;
  border-radius: $normalBlockBorderRadius;
  margin-top: $wrapMargin;
  box-shadow: $boxShadowLevel1;
  border: $wrapBorder;
  box-sizing: border-box;
  padding: $wrapMargin 0;
  line-height: $normalLineHeight;
}
</style>
