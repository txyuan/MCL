import Vue from "vue"
import router from '@/router/index.js' // 路由
// import { DOCTORURL, CHANNELURL} from '@/configURL.js'
import {APPID} from "@/configURL.js"
import {isWeiXin} from "@/utils/utils.js"
import { removeZphone } from "@/utils/storage.js"

// 退出登录
export async function logout(redirectUrl){
    // await Vue.prototype.$MessageBox.confirm('您还未登录，请先登录系统')
    doLogout(redirectUrl)
}

// 退出登录
export function doLogout(redirectUrl){
    localStorage.removeItem('userInfo')
    removeZphone()
    const redirect = router.currentRoute.name == 'login' ? '/': router.currentRoute.fullPath  // 从哪个页面跳转
    const loginRoute = {
        name: "login",
        query: {
            redirect: redirectUrl ? redirectUrl :  redirect
        }
    }
    // 生产环境获取openid
    if((process.env.NODE_ENV == 'production') && isWeiXin()){
        const {href} = router.resolve(loginRoute);
        location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(location.origin + location.pathname + href)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`)
        return
    } else {
        router.replace(loginRoute)
    }
}

// 获取用户类型
export function getUserType(){
    let userInfo = localStorage.getItem('userInfo')
    if(userInfo){
        userInfo = JSON.parse(userInfo)
        // 患者端
        if((userInfo.userType == 1) || (userInfo.userType == 2) || (userInfo.userType == 3)){
            return 'patient'
        // 渠道端
        }else if((userInfo.userType == 5) || (userInfo.userType == 6) || (userInfo.userType == 7) || (userInfo.userType == 8)){
            return 'channel'
        //医生端    
        }else if(userInfo.userType == 4){
            return 'doctor'
        }
    }else{
        logout()
    }
}

// 跳转到系统首页
export function goHome() {
    router.replace({path: '/'})
    // 患者端
    // if(getUserType() == 'patient'){
    //     router.replace({path: '/'})
    // 渠道端
    // }
    // else if(getUserType() == 'channel'){
    //     location.replace(`${CHANNELURL}#/`)
    // // 医生端
    // }else if(getUserType() == 'doctor'){
    //     location.replace(`${DOCTORURL}#/`) 
    // }
}