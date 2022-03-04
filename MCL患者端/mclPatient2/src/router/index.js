import Vue from 'vue'
import Router from 'vue-router'
import { getUserType, goHome, logout } from '@/assets/js/uesr.js' //用户类型
import { getUserInfo } from '@/api/person.js'

//导入页面
const wx_Entrance = () => import(/* webpackChunkName: "wx_Entrance" */ '@/components/wxEntrance/index.vue')
const wxFollowPage = () => import(/* webpackChunkName: "wxFollowPage" */ '@/components/wxFollowPage/index.vue')  //扫码关注微信页面

//首页
const home = () => import(/* webpackChunkName: "home" */ '@/components/home/main.vue')  //首页
const wellcome = () => import(/* webpackChunkName: "wellcome" */ '@/components/home/wellcome/index.vue')  //首页  欢迎页面
const wellcome_personInfo = () => import(/* webpackChunkName: "wellcome_personInfo" */ '@/components/home/wellcome/personInfo.vue')  //首页  完善个人信息
const personInfo1 = () => import(/* webpackChunkName: "personInfo1" */ '@/components/home/wellcome/personInfo/personInfo1.vue')  // 完善个人信息1
const personInfo2 = () => import(/* webpackChunkName: "personInfo2" */ '@/components/home/wellcome/personInfo/personInfo2.vue')  // 完善个人信息1
const personInfo3 = () => import(/* webpackChunkName: "personInfo3" */ '@/components/home/wellcome/personInfo/personInfo3.vue')  // 完善个人信息1
const personInfo4= () => import(/* webpackChunkName: "personInfo4" */ '@/components/home/wellcome/personInfo/personInfo4.vue')  // 完善个人信息1
const personInfo5 = () => import(/* webpackChunkName: "personInfo5" */ '@/components/home/wellcome/personInfo/personInfo5.vue')  // 完善个人信息1
const personInfo6 = () => import(/* webpackChunkName: "personInfo6" */ '@/components/home/wellcome/personInfo/personInfo6.vue')  // 完善个人信息1
const wellcome_personInfoRegister = () => import(/* webpackChunkName: "wellcome_personInfoRegister" */ '@/components/home/wellcome/personInfoRegister.vue')  //注册时候进入 个人信息录入
const message2 = () => import(/* webpackChunkName: "message2" */ '@/components/mesage/message2.vue')  //营养评估简介
// const home2 = () => import(/* webpackChunkName: "home2" */ '@/components/home/index2.vue')  //首页
const yearCard = () => import(/* webpackChunkName: "yearCard" */ '@/components/home/yearCard/index.vue')  //首页 购买年卡
const homemessage = () => import(/* webpackChunkName: "homemessage" */ '@/components/home/message/index.vue')  //首页 今日提醒

const todymanage = () => import(/* webpackChunkName: "todymanage" */ '@/components/home/todymanage/index.vue')  //诊疗
const caseUpload = () => import(/* webpackChunkName: "caseUpload" */ '@/components/home/caseUpload/index.vue')  //首页 病例上传
const welcomebl = () => import(/* webpackChunkName: "welcomebl" */ '@/components/home/caseUpload/welcomebl.vue')  //首页 病例上传 欢迎页
const appointment = () => import(/* webpackChunkName: "appointment" */ '@/components/home/appointment/index.vue')  //首页 复诊预约
const welcomefzyy = () => import(/* webpackChunkName: "welcomefzyy" */ '@/components/home/appointment/welcomefzyy.vue')  //首页 复诊预约 欢迎页
const medicatRecord = () => import(/* webpackChunkName: "medicatRecord" */ '@/components/home/medicatRecord/index.vue')  //首页 用药记录
const welcomeyy = () => import(/* webpackChunkName: "welcomeyy" */ '@/components/home/medicatRecord/welcomeyy.vue')  //首页 用药记录欢迎页
const addmedicat = () => import(/* webpackChunkName: "addmedicat" */ '@/components/home/medicatRecord/addmedicat.vue')  //首页 用药记录 添加eyemedicat
const eyemedicat = () => import(/* webpackChunkName: "eyemedicat" */ '@/components/home/medicatRecord/eyemedicat.vue')  //首页 用药记录 添加
const diet = () => import(/* webpackChunkName: "diet" */ '@/components/home/diet/tabs/main.vue')  //首页 饮食
const buyfood = () => import(/* webpackChunkName: "buyfood" */ '@/components/home/diet/buyfood.vue')  //首页 饮食
const diet_supplement = () => import(/* webpackChunkName: "diet_supplement" */ '@/components/home/diet/uploadPhoto_supplement.vue')  //首页 饮食补录
const uploadPhoto = () => import(/* webpackChunkName: "uploadPhoto" */ '@/components/home/diet/uploadPhoto.vue')  //首页 饮食上传图片
const uploadss = () => import(/* webpackChunkName: "uploadss" */ '@/components/home/diet/uploadss.vue')  //首页 查看饮食上传图片
const otherDishes = () => import(/* webpackChunkName: "otherDishes" */ '@/components/home/diet/otherDishes.vue')  //首页 饮食上传  其他菜式
const weightEstimation = () => import(/* webpackChunkName: "weightEstimation" */ '@/components/home/diet/weightEstimation.vue')  //首页 饮食上传 重量估算
const symptom = () => import(/* webpackChunkName: "symptom" */ '@/components/home/symptom/index.vue')  //首页 并发症状
const sympList = () => import(/* webpackChunkName: "sympList" */ '@/components/home/symptom/sympList.vue')  //首页 病症管理列表
const sympEye = () => import(/* webpackChunkName: "sympEye" */ '@/components/home/symptom/sympEye.vue')  //首页 病症管理查看
const welcomezz = () => import(/* webpackChunkName: "welcomezz" */ '@/components/home/symptom/welcomezz.vue')  //首页 病症管理欢迎页
const makeform = () => import(/* webpackChunkName: "makeform" */ '@/components/home/makeAppoint/makeform.vue')  //首页 复查预约
const nutrition = () => import(/* webpackChunkName: "nutrition" */ '@/components/home/nutrition/index.vue')  //首页 营养
const nutritionUploadPhoto = () => import(/* webpackChunkName: "nutritionUploadPhoto" */ '@/components/home/nutrition/uploadPhoto.vue')  //首页 营养 拍照上传
const uploadPhoto_supplement = () => import(/* webpackChunkName: "uploadPhoto_supplement" */ '@/components/home/nutrition/uploadPhoto_supplement.vue')  //首页 营养补录 拍照上传
const uploadPhoto_addCase = () => import(/* webpackChunkName: "uploadPhoto_addCase" */ '@/components/home/nutrition/addCase.vue')  //首页 营养补录 添加方案

const sport = () => import(/* webpackChunkName: "sport" */ '@/components/home/sport/index.vue')  //首页 运动
const sportAgreement = () => import(/* webpackChunkName: "sport-agreement" */ '@/components/home/sport/sport-agreement.vue')  //首页 运动  运动禁忌须知
const sportDetail = () => import(/* webpackChunkName: "sportDetail" */ '@/components/home/sport/sportDetail.vue')  //首页 运动-指导

const mood = () => import(/* webpackChunkName: "mood" */ '@/components/home/mood/index.vue')  //首页 心情
const welcomexqgl = () => import(/* webpackChunkName: "welcomexqgl" */ '@/components/home/mood/welcomexqgl.vue')  //首页 心情 欢迎页
const moodExplain = () => import(/* webpackChunkName: "moodExplain" */ '@/components/home/mood/moodExplain.vue')  //首页 心情说明
const healthy = () => import(/* webpackChunkName: "healthy" */ '@/components/home/healthy/index.vue')  //首页 健康
const weight = () => import(/* webpackChunkName: "weight" */ '@/components/home/weight/index.vue')  //首页 体重记录
const expert = () => import(/* webpackChunkName: "expert" */ '@/components/selfTest/expert.vue')  //MCL专家栏目
const dietarySurvey = () => import(/* webpackChunkName: "dietarySurvey" */ '@/components/selfTest/dietarySurvey.vue')  //简易膳食调查
const otherfood = () => import(/* webpackChunkName: "otherfood" */ '@/components/selfTest/otherfood.vue')  //简易膳食调查
const otherfoodOnly = () => import(/* webpackChunkName: "otherfoodOnly" */ '@/components/selfTest/otherfoodOnly.vue')  //简易膳食调查
const expertDetail = () => import(/* webpackChunkName: "expertDetail" */ '@/components/selfTest/expertDetail.vue')  //MCL专家栏目详情页
const use_guide = () => import(/* webpackChunkName: "use_guide" */ '@/components/home/agree/use_guide.vue')  //MCL 使用指南
const project_description = () => import(/* webpackChunkName: "project_description" */ '@/components/home/agree/project_description.vue')  //项目说明

// 知识
const knowledge = () => import(/* webpackChunkName: "knowledge" */ '@/components/home/knowledge/index.vue') // 知识课程
const knowledgeOne = () => import(/* webpackChunkName: "knowledgeOne" */ '@/components/home/knowledge/common/knowledgeOne.vue') // 知识课程
const knowledgeTwo = () => import(/* webpackChunkName: "knowledgeTwo" */ '@/components/home/knowledge/common/knowledgeTwo.vue') // 知识课程
const knowledgeResult = () => import(/* webpackChunkName: "knowledge" */ '@/components/home/knowledge/common/knowledgeResult.vue') // 知识课程
const knowMore = () => import(/* webpackChunkName: "knowMore" */ '@/components/home/knowledge/knowMore.vue') // 更多知识
const searchKonw = () => import(/* webpackChunkName: "searchKonw" */ '@/components/home/knowledge/searchKonw.vue') // 搜索知识
const searchKonwRes = () => import(/* webpackChunkName: "searchKonwRes" */ '@/components/home/knowledge/searchKonwRes.vue') // 搜索知识
// const search = () => import(/* webpackChunkName: "search" */ '@/components/home/knowledge/search.vue') // 知识课程搜索
// const knowledgeDetail = () => import(/* webpackChunkName: "knowledgeDetail" */ '@/components/home/knowledge/knowledgeDetail.vue') // 知识课程搜索

//商城
const service = () => import(/* webpackChunkName: "service" */ '@/components/home/service/index.vue')  //产品列表
const productCategory = () => import(/* webpackChunkName: "productCategory" */ '@/components/home/service/productCategory.vue')  //更多产品列表
const searchProduct = () => import(/* webpackChunkName: "searchProduct" */ '@/components/home/service/searchProduct.vue')  //搜索产品列表

const serviceorderpay = () => import(/* webpackChunkName: "serviceorderpay" */ '@/components/home/service/orderpay.vue')  //营养筛查支付订单
const menuRecog = () => import(/* webpackChunkName: "menuRecog" */ '@/components/home/service/menuRecog.vue')  //菜谱识别
const serviceDetail = () => import(/* webpackChunkName: "serviceDetail" */ '@/components/home/service/serviceDetail.vue')  //服务详情
const setMeal = () => import(/* webpackChunkName: "setMeal" */ '@/components/home/service/setMeal.vue')  //管理套餐详情
const shopcar = () => import(/* webpackChunkName: "shopCar" */ '@/components/shopCar/index.vue')  //购物车
const order = () => import(/* webpackChunkName: "order" */ '@/components/order/index.vue')  //订单
const orderindex = () => import(/* webpackChunkName: "orderindex" */ '@/components/order/orderindex.vue')  //订单
const orderPay = () => import(/* webpackChunkName: "orderPay" */ '@/components/orderPay/orderPay.vue')  //订单支付
const orderPayPaySuccess = () => import(/* webpackChunkName: "orderPayPaySuccess" */ '@/components/orderPay/paySuccess.vue')  //订单支付  支付成功


//自测
const selfTest = () => import(/* webpackChunkName: "selfTest" */ '@/components/selfTest/index/index.vue')  //自测

//社区
const community = () => import(/* webpackChunkName: "community" */ '@/components/community/index.vue')  //社区
const edition = () => import(/* webpackChunkName: "edition" */ '@/components/community/edition.vue')  //社区 教育
const chartDetail = () => import(/* webpackChunkName: "chartDetail" */ '@/components/community/chartDetail.vue')  //社区 动态详情
const publish = () => import(/* webpackChunkName: "publish" */ '@/components/community/publish.vue')  //社区 发布动态
const activetyDetail = () => import(/* webpackChunkName: "activetyDetail" */ '@/components/community/activetyDetail.vue')  //社区 活动详情
const activetyEnroll = () => import(/* webpackChunkName: "activetyEnroll" */ '@/components/community/activetyEnroll.vue')  //社区 活动报名
const caseDetail = () => import(/* webpackChunkName: "caseDetail" */ '@/components/community/caseDetail.vue')  //案例详情

//消息
const mesage = () => import(/* webpackChunkName: "mesage" */ '@/components/mesage/index/index.vue')  //消息


//医生
// const searchDoctor = () => import(/* webpackChunkName: "searchDoctor" */ '@/components/doctor/searchDoctor.vue')  //查找医生
const searchDoctorList = () => import(/* webpackChunkName: "searchDoctorList" */ '@/components/doctor/searchDoctorList.vue')  //查找医生
const doctorInfo = () => import(/* webpackChunkName: "doctorInfo" */ '@/components/doctor/doctorInfo.vue')  //医生信息
const doctorPay = () => import(/* webpackChunkName: "doctorPay" */ '@/components/doctor/doctorPay.vue')  //医生支付信息
//const cityList = () => import(/* webpackChunkName: "cityList" */ '@/components/doctor/city.vue')  //城市列表



//const search_product = () => import(/* webpackChunkName: "search_product" */ '@/components/home/searchProduct/index.vue')  //首页 搜索功能
//const versionA = () => import(/* webpackChunkName: "versionA" */ '@/components/home/versionA/index.vue')  //首页 A版
//const versionB = () => import(/* webpackChunkName: "versionB" */ '@/components/home/versionB/index.vue')  //首页 B版
//const versionBdetail = () => import(/* webpackChunkName: "versionBdetail" */ '@/components/home/versionB/detail.vue')  //首页 B版详情
// const myAssets = () => import(/* webpackChunkName: "myAssets" */ '@/components/home/myAssets/index.vue')  //首页 我的资产
// const announce = () => import(/* webpackChunkName: "announce" */ '@/components/home/announce/index.vue')  //首页 公告详情
// const BusinSchool = () => import(/* webpackChunkName: "BusinSchool" */ '@/components/home/BusinSchool/index.vue')  //首页 商学院
// const bindCard = () => import(/* webpackChunkName: "bindCard" */ '@/components/home/BusinSchool/bindCard.vue')  //首页 商学院详情
const searchIllness = () => import(/* webpackChunkName: "searchIllness" */ '@/components/home/searchIllness/index.vue')  //首页 搜索病症
const questionDetail = () => import(/* webpackChunkName: "searchIllness" */ '@/components/home/searchIllness/questionDetail.vue')  //首页 常见问题详情


// const sunburnarea = () => import(/* webpackChunkName: "sunburnarea" */ '@/components/home/sunburnarea/index.vue')  //首页 晒单
// const sundetail = () => import(/* webpackChunkName: "sundetail" */ '@/components/home/sunburnarea/sundetail.vue')  //首页 晒单详情
// const panicBuyingArea = () => import(/* webpackChunkName: "panicBuyingArea" */ '@/components/home/panicBuyingArea/index.vue')  //首页 抢购专区
// const panicBuyingAreaDetail = () => import(/* webpackChunkName: "panicBuyingAreaDetail" */ '@/components/home/panicBuyingArea/detail.vue')  //首页 抢购专区  详情页
// const panicBuyingAreaPaySuccess = () => import(/* webpackChunkName: "panicBuyingAreaPaySuccess" */ '@/components/home/panicBuyingArea/paySuccess.vue')  //首页 抢购专区 支付成功
// const wholesaleArea = () => import(/* webpackChunkName: "wholesaleArea" */ '@/components/home/wholesaleArea/index.vue')  //首页 批发专区
// const wholesaleAreaFirst = () => import(/* webpackChunkName: "wholesaleAreaFirst" */ '@/components/home/wholesaleAreaFirst/index.vue')  //优先 批发专区
// const wholesaleAreaDetail = () => import(/* webpackChunkName: "wholesaleAreaDetail" */ '@/components/home/wholesaleArea/detail.vue')  //首页 批发专区  详情页
// const wholesaleAreaPaySuccess = () => import(/* webpackChunkName: "wholesaleAreaPaySuccess" */ '@/components/home/wholesaleArea/paySuccess.vue')  //首页 批发专区 支付成功
const classification = () => import(/* webpackChunkName: "classification" */ '@/components/classification/index.vue')  //零售

// const unveiled = () => import(/* webpackChunkName: "unveiled" */ '@/components/unveiled/index.vue')  //汇兑商城
// const unveiledDetail = () => import(/* webpackChunkName: "unveiledDetail" */ '@/components/unveiled/detail.vue')  //汇兑商城
// const merchantAlliance = () => import(/* webpackChunkName: "merchantAlliance" */ '@/components/merchantAlliance/index.vue')  //商家联盟
// const merchantDetail = () => import(/* webpackChunkName: "merchantDetail" */ '@/components/merchantAlliance/merchantDetail/index.vue')  //商家联盟详情
// const mapadress = () => import(/* webpackChunkName: "mapadress" */ '@/components/merchantAlliance/mapadress.vue')  //商家联盟地图
// const mershopdetail = () => import(/* webpackChunkName: "mershopdetail" */ '@/components/merchantAlliance/merchantDetail/shopdetail.vue')  //商家联盟商品详情
// const ChoiCity = () => import(/* webpackChunkName: "ChoiCity" */ '@/components/merchantAlliance/ChoiCity.vue')  //商家联盟商品详情

const personal = () => import(/* webpackChunkName: "personal" */ '@/components/personal/index.vue')  //个人中心
const shopCard = () => import(/* webpackChunkName: "shopCard" */ '@/components/personal/shopCard/index.vue')  //购物卡
const cardbA = () => import(/* webpackChunkName: "cardbA" */ '@/components/personal/shopCard/cardbA.vue')  //购物卡A版
const cardbB = () => import(/* webpackChunkName: "cardbB" */ '@/components/personal/shopCard/cardbB.vue')  //购物卡B版
const marketOrder = () => import(/* webpackChunkName: "marketOrder" */ '@/components/personal/shopCard/withdrawal/marketOrder.vue')  //市场订单
const clickOrder = () => import(/* webpackChunkName: "clickOrder" */ '@/components/personal/shopCard/withdrawal/clickOrder.vue')  //点击说明
const cardRefund = () => import(/* webpackChunkName: "cardRefund" */ '@/components/personal/shopCard/withdrawal/cardRefund.vue')  //退卡提现
const withdrawal = () => import(/* webpackChunkName: "withdrawal" */ '@/components/personal/shopCard/withdrawal/withdrawal.vue')  //A版B版提现
const cardRecharge = () => import(/* webpackChunkName: "cardRecharge" */ '@/components/personal/shopCard/withdrawal/cardRecharge.vue')  //购卡
const rechargeAB = () => import(/* webpackChunkName: "rechargeAB" */ '@/components/personal/shopCard/withdrawal/rechargeAB.vue')  //AB版充值
const changeInto = () => import(/* webpackChunkName: "changeInto" */ '@/components/personal/shopCard/withdrawal/changeInto.vue')  //a转入b
const changeIntoB = () => import(/* webpackChunkName: "changeIntoB" */ '@/components/personal/shopCard/withdrawal/changeIntoB.vue')  //转入可消费余额
const cardsOther = () => import(/* webpackChunkName: "cardsOther" */ '@/components/personal/cardsOther/index.vue')  //购物卡转账
const personal_data = () => import(/* webpackChunkName: "personal_data" */ '@/components/personal/personal_data/index.vue')  //个人资料
const username = () => import(/* webpackChunkName: "username" */ '@/components/personal/username/index.vue')  //个人资料
const heights = () => import(/* webpackChunkName: "heights" */ '@/components/personal/username/heights.vue')  //修改身高
const personal_friend = () => import(/* webpackChunkName: "personal_friend" */ '@/components/personal/friend/index.vue')  //我的业绩
const mysunsheet = () => import(/* webpackChunkName: "mysunsheet" */ '@/components/personal/mySunSheet/index.vue')  //我的晒单
const sunsuccess = () => import(/* webpackChunkName: "sunsuccess" */ '@/components/personal/mySunSheet/sunSuccess.vue')  //我的晒单
const evaluate = () => import(/* webpackChunkName: "evaluate" */ '@/components/personal/mySunSheet/evaluate.vue')  //晒单评价
const personal_share = () => import(/* webpackChunkName: "personal_share" */ '@/components/personal/share/index.vue')  //分享
// const personal_commission = () => import(/* webpackChunkName: "personal_commission" */ '@/components/personal/commission/index.vue')  //佣金+余额+积分
// const personal_contribution_value = () => import(/* webpackChunkName: "personal_contribution_value" */ '@/components/personal/contributionValue/index.vue')  //我的贡献值
// const personal_contribution_to_balance = () => import(/* webpackChunkName: "personal_contribution_to_balance" */ '@/components/personal/contributionValue/contributionToBalance.vue')  //我的贡献值转余额
const personal_achievement = () => import(/* webpackChunkName: "personal_achievement" */ '@/components/personal/achievement/index.vue')  //我的业绩
const friendachieve = () => import(/* webpackChunkName: "friendachieve" */ '@/components/personal/achievement/friendachieve.vue')  //好友业绩
const goodFriend = () => import(/* webpackChunkName: "goodFriend" */ '@/components/personal/goodFriend/index.vue')  //我的好友
const account = () => import(/* webpackChunkName: "account" */ '@/components/personal/account/index.vue')  //我的好友account
const health = () => import(/* webpackChunkName: "health" */ '@/components/personal/health/index.vue')  //健康档案
const healthydan = () => import(/* webpackChunkName: "healthydan" */ '@/components/personal/healthydan.vue')  //健康档案新作页面
const stageReport = () => import(/* webpackChunkName: "stageReport" */ '@/components/personal/stageReport/index.vue')  //阶段报告
const impactAsses = () => import(/* webpackChunkName: "impactAsses" */ '@/components/personal/impactAsses/index.vue')  //效果评价
const review = () => import(/* webpackChunkName: "review" */ '@/components/personal/review/index.vue')  //复查管理
const reviewDetail = () => import(/* webpackChunkName: "reviewDetail" */ '@/components/personal/review/reviewDetail.vue')
const points = () => import(/* webpackChunkName: "points" */ '@/components/personal/points/index.vue')  //我的积分
const nowmoney = () => import(/* webpackChunkName: "nowmoney" */ '@/components/personal/nowmoney/index.vue')  //我的余额
const rechademon = () => import(/* webpackChunkName: "rechademon" */ '@/components/personal/nowmoney/rechademon.vue')  //余额充值
const screening = () => import(/* webpackChunkName: "screening" */ '@/components/personal/screening/index.vue')  //营养筛查版本2
const personal_receivingadress = () => import(/* webpackChunkName: "personal_receivingadress" */ '@/components/personal/receivingAddress/index.vue')  //管理收货地址
const personal_addadress = () => import(/* webpackChunkName: "personal_addadress" */ '@/components/personal/addAdress/index.vue')  //添加收货地址
// const personal_recharge = () => import(/* webpackChunkName: "personal_recharge" */ '@/components/personal/recharge/index.vue')  //余额充值
// const quotaToIntegral = () => import(/* webpackChunkName: "quotaToIntegral" */ '@/components/personal/recharge/quotaToIntegral.vue')  //配额转积分
const shop_detail = () => import(/* webpackChunkName: "shop_detail" */ '@/components/home/shopDetail/index.vue')  //商品详情
// const detail_show = () => import(/* webpackChunkName: "detail_show" */ '@/components/home/shopDetail/detailShow.vue')  //商品详情进行中
// const detail_show2 = () => import(/* webpackChunkName: "detail_show2" */ '@/components/home/shopDetail/detailShow2.vue')  //商品详情揭晓中
// const detail_show3 = () => import(/* webpackChunkName: "detail_show3" */ '@/components/home/shopDetail/detailShow3.vue') //商品详情已结束
// const home_participate = () => import(/* webpackChunkName: "participate" */ '@/components/home/participate/index.vue')  //本期参与情况
// const personal_putForward = () => import(/* webpackChunkName: "personal_putForward" */ '@/components/personal/putForward/index.vue') //佣金提现
// const personal_putSuccess = () => import(/* webpackChunkName: "personal_putSuccess" */ '@/components/personal/putSuccess/index.vue') //佣金提现成功
// const home_comments = () => import(/* webpackChunkName: "comments" */ '@/components/home/comments/index.vue')  //评论
// const home_exclusive = () => import(/* webpackChunkName: "home_exclusive" */ '@/components/home/exclusive/index.vue')  //积分专享
// const personal_record = () => import(/* webpackChunkName: "personal_record" */ '@/components/personal/record/index.vue')  //我的记录
// const home_indetails = () => import(/* webpackChunkName: "home_indetails" */ '@/components/home/inDetails/index.vue')  //积分详情
// const home_zlpay = () => import(/* webpackChunkName: "home_zlpay" */ '@/components/home/zlpay/index.vue')  //证联支付
const login= () => import(/* webpackChunkName: "login" */ '@/components/login/index.vue')  //登录

const noticeClause= () => import(/* webpackChunkName: "noticeClause" */ '@/components/login/noticeClause.vue')  //条款须知
const noticeClause2= () => import(/* webpackChunkName: "noticeClause2" */ '@/components/login/noticeClause2.vue')  //条款须知
const noticeClause3= () => import(/* webpackChunkName: "noticeClause3" */ '@/components/login/noticeClause3.vue')  //条款须知
// const personal_collage = () => import(/* webpackChunkName: "personal_collage" */ '@/components/personal/myCollage/index.vue')  //我的拼购
// const personal_lucky_code = () => import(/* webpackChunkName: "personal_luckyCode" */ '@/components/personal/myCollage/luckyCode/index.vue')  //幸运专项码
const personal_get_product = () => import(/* webpackChunkName: "personal_getproduct" */ '@/components/personal/getProduct/index.vue')  //商品订单
const personal_get_wuliu = () => import(/* webpackChunkName: "personal_getproduct" */ '@/components/personal/getProduct/wuliu.vue')  //查看物流
const refund = () => import(/* webpackChunkName: "refund" */ '@/components/personal/getProduct/refund.vue')  //商品订单
const personalnutrition = () => import(/* webpackChunkName: "personalnutrition" */ '@/components/personal/getProduct/nutrition.vue')  //营养筛查
const eyeconme = () => import(/* webpackChunkName: "eyeconme" */ '@/components/personal/eyeconme/index.vue')  //营养筛查查看报告
const nuteye = () => import(/* webpackChunkName: "nuteye" */ '@/components/personal/getProduct/nuteye/index.vue')  //营养筛查报告
const delorder = () => import(/* webpackChunkName: "delorder" */ '@/components/personal/getProduct/delorder/index.vue')  //取消订单
const managePackage = () => import(/* webpackChunkName: "managePackage" */ '@/components/personal/getProduct/managePackage.vue')  //管理套餐
const activityOrder = () => import(/* webpackChunkName: "activityOrder" */ '@/components/personal/getProduct/activityOrder.vue')  //活动订单
// const activityOdetail = () => import(/* webpackChunkName: "activityOdetail" */ '@/components/personal/getProduct/activityOdetail.vue')  //活动订单详情
const vipOrder = () => import(/* webpackChunkName: "vipOrder" */ '@/components/personal/getProduct/vipOrder.vue')  //会员卡订单
// const producte_valuate = () => import(/* webpackChunkName: "producte_valuate" */ '@/components/producteValuate/index.vue')  //商品评价
const home_signin = () => import(/* webpackChunkName: "home_signin" */ '@/components/home/signin/index.vue')  //日历签到
const searchShop = () => import(/* webpackChunkName: "searchShop" */ '@/components/home/searchShop/index.vue')  //首页搜索商品
const termsService = () => import(/* webpackChunkName: "termsService" */ '@/components/login/termsService.vue')  //注册
// const eyelast = () => import(/* webpackChunkName: "eyelast" */ '@/components/home/shopDetail/eyelast.vue') //查看计算结果
const changePass = () => import(/* webpackChunkName: "changePass" */ '@/components/personal/changePassword/index.vue') //修改密码
const twopass = () => import(/* webpackChunkName: "twopass" */ '@/components/personal/changePassword/twopass.vue') //修改密码
// const myConsign = () => import(/* webpackChunkName: "myConsign" */ '@/components/personal/myConsign/index.vue') //我的寄卖
const friendTransfer = () => import(/* webpackChunkName: "friendTransfer" */ '@/components/personal/friendTransfer/index.vue') //好友转账
const realName = () => import(/* webpackChunkName: "realName" */ '@/components/personal/realName/index.vue') //实名认证
const physician = () => import(/* webpackChunkName: "physician" */ '@/components/personal/realName/physician.vue') //上传报告
// const editbcard = () => import(/* webpackChunkName: "editbcard" */ '@/components/personal/realName/editbcard.vue') //修改银行卡
const shareLink = () => import(/* webpackChunkName: "shareLink" */ '@/components/sharePage/shareLink.vue') //分享链接
const appDown = () => import(/* webpackChunkName: "appDown" */ '@/components/sharePage/appDown.vue') //app下载页面
// const merchantCert = () => import(/* webpackChunkName: "merchantCert" */ '@/components/personal/merchantCert/index.vue') //商家认证
// const merchantsubmit = () => import(/* webpackChunkName: "merchantsubmit" */ '@/components/personal/merchantCert/submit.vue') //商家认证提交申请
// const comManage = () => import(/* webpackChunkName: "comManage" */ '@/components/personal/comManage/index.vue') //商家管理
// const editInform = () => import(/* webpackChunkName: "editInform" */ '@/components/personal/comManage/editInform/index.vue') //编辑商家信息
// const tradeName = () => import(/* webpackChunkName: "tradeName" */ '@/components/personal/comManage/editInform/tradeName.vue') //商家名称
// const favPolicy = () => import(/* webpackChunkName: "favPolicy" */ '@/components/personal/comManage/editInform/favPolicy.vue') //优惠政策
// const phones = () => import(/* webpackChunkName: "phones" */ '@/components/personal/comManage/editInform/phones.vue') //联系方式
// const busineshow = () => import(/* webpackChunkName: "busineshow" */ '@/components/personal/comManage/editInform/busineshow.vue') //商家公告
// const amtime = () => import(/* webpackChunkName: "amtime" */ '@/components/personal/comManage/editInform/amtime.vue') //上午营业时间
// const pmtime = () => import(/* webpackChunkName: "pmtime" */ '@/components/personal/comManage/editInform/pmtime.vue') //下午营业时间
// const mapdt = () => import(/* webpackChunkName: "mapdt" */ '@/components/personal/comManage/editInform/mapdt.vue') //选额详细地址
// const commodity = () => import(/* webpackChunkName: "commodity" */ '@/components/personal/commodity/index.vue') //商品管理
// const addshop = () => import(/* webpackChunkName: "addshop" */ '@/components/personal/commodity/addshop.vue') //添加商品
const shopDetails = () => import(/* webpackChunkName: "shopDetails" */ '@/components/personal/commodity/shopDetail.vue') //商品详情
// const notice = () => import(/* webpackChunkName: "notice" */ '@/components/notice/index.vue') //停运公告
//const notOpen = () => import(/* webpackChunkName: "notOpen" */ '@/components/personal/notOpen.vue') //暂未开放
const notopenq = () => import(/* webpackChunkName: "notopenq" */ '@/components/personal/notopenq.vue') //签到暂未开放
const inviteFriends = () => import(/* webpackChunkName: "inviteFriends" */ '@/components/personal/inviteFriends/index.vue')  //二维码
/*
const wheel = () => import(/* webpackChunkName: "wheel"  '@/components/wheel/index.vue') //幸运大转盘
const record = () => import(/* webpackChunkName: "record" '@/components/wheel/record.vue') //幸运大转盘我的记录
const extractProduct = () => import(/* webpackChunkName: "extractProduct" '@/components/wheel/extractProduct/extractProduct.vue') //幸运大转盘提取商品页面
*/

const selectRegister= () => import(/* webpackChunkName: "selectRegister" */ '@/components/login/selectRegister.vue')  //选择医生/用户注册
//完成报告
const gauge_NRS2002 = () => import(/* webpackChunkName: "gauge_NRS2002" */ '@/components/gauge/gauge_NRS2002.vue')  //量表NR2002
const gauge_PG_SGA = () => import(/* webpackChunkName: "gauge_PG-SGA" */ '@/components/gauge/gauge_PG-SGA.vue')  //量表PG-SGA-
const gauge_diet = () => import(/* webpackChunkName: "gauge_diet" */ '@/components/gauge/gauge_diet.vue')  //饮食处方量表
const gauge_nutrition = () => import(/* webpackChunkName: "gauge_nutrition" */ '@/components/gauge/gauge_nutrition.vue')  //营养处方量表
const sport_CF = () => import(/* webpackChunkName: "sport_CF" */ '@/components/gauge/sport_CF.vue')  //运动处方量表
const watch_repot = () => import(/* webpackChunkName: "watch_repot" */ '@/components/personal/stageReport/watch_repot.vue')  //查看报告
const gauge_life = () => import(/* webpackChunkName: "gauge_life" */ '@/components/gauge/gauge_life.vue')  //生活状况
// 筛查评估-营养评估
const nutrition1 = () => import(/* webpackChunkName: "nutrition1" */ '@/components/gauge/nutrition/nutrition1.vue')
const nutrition2 = () => import(/* webpackChunkName: "nutrition2" */ '@/components/gauge/nutrition/nutrition2.vue')
const nutrition3 = () => import(/* webpackChunkName: "nutrition3" */ '@/components/gauge/nutrition/nutrition3.vue')
const nutrition4 = () => import(/* webpackChunkName: "nutrition4" */ '@/components/gauge/nutrition/nutrition4.vue')
const nutrition5 = () => import(/* webpackChunkName: "nutrition5" */ '@/components/gauge/nutrition/nutrition5.vue')
const nutrition6 = () => import(/* webpackChunkName: "nutrition6" */ '@/components/gauge/nutrition/nutrition6.vue')
const nutrition7 = () => import(/* webpackChunkName: "nutrition7" */ '@/components/gauge/nutrition/nutrition7.vue')
const nutrition8 = () => import(/* webpackChunkName: "nutrition8" */ '@/components/gauge/nutrition/nutrition8.vue')
const nutrition9 = () => import(/* webpackChunkName: "nutrition9" */ '@/components/gauge/nutrition/nutrition9.vue')
const nutrition10 = () => import(/* webpackChunkName: "nutrition10" */ '@/components/gauge/nutrition/nutrition10.vue')
const nutrition11 = () => import(/* webpackChunkName: "nutrition11" */ '@/components/gauge/nutrition/nutrition11.vue')
const nutrition12 = () => import(/* webpackChunkName: "nutrition12" */ '@/components/gauge/nutrition/nutrition12.vue')
const nutrition13 = () => import(/* webpackChunkName: "nutrition13" */ '@/components/gauge/nutrition/nutrition13.vue')

// 心理评估

const psychology1 = () => import(/* webpackChunkName: "psychology" */ '@/components/gauge/psychology/psychology1.vue')
//导入页面





Vue.use(Router)

const router = new Router({
  routes: [
    { path:"/", redirect: "/wx_Entrance/personal"},  // 个人中心
//		{ path:"/", redirect: "/notice"},
		// { path:"/notice", name:"notice", component: notice },
    { path:"/login", name:"login", component: login },   //登录
    { path:"/selectRegister", name:"selectRegister", component: selectRegister },   //登录
    { path:"/noticeClause", name:"noticeClause", component: noticeClause },
    { path:"/noticeClause2", name:"noticeClause2", component: noticeClause2 },
    { path:"/noticeClause3", name:"noticeClause3", component: noticeClause3 },
    { path:"/wx_Entrance", name:"wx_Entrance", component: wx_Entrance,
      children:[
        { path:"home", name:"home", component: home},
        // { path:"home2", name:"home2", component: home2},
				{ path:"selfTest", name:"selfTest", component: selfTest},
        { path:"todymanage", name:"todymanage", component: todymanage },
				{ path:"community", name:"community", component: community},
				{ path:"service", name:"service", component: service, meta:{keepAlive: true}},
				{ path:"knowledge", name:"knowledge", component: knowledge},
        { path:"personal", name:"personal", component: personal }
      ]
    },
    // 客服
    { path:"/mesage", name:"mesage", component: mesage},
    //关注微信的二维码页面
    { path:"/wxFollowPage", name:"wxFollowPage", component: wxFollowPage },

    //首页页面
    { path:"/wellcome", name:"wellcome", component: wellcome },  //欢迎页面
    { path:"/wellcome_personInfo", name:"wellcome_personInfo", component: wellcome_personInfo },  //首页   完善个人信息
    { path:"/personInfo1", name:"personInfo1", component: personInfo1 },  //   完善个人信息1
    { path:"/personInfo2", name:"personInfo2", component: personInfo2 },  //   完善个人信息1
    { path:"/personInfo3", name:"personInfo3", component: personInfo3 },  //   完善个人信息1
    { path:"/personInfo4", name:"personInfo4", component: personInfo4 },  //   完善个人信息1
    { path:"/personInfo5", name:"personInfo5", component: personInfo5 },  //   完善个人信息1
    { path:"/personInfo6", name:"personInfo6", component: personInfo6 },  //   完善个人信息1
    { path:"/wellcome_personInfoRegister", name:"wellcome_personInfoRegister", component: wellcome_personInfoRegister },  //注册成功之后  个人信息录入
    { path:"/message2", name:"message2", component: message2 },  //营养评估简介
	  
	  { path:"/chufang", name:"chufang", component: () => import( /* webpackChunkName: "complicationResult" */ '@/components/home/todymanage/chufang.vue') },  // 四大处方
    { path:"/caseUpload", name:"caseUpload", component: caseUpload },  //病例上传 welcomebl
	  { path:"/welcomebl", name:"welcomebl", component: welcomebl },  //
    { path:"/appointment", name:"appointment", component: appointment },  //复诊预约 welcomefzyy
	  { path:"/welcomefzyy", name:"welcomefzyy", component: welcomefzyy },  //复诊预约
	  { path:"/medicatRecord", name:"medicatRecord", component: medicatRecord },
	  { path:"/welcomeyy", name:"welcomeyy", component: welcomeyy },
	  { path:"/addmedicat", name:"addmedicat", component: addmedicat },
	  { path:"/eyemedicat", name:"eyemedicat", component: eyemedicat },
    { path: "/diet", name: "diet", component: diet },  //饮食
    
    { path:"/proposalDetail", name:"proposalDetail", component: () => import(/* webpackChunkName: "proposalDetail" */ '@/components/home/diet/detail/proposalDetail.vue') },  // 饮食建议并发性详情页面
    { path:"/dietCase", name:"dietCase", component: () => import(/* webpackChunkName: "dietCase" */ '@/components/home/diet/dietCase.vue') },  //饮食处方
	  { path:"/buyfood/:names", name:"buyfood", component: buyfood },  //饮食
    { path:"/diet_supplement", name:"diet_supplement", component: diet_supplement },  //饮食
    { path:"/uploadPhoto", name:"uploadPhoto", component: uploadPhoto },  //饮食上传图片
	  { path:"/uploadss", name:"uploadss", component: uploadss },  //饮食上传图片  uploadss
    { path:"/otherDishes", name:"otherDishes", component: otherDishes },  //饮食上传图片  其他菜式
    { path:"/weightEstimation", name:"weightEstimation", component: weightEstimation },  //饮食上传 重量估算
    { path:"/symptom", name:"symptom", component: symptom },  //并发症状sympList
	  { path:"/sympList", name:"sympList", component: sympList },  //并发症状
	  { path:"/sympEye", name:"sympEye", component: sympEye },  //并发症状查看
	  { path:"/welcomezz", name:"welcomezz", component: welcomezz },  //并发症状welcomezz
    { path:"/nutrition", name:"nutrition", component: nutrition },  //营养
    { path:"/sport", name:"sport", component: sport },  //运动
    { path:"/sportAgreement", name:"sportAgreement", component: sportAgreement },  //运动禁忌须知
	  { path:"/sportDetail", name:"sportDetail", component: sportDetail },  //运动
    { path:"/nutritionUploadPhoto", name:"nutritionUploadPhoto", component: nutritionUploadPhoto },  //营养 拍照上传
    { path:"/uploadPhoto_supplement", name:"uploadPhoto_supplement", component: uploadPhoto_supplement },  //营养 拍照上传
    { path:"/uploadPhoto_addCase", name:"uploadPhoto_addCase", component: uploadPhoto_addCase },  //营养 添加方案
    { path:"/mood", name:"mood", component: mood },  //心情
	  { path:"/welcomexqgl", name:"welcomexqgl", component: welcomexqgl },
    { path:"/moodExplain", name:"moodExplain", component: moodExplain },  //心情说明
    { path:"/healthy", name:"healthy", component: healthy },  //健康
	  { path:"/healthydan", name:"healthydan", component: healthydan },  //健康
    { path:"/weight", name:"weight", component: weight },  //体重记录
    { path:"/expert", name:"expert", component: expert },  //MCL专家栏目
    { path:"/expertDetail/:skey", name:"expertDetail", component: expertDetail },  //MCL专家栏目  详情页
	  { path:"/dietarySurvey", name:"dietarySurvey", component: dietarySurvey },  //
	  { path:"/otherfood", name:"otherfood", component: otherfood },  //
	  { path:"/otherfoodOnly", name:"otherfoodOnly", component: otherfoodOnly },  //
    { path:"/use_guide", name:"use_guide", component: use_guide },  //使用指南
    { path:"/project_description", name:"project_description", component: project_description },  //项目说明

		{ path:"/makeform", name:"makeform", component: makeform },  //营养

    //知识
    // { path:"/search", name:"search", component: search },  //搜索
    // { path:"/knowledgeDetail", name:"knowledgeDetail", component: knowledgeDetail },  //课程详情
    { path:"/knowledgeOne", name:"knowledgeOne", component: knowledgeOne },  //课程详情
    { path:"/knowMore", name:"knowMore", component: knowMore, meta:{keepAlive: true} },  //更多知识
    { path:"/searchKonw", name:"searchKonw", component: searchKonw },  //搜索知识
    { path:"/searchKonwRes", name:"searchKonwRes", component: searchKonwRes },  //搜索知识
    { path:"/knowledgeTwo", name:"knowledgeTwo", component: knowledgeTwo },  //课程详情
    { path:"/knowledgeResult", name:"knowledgeResult", component: knowledgeResult },  //课程详情
    


		//商城
		{ path:"/productCategory", name:"productCategory", component: productCategory, meta:{keepAlive: true}},
		{ path:"/searchProduct", name:"searchProduct", component: searchProduct, meta:{keepAlive: true}},
		{ path:"/menuRecog", name:"menuRecog", component: menuRecog },  //
		{ path:"/setMeal/:sKey", name:"setMeal", component: setMeal },  //管理套餐详情
		{ path:"/serviceorderpay/:skey", name:"serviceorderpay", component: serviceorderpay },
		{ path:"/serviceDetail/:sKey", name:"serviceDetail", component: serviceDetail },  //服务详情
		{ path:"/shopcar", name:"shopcar", component: shopcar },  //购物车
		{ path:"/orderPay", name:"orderPay", component: orderPay },   //订单
		{ path:"/orderPayPaySuccess", name:"orderPayPaySuccess", component: orderPayPaySuccess },  //支付

    //社区页面
    { path:"/edition", name:"edition", component: edition },  //在线教育
    { path:"/chartDetail", name:"chartDetail", component: chartDetail },  //动态详情
    { path:"/publish", name:"publish", component: publish },  //发布动态
    { path:"/activetyDetail", name:"activetyDetail", component: activetyDetail },  //活动详情
    { path:"/activetyEnroll", name:"activetyEnroll", component: activetyEnroll },  //活动报名
    { path:"/caseDetail", name:"caseDetail", component: caseDetail },  //案例详情


    //医生
    // { path:"/searchDoctor", name:"searchDoctor", component: searchDoctor },  //查找医生
    { path:"/searchDoctorList", name:"searchDoctorList", component: searchDoctorList },  //查找医生
    { path:"/doctorInfo/:key", name:"doctorInfo", component: doctorInfo },  //医生简介
    { path:"/doctorPay", name:"doctorPay", component: doctorPay },  //医生支付信息
    //{ path:"/cityList", name:"cityList", component: cityList },  //城市列表

		//量表
		{ path:"/gauge_NRS2002", name:"gauge_NRS2002", component: gauge_NRS2002 },  //NRS量表
		{ path:"/gauge_PG_SGA", name:"gauge_PG_SGA", component: gauge_PG_SGA },  //PG-SGA量表
		{ path:"/gauge_diet", name:"gauge_diet", component: gauge_diet },  //饮食处方量表
		{ path:"/gauge_nutrition", name:"gauge_nutrition", component: gauge_nutrition },  //营养处方量表
		{ path:"/sport_CF", name:"sport_CF", component: sport_CF },
		{ path:"/watch_repot", name:"watch_repot", component: watch_repot },  //查看报告
    // 营养评估
    { path:"/nutrition1", name:"nutrition1", component: nutrition1 },  
    { path:"/nutrition2", name:"nutrition2", component: nutrition2 },  
    { path:"/nutrition3", name:"nutrition3", component: nutrition3 },  
    { path:"/nutrition4", name:"nutrition4", component: nutrition4 },  
    { path:"/nutrition5", name:"nutrition5", component: nutrition5 },  
    { path:"/nutrition6", name:"nutrition6", component: nutrition6 },  
    { path:"/nutrition7", name:"nutrition7", component: nutrition7 },  
    { path:"/nutrition8", name:"nutrition8", component: nutrition8 },  
    { path:"/nutrition9", name:"nutrition9", component: nutrition9 },  
    { path:"/nutrition13", name:"nutrition13", component: nutrition13 },  
    { path:"/nutrition10", name:"nutrition10", component: nutrition10 },  
    { path:"/nutrition11", name:"nutrition11", component: nutrition11 },  
    { path:"/nutrition12", name:"nutrition12", component: nutrition12 },  
    // 心理评估
    { path:"/psychology1", name:"psychology1", component: psychology1},

    // { path:"/panicBuyingArea", name:"panicBuyingArea", component: panicBuyingArea, meta:{keepAlive: true}},
    // { path:"/panicBuyingAreaDetail/:sKey", name:"panicBuyingAreaDetail", component: panicBuyingAreaDetail },
    // { path:"/panicBuyingAreaPaySuccess", name:"panicBuyingAreaPaySuccess", component: panicBuyingAreaPaySuccess },
    // { path:"/wholesaleArea", name:"wholesaleArea", component: wholesaleArea, meta:{keepAlive: true}},
    // { path:"/wholesaleAreaFirst", name:"wholesaleAreaFirst", component: wholesaleAreaFirst },
    // { path:"/wholesaleAreaDetail/:sKey", name:"wholesaleAreaDetail", component: wholesaleAreaDetail },
    // { path:"/wholesaleAreaPaySuccess", name:"wholesaleAreaPaySuccess", component: wholesaleAreaPaySuccess },
    // { path:"/unveiled", name:"unveiled", component: unveiled },
    // { path:"/unveiledDetail/:key", name:"unveiledDetail", component: unveiledDetail },
    // { path:"/merchantDetail/:key", name:"merchantDetail", component: merchantDetail },
    // { path:"/mapadress/:lnglat", name:"mapadress", component: mapadress },
    // { path:"/mershopdetail/:key/:skey", name:"mershopdetail", component: mershopdetail },
    // { path:"/ChoiCity", name:"ChoiCity", component: ChoiCity },

    { path:"/yearCard", name:"yearCard", component: yearCard },
	  { path:"/homemessage", name:"homemessage", component: homemessage },
//  { path:"/searchproduct", name:"searchProduct", component: search_product },
//	{ path:"/versionA", name:"versionA", component: versionA },
//	{ path:"/versionB", name:"versionB", component: versionB },
	//{ path:"/versionBdetail/:sKey", name:"versionBdetail", component: versionBdetail },
	// { path:"/myAssets", name:"myAssets", component: myAssets },
	// { path:"/announce", name:"announce", component: announce },
	// { path:"/BusinSchool", name:"BusinSchool", component: BusinSchool },
	// { path:"/bindCard/:order", name:"bindCard", component: bindCard },
	  { path:"/searchIllness", name:"searchIllness", component: searchIllness },
	  { path:"/questionDetail/:skey", name:"questionDetail", component: questionDetail },
    // { path:"/sunburnarea", name:"sunburnarea", component: sunburnarea, meta:{keepAlive: true} },
    // { path:"/sundetail", name:"sundetail", component: sundetail},
	  { path:"/shopCard", name:"shopCard", component: shopCard },
	  { path:"/cardbA", name:"cardbA", component: cardbA },
	  { path:"/cardbB", name:"cardbB", component: cardbB },
	  { path:"/marketOrder", name:"marketOrder", component: marketOrder },
	  { path:"/clickOrder", name:"clickOrder", component: clickOrder },
	  { path:"/cardRefund", name:"cardRefund", component: cardRefund },
	  { path:"/withdrawal/:edition", name:"withdrawal", component: withdrawal },
	  { path:"/cardRecharge", name:"cardRecharge", component: cardRecharge },
	  { path:"/rechargeAB/:edition", name:"rechargeAB", component: rechargeAB },
	  { path:"/changeInto", name:"changeInto", component: changeInto },
	  { path:"/changeIntoB", name:"changeIntoB", component: changeIntoB },
	  { path:"/cardsOther", name:"cardsOther", component: cardsOther },
    { path:"/personaldata", name:"personaldata", component: personal_data },
    { path:"/username", name:"username", component: username },
	  { path:"/heights", name:"heights", component: heights },
    { path:"/personalfriend", name:"personalfriend", component: personal_friend },
    { path:"/mysunsheet", name:"mysunsheet", component: mysunsheet },
    { path:"/sunsuccess", name:"sunsuccess", component: sunsuccess },
    { path:"/evaluate", name:"evaluate", component: evaluate },
    { path:"/personalshare", name:"personalshare", component: personal_share },
    // { path:"/personalcommission/:type", name:"personalcommission", component: personal_commission },
    // { path:"/personal_contribution_value", name:"personal_contribution_value", component: personal_contribution_value },
    // { path:"/personal_contribution_to_balance", name:"personal_contribution_to_balance", component: personal_contribution_to_balance },
    { path:"/personal_achievement", name:"personal_achievement", component: personal_achievement },
    { path:"/goodFriend", name:"goodFriend", component: goodFriend },
    { path:"/account", name:"account", component: account },
    { path:"/health", name:"health", component: health },
    { path:"/stageReport", name:"stageReport", component: stageReport },
    { path:"/impactAsses", name:"impactAsses", component: impactAsses },
    { path:"/review", name:"review", component: review },
    { path:"/reviewDetail", name:"reviewDetail", component: reviewDetail },
    { path:"/points", name:"points", component: points },
    { path:"/nowmoney", name:"nowmoney", component: nowmoney },
    { path:"/rechademon", name:"rechademon", component: rechademon },
    { path:"/screening", name:"screening", component: screening },
    { path:"/friendachieve/:friendsKey", name:"friendachieve", component: friendachieve },
    { path:"/personalreceivingadress", name:"personalreceivingadress", component: personal_receivingadress },
    { path:"/personaladdadress/:isType", name:"personaladdadress", component: personal_addadress },
    // { path:"/personalrecharge", name:"personalrecharge", component: personal_recharge },
    // { path:"/quotaToIntegral", name:"quotaToIntegral", component: quotaToIntegral },
    { path:"/shopdetail/:sKey", name:"shopdetail",redirect: '/shopdetail/:sKey/detailshow', component: shop_detail,
      children:[
        // { path:"detailshow", name:"detailshow", component: detail_show },
        // { path:"detailshow2/:detailsKey", name:"detail_show2", component: detail_show2 },
        // { path:"detailshow3/:detailsKey", name:"detail_show3", component: detail_show3 }
      ]
    },
    // { path:"/homeParticipate/:sKey", name:"homeParticipate", component: home_participate },
    // { path:"/personalPutForward", name:"personalPutForward", component: personal_putForward },
    // { path:"/personalPutSuccess", name:"personalPutSuccess", component: personal_putSuccess },
    // { path:"/homeComments/:sKey", name:"homeComments", component: home_comments },
    // { path:"/personalcollage", name:"personalcollage", component: personal_collage },
    // { path:"/personalluckycode", name:"personalluckycode", component: personal_lucky_code },
    { path:"/personalgetproduct", name:"personalgetproduct", component: personal_get_product}, // , meta:{keepAlive: true}
    { path:"/personalgetwuliu", name:"personalgetwuliu", component: personal_get_wuliu}, // , meta:{keepAlive: true}
    { path:"/refund", name:"refund", component: refund },
    { path:"/personalnutrition", name:"personalnutrition", component: personalnutrition },
    { path:"/eyeconme", name:"eyeconme", component: eyeconme },
    { path:"/delorder/:skey", name:"delorder", component: delorder },
    { path:"/nuteye", name:"nuteye", component: nuteye },
    { path:"/managePackage", name:"managePackage", component: managePackage },
    { path:"/activityOrder", name:"activityOrder", component: activityOrder },
    // {path:"/activityOdetail", name:"activityOdetail", component: activityOdetail },
    { path:"/vipOrder", name:"vipOrder", component: vipOrder },
    // { path:"/homeExclusive", name:"homeExclusive", component: home_exclusive },
    // { path:"/personalRecord", name:"personalRecord", component: personal_record },
    // { path:"/homeIndetails", name:"homeIndetails", component: home_indetails },
    // { path:"/homeZlpay", name:"homeZlpay", component: home_zlpay },
    // { path:"/productevaluate", name:"productevaluate", component: producte_valuate },
    { path:"/homeSignin", name:"homeSignin", component: home_signin },
    { path:"/order", name:"order", component: order },
	  { path:"/orderindex", name:"orderindex", component: orderindex },
    { path:"/searchShop", name:"searchShop", component: searchShop, meta:{keepAlive: true}},
    { path:"/termsService", name:"termsService", component: termsService, meta:{keepAlive: true}},
    // { path:"/eyelast", name:"eyelast", component: eyelast},
    { path:"/changePass", name:"changePass", component: changePass},
    { path:"/twopass", name:"twopass", component: twopass},
    // { path:"/myConsign", name:"myConsign", component: myConsign},
    { path:"/friendTransfer", name:"friendTransfer", component: friendTransfer},
    { path:"/realName", name:"realName", component: realName},
	  { path:"/physician", name:"physician", component: physician},
    // { path:"/editbcard", name:"editbcard", component: editbcard},
    { path:"/shareLink", name:"shareLink", component: shareLink},
    { path:"/appDown", name:"appDown", component: appDown},
	  { path:"/gauge_life", name:"gauge_life", component: gauge_life},
    // { path:"/merchantCert", name:"merchantCert", component: merchantCert},
    // { path:"/merchantsubmit", name:"merchantsubmit", component: merchantsubmit},
    // { path:"/comManage", name:"comManage", component: comManage},
    // { path:"/editInform/:sKey", name:"editInform", component: editInform,meta:{keepAlive: true}},
    // { path:"/tradeName/:sKey", name:"tradeName", component: tradeName},
    // { path:"/favPolicy/:sKey", name:"favPolicy", component: favPolicy},
    // { path:"/phones/:sKey", name:"phones", component: phones},
    // { path:"/busineshow/:sKey", name:"busineshow", component: busineshow},
    // { path:"/amtime/:sKey", name:"amtime", component: amtime},
    // { path:"/pmtime/:sKey", name:"pmtime", component: pmtime},
    // { path:"/commodity", name:"commodity", component: commodity},
    // { path:"/addshop/:sKey", name:"addshop", component: addshop},
    { path:"/shopDetails/:sKey", name:"shopDetails", component: shopDetails},
    // { path:"/mapdt", name:"mapdt", component: mapdt},
	//{ path:"/notOpen", name:"notOpen", component: notOpen},
    { path:"/notopenq", name:"notopenq", component: notopenq},
    { path:"/inviteFriends", name:"inviteFriends", component: inviteFriends},

    // 转发小工具
    { path:"/forwardingGadget", name:"forwardingGadget", component: () => import(/* webpackChunkName: "forwardingGadget" */ '@/components/personal/forwardingGadget/index.vue'), meta:{keepAlive: true}},
    { path:"/getGoctorList", name:"getGoctorList", component: () => import(/* webpackChunkName: "forwardingGadget" */ '@/components/personal/forwardingGadget/doctorList.vue') },

    
    /*  自测小工具（还没用） */
    // { path:"/singlePage_home", name:"singlePage_home", component: () => import(/* webpackChunkName: "singlePage_home" */ '@/view/singlePage/home.vue')},  //入口页面
    // { path:"/singlePage_height", name:"singlePage_height", component: () => import(/* webpackChunkName: "singlePage_height" */ '@/view/singlePage/height.vue')}, //标准体重
    // { path:"/singlePage_BMI", name:"singlePage_BMI", component: () => import(/* webpackChunkName: "singlePage_BMI" */ '@/view/singlePage/BMI.vue')}, //BMI
    // { path:"/singlePage_protein", name:"singlePage_protein", component: () => import(/* webpackChunkName: "singlePage_protein" */ '@/view/singlePage/protein.vue')}, //每日所需蛋白质
    // { path:"/singlePage_energy", name:"singlePage_energy", component: () => import(/* webpackChunkName: "singlePage_energy" */ '@/view/singlePage/energy.vue') }, //每日所需能量
    // { path:"/singlePage_energy2", name:"singlePage_energy2", component: () => import(/* webpackChunkName: "singlePage_energy2" */ '@/view/singlePage/energy2.vue')}, //每日所需能量
    // { path:"/singlePage_water", name:"singlePage_water", component: () => import(/* webpackChunkName: "singlePage_water" */ '@/view/singlePage/water.vue')},  //每日所需最低饮水量
    // { path:"/singlePage_intakeNenrgy", name:"singlePage_intakeNenrgy", component: () => import(/* webpackChunkName: "singlePage_intakeNenrgy" */ '@/view/singlePage/intakeNenrgy.vue')},  //每日实际摄入所需能量
    
    /*
    { path:"/wheel", name:"wheel", component: wheel},
    { path:"/record", name:"record", component: record},
    { path:"/extractProduct", name:"extractProduct", component: extractProduct}, 
    */

    /* 并发症 */
    { path:"/complication", name:"complication", component: () => import( /* webpackChunkName: "complication" */ '@/view/complication/index.vue')},
    { path:"/complicationDeatil", name:"complicationDeatil", component: () => import( /* webpackChunkName: "complicationDeatil" */ '@/view/complication/detail.vue')},
    { path:"/complicationResult", name:"complicationResult", component: () => import( /* webpackChunkName: "complicationResult" */ '@/view/complication/result.vue')},
    { path:"/complicationHome/:type", name:"complicationHome", component: () => import( /* webpackChunkName: "complicationHome" */ '@/view/complication/gauge/main.vue')},
    
    /* 自测工具 */ 
    { path:"/selfTestTool", name:"selfTestTool", component: () => import( /* webpackChunkName: "selfTestTool" */ '@/view/selfTestTool/index.vue')},
    { path:"/selfTestDetail", name:"selfTestDetail", component: () => import( /* webpackChunkName: "selfTestDetail" */ '@/view/selfTestTool/detail.vue')},
    // { path:"/selfTestService", name:"selfTestService", component: () => import( /* webpackChunkName: "service" */ '@/view/selfTestTool/service.vue')},
    { path:"/toolHome/:type", name:"toolHome", component: () => import( /* webpackChunkName: "service" */ '@/view/selfTestTool/toolPage/main.vue')},
    { path:"/selfTestSolution", name:"selfTestSolution", component: () => import( /* webpackChunkName: "selfTestSolution" */ '@/view/selfTestTool/solution.vue')},

    /*我的医生*/
    // { path:"/bindDoctor", name:"bindDoctor", component: () => import( /* webpackChunkName: "bindDoctor" */ '@/view/myDoctor/bindDoctor.vue')},
    // { path:"/doctorList", name:"doctorList", component: () => import( /* webpackChunkName: "doctorList" */ '@/view/myDoctor/doctorList.vue'), meta:{keepAlive: true}},
    // { path:"/doctorDetail", name:"doctorDetail", component: () => import( /* webpackChunkName: "doctorDetail" */ '@/view/myDoctor/detail.vue')},
    { path:"/myDoctor", name:"myDoctor", component: () => import( /* webpackChunkName: "myDoctor" */ '@/view/myDoctor/myDoctor.vue')},
    // { path:"/myDoctorService", name:"myDoctorService", component: () => import( /* webpackChunkName: "myDoctorService" */ '@/view/myDoctor/service.vue')},
    
    // 移动端调试页面
    { path:"/VConsole", name:"VConsole", component: () => import( /* webpackChunkName: "VConsole" */ '@/view/VConsole/index.vue')},
    // 404页面重定向
    { path: '*', redirect: "/"} 
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 白名单（不需要验证登录信息）
const product = ['service', 'serviceDetail', 'searchProduct', 'productCategory'] // 商城模块
const productNoMess = ['orderindex', 'mesage', 'shopcar', 'personalreceivingadress', 'personaladdadress'] // 不需要填写个人信息
const knowledgeMess = ['knowledge','knowledgeOne','knowledgeTwo','knowledgeResult','knowMore','searchKonw','searchKonwRes'] // 知识模块
const selfTestAndcomplication = [ 'toolHome', 'selfTestSolution',  'complicationResult', 'complicationHome', 'proposalDetail']  // 自测和并发症模块
const whiteRouteList = ['home', 'login', 'changePass', 'selectRegister', 'termsService', 'noticeClause', 'noticeClause2', 'noticeClause3', 'wxFollowPage', 'wellcome', 'wellcome_personInfo','inviteFriends',  'VConsole', ...product, ...selfTestAndcomplication, ...knowledgeMess  ]
// let share
router.beforeEach((to, from, next) => {

  // 重定向到哇咔咔系统首页
  // if(to.name == 'home'){
  //   location.href = "https://wx12ed81f322f0f7b5.wx.wakkaa.com/appMjAzNDg1?t=1"
  //   return
  // }
  // console.log(from);

  // 不在白名单内，没有登录信息的情况跳转登录页面
  if ((whiteRouteList.indexOf(to.name) == -1) && !localStorage.userInfo) {
    logout(to.fullPath)
    return
  }

  // 已经登录，不能再进入登录页面（跳转到系统首页）
  if ((localStorage.userInfo) && (to.name == 'login')) {
    goHome()
    return
  }
  
  // 白名单内的页面 和 完善个人信息页面，不需要判断完善个人信息
  if ((whiteRouteList.indexOf(to.name) == -1) && (productNoMess.indexOf(to.name) == -1) && (to.name != "getGoctorList") && (to.name != "forwardingGadget") && (to.name != "personaldata") && (to.name != "wellcome_personInfoRegister") && (to.name != "personal") && localStorage.userInfo
  && (to.name != "personInfo1") && (to.name != "personInfo2") && (to.name != "personInfo3") && (to.name != "personInfo4") && (to.name != "personInfo5") && (to.name != "personInfo6") 
  ) {
      // 判断是否需要完善个人信息
      perfectInfo()
  }

  next()
})

// 判断是否需要完善个人信息
let flag = false
async function perfectInfo(){
  if(flag){ return }
  const data = await getUserInfo();
  const type_disease = data.data.type_disease
  if(type_disease == null){
    Vue.prototype.$MessageBox.alert('请完善个人信息').then(action => {
      router.replace("/personInfo1")
    });
  }else{
    flag = true
  }
}
// export {
//   share
// }
export default router

