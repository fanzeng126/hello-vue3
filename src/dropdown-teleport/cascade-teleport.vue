<template>
  <div
    class="teleport"
    :style="style">
    <ul>
      <li
       v-for="(item) in options"
       :key="item.value"
       :check="item.value === modelValue"
       @click="click(item)">
        <span>
          {{ item.label }}
        </span>
        <vt-icon
          v-if="item.children"
          :key="new Date() + '-'+ item.value"
          icon="right"
          class="icon-right" />
      </li>
    </ul>
     <teleport-border
      ref="svg"
      :width="elWidth"
      :height="elHeight"
      :style="style"/>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import teleportBorder from './teleport-border.vue'
import VtIcon from '../svg/vt-icon.vue'
export default {
  components: {
    'teleport-border': teleportBorder,
    VtIcon
  },
  emits: ['update:modelValue'],
  props: {
    level: {
      type: Number,
      default: 1
    },
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Number,
      default: null
    }
  },
  setup (props) {
    const svg = ref(null)
    const style = reactive({})
    const elWidth = ref(0)
    const elHeight = ref(0)
    return {
      style,
      elWidth,
      elHeight,
      svg
    }
  },
  unmounted () {
  },
  mounted () {
    this.$nextTick(() => {
      const {
        top,
        left,
        width: vtWidth,
        height: vtHeight
      } = this.$parent.$el.getBoundingClientRect()
      this.style.top = top + vtHeight + 5 + 'px'
      this.style.left = (this.level - 1) * vtWidth + left + 'px'
      this.style.width = vtWidth + 'px'
      setTimeout(() => {
        this.initBorder()
      })
    })
    document.body.appendChild(this.$el)
    window.addEventListener('resize', this.initBorder)
  },
  watch: {
  },
  methods: {
    initBorder () {
      const { width, height } = this.$el.getBoundingClientRect()
      this.elWidth = parseInt(width, 10)
      this.elHeight = parseInt(height, 10)
    },
    click (item) {
      if (item.children || this.level === 3) {
        this.$emit('update:modelValue', item.value)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.teleport {
  transition: all ease .8s;
  position: absolute;
  max-height: 300px;
  font-size: 12px;
  overflow: auto;
  border-radius: 4px;
  margin-top: 6px;
  padding: 4px 0;
  line-height: 24px;
  ul {
    padding: 0;
    li {
      position: relative;
      padding-left: 16px;
      .icon-right {
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 8px;
      }
    }
    li:hover {
      background: $normalGreyBackground;
      color: $primaryColor;
    }
    li[check=true] {
      font-weight: 700;
      color: $primaryColor;
    }
  }
}
</style>
