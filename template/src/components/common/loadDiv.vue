<template>
<div>
  <div v-if="!loadingRouteData"><slot></slot></div>
  <loading :is-show="loadingRouteData"></loading>
</div>
</template>

<script>
import loading from 'components/common/loading'

export default {
  computed: {
    loadingRouteData () {
      return typeof this.$parent.$loadingRouteData === 'boolean'
        ? this.$parent.$loadingRouteData : false
    }
  },

  components: {
    loading
  }
}
</script>
