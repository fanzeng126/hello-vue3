<template>
  <vt-modal
    ref="vtModal"
    v-if="visiableModel"
    v-model="visiable"
    :modal-append-to-body="modalAppendToBody"
    :wrapper-closable="wrapperClosable"
    @hide="hideDrawer"
 />
  <vt-drawer
    ref="vtDrawer"
    v-model="visiable"
    :modal-append-to-body="modalAppendToBody"
    :position="position"
    :class-name="className">
    <slot />
  </vt-drawer>
</template>
<script>
import { toRefs, ref, watch } from 'vue'
export default {
  props: {
    visiableModel: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['top', 'left', 'right', 'bottom'].includes(val)
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { modelValue, visiableModel } = toRefs(props)
    const visiable = ref(false)
    const vtDrawer = ref(null)
    const vtModal = ref(null)

    visiable.value = modelValue.value

    watch(modelValue, (val) => {
      visiable.value = val
    })

    watch(visiable, (val) => {
      emit('update:modelValue', val)
    })

    const hideModal = () => {
      vtModal.value.hide()
    }

    const hideDrawer = () => {
      vtDrawer.value.hide()
    }

    const hide = () => {
      if (visiableModel.value) {
        hideModal()
      } else {
        hideDrawer()
      }
    }

    return {
      visiable,
      vtDrawer,
      vtModal,
      hideModal,
      hideDrawer,
      hide
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
