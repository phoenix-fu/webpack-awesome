<template>
  <div class="hello">
    <load-div>
      <h1>\{{ msg }}</h1>
      <div>
        <a v-link="'/'">home</a>
        <a v-link="'/page/2'">page2</a>
      </div>
      <div>
        <display></display>
        <increment></increment>
      </div>
    </load-div>
  </div>
</template>

<script>
import display from 'components/example/display.vue'
import increment from 'components/example/increment.vue'

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Page1'
    }
  },

  route: {
    data (transition) {
      setTimeout(() => {
        transition.next()
      }, 2000)
    }
  },

  components: {
    display,
    increment
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
