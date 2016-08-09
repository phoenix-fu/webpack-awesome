<template>
<div>
  <div v-show="isShow" :class="{ 'loading-no-font': !this.isShowMsg }" class="weui_loading_toast">
    <div class="weui_toast">
      <div class="weui_loading">
        <div class="weui_loading_leaf weui_loading_leaf_0"></div>
        <div class="weui_loading_leaf weui_loading_leaf_1"></div>
        <div class="weui_loading_leaf weui_loading_leaf_2"></div>
        <div class="weui_loading_leaf weui_loading_leaf_3"></div>
        <div class="weui_loading_leaf weui_loading_leaf_4"></div>
        <div class="weui_loading_leaf weui_loading_leaf_5"></div>
        <div class="weui_loading_leaf weui_loading_leaf_6"></div>
        <div class="weui_loading_leaf weui_loading_leaf_7"></div>
        <div class="weui_loading_leaf weui_loading_leaf_8"></div>
        <div class="weui_loading_leaf weui_loading_leaf_9"></div>
        <div class="weui_loading_leaf weui_loading_leaf_10"></div>
        <div class="weui_loading_leaf weui_loading_leaf_11"></div>
      </div>
      <p v-if="isShowMsg" class="weui_toast_content">\{{message}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },

    message: {
      type: String,
      default: '加载中...'
    }
  },

  computed: {
    isShowMsg: function () {
      return this.message !== ''
    }
  },

  events: {
    'show-loading': function (message = '加载中...') {
      this.isShow = true
      this.message = message
    },

    'hide-loading': function () {
      this.isShow = false
    }
  }
}
</script>
