<template>
  <div class="resize-border top" />
  <div class="resize-border left" />
  <div class="resize-border right" />
  <div class="resize-border bottom" />
</template>

<script>
import { ref, toRefs, watch } from 'vue'
export default {
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  emits: ['update:width', 'update:height'],
  setup (props, { emit }) {
    const { width, height } = toRefs(props)

    const selectEl = ref(null)

    const startX = ref(0)

    const startY = ref(0)

    const moveY = ref(0)

    const moveX = ref(0)

    const direction = ref('')

    watch(moveX, (newVal, oldVal) => {
      if (selectEl.value) {
        emit('update:width', width.value + (newVal - oldVal))
      }
    })
    watch(moveY, (newVal, oldVal) => {
      if (selectEl.value) {
        emit('update:height', height.value + (newVal - oldVal))
      }
    })
    return {
      startX,
      startY,
      moveY,
      moveX,
      selectEl,
      direction
    }
  },
  mounted () {
    document.addEventListener('mousemove', (e) => {
      if (this.selectEl) {
        this.moveX = e.pageX - this.startX
        this.moveY = e.pageY - this.startY
      }
    })
    document.addEventListener('mousedown', (e) => {
      if (e.target && e.target.classList.contains('resize-border')) {
        const classList = e.target.classList
        if (classList.contains('top')) {
          this.direction = 'top'
        } else if (classList.contains('left')) {
          this.direction = 'left'
        } else if (classList.contains('right')) {
          this.direction = 'right'
        } else if (classList.contains('bottom')) {
          this.direction = 'bottom'
        }
        if (this.direction) {
          classList.add('move')
          document.body.classList.add(`resize-${this.direction}`)
          this.selectEl = e.target
          this.startX = e.pageX
          this.startY = e.pageY
        }
      }
    })
    document.addEventListener('mouseup', (e) => {
      if (this.selectEl && this.selectEl.classList.contains('move')) {
        this.selectEl.classList.remove('move')
        document.body.classList.remove(`resize-${this.direction}`)
        this.selectEl = null
        this.moveX = 0
        this.moveY = 0
        this.direction = ''
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
