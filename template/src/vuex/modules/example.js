import { INCREMENT } from 'src/vuex/mutation-types'

const state = {
  // 应用启动时，count 置为0
  count: 0
}

const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  [INCREMENT] (state, amount) {
    state.count = state.count + amount
  }
}

export default {
  state,
  mutations
}
