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
