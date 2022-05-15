<template>
  <div class="tags">
    <el-tag
        style="float: left;margin-right: 5px;"
        size="small"
        v-for="(tag,index) in tags"
        :key="tag.path"
        :closable = "tag.name !== 'AdminHome'"
        :effect = "$route.path === tag.path ? 'dark': 'plain'"
        type="info"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
    >{{tag.label}}
    </el-tag>
  </div>


</template>

<script>
import {mapState,mapMutations} from "vuex";

export default {
  name: "CommonTag",
  computed:{
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  methods: {
    changeMenu(tag){
      this.$router.push(tag.path)
    },
    handleClose(tag,index){
      const inx = this.tags.length - 1
      this.close(tag)
      if(tag.path !== this.$route.path){
        return
      }
      if(inx === index){
        this.$router.push(this.tags[index-1].path)
      }else{
        this.$router.push(this.tags[index].path)
      }
    },
    ...mapMutations({
      close: 'closeTag'
    })
  }

}
</script>

<style scoped>
@import "../assets/css/AdminCommon.css";
</style>