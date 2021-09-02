<template>
  <div class="box">
    <ul>
      <li
        v-for="(item, index) in students"
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
import { toRefs } from 'vue'
import useUserRepositories from './useUserRepositories'
import useRepositoryNameSearch from './useRepositoryNameSearch'
export default {
  props: {
    user: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { user } = toRefs(props)

    const { students, getStudents } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(students)

    return {
      students: repositoriesMatchingSearchQuery,
      searchQuery,
      getStudents
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
