<template>
  <div v-if="resizeH" class="resize-border right" />
  <div v-if="resizeV" class="resize-border bottom" />
</template>

<script>
import { ref, toRefs, watch, computed } from 'vue'
export default {
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    resize: {
      type: String,
      validator: (val) => ['none', 'both', 'horizontal', 'vertical'].includes(val)
    }
  },
  emits: ['update:width', 'update:height'],
  setup (props, { emit }) {
    const { width, height, resize } = toRefs(props)

    const selectEl = ref(null)

    const startX = ref(0)

    const startY = ref(0)

    const moveY = ref(0)

    const moveX = ref(0)

    const direction = ref('')

    const resizeH = computed(() => width && ['both', 'horizontal'].includes(resize.value))

    const resizeV = computed(() => height && ['both', 'vertical'].includes(resize.value))

    watch(moveX, (newVal, oldVal) => {
      if (selectEl.value && resizeH.value) {
        emit('update:width', width.value + (newVal - oldVal))
      }
    })
    watch(moveY, (newVal, oldVal) => {
      if (selectEl.value && resizeV.value) {
        emit('update:height', height.value + (newVal - oldVal))
      }
    })
    return {
      startX,
      startY,
      moveY,
      moveX,
      selectEl,
      direction,
      resizeH,
      resizeV
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
