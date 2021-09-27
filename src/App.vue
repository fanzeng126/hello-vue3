<template>
  <router-view/>
</template>

<style lang="postcss">
* {
  margin: 0;
}
body.resize-right {
  cursor: e-resize;
}
body.resize-bottom {
  cursor: s-resize;
}
.vt-bottom {
  left: 40px !important;
  right: 40px !important;
  bottom: 0;
  height: 40% !important;
  border-radius: 8px 8px 0 0;
}
</style>
