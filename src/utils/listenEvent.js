
export const listenKeydown = function ({ flag, callBack }) {
  if (flag) {
    window.addEventListener('keydown', callBack)
  } else {
    window.removeEventListener('keydown', callBack)
  }
}
