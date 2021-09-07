<template>
  <vt-button
    :loading="true"
    >
    <span>
      提交
    </span>
  </vt-button>
</template>

<script>
import button from './button.vue'
export default {
  components: {
    'vt-button': button
  },
  setup () {
    return {}
  }
}
</script>
