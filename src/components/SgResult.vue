<template>
  <div class="row">
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  export default {
    components: {
      'page': page
    },
    data: function () {
      return {
        results: [],
        loading: false,
        count: 0,
        pageNum: 1
      }
    },
    created: function () {

    },
    methods: {}
  }
</script>

<style scoped lang="less">
</style>
