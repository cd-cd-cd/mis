<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  beforeCreate() {
    document.title = '武汉理工大学专业分流系统'
  }
}
</script>

<style>

</style>
