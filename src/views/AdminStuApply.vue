<template>
  <div class="home">
    <div class="top1">
      &nbsp;&nbsp;
      姓名：
      <el-input  style="margin-right: 5px;width: 150px" size="mini"  v-model="name"  ></el-input>
        <el-button size="mini" class="el-icon-search" @click="lbtSearchClick">搜索</el-button>
      <el-button size="mini" @click="search_submit">未提交名单</el-button>
    </div>
    <div >
      <el-table
          :data="tableData"
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
            textAlign: 'center',
          }">
        <el-table-column v-for="(item,index) in title"
                         :index="index"
                         :key="index"
                         :prop=item.prop
                         :label=item.label
                         :width=item.width
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
  name: "AdminStuApply",
  data(){
    return {
      page_size: 21,
      grade: '',
      name: '',
      total: 0,
      title: [
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
        },
        {
          prop: 'submit',
          label: '是否提交'
        }
      ],
      tableData: [
      ],
      all_student:[],
      unSubmit:[],
      isClick: false
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
        temp.submit = infos[i].submit===1?'是':'否'
        res.push(temp)
      }
      console.log(res.length)
      this.all_student = res
      this.total = res.length
      this.unSubmit = res.filter(item => item.submit === '否')
      this.tableData = this.all_student.slice(0,this.page_size)
    }).catch(error=>{
      this.$message.error(error.response.data)
    })
  },
  methods: {
    lbtSearchClick(){
      if(!this.name){
        this.$message.error('请输入姓名！')
      }else{
        this.tableData = this.all_student.filter(item => item.name === this.name)
        console.log(this.tableData)
      }
    },
    handleCurrentChange(currentPage){
      let current = parseInt(currentPage)
      if(!this.isClick){
        this.tableData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
      }else{
        this.tableData = this.unSubmit.slice((current-1)*this.page_size,current*this.page_size)
      }
    },
    preClick(currentPage){
      if(parseInt(currentPage)>1){
        let current = parseInt(currentPage)
        if(!this.isClick){
          this.tableData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
        }else{
          this.tableData = this.unSubmit.slice((current-1)*this.page_size,current*this.page_size)
        }
      }
    },
    nextClick(currentPage){
      if(parseInt(parseInt(currentPage)<=Math.ceil(parseInt(this.total)/this.page_size))){
        let current = parseInt(currentPage)
        if(!this.isClick){
          this.tableData = this.all_student.slice((current-1)*this.page_size,current*this.page_size)
        }else{
          this.tableData = this.unSubmit.slice((current-1)*this.page_size,current*this.page_size)
        }
      }
    },
    search_submit(){
      this.isClick = true
      this.tableData = this.unSubmit.slice(0,this.page_size)
    }
  }

}
</script>

<style scoped>
@import "../assets/css/admin.css";
</style>