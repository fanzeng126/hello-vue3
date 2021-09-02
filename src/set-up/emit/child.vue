<template>
  <div>
    <button @click="click">
      点击事件
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    modelModifiers: {
      type: Object,
      default: () => {}
    },
    textModifiers: {
      type: Object,
      default: () => {}
    }
  },
  emits: {
    'update:text': function (val) {
      console.log(val)
      return !!val
    },
    'update:modelValue': function (val) {
      return val
    }
  },
  methods: {
    click () {
      console.log(this.modelModifiers)
      console.log(this.textModifiers)
      this.$emit('update:modelValue', '你是谁')
      this.$emit('update:text', null)
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
