<template>
  <div
    class="box"
    :style="{ height: `${height}px`, width: `${width}px` }">
    我的世界
    <vt-resize
      @moveX="changeX"
      @moveY="changeY"
      @clear="clear"
      @move="isWatch=true" />
    <button @click="width+=5">
      +1
    </button>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import resizeBox from './resize-box.vue'
export default {
  components: {
    'vt-resize': resizeBox
  },
  setup () {
    const height = ref(300)

    const width = ref(500)

    const moveX = ref(0)

    const moveY = ref(0)

    const boxWidth = ref(0)

    const boxHeight = ref(0)

    const isWatch = ref(true)

    boxWidth.value = width.value

    watch(moveY, function (newVal, oldVal) {
      if (isWatch.value) {
        height.value += (newVal - oldVal)
      }
    })
    watch(moveX, function (newVal, oldVal) {
      if (isWatch.value) {
        width.value = width.value + (newVal - oldVal)
      }
    })
    return {
      height,
      width,
      moveX,
      moveY,
      boxWidth,
      boxHeight,
      isWatch
    }
  },
  methods: {
    changeX (val) {
      this.moveX = val
    },
    changeY (val) {
      this.moveY = val
    },
    clear () {
      this.isWatch = false
      this.moveX = 0
      this.moveY = 0
    }
  }
}
</script>
<style lang="postcss" scoped>
.box {
  position: relative;
  left: 200px;
  top: 200px;
  font-size: 64px;
  border: 1px solid red;
}
body {
  pointer-events: none;
}
</style>
