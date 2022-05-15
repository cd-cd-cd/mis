<template>
  <div>
    <div class="aside_top">
      <h4>功能模块</h4>
    </div>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo" >
      <el-menu-item v-for="item in smallDuty" @click="clickSmallDuty(item)" :index="item.path" :key="item.path">
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CommonSAside",
  data(){
    return {
      smallDuty:[
        {
          path: '/small',
          name: 'smallHome',
          label: '基本信息',
        },
        {
          path: '/smallInfo',
          name: 'smallStuInfo',
          label: '学生基本信息',
        },
      ]
    }
  },
  methods: {
    // 点击菜单内容路由跳转
    clickSmallDuty(item){
      this.$router.push(item.path)
      this.$store.commit("selectMenu",item)
    }
  }
}
</script>

<style scoped>
@import "../assets/css/AdminCommon.css";
</style>