<template>
  <div class="box">
    <vt-cascade
      :options="options" />
    <vt-cascade-multiple
       class="cascade-multiple"
      :options="options" />
  </div>
</template>
<script>

import data from './data'
export default {
  mixins: [data]
}
</script>
<style lang="postcss" scoped>
.box {
  font-size: 0px;
  & > div {
    float: left;
    margin-right: 200px;
  }
}
.cascade-multiple {
  position: absolute !important;
  bottom: 320px;
}
</style>
