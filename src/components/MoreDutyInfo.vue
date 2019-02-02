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
      更多值班信息
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
          <mu-list>
            <template v-for="item in dutyschedule" >
              <mu-list-item >
                <mu-list-item-action>
                  <mu-avatar>
                    <img :src="'./images/'+item.dutyempid+'.png'">
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>{{item.dutyemp}}</mu-list-item-title>
                <mu-list-item-action style="width: 130px ">
                  {{item.dutydate}}
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
import { getDutySchedule } from '@/api/api'

export default {
  name: 'MoreDutyInfo',
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
      dutyschedule: [],
      contentloading: true
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
    getdutyschedule(){
      getDutySchedule().then((resp) => {
        console.log("getdutyschedule resp:", resp)
        this.dutyschedule = resp.data.dutyschedule

        //数据加载完毕，关闭loading动画
        this.contentloading = false
      });
    }
  },
  mounted(){
    this.getdutyschedule()
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
