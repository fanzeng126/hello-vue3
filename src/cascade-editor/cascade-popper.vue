<template>
  <div class="editor">
    <vt-input
      v-model="value"
      ref="input"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :size="size"
      :readonly="readonly"
      :name="name"
      :resize="resize"
      :icon-class="iconClass"
      :div-height="divHeight"
      @focus="focus"
      @blur="blur"
      @clear="clear" />
    <div
      v-if="!!labels.length"
      ref="cascaderTags"
      class="cascader__tags"
      @click="clickDiv">
        <span
          v-for="(item, index) in labels"
          :key="new Date()+'_'+index">
          <span>
            {{ item }}
          </span>
          <vt-icon
            icon="close-circle"
            class="icon-right"
            @click="close(index)"/>
        </span>
    </div>
    <vt-popper
      :visiable="show"
      :level="1">
      <slot
        name="firstLevel"
        :options="firstOpitons" />
    </vt-popper>
    <vt-popper
      :visiable="show && !!secondOptions.length"
      :level="2">
      <slot
        name="secondLevel"
        :options="secondOptions" />
    </vt-popper>
    <vt-popper
      :visiable="show && !!thirdOptions.length"
      :level="3">
      <slot
        name="thirdLevel"
        :options="thirdOptions" />
    </vt-popper>
  </div>
</template>
<script>
import { computed, toRefs, ref, watch, nextTick } from 'vue'
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
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
    // 控制是否能被用户缩放
    resize: {
      type: String,
      validator: (val) => ['none', 'both', 'horizontal', 'vertical'].includes(val)
    },
    iconClass: {
      type: String,
      default: ''
    },
    label: {
      type: [Array, String]
    }
  },
  emits: ['update:modelValue', 'clear', 'close'],
  setup (props, { emit }) {
    const timer = ref(null)
    const input = ref(null)
    const cascaderTags = ref(null)
    const value = ref('')
    const labels = ref([])
    const divHeight = ref(0)

    const {
      modelValue,
      options,
      label
    } = toRefs(props)

    if (!Array.isArray(label.value)) {
      value.value = label.value
      watch(label, function (newVal) {
        value.value = newVal
      })
    } else {
      // 多选时div展示框
      labels.value = label.value
      watch(() => [...labels.value], function (val) {
        if (val.length) {
          nextTick(function () {
            const { height } = cascaderTags.value.getBoundingClientRect()
            divHeight.value = height + 5
          })
        } else {
          divHeight.value = 0
        }
      })
    }

    const firstOpitons = computed(() => {
      return options.value
    })

    const secondFilterValue = computed(() => {
      return options.value.filter(item => item.value === modelValue.value[0])
    })

    const secondOptions = computed(() => {
      return secondFilterValue.value.length && !secondFilterValue.value[0]?.isLeaf ? secondFilterValue.value[0].children : []
    })

    const thirdFilterValue = computed(() => {
      return secondOptions.value.filter(item => item.value === modelValue.value[1])
    })

    const thirdOptions = computed(() => {
      return thirdFilterValue.value.length && !thirdFilterValue.value[0]?.isLeaf ? thirdFilterValue.value[0].children : []
    })

    const clearTimeOutAndFocus = function () {
      clearTimeout(timer.value)
      input.value.vtInput.focus()
    }

    return {
      firstOpitons,
      secondOptions,
      thirdOptions,
      timer,
      input,
      value,
      clearTimeOutAndFocus,
      labels,
      divHeight,
      cascaderTags
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    focus (val) {
      this.show = true
    },
    blur (e) {
      this.timer = setTimeout(() => {
        this.show = false
      }, 200)
    },
    clear () {
      this.$emit('clear', [])
    },
    close (index) {
      this.$emit('close', index)
    },
    clickDiv () {
      this.clearTimeOutAndFocus()
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
.cascader__tags {
  position: absolute;
  top: 1px;
  left: $inputElementPaddingX;
  right: 30px;
  font-size: $documentFontSize;
  display: flex;
  line-height: 22px;
  flex-wrap: wrap;
  background: #fff;
  & > span {
    display: inline-flex;
    position: relative;
    text-overflow: ellipsis;
    background: #f0f2f5;
    max-width: 100%;
    margin: 3px 6px 0 0;
    height: 24px;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 30px 0 4px;
    border-color: transparent;
    border-radius: var(--mu-block-border-radius);
    cursor: pointer;
    border: $inputBorder;
    box-sizing: border-box;
    .icon-right {
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 8px;
    }
    & > span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
