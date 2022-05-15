<template>
  <div class="home">
    <div class="admin_password">
        <fieldset class="fieldStyle">
          <legend>设置管理员密码</legend>
          <table class="Info" >
            <tr>
              <td style="text-align:right">欢迎您，主管理员</td>
            </tr>
            <tr>
              <td>
                设置新密码：
              </td>
              <td class="longTd">
                <el-input style="margin-right: 5px" size="mini" placeholder="请输入密码" v-model="admin_pass" show-password ></el-input>
                <el-button size="mini" @click="admin_update" >确定</el-button>
              </td>
            <td><span>6-20位，可以容纳大小写字母、数字、特殊字符(.@#$%^&*)</span></td>
            </tr>
          </table>
        </fieldset>
    </div>
    <div class="stu_password">
      <fieldset class="fieldStyle">
        <legend>设置学生密码</legend>
        <table class="Info" >
          <tr>
            <td>
              学号：
            </td>
            <td class="longTd">
              <el-input style="margin-right: 5px" size="mini" v-model="student_pass" ></el-input>
              <el-button size="mini" @click="refresh_student">初始化密码</el-button>
            </td>
          </tr>
        </table>
      </fieldset>
    </div>
    <div class="stu_password">
      <fieldset class="fieldStyle">
        <legend>删除学生学号</legend>
        <table class="Info" >
          <tr>
            <td>
              学号：
            </td>
            <td class="longTd">
              <el-input style="margin-right: 5px" size="mini" v-model="deletStu" ></el-input>
              <el-button size="mini" @click="delete_student">点击删除</el-button>
            </td>
          </tr>
        </table>
      </fieldset>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminHome",  //学生基本信息
  data() {
    return {
      deletStu:'',
      admin_pass :'',
      student_pass:'',
      admin_id: '',
      fileList:[]
    }
  },
  created() {
    this.admin_id = sessionStorage.getItem('main_id')
  },
  methods: {
    admin_update(){
      if(!this.admin_pass){
        this.$message.error('请输入新密码！');
      }else if(this.admin_pass.length<6 || this.admin_pass.length>20){
        this.$message.error('6-20位，可以容纳大小写字母、数字、特殊字符(.@#$%^&*)\n')
      } else{
        let params = new URLSearchParams()
        params.append('id',this.admin_id)
        params.append('password',this.admin_pass)
        this.api.put('/main/password',params)
        .then(response=>{
          this.$message.success('密码修改成功！')
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }
    },
    refresh_student(){
      if(!this.student_pass){
        this.$message.error('请输入学生学号！');
      }else{
        let data = new URLSearchParams()
        data.append('username',this.student_pass)
        this.api({
          method: 'put',
          data: data,
          url: '/main/student/password'
        }).then((response)=>{
          this.$message.success('密码初始化成功！')
        }).catch((error)=>{
          this.$message.error(error.response.data)
        })
      }
    },
    delete_student(){
      this.$confirm('此操作将永久删除该学号学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams()
        params.append('username',this.deletStu)
        this.api({
          url: '/main/student',
          method: 'delete',
          params: params
        }).then(response=>{
          console.log(response)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>
@import "../assets/css/admin.css";
</style>