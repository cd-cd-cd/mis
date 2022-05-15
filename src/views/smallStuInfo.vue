<template>
  <div class="home">
    <div class="top1">
      &nbsp;&nbsp;
      姓名：
      <el-input  style="margin-right: 5px;width: 150px" size="mini"  v-model="name"  ></el-input>
      <el-button size="mini" class="el-icon-search" @click="lbtSearchClick">搜索</el-button>
      <el-button size="mini" @click="search_submit">未提交名单</el-button>
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
          :page-size=this.page_size
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @prev-click = "preClick"
          @next-click = "nextClick"
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
    this.api.get('/admin/students')
      .then(response=>{
        let temp = response.data
        let array = []
        for(let i = 0;i<temp.length;i++){
          temp[i].sex = temp[i].sex === 1?'男':'女'
          temp[i].submit = temp[i].submit === 1?'是':'否'
          temp[i].totalScore = Math.round((temp[i].basicScore + temp[i].extraScore)*1000000)/ 1000000
          array.push(temp[i])
        }
        that.all_student = array
        this.total = array.length
        that.unSubmit = array.filter(item => item.submit === '否')
        that.stuInfoData = that.all_student.slice(0,this.page_size)
      }).catch(error=>{
      this.$message.error(error.response.data)
    })
  },
  data(){
    return {
      page_size: 21,
      total: 0,
      fileList: [],
      updateForm: {
      },
      options: [
      ],
      grade: '',
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
        },
        {
          prop: 'submit',
          label: '是否提交'
        }
      ],
      stuInfoData: [],
      all_student: [],
      unSubmit:[],
      isClick: false
    }
  },
  methods: {
    lbtSearchClick(){
      if(!this.name){
        this.$message.error('请输入姓名！')
      }else{
        this.stuInfoData = this.all_student.filter(item => item.studentName === this.name)
        console.log(this.stuInfoData)
      }
    },
    handleCurrentChange(currentPage){
      let current = parseInt(currentPage)
      if(!this.isClick){
        this.stuInfoData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
      }else{
        this.stuInfoData = this.unSubmit.slice((current-1)*this.page_size,current*this.page_size)
      }
    },
    preClick(currentPage){
      if(parseInt(currentPage)>1){
        let current = parseInt(currentPage)
        if(!this.isClick){
          this.stuInfoData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
        }else{
          this.stuInfoData = this.unSubmit.slice((current-1)*this.page_size,current*this.page_size)
        }
      }
    },
    nextClick(currentPage){
      if(parseInt(parseInt(currentPage)<=Math.ceil(parseInt(this.total)/this.page_size))){
        let current = parseInt(currentPage)
        if(!this.isClick){
          this.stuInfoData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
        }else{
          this.stuInfoData = this.unSubmit.slice((current-1)*this.page_size,current*this.page_size)
        }
      }
    },
    search_submit(){
      this.isClick = true
      this.stuInfoData = this.unSubmit.slice(0,this.page_size)
    }
  }
}
</script>

<style scoped>

@import "../assets/css/admin.css";
</style>