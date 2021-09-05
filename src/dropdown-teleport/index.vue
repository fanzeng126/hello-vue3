<template>
  <div class="teleport">
    21321
  </div>
</template>
<script>
export default {
  props: {
    parentStyle: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    // const vtWidth = computed(function () {
    //   return parseInt(width)
    // })

    // const {
    //   top,
    //   bottom,
    //   left,
    //   right,
    //   width: vtWidth,
    //   height: vtHeight
    // } = this.$parent.$el.getBoundingClientRect()
    // return {
    //   // vtWidth
    // }
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  methods: {
    calculatePosition () {
      const { width, height, top, left } = this.parentStyle
      console.log(width, height, top, left)
    }
  }
}
</script>
<style lang="postcss" scoped>
.teleport {
  position: absolute;
  top: 20px;
  left: 40px;
  max-height: 200px;
  border: 1px solid red;
}
</style>
