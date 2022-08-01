<template>
  <div class="editor">
    <vt-input
      v-model="label"
      ref="selectInput"
      readonly
      suffix-icon="close-circle"
      model-type="select"
      @focus="focus"
      @blur="blur"
      @clear="clear" />
    <vt-popper
      :visible="show">
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
import { computed, toRefs, ref } from 'vue'
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
    return {
      selectInput,
      label
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
      this.selectInput.active = false
      setTimeout(() => {
        this.show = false
      }, 200)
    },
    clear () {
      this.$emit('update:modelValue', null)
    },
    click (item) {
      this.$emit('update:modelValue', item.value)
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
