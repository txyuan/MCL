import axios from 'axios'
import Qs from 'qs'
import router from '@/router/index.js' //路由
// axios.defaults.timeout = 5000;
import { BASEURL as baseURL } from '@/configURL.js'
//开发模式
if(process.env.NODE_ENV=="development"){
 // baseURL = 'http://mcluser.kaopudian.cn';  // 
}
axios.defaults.baseURL = baseURL;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data =  config.data;
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };

    let UserKey = "";
    let SessionId = "";
    if(localStorage.userInfo){
      let userInfo = JSON.parse(localStorage.userInfo);
      UserKey  = userInfo.UserKey;
      SessionId = userInfo.SessionId
    };

    //分享页面接口不需要挂参数
    if(config.url.split("?").length == 1){
      config.params = {UserKey, SessionId}
    }
    // 拦截处理请求数据
//  config.transformRequest = [function (data) {
//    data = Qs.stringify(data);
//    return data;
//  }]
    // 拦截处理请求数据
    if(!(config.data instanceof FormData)){
      config.transformRequest = [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    }else{

    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if((response.data.rspcode == 999) || (response.data.rspCode == 999)){
      localStorage.clear();
      if(router.currentRoute.path != "/login"){
        router.push({
          path:"/login",
          query:{redirect: router.currentRoute.fullPath}//从哪个页面跳转
        });
      }
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}
