<template>
  <div class="example">
    <vt-button type="primary">
      primary
    </vt-button>
    <vt-button type="success">
      success
    </vt-button>
    <vt-button type="warning">
      warning
    </vt-button>
    <vt-button type="danger">
      danger
    </vt-button>
    <vt-button type="info">
      info
    </vt-button>
    <vt-button type="text">
      text
    </vt-button>
  </div>
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
<style lang="postcss" scoped>
.example {
  font-size: initial;
  & > button {
    margin-right: 10px;
  }
}
</style>
