import {post,get} from '@/assets/js/request.js' //ajax 请求

// 标签列表
export function getCommunityLabelList(param){
    let url = "UserInterface/community/getCommunityLabelList.ashx";
    return post(url, param)
}

// 保存标签
export function saveLable(param){
    let url = "UserInterface/community/SaveUserCommunityLabel.ashx";
    return post(url, param)
}