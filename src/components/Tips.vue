<template>
  <mu-container style="padding: 0">
  <!-- 头部 -->
    <mu-row>
      <mu-col>
        <mu-appbar color="primary">
          <mu-button icon slot="left" @click="goback">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          该页无权访问
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
      <h1>该页面你无权访问。。。。</h1>
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
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      shift: "tips",
      ismenuvisible: false,
      bdRules: [
        { validate: (val) => !!val, message: '必须选择换班人员'},
      ],
      ddRules: [
        { validate: (val) => !!val, message: '必须选择换班日期'},
        // { validate: (val) => val != this.validateForm.swapdate, message: '换班日期不能相同'}
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
      mydutydates: [
        '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6',
        '2018-1-7', '2018-1-8', '2018-1-9', '2018-1-1'
      ],
      dutydates: [
        '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6',
        '2018-1-7', '2018-1-8', '2018-1-9', '2018-1-1'
      ],
      dutyemps:['李楠','李强','李子延','赵燕军'],
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
    submit () {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
        if(result){
          console.log("我的换班日期：", new Date(this.validateForm.myswapdate).toLocaleDateString())
          console.log("换班人员：", this.validateForm.swapemp)
          console.log(this.validateForm.swapemp,"换班日期：", new Date(this.validateForm.swapdate).toLocaleDateString())
          this.$toast.success('提交成功！')
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

#submitbutton{
  display:flex;
  justify-content: center;
  align-items: center;
}


</style>
