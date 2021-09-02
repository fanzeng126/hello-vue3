<template>
  <div ref="root">
    1231
  </div>
</template>
<script>
import { ref, watchEffect } from 'vue'
export default {
  setup (props) {
    const root = ref(null)
    watchEffect(() => {
      // 这个副作用在 DOM 更新之前运行，因此，模板引用还没有持有对元素的引用。
      console.log(root.value) // => null
    },
    {
      flush: 'post'
    })
    return {
      root
    }
  }
}
</script>
