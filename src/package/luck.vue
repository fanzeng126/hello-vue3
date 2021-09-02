<template>
  <div>
    <h1>
      今日读书的次数
    </h1>
    <h4>
      {{ e }}
    </h4>
    <h4>
      {{ name }}
    </h4>
    <h4>
      {{ counter }}
    </h4>
    <h4>
      {{ book.title }}
    </h4>
    <slot />
  </div>
</template>
<script>
import { reactive, ref, toRefs } from 'vue'
export default {
  props: {
    name: {
      type: String,
      default: '范增'
    }
  },
  emits: ['update'],
  setup (props, context) {
    const counter = ref(0)
    const book = reactive({ title: '西西弗斯' })
    const { name: e } = toRefs(props)
    console.log(context)
    return {
      e,
      counter,
      book
    }
  }
}
</script>
<style lang="postcss" scoped>

</style>
