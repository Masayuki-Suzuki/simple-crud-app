import dom from '../state/dom'

class NavBtnClick {
  constructor(target = dom.navBtn) {
    this.clickTarget = null
    this.bindFunction = {
      bindClickEvent: this.clickEvent.bind(this),
      bindLinkEvent: this.linkClickEvent.bind(this)
    }
    if (target) {
      this.clickTarget = target
      this.clickTarget.addEventListener(
        'click',
        this.bindFunction.bindClickEvent,
        false,
      )
      dom.gNav.children[1].addEventListener(
        'click',
        this.bindFunction.bindLinkEvent,
        false,
      )
    }
  }
  clickEvent() {
    const classFlag = this.hasIsOpen()
    if (classFlag) {
      this.clickTarget.classList.remove('is-opened')
    } else {
      this.clickTarget.classList.add('is-opened')
    }
  }
  linkClickEvent() {
    const classFlag = this.hasIsOpen()
    if (classFlag) {
      this.clickTarget.classList.remove('is-opened')
    }
  }
  hasIsOpen() {
    return this.clickTarget.classList.contains('is-opened')
  }
}

export default NavBtnClick
