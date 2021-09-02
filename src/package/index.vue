<template>
  <div class="box">
    <ul>
      <li
        v-for="(item, index) in repositoriesMatchingSearchQuery"
        :key="index">
        <span>
          姓名： {{ item.name }}
        </span>
      </li>
    </ul>
    <input type="text" :value="searchQuery" @change="change">
  </div>
</template>

<script>
import { ref, onMounted, watch, toRefs, computed } from 'vue'
import { getUserList } from '../utils/create'
export default {
  props: {
    user: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const { user } = toRefs(props)

    const students = ref([])

    const searchQuery = ref('')

    const repositoriesMatchingSearchQuery = computed(() => {
      return students.value.filter(item => item.name.includes(searchQuery.value))
    })

    // 获取列表
    const getStudents = async () => {
      const res = getUserList(user.value)
      students.value = res
    }

    onMounted(getStudents)

    watch(user, function (newVal, oldVal) {
      getStudents()
    })
    return {
      students,
      getStudents,
      searchQuery,
      repositoriesMatchingSearchQuery
    }
  },
  data () {
    return {
      filters: []
    }
  },
  methods: {
    change (e) {
      this.searchQuery = e.target.value
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
