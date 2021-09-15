<template>
  <div class="cascade">
    <vt-cascade-popper
      ref="cascade"
      v-model="value"
      :options="options"
      :label="label"
      prefix-icon="search"
      suffix-icon="down"
      clearable
      @clear="clear">
      <template v-slot:firstLevel="{options}">
        <ul>
          <li
            v-for="(item) in options"
            :key="item.value"
            :check="item.value === value[0]"
            @click="clickFirstLevel(item)">
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="item.children"
              icon="right"
              class="icon-right" />
          </li>
        </ul>
      </template>
      <template v-slot:secondLevel="{options}">
        <ul>
          <li
            v-for="(item) in options"
            :key="item.value"
            :check="item.value === value[1]"
            @click="clickSecondLevel(item)">
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="item.children"
              icon="right"
              class="icon-right" />
          </li>
        </ul>
      </template>
      <template v-slot:thirdLevel="{options}">
        <ul>
          <li
            v-for="(item) in options"
            :key="item.value"
            :check="item.value === value[2]"
            @click="clickThirdLevel(item)">
            <vt-icon
              v-if="item.value === value[2]"
              icon="check"
              class="icon-left" />
            <span>
              {{ item.label }}
            </span>
          </li>
        </ul>
      </template>
    </vt-cascade-popper>
  </div>
</template>

<script>
import { ref, toRefs, computed, watch } from 'vue'
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    multiple: { // 是否可以多选
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: '/'
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { separator, modelValue } = toRefs(props)
    const cascade = ref(null)
    const labels = ref([])
    const value = ref([])
    value.value = modelValue.value

    const label = computed(() => labels.value.join(separator.value))

    watch(() => [...value.value], function (val) {
      emit('update:modelValue', val)
    })

    return {
      cascade,
      labels,
      value,
      label
    }
  },
  methods: {
    clickFirstLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(0, this.value.length, item.value)
        this.labels.splice(0, this.labels.length, item.label)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    clickSecondLevel (item) {
      if (item.value !== this.value[1]) {
        this.value.splice(1, this.value.length, item.value)
        this.labels.splice(1, this.labels.length, item.label)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    clickThirdLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(2, this.value.length, item.value)
        this.labels.splice(2, this.labels.length, item.label)
      }
    },
    clear (val) {
      this.value.splice(0, this.value.length)
      this.labels.splice(0, this.labels.length)
    }
  }
}
</script>
<style lang="postcss" scoped>
.cascade {
  font-size: 0px;
}
ul {
  padding: 0;
  li {
    position: relative;
    padding-left: 32px;
    cursor: pointer;
    .icon-left {
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 8px;
      fill: $primaryColor;
    }
    .icon-right {
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 8px;
    }
  }
  li:hover {
    background: $normalGreyBackground;
    color: $primaryColor;
  }
  li[check=true] {
    font-weight: 700;
    color: $primaryColor;
  }
}
</style>
