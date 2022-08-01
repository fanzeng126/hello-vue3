<template>
  <vt-modal
    ref="vtModal"
    v-if="visibleModel"
    v-model="visible"
    :modal-append-to-body="modalAppendToBody"
    :wrapper-closable="wrapperClosable"
    @hide="hideDrawer"
 />
  <vt-drawer
    ref="vtDrawer"
    v-model="visible"
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
    visibleModel: {
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
    const { modelValue, visibleModel } = toRefs(props)
    const visible = ref(false)
    const vtDrawer = ref(null)
    const vtModal = ref(null)

    visible.value = modelValue.value

    watch(modelValue, (val) => {
      visible.value = val
    })

    watch(visible, (val) => {
      emit('update:modelValue', val)
    })

    const hideModal = () => {
      vtModal.value.hide()
    }

    const hideDrawer = () => {
      vtDrawer.value.hide()
    }

    const hide = () => {
      if (visibleModel.value) {
        hideModal()
      } else {
        hideDrawer()
      }
    }

    return {
      visible,
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
