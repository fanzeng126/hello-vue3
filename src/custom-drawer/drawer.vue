<template>
  <div
    class="drawer"
    :class="{show}">
    <slot />
  </div>
</template>
<script>
// import { add } from './model'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  emits: ['change'],
  watch: {
    visible (val) {
      if (val) {
        // const modal = add()
        // document.body.appendChild(modal)
        // modal.addEventListener('click', () => {
        //   this.close()
        // })
        setTimeout(() => {
          this.show = true
        }, 1)
      }
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.show = false
      setTimeout(() => {
        this.$emit('change', false)
      }, 300)
    }
  }
}
</script>
<style lang="postcss" scoped>
.drawer {
  transform: translateX(100%);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40%;
  border: 1px solid red;
  background: #fff;
  transition: all .3s;
  font-size: 1rem;
  z-index: 22;
  display: flex;
}
.drawer.show {
  transform: translateX(0);
}

</style>
