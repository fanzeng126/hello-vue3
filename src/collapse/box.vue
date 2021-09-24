<template>
  <div class="abc">
    <div>
      {{ record.title }}
      <span>
        <vt-icon
          icon="down"
          @click="click" />
      </span>
    </div>
    <div
        v-show="show"
        class="content"
        :style="{ height }">
        <p class="warp">
          {{ record.content }}
        </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      height: 0,
      show: false,
      activeShow: false
    }
  },
  mounted () {
  },
  methods: {
    click () {
      const content = this.$el.querySelector('.warp')
      console.log('content', content, this.$el.contains(content))
      this.show = true

      let offsetHeight
      if (this.show && this.height === 0) {
        setTimeout(() => {
          offsetHeight = content.offsetHeight
          this.height = `${offsetHeight}px`
        }, 1)
      } else {
        this.height = 0
        setTimeout(() => {
          this.show = false
        }, 150)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.abc {
  font-size: 0;
  position: relative;
  left: 20px;
  top: 20px;
  width: 200px;
  & > div {
    font-size: 14px;
    border: 1px solid red;
  }
}
.content {
  will-change: height;
  overflow: hidden;
  transition: height .15s;
  position: relative;
}
</style>
