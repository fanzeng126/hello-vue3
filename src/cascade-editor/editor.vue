<template>
  <div class="editor">
    <vt-input
      v-model="label"
      ref="input"
      readonly
      suffix-icon="down"
      clearable
      @focus="focus"
      @blur="blur"
      @clear="clear" />
    <vt-popper
      :visiable="show"
      :level="1">
      <ul>
        <li
        v-for="(item) in firstOpitons"
        :key="item.value"
        :check="item.value === firstValue"
        @click="firstValue=item.value">
          <span>
            {{ item.label }}
          </span>
          <vt-icon
            v-if="item.children"
            icon="right"
            class="icon-right" />
        </li>
      </ul>
    </vt-popper>
    <vt-popper
      :visiable="show && !!secondOptions.length"
      :level="2">
      <ul>
        <li
        v-for="(item) in secondOptions"
        :key="item.value"
        :check="item.value === secondValue"
        @click="secondValue=item.value">
          <span>
            {{ item.label }}
          </span>
          <vt-icon
            v-if="item.children"
            icon="right"
            class="icon-right" />
        </li>
      </ul>
    </vt-popper>
    <vt-popper
      :visiable="show && !!thirdOptions.length"
      :level="3">
      <ul>
        <li
        v-for="(item) in thirdOptions"
        :key="item.value"
        :check="item.value === thirdValue"
        @click="thirdValue=item.value">
          <span>
            {{ item.label }}
          </span>
          <vt-icon
            v-if="item.children"
            icon="right"
            class="icon-right" />
        </li>
      </ul>
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
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const firstValue = ref(null)
    const secondValue = ref(null)
    const thirdValue = ref(null)

    const timer = ref(null)
    const input = ref(null)
    const { modelValue, options } = toRefs(props)
    const label = ref('')

    const firstOpitons = computed(() => {
      return options.value
    })

    const secondFilterValue = computed(() => {
      return options.value.filter(item => item.value === firstValue.value)
    })

    const secondOptions = computed(() => {
      return secondFilterValue.value.length && secondFilterValue.value[0]?.children ? secondFilterValue.value[0].children : []
    })

    const thirdFilterValue = computed(() => {
      return secondOptions.value.filter(item => item.value === secondValue.value)
    })

    const thirdOptions = computed(() => {
      return thirdFilterValue.value.length && thirdFilterValue.value[0]?.children ? thirdFilterValue.value[0].children : []
    })

    const fouthFilterValue = computed(() => {
      return thirdOptions.value.filter(item => item.value === thirdValue.value)
    })

    watch(firstValue, function (val) {
      if (val) {
        secondValue.value = null
        thirdValue.value = null
        emit('update:modelValue', [val])
      }
    })

    watch(secondValue, function (val) {
      if (val) {
        thirdValue.value = null
        emit('update:modelValue', [firstValue.value, val])
      }
    })

    watch(thirdValue, function (val) {
      val && emit('update:modelValue', [firstValue.value, secondValue.value, val])
    })

    watch(modelValue, function (val, oldVal) {
      if (val.length === 3) {
        label.value = secondFilterValue.value[0].label + '/' + thirdFilterValue.value[0].label + '/' + fouthFilterValue.value[0].label
      } else if (val.length) {
        label.value = ''
        clearTimeout(timer.value)
        input.value.vtInput.focus()
      } else {
        firstValue.value = null
        secondValue.value = null
        thirdValue.value = null
      }
    })

    return {
      label,
      firstValue,
      secondValue,
      thirdValue,
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
</style>
