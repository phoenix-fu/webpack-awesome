<template>
<span class="star">
  <span :class="starCss" class="value">
    <span @click="setStars(1)" class="fa fa-star"></span>
    <span @click="setStars(2)" class="fa fa-star"></span>
    <span @click="setStars(3)" class="fa fa-star"></span>
    <span @click="setStars(4)" class="fa fa-star"></span>
    <span @click="setStars(5)" class="fa fa-star"></span>
  </span>
</span>
</template>

<script>
export default {
  props: {
    stars: {
      type: Number,
      default: 1
    },

    enabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    starCss: function () {
      return 'star' + this.stars
    }
  },

  methods: {
    setStars: function (count) {
      if (this.enabled) {
        this.stars = count
      }
    }
  }
}
</script>
