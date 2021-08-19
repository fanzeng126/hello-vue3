<template>
  <div class="modal-child">
    <h1>
      我的世界
    </h1>
    <modal-button
      @change="change">
      <div>
        这个是模态框弹出的内容
      </div>
    </modal-button>
  </div>
</template>
<script>
import modalButton from '../components/modal-button.vue'
export default {
  components: {
    'modal-button': modalButton
  },
  methods: {
  }
}
</script>
<style lang="postcss" scoped>
.modal-child {
  position: relative;
  width: 50%;
  height: 50%;
  border: 1px dashed greenyellow;
}
</style>
