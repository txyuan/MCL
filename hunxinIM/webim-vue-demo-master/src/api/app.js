import {BASEURLAPP} from '../configURL';
import axios from 'axios'
let axiosInstance = axios.create({
    baseURL: BASEURLAPP
});

// 通过手机号，获取用户的姓名
export function getKeFuInfo ( username ) {
    let url = `UserInterface/GetCustomerServiceName.ashx`;
    //不存在当前客服
    return new Promise((resolve, reject) => {
        let data = {
            number: username
        }
        axiosInstance.get(url, {params: data}).then(resolve, reject)
    }) 
}

// 记录聊天内容
export function saveChatData ( data ) {
    let url = `UserInterface/user/customServiceChat.ashx`;
    data.sender = JSON.parse(localStorage.userInfo).userId
    return new Promise((resolve, reject) => {
        if(data.msgType == 1){
            axiosInstance.get(url, {params: data}).then(resolve, reject)
        }
        if(data.msgType == 2){
            uploadChatimg(data.msgContent.data).then((responce) => {
                data.msgContent = responce.data.url
                axiosInstance.get(url, {params: data}).then(resolve, reject)
            })
        }
    }) 
}

// 读取聊天内容
export function getChatData ( data ) {
    data.user = JSON.parse(localStorage.userInfo).userId
    let url = `${BASEURLAPP}/UserInterface/user/getCustomServiceChatList.ashx`;
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {params: data}).then(resolve, reject)
    }) 
}

// 把图片文件存到服务器返回在线地址
export function uploadChatimg ( file ) {
    let config = {
        headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    const UserKey = localStorage.UserKey
    let url = `/UserInterface/UploadFile.ashx?UserKey=${UserKey}`;
    let params = new FormData(); //创建form对象
    params.append('uploadedFile',file);//通过append向form对象添加数据
    return new Promise((resolve, reject) => {
        axiosInstance.post(url, params, config).then(resolve, reject)
    }) 
}