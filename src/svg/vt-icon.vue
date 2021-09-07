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
      default: 'default'
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
.svg-icon.default {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
@keyframes loading {
  0%   {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
.frame-loading {
  animation-name: loading;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

</style>
