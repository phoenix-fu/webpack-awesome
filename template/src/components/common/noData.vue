<template>
  <div class="no-data">
    <div class="content">
      <div class="icon"><span class="glyphicon glyphicon-folder-open"></span></div>
      <p>\{{content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '暂时没有数据'
    }
  }
}
</script>
