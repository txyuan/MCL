import router from '@/router/index.js' // 路由
import { DOCTORURL, CHANNELURL} from '@/configURL.js'

// 退出登录
export function logout(){
    localStorage.removeItem('userInfo')
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.name == 'login' ? '/': router.currentRoute.fullPath // 从哪个页面跳转
        }
    })
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
    // 患者端
    if(getUserType() == 'patient'){
        router.replace({path: '/'})
    // 渠道端
    }
    // else if(getUserType() == 'channel'){
    //     location.replace(`${CHANNELURL}#/`)
    // // 医生端
    // }else if(getUserType() == 'doctor'){
    //     location.replace(`${DOCTORURL}#/`) 
    // }
}