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
    unmounted (el) {
      detach(el)
    }
  })
}

export {
  installDirectives
}
