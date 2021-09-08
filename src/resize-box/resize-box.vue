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
  setup (props, context) {
    const topBorder = ref(null)

    const leftBorder = ref(null)

    const bottomBorder = ref(null)

    const rightBorder = ref(null)

    const startX = ref(0)

    const startY = ref(0)

    return {
      topBorder,
      leftBorder,
      bottomBorder,
      rightBorder,
      startX,
      startY
    }
  },
  mounted () {
    document.addEventListener('mousemove', (e) => {
      if (this.isClick) {
        console.log('mousemove', e.pageX, e.pageY)
      }
    })
    document.addEventListener('mousedown', (e) => {
      if (e.target && e.target.classList.contains('resize-border')) {
        this.startX = e.pageX
        this.startY = e.pageY
      }
    })
    document.addEventListener('mouseup', (e) => {
    })
  },
  methods: {
    calcMoveDistance (e) {
      this.isClick = true
      console.log(e.pageX, e.pageY)
    }
  }
}
</script>
<style lang="postcss" scoped>
.resize-border.top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 4px;
}
.resize-border.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
}
.resize-border.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
}
.resize-border.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
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
</style>
