<template>
  <div>
    <vt-child
      v-model:list="list" />
    <button @click="click">
      父组件
    </button>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
import child from './child.vue'
export default {
  components: {
    'vt-child': child
  },
  setup (props) {
    const student = reactive({})
    watch(student, function (val) {
      // console.log('student', val)
    })
    student.name = 2
    // console.log(student)
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    list (val) {
      console.log('父组件的list改变', val)
    }
  },
  methods: {
    click () {
      this.list.push(1)
      console.log('123131', this.list)
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
