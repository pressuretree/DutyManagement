<template>
  <mu-container 
    data-mu-loading-color="secondary" 
    data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" 
    v-loading="loading" 
    style="padding: 0">
    <!-- 头部 -->
    <mu-row>
      <mu-col>
        <mu-appbar color="primary">

          <!-- <mu-button  @click="goback"> -->
            <mu-avatar :size="40" slot="left" style="margin-left: 10px">
              <img :src="'./images/'+this.$store.state.loginuser.id+'.png'">
            </mu-avatar>
          <!-- </mu-button> -->
          

          值班信息
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
    <mu-row>

        <!-- 当前登录 -->
        <mu-list style="margin-top: 10px;text-align: left;padding-left: 16px">
          当前登录：<font color="#8e24aa" size="4">{{this.$store.state.loginuser.name}}</font>
        </mu-list>

        <!-- 值班经理 -->
        <mu-list textline="two-line">
          <mu-sub-header style="text-align: left;">值班经理</mu-sub-header>
          <mu-list-item
          button
          ripple 
          avatar
          @change="openBotttomSheet"
          >
            <mu-list-item-action avatar>
              <mu-avatar :size="60">
                <img :src="'./images/'+this.dutymanagerid+'.png'">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content style="margin-left: 20px">
              <mu-list-item-title>{{dutymanager}}</mu-list-item-title>
              <mu-list-item-sub-title>{{currentdate}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <!-- <mu-icon value="chat_bubble"></mu-icon> -->
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>

        <mu-divider></mu-divider>

        <!-- 今日值班  -->
        <mu-list textline="two-line">
          <mu-sub-header style="text-align: left;font-weight:bold">今日值班人员</mu-sub-header>
          <mu-list-item 
            button
            ripple
            avatar>
            <mu-list-item-action avatar>
              <!-- <mu-list-item-sub-title > -->
                <!-- <mu-badge :content="swapable?'可换休':'不可换休'"  :color="swapable?'success':'gray'" class="demo-badge-content"> -->
                  <mu-avatar :size="60">
                    <img :src="'./images/'+this.dutyempid+'.png'">
                  </mu-avatar>
                <!-- </mu-badge> -->
              <!-- </mu-list-item-sub-title> -->
              
            </mu-list-item-action>
            <mu-list-item-content style="margin-left: 20px">
              <mu-list-item-title>{{dutyemp}}</mu-list-item-title>
              <mu-list-item-sub-title>{{currentdate}}</mu-list-item-sub-title>
              <mu-list-item-sub-title v-if="swapable && dutyemp === this.$store.state.loginuser.name">
                <mu-badge content="可换休" color="success"></mu-badge>
              </mu-list-item-sub-title>
              <!-- <mu-list-item-sub-title v-if="!swapable"> -->
                <!-- <mu-badge content="可换休"></mu-badge> -->
              <!-- </mu-list-item-sub-title> -->
            </mu-list-item-content>

            <!-- 列表右侧菜单 -->
            <mu-list-item-action v-if="dutyemp === this.$store.state.loginuser.name?true:false">
              <mu-menu cover placement="bottom-end" :open.sync="open" slot="right">
                  <mu-button icon>
                    <mu-icon value="more_vert"></mu-icon>
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
                    <mu-list-item 
                      button
                      @click="approvDuty">
                      <mu-list-item-title>确认值班</mu-list-item-title>
                    </mu-list-item>
                    
                  </mu-list>
              </mu-menu>
            </mu-list-item-action>
          </mu-list-item>       
        </mu-list>

        <mu-dialog title="值班已确认" width="360" :open.sync="dutydialog">
          将向值班人和领导发送短信
          <mu-button slot="actions" flat color="primary" @click="closeDutyDialog">确认</mu-button>
        </mu-dialog>

        <mu-divider></mu-divider>

        <!-- 明日值班 -->
        <mu-list textline="two-line">
          <mu-sub-header style="text-align: left;">明日值班人员</mu-sub-header>
          <mu-list-item 
            button
            ripple
            avatar>
            <mu-list-item-action avatar>
              <mu-avatar :size="60">
                <img :src="'./images/'+this.dutyempnextid+'.png'">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content style="margin-left: 20px">
              <mu-list-item-title>{{dutyempnext}}</mu-list-item-title>
              <mu-list-item-sub-title>{{nextday}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <!-- <mu-icon value="chat_bubble"></mu-icon> -->
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>

        <mu-divider></mu-divider>

        <mu-list style="margin-top: 10px">
          <mu-button round color="success" to="/moredutyinfo" textColor="#fff">
            更多值班信息
            <mu-icon right value="send"></mu-icon>
          </mu-button>
        </mu-list>
  </mu-row>

    <!-- 底部 -->
    <mu-row style="position: fixed; bottom: 0px;width: 100%" >
      <mu-col :span="12">
        <mu-bottom-nav :value.sync="shift" shift active-class="#fff">
          <mu-bottom-nav-item value="duty" title="值班" icon="hourglass_full" to="/"></mu-bottom-nav-item>
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
import { addDutyRecords, getDutyRecord, getDutyDates, 
         getLoginUser, getDutySchedule, getUserInfo } from '@/api/api'

export default {
  name: 'Duty',
  props: {
    msg: String
  },
  data(){
    return {
      shift: "duty",     //当前模块
      loading: true,
      swapable: false,    //是否可以换休标志
      open: false,
      isbottomvisible: false,   //底部菜单显示控制
      ismenuvisible: false,    //头部菜单显示控制
      dutydialog: false,
      isapproved: false,
      dutymanager: '' ,      //值班经理
      dutymanagerid: '',
      dutyemp: '',        //当日值班人员
      dutyempid: '',
      dutyempnext: '',   //明日值班人员
      dutyempnextid: '',
      currentdate: new Date().toLocaleDateString(),   //当前日期
      nextday: new Date((new Date()).getTime() + 24*60*60*1000).toLocaleDateString(),   //明日日期

    }
  },
  created () {
    this.$progress.start();
    this.$progress.done();
  },
  methods: {
    closeBottomSheet () {
      this.open = false;
    },
    openBotttomSheet (value) {
      console.log("value:",value)
      this.open = true;
    },
    approvDuty(){

      let params1 = {
          dutyempid: this.$store.state.loginuser.id,
          dutydate: new Date().toLocaleDateString()
      }
      //获取值班信息
      getDutyRecord(params1).then((resp) => {
        if(resp.data.result.length > 0){
          this.isapproved = true
        }
      }).then(()=> {

          if(!this.isapproved){
              //添加值班信息
              let params = {
                  dutyempid: this.$store.state.loginuser.id,
                  dutyempname: this.$store.state.loginuser.name,
                  dutydate: new Date().toLocaleDateString(),
                  dutystatus: '1',   // 0:未确认   1：已确认
                  breakstatus: '0',  // 0：已换休   1：未换休
              }

              let that = this
              addDutyRecords(params).then((resp) => {
                  console.log("addDutyRecords resp:", resp)

                  this.$alert('将向值班人和领导发送短信', '值班已确认', {
                    okLabel: '确认'
                  }).then(() => {
                      if(resp.status === 200){
                        that.$toast.success(resp.data.msg)
                      }
                  });
              });
          }else{
            this.$alert('请勿重复确认值班！', '提示', {
              okLabel: '确认'
            })
          }
      });
      //发送短信


    },
    closeDutyDialog(){
      this.dutydialog = false
    },
    getDutyDates(){
      let param = {
        dutyempid: this.$store.state.loginuser.id,
        breakstatus: '0'
      }
      console.log("param:",param)
      //获取值班但未换休日期

      getDutyDates(param).then((resp) => {
        console.log("值班但未换休日期记录：", resp.data.dutydates)
        let dutydates = resp.data.dutydates
        if(dutydates.length>=3){
          this.swapable = true
        }
      });

    },
    getLoginUserInfo(){
      
    },
    getDutyInfo(){
      getDutySchedule().then((resp) => {
        console.table(resp.data.dutyschedule)
        console.log("获取值班信息。。。")
        let schedule = resp.data.dutyschedule
        for( var p in schedule){
          let date = new Date(schedule[p].dutydate).toLocaleDateString()
          if(date === this.currentdate){
            this.dutymanager = schedule[p].dutymanager
            this.dutymanagerid = schedule[p].dutymanagerid
            this.dutyemp = schedule[p].dutyemp
            this.dutyempid = schedule[p].dutyempid
          }
           if(date === this.nextday){
            this.dutyempnext = schedule[p].dutyemp
            this.dutyempnextid = schedule[p].dutyempid
          }
        }

        console.log("dutymanager:",this.dutymanager,"dutyemp:",this.dutyemp,"dutyempnext:",this.dutyempnext)

        //获取相关信息
        this.getIds()

        

      });
    },
    getIds(){
      //获取今日值班人员信息
      let param = {
        empname: this.dutyemp
      }
      getUserInfo(param).then((resp) => {
        this.dutyempid = resp.data.userinfo.id
        console.log("resp.data.userinfo.id",resp)
        //数据加载完毕，加载动画消失
        this.loading = false 
      });

      //获取值班经理信息
      let param1 = {
        empname: this.dutymanager
      }
      getUserInfo(param1).then((resp) => {
        this.dutymanagerid = resp.data.userinfo.id
        console.log("this.dutymanagerid",resp.data.userinfo.id)
      }); 

      //获取明日值班人员信息
      let param2 = {
        empname: this.dutyempnext
      }
      getUserInfo(param2).then((resp) => {
        this.dutyempnextid = resp.data.userinfo.id
        console.log("this.dutyempnextid",resp.data.userinfo.id)
      }); 
    }
  },
  mounted(){

    console.log("mounted----------------")
     //获取登录用户信息
     let role = this.$store.state.loginuser.role;
      console.log("this.$store.state.loginuser.role:", this.$store.state.loginuser.role)
      if (role === undefined || role === '') {
        //获取登录用户信息
        console.log("获取登录用户信息")
        let that = this
        getLoginUser().then((resp) => {
          //模拟登陆
          that.$store.commit('addRoles', {
                loginuser: resp.data.loginuser
              });
          console.log("getLoginUser resp: ", resp)

          //获取值班未换休日期
          that.getDutyDates()

        });
      }else{
        //获取值班未换休日期
          this.getDutyDates()
      }

      //获取排班信息
      this.getDutyInfo()
    
      
      this.$progress.done();

      



    
  },
  watch: {
    open: function(val, oldval){
      console.log("val:",val," oldval: ", oldval)
    }
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

.demo-badge-content {
  padding: 12px 0px;
  margin-left: 0px;
  margin-right: 16px;
  margin-top: 14px;

}
</style>
