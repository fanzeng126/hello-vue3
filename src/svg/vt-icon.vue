<template>
  <svg
    class="svg-icon"
    aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'svgIcon',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style lang="postcss" scoped>
.svg-icon {
  height: $svgItemSize;
  width: $svgItemSize;
  fill: $svgFillColor;
  cursor: pointer;
  vertical-align: top;
  &:hover {
    fill: $svgFillHoverColor;
  }
}
</style>
