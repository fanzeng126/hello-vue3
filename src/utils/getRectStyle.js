export function getRectStyle (el) {
  const {
    top,
    left,
    right,
    bottom,
    width,
    height
  } = el.getBoundingClientRect()
  return {
    top: top + height + 5,
    left: left,
    right: right,
    bottom: bottom + height + 5,
    width,
    height
  }
}
