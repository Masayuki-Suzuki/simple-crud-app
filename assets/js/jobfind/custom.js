import dom from './state/dom'
import store from './state/store'
import utilities from './utilities/utilities'
// import GNavFix from './modules/gNavFix'
import FixedTop from './modules/FixedTop'
import LoadSwiper from './modules/loadSwiper'

(function () {
  // let gNav
  let swiper
  if (window.location.pathname === '/jobfind-pc/') {
    // gNav = new GNavFix()
    swiper = new LoadSwiper()
  }
  const fixedTop = new FixedTop()
  const fixedTopOpt = {
    stopAdjustment: 10, // Fixed Stop Position Adjustment.
    positionAdjustment: -90, // Bottom Position Adjustment.
  }
  const fixedTopOptTb = {
    stopAdjustment: 10,
    positionAdjustment: -60,
  }
  const fixedTopOptSp = {
    stopAdjustment: 10,
    positionAdjustment: -150,
  }
  const swiperOpt = {
    pagination: {
      el: '.swiper-pagination',
    },
    paginationType: 'bullets',
    paginationClickable: true,
    speed: 500,
    autoplay: {
      delay: 3000,
    },
    autoplayDisableOnInteraction: false,
    slidesPerView: 'auto',
    loop: true,
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

  if (window.location.pathname === '/jobfind-pc/') {
    // gNav.init()
    swiper.setSwiperOption(swiperOpt)
    swiper.initSwiper()
  }
  utilities.initSpace()
}())

// namespace mainModule {

//
//   store.queries.pc.addListener(() => {
//     fixedTop.removeFixedTop()
//     fixedTop.fixedTopInit(dom.goBack, fixedTopOpt)
//   })
//
//   store.queries.tab.addListener(() => {
//     fixedTop.removeFixedTop()
//     fixedTop.fixedTopInit(dom.goBack, fixedTopOptTb)
//   })
//
//   store.queries.sp.addListener(() => {
//     fixedTop.removeFixedTop()
//     fixedTop.fixedTopInit(dom.goBack, fixedTopOptSp)
//   })
//
//   store.queries.spMin.addListener(() => {
//     fixedTop.removeFixedTop()
//     fixedTop.fixedTopInit(dom.goBack, fixedTopOptSp)
//   })
//
//   if (store.queries.pc.matches || store.queries.tab.matches) {
//     fixedTop.fixedTopInit(dom.goBack, fixedTopOpt)
//   } else {
//     fixedTop.fixedTopInit(dom.goBack, fixedTopOptSp)
//   }
//
//   if (location.pathname === '/jobfind-pc/') {
//     gNav.init()
//     swiper.setSwiperOption(swiperOpt)
//     swiper.initSwiper()
//   }
//   utilities.initSpace()
// }
