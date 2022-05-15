<template>
<div>
  <div class="aside_top">
    <h4>功能模块</h4>
  </div>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo" >
    <el-menu-item v-for="item in adminDuty" @click="clickDuty(item)" :index="item.path" :key="item.path">
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: "CommonAsideAdmin",
  data(){
    return {
      adminDuty:[
        {
          path: '/info',
          name: 'AdminStuInfo',
          label: '学生基本信息',
        },
        {
          path: '/apply',
          name: 'AdminStuApply',
          label: '学生志愿信息',
        },
        {
          path: '/change',
          name: 'AdminChange',
          label: '修改学生信息'
        },
        {
          path: '/setting',
          name: 'AdminMajorSet',
          label: '专业分流设置',
        },
        {
          path: '/result',
          name: 'AdminMajorRes',
          label: '专业分流结果',
        }
      ]
    }
  },
  methods: {
    // 点击菜单内容路由跳转
    clickDuty(item){
      this.$router.push(item.path)
      this.$store.commit("selectMenu",item)
    }
  }
}
</script>

<style scoped>
@import "../assets/css/AdminCommon.css";
</style>