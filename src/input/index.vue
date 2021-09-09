<template>
  <vt-input
    v-model="value"
    prefix-icon="search"
    placeholder="我的世界"
    :clearable="true"
    resize="horizontal" />
</template>

<script>
export default {
  data () {
    return {
      value: '',
      max: 100,
      min: 0
    }
  },
  watch: {
    // 监听数据
    value (val) {
    }
  },
  methods: {
    clickSuffixIcon (val) {
      console.log('点击后面的按钮', val)
    },
    clickPrefixIcon (val) {
      console.log('点击前面的按钮', val)
    }
  }
}
</script>
