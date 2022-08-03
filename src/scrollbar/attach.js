import { isPlainObject } from 'lodash-es'

import methods from './methods'
import { bindEvents } from './events'
import { isRailExist } from './utils'

function emit (el, eventName, options = {}) {
  const { canBubble = false, cancelable = true, data } = options

  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, canBubble, cancelable, null)
  if (data) event.customData = data

  return el.dispatchEvent(event)
}

function railTemplate (axis) {
  return /* html */`
  <div class="mu-scrollbar_rail" axis="${axis[0]}">
    <div class="mu-scrollbar_thumb"></div>
  </div>`
}

function renderElements (el, options) {
  const { scrollbarX, scrollbarY } = options

  el.classList.add('mu-scrollbar')
  el.setAttribute('tabindex', 0)

  this.hiddenX = scrollbarX === false
  this.hiddenY = scrollbarY === false

  if (!this.hiddenX) el.insertAdjacentHTML('afterbegin', railTemplate`x`)
  if (!this.hiddenY) el.insertAdjacentHTML('afterbegin', railTemplate`y`)

  return Array
    .from(el.childNodes)
    .reduce(
      (elements, node) => {
        if (node.classList?.contains('mu-scrollbar_rail')) {
          const axis = node.getAttribute('axis')

          if (axis === 'x') {
            elements.railX = node
            elements.thumbX = node.querySelector('.mu-scrollbar_thumb')
          } else if (axis === 'y') {
            elements.railY = node
            elements.thumbY = node.querySelector('.mu-scrollbar_thumb')
          }
        }
        return elements
      },
      { el }
    )
}

function observeMutation (ctx) {
  if (!window.MutationObserver) return

  const options = isPlainObject(ctx.options.observeMutation)
    ? ctx.options
    : { attributes: true, childList: true, subtree: true }

  const observer = ctx.mutationObserver ||
    new window.MutationObserver(mutations => {
      emit(ctx.el, 'domchange')
    })
  observer.observe(ctx.el, options)

  ctx.mutationObserver = observer
}

export default function attach (el, options = {}) {
  if (
    options.enable === false ||
    (options.stickToParent && !el.parentNode)
  ) return

  const ctx = el.__mussel_scrollbar || { options }

  if (!el.__mussel_scrollbar) {
    options.scrollbarVisible = options.scrollbarVisible ?? 'enter'
    if (isNaN(options.wheelSpeed)) options.wheelSpeed = 1

    Object.keys(methods).forEach(key => {
      ctx[key] = methods[key].bind(ctx)
    })
    el.__mussel_scrollbar = ctx
  }

  if (!isRailExist(el)) {
    Object.assign(ctx, renderElements.call(ctx, el, ctx.options))
    if (ctx.options.observeMutation !== false) observeMutation(ctx)

    bindEvents.call(ctx)
  }
}
