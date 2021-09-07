<script>
import { h, defineComponent } from 'vue'
export default defineComponent({
  props: {
    case: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { slots }) {
    return () => {
      const content = []
      console.log()
      if (props.case.length) {
        Array.from(props.case).forEach(item => {
          if (slots[item]) {
            content.push(slots[item]())
          }
        })
        return h('div', content)
      } else {
        return slots.default()
      }
    }
  },
  data () {
    return {}
  }
})
</script>
