// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*
  localStorage.userInfo  登录信息
  localStorage.openId   微信支付openId
*/

import Vue from 'vue'
import { post, get } from './assets/js/request.js'  //ajax 请求
import mint_ui_base from '@/assets/js/mint-ui-base.js'   //mint-ui组件
import emptyData from "@/components/common/emptyData.vue"  //空数据组件
import payType from "@/assets/js/payType.js"  //支付
import filter from "@/assets/js/filter.js" //过滤器
import { JSEncrypt } from 'jsencrypt'
import App from './App'
import router from './router'   //路由
import VueBus from 'vue-bus';
import store from './store'   //路由

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;

//注册组件
Vue.component(emptyData.name,emptyData)
Vue.use(VueBus);

import 'vant/lib/index.css'
import { Tab, Tabs,Icon,DatetimePicker,Picker,Cell, CellGroup,Loading,Tabbar, TabbarItem } from 'vant'
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Picker)
Vue.use(DatetimePicker)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Loading)
Vue.use(Tabbar)
Vue.use(TabbarItem)

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//支付方式
Vue.prototype.$pay = payType;

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  data:{
    scrollTop: 0,
    longLat:"",  //app传过来的经纬度
    productTimer:[],  //product 商品组件的倒计时
  },
  methods:{
    windowScrollTop:function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {
        //这个是ios操作系统
        window.scrollTo(0,this.scrollTop)
      }
    },
    windowRecordScroll:function () {
      var top = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = top;
    },
    $getCode:function(password){
      let encrypt = new JSEncrypt()
      encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCa4KHNwDX44gGmmIAtRu4gjVYt\n' +
        'GWZzcm4t+1wjUD4dn7fMLPvuK7ai4UrfDeEJE1RPwudJw+lJ6crql8wSIg7/DbTl\n' +
        '            G3ihsCT6dT9H5B9OoeR7K9VWUesaW/iyVL6HXiYOANabW14pvJATDmdq91Tfgp6P\n' +
        '            SQyvdfiRdV4r07crpQIDAQAB')
      let data=encrypt.encrypt(password)
      return data
    },
    getjmw:function(phones){
      let dates=new Date();
      let gethose=dates.getHours();
      if(gethose<10){
        gethose='0'+gethose
      }
      let getmin=dates.getMinutes();
      if(getmin<10){
        getmin='0'+getmin
      }
      let jmnum=String(gethose)+String(getmin)+phones;
      return jmnum;
    },
    //清除商品的所有倒计时
    clearAllProductTimer(){
    	this.productTimer.forEach((timer)=>{
    		clearInterval(timer)
    	})
    	this.productTimer = [];
    },
    //获取用户的角色
    //用户角色（1：患者；2：患者家人；3：路人；4：医生；5：地区渠道商；6：推广员工；7：发货员工；8：渠道经理）
    getUserType(state){
    	let val = String(state);
    	let text = "";
    	switch (val){
    		case "1":
    		  text = "患者";
    			break;
    		case "2":
    		  text = "患者家人";
    			break;
    		case "3":
    		  text = "路人";
    			break;
    		case "4":
    		  text = "医生";
    			break;
    		case "5":
    		  text = "地区渠道商";
    			break;
    		case "6":
    		  text = "渠道员工";
    			break;
    		case "7":
    		  text = "发货员工";
    			break;
    		case "8":
    		  text = "渠道经理";
    			break;	
    	}
    	return text;
    }
  },
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    payType.getOpendId();  //获取openid

    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
		// 调用router.push并不会触发onhashchange事件，但是调用router.go()却能正常触发，
		window.addEventListener(
			'hashchange',
			() => {
			const currentPath = window.location.hash.slice(1)
			if (this.$route.fullPath !== currentPath) {
				this.$router.push(currentPath)
			}
			},
			false
		)
  }
})


//app传过来的经纬度
window.showLoc = function(aa){
    vm.longLat = aa;
}
