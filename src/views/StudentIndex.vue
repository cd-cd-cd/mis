<template>
<div>
  <div>

  <el-row>
    <el-col :span="24"><div class="grid-content title">基本信息</div></el-col>
  </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content2 content"></div></el-col>
    </el-row>
    <el-row>
    <el-col :span="6"><div class="grid-content content"></div></el-col>
    <el-col :span="6"><div class="grid-content content">姓名：{{info.name}}</div></el-col>
    <el-col :span="6"><div class="grid-content content">性别：{{info.sex}}</div></el-col>
    <el-col :span="6"><div class="grid-content content"></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="grid-content content"></div></el-col>
    <el-col :span="6"><div class="grid-content content">年级：{{info.grade}}</div></el-col>
    <el-col :span="6"><div class="grid-content content">学号：{{info.id}}</div></el-col>
    <el-col :span="6"><div class="grid-content content"></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="grid-content content"></div></el-col>
    <el-col :span="6"><div class="grid-content content">班级：{{info.class}}</div></el-col>
    <el-col :span="12"><div class="grid-content content"></div></el-col>
  </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content2 content"></div></el-col>
    </el-row>
  </div>
  <div class="change_password">
    <el-row>
      <el-col :span="24"><div class="grid-content title">修改密码</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content content"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content content"></div></el-col>
      <el-col :span="12">
        <div class="grid-content content">
        设置新密码：
          <el-input size="mini" style="width: 200px" v-model="newPassword"></el-input>
          <el-button size="mini" @click="changeStuPassword" style="margin-left: 10px">确认</el-button>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content content"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content content"></div></el-col>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: "StudentIndex",
  data(){
    return {
      info:{
        id: '',
        name: '',
        grade: '',
        major: '',
        sex: '',
        college: '',
        class: ''
      },
      newPassword: '',
      start_time: '',
      end_time: '',
      username: ''
    }
  },
  methods: {
    changeStuPassword(){
      if(!this.newPassword){
        this.$message.error('请输入密码！')
      }else if(this.newPassword.length<6 || this.newPassword.length>20){
        this.$message.error('6-20位，可以容纳大小写字母、数字、特殊字符(.@#$%^&*)\n')
      } else{
        const username = sessionStorage.getItem('username')
        let params = new URLSearchParams()
        params.append('username',username)
        params.append('password',this.newPassword)
        this.api.put('/student/password',params)
        .then(response=>{
          this.$message.success('密码修改成功！')
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }
    },
  },
  created(){
    const username = sessionStorage.getItem('username')
    const that = this
    this.username = username
    this.api.get('/student/'+username)
    .then(response=>{
      const student = response.data
      that.info.id = student.studentNumber
      that.info.name = student.studentName
      that.info.grade = student.studentGrade+'级'
      that.info.class = student.studentClass
      that.info.sex = student.sex === 1?'男':'女'
    }).catch(error=>{
      this.$message.error(error.response.data)
    })
  }

}
</script>

<style scoped>
@import "../assets/css/student.css";
</style>