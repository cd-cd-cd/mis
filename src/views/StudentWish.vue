<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content title">志愿选择</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content content"></div></el-col>
      <el-col :span="6"><div class="grid-content content">成绩：{{personData.grade}}</div></el-col>
      <el-col :span="6"><div class="grid-content content">附加分：{{personData.bonus}}</div></el-col>
      <el-col :span="7"><div class="grid-content content">总分：{{personData.total}}</div></el-col>
    </el-row>
    <div class="major_choice">
      <div>
        <el-row style="margin-bottom: 5px">
          <el-col :span="8" align="center" v-for="item in wishTitle" :key="item" >{{item}}</el-col>
        </el-row>
      </div>
      <div class="major_1">
        <el-row>
          <el-col :span="3" ><div class="stu">会计学:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelect" v-model="sixMajor[0].value" size="mini" placeholder="请选择专业" clearable>
              <el-option
                  v-for="item in majorRank"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" ><div class="stu">大数据会计:</div></el-col>
           <el-col :span="5"> <el-select @change="changSelectCount" v-model="sixMajor[0].children[0].value" size="mini" placeholder="请选择方向" clearable>
              <el-option
                  v-for="item in countOrient"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" ><div class="stu">大数据会计1:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelectClass" v-model="sixMajor[0].children[0].children[0].value" size="mini" placeholder="请选择班级" clearable>
              <el-option
                  v-for="item in count_class"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="3" :offset="15" ><div class="stu">大数据会计2:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelectClass" v-model="sixMajor[0].children[0].children[1].value" size="mini" placeholder="请选择班级" clearable>
              <el-option
                  v-for="item in count_class"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="8" ><div class="stu">管理会计:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelectCount" v-model="sixMajor[0].children[1].value" size="mini" placeholder="请选择方向" clearable>
              <el-option
                  v-for="item in countOrient"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="major">
        <el-row>
          <el-col :span="3"><div class="stu">工商管理:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelect" v-model="sixMajor[1].value" size="mini" placeholder="请选择专业" clearable>
              <el-option
                  v-for="item in majorRank"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="major">
        <el-row>
          <el-col :span="3" ><div class="stu">财务管理:</div></el-col>
          <el-col :span="5" >
            <el-select @change="changSelect" v-model="sixMajor[2].value" size="mini" clearable placeholder="请选择专业" >
              <el-option
                  v-for="item in majorRank"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><div class="stu">智能财务:</div></el-col>
          <el-col :span="5" >
            <el-select @change="changSelectFinance" v-model="sixMajor[2].children[0].value" size="mini" clearable placeholder="请选择方向">
              <el-option
                  v-for="item in financeOrient"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="2" :offset="8" ><div class="stu">公司金融:</div></el-col>
          <el-col :span="5">
            <el-select  @change="changSelectFinance" v-model="sixMajor[2].children[1].value" size="mini" clearable placeholder="请选择方向">
              <el-option
                  v-for="item in financeOrient"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="major">
        <el-row>
          <el-col :span="3" ><div class="stu">人力资源管理:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelect" v-model="sixMajor[3].value" size="mini" placeholder="请选择专业" clearable>
              <el-option
                  v-for="item in majorRank"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="major">
        <el-row>
          <el-col :span="3" ><div class="stu">市场营销:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelect" v-model="sixMajor[4].value" size="mini" placeholder="请选择专业" clearable>
              <el-option
                  v-for="item in majorRank"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><div class="stu">数字营销:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelectMarket" v-model="sixMajor[4].children[0].value" size="mini" placeholder="请选择专业" clearable>
              <el-option
                  v-for="item in marketOrient"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="2" :offset="8"><div class="stu">产业营销:</div></el-col>
          <el-col :span="5" >
            <el-select @change="changSelectMarket" v-model="sixMajor[4].children[1].value" size="mini" placeholder="请选择专业" clearable>
              <el-option
                  v-for="item in marketOrient"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="major" >
        <el-row>
          <el-col :span="3" ><div class="stu">会计ACCA:</div></el-col>
          <el-col :span="5">
            <el-select @change="changSelect" v-model="sixMajor[5].value" size="mini" placeholder="请选择专业" clearable>
              <el-option
                  v-for="item in majorRank"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="bottom_button" >
        <el-col :span="24">
          <div class="grid-content info_attention" >提示: 选择志愿后，请点击保存。保存后，如有修改，需再次点击保存。</div>
        </el-col>
      <el-button size="small" @click="keep" :disabled="!this.flag">保存</el-button>
      <el-button type="danger" @click="reset" :disabled="!this.flag" size="small">重置</el-button>
      </div>
      <div class="change_password">
        <el-row>
          <el-col :span="24"><div class="grid-content title">已保存志愿</div></el-col>
          <el-table
              :data="stu_info"
              stripe
              style="font-size: 9px;padding-left: 3px;padding-top: 5px"
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
            <el-table-column v-for="(item,index) in title"
                             :index="index"
                             :key="index"
                             :prop=item.prop
                             :label=item.label
                             :width=item.width
            >
            </el-table-column>
          </el-table>
        </el-row>
        <el-col :span="24">
          <div class="grid-content info_attention" >提示:保存志愿后，务必点击提交。未提交志愿的默认服从学院分配。已提交志愿后，不能修改!
          </div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content content" style="text-align: center" >
            <el-button  size="mini" @click="submit">提交</el-button>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content2 content" ></div>
        </el-col>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "StudentWish",
  data() {
    return {
      stu_info:[],
      flag: true,
      username: '',
      personData: {
        grade: '99.2990342477777',
        bonus: '0.5',
        total: '99.7990342488999',
        rank: '1',
      },
      title:[
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
      major: {
        a: '',
        b:'',
        c: '',
        d: '',
        e: '',
        f:'',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        o: '',
      },
      wishTitle: ['专业','方向','班级'],
      sixMajor:[
        {
          value: '', //会计学排名
          label: '会计学',
          children: [
            {
              value: '', //大数据会计
              label: '大数据会计',
              children: [
                {
                  label: '大数据会计1',
                  value: ''
                },
                {
                  label: '大数据会计2',
                  value: ''
                }
              ]
            },
            {
              label: '管理会计',
              value: ''//管理会计
            }
          ]
        },
        {
          label: '工商管理',
          value: '',//工商管理排名
        },
        {
          label: '财务管理',
          value: '',// 财务管理排名
          children: [
            {
              label: '智能财务',
              value: '', //智能商务排名
            },
            {
              label: '公司金融',
              value: '', //公司金融排名
            }
          ]
        },
        {
          label: '人力资源管理',
          value: '',//人力资源管理排名
        },
        {
          label: '市场营销',
          value: '', //市场营销排名
          children: [
            {
              label: '数字营销',
              value: '',  //数字营销排名
            },
            {
              label: '产业营销',
              value: '',  //产业营销排名
            }
          ]
        },
        {
          label: '会计ACCA',
          value: '',  //会计acca排名
        },
      ] ,
      count_class: [
        {
          value: '1',
          label: '第一志愿班级',
          disabled: false
        },
        {
          value: '2',
          label: '第二志愿班级',
          disabled: false
        },
      ],
      countOrient: [
        {
          value: '1',
          label: '会计学第一方向',
          disabled: false
        },
        {
          value: '2',
          label: '会计学第二方向',
          disabled: false
        },
      ],
      financeOrient: [
        {
          value: '1',
          label: '财务管理第一方向',
          disabled: false
        },
        {
          value: '2',
          label: '财务管理第二方向',
          disabled: false
        },
      ],
      marketOrient: [
        {
          value: '1',
          label: '市场营销第一方向',
          disabled: false
        },
        {
          value: '2',
          label: '市场营销第二方向',
          disabled: false
        },
      ],
      majorRank: [
        {
          value: '1',
          label: '第一志愿',
          disabled: false
        },
        {
          value: '2',
          label: '第二志愿',
          disabled: false
        },
        {
          value: '3',
          label: '第三志愿',
          disabled: false
        },
        {
          value: '4',
          label: '第四志愿',
          disabled: false
        },
        {
          value: '5',
          label: '第五志愿',
          disabled: false
        },
        {
          value: '6',
          label: '第六志愿',
          disabled: false
        },
      ],
    }
  },
  methods:{
    changSelectClass(){
      this.count_class.forEach((ele)=>{
        ele.disabled = false
        let sixMajor2 = this.sixMajor.slice()
        if(ele.value === sixMajor2[0].children[0].children[0].value){
          ele.disabled =true
        }
        if(ele.value === sixMajor2[0].children[0].children[1].value){
          ele.disabled =true
        }
      })
    },
    submit(){
      this.$confirm('提交后不能再修改，是否确认提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams()
        params.append('username',this.username)
        this.api.put('/student/submit',params)
        .then(response=>{
          this.$message.success('提交成功！')
          window.location.reload();
        }).catch(error=>{
          this.$message.error('已经提交过或不在提交时间内！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    changSelectCount(){
      this.countOrient.forEach((ele)=>{
        ele.disabled = false
        if(ele.value === this.sixMajor[0].children[0].value){
          ele.disabled =true
        }
        if(ele.value === this.sixMajor[0].children[1].value){
          ele.disabled =true
        }
      })
    },
    changSelectFinance(){
      this.financeOrient.forEach((ele)=>{
        ele.disabled = false
        if(ele.value === this.sixMajor[2].children[0].value){
          ele.disabled =true
        }
        if(ele.value === this.sixMajor[2].children[1].value){
          ele.disabled =true
        }
      })
    },
    changSelectMarket(){
      this.marketOrient.forEach((ele)=>{
        ele.disabled = false
        if(ele.value === this.sixMajor[4].children[0].value){
          ele.disabled =true
        }
        if(ele.value === this.sixMajor[4].children[1].value){
          ele.disabled =true
        }
      })
    },
    changSelect(){
      this.majorRank.forEach((ele)=>{
        ele.disabled = false
        this.sixMajor.forEach((element)=>{
          if(ele.value === element.value){
            ele.disabled = true
          }
        })
      })
    },
    reset(){
      this.sixMajor.forEach((item)=>{
        item.value = ''
        if(item.children){
          item.children.forEach((itemC)=>{
            itemC.value = ''
            if(itemC.children){
              itemC.children.forEach((itemCC)=>{
                itemCC.value = ''
              })
            }
          })
        }
      })
      this.majorRank.forEach((item)=>{
        item.disabled = false
      })
      this.count_class.forEach((item)=>{
        item.disabled = false
      })
      this.countOrient.forEach((item)=>{
        item.disabled = false
      })
      this.financeOrient.forEach((item)=>{
        item.disabled = false
      })
      this.marketOrient.forEach((item)=>{
        item.disabled = false
      })
    },
    //保存
    keep(){
      this.flag = false
      this.sixMajor.forEach((item)=>{
        if(!item.value){
          this.flag = true
        }
        if(item.children){
          item.children.forEach((itemC)=>{
            if(!itemC.value){
              this.flag = true
            }
          })
        }
      })
      if(!this.sixMajor[0].children[0].children[0].value)this.flag = true
      if(!this.sixMajor[0].children[0].children[1].value)this.flag = true
      if(this.flag){
        this.$message.error('请输入完整志愿！')
      }
      else{
        let res = []
        let sixMajor2 = this.sixMajor.slice()
        sixMajor2.sort((a,b)=>{ return parseInt(a.value) - parseInt(b.value)})
        for(let root of sixMajor2){
          if(root.children){
            let c = root.children
            c.sort((a,b)=>{ return parseInt(a.value) - parseInt(b.value)})
            if(c[0].children){
              let cc = c[0].children
              cc.sort((a,b)=>{ return parseInt(a.value) - parseInt(b.value)})
              res.push(cc[0].label)
              res.push(cc[1].label)
            }else{
              res.push(c[0].label)
            }
            if(c[1].children){
              let cc = c[1].children
              cc.sort((a,b)=>{ return parseInt(a.value) - parseInt(b.value)})
              res.push(cc[0].label)
              res.push(cc[1].label)
            }else {
              res.push(c[1].label)
            }
          }else{
            res.push(root.label)
          }
        }
        let wish = res.join(',')
        let params = new URLSearchParams()
        params.append('username',sessionStorage.getItem('username'))
        params.append('wish',wish)
        this.api.put('/student/wish',params)
        .then(response=>{
          this.$message.success('保存成功！')
          window.location.reload();
        }).catch(error=>{
          this.$message.error(error.response.data)
        })
      }
    }
  },
  created() {
    let username = sessionStorage.getItem('username')
    this.username = username
    this.api.get('/student/'+ username)
    .then(response=>{
      let info = response.data
      if(info.submit === 0){
        this.flag = true
      }else{
        this.flag = false
      }
      this.personData.grade = info.basicScore
      this.personData.bonus = info.extraScore
      this.personData.total = Math.round((info.basicScore + info.extraScore)*1000000)/ 1000000
      this.personData.rank = info.rank
      let major_ten = info.selectDepartmentName.split(',')
      let temp = []
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
      temp.submit = info.submit===0?'否':'是'
      this.stu_info.push(temp)
    }).catch(error=>{
      this.$message.error(error.response)
    })
  }
}

</script>

<style scoped>
@import "../assets/css/student.css";
</style>