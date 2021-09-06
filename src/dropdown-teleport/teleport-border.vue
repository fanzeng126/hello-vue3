<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    :width="elWidth"
    :height="elHeight">
    <path
      :d="path"
      fill="none"
      stroke="#d9d9d9"
      stroke-width="1"
    />
  </svg>
</template>
<script>
import { toRefs, computed, watch, ref } from 'vue'
export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const path = ref('')
    const { height, width } = toRefs(props)
    const elHeight = computed(() => height.value + 6)
    const elWidth = computed(() => width.value)
    watch(width, function () {
      path.value = `M1 6 h 16 l 6,-6 l 6, 6 h ${width.value - 29}  v${height.value} h-${width.value - 1} z`
    })
    return {
      path,
      elWidth,
      elHeight
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  unmounted () {
    document.body.removeChild(this.$el)
  }

}
</script>
<style lang="postcss" scoped>
svg {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
