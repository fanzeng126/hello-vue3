<template>
  <input
    v-focus
    id="number"
    type="number"
    v-model="padding">
  <div v-fpin:[direction]="padding">
    fixed部局
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      mounted (el) {
        el.focus()
      }
    },
    pin: {
      mounted (el, binding) {
        el.style.position = 'fixed'
        const direction = binding.arg || 'top'
        el.style[direction] = `${binding.value}px`
      },
      updated (el, binding) {
        el.style.position = 'fixed'
        const direction = binding.arg || 'top'
        el.style[direction] = `${binding.value}px`
      }
    },
    fpin (el, binding) {
      el.style.position = 'fixed'
      const direction = binding.arg || 'top'
      el.style[direction] = `${binding.value}px`
    }
  },
  data () {
    return {
      direction: 'left',
      padding: 100
    }
  }
}
</script>
<style lang="postcss" scoped>

</style>>
