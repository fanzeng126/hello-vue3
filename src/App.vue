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
.drawer-model {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .5;
  background: #000;
}
</style>
