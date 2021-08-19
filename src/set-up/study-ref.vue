<template>
  <div ref="current">
    i am fine
  </div>
</template>
<script>
import { ref, onMounted, watch, watchEffect } from 'vue'
export default {
  setup (props) {
    const current = ref(null)

    watchEffect(function () {
      console.log('watchEffect', current.value)
    })
    watch(current, function () {
      console.log('watch', current.value)
    })
    onMounted(function () {
      console.log('refs', current.value)
    })

    return {
      current
    }
  },
  methods: {
    click () {
      console.log('父组件调用了子组件的方法')
    }
  }
}
</script>
<style lang="postcss" scoped>

</style>
