<template>
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
.vt-button {
  position: relative;
  display: inline-block;
  height: $inputElementHeight;
  padding: 0 $inputElementPaddingX;
  outline: none;
  border: 1px solid $normalBorderColor;
  border-radius: var(--mu-block-border-radius);
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: $normalBackground;
  /* vertical-align: middle; */
  font-size: $buttonFontSize;
  text-decoration: none;
  text-align: center;
  color: $normalTextColor;
  cursor: pointer;
  box-shadow: $buttonShadow $normalGreyBackground;
  &:hover {
    border-color: var(--mu-primary-minus-color);
    color: var(--mu-primary-minus-color);
    box-shadow: $buttonHoverShadow var(--mu-primary-shadow-color);
  }
}
.vt-button--primary {
  color: $primaryColor;
}
.vt-button--success {
  color: $successColor;
}
.vt-button--danger {
  color: $dangerColor;
}
.vt-button--warning {
  color: $warningColor;
}
.vt-button--info {
  color: #ddd;
}
.vt-button--text {
  color: $normalTextColor;
}
</style>
