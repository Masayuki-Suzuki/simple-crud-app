import dom from '../state/dom'
import store from '../state/store'

class NavigationFix {
  constructor() {
    this.scrollTop = null
    this.headerHeight = 0
    this.bindFunctions = {
      reset: this.resetFixed.bind(this),
      calc: this.calcHeaderHeight.bind(this),
      nav: this.navigationFixMain.bind(this),
    }
  }

  navigationFixMain() {
    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (this.scrollTop >= this.headerHeight) {
      dom.gNav.style.position = 'fixed'
      dom.gNav.style.top = '0'
    } else {
      dom.gNav.style.position = 'absolute'
      dom.gNav.style.top = `${this.headerHeight}px`
    }
  }

  init() {
    store.queries.pc.addListener(this.bindFunctions.calc)
    store.queries.tab.addListener(this.bindFunctions.calc)
    store.queries.sp.addListener(this.bindFunctions.calc)
    store.queries.spMin.addListener(this.bindFunctions.calc)
    // if(store.queries.sp.matches || store.queries.spMin.matches) {
    this.calcHeaderHeight()
    this.navigationFixMain()
    window.addEventListener('scroll', this.bindFunctions.nav)
    // }
  }

  calcHeaderHeight() {
    this.headerHeight = dom.header.clientHeight
    // this.headerHeight = parseInt(document.defaultView.getComputedStyle(dom.header, '').getPropertyValue('border-top-width'));
    this.navigationFixMain()
    window.removeEventListener('scroll', this.bindFunctions.nav)
    window.addEventListener('scroll', this.bindFunctions.nav)
  }

  resetFixed() {
    const nav = dom.gNav
    nav.style.position = 'static'
    window.removeEventListener('scroll', this.bindFunctions.nav)
  }
}

export default NavigationFix
