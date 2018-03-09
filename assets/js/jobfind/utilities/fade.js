export default {
  fadeIn(target, time) {
    const fadeInTarget = target
    fadeInTarget.style.opacity = 0
    const tick = () => {
      fadeInTarget.style.opacity =
        +fadeInTarget.style.opacity + time > 1
          ? 1
          : +fadeInTarget.style.opacity + time
      if (+fadeInTarget.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
          setTimeout(tick, 16)
      }
    }
    tick()
  },
  fadeOut(target, time) {
    const fadeOutTarget = target
    fadeOutTarget.style.opacity = 1
    const tick = () => {
      fadeOutTarget.style.opacity =
        +fadeOutTarget.style.opacity - time < 0
          ? 0
          : +fadeOutTarget.style.opacity - time
      if (+fadeOutTarget.style.opacity > 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
          setTimeout(tick, 16)
      }
    }
    tick()
  },
  hide(target) {
    const hideTarget = target
    hideTarget.style.display = 'none'
  },
}
