<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <div>
      <a v-link="'/'">home</a>
      <a v-link="'/page/1'">page1</a>
    </div>
    <div class="tipsDiv">
      <button @click="showErrorTips">弹出统一错误提示</button>
    </div>
    <div class="tipsDiv">
      <button @click="showRootLoading">触发根的加载中</button>
      <button @click="hideRootLoading">隐藏</button>
    </div>
    <div class="tipsDiv">
      <button @click="show = true">show alert</button>
      <alert :show.sync="show">
        <div>my alert</div>
      </alert>
    </div>
  </div>
</template>

<script>
import alert from 'components/common/alert'

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Page2',
      show: false
    }
  },

  methods: {
    showErrorTips () {
      this.showPopupError('这是一个统一错误提示示例')
    },

    showRootLoading () {
      this.showLoading()
    },

    hideRootLoading () {
      this.hideLoading()
    }
  },

  components: {
    alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.tipsDiv {
  margin-top: 15px
}
</style>
