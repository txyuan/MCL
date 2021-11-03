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
