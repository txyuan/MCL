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

//  饮食建议接口
export function getDietAdviceList(param){
    let url = "UserInterface/complication/GetDietAdviceList.ashx";
    return post(url, param)
}

// 饮食建议的自测工具列表和十五种并发症
export function getDietSuggestionList(param){
    let url = "UserInterface/complication/DietSuggestionList.ashx";
    return post(url, param)
}