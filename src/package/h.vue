<script>
import { h, ref, reactive } from 'vue'
export default {
  setup () {
    const name = ref('范增')

    const book = reactive({ title: '鼠疫' })

    return () => h('div', [name.value, book.title])
  }
}
</script>
