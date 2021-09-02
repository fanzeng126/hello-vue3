import { ref, computed } from 'vue'

export default function useRepositoryNameSearch (students) {
  const searchQuery = ref('')

  const repositoriesMatchingSearchQuery = computed(() => {
    return students.value.filter(item => item.name.includes(searchQuery.value))
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
