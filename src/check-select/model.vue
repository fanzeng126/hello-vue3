<template>
  <div class="model">
    <vt-check />
  </div>
</template>

<script>
import check from './index.vue'
export default {
  components: {
    'vt-check': check
  },
  mounted () {
  }
}
</script>
<style scoped>
.model {
  position: absolute;
  top: 200px;
}
</style>
