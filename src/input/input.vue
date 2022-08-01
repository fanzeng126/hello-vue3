<template>
  <div class="vt-input">
    <vt-icon
      v-if="prefixIcon"
      :icon="prefixIcon"
      :class="[
        iconClass,
        'tips prefix'
      ]" />
    <input
      class="vt-input_inner"
      :type="inputType"
      ref="vtInput"
      :readonly="readonly"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :autofocus="autofocus"
      :label="label"
      :tabindex="tabindex"
      :class="[
      `vt-input--${size}`
      ]"
      :name="name"
      :max="max"
      :min="min"
      :step="step"
      :prefix-icon="!!prefixIcon"
      :suffix-icon="!!inputSuffixIcon"
      :word-limit="!!inputWordLimit"
      :active="active"
      @input="input"
      @change="change"
      @focus="focus"
      @blur="blur" >
    <vt-icon
      v-if="inputSuffixIcon"
      :icon="inputSuffixIcon"
      :class="[
        iconClass,
        'tips suffix'
      ]"
      @click="clickSuffixIcon"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mouseleave="mouseup" />
    <span
      v-if="inputWordLimit"
      :class="[
        'tips msg',
        tipMsgRight
      ]">
      {{ limitTips }}
    </span>
    <vt-resize
        v-model:width="width"
        v-model:height="height"
        :resize="resize" />
  </div>
</template>
<script>
import { toRefs, computed, watch, ref } from 'vue'
import './input.pcss'

/**
 * 生成文字限制提示
 * @param {*} value 当前输入文字
 * @param {*} wordLimit 文字限制字数
 * @response 0/10
 */
const calLimitTips = function ({ value, wordLimit }) {
  const limitTips = ref(`0/${wordLimit.value}`)
  watch(value, function (newVal, oldVal) {
    limitTips.value = `${newVal.length}/${wordLimit.value}`
  })
  return limitTips
}

export default {
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (val) => ['number', 'password', 'text'].includes(val)
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    // 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
    wordLimit: {
      type: Number
    },
    // 输入框占位文本
    placeholder: {
      type: String,
      default: ''
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否显示切换密码图标
    showPassword: {
      type: Boolean,
      default: false
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: (val) => ['medium', 'small', 'mini', 'normal'].includes(val),
      default: 'normal'
    },
    // 输入框头部图标
    prefixIcon: {
      type: String,
      default: ''
    },
    // 输入框尾部图标
    suffixIcon: {
      type: String,
      default: ''
    },
    // 只读
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    step: {
    },
    // 控制是否能被用户缩放
    resize: {
      type: String,
      validator: (val) => ['none', 'both', 'horizontal', 'vertical'].includes(val)
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    // 输入框关联的label文字
    label: {
      type: String
    },
    // 输入框的tabindex
    tabindex: {
      type: String
    },
    validateEvent: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String,
      default: ''
    },
    divHeight: {
      type: Number
    }
  },
  emits: [
    'update:modelValue',
    'focus',
    'blur',
    'clear',
    'change',
    'input'
  ],
  setup (props, { emit }) {
    const { modelValue: value, type, wordLimit, suffixIcon, clearable } = toRefs(props)

    const vtInput = ref(null)

    const seePassword = ref(false)
    // 是否选中状态
    const active = ref(false)

    const inputType = computed(() => seePassword.value ? 'text' : type.value)

    const inputWordLimit = computed(() => wordLimit.value && type.value === 'text')

    const tipMsgRight = computed(() => inputWordLimit.value && clearable.value ? 'right' : '')

    const limitTips = calLimitTips({ value, wordLimit })

    // 为密码时，默认展示眼镜，可清空时，默认展示×号

    const inputSuffixIcon = computed(() => type.value === 'password' ? 'eyes' : clearable.value ? 'close-circle' : suffixIcon.value)

    return {
      value,
      inputWordLimit,
      limitTips,
      inputSuffixIcon,
      seePassword,
      inputType,
      vtInput,
      tipMsgRight, // 字符限制提示的右边距
      active
    }
  },
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  mounted () {
    // 获取到结束渲染之后的input的高，宽
    setTimeout(() => {
      const {
        width,
        height
      } = this.vtInput.getBoundingClientRect()
      this.width = width
      this.height = height
    }, 1)
  },
  watch: {
    width (val) {
      const htmlFontSize = this.$htmlFontSize()
      this.vtInput.style.width = `${val / htmlFontSize}rem`
    },
    height (val) {
      const htmlFontSize = this.$htmlFontSize()
      this.vtInput.style.height = `${val / htmlFontSize}rem`
    },
    divHeight (val) {
      if (val > this.height) {
        const htmlFontSize = this.$htmlFontSize()
        this.vtInput.style.height = `${val / htmlFontSize}rem`
      } else {
        const htmlFontSize = this.$htmlFontSize()
        this.vtInput.style.height = `${this.height / htmlFontSize}rem`
      }
    }
  },
  methods: {
    input (e) {
      this.$emit('update:modelValue', e.target.value)
    },
    change (e) {
      let newVal = e.target.value
      if (newVal.length > this.wordLimit) {
        newVal = newVal.substr(-this.wordLimit)
      }
      e.target.value = newVal
      this.$emit('update:modelValue', newVal)
    },
    focus (e) {
      // 选中事件时设置选中状态
      this.active = true
      this.$emit('focus', true)
    },
    blur (e) {
      this.active = false
      this.$emit('blur', false)
    },
    clickSuffixIcon (e) {
      switch (this.inputSuffixIcon) {
        case 'close-circle':
          this.$emit('clear', '')
          break
        default:
          break
      }
    },
    mouseup () {
      if (this.inputSuffixIcon === 'eyes') this.seePassword = false
    },
    mousedown () {
      if (this.inputSuffixIcon === 'eyes') this.seePassword = true
    }
  }
}
</script>
<style lang="postcss" scoped>
.tips {
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.tips.msg {
  right: 10px;
  font-size: $tipFontSize;
  color: $tipFontColor;
}
.tips.msg.right {
  right: 26px;
}
.prefix {
  left: 10px;
}
.suffix {
  right: 10px;
}
</style>
