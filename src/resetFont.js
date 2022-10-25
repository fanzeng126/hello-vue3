window.onresize = setHtmlFontSize

export function setHtmlFontSize () {
  const htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  const htmlDom = document.documentElement
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
}
