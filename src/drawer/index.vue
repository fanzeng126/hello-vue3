<template>
  <div class="home">
    <vt-button
      type="primary"
      @click="click">
      primary
    </vt-button>
    <vt-drawer-model
      v-model="show"
      position="right"
      ref="test"
      :modal-append-to-body="true"
      :wrapper-closable="false"
      :visible-model="false">
      <div class="drawer-box">
        <header
          class="header">
          <h5>
            矿物有色金属制作委员会
          </h5>
          <vt-icon
            icon="close"
            @click="close" />
        </header>
        <main class="content">
          <div class="find">
            <label>
              我的文字内容
            </label>
            <vt-cascade
              :options="options" />
          </div>
        </main>
        <footer class="footer">
          <vt-button
            type="info"
            @click="close">
            取消
          </vt-button>
          <vt-button type="primary">
            确定
          </vt-button>
        </footer>
      </div>
    </vt-drawer-model>
  </div>
</template>
<script>
import data from '../cascade-editor/data'
export default {
  mixins: [data],
  components: {
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    click () {
      this.show = !this.show
    },
    close () {
      this.$refs.test.hide()
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
  * {
    padding: 8px;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    flex: 1;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    .find {
      display: flex;
      align-items: center;
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
    & > button {
      margin-left: 8px;
    }
  }
}

</style>
