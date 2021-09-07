<template>
  <button @click="click">
    添加
  </button>
</template>
<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const arr = reactive([])
    const { list } = toRefs(props)
    arr.splice(0, arr.length, ...list.value)
    watch(() => [...arr], function (val) {
      console.log('123131', val)
    })
    watch(() => [...list.value], function (val) {
      arr.splice(0, arr.length, ...list.value)
    })
    return {
      clist: list,
      arr
    }
  },
  data () {
    return {
      ages: []
    }
  },
  mounted () {
    console.log(this.list === this.clist)
  },
  watch: {
  },
  methods: {
    click () {
      console.log(this.list, this.arr)
      this.arr.splice(0, this.arr.length, 1)
      this.ages.push(5)
    }
  }
}
</script>
