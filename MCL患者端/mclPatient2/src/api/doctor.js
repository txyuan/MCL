import {post,get} from '@/assets/js/request.js' //ajax 请求

// 医生列表
export function getDoctorInfoList(param){
    let url = "UserInterface/GetDoctorInfoList.ashx";
    return post(url, param)
}

// 医生详情页面
export function getDoctorInfo(param){
    let url = "UserInterface/GetDoctorInfoList.ashx";
    return post(url, param)
}

// 我的医生
export function purchaseYearCard(param){
    let url = "UserInterface/PurchaseYearCard.ashx";
    return post(url, param)
}

