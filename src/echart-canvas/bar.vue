<template>
  <div class="chart bar">
    <canvas
      id="tutorial"
      :width="canvasWidth"
      :height="height">
    </canvas>
  </div>
</template>

<script>
import chartOption from './chart-option.js'
export default {
  mixins: [chartOption],
  data () {
    return {
      littleH: 5,
      ctx: null,
      width: 0,
      height: 0,
      canvasWidth: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.initCanvasSize()
      this.$nextTick(() => {
        this.init()
        this.drawXLine()
        this.drawBar()
      })
    })
  },
  methods: {
    initCanvasSize () {
      const { width, height } = getComputedStyle(this.$el)
      this.width = parseFloat(width, 10)
      this.height = parseFloat(height, 10)
      this.canvasWidth = this.width
    },
    init () {
      const canvas = this.$el.querySelector('#tutorial')
      canvas.style['aspect-ratio'] = this.width / this.height
      this.ctx = canvas.getContext('2d')
      this.ctx.translate(0, this.height)
      this.ctx.scale(1, -1)
    },
    createBar ({ color, w, h, x, y }) {
      const gr = this.ctx.createLinearGradient(0, y, 0, y + h)
      // 颜色断点
      gr.addColorStop(0, 'rgb(0,255,116,.2)')
      gr.addColorStop(0.5, 'rgb(0,255,116,.5)')
      gr.addColorStop(1, 'rgb(0,255,116,.8)')
      this.ctx.fillStyle = gr
      this.ctx.fillRect(x, y, w, h)
      this.ctx.fillStyle = '#00ffb5'
      this.ctx.fillRect(x, y + h, w, this.littleH)
    },
    drawXLine () {
      this.ctx.setLineDash([5, 2])
      this.ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      this.ctx.lineWidth = 2
      this.ctx.beginPath()
      this.ctx.moveTo(this.xLeft, this.yBottom)
      this.ctx.lineTo(this.canvasWidth - this.gridPadding.right, this.yBottom)
      this.ctx.closePath()
      this.ctx.stroke()
    },
    drawBar () {
      this.createBar({
        w: 10,
        h: 50,
        x: this.xLeft + 25,
        y: this.yBottom
      })

      // this.createBar({
      //   w: 10,
      //   h: 150,
      //   x: 40,
      //   y: 100
      // })

      // this.createBar({
      //   w: 10,
      //   h: 240,
      //   x: 55,
      //   y: 10
      // })

      // this.createBar({
      //   w: 10,
      //   h: 240,
      //   x: 160,
      //   y: 10
      // })

      // this.createBar({
      //   w: 10,
      //   h: 240,
      //   x: 260,
      //   y: 10
      // })

      // this.createBar({
      //   w: 10,
      //   h: 240,
      //   x: 360,
      //   y: 10
      // })
    }
  }
}
</script>
<style lang="postcss" scoped>
.chart {
  position: relative;
  left: 200px;
  top: 200px;
}
.bar {
  width: 600px;
  height: 400px;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid black;
  background-color: #444;
  border: none;
}
</style>
