<template>
  <div
    class="box"
    :style="{ height: `${height}px`, width: `${width}px` }">
    我的世界
    <vt-resize
      v-model:width="width"
      v-model:height="height" />
  </div>
</template>
<script>
import { ref } from 'vue'
import resizeBox from './resize-box.vue'
export default {
  components: {
    'vt-resize': resizeBox
  },
  setup () {
    const height = ref(300)

    const width = ref(500)

    return {
      height,
      width
    }
  },
  methods: {
  }
}
</script>
<style lang="postcss" scoped>
.box {
  position: relative;
  left: 200px;
  top: 200px;
  font-size: 64px;
  border: 1px solid red;
}
body {
  pointer-events: none;
}
</style>
