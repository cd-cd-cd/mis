<template>
  <div>
    <div>
      <common-tag></common-tag>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import commonTag from "@/components/CommonTag";
export default {
  name: "CommonMainAdmin",
  components: {
    commonTag
  }
}
</script>

<style scoped>
</style>