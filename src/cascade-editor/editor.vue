<template>
  <div class="box">
    <vt-input
      v-model="label"
      ref="input"
      readonly
      suffix-icon="close"
      @focus="focus"
      @blur="blur" />
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
import cascadeTeleport from '../dropdown-teleport/cascade-teleport.vue'
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:value'],
  components: {
    'cascade-teleport': cascadeTeleport
  },
  setup (props, context) {
    const firstValue = ref(null)
    const secondValue = ref(null)
    const thirdValue = ref(null)
    const localValue = reactive([])
    const timer = ref(null)
    const input = ref(null)
    const { value, options } = toRefs(props)
    const label = ref('')

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

    watch(value, function (val, oldVal) {
      localValue.splice(0, localValue.length, ...val)
      if (val.length === 3) {
        console.log('三个数据')
        label.value = secondFilterValue.value[0].label + '/' + thirdFilterValue.value[0].label + '/' + fouthFilterValue.value[0].label
      } else {
        label.value = ''
        console.log('timer', timer.value)
        clearTimeout(timer.value)
        input.value.vtInput.focus()
      }
    })
    watch(localValue, function (val) {
      context.emit('update:value', [...val])
    })
    watch(firstValue, function (val) {
      if (localValue[0] !== val) {
        secondValue.value = null
        thirdValue.value = null
        localValue.splice(0, localValue.length)
      }
      if (val) {
        localValue[0] = val
        console.log('firstValue', val)
      }
    })
    watch(secondValue, function (val) {
      if (localValue[1] !== val) {
        thirdValue.value = null
        localValue.splice(1, localValue.length)
      }
      if (val) {
        localValue[1] = val
        console.log('secondValue', val)
      }
    })
    watch(thirdValue, function (val) {
      if (val) {
        localValue[2] = val
        console.log('thirdValue', val, localValue)
      }
    })
    return {
      label,
      localValue,
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
      console.log('blur', this.timer)
    }
  }
}
</script>
<style lang="postcss" scoped>
.box {
  font-size: 0;
  position: relative;
  display: inline-block;
  top: 20px;
  left: 20px;
}
</style>
