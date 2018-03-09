import dom from '../state/dom'

class AreaMapHover {
  constructor() {
    this.img = {}
    this.imgPreLoader()
    this.bindFunctions = {
      bindHoverArea: this.hoverArea.bind(this),
      bindLeaveArea: this.leaveArea.bind(this),
    }
    dom.map.addEventListener('mouseover', this.bindFunctions.bindHoverArea)
    dom.map.addEventListener('mouseout', this.bindFunctions.bindLeaveArea)
  }

  imgPreLoader() {
    const imgElms = {}
    Array.prototype.forEach.call(dom.map.children, (item) => {
      const elm = document.createElement('img')
      const imgName = item.getAttribute('data-prefecture')
      elm.src = `/jobfind-pc/original/images/${imgName}-on.png`
      imgElms[imgName] = elm
      this.img[imgName] = elm.src
    })
  }

  hoverArea(e) {
    e.preventDefault()
    const prefecture = e.target.getAttribute('data-prefecture')
    dom.hoverImg.src = this.img[prefecture]
  }

  static leaveArea() {
    if (dom.hoverImg.children) {
      dom.hoverImg.src = '/jobfind-pc/theme/default/images/shim.gif'
    }
  }
}

export default AreaMapHover
