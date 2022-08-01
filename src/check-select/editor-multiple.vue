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
import { computed, toRefs, ref, watch } from 'vue'
import clonedeep from 'lodash.clonedeep'
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
      return selectLabels.length ? selectLabels.join('、') : ''
    })
    return {
      multipleInput,
      selectValues,
      labels,
      modelVisible
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
  },
  methods: {
    focus (val) {
      this.show = true
    },
    blur (e) {
      if (!this.modelVisible) {
        setTimeout(() => {
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
