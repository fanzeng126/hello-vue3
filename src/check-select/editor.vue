<template>
  <div class="editor">
    <vt-input
      v-model="label"
      ref="selectInput"
      readonly
      suffix-icon="close-circle"
      @focus="focus"
      @blur="blur"
      @clear="clear" />
    <vt-popper
      :visible="show"
      :style="style">
      <ul>
        <li
        v-for="(item) in options"
        :key="item.value"
        :check="item.value === modelValue"
        @click="click(item)">
        {{ item.label }}
        </li>
      </ul>
    </vt-popper>
  </div>
</template>
<script>
import { computed, toRefs, ref, reactive } from 'vue'
import { getRectStyle } from '../utils/getRectStyle'
// 单选选择框
export default {
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { modelValue, options } = toRefs(props)
    const selectInput = ref(null)
    const label = computed(() => {
      const filterValue = options.value.filter(item => item.value === modelValue.value)
      return filterValue.length ? filterValue[0].label : ''
    })

    const style = reactive({})
    return {
      selectInput,
      label,
      style
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    // 计算弹窗的位置
    setTimeout(() => {
      this.calcPopperPosition()
    })
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        this.calcPopperPosition()
      })
    })
  },
  methods: {
    focus (val) {
      this.show = true
    },
    blur (e) {
      setTimeout(() => {
        this.show = false
      }, 200)
    },
    clear () {
      this.$emit('update:modelValue', null)
    },
    click (item) {
      this.$emit('update:modelValue', item.value)
    },
    calcPopperPosition () {
      const htmlFontSize = this.$htmlFontSize()
      const {
        top,
        left,
        width,
        upOrUnder
      } = getRectStyle(this.$el)
      this.style.top = (top / htmlFontSize) + 'rem'
      this.style.left = (left / htmlFontSize) + 'rem'
      this.style.width = (width / htmlFontSize) + 'rem'
      if (!upOrUnder) {
        this.style.transform = 'translateY(-100%)'
      } else {
        this.style.transform = 'none'
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.editor {
  font-size: 0;
  position: relative;
  display: inline-block;
}
ul {
  padding: 0;
  li {
    padding-left: $inputElementPaddingX;
    cursor: pointer;
  }
  li:hover {
    background: $normalGreyBackground;
    color: $primaryColor;
  }
  li[check=true] {
    font-weight: bolder;
    color: $primaryColor;
  }
}
</style>
