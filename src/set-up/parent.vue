<template>
  <div id="parent">
    这个是父亲的大小
    <teleport to='body'>
      <c-child
        name="夏利"
        :modal-open="modalOpen" />
    </teleport>
    <button @click="modalOpen=true">
      点击打开弹窗
    </button>
  </div>
</template>
<script>
import child from './child.vue'
export default {
  components: {
    'c-child': child
  },
  emits: ['click'],
  data () {
    return {
      modalOpen: false
    }
  }
}
</script>
<style lang="postcss" scoped>
#parent {
  position: relative;
  border: 1px solid green;
}
</style>
