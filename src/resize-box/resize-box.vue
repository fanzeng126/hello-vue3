<template>
  <div
    ref="topBorder"
    class="resize-border top" />
  <div
    ref="leftBorder"
    class="resize-border left" />
  <div
    ref="rightBorder"
    class="resize-border right" />
  <div
    ref="bottomBorder"
    class="resize-border bottom" />
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['moveX', 'moveY', 'clear', 'move'],
  setup (props, context) {
    const topBorder = ref(null)

    const leftBorder = ref(null)

    const bottomBorder = ref(null)

    const rightBorder = ref(null)

    const isClick = ref(false)

    const startX = ref(0)

    const startY = ref(0)

    const moveY = ref(0)

    const moveX = ref(0)

    const select = ref(null)
    return {
      topBorder,
      leftBorder,
      bottomBorder,
      rightBorder,
      startX,
      startY,
      isClick,
      moveY,
      moveX,
      select
    }
  },
  mounted () {
    document.addEventListener('mousemove', (e) => {
      if (this.isClick) {
        this.moveX = e.pageX - this.startX
        this.moveY = e.pageY - this.startY
        this.$emit('moveX', this.moveX)
        this.$emit('moveY', this.moveY)
      }
    })
    document.addEventListener('mousedown', (e) => {
      if (e.target && e.target.classList.contains('resize-border')) {
        this.$emit('move')
        e.target.classList.add('move')
        document.body.classList.add('move-right')
        this.select = e.target
        this.startX = e.pageX
        this.startY = e.pageY
        this.isClick = true
      }
    })
    document.addEventListener('mouseup', (e) => {
      this.isClick = false
      this.$emit('clear')
      if (this.select && this.select.classList.contains('move')) {
        this.select.classList.remove('move')
      }
    })
  }
}
</script>
<style lang="postcss" scoped>
.resize-border.top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 4px;
  z-index: 2;
}
.resize-border.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  z-index: 2;
}
.resize-border.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  z-index: 2;
}
.resize-border.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  z-index: 2;
}
.resize-border.top:hover {
  cursor: n-resize;
}
.resize-border.left:hover {
  cursor: w-resize;
}
.resize-border.right:hover {
  cursor: e-resize;
}
.resize-border.bottom:hover {
  cursor: s-resize;
}
.move {
  pointer-events: none;
}
</style>
