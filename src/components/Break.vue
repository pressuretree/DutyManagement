<template>
  <mu-container style="padding: 0">
    <!-- 头部 -->
    <mu-row>
      <mu-col>
        <mu-appbar color="primary">
          <mu-button icon slot="left" @click="goback">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          换休
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
      <mu-col :span="12" style="text-align: left;padding-left: 10px;">
        换休状态：
        <mu-badge :content="swapable?'可换休':'不可换休'" :color="swapable?'green':'gray'"></mu-badge>
      </mu-col>
      <mu-col :span="12" v-show="swapable" style="text-align: left;padding: 0px 10px;">
          <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-position="top">
            <mu-form-item label="选择换休日期" prop="breakdate" :rules="bdRules">
              <mu-date-input v-model="validateForm.breakdate"  type="date" @change="changed"></mu-date-input>
            </mu-form-item>
            <mu-form-item label="选择已值班日期" prop="dutydates" :rules="ddRules" >
              <mu-select  multiple chips v-model="validateForm.dutydates" @change="changed" action-icon="today">
                <mu-option v-for="city,index in dutydates" :key="city.dutydate" :label="''+city.dutydate+'('+ dayOfWeek(city.dutydate)+ ')'" :value="city"></mu-option>
              </mu-select>
            </mu-form-item>
            
            <mu-form-item style="text-align: center" id="submitbutton">
              <mu-button color="primary" @click="submit">提交换休申请</mu-button>
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
import { addBreakRecords, getDutyDates} from '@/api/api';

export default {
  name: 'Break',
  props: {
    msg: String
  },
  data(){
    return {
      shift: "break",
      ismenuvisible: false,
      bdRules: [
        { validate: (val) => !!val, message: '必须选择日期'},
        { validate: (val) => val > new Date(), message: '换休日期不能早于当前日期'}
      ],
      ddRules: [
        { validate: (val) => !!val, message: '必须选择日期'},
        { validate: (val) => this.validateDutyDate(val), message: '请选择3个普通值班或1个节假日值班'}
      ],
      validateForm: {
        breakdate: '',
        dutydates: []
      },
      breakdate: '',
      dutydates: [
        '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6',
        '2018-1-7', '2018-1-8', '2018-1-9', '2018-1-1'
      ],
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
    },
    validateDutyDate(val){
      //校验
      if(val.length===3){
        let flag = false
        for(var i=0;i<val.length; i++){
          if(val[i].isWeekend === '1' || val[i].isHoliday === '1'){
            flag = true
          }
        }
        if(flag){
          return false
        }else{
          // this.$toast.error('提交失败，请选择3个普通值班或1个节假日值班！')
          return true
        }
      }else if(val.length === 1){
        if(val[0].isWeekend === '1' || val[0].isHoliday === '1'){
          return true
        }else{
          return false
        }
      }else {
        return false
      }

      console.log("val:",val)
      
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
        if(result){
          //换休人id
          //换休人name
          //换休日期
          //对应值班日期
          //提交日期
          //申请状态   0：未审批  1：通过  2：驳回
          // id: '111111',
          // name: '李强',
          // role: 'emp',
          // rolename: '员工',
          // gender: 'm'
          let params = {
              breakempid: this.$store.state.loginuser.id,
              breakempname: this.$store.state.loginuser.name,
              breakdate:  this.validateForm.breakdate.toLocaleDateString(),
              dutydates:  this.validateForm.dutydates,
              submitdate: new Date().toLocaleDateString(),
              status: '0'
          }
          console.log("换休日期：", this.validateForm.breakdate.toLocaleDateString())
          console.log("对应值班：", this.validateForm.dutydates)
          console.log("换休申请：", params)

          //提交换休记录
          let that = this
          addBreakRecords(params).then((resp) => {
            console.log("addBreakRecords resp:", resp)
            if(resp.status === 200){
              that.$toast.success(resp.data.msg)
              that.$router.push("/success")
            }
          });

          return 
        }
        this.$toast.error('提交失败，请选择正确的数据！')
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
    getDutyDates(){
      let param = {
        dutyempid: this.$store.state.loginuser.id,
        breakstatus: '0'     
      }
      //获取值班但未换休日期
      getDutyDates(param).then((resp) => {
        console.log("值班但未换休日期记录：", resp.data.dutydates)
        this.dutydates = resp.data.dutydates
        if(this.dutydates.length<3){
          let flag = false
          for(var i=0;i<this.dutydates.length; i++){
            if(this.dutydates[i].isWeekend === '1' || this.dutydates[i].isHoliday === '1'){
              flag = true
            }
          }
          if(flag){
            this.swapable = true
          }else{
            this.swapable = false
          }
        }
      });

    }
  },
  mounted(){
    
    this.getDutyDates()
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
