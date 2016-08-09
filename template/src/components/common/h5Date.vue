<template>
  <input v-model="value" type="date" class="form-control">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
