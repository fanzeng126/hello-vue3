export const fadeOut = async function (target) {
  target.value.classList.add('fade-out')
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 180)
  })
  target.value.classList.remove('fade-out')
}

export const fadeIn = async function (target) {
  target.value.classList.add('fade-in')
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 180)
  })
  target.value.classList.remove('fade-in')
}

export const listenKeydown = function ({ flag, callBack }) {
  if (flag) {
    window.addEventListener('keydown', callBack)
  } else {
    window.removeEventListener('keydown', callBack)
  }
}
