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
import { hexToRGBA } from '../utils/color'
import chartOption from './chart-option.js'
export default {
  mixins: [chartOption],
  data () {
    return {
      littleH: 5,
      canvas: null,
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
        this.listenEvent()
      })
    })
  },
  methods: {
    initCanvasSize () {
      const { width, height } = getComputedStyle(this.$el)
      this.width = parseFloat(width, 10)
      this.height = parseFloat(height, 10)
      console.log(this.series.length - 1, this.xLeft, this.gridPadding.right)
      this.canvasWidth =
        this.xLeft + this.gridPadding.right + 25 * 2 + (this.series.length - 1) * (this.barAlign + this.barMargin) + (this.barWidth * 3 + this.barMargin * 2) * this.series.length
    },
    init () {
      this.canvas = this.$el.querySelector('#tutorial')
      this.canvas.style['aspect-ratio'] = this.width / this.height
      this.ctx = this.canvas.getContext('2d')
      this.ctx.translate(0, this.height)
      this.ctx.save()
      this.ctx.scale(1, -1)
    },
    createBar ({ color, w, h, x, y }) {
      const gr = this.ctx.createLinearGradient(0, y, 0, y + h)
      // 颜色断点
      gr.addColorStop(0, hexToRGBA(color, 0.2))
      gr.addColorStop(0.5, hexToRGBA(color, 0.5))
      gr.addColorStop(1, hexToRGBA(color, 0.8))
      // this.ctx.fillStyle = gr
      // this.ctx.rect(x, y, w, h)
      // this.ctx.fill()
      // this.ctx.fillStyle = color
      // this.ctx.rect(x, y + h, w, this.littleH)
      // this.ctx.fill()
      this.ctx.fillStyle = gr
      this.ctx.fillRect(x, y, w, h)
      this.ctx.fillStyle = color
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
      let count = 0
      this.series.forEach((item, i) => {
        item.forEach((ele, j) => {
          this.createBar({
            color: this.colors[j],
            w: this.barWidth,
            h: ele,
            x: this.xLeft + 25 + count * (this.barWidth + this.barMargin) + i * this.barAlign,
            y: this.yBottom
          })
          count++
        })
      })
      count = 0
      this.series.forEach((item, i) => {
        item.forEach((ele, j) => {
          count++
        })
        this.ctx.restore()
        this.ctx.font = '12px sans-serif'
        this.ctx.fillStyle = '#FFF'
        this.ctx.fillText('天若有情', this.xLeft + 25 + count * (this.barWidth + this.barMargin) + i * this.barAlign - 45, -this.yBottom + 15)
      })
    },
    listenEvent () {
      this.canvas.addEventListener('click', (e) => {
        const canvasInfo = this.canvas.getBoundingClientRect()
        console.log(this.ctx.isPointInPath(e.clientX - canvasInfo.left, e.clientY - canvasInfo.top))
      })
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
  overflow-x: auto;
  overflow-y: hidden;
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
