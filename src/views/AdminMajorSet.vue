<template>
  <div class="home">
    <div class="part">
      <fieldset class="fieldStyle">
        <legend>开始分流</legend>
        <div id="top_left">
          <el-button size="mini" @click="DepartmentBtn_Click">专业分流</el-button>
        </div>
        <div class="attention2">
          提示：时间截止学生填写完毕后，再点击此按钮进行专业分流
        </div>
      </fieldset>
    </div>
    <div class="part">
      <fieldset class="fieldStyle">
        <legend>申请时间设置</legend>
        <div id="fieTime">
          开始时间：
          <el-date-picker
              v-model="start_time"
              size="mini"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
          </el-date-picker>
          &nbsp;&nbsp;&nbsp;&nbsp;
          结束时间：
          <el-date-picker
              v-model="end_time"
              size="mini"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
          </el-date-picker>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button id="btnTime" @click="btnTimeClick" size="mini">确定</el-button>
          <br/>
          <div class="attention3">(志愿申请设置的时间为： {{this.start}} ---- {{this.end}})</div>
        </div>
      </fieldset>
    </div>
    <div class="part">
      <fieldset class="fieldStyle">
        <legend>专业设置</legend>
        <div>
          <el-table
              :data="majorNumber"
              border
              height="300px"
              style="width: 80%;
              font-size: 12px;
              padding-left: 3px;
              margin: 0 auto;
              padding-top: 5px;"
              :header-cell-style="{
            textAlign: 'center',
            padding: '5px'}"
              :cell-style="{
                padding:'0px',
                textAlign: 'center',
              }"
          >
            <el-table-column
                v-for="(item,index) in majorNumberTitle"
                :index="index"
                :width="item.width"
                :prop="item.prop"
                :label="item.label">
            </el-table-column>
            <el-table-column
                label="操作"
                width="90px"
            >
              <template slot-scope="scope">
              <el-button type="text" style="text-decoration: underline;font-size: 12px" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </fieldset>
    </div>
</div>
</template>

<script>
export default {
  name: "AdminMajorSet",
  data(){
    return {
      option: [],
      value: '',
      value2:'',
      start_time: '',
      start:'',
      end:'',
      end_time: '',
      majorNumberTitle:[
        {
          prop: 'major',
          label: '专业',
          width: "400px"
        },
        {
          prop: 'num',
          label: '人数',
          width: '130px'
        },
      ],
      majorNumber:[
      ]
    }
  },
  created(){
    const that = this
      this.api.get('/main/department')
      .then(response=>{
        const datas = response.data
        let array = []
        for(let item of datas){
          array.push({major: item.departmentName, num: item.studentCount})
        }
        this.majorNumber = array
      })
    this.api.get('/main/time')
    .then(response=>{
      console.log(response.data.startTime)
      this.start = response.data.startTime.replace('T',' ').split('.')[0]
      this.end = response.data.endTime.replace('T',' ').split('.')[0]
    }).catch(error=>{
      this.$message.error(error.response.data)
    })
  },
  methods: {
    DepartmentBtn_Click(){
      this.api.put('/main/student/wish')
      .then(response=>{
        this.$message.success('专业分流成功！')
      }).catch(error=>{
        this.$message.error(error.response.data)
      })
    },
    btnTimeClick(){
      if(!this.start_time || !this.end_time){
        this.$message.error('请选择开始和结束时间！')
      }else{
        let params = new URLSearchParams()
        params.append('startTime',this.start_time)
        params.append('endTime',this.end_time)
        this.api.put('/main/time',params)
        .then(response=>{
          this.$message.success('时间设置成功！')
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
        this.api.get('/main/time')
        .then(response=>{
          console.log(response.data.startTime)
          this.start = response.data.startTime.replace('T',' ').split('.')[0]
          this.end = response.data.endTime.replace('T',' ').split('.')[0]
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }
    },
    down(){
      this.api.get('/main/excel')
      .then(response=>{
        console.log(response)
      }).catch(error=>{
        console.log(error.response.data)
      })
    },
    DepartmentBtn_Click2(){
      this.api.get('/main/'+this.value2+'/department ')
      .then(response=>{
        const datas = response.data
        let array = []
        for(let item of datas){
          array.push({major: item.departmentName, num: item.studentCount})
        }
        this.majorNumber = array
      }).catch(error=>{
        this.$message.error(error.response.data)
      })
    },
    handleEdit(index,row){
      console.log([index,row])
      const major = row.major
      this.$prompt('请输入人数',major, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '请输入数字!'
      }).then(({ value }) => {
        let params = new URLSearchParams()
        params.append('year',this.value2)
        params.append('name',major)
        params.append('count',value)
        this.api.put('/main/department',params)
        .then(response=>{
          row.num = value
          this.$message({
            type: 'success',
            message: major + '专业的人数已修改为' + value
          });
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    }
  }
}
</script>

<style scoped>
@import "../assets/css/admin.css";
</style>