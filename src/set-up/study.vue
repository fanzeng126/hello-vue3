<template>
  <div class="child">
    {{ counter.name }}
    <button @click="add">
      +1
    </button>
    <ul>
      <li
        v-for="(item) in filterList"
        :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <input
      id="search"
      v-model="searQuery"
      class="search">
    <div>
      当前提供的姓名： {{ localName }}
    </div>
    <div>
      当前提供的年龄： {{ localAge.max }} 最小 {{ localAge.min }}
    </div>
    <div>
      当前用户： {{ propsUser }}
    </div>
    <button @click="updateUser('呵呵')">
      修改当前传参用户名称
    </button>
    <div>
      修改当前传参用户名称 ：{{ configUser }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, toRefs, computed, reactive, inject } from 'vue'
import { getUserList } from '../utils/create'

export default {
  props: {
    user: {
      type: Number,
      default: 0
    }
  },
  setup (props, context) {
    // context
    const configUser = ref('默认传参用户')
    const localName = inject('name', '名字')
    const localAge = inject('age', {})
    const propsUser = inject('user', configUser)
    console.log('context', localName, localAge, propsUser)

    const updateUser = function (val) {
      propsUser.value = val
    }

    const { user } = toRefs(props)
    const userList = ref([])

    const counter = reactive({ name: '范增' })
    const add = function () {
      counter.name = '你好'
    }
    onMounted(function () {
      const temp = getUserList(user.value)
      userList.value = temp
    })

    watch(user, function (val) {
      const temp = getUserList(user.value)
      userList.value = temp
    })

    const searQuery = ref('')

    const filterList = computed(function () {
      return userList.value.filter(item => item.name.includes(searQuery.value))
    })

    return {
      counter,
      add,
      getUserList,
      userList,
      filterList,
      searQuery,
      localName,
      localAge,
      propsUser,
      updateUser,
      configUser
    }
  },
  mounted () {
  }
}
</script>
<style lang="postcss" scoped>
.child {
  border: 1px solid #999;
  .search {
    position: absolute;
    top: 8;
    left: 20%;
  }
}
</style>
