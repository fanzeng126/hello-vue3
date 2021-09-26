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
    <vt-dialog
      v-model="visiable"
      @onClickButton="onClickButton">
      <div class="content">
       <main>
          <div>
            <label>
              输入框
            </label>
            <vt-input
              v-model="text"
              prefix-icon="search"
              placeholder="我的世界"
              :clearable="true"
              resize="both"
              @clear="clear" />
          </div>
          <div>
            <label>
              级联多选选择
            </label>
            <vt-cascade-multiple
              :options="options" />
          </div>
          <div>
            <label>
              级联单选
            </label>
            <vt-cascade
              :options="options" />
          </div>
          <div>
            <label>
              单选
            </label>
            <vt-check
              v-model="value"
              :options="arr" />
          </div>
        </main>
      </div>
    </vt-dialog>
  </div>
</template>
<script>
import dialog from './dialog.vue'
import data from '../cascade-editor/data'

export default {
  mixins: [data],
  components: {
    'vt-dialog': dialog
  },
  data () {
    return {
      name: '弹窗modal',
      visiable: false,
      text: '',
      value: 0,
      arr: [
        { value: 1, label: '一年级' },
        { value: 2, label: '二年级' },
        { value: 3, label: '三年级' },
        { value: 4, label: '四年级' },
        { value: 5, label: '五年级' },
        { value: 6, label: '六年级' },
        { value: 7, label: '七年级' },
        { value: 8, label: '初一年级' },
        { value: 9, label: '初二年级' },
        { value: 10, label: '初三年级' },
        { value: 11, label: '高一年级' },
        { value: 12, label: '高二年级' },
        { value: 13, label: '高三年级' },
        { value: 14, label: '大一年级' },
        { value: 15, label: '大二年级' },
        { value: 16, label: '大三年级' },
        { value: 17, label: '大四年级' }
      ]
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
    },
    clear () {
      this.text = ''
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
      & > div {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        & > label {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
