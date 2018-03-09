export default {
  queue: null,
  wait: 300,
  queries: {
    pc: window.matchMedia('(min-width: 901px)'),
    tab: window.matchMedia('(max-width: 900px) and (min-width: 741px)'),
    sp: window.matchMedia('(max-width: 740px) and (min-width: 501px)'),
    spMin: window.matchMedia('(max-width: 500px)'),
  },
}
