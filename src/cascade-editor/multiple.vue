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
  console.log(ast)
}

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
    const value = ref([])
    const ast = reactive({}) // 抽象语法树
    const labels = reactive({})

    const label = computed(() => '')

    watch(ast, function (val) {
      console.log('ast', val)
    })

    return {
      cascade,
      labels,
      value,
      label,
      ast
    }
  },
  mixins: [data],
  mounted () {
    creatAst(this.ast, this.options)
  },
  methods: {
    clickFirstLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(0, this.value.length, item.value)
      }
      this.cascade.clearTimeOutAndFocus()
    },
    changeFirstLevel (item) {
      const checkVal = event.target.checked
      item.check = checkVal
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
    changeSecondLevel (item) {
      const checkVal = event.target.checked
      item.check = checkVal
      const parentNode = this.ast[this.value[0]]
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
    changeThirdLevel (item) {
      const checkVal = event.target.checked
      item.check = checkVal

      const grandParentNode = this.ast[this.value[0]]
      const parentNode = grandParentNode.children[this.value[1]]
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
