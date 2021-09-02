<template>
  <div id="parent">
    这个是父亲的大小
    <c-child
        name="夏利"
        v-model:modal-open="modalOpen"
        v-model:name="name"
        v-model.min="address"
        v-model.max="age" />
    <button @click="modalOpen=true">
      点击打开弹窗
    </button>
  </div>
</template>
<script>
import child from './child.vue'
import { watch, ref } from 'vue'
export default {
  components: {
    'c-child': child
  },
  emits: ['click'],
  data () {
    return {
      name: '夏利',
      age: 18,
      address: 123
    }
  },
  setup () {
    const modalOpen = ref(false)
    watch(modalOpen, function (val) {
      console.log('父组件改变', val)
    })
    return {
      modalOpen
    }
  },
  watch: {
    name (val) {
      console.log('修改父组件的名称', val)
    },
    age (val) {
      console.log('年龄', val)
    },
    address (val) {
      console.log('address', val)
    }
  }
}
</script>
<style lang="postcss" scoped>
#parent {
  position: relative;
  border: 1px solid green;
}
</style>
