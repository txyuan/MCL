import {post,get} from '@/assets/js/request.js' //ajax 请求

// 用户信息
export function getUserInfo(){
    let url = "UserInterface/GetUserShowInfo.ashx";
    return post(url)
}

