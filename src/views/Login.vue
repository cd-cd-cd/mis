<template>
<div>
<div class="head"></div>
  <div class="middle">
    <div class="title_login">
      <div class="name">管理学院专业分流系统</div>
      <div class="name2" >主管理员端</div>
    </div>
    <div class="form_login">
      <el-form
          ref="form"
          label-width="120px"
          :model = 'form'
          class="login-container"
          :rules="rules"
      >
        <el-form-item label="用户名"  style="margin-bottom: 10px" prop="id" inline-message="true">
          <el-input size="mini" v-model="form.id" style="width: 80%" ></el-input>
        </el-form-item>
        <el-form-item label="密码"  style="margin-bottom: 10px" prop="password" inline-message="true">
          <el-input size="mini" v-model="form.password" style="width: 80%" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" style="margin-bottom: 13px" prop="code" inline-message="true">
          <el-input type="text" size="mini" v-model="form.code" style="width: 80%" ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: -10px">
          <img class="identify" :src="identifyUrl">
          <el-link style="height: 20px;margin: 0 0 10px 10px;" @click="changeIdentify">刷新</el-link>
        </el-form-item>
        <el-form-item >
          <el-button size="mini" style="margin-right: 100px" @click="resetForm()">取消</el-button>
          <el-button size="mini" type="primary" @click="onSubmit" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="foot"></div>
</div>
</template>
<script>

import axios from "axios";
import {Base64} from "js-base64";

export default {
  name: "Login",
  data(){
    return {
      identifyUrl: '',
      form:{
        id: '',
        password: '',
        code:''
    },
      key: '',
      rules: {
        id: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          {required: true, message: '请输入效验码', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.api.get('/captcha')
    .then(response=>{
      this.identifyUrl = response.data.captchaImg
      this.key = response.data.key
    }).catch(error=>{
      console.log(error.response.data)
    })
  },
  methods:{
    onSubmit()
    {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = new URLSearchParams()
          const that = this
          params.append('id',this.form.id)
          params.append('password',this.form.password)
          params.append('key',this.key)
          params.append('code',this.form.code)
          this.api.post('/main/login',params)
          .then((response)=>{
            window.sessionStorage.setItem('main_id',that.form.id)
            window.localStorage.setItem('user','mainadmin')
            window.localStorage.setItem('main_id',that.form.id)
            window.localStorage.setItem('token',response.data)
            this.$message.success('登陆成功！')
            this.$router.push('/home')
          }).catch((res)=>{
            this.$message.error(res.response.data)
          })
        } else {
          this.$message.error('请输入所有信息!');
          return false;
        }
      });
    },
    changeIdentify(){
      this.api.get('/captcha')
      .then(response=>{
        this.identifyUrl = response.data.captchaImg
        this.key = response.data.key
      }).catch(error=>{
        console.log(error.response.data)
      })
    },
    resetForm() {
      this.form.id = ''
      this.form.password = ''
      this.form.code = ''
    },
  }
}
</script>

<style scoped>
@import "../assets/css/login.css";
</style>