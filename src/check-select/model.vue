<template>
  <div class="model">
    <vt-check
      v-model="value"
      :options="options" />
    <vt-multiple-check
      v-model="multipleValue"
      :options="options" />
  </div>
</template>

<script>
import check from './editor.vue'
import editorMultiple from './editor-multiple.vue'

function createData () {
  let i = 0
  const res = []
  while (i < 2500) {
    i++
    res.push({ value: i, label: `${i}&年纪` })
  }
  return res
}

export default {
  components: {
    'vt-check': check,
    'vt-multiple-check': editorMultiple
  },
  data () {
    return {
      value: 0,
      multipleValue: [],
      options: createData()
      //  [
      //   { value: 1, label: '一年级' },
      //   { value: 2, label: '二年级' },
      //   { value: 3, label: '三年级' },
      //   { value: 4, label: '四年级' },
      //   { value: 5, label: '五年级' },
      //   { value: 6, label: '六年级' },
      //   { value: 7, label: '七年级' },
      //   { value: 8, label: '初一年级' },
      //   { value: 9, label: '初二年级' },
      //   { value: 10, label: '初三年级' },
      //   { value: 11, label: '高一年级' },
      //   { value: 12, label: '高二年级' },
      //   { value: 13, label: '高三年级' },
      //   { value: 14, label: '大一年级' },
      //   { value: 15, label: '大二年级' },
      //   { value: 16, label: '大三年级' },
      //   { value: 17, label: '大四年级' }
      // ]
    }
  },
  watch: {
    value (val) {
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
</style>
