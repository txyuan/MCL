import {post,get} from '@/assets/js/request.js' //ajax 请求

// 自测工具列表
export function getSelfTestList(param){
    let url = "UserInterface/selfTestTool/getSelfTestToolSubjectList.ashx";
    return post(url, param)
}

// 自测详情
export function getDetail(param){
    let url = "UserInterface/selfTestTool/getSelfTestToolSubjectDetail.ashx";
    return post(url, param)
}

// 自测保存
export function save(param){
    let url = "UserInterface/selfTestTool/getSelfTestToolSave.ashx";
    return post(url, param)
}

// 查看干预方案
export function getSelfTestToolResult(param){
    let url = "UserInterface/selfTestTool/getSelfTestToolResult.ashx";
    return post(url, param)
}

// 单独获取每日实际摄入量数据
export function getSelfTestToolValue(param){
    let url = "UserInterface/selfTestTool/getSelfTestToolValue.ashx";
    return post(url, param)
}
