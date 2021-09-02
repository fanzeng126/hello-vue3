<template>
  <div>
    <h1>
      {{ msg }}
    </h1>
    <h2>
      {{ text }}
    </h2>
    <c-child v-model:text.form="text" />
  </div>
</template>
<script>
import child from './child.vue'
export default {
  components: {
    'c-child': child
  },
  data () {
    return {
      msg: 'emit事件',
      text: ''
    }
  },
  watch: {
    text (val) {
      console.log('响应变化', val)
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
