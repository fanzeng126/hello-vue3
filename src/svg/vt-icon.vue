<template>
  <svg :class="classes" aria-hidden="true">
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
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    },
    classes () {
      const classes = ['svg-icon', this.className]
      if (this.icon === 'loading') classes.push('frame-loading')
      return classes
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
