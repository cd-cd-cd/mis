<template>
  <div style="background-color: rgb(178, 178, 178,.2);margin:-8px;">
    <el-container class="stu_container" >
      <el-header style="height: 200px;"><common-stu-header></common-stu-header></el-header>
      <el-main class="student" style="height: 100vh">
        <div class="attention">(请注意，志愿申请的时间为： {{this.start_time}} ---- {{this.end_time}})</div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import CommonStuHeader from "@/components/CommonStuHeader";
export default {
  name: "MainStu",
  components: {
    CommonStuHeader
  },
  data(){
    return {
      start_time: '',
      end_time: ''
    }
  },
  created() {
    this.api.get('/student/time')
    .then(response=>{
      console.log(response.data.startTime)
      this.start_time = response.data.startTime.replace('T',' ').split('.')[0]
      this.end_time = response.data.endTime.replace('T',' ').split('.')[0]
    }).catch(error=>{
      this.$message.error(error.response.data)
    })
  }

}
</script>

<style scoped>
@import "../assets/css/student.css";
</style>