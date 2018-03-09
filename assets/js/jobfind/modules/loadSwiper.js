import Swiper from 'swiper'

class LoadSwiper {
  constructor() {
    this.swiperOpt = {}
  }
  initSwiper(className = '.swiper-container') {
    return new Swiper(className, this.swiperOpt)
  }
  setSwiperOption(options) {
    this.swiperOpt = options
  }
}

export default LoadSwiper
