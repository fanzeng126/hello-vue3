<template>
  <div class="chart bar">
    <canvas id="tutorial" width="300" height="300"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      littleH: 5,
      ctx: null
    }
  },
  mounted () {
    this.init()
    this.draw()
  },
  methods: {
    init () {
      const canvas = this.$el.querySelector('#tutorial')
      console.log(canvas)
      this.ctx = canvas.getContext('2d')
    },
    createBar ({ color, w, h, x, y }) {
      const gr = this.ctx.createLinearGradient(0, y, 0, y + h)
      // 颜色断点
      gr.addColorStop(1, 'rgb(0,255,116,.2)')
      gr.addColorStop(0.5, 'rgb(0,255,116,.5)')
      gr.addColorStop(0, 'rgb(0,255,116,.8)')
      this.ctx.fillStyle = gr
      this.ctx.fillRect(x, y, w, h)
      this.ctx.fillStyle = '#00ffb5'
      this.ctx.fillRect(x, y - this.littleH, w, this.littleH)
    },
    draw () {
      this.createBar({
        w: 10,
        h: 50,
        x: 25,
        y: 200
      })

      this.createBar({
        w: 10,
        h: 150,
        x: 40,
        y: 100
      })

      this.createBar({
        w: 10,
        h: 240,
        x: 55,
        y: 10
      })

      this.createBar({
        w: 10,
        h: 240,
        x: 160,
        y: 10
      })

      this.createBar({
        w: 10,
        h: 240,
        x: 260,
        y: 10
      })

      this.createBar({
        w: 10,
        h: 240,
        x: 360,
        y: 10
      })

      this.ctx.setLineDash([5, 2])
      this.ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      this.ctx.lineWidth = 2
      this.ctx.beginPath()
      this.ctx.moveTo(10, 250)
      this.ctx.lineTo(250, 250)
      this.ctx.closePath()
      this.ctx.stroke()
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
  width: 400px;
  height: 400px;
  border: 1px solid rgb(82, 40, 40);
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid black;
  background-color: #444;
}
</style>
