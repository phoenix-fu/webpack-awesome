import Vue from 'vue'
import common from 'web/common/common'

export default function () {
  Vue.directive('disabled', function (value) {
    if (value) {
      this.el.setAttribute('disabled', 'disabled')
    } else {
      this.el.removeAttribute('disabled')
    }
  })

  Vue.directive('file', {
    twoWay: true,

    update: function (value) {
      if (value === '') {
        this.el.value = value
      }
    },

    bind: function () {
      this.handler = function () {
        // 将数据写回 vm
        // 如果指令这样绑定 v-example="a.b.c"
        // 它将用给定值设置 `vm.a.b.c`
        this.set(this.el.value)
      }.bind(this)
      this.el.addEventListener('change', this.handler)
    },

    unbind: function () {
      this.el.removeEventListener('change', this.handler)
    }
  })

  Vue.directive('doc-title', function (value) {
    common.setDocTitle(value)
  })

  Vue.directive('auto-resize', {
    update: function (value) {
      this.el.style.overflow = 'hidden'
      this.el.style.height = '1px'
      this.el.style.height = this.el.scrollHeight + 'px'
    },

    bind: function () {
      setTimeout(() => {
        this.el.style.minHeight = '34px'
        this.el.style.height = this.el.scrollHeight + 'px'
      }, 300)
    }
  })
}
