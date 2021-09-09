<template>
  <div
    class="editor-wrap"
    :style="style">
    <slot />
    <ul>
      <li
       v-for="(item) in options"
       :key="item.value"
       :check="item.value === value"
       @click="$emit('update:value', item.value)">
       {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
export default {
  emits: ['update:value'],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: null
    }
  },
  setup (props) {
    const style = reactive({})
    const elWidth = ref(0)
    const elHeight = ref(0)
    return {
      style,
      elWidth,
      elHeight
    }
  },
  unmounted () {
  },
  mounted () {
    this.$nextTick(() => {
      const {
        top,
        left,
        width: vtWidth,
        height: vtHeight
      } = this.$parent.$el.getBoundingClientRect()
      this.style.top = top + vtHeight + 5 + 'px'
      this.style.left = left + 'px'
      this.style.width = vtWidth + 'px'
    })
    document.body.appendChild(this.$el)
  }
}
</script>
<style lang="postcss" scoped>
.editor-wrap {
  transition: all ease .8s;
  position: absolute;
  max-height: $wrapMaxHeight;
  font-size: $documentFontSize;
  overflow: auto;
  border-radius: $normalBlockBorderRadius;
  margin-top: $wrapMargin;
  box-shadow: $boxShadowLevel1;
  border: $wrapBorder;
  box-sizing: border-box;
  padding: $wrapMargin 0;
  line-height: $normalLineHeight;
  ul {
    padding: 0;
    li {
      padding-left: $inputElementPaddingX;
    }
    li:hover {
      background: $normalGreyBackground;
      color: $primaryColor;
    }
    li[check=true] {
      font-weight: bolder;
      color: $primaryColor;
    }
  }
}
</style>
