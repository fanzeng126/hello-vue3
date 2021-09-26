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
    <vt-wrapper
      v-model="visiable"
      :modal-append-to-body="true">
      <div class="content">
       <main>
         这是主体
        </main>
      </div>
    </vt-wrapper>
  </div>
</template>
<script>
import wrapper from './wrapper.vue'

export default {
  components: {
    'vt-wrapper': wrapper
  },
  data () {
    return {
      name: '弹窗wrapper',
      visiable: false
    }
  },
  methods: {
    open () {
      this.visiable = true
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
