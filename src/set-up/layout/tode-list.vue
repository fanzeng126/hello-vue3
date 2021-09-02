<template>
  <ul>
    <li
     v-for="(item, index) in items"
     :key="index">
     <slot :item="item" />
    </li>
  </ul>
  <button @click="click">
    pushData
  </button>
  <todo-static />
</template>
<script>
import { computed, ref } from 'vue'
import todoStatic from './todo-list-static.vue'
export default {
  components: {
    'todo-static': todoStatic
  },
  provide () {
    return {
      length: computed(() => {
        return this.items.length
      }),
      number: this.number
    }
  },
  setup () {
    const number = ref(1)
    return {
      number
    }
  },
  data () {
    return {
      items: ['aaa', 'bbb']
    }
  },
  watch: {
    number (val) {
      console.log('number', val)
    }
  },
  methods: {
    click () {
      this.items.push('ccc')
      this.number = 2
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
