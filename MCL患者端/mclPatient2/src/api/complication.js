import {post,get} from '@/assets/js/request.js' //ajax 请求

// 并发症1级分类
export function getList(){
    let url = "UserInterface/complication/getComplicationSubjectList.ashx";
    return post(url)
}

//  并发症二级分类
export function getList2(param){
    let url = "UserInterface/complication/getComplicationSubjectResultList.ashx";
    return post(url, param)
}

// 并发症保存
export function save(param){
    let url = "UserInterface/complication/getComplicationSave.ashx";
    return post(url, param)
}