<template>
  <div class="home">
    <div class="top1">
      &nbsp;&nbsp;
      姓名：
      <el-input  style="margin-right: 5px;width: 150px" size="mini" v-model="name"></el-input>
      <el-button size="mini" class="el-icon-search" @click="lbtSearchClick">搜索</el-button>
      <el-button size="mini"  type="info" style="float:right;margin-right: 80px" @click="upload" >立即上传</el-button>
      <el-upload
          :action="uploadUrl()"
          accept=".xlsx, .xls"
          :auto-upload="false"
          :show-file-list="false"
          style="float: right;margin-right: 30px"
          :on-change="handle"
      >
        <el-button size="mini" type="info" >选择文件</el-button>
      </el-upload>
    </div>
    <div>
      <el-table
          :data="stuInfoData"
          stripe
          style="width: 98%;font-size: 9px;padding-left: 3px;padding-top: 5px"
          border
          :header-cell-style="{
            textAlign: 'center',
            padding: '5px',
        }"
          :row-style="{height:'20px'}"
          :cell-style="{
            padding:'0px',
            textAlign: 'center'
          }">
        <el-table-column v-for="(item,index) in titleStuInfo"
                         :index="index"
                         :key="index"
                         :prop=item.prop
                         :label=item.label
                         :width=item.width
        >
        </el-table-column>
      </el-table>
    </div>
    <div >
      <el-pagination
          small
          :page-size = this.page_size
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @prev-click = "preClick"
          @next-click = "nextClick"
          :on-change="handle"
          :total= this.total>
      </el-pagination>
  </div>
    </div>
</template>

<script>

export default {
  name: "AdminStuInfo",
  props:{
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  created(){
    const that = this
      this.api.get('/main/students')
      .then(response=>{
        let temp = response.data
        let array = []
        for(let i = 0;i<temp.length;i++){
          temp[i].sex = temp[i].sex === 1?'男':'女'
          temp[i].totalScore = Math.round((temp[i].basicScore + temp[i].extraScore)*1000000)/ 1000000
          array.push(temp[i])
        }
        that.all_student = array
        that.total = array.length
        that.stuInfoData = that.all_student.slice(0,this.page_size)
      }).catch(error=>{
        this.$message.error(error.response.data)
      })

  },
  data(){
    return {
      page_size: 21,
      total: 0,
      updateForm: {
      },
      name: '',
      titleStuInfo:[
      {
        prop: 'studentNumber',
        label: '学号',
        width: '115px'
      },
      {
        prop: 'studentName',
        label: '姓名'
      },
      {
        prop: 'sex',
        label: '性别'
      },
      {
        prop: 'studentGrade',
        label: '年级'
      },
      {
        prop: 'studentClass',
        label: '原班级'
      },
      {
        prop: 'studentType',
        label: '学生类别'
      },
      {
        prop: 'xuejiState',
        label: '学籍状态'
      },
      {
        prop: 'atSchool',
        label: '是否在校'
      },
      {
        prop: 'basicScore',
        label: '基础成绩'
      },
        {
         prop: 'extraScore',
          label: '加分项'
        },
        {
          prop: 'totalScore',
          label: '总成绩'
        }
    ],
      stuInfoData: [],
      all_student: [],
      fileList: ''
    }
  },
  methods: {
    lbtSearchClick(){
      if(!this.name){
        this.$message.error('请输入姓名！')
      }else{
          this.stuInfoData = this.all_student.filter(item => item.studentName === this.name)
        console.log(this.stuInfoData)
      }},
    uploadUrl(){
      return ""
    },
    UploadUrl:function(){
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ""
    },
    handle(ev){
      let file = ev.raw;
      if (!file) return;
      //读取file文件
      this.fileList = file
    },
    upload(){
      const params = new FormData() // 声明formData数据类型
      if(!this.fileList){
        this.$message.warning('请选择文件')
        return
      }
      params.append('excel',this.fileList)
      this.api.post('/main/excel',params,{
        "Content-Type" : "multipart/form-data"
      }).then(response=>{
        this.$message.success(response.data+',请刷新查看数据')
      }).catch(error=>{
        this.$message.error('请勿重复上传')
      })
    },

    handleCurrentChange(currentPage){
      let current = parseInt(currentPage)
      this.stuInfoData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
    },
    preClick(currentPage){
      if(parseInt(currentPage)>1){
        let current = parseInt(currentPage)
        this.stuInfoData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
      }
    },
    nextClick(currentPage){
      if(parseInt(parseInt(currentPage)<=Math.ceil(parseInt(this.total)/this.page_size))){
        let current = parseInt(currentPage)
        this.stuInfoData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/css/admin.css";
</style>