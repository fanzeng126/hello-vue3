<template>
  <div class="cascade">
    <vt-cascade-popper
      ref="cascade"
      v-model="value"
      :options="dataArr"
      :label="label"
      readonly
      prefix-icon="search"
      suffix-icon="down"
      clearable
      @clear="clear"
      @close="close">
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
    </vt-cascade-popper>
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { ref, watch, reactive, toRefs } from 'vue'
import { useAst } from '../utils/ast'

const creatAst = function (ast, options) {
  useAst(1, '', '', ast, ...options)
  for (const key in ast) {
    if (!ast[key].isLeaf) {
      const children = ast[key].children
      ast[key].children = {}
      useAst(2, key, '', ast[key].children, ...children)
      for (const cell in ast[key].children) {
        if (!ast[key].children[cell].isLeaf) {
          const data = ast[key].children[cell].children
          ast[key].children[cell].children = {}
          useAst(3, cell, key, ast[key].children[cell].children, ...data)
        }
      }
    }
  }
}

const findCheckNode = function (ast, separator) {
  const labelArr = []
  const keyArr = []
  for (const key1 in ast) {
    const level1 = ast[key1]
    if (level1.originalData.check === true) {
      if (level1.isLeaf === false) {
        const parentNode = level1.children
        for (const key2 in parentNode) {
          const level2 = parentNode[key2]
          if (level2.originalData.check === true) {
            if (level2.isLeaf === false) {
              const child = level2.children
              for (const key3 in child) {
                const level3 = child[key3]
                if (level3.originalData.check === true) {
                  labelArr.push(level1.label + separator.value + level2.label + separator.value + level3.label)
                  keyArr.push([key1, key2, key3])
                }
              }
            } else {
              labelArr.push(level1.label + separator.value + level2.label)
              keyArr.push([key1, key2])
            }
          }
        }
      } else {
        labelArr.push(level1.label)
        keyArr.push([key1])
      }
    }
  }
  return { labelArr, keyArr }
}

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    separator: {
      type: String,
      default: '/'
    }
  },
  setup (props) {
    const { separator, options } = toRefs(props)
    const cascade = ref(null)
    const value = ref([])
    const ast = reactive({}) // 抽象语法树
    const labels = reactive({})
    const label = ref([])
    const keys = ref([])

    const dataArr = ref([])
    dataArr.value = clonedeep(options.value)

    watch(ast, function (val) {
      const { keyArr, labelArr } = findCheckNode(val, separator)
      label.value.splice(0, label.value.length, ...labelArr)
      keys.value.splice(0, keys.value.length, ...keyArr)
    })

    return {
      dataArr,
      cascade,
      labels,
      value,
      label,
      keys,
      ast
    }
  },
  watch: {
    options (val) {
      this.dataArr = clonedeep(val)
    },
    dataArr (val) {
      creatAst(this.ast, val)
    }
  },
  mounted () {
    this.dataArr = clonedeep(this.options)
    creatAst(this.ast, this.dataArr)
  },
  methods: {
    clickFirstLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(0, this.value.length, item.value)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    changeFirstLevel (item, val) {
      const checkVal = event.target.checked
      item.check = val || checkVal
      const { isLeaf, children } = this.ast[item.value]
      if (!isLeaf) {
        for (const key in children) {
          children[key].originalData.check = checkVal
          const { isLeaf: childIsLeaf, children: childChildren } = children[key]
          if (!childIsLeaf) {
            for (const cell in childChildren) {
              childChildren[cell].originalData.check = checkVal
            }
          }
        }
      }
    },
    clickSecondLevel (item) {
      if (item.value !== this.value[1]) {
        this.value.splice(1, this.value.length, item.value)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    changeSecondLevel (item, val) {
      const checkVal = event.target.checked
      item.check = val || checkVal
      const parentNode = this.ast[item.parentId]
      const currentNode = parentNode.children[item.value]
      const { isLeaf, children } = currentNode
      const { children: parentChildren } = parentNode
      if (!isLeaf) {
        for (const key in children) {
          children[key].originalData.check = checkVal
        }
      }
      // 父节点为选中，当前节点不选中时，需要判断，父节点是否还有其他子节点选中，再做判断是否更改父节点状态
      if (parentNode.originalData.check && !checkVal) {
        const filter = Array.from(Object.values(parentChildren)).filter(item => item.originalData.check)
        parentNode.originalData.check = !!filter.length
      } else {
        parentNode.originalData.check = checkVal
      }
    },
    clickThirdLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(2, this.value.length, item.value)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    changeThirdLevel (item, val) {
      const checkVal = event.target.checked
      item.check = val || checkVal

      const grandParentNode = this.ast[item.grandParentId]
      const parentNode = grandParentNode.children[item.parentId]
      const { children: parentChildren } = parentNode
      const { children: grandParentChildren } = grandParentNode

      if (parentNode.originalData.check && !checkVal) {
        const filter = Array.from(Object.values(parentChildren)).filter(item => item.originalData.check)
        parentNode.originalData.check = !!filter.length
        if (!filter.length) {
          const grandFilter = Array.from(Object.values(grandParentChildren)).filter(item => item.originalData.check)
          grandParentNode.originalData.check = !!grandFilter.length
        }
      } else {
        parentNode.originalData.check = checkVal
        grandParentNode.originalData.check = checkVal
      }
    },
    clear () {
      this.value.splice(0, this.value.length)
      this.dataArr = clonedeep(this.options)
    },
    close (val) {
      const valueKey = this.keys[val]
      if (valueKey.length === 3) {
        const selected = this.ast[valueKey[0]].children[valueKey[1]].children[valueKey[2]]
        this.changeThirdLevel(selected.originalData, false)
      } else if (valueKey.length === 2) {
        const selected = this.ast[valueKey[0]].children[valueKey[1]]
        this.changeSecondLevel(selected.originalData, false)
      } else {
        const selected = this.ast[valueKey[0]]
        this.changeFirstLevel(selected.originalData, false)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.cascade {
  font-size: 0;
  position: relative;
  display: inline-block;
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
