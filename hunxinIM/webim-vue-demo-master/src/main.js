/****
患者端和医生端使用本系统
1. 患者端：不显示，好友列表，直接进入聊天窗口。不显示聊天窗口的header。（http://localhost:8081/login?username=18622247200&logoSinge=1）
2. 医生端：显示好友列表。显示聊天窗口的header（http://localhost:8081/login?username=15310323518）

后台管理系统客服使用本系统的聊天窗口页面（示例地址：http://localhost:8081/login?username=15310323518&groupId=143919303163907）
不显示好友列表，直接进入，聊天窗口页面。不显示聊天窗口的header的返回按钮
*****/ 


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import vant from 'vant';
import WebIM from './utils/WebIM';
import store from './store';
import {getUserInfo} from './api/app.js';
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import Router from 'vue-router'

Vue.config.productionTip = false
// Vue.use(Antd)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// Vue.use(ElementUI).use(vant)
Vue.config.productionTip = false


/* eslint-disable no-new */
window.Vue = new Vue({
    el: '#app',
    data:{
    	//客服的配置
    	// org_name: "1105200109113529",
			// app_name: "ceshi",
			// client_id: "YXA6aWBnAYIBQEaqBPD9Zm3Q0Q",
			// client_secret: "YXA6ps2p92dCu2dv9yY1DrITmmI8rMQ",
      // token: "",
      kefuMap:{
      },
      lock: false
    },
    methods: {
      // 获取用户的账号信息
      getUserInfo: function(phoneArr){
        const phoneA = this.removeRepeat(phoneArr)  // 去掉重复的手机号码
        if(phoneA.length == 0) {return}
        getUserInfo(phoneA).then(({data}) => {
          let users = users = data.data
          if(data.rspcode == 1){
             // 储存客服信息
            users.forEach(item => {
              item.userName = item.userName.replace(/@/g, '')
              this.$set(this.kefuMap, String(item.userPhone), item)
            });
          }
        })
      },
      // 通过手机号获取用户信息
      getUserNameByPhone(phone){
		    return this.$root.kefuMap[String(phone)] ? this.$root.kefuMap[String(phone)] : {}
      },
      // 去掉重复的手机号码（已经获取用户信息的的手机号）
      removeRepeat(arr){
        // 首先去掉arr中重复的数据
        const temp = [], set = new Set(arr);
        // kefuMap对象中如果没有缓存该手机号的信息，再去请求接口
        [...set].forEach((phone) => {
          if(!this.kefuMap.hasOwnProperty(phone)){
            temp.push(phone)
          }
        })
        return temp
      }
    },
    created(){},
    router,
    components: { App },
    template: '<App/>',
    store,
    WebIM,
    render: h => h(App)
})


