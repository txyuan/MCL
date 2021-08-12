import {BASEURLAPP,BASEURL,HX_Config} from '../configURL';
import axios from 'axios'
import router from '@/router/index.js';
import qs from 'qs';

let axiosInstance = axios.create({
    baseURL: BASEURLAPP,
	headers:{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

// 通过手机号，获取客服的姓名
export function getKeFuInfo ( username ) {
    let url = `UserInterface/GetCustomerServiceName.ashx`;
    //不存在当前客服
    return new Promise((resolve, reject) => {
        let data = {
            number: username[0]
        }
        axiosInstance.get(url, {params: data}).then(resolve, reject)
    }) 
}

// 通过手机号，获取用户的姓名
export function getUserInfo ( rphone ) {
    if(rphone){
        let url = `${BASEURL}/Pages/OnLineAppManage/GetCustomerUserName.ashx`;
        //不存在当前客服
        return new Promise((resolve, reject) => {
            let data = {
                rphone: rphone.join()
            }
            axiosInstance.post(url, qs.stringify(data)).then(resolve, reject)
        }) 
    }
}

// 记录聊天内容
export function saveChatData ( data ) {
    const currentRoute = router.history.current
    let groupId = ''
    if(currentRoute.name == "group"){
        groupId = currentRoute.params.id
    }
    data.groupId = groupId
    let url = `UserInterface/user/customServiceChat.ashx`;
    data.sender = JSON.parse(localStorage.userInfo).userId
    return new Promise((resolve, reject) => {
        if(data.msgType == 1){
            axiosInstance.post(url, qs.stringify(data)).then(() => {
                userSendMessage(data.name.split('(')[0]) // 微信公众号推送消息
                resolve()
            }, reject)
        }
        if(data.msgType == 2){
            uploadChatimg(data.msgContent.data).then((responce) => {
                data.msgContent = responce.data.url
                axiosInstance.post(url, qs.stringify(data)).then(resolve, reject)
            })
        }
    }) 
}

// 记录聊天内容之后，微信公众号推送消息
export function userSendMessage (rphone) {
    let url = `${BASEURL}/Pages/OnLineAppManage/UserSendMessage.ashx`;
    return new Promise((resolve, reject) => {
        let data = { rphone }
        axiosInstance.get(url, {params: data}).then(resolve, reject)
    }) 
}

// 读取聊天内容
export function getChatData ( data ) {
    const currentRoute = router.history.current
    let groupId = ''
    if(currentRoute.name == "group"){
        groupId = currentRoute.params.id
        data.groupId = groupId
    }
    data.user = JSON.parse(localStorage.userInfo).userId
    let url = `${BASEURLAPP}/UserInterface/user/getCustomServiceChatList.ashx`;
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {params: data}).then((res) =>{
			resolve(res)
		}, reject)
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


let axiosInstance2 = axios.create({
    baseURL: BASEURLAPP,
	headers:{
		'Content-Type': 'application/json'
	}
});

let access_token = "";
// 获取环信token
function getHuanXinToken () {
    if(access_token == ""){
        let url = `http://a1.easemob.com/${HX_Config.org_name}/${HX_Config.app_name}/token`;
        let param = {
            "grant_type": "client_credentials",
            "client_id": HX_Config.client_id,
            "client_secret": HX_Config.client_secret
        }
        return new Promise((resolve, reject) => {
            axiosInstance2.post(url, param).then((res)=>{
                access_token = res.data.access_token
                return resolve(access_token)
            }, reject)
        })
    }else{
        return new Promise((resolve, reject) => {
            resolve(access_token)
        })
    }
}

// 获取环信所有群组
export async function getHuanXinGroups () {
    await getHuanXinToken()
    let url = `http://a1.easemob.com/${HX_Config.org_name}/${HX_Config.app_name}/chatgroups`;
    const config = {
        headers:{
            Authorization: `Bearer ${access_token}`,
        }
    }
    return new Promise((resolve, reject) => {
        axiosInstance2.get(url, {headers: config.headers} ).then(resolve, reject)
    }) 
}

// 获取一个用户参与的所有群组
export async function getHuanXinGroupsByUser (username) {
    await getHuanXinToken()
    let url = `http://a1.easemob.com/${HX_Config.org_name}/${HX_Config.app_name}/users/${username}/joined_chatgroups`;
    const config = {
        headers:{
            Authorization: `Bearer ${access_token}`,
        }
    }
    return new Promise((resolve, reject) => {
        axiosInstance2.get(url, {headers: config.headers} ).then(resolve, reject)
    }) 
}