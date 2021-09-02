<template>
  <div class="package-home">
    <div class="box">
      <h1>
        setUp
      </h1>
      <h2>
        父组件
      </h2>
      <h3>
        当前登录用户：
      </h3>
      <span>
        {{ user }}
      </span>
      <h3>
        请输入新用户：
      </h3>
      <input type="text" :value="user" @change="change" />
    </div>
    <cmd-index :user="user" />
  </div>
</template>
<script>
import index from './new.vue'
export default {
  components: {
    'cmd-index': index
  },
  data () {
    return {
      user: '范增'
    }
  },
  methods: {
    change (e) {
      this.user = e.target.value
    }
  }
}
</script>
<style scoped>
.box {
  display: inline-block;
  margin-right: 16px;
}
</style>
