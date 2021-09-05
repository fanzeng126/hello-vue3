<template>
  <div class="box">
    <input
      v-model="value"
      class="input"
      type="text"
      @focus="focus"
      @blur="blur" >
  <vt-icon
    icon="down" />
  <vt-teleport
    v-if="show"
    :parent-style="parentStyle" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 123,
      show: false,
      parentStyle: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$el.top)
      console.log(this.$el.clientTop)
      console.log(this.$el.offsetTop)
      console.log(this.$el.offsetLeft)
      this.parentStyle = window.getComputedStyle(this.$el)
    })
  },
  methods: {
    focus (val) {
      this.show = true
      console.log('聚焦')
    },
    blur (val) {
      this.show = false
      console.log('离焦')
    }
  }
}
</script>
<style lang="postcss" scoped>
.box {
  position: relative;
  display: inline-block;
  top: 20px;
  left: 20px;
  .input {
    height: 32px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    color: #333;
  }
  .input:hover {
    border: 1px solid #24a7e3;
  }
  .input:focus {
    outline: none;
    border: 1px solid #008cd6 !important;
    box-shadow: 0 0 0 2px rgb(0 140 214 / 15%);
  }
  .icon {
    position:absolute;
    right: 8px;
    line-height: 32px;
  }
}
</style>
