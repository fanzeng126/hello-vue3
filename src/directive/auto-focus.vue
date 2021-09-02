<template>
  <input
    v-focus
    type="text">
  <textarea
    v-focus
    type="text" />
</template>
<script>
export default {
  directives: {
    focus: function mounted (el) {
      el.focus()
    }
  },
  data () {
    return {
    }
  }
}
</script>
