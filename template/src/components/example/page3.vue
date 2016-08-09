<template>
  <div class="hello">
    <load-div>
      <h1>\{{ nickname }}</h1>
      <div>
        <a v-link="'/'">home</a>
        <a v-link="'/page/2'">page2</a>
      </div>
    </load-div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      nickname: ''
    }
  },

  route: {
    data (transition) {
      return this.request({ api: apis.user.view }).then(result => ({
        nickname: result.data.nickname
      }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
