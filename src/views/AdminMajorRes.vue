<template>
  <div class="home">
    <div class="top1">
      &nbsp;&nbsp;
      姓名：
      <el-input  style="margin-right: 5px;width: 150px" size="mini"  v-model="name"  ></el-input>
      <el-button size="mini" class="el-icon-search" @click="lbtSearchClick">搜索</el-button>
      <el-button size="mini" @click="btnOutClick" type="info" style="float:right;margin-right: 80px">导出excel文件</el-button>
    </div>
    <div>
      <el-table
          :data="table_res"
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
        <el-table-column v-for="(item,index) in res_title"
                         :index="index"
                         :key="index"
                         :prop=item.prop
                         :label=item.label
                         :width="item.width"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
          small
          @current-change="handleCurrentChange"
          @prev-click = "preClick"
          @next-click = "nextClick"
          :page-size=this.page_size
          layout="prev, pager, next, jumper"
          :total= this.total>
      </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: "AdminMajorRes",
  data(){
    return {
      page_size: 10,
      total: 0,
      options: [],
      grade: '',
      major: '',
      name: '',
      res_title:[
        {
          prop: 'stuID',
          label: '学号',
          width: '115px'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'class',
          label: '原班级'
        },
        {
          prop: 'formalGrade',
          label: '基础成绩'
        },
        {
          prop: 'bonus',
          label: '加分项'
        },
        {
          prop: 'totalGrade',
          label: '总成绩'
        },
        {
          prop: 'major',
          label: '分流结果'
        },
        {
          prop: 'one',
          label: '第一志愿'
        },
        {
          prop: 'two',
          label: '第二志愿'
        },
        {
          prop: 'three',
          label: '第三志愿'
        },
        {
          prop: 'four',
          label: '第四志愿'
        },
        {
          prop: 'five',
          label: '第五志愿'
        },
        {
          prop: 'six',
          label: '第六志愿'
        },
        {
          prop: 'seven',
          label: '第七志愿'
        },
        {
          prop: 'eight',
          label: '第八志愿'
        },
        {
          prop: 'nine',
          label: '第九志愿'
        },
        {
          prop: 'ten',
          label: '第十志愿'
        }

      ],
      table_res:[
      ],
      all_student:[]
    }
  },
  created(){
    const that = this
    this.api.get('/main/students')
      .then(response=>{
        let infos = response.data
        let res = []
        for(let i = 0;i<infos.length;i++){
          let temp = {}
          let major_ten = infos[i].selectDepartmentName.split(',')
          while(major_ten.length!==10){
            major_ten.push(' ')
          }
          temp.stuID = infos[i].studentNumber
          temp.name = infos[i].studentName
          temp.sex = infos[i].sex === 1?'男':'女'
          temp.class = infos[i].studentClass
          temp.formalGrade = infos[i].basicScore
          temp.bonus = infos[i].extraScore
          temp.totalGrade = Math.round((infos[i].basicScore + infos[i].extraScore)*1000000)/ 1000000
          temp.major = infos[i].lastDepartmentName
          temp.one = major_ten[0]
          temp.two = major_ten[1]
          temp.three = major_ten[2]
          temp.four = major_ten[3]
          temp.five = major_ten[4]
          temp.six = major_ten[5]
          temp.seven = major_ten[6]
          temp.eight = major_ten[7]
          temp.nine = major_ten[8]
          temp.ten = major_ten[9]
          res.push(temp)
        }
        this.all_student = res
        this.total = res.length
        this.table_res = this.all_student.slice(0,this.page_size)
      }).catch(error=>{
      this.$message.error(error.response.data)
    })
  },
  methods:{
    lbtSearchClick(){
      if(!this.name){
        this.$message.error('请输入姓名！')
      }else{
        this.table_res = this.all_student.filter(item => item.name === this.name)
      }
    },
    handleCurrentChange(currentPage){
      let current = parseInt(currentPage)
      this.table_res = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
    },
    preClick(currentPage){
      if(parseInt(currentPage)>1){
        let current = parseInt(currentPage)
        this.table_res = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
      }
    },
    nextClick(currentPage){
      if(parseInt(parseInt(currentPage)<=Math.ceil(parseInt(this.total)/this.page_size))){
        let current = parseInt(currentPage)
        this.table_res = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
      }
    },
    btnOutClick(){
      this.api({
        url: '/main/excel',
        responseType:"blob",
        method: 'get'
      }).then(response=>{
        console.log(response)
        const res = response.data
        if (response.headers['content-type'] === "application/octet-stream;charset=utf-8") {
          let disposition = decodeURI(response.headers['content-disposition']);
          let fileName = disposition.split('=')[1];
          const a = document.createElement('a')
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const url = URL.createObjectURL(blob)
          a.setAttribute('href', url)
          a.setAttribute('download', fileName)
          a.click()
          return
        }
    })}
  }
}
</script>

<style scoped>
@import "../assets/css/admin.css";
</style>