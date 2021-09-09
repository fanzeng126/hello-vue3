<template>
  <div class="box">
    <header class="header">
      头部
    </header>
    <main
      class="main"
      :style="{ height: `${height}px`, width: `${width}px` }">
      我的世界
      <vt-resize
        v-model:width="width"
        v-model:height="height"
        resize="both" />
    </main>
    <footer class="footer">
      底部
    </footer>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
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
  font-size: initial;
  position: relative;
  width: 80%;
  height: 100%;
  display: flex;
}
.header {
  height: 100px;
}
.footer {
  height: 100px;
}
.main {
  position: relative;
  flex: 1;
  font-size: 64px;
  border: 1px solid red;
}
</style>
