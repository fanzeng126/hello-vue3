<template>
  <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
  </button>
  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a teleported modal!
        (My parent is "body")
        <button @click="modalOpen = false">
          Close
        </button>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {
  data () {
    return {
      modalOpen: false
    }
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
