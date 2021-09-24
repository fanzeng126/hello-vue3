import { h } from 'vue'
class Render {
  beforeEnter (el) {
    console.log('beforeEnter')
  }
}
export default {
  name: 'ElCollapseTransition',
  render () {
    const data = {
      on: {
        click () {
          console.log('131')
        }
      },
      domProps: {
        innerHTML: '我的瑟吉欧空额'
      }
    }
    return h('div', data)
  }
}
