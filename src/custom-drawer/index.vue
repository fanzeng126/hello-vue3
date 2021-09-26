<template>
  <div class="home">
    <vt-button
      type="primary"
      @click="click">
      primary
    </vt-button>
    <!-- <vt-modal
      v-model="show"
      :modal-append-to-body="true" /> -->
    <vt-drawer
      ref="cDrawer"
      v-model="show">
      <div class="drawer-box">
        <div class="header">
          这是文字标题
        </div>
        <div class="content">
          我的文字内容
          <vt-cascade
            :options="options" />
        </div>
        <div class="footer">
          底部数据
        </div>
      </div>
    </vt-drawer>
  </div>
</template>
<script>
import data from '../cascade-editor/data'
import drawer from './drawer.vue'
export default {
  mixins: [data],
  components: {
    'vt-drawer': drawer
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    click () {
      console.log('click')
      this.show = !this.show
    },
    change () {
      this.show = false
    }
  }
}
</script>
<style lang="postcss" scoped>
.home {
  font-size: 0;
  position: relative;
  padding: 40px 0 0 40px;
}
.drawer-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: 24px;
  .content {
    flex: 1;
  }
}
</style>
