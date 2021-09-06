<template>
  <div
    class="teleport"
    :style="style">
    21321
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
export default {
  props: {
    parentStyle: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const style = reactive({})
    onMounted(function () {
      console.log('213', this)
    })
    return {
      style
    }
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
  },
  methods: {
  }
}
</script>
<style lang="postcss" scoped>
.teleport {
  position: absolute;
  max-height: 200px;
  border: 1px solid red;
}
</style>
