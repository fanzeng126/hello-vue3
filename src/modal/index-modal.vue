<template>
  <div class="box">
    <h1>
      {{ name }}
    </h1>
    <vt-button
      class="submit"
      type="primary"
      @click="open">
      open
    </vt-button>
    <vt-modal
      v-model="visiable"
      @onClickButton="onClickButton">
      <div class="content">
       <main>
          <vt-cascade-multiple
            :options="options" />
        </main>
      </div>
    </vt-modal>
  </div>
</template>
<script>
import modal from './modal.vue'
import data from '../cascade-editor/data'

export default {
  mixins: [data],
  components: {
    'vt-modal': modal
  },
  data () {
    return {
      name: '弹窗modal',
      visiable: false
    }
  },
  methods: {
    open () {
      this.visiable = true
    },
    onClickButton (button, win) {
      if (button === 'cancel') {
        win.hide()
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.box {
  font-size: 0px;
  position: relative;
  h1 {
    font-size: 24px;
  }
  .submit {
    left: 20px;
    top: 20px;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    main {
      border-top: 1px solid #999;
      border-bottom: 1px solid #999;
      flex: 1;
      padding: 10px;
    }
  }
}
</style>
