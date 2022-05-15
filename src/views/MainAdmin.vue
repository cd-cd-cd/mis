<template>
  <div>
    <el-container style="height: 100vh;">
      <el-header style="height: 68px;padding: 0px;"><common-header-admin/></el-header>
      <el-container>
        <el-aside width="200px" >
          <common-aside-admin></common-aside-admin>
        </el-aside>
        <el-main style="padding: 0px">
          <common-main-admin/>
        </el-main>
      </el-container>
      <el-footer style="padding: 0;height:30px;"><common-footer-admin/></el-footer>
    </el-container>
  </div>
</template>

<script>
import commonAsideAdmin from "@/components/CommonAsideAdmin";
import commonFooterAdmin from "@/components/CommonFooterAdmin";
import commonHeaderAdmin from "@/components/CommonHeaderAdmin";
import commonMainAdmin from "@/components/CommonMainAdmin";

export default {
  name: "MainAdmin",
  components:{
    commonFooterAdmin,
    commonHeaderAdmin,
    commonAsideAdmin,
    commonMainAdmin,
  }
}
</script>

<style lang="css" scoped>

</style>