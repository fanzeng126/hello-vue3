<template>
  <div class="editor">
    <vt-input
      v-model="label"
      readonly
      suffix-icon="close"
      @focus="focus"
      @blur="blur" />
    <vt-popper
      :visiable="show">
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
import { computed, toRefs } from 'vue'
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
    const label = computed(() => {
      const filterValue = options.value.filter(item => item.value === modelValue.value)
      return filterValue.length ? filterValue[0].label : ''
    })
    return {
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
      setTimeout(() => {
        this.show = false
      }, 200)
    },
    click (item) {
      this.$emit('update:modelValue', item.value)
    }
  }
}
</script>
<style lang="postcss" scoped>
.editor {
  position: relative;
  font-size: 0;
  display: inline-block;
}
ul {
  padding: 0;
  li {
    padding-left: $inputElementPaddingX;
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
