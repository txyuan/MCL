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
import vant from 'vant';
import WebIM from './utils/WebIM';
import store from './store';
import {getUserInfo} from './api/app.js';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(Antd)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(ElementUI).use(vant)
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
      //获取客服的账号信息
      getKeFuInfo: function(username){
        if(!username){return ''}
        if((this.kefuMap[username] === '') || (this.kefuMap[username])){
          return this.kefuMap
        }
        this.kefuMap[username] = ''  
        //不存在当前客服
        getUserInfo([username]).then(({data}) => {
          if(data.rspcode == 1 && data.data.length > 0){
            this.$set(this.kefuMap, username, data.data[0].userName.replace(/@/g, ''))
            this.kefuMap = {...this.kefuMap}
            // this.kefuMap[username] = data.data[0].userName
            // localStorage.kefuMap = JSON.stringify(this.kefuMap)
          }
        })
        return this.kefuMap
      }
    },
    created(){
      // if(localStorage.kefuMap){
      //   this.kefuMap = JSON.parse(localStorage.kefuMap)
      // }
    },
    router,
    components: { App },
    template: '<App/>',
    store,
    WebIM,
    render: h => h(App)
})



