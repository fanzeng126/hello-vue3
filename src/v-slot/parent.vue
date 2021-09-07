<template>
  <div>
    <vt-child>
      <template #foot="{student}">
        <i>{{ student.name }}</i>
      </template>
    </vt-child>
  </div>
</template>
<script>
import child from './child.vue'
export default {
  components: {
    'vt-child': child
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
