<template>
<div>
  <div id="top">
    <div id="topInfo">
      <div>
        <p>{{this.name}}
          [<el-link style="color: white;" @click="logout">退出</el-link>]
        </p>
      </div>
    </div>
    <div id="topLogo">
      <img src="../assets/img/管理学院logo.png" class="top_logo_left">
      <img src="../assets/img/51 (2).png" class="top_log_text">
    </div>
    <div>
      <el-menu
          mode="horizontal"
          background-color="#135E7F"
          text-color="#fff"
          active-text-color="#fff">
        <el-menu-item @click="changePath(item)" v-for="item of menu" :disabled="item.disable" :index="item.path" :key="item.path">{{item.label}}</el-menu-item>
      </el-menu>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "CommonStuHeader",
  methods: {
    logout(){
      let username = localStorage.getItem('username')
      let params = new URLSearchParams()
      params.append('username',username)
      this.api({
        url: '/student/logout',
        method: 'delete',
        params: params
      }).then(response=>{
        this.$message.success('注销成功！')
        localStorage.clear()
      }).catch(error=>{
        console.log(error)
      })
      this.$router.push('/stuLogin')
    },
    changePath(item){
      this.$router.push(item.path)
    }
  },
  created() {
    const username = sessionStorage.getItem('username')
    const that = this
    this.api.get('/student/'+username)
    .then(response=>{
      const student = response.data
      that.name = student.studentName
    }).catch(error=>{
      console.log(error)
    })
  },

  data(){
    return {
      name:'',
      menu: [
        {
          path: '/index',
          name: 'StudentIndex',
          label: '首页',
          disable: false
        },
        {
          path: '/wish',
          name: 'StudentWish',
          label: '志愿选择',
          disable: false
        }
      ]
    }
  }
}
</script>

<style scoped>
@import "../assets/css/student.css";
</style>