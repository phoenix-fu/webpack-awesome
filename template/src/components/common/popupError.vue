<template>
<div>
  <div v-show="isShow" @click="hide" transition="shake" class="has-error-tips-box">
    <div class="has-error-tips-con">\{{message}}</div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      hideTime: 3000,
      tHash: ''
    }
  },

  computed: {
    isShow () {
      clearTimeout(this.tHash)

      if (this.message !== '') {
        this.tHash = setTimeout(() => {
          this.message = ''
        }, this.hideTime)
      }
      return this.message !== ''
    }
  },

  events: {
    'show-popup-error': function (message) {
      this.message = message
    }
  },

  methods: {
    hide () {
      clearTimeout(this.tHash)
      this.message = ''
    }
  }
}
</script>
