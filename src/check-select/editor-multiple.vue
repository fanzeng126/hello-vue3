<template>
  <div class="editor">
    <vt-input
      v-model="labels"
      ref="multipleInput"
      readonly
      suffix-icon="close-circle"
      :model-visible="modelVisible"
      @focus="focus"
      @blur="blur"
      @clear="clear" />
    <vt-popper
      :visible="show"
      :style="style"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave">
      <ul>
        <li
        v-for="(item) in options"
        :key="item.value"
        :check="modelValue.includes(item.value)"
        @click="click(item)">
        {{ item.label }}
        </li>
      </ul>
    </vt-popper>
  </div>
</template>
<script>
import { computed, toRefs, ref, watch, reactive } from 'vue'
import clonedeep from 'lodash.clonedeep'
import { getRectStyle } from '../utils/getRectStyle'

// 单选选择框
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup (props) {
    const { modelValue, options } = toRefs(props)
    const multipleInput = ref(null)
    const modelVisible = ref(true)
    const selectValues = ref([])
    selectValues.value = clonedeep(modelValue.value)

    const style = reactive({})

    watch(() => [...modelValue.value], function (val) {
      console.log('xx', val)
      selectValues.value = val
    })

    const labels = computed(() => {
      const selectLabels = []
      options.value.forEach(item => {
        if (selectValues.value && selectValues.value.length && selectValues.value.includes(item.value)) {
          selectLabels.push(item.label)
        }
      })
      return selectLabels.length ? selectLabels.join('，') : ''
    })
    return {
      multipleInput,
      selectValues,
      labels,
      modelVisible,
      style
    }
  },
  data () {
    return {
      show: false,
      timer: null
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
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.show = true
    },
    blur (e) {
      if (!this.modelVisible) {
        this.timer = setTimeout(() => {
          this.show = false
        }, 200)
      }
    },
    clear () {
      this.$emit('update:modelValue', [])
    },
    click (item) {
      if (item && Reflect.has(item, 'value')) {
        const index = this.selectValues.findIndex(value => value === item.value)
        if (index > -1) {
          this.selectValues.splice(index, 1)
        } else {
          this.selectValues.push(item.value)
        }
        this.$emit('update:modelValue', clonedeep(this.selectValues))
      }
    },
    mouseenter () {
      this.modelVisible = true
    },
    mouseleave () {
      this.multipleInput.vtInput.focus()
      this.modelVisible = false
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
