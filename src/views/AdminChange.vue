<template>
  <div class="home">
    <div class="change_info">
      <fieldset class="fieldStyle">
        <legend>修改学生成绩</legend>
        <table class="Info" >
          <tr >
            <td>学生学号：</td>
            <td>
              <el-input size="mini" placeholder="请输入学生学号" v-model="change_id"></el-input>
            </td>
          </tr>
          <tr >
            <td>基本分：</td>
            <td>
              <el-input size="mini" placeholder="请输入修改后的基本分" v-model="change_grade"></el-input>
            </td>
          </tr>
          <tr >
            <td>额外分：</td>
            <td>
              <el-input size="mini" placeholder="请输入修改后的额外分" v-model="change_bonus"></el-input>
            </td>
            <td class="change_sure"><el-button size="mini" @click="update">确定修改</el-button></td>
            <td><el-button size="mini" @click="reset">取消修改</el-button></td>
          </tr>

        </table>
      </fieldset>
    </div>
    <div class="change_info">
      <fieldset class="fieldStyle">
        <legend>取消学生志愿提交</legend>
        <table class="Info" >
          <tr>
            <td>学生学号：</td>
            <td>
              <el-input size="mini" placeholder="请输入学生学号" v-model="cancel_id"></el-input>
            </td>
            <td><el-button size="mini" @click="cancel">确定</el-button></td>
          </tr>
        </table>
      </fieldset>
    </div>
  </div>

</template>

<script>
export default {
  name: "AdminChange",
  data(){
    return {
      change_id: '',
      change_grade: '',
      change_bonus: '',
      cancel_id:''
    }
  },
  methods: {
    update(){
      if(!this.change_id || !this.change_grade || !this.change_bonus){
        this.$message.error('请输入完整信息！')
      }else{
        let data = new URLSearchParams()
        data.append('username',this.change_id)
        data.append('basicScore',this.change_grade)
        data.append('extraScore',this.change_bonus)
        this.api({
          url: '/main/student/score',
          method: 'put',
          data: data
        }).then(response=>{
          this.$message.success('修改成功!')
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }
    },
    reset(){
      this.change_id = ''
      this.change_grade = ''
      this.change_bonus = ''
    },
    cancel(){
      if(!this.cancel_id){
        this.$message.error('请输入学生学号！')
      }else{
        let data = new URLSearchParams()
        data.append('username',this.cancel_id)
        this.api({
          url: '/main/student/submit',
          method: 'delete',
          data: data
        }).then(response=>{
          this.$message.success('取消成功！')
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }
    }
  }

}
</script>

<style scoped>
@import "../assets/css/admin.css";

</style>