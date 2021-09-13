<template>
  <div class="cascade">
    <vt-cascade
      ref="cascade"
      v-model="value"
      :options="options"
      :label="label"
      prefix-icon="search"
      suffix-icon="down"
      clearable>
      <template v-slot:firstLevel="{options}">
        <ul>
          <li
            v-for="(item) in options"
            :key="item.value"
            :check="item.value === value[0]"
            @click="clickFirstLevel(item)">
            <input
              type="checkbox"
              :checked="item.check"
              @change="changeFirstLevel(item)"
              class="icon-left">
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="!item.isLeaf"
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
            <input
              type="checkbox"
              :checked="item.check"
              @change="changeSecondLevel(item)"
              class="icon-left">
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="!item.isLeaf"
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
            <input
              type="checkbox"
              :checked="item.check"
              class="icon-left"
              @change="changeThirdLevel(item)">
            <span>
              {{ item.label }}
            </span>
          </li>
        </ul>
      </template>
    </vt-cascade>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from 'vue'
import data from './data'
export default {
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  setup (props) {
    // const { separator } = toRefs(props)
    const cascade = ref(null)
    const labels = reactive({})
    const value = ref([])

    const label = computed(() => '')

    watch(labels, function (val) {
      console.log('labels', val)
    })

    return {
      cascade,
      labels,
      value,
      label
    }
  },
  mixins: [data],
  methods: {
    clickFirstLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(0, this.value.length, item.value)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    changeFirstLevel (item) {
      const tempLabels = {}
      const checkVal = event.target.checked
      item.check = checkVal
      if (!item.isLeaf) {
        item.children.forEach(element => {
          element.check = checkVal
          tempLabels[element.value] = { label: element.label, children: {} }
          if (!element.isLeaf) {
            element.children.forEach(cell => {
              cell.check = checkVal
              if (checkVal) {
                if (element.value in tempLabels) {
                  tempLabels[element.value].children[cell.value] = { label: cell.label }
                }
              }
            })
          }
        })
      }
      if (checkVal) {
        this.labels[item.value] = { children: tempLabels, label: item.label }
      } else {
        delete this.labels[item.value]
      }
    },
    clickSecondLevel (item) {
      if (item.value !== this.value[1]) {
        this.value.splice(1, this.value.length, item.value)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    changeSecondLevel (item) {
      const checkVal = event.target.checked
      item.check = checkVal
      let tempLabels = { children: [], label: item.label }
      if (!item.isLeaf) {
        item.children.forEach(element => {
          element.check = checkVal
          if (checkVal) {
            if ('children' in tempLabels) {
              tempLabels.children[element.value] = { label: element.label }
            } else {
              tempLabels = { children: { [element.value]: { label: element.label } }, label: item.label }
            }
          }
        })
      }
      // 找到父节点一个节点
      const parentFilter = this.options.filter(item => item.value === this.value[0])
      if (parentFilter.length) {
        const { check: parentCheck, value: parentValue, label: parentLabel } = parentFilter[0]
        if (parentCheck) {
          if (this.labels[parentValue] && this.labels[parentValue].children) {
            if (checkVal) {
              this.labels[parentValue].children[item.value] = tempLabels
            } else {
              delete this.labels[parentValue].children[item.value]
              if (!Array.from(Object.keys(this.labels[parentValue].children)).length) {
                parentFilter[0].check = false
                delete this.labels[parentValue]
              }
            }
          }
        } else {
          if (checkVal) {
            parentFilter[0].check = true
            this.labels[parentValue] = { label: parentLabel, children: { [item.value]: tempLabels } }
          }
        }
      }
    },
    clickThirdLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(2, this.value.length, item.value)
      }
    },
    changeThirdLevel (item) {
      const checkVal = event.target.checked
      item.check = checkVal
      // 第一层
      const grandParentFilter = this.options.filter(ele => ele.value === this.value[0])
      if (grandParentFilter.length) {
        const { check: grandCheck, value: grandValue, label: grandLabel, children: grandChildren } = grandParentFilter[0]
        const parentFilter = grandChildren.filter(ele => ele.value === this.value[1])
        if (parentFilter.length) {
          const { check: parentCheck, value: parentValue, label: parentLabel } = parentFilter[0]
          if (grandCheck) {
            if (parentCheck) {
              if (checkVal) {
                this.labels[grandValue].children[parentValue].children[item.value] = { label: item.label }
              } else {
                if (this.labels[grandValue].children[parentValue].children[item.value]) {
                  delete this.labels[grandValue].children[parentValue].children[item.value]
                  if (!Array.from(Object.keys(this.labels[grandValue].children[parentValue].children)).length) {
                    parentFilter[0].check = false
                    delete this.labels[grandValue].children[parentValue]
                  }
                  if (!Array.from(Object.keys(this.labels[grandValue].children)).length) {
                    grandParentFilter[0].check = false
                    delete this.labels[grandValue]
                  }
                }
              }
            } else {
              if (checkVal) {
                this.labels[grandValue].children[parentValue] = { children: { [item.value]: { label: item.label } }, label: parentLabel }
                parentFilter[0].check = true
              }
            }
          } else {
            this.labels[grandValue] = { children: { [parentValue]: { children: { [item.value]: { label: item.label } }, label: parentLabel } }, label: grandLabel }
            parentFilter[0].check = true
            grandParentFilter[0].check = true
          }
        }
      }
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
