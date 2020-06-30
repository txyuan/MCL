// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vant from 'vant';
import WebIM from './utils/WebIM';
import store from './store';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'



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
        
      }
    },
    methods: {
      //获取客服的账号信息
      getKeFuInfo: function(username){        
        let url = `http://123.57.89.89:6333/UserInterface/GetCustomerServiceName.ashx`;
        //不存在当前客服
        if(!this.kefuMap[username]){
          WebIM.utils.ajax({
            url: url,
            data:{
              number: username
            },
            dataType: "json",
            'Content-type': 'application/x-www-form-urlencoded',
            type:"get",
            success: (data)=> {
              if(data.rspcode == 1){
                this.kefuMap[username] = data.name
                localStorage.kefuMap = JSON.stringify(this.kefuMap)
              }
            }
          })
        }
      }
    },
    created(){
      if(localStorage.kefuMap){
        this.kefuMap = JSON.parse(localStorage.kefuMap)
      }
    },
    router,
    components: { App },
    template: '<App/>',
    store,
    WebIM,
    render: h => h(App)
})