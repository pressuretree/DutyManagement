<template>
  <mu-container 
    data-mu-loading-color="secondary" 
    data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" 
    v-loading="contentloading"
    style="padding: 0" >
    <!-- 头部 -->

    <mu-appbar color="primary" style="position:fixed; top:0px; width:100%">
      <mu-button icon slot="left" @click="goback">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      更多换休信息
      <mu-button icon slot="right" >
        <!-- 纯粹为了布局 -->
      </mu-button>
    </mu-appbar>
    <!-- <mu-row style="display:fixed; top: 0px;">
      <mu-col>
        
      </mu-col>
    </mu-row> -->

    <!-- 数据 -->
    <mu-row style="width:100%;margin-bottom:56px;margin-top:56px;display: flex">
      <!-- <mu-paper :z-depth="1"> -->
        <mu-load-more 
            @refresh="refresh" 
            :refreshing="refreshing" 
            :loading="loading" 
            @load="load"
            :loaded-all="isloadedall"
            style="width: 100%; display:flex; flex-direction: column"
            >
          <!-- 列表 -->
          <mu-list textline="three-line" style="padding:0px">
            <template v-for="item in breakrecords" >
              <mu-list-item  >
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
          <mu-list>
            <mu-list-item v-if="isloadedall">
              <mu-list-item-title style="color: gray;font-size: 12px; text-align: center">我是有底线的</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-load-more>
      <!-- </mu-paper> -->
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
import { getBreakRecords, updateBreakRecords} from '@/api/api'

export default {
  name: 'MoreBreakInfo',
  props: {
    msg: String
  },
  data(){
    return {
      shift: "",
      num: 10,
      refreshing: false,
      loading: false,
      text: 'List',
      isloadedall: false,
      contentloading: true,
      breakrecords: []
    }
  },
  methods:{
    goback(){
      //回退到上一个路由
      this.$router.back()
    },
    refresh () {
      this.refreshing = true;
      // this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
      }, 2000)
    },
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
        if(this.num === 20)
          this.isloadedall = true
      }, 1000)
    },
    getBreakRecord(){
      //获取换休申请记录
      getBreakRecords().then((resp) => {
        console.log("getBreakRecord resp:",JSON.stringify(resp.data.breakrecords))
        this.breakrecords = resp.data.breakrecords

        //数据加载完毕，关闭loading动画
        this.contentloading = false
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
