<template>
  <mu-container style="padding: 0">
    <!-- 头部 -->
    <mu-row>
      <mu-col>
        <mu-appbar color="primary">
          <mu-button icon slot="left" @click="goback">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          审批
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
    <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" >
      <div slot="header">换休审批</div>
      <!-- 列表 -->
      <mu-list textline="three-line" style="padding:0px;max-height: 200px">
        <template v-for="item in breakrecords" >
          <mu-list-item  v-if="item.status === '0'">
            <mu-list-item-action style="justify-content: center">
              <mu-avatar size="56" slot="left">
                <img :src="'./images/'+item.breakempid+'.png'">
              </mu-avatar>
            </mu-list-item-action>

            <mu-list-item-content >
              <mu-list-item-title>{{item.breakempname}}</mu-list-item-title>
              <mu-list-item-sub-title>
                换休日期：{{item.breakdate}}<br/>
                值班日期：
                <mu-button small round @click="showdutydates(item.dutydates)">查看</mu-button>
              </mu-list-item-sub-title>
            </mu-list-item-content>
            
            <mu-list-item-action style="justify-content: center" v-if="item.status === '0'">
              <mu-button fab small color="green" @click="approvebreak(item)">
                <mu-icon value="check"></mu-icon>
              </mu-button>
              <mu-button fab small color="red" style="margin-top: 2px; margin-bottom: 2px">
                <mu-icon value="close"></mu-icon>
              </mu-button>
            </mu-list-item-action>

            <mu-list-item-action style="justify-content: center" v-else="item.status === '1'">
                  <mu-button  small color="#f57f17" >
                    已审批
                  </mu-button>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
      <div v-if="this.breakrecords.length === 0">没有待审批的申请</div>
    </mu-expansion-panel>
    <mu-expansion-panel :expand="panel === 'panel2'" @change="toggle('panel2')">
      <div slot="header">换班审批</div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
    </mu-expansion-panel>

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
    <mu-row style="padding-top:20px; margin-left:10px;margin-right:10px;">
      <mu-button full-width round color="#e0e0e0" to="/morebreakinfo">更多审批信息</mu-button>
    </mu-row>
    
  </mu-container>

  
</template>

<script>
import { getBreakRecords, updateBreakRecords } from '@/api/api'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      shift: "approve",
      breakrecords: [],
      panel: '',
      ismenuvisible: false
    }
  },
  methods: {
    goback(){
      //回退到上一个路由
      this.$router.back()
    },
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel;
    },
    getBreakRecord(){
      this.breakrecords= []
      //获取换休申请记录
      getBreakRecords().then((resp) => {
        console.log("getBreakRecord resp:",resp.data.breakrecords)
        //获取记录，并将状态为0的放入未审批记录
        let records = resp.data.breakrecords
        for(var i = 0; i< records.length; i++){
          if(records[i].status === '0'){
            this.breakrecords.push(records[i])
          }
        }
        console.log("this.breakrecords:",this.breakrecords)
      });
    },
    showdutydates(dates){
      let dutydates = []
      for(var i=0;i<dates.length; i++){
        dutydates.push(dates[i].dutydate)
      }
      //显示值班日期
      this.$alert(dutydates.join(',').toString(), '值班日期', {
        okLabel: '了解'
      })
    },
    approvebreak(item){
      //通过换休申请，修改换休记录中的审批标志
      this.$alert('换休申请审批通过', '通过', {
        okLabel: '了解'
      }).then(()=>{
        //修改审批状态
        // item.status = '1'
        let param = {
          breakempid: item.breakempid,
          breakdate: item.breakdate
        }

        updateBreakRecords(param).then((resp)=>{
          console.log("resp;",resp)
          if(resp.status === 200){
            this.getBreakRecord()
            this.$alert('成功！', '提示', {
              okLabel: '了解'
            })
          }
        });
        console.log("item",{item})
        //发送短信


      });
    }
  },
  mounted(){
    this.getBreakRecord()
  },
  created () {
    this.$progress.start();
    this.$progress.done();
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

</style>
