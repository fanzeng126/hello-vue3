<template>
  <div v-if="visible" class="modal">
    <button @click="visible = false;$emit('change', false)">
      Close
    </button>
    <slot />
  </div>
</template>
<script>
import { ref, toRefs, watch } from 'vue'
export default {
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  data () {
    return {
    }
  },
  setup (props) {
    const visible = ref(false)
    const { modalOpen } = toRefs(props)
    visible.value = modalOpen.value

    watch(modalOpen, function (val) {
      visible.value = val
    })
    return {
      visible
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
  }
}
</script>
<style lang="postcss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #999;
}
</style>
