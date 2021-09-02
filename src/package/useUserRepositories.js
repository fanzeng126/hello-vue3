import { ref, watch, onMounted } from 'vue'
import { getUserList } from '../utils/create'

export default function useUserRepositories (user) {
  const students = ref([])

  // 获取列表
  const getStudents = async () => {
    const res = getUserList(user.value)
    students.value = res
  }

  onMounted(getStudents)

  watch(user, getStudents)

  return {
    students,
    getStudents
  }
}
