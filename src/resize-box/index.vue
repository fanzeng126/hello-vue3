<template>
  <div class="box">
    我的世界
    <vt-resize />
  </div>
</template>
<script>
import resizeBox from './resize-box.vue'
export default {
  components: {
    'vt-resize': resizeBox
  }
}
</script>
<style lang="postcss" scoped>
.box {
  position: relative;
  left: 200px;
  top: 200px;
  font-size: 64px;
  width: 500px;
  border: 1px solid red;
}
</style>
