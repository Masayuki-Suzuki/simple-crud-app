import dom = require('./state/dom')
import store = require('./state/store')

import utilities = require('./utilities/utilities')
import gNavFix = require('./modules/gNavFix')
import FixedTop = require('./modules/FixedTop')
import loadSwiper = require('./modules/loadSwiper')

namespace mainModule {
  const fixedTop = new FixedTop()
  let gNav, swiper
  if (location.pathname === '/jobfind-pc/') {
    gNav = new gNavFix()
    swiper = new loadSwiper()
  }
  const fixedTopOpt = {
    stopAdjustment: 10, // Fixed Stop Position Adjustment.
    positionAdjustment: -90 // Bottom Position Adjustment.
  }
  const fixedTopOptTb = {
    stopAdjustment: 10,
    positionAdjustment: -60
  }
  const fixedTopOptSp = {
    stopAdjustment: 10,
    positionAdjustment: -150
  }
  const swiperOpt = {
    pagination: {
      el: '.swiper-pagination'
    },
    paginationType: 'bullets',
    paginationClickable: true,
    speed: 500,
    autoplay: {
      delay: 3000
    },
    autoplayDisableOnInteraction: false,
    slidesPerView: 'auto',
    loop: true
  }

  store.queries.pc.addListener(() => {
    fixedTop.removeFixedTop()
    fixedTop.fixedTopInit(dom.goBack, fixedTopOpt)
  })

  store.queries.tab.addListener(() => {
    fixedTop.removeFixedTop()
    fixedTop.fixedTopInit(dom.goBack, fixedTopOptTb)
  })

  store.queries.sp.addListener(() => {
    fixedTop.removeFixedTop()
    fixedTop.fixedTopInit(dom.goBack, fixedTopOptSp)
  })

  store.queries.spMin.addListener(() => {
    fixedTop.removeFixedTop()
    fixedTop.fixedTopInit(dom.goBack, fixedTopOptSp)
  })

  if (store.queries.pc.matches || store.queries.tab.matches) {
    fixedTop.fixedTopInit(dom.goBack, fixedTopOpt)
  } else {
    fixedTop.fixedTopInit(dom.goBack, fixedTopOptSp)
  }

  if (location.pathname === '/jobfind-pc/') {
    gNav.init()
    swiper.setSwiperOption(swiperOpt)
    swiper.initSwiper()
  }
  utilities.initSpace()
}
