import {post,get} from '@/assets/js/request.js' //ajax 请求

// 获取微信公众号配置
export function getWechatParm(param){
    let url = "UserInterface/mall/GetWechatParm.ashx";
    return post(url, param)
}
