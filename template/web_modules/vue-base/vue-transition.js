import Vue from 'vue'

export default function () {
  Vue.transition('expandh225', {
    css: false,
    enter: function (el, done) {
      // 元素已被插入 DOM
      // 在动画结束后调用 done
      $(el).css('width', '0px').animate({ width: "225px" }, 500, done)
    },
    enterCancelled: function (el) {
      $(el).stop()
    },
    leave: function (el, done) {
      // 与 enter 相同
      $(el).animate({ width: "0px" }, 500, done)
    },
    leaveCancelled: function (el) {
      $(el).stop()
    }
  })

  Vue.transition('expandh180', {
    css: false,
    enter: function (el, done) {
      // 元素已被插入 DOM
      // 在动画结束后调用 done
      $(el).css('width', '0px').animate({ width: "180px" }, 500, done)
    },
    enterCancelled: function (el) {
      $(el).stop()
    },
    leave: function (el, done) {
      // 与 enter 相同
      $(el).animate({ width: "0px" }, 500, done)
    },
    leaveCancelled: function (el) {
      $(el).stop()
    }
  })
}
