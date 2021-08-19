<template>
  <div class="p-child">
    这个是子组件
  </div>
</template>
<script>
import { toRefs } from 'vue'
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  setup (props) {
    const { name, modalOpen } = toRefs(props)
    console.log('name', name)
    return {
      modalOpen
    }
  }
}
</script>
<style lang="postcss" scoped>
.p-child {
  background: #999;
  height: 50%;
  width: 50%;
}
</style>
