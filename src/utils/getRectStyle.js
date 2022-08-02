import { onMounted, nextTick } from 'vue'
export function getRectStyle (el) {
  let {
    top,
    left,
    right,
    bottom,
    width,
    height
  } = el.getBoundingClientRect()

  const innerHeight = window.innerHeight
  let upOrUnder = false

  // 如果距离视窗下部的距离不足最大高度300，就把弹窗放在上面
  if ((innerHeight - bottom) < 300) {
    top = top - 5
    upOrUnder = false
  } else {
    top = bottom + 5
    upOrUnder = true
  }

  return {
    top,
    left,
    right,
    bottom: bottom + height + 5,
    width,
    height,
    upOrUnder
  }
}
function calcPopperPosition (el, style) {
  const htmlDom = document.documentElement
  const htmlFontSize = parseFloat(htmlDom.style.fontSize, 10)
  const {
    top,
    left,
    width,
    upOrUnder
  } = getRectStyle(el.value)
  style.top = (top / htmlFontSize) + 'rem'
  style.left = (left / htmlFontSize) + 'rem'
  style.width = (width / htmlFontSize) + 'rem'
  if (!upOrUnder) {
    style.transform = 'translateY(-100%)'
  } else {
    style.transform = 'none'
  }
}

export function calcPosition (el, style) {
  onMounted(
    () => {
      // 计算弹窗的位置
      setTimeout(() => {
        calcPopperPosition(el, style)
      })
      window.addEventListener('resize', () => {
        nextTick(() => {
          calcPopperPosition(el, style)
        })
      })
    }
  )
}
