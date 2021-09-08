<template>
  <div class="vt-input">
    <vt-icon
      v-if="prefixIcon"
      :icon="prefixIcon"
      :class="[
        iconClass,
        'icon-prefix'
      ]" />
    <input
      class="vt-input_inner"
      :type="inputTpye"
      ref="input"
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
      @input="input"
      @change="change"
      @focus="focus"
      @blur="blur"
      @select="select" >
    <vt-icon
      v-if="inputSuffixIcon"
      :icon="inputSuffixIcon"
      :class="[
        iconClass,
        'icon-suffix'
      ]"
      @click="clickSuffixIcon"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mouseleave="mouseup" />
    <span
      v-if="inputWordLimit"
      class="tips">
      {{ limitTips }}
    </span>
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

    const seePassword = ref(false)

    const inputTpye = computed(() => seePassword.value ? 'text' : type.value)

    const inputWordLimit = computed(() => wordLimit.value && type.value === 'text')

    const limitTips = calLimitTips({ value, wordLimit })

    // 为密码时，默认展示眼镜，可清空时，默认展示×号

    const inputSuffixIcon = computed(() => type.value === 'password' ? 'eyes' : clearable.value ? 'close' : suffixIcon.value)

    watch(value, function (newVal, olaVal) {
      if (newVal.length > wordLimit.value) {
        emit('update:modelValue', newVal.substr(-10))
      }
    })

    return {
      value,
      inputWordLimit,
      limitTips,
      inputSuffixIcon,
      seePassword,
      inputTpye
    }
  },
  methods: {
    input (e) {
      this.$emit('update:modelValue', e.target.value)
    },
    change (e) {
      this.$emit('update:modelValue', e.target.value)
    },
    focus (e) {
      this.$emit('focus', true)
    },
    blur (e) {
      this.$emit('blur', false)
    },
    clickSuffixIcon (e) {
      switch (this.inputSuffixIcon) {
        case 'close':
          this.$emit('update:modelValue', '')
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
    },
    select (e) {
    }
  }
}
</script>
<style lang="postcss" scoped>
.tips {
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
  font-size: $tipFontSize;
  color: $tipFontColor;
}
.icon-prefix {
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  cursor: pointer;
}
.icon-suffix {
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
}
</style>
