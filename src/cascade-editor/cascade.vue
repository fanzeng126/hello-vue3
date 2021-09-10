<template>
  <div class="editor">
    <vt-input
      v-model="label"
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
      @focus="focus"
      @blur="blur"
      @clear="clear" />
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
import { computed, toRefs, ref, watch } from 'vue'
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
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const timer = ref(null)
    const input = ref(null)
    const { modelValue, options } = toRefs(props)
    const label = ref('')

    const firstOpitons = computed(() => {
      return options.value
    })

    const secondFilterValue = computed(() => {
      return options.value.filter(item => item.value === modelValue.value[0])
    })

    const secondOptions = computed(() => {
      return secondFilterValue.value.length && secondFilterValue.value[0]?.children ? secondFilterValue.value[0].children : []
    })

    const thirdFilterValue = computed(() => {
      return secondOptions.value.filter(item => item.value === modelValue.value[1])
    })

    const thirdOptions = computed(() => {
      return thirdFilterValue.value.length && thirdFilterValue.value[0]?.children ? thirdFilterValue.value[0].children : []
    })

    const fouthFilterValue = computed(() => {
      return thirdOptions.value.filter(item => item.value === modelValue.value[2])
    })

    watch(() => [...modelValue.value], function (val, oldVal) {
      if (val.length === 3) {
        label.value = secondFilterValue.value[0].label + '/' + thirdFilterValue.value[0].label + '/' + fouthFilterValue.value[0].label
      } else if (val.length) {
        label.value = ''
        clearTimeout(timer.value)
        input.value.vtInput.focus()
      }
    })

    return {
      label,
      firstOpitons,
      secondOptions,
      thirdOptions,
      timer,
      input
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
      this.$emit('update:modelValue', [])
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
</style>