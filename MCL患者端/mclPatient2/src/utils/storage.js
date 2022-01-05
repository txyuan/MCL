// 转发小工具携带的推荐码
const rphone = "rphone";

export function getRhone(){
  return sessionStorage.getItem(rphone)
}

export function setRhone(value){
  sessionStorage.setItem(rphone, value)
}

export function removeRhone(){
  sessionStorage.removeItem(rphone)
}


// 用户手机号
const zphone = "zphone";

export function getZphone(){
  return localStorage.getItem(zphone)
}

export function setZphone(value){
  localStorage.setItem(zphone, value)
}

export function removeZphone(){
  localStorage.removeItem(zphone)
}