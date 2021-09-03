<template>
  <div class="box">
    <input
      v-model="value"
      class="input"
      type="text"
      @focus="focus"
      @blur="blur" >
  <vt-icon
    icon="close" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 123
    }
  },
  methods: {
    focus (val) {
      console.log('聚焦')
    },
    blur (val) {
      console.log('离焦')
    }
  }
}
</script>
<style>
.box {
  position: relative;
  display: inline-block;
}
.input {
  height: 32px;
  box-sizing: border-box;
}
.icon {
  position:absolute;
  right: 8px;
  line-height: 32px;
}
</style>
