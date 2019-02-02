import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// muse-ui引入
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
//material-design-icons引入
import 'material-design-icons/iconfont/material-icons.css'

//加载museuiprogress插件
import 'muse-ui-progress/dist/muse-ui-progress.css'
import MuseUIProgress  from 'muse-ui-progress'

//muse-ui-toast插件
import Toast from 'muse-ui-toast';

//muse-ui-message插件
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';

//muse-ui-loading插件
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';




//Mockjs
import Mock from './mock'

Mock.bootstrap();

//muse-ui-message
Vue.use(Message);

//修改museuiprogress初始配置
let config={
	zIndex: 2000,          // progress z-index
	top: 56,                // position fixed top
	speed: 300,            // progress speed
	color: 'orange900',      // color
	size: 2,               // progress size
	className: ''          // progress custom class
}
MuseUIProgress.config(config)
Vue.use(MuseUIProgress )


//启用muser-ui
Vue.use(MuseUI)


let toast_config = {
  position: 'top',               // position
  time: 2000,                       // show time length
  closeIcon: 'close',               // close icon
  close: true,                      // show close button
  successIcon: 'check_circle',      // success icon
  infoIcon: 'info',                 // info icon
  warningIcon: 'priority_high',     // warning icon
  errorIcon: 'warning'              // error icon
};

// muse-ui-toast
Vue.use(Toast, toast_config);


//muse-ui-loading
Vue.use(Loading);


Vue.config.productionTip = false


//创建全局vue实例
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    this.$progress.start();
    this.$progress.done();
  }
}).$mount('#app')
