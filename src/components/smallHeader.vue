<template>
  <div class="header">
    <div class="top_left">
      <img src="../assets/img/admin_top.png"/>
    </div>
    <div class="top_right">
      <button @click="logout">
        <img src="../assets/img/注销.png"/>
      </button>
      <span>注销</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "smallHeader",
  methods: {
    logout(){
      let id = localStorage.getItem('id')
      let params = new URLSearchParams()
      params.append('id',id)
      this.api({
        url: '/admin/logout',
        method: 'delete',
        params: params
      }).then(response=>{
        this.$message.success('注销成功！')
        localStorage.clear()
      }).catch(error=>{
        console.log(error)
      })
      this.$router.replace('/smallLogin')
    }
  }
}
</script>

<style scoped>

</style>