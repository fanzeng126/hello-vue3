<template>
  <div class="p-child">
    这个是子组件
    <input type="text" :value="localName" @input="emitValue" >
    <input type="number" :value="localAge" @input="emitValueAge" >
    <button @click="localOpen = false; $emit('update:modalOpen', false)">
      关闭窗口
    </button>
  </div>
</template>
<script>
import { toRefs, watch, ref } from 'vue'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    modalOpen: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number,
      default: 0
    },
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modalOpen', 'update:name', 'update:modelValue'],
  data () {
    return {
    }
  },
  setup (props) {
    const localOpen = ref(false)
    const localName = ref('')
    const localAge = ref(0)
    const { name, modalOpen, age } = toRefs(props)
    localAge.value = age.value
    localName.value = name.value
    localOpen.value = modalOpen.value
    watch(modalOpen, function (newVal, oldValue) {
      localOpen.value = newVal
    })

    watch(localName, function (val) {
      console.log('localName', val)
    })

    return {
      localOpen,
      localName,
      localAge
    }
  },
  methods: {
    emitValue (e) {
      this.localName = e.target.value
      this.$emit('update:name', this.localName)
    },
    emitValueAge (e) {
      this.localAge = parseInt(e.target.value, 10)
      console.log('this.localAge', this.localAge, this.modelModifiers.min)
      if ((this.modelModifiers.max && this.localAge < 100) || (this.modelModifiers.min && this.localAge > 0)) {
        this.$emit('update:modelValue', this.localAge)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.p-child {
  background: #999;
  height: 50%;
  width: 50%;
}
</style>
