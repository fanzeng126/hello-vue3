<template>
  <button @click="modalOpen=true">
    Open full screen modal!
  </button>
  <c-modal
    :modal-open="modalOpen"
    @change="modalOpen=false">
    121231
  </c-modal>
</template>
<script>
import modal from './modal.vue'
export default {
  components: {
    'c-modal': modal
  },
  data () {
    return {
      modalOpen: false
    }
  },
  methods: {
  }
}
</script>
<style lang="postcss" >
</style>
