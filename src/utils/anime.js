/**
 * @param {*} target 目标对象
 * @param {*} timer 动画时间
 * @param {*} animationName 动画名称
 */

export const anime = async function ({ target, timer = 180, animationName }) {
  target.value.classList.add(animationName)
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 180)
  })
  target.value.classList.remove(animationName)
}
