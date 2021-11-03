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

// 用户输入的自己的手机号码
const selfphone = "selfphone";

export function getSelfphone(){
  return sessionStorage.getItem(selfphone)
}

export function setSelfphone(value){
  sessionStorage.setItem(selfphone, value)
}

export function removeSelfphone(){
  sessionStorage.removeItem(selfphone)
}

// 通过二维码进入商城的标识
const shoppingMallFlag  = "shoppingMallFlag";

export function getShoppingMallFlag(){
  return sessionStorage.getItem(shoppingMallFlag)
}

export function setShoppingMallFlag(value){
  sessionStorage.setItem(shoppingMallFlag, value)
}

export function removeShoppingMallFlag(){
  sessionStorage.removeItem(shoppingMallFlag)
}