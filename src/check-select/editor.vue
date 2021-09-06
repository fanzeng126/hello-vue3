<template>
  <div class="box">
    <input
      v-model="label"
      class="input"
      type="text"
      readonly
      @focus="focus"
      @blur="blur" >
  <vt-icon
    icon="down" />
  <vt-teleport
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
  setup (props, context) {
    const localValue = ref(null)
    const { value, options } = toRefs(props)
    localValue.value = value.value
    const label = computed(() => {
      const filterValue = options.value.filter(item => item.value === value.value)
      return filterValue.length ? filterValue[0].label : null
    })
    watch(value, function (val) {
      localValue.value = val
    })
    watch(localValue, function (val) {
      context.emit('update:value', val)
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
.box {
  font-size: initial;
  position: relative;
  display: inline-block;
  top: 20px;
  left: 20px;
  .input {
    height: 32px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    color: #333;
  }
  .input:hover {
    border: 1px solid #24a7e3;
  }
  .input:focus {
    outline: none;
    border: 1px solid #008cd6 !important;
    box-shadow: 0 0 0 2px rgb(0 140 214 / 15%);
  }
  .icon {
    position:absolute;
    right: 8px;
    line-height: 32px;
  }
}
</style>
