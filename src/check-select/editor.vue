<template>
  <div class="editor">
    <vt-input
      v-model="label"
      readonly
      suffix-icon="down"
      @focus="focus"
      @blur="blur" />
    <vt-popper
      v-if="show"
      v-model:value="localValue"
      :options="options"/>
  </div>
</template>
<script>
import { computed, toRefs, ref, watch } from 'vue'
export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:value'],
  setup (props, { emit }) {
    const localValue = ref(null)
    const { value, options } = toRefs(props)
    localValue.value = value.value
    const label = computed(() => {
      const filterValue = options.value.filter(item => item.value === value.value)
      return filterValue.length ? filterValue[0].label : ''
    })
    watch(value, function (val) {
      localValue.value = val
    })
    watch(localValue, function (val) {
      emit('update:value', val)
    })
    return {
      label,
      localValue
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
    }
  }
}
</script>
<style lang="postcss" scoped>
.editor {
  position: relative;
  font-size: 0;
  left: 20px;
  display: inline-block;
}
</style>
