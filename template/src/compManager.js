import Vue from 'vue'
import loadDiv from 'components/common/loadDiv'

export default {
  registerGlobal () {
    Vue.component('load-div', loadDiv)
  }
}
