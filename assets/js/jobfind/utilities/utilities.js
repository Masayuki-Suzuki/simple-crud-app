import dom from '../state/dom'
import store from '../state/store'

class Utilities {
  static Log(val) {
    console.log(val)
  }
  static setImageWidth() {
    const imgs = dom.tagImgs
    Array.prototype.forEach.call(imgs, (img) => {
      const target = img
      target.style.maxWidth = '100%'
    })
  }
  static initSpace() {
    store.queries.tab.addListener(this.setSpace)
    store.queries.sp.addListener(this.setSpace)
    store.queries.spMin.addListener(this.setSpace)
    this.setSpace()
  }
  static setSpace(...args) {
    const url = window.location.href
    if (url.match(/jobfind/)) {
      // コンテンツの高さがウィンドウの高さより低い場合に動的処理
      if (dom.contents.scrollHeight < window.innerHeight) {
        this.Log('Set Space')
        // 念の為初期化
        dom.footer.style.position = ''
        const innerHeight = args[0] || 0
        const footerHight = `${(dom.footer.clientHeight + innerHeight)}px`
        this.Log(footerHight)
        // デザイン的にスマホは確実に超えると思われるが念の為。
        if (store.queries.sp.matches || store.queries.spMin.matches) {
          dom.space.style.paddingTop = '0'
        } else {
          dom.space.style.paddingTop = footerHight
          dom.contents.style.height = 'calc(100vh)'
          dom.footer.style.position = 'absolute'
        }
      } else {
        // コンテンツの高さがウインドウの高さを超える場合、フッターをStaticにする。
        dom.space.style.paddingTop = '0'
        dom.footer.style.position = 'static'
      }
    }
  }
}

export default Utilities
