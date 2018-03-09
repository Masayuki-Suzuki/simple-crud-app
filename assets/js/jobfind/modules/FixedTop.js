import dom from '../state/dom'
import fade from '../utilities/fade'

class FixedTop {
  constructor() {
    this.fixedTopOpt = this.initFixedTopOpt()
    this.targetStyle = null
    this.fadeFlag = false
    this.bindFunctions = {}
    this.bindFunctions.bindMain = this.fixedTopMain.bind(this)
  }

  fixedTopInit(target, options = null) {
    if (options) {
      this.fixedTopOpt = { ...this.fixedTopOpt, ...options }
    }
    this.fixedTopOpt.target = target
    this.targetStyle = target.style
    this.targetStyle.position =
      this.targetStyle.position !== 'fixed'
        ? this.targetStyle.position
        : 'fixed'
    this.targetStyle.opacity =
      this.targetStyle.opacity > 0 ? this.targetStyle.opacity : 0
    this.targetStyle.bottom = this.fixedTopOpt.positionAdjustment

    this.fixedTopMain()

    window.removeEventListener('scroll', this.bindFunctions.bindMain)
    window.addEventListener('scroll', this.bindFunctions.bindMain)
  }

  removeFixedTop() {
    window.removeEventListener('scroll', this.bindFunctions.bindMain)
  }

  fixedTopMain() {
    let btm
    let alm
    let ft
    if (this.fixedTopOpt.bottom) {
      btm = dom.bottomContent.clientHeight // #bottomContent Height.
    } else {
      btm = 0
    }

    if (this.fixedTopOpt.arealink) {
      // Margin Top & Bottom of #areaLink.
      if (dom.areaLink) {
        const mgt = parseInt(dom.areaLink.style.marginTop, 10)
        const mgb = parseInt(dom.areaLink.style.marginBottom,10)
        let areaLinkTop;
        let areaLinkBtm;
        if (Number.isNaN(mgt)) {
          areaLinkTop = 0
        } else {
          areaLinkTop = mgt
        }
        if (Number.isNaN(mgb)) {
          areaLinkBtm = 0;
        }
        alm = areaLinkTop + areaLinkBtm
      } else {
        alm = 0
      }
    } else {
      alm = 0
    }

    if (this.fixedTopOpt.space) {
      ft = dom.space.clientHeight // div.space Height.
    } else {
      ft = dom.footer.clientHeight
    }

    const fix = btm + ft + alm + this.fixedTopOpt.positionAdjustment // Bottom Position.
    const d = document.body.scrollHeight // All Contents Height.
    const c = window.innerHeight // Window Height.
    const p = (d - c - fix) + this.fixedTopOpt.stopAdjustment // Fixed Timing Position.
    const s = window.pageYOffset || document.documentElement.scrollTop // Scroll Positon Just Now.

    // It's Fade In-Out If Scroll Position Came to Particular Position.
    if (s >= this.fixedTopOpt.fadePosition && !this.fadeFlag) {
      fade.fadeIn(this.fixedTopOpt.target, this.fixedTopOpt.fadeSpeed)
      this.fadeFlag = true
    } else if (s <= this.fixedTopOpt.fadePosition && this.fadeFlag) {
      fade.fadeOut(this.fixedTopOpt.target, this.fixedTopOpt.fadeSpeed)
      this.fadeFlag = false
    }
    // Position Control.
    if (s >= p) {
      this.targetStyle.position = 'absolute'
      this.targetStyle.bottom = `${fix}px`
    } else {
      this.targetStyle.position = 'fixed'
      this.targetStyle.bottom = `${this.fixedTopOpt.position}px`
    }
  }

  initFixedTopOpt() {
    return {
      arealink: true, // Use .areaLink Height
      bottom: true, // Use #bottomContent Height
      space: true, // Use .space
      fadeSpeed: 0.04, // FadeIn-Out Speed. Less than 1. Big number is fast.
      fadePosition: 500, // Fadein Position From Page top.
      footerHeight: 0, // Footer Specifies The Height If Don't use ".space".
      position: 10, // Fixed Bottom Position.
      stopAdjustment: 0, // Fixed Stop Position Adjustment.
      positionAdjustment: 0, // Bottom Position Adjustment.
      target: null, // Target Object initialized in fixedTopInit;
    }
  }
}

export default FixedTop
