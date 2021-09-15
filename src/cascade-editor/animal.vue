<template>
  <div class="box">
    <vt-cascade
      v-model="value"
      :options="options" />
  </div>
</template>
<script>

import animal from './animal'
export default {
  mixins: [animal],
  data () {
    return {
      value: []
    }
  },
  watch: {
    value (val) {
      console.log(val.length, val)
      if (val.length === 1) {
        const select = this.options.find(item => item.value === val[0])
        select.isLeaf = false
        select.children = [
          { value: 11, label: '一班', isLeaf: true, parentId: 1 },
          { value: 12, label: '二班', isLeaf: true, parentId: 1 },
          { value: 13, label: '三班', isLeaf: true, parentId: 1 },
          { value: 14, label: '四班', isLeaf: true, parentId: 1 },
          { value: 15, label: '五班', isLeaf: true, parentId: 1 },
          { value: 16, label: '六班', isLeaf: true, parentId: 1 },
          { value: 17, label: '七班', isLeaf: true, parentId: 1 },
          { value: 18, label: '八班', isLeaf: true, parentId: 1 }
        ]
      }
    }
  }
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
</style>
