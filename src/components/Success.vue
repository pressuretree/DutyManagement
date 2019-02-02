<template>
	<mu-container style="padding: 0">
		<!-- 头部 -->
	    <mu-row>
	      <mu-col>
	        <mu-appbar color="primary">
	          <mu-button icon slot="left" @click="goback">
	            <mu-icon value="arrow_back"></mu-icon>
	          </mu-button>
	          提交成功
	          <mu-button icon slot="right" >
	          	<!-- 纯粹为了布局 -->
	          </mu-button>
	        </mu-appbar>
	      </mu-col>
	    </mu-row>

		<mu-icon value="check_circle" size="200" color="green"></mu-icon>

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
	data(){
		return {
			shift: 'sucess'
		}
	},
	methods: {
		goback(){
	      //回退到上一个路由
	      this.$router.back()
	    }
	}	
}
	
</script>



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