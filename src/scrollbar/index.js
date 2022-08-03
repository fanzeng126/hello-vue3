import './scrollbar.pcss'
import attach from './attach.js'
import detach from './detach.js'

/**
 * @copy mussel
 */

function installDirectives (app) {
  app.directive('mussel-scrollbar', {
    mounted (el, binding) {
      attach(el, binding.value)
    },
    updated (el) {
      //  :class=[] 会改变原来手动添加的className，需要重新添加
      el.classList.add('mu-scrollbar')
    },
    unmounted (el) {
      detach(el)
    }
  })
}

export {
  installDirectives
}
