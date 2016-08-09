<template>
  <div>
    <modal :show.sync="show" :size-class="sizeClass">

      <div slot="header" class="modal-header">
        <h4 class="modal-title">\{{ title }}</h4>
      </div>

      <div>
          <slot></slot>
      </div>

      <div slot="footer" class="modal-footer">
        <button @click="cancel" type="button" class="btn btn-default">\{{cancelWord}}</button>
        <button @click="ok" type="button" class="btn btn-primary">\{{okWord}}</button>
      </div>

    </modal>
  </div>
</template>

<script>
import modal from 'components/common/modal'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },

    sizeClass: {
      type: String,
      default: 'modal-sm'
    },

    title: {
      type: String,
      default: '提示'
    },

    cancelWord: {
      type: String,
      default: '取消'
    },

    okWord: {
      type: String,
      default: '确定'
    }
  },

  methods: {
    ok () {
      this.show = false
      this.$emit('ok-click')
    },

    cancel () {
      this.show = false
      this.$emit('cancel-click')
    }
  },

  components: {
    modal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
