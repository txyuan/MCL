import {post,get} from '@/assets/js/request.js' //ajax 请求

// 判断这个手机号的用户是否在系统中存在
export function checkUserInfo(param){
    let url = "UserInterface/CheckUserInfo.ashx";
    return post(url, param)
}

