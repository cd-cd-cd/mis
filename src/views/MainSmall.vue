<template>
  <div>
    <el-container style="height: 100vh;">
      <el-header style="height: 68px;padding: 0px;"><small-header></small-header></el-header>
      <el-container>
        <el-aside width="200px" >
          <common-s-aside></common-s-aside>
        </el-aside>
        <el-main style="padding-top: 10px">
          <common-main-small></common-main-small>
        </el-main>
      </el-container>
      <el-footer style="padding: 0;height:30px;"><common-footer-admin/></el-footer>
    </el-container>
  </div>
</template>

<script>
import commonFooterAdmin from "@/components/CommonFooterAdmin";
import commonSAside from "@/components/CommonSAside";
import CommonMainSmall from "@/components/CommonMainSmall";
import SmallHeader from "@/components/smallHeader";
import smallHeader from "@/components/smallHeader";
export default {
  name: "MainSmall",
  components:{
    SmallHeader,
    CommonMainSmall,
    commonFooterAdmin,
    commonSAside,
    smallHeader
  }
}
</script>

<style scoped>

</style>