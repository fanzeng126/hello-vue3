<template>
  <div class="cascade-editor">
    <input
      v-model="label"
      class="vt-input"
      type="text"
      ref="inputDom"
      readonly
      @focus="focus"
      @blur="blur" >
    <vt-icon
      icon="down" />
    <cascade-teleport
      v-if="show"
      v-model="firstValue"
      :options="firstOpitons"
      :key="new Date()+ '-'+ 'first'"
      :level="1"/>
    <cascade-teleport
      v-if="show && secondOptions.length"
      v-model="secondValue"
      :options="secondOptions"
      :key="new Date()+ '-'+ 'second'"
      :level="2" />
    <cascade-teleport
      v-if="show && thirdOptions.length"
      v-model="thirdValue"
      :options="thirdOptions"
      :key="new Date()+ '-'+ 'third'"
      :level="3" />
  </div>
</template>
<script>
import { computed, toRefs, ref, watch, reactive } from 'vue'
import cascadeTeleport from './cascade-teleport.vue'
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
  components: {
    'cascade-teleport': cascadeTeleport
  },
  setup (props, context) {
    const firstValue = ref(null)
    const secondValue = ref(null)
    const thirdValue = ref(null)
    const timer = ref(null)
    const inputDom = ref(null)
    const localValue = reactive([])
    const label = ref('')
    const { modelValue, options } = toRefs(props)

    const firstOpitons = computed(() => {
      return options.value
    })

    const secondFilterValue = computed(() => {
      return options.value.filter(item => item.value === firstValue.value)
    })

    const secondOptions = computed(() => {
      return secondFilterValue.value[0] ? secondFilterValue.value[0].children : []
    })

    const thirdFilterValue = computed(() => {
      return secondOptions.value.filter(item => item.value === secondValue.value)
    })

    const thirdOptions = computed(() => {
      return thirdFilterValue.value[0] ? thirdFilterValue.value[0].children : []
    })

    const fouthFilterValue = computed(() => {
      return thirdOptions.value.filter(item => item.value === thirdValue.value)
    })

    watch(modelValue, function (val, oldVal) {
      localValue.splice(0, localValue.length, ...val)
      if (val.length === 3) {
        console.log('三个数据')
        label.value = secondFilterValue.value[0].label + '/' + thirdFilterValue.value[0].label + '/' + fouthFilterValue.value[0].label
      } else {
        label.value = ''
        console.log('timer', timer.value)
        clearTimeout(timer.value)
        inputDom.value.focus()
      }
    })
    watch(localValue, function (val) {
      context.emit('update:modelValue', [...val])
    })
    watch(firstValue, function (val) {
      if (localValue[0] !== val) {
        secondValue.value = null
        thirdValue.value = null
        localValue.splice(0, localValue.length)
      }
      if (val) {
        localValue[0] = val
      }
    })
    watch(secondValue, function (val) {
      if (localValue[1] !== val) {
        thirdValue.value = null
        localValue.splice(1, localValue.length)
      }
      if (val) {
        localValue[1] = val
      }
    })
    watch(thirdValue, function (val) {
      if (val) {
        localValue[2] = val
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
      inputDom
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
      this.timer = setTimeout(() => {
        this.show = false
      }, 200)
    }
  }
}
</script>
<style lang="postcss" scoped>
.cascade-editor {
  font-size: initial;
  position: relative;
  display: inline-block;
  top: 20px;
  left: 20px;
  .icon {
    position:absolute;
    right: 8px;
    line-height: 32px;
  }
}
</style>
