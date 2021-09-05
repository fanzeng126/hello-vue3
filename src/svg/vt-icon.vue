<template>
  <svg :class="svgClass" aria-hidden="true">
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
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  height: 0.8em;
  width: 0.8em;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  fill: #777;
  cursor: pointer;
}
.svg-icon:hover {
  fill: #24a7e3;
}
</style>
