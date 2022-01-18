import {post,get} from '@/assets/js/request.js' //ajax 请求

// 商城首页列表
export function GetIndexProductList(param){
    let url = "UserInterface/GetIndexProductList.ashx";
    return post(url, param)
}
// 所有商品列表

export function GetProductShareList(){
    let url = "UserInterface/GetProductShareList.ashx";
    return post(url)
}
// 商城产品分类
export function GetProductCategoryList(param){
    let url = "UserInterface/GetProductCategoryList.ashx";
    return post(url, param)
}

// 根据分类搜索商品列表
export function GetProductList(param){
    let url = "UserInterface/GetProductList.ashx";
    return post(url, param)
}

// 收藏产品
export function updateUserCollection(param){
    let url = "UserInterface/mall/updateUserCollection.ashx";
    return post(url, param)
}