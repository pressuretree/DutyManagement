<template>
  <mu-container style="padding: 0">
    <!-- 头部 -->
    <mu-row>
      <mu-col>
        <mu-appbar color="primary">
          <mu-button icon slot="left" @click="goback">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          换班
          <!-- 头部菜单 -->
          <mu-menu cover placement="bottom-end" :open.sync="ismenuvisible" slot="right">
              <mu-button icon>
                <mu-icon value="menu"></mu-icon>
              </mu-button>
              <mu-list slot="content">
                <mu-list-item 
                      button
                      to="/break">
                      <mu-list-item-title>换休</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item 
                      button
                      to="/swap">
                      <mu-list-item-title>换班</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item 
                      button
                      to="/moredutyinfo">
                      <mu-list-item-title>更多值班信息</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item 
                      button
                      to="/statistics">
                      <mu-list-item-title>值班统计</mu-list-item-title>
                    </mu-list-item>
              </mu-list>
          </mu-menu>
        </mu-appbar>
      </mu-col>
    </mu-row>

    <!-- 内容 -->
    <mu-row style="padding-top: 10px">
      <!-- <mu-col :span="12" style="text-align: left;padding-left: 10px;">
        换休状态：
        <mu-badge content="可换休" :color="swapable?'green':'gray'"></mu-badge>
      </mu-col> -->
      <mu-col :span="12" v-show="swapable" style="text-align: left;padding: 0px 10px;">
          <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-position="top">
            <mu-form-item label="选择我的换班日期" prop="myswapdate" :rules="myddRules" >
              <mu-select v-model="validateForm.myswapdate" @change="changed" action-icon="today">
                <mu-option v-for="date,index in mydutydates" :key="date.dutydate" :label="''+date.dutydate+'('+dayOfWeek(date.dutydate)+')'" :value="date"></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item label="选择换班人员" prop="swapemp" :rules="bdRules">
              <mu-select v-model="validateForm.swapemp" full-width @change="swapempchange">
                <mu-option v-for="emp in dutyemps" :key="emp.id" :label="''+emp.name" :value="emp"></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item :label="'选择'+ validateForm.swapemp.name +'的换班日期'" prop="swapdate" :rules="ddRules" v-if='validateForm.swapemp != "" && validateForm.swapemp != undefined'>
              <mu-select v-model="validateForm.swapdate"  action-icon="today">
                <mu-option v-for="date,index in dutydates" :key="date.dutydate" :label="''+date.dutydate+'('+dayOfWeek(date.dutydate)+')'" :value="date"></mu-option>
              </mu-select>
            </mu-form-item>
            
            <mu-form-item style="text-align: center" id="submitbutton">
              <mu-button color="primary" @click="submit">提交换班申请</mu-button>
              <mu-button @click="clear">重置</mu-button>
            </mu-form-item>
          </mu-form>
      </mu-col>
    </mu-row>

    <!-- 底部 -->
    <mu-row style="position: fixed; bottom: 0px;width: 100%" >
      <mu-col :span="12">
        <mu-bottom-nav :value.sync="shift" shift>
          <mu-bottom-nav-item value="movies" title="值班" icon="hourglass_full" to="/">asdfasd</mu-bottom-nav-item>
          <mu-bottom-nav-item value="break" title="换休" icon="free_breakfast" to="/break"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="swap" title="换班" icon="cached" to="/swap"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="statistics" title="统计" icon="visibility" to="/statistics"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="approve" title="审批" icon="done" to="/approve"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="schedule" title="排班" icon="date_range" to="/schedule"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-col>
    </mu-row>
    
  </mu-container>

  
</template>

<script>
import { getDutySchedulebyEmpid, getAllUserInfo, addSwapRecords } from '@/api/api'


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      shift: "swap",
      ismenuvisible: false,
      bdRules: [
        { validate: (val) => !!val, message: '必须选择换班人员'},
      ],
      ddRules: [
        { validate: (val) => this.isSameType(val), message: '只能交换相同类型的值班（普通/节假日）'},
        { validate: (val) => !!val, message: '必须选择换班日期'},
      ],
      myddRules: [
        { validate: (val) => !!val, message: '必须选择换班日期'}
      ],
      validateForm: {
        myswapdate: '',
        swapemp: '',
        swapdate: ''
      },
      breakdate: '',
      mydutydates: [],
      dutydates: [],
      dutyemps:[],
      swapable: true
    }
  },
  created () {
    // console.log("this.$progress:",this.$progress)
    this.$progress.start();
    this.$progress.done();
  },
  methods: {
    goback(){
      //回退到上一个路由
      this.$router.back()
    },
    isSameType(val){
      //判断换班日期是不是同一类型（普通/节假日）
      console.log("val:",val.isWeekend)
      if(val.isWeekend === '' && val.isHoliday === '' ){
        console.log("0-0")
        if(this.validateForm.myswapdate.isWeekend === '1' | this.validateForm.myswapdate.isHoliday === '1'){
          return false
        }
      }
      if(val.isWeekend === '1' | val.isHoliday === '1' ){
        console.log("0-1")
        if(this.validateForm.myswapdate.isWeekend === '0' && this.validateForm.myswapdate.isHoliday === '0'){
          return false
        }
      }
      
      console.log("我的换班日期：",this.validateForm.myswapdate,"对方日期：",val)
      return true
    },
    getDutySchedule(id){
      let params={
        empid: id
      }

      getDutySchedulebyEmpid(params).then((resp)=>{
        console.log(this.$store.state.loginuser.id+" 的排班记录")
        console.table(resp.data.dutyschedulebyid)
        this.mydutydates = resp.data.dutyschedulebyid
      });
    },
    getUsers(){
      getAllUserInfo().then((resp)=>{
        this.dutyemps = resp.data.users
      });
    },
    swapempchange(value){
      console.log("换班人员:"+ value)
      let params={
        empid: value.id
      }

      getDutySchedulebyEmpid(params).then((resp)=>{
        console.log(this.$store.state.loginuser.id+" 的排班记录")
        console.table(resp.data.dutyschedulebyid)
        this.dutydates = resp.data.dutyschedulebyid
      });
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
        if(result){
        //   console.log("我的换班日期：", new Date(this.validateForm.myswapdate).toLocaleDateString())
        //   console.log("换班人员：", this.validateForm.swapemp)
        //   console.log(this.validateForm.swapemp,"换班日期：", new Date(this.validateForm.swapdate).toLocaleDateString())
        //   this.$toast.success('提交成功！')
        //   this.$router.push('/success')
        //   return 

          let param = {
                  dutyempid: this.$store.state.loginuser.id, 
                  dutyempname: this.$store.state.loginuser.name,
                  dutydate: this.validateForm.myswapdate.dutydate, 
                  swapempid:this.validateForm.swapemp.id, 
                  swapempname:this.validateForm.swapemp.name, 
                  swapdate:this.validateForm.swapdate.dutydate, 
                  status: '0'
              }
          console.log("params:", param)
          //添加换班记录
          addSwapRecords(param).then((resp) =>{
            if(resp.status === 200){
              //提示框
              this.$alert('提交成功！', '换班申请', {
                okLabel: '了解'
              })
              //跳转成功页面
              this.$router.push('/success')
            }
          });
        }else{
          this.$toast.error('提交失败，请选择正确的数据！')
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        breakdate: '',
        dutydates: []
      };
    },
    changed(value){
      console.log("value:", value)
    },
    dayOfWeek(value){
      let dayofweek = ''
      let day = new Date(value).getDay()
      switch(day){
        case 0: 
          dayofweek = '周日';
          break;
        case 1: 
          dayofweek = '周一';
          break;
        case 2: 
          dayofweek = '周二';
          break;
        case 3: 
          dayofweek = '周三';
          break;
        case 4: 
          dayofweek = '周四';
          break;
        case 5: 
          dayofweek = '周五';
          break;
        default:
          dayofweek = '周六'
      }
      return dayofweek
    }
  },
  mounted(){
    this.getDutySchedule(this.$store.state.loginuser.id)
    this.getUsers()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#submitbutton{
  display:flex;
  justify-content: center;
  align-items: center;
}


</style>
