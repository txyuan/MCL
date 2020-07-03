// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*
  localStorage.userInfo  登录信息
  localStorage.openId   微信支付openId
*/

import Vue from 'vue'
import {post,get} from './assets/js/request.js' //ajax 请求
import mint_ui_base from '@/assets/js/mint-ui-base.js' //mint-ui组件
import emptyData from "@/components/common/emptyData.vue" //空数据组件
import payType from "@/assets/js/payType.js" //支付
import filter from "@/assets/js/filter.js" //过滤器
import {JSEncrypt} from 'jsencrypt'
import App from './App'
import router from './router' //路由
import VueBus from 'vue-bus';
import vueTouch from 'vue-plugin-touch';
import { KFCONFIG } from '@/configURL.js'

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;

//注册组件
Vue.component(emptyData.name, emptyData)
Vue.use(VueBus);
Vue.use(vueTouch);

//支付方式
Vue.prototype.$pay = payType;

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
	el: '#app',
	data: {
		scrollTop: 0,
		longLat: "", //app传过来的经纬度
		productTimer: [], //product 商品组件的倒计时
		//客服的配置
	    ...KFCONFIG,
		token: ""
	},
	methods: {
		windowScrollTop: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
			var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if (isIOS) {
				//这个是ios操作系统
				window.scrollTo(0, this.scrollTop)
			}
		},
		windowRecordScroll: function() {
			var top = document.documentElement.scrollTop || document.body.scrollTop;
			this.scrollTop = top;
		},
		$getCode: function(password) {
			let encrypt = new JSEncrypt()
			encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCa4KHNwDX44gGmmIAtRu4gjVYt\n' +
				'GWZzcm4t+1wjUD4dn7fMLPvuK7ai4UrfDeEJE1RPwudJw+lJ6crql8wSIg7/DbTl\n' +
				'            G3ihsCT6dT9H5B9OoeR7K9VWUesaW/iyVL6HXiYOANabW14pvJATDmdq91Tfgp6P\n' +
				'            SQyvdfiRdV4r07crpQIDAQAB')
			let data = encrypt.encrypt(password)
			return data
		},
		getjmw: function(phones) {
			let dates = new Date();
			let gethose = dates.getHours();
			if (gethose < 10) {
				gethose = '0' + gethose
			}
			let getmin = dates.getMinutes();
			if (getmin < 10) {
				getmin = '0' + getmin
			}
			let jmnum = String(gethose) + String(getmin) + phones;
			return jmnum;
		},
		//清除商品的所有倒计时
		clearAllProductTimer() {
			this.productTimer.forEach((timer) => {
				clearInterval(timer)
			})
			this.productTimer = [];
		},
		//判断平台是否是微信
		isWeiXin() {
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		}
	},
	router,
	components: {
		App
	},
	template: '<App/>',
	mounted() {
		payType.getOpendId(); //获取openid
	}
})


//app传过来的经纬度
window.showLoc = function(aa) {
	vm.longLat = aa;
}
