import Vue from 'vue'
import Router from 'vue-router'

//导入页面
const wx_Entrance = () => import(/* webpackChunkName: "wx_Entrance" */ '@/components/wxEntrance/index.vue')
const wxFollowPage = () => import(/* webpackChunkName: "wxFollowPage" */ '@/components/wxFollowPage/index.vue')  //扫码关注微信页面

const home = () => import(/* webpackChunkName: "home" */ '@/components/home/index.vue')  //首页
const search_product = () => import(/* webpackChunkName: "search_product" */ '@/components/home/searchProduct/index.vue')  //首页 搜索功能
const versionB = () => import(/* webpackChunkName: "versionB" */ '@/components/home/versionB/index.vue')  //分类
const share = () => import(/* webpackChunkName: "share" */ '@/components/share/index.vue')  //分享
const classification = () => import(/* webpackChunkName: "classification" */ '@/components/classification/index.vue')  //零售
const classdetail = () => import(/* webpackChunkName: "classdetail" */ '@/components/classification/detail.vue')  //零售详情
const shopcar = () => import(/* webpackChunkName: "shopCar" */ '@/components/shopCar/index.vue')  //购物车
const order = () => import(/* webpackChunkName: "order" */ '@/components/order/index.vue')  //订单
const orderindex = () => import(/* webpackChunkName: "orderindex" */ '@/components/order/orderindex.vue')  //订单
const orderPay = () => import(/* webpackChunkName: "orderPay" */ '@/components/orderPay/orderPay.vue')  //订单支付
const orderPayPaySuccess = () => import(/* webpackChunkName: "orderPayPaySuccess" */ '@/components/orderPay/paySuccess.vue')  //订单支付  支付成功
const personal = () => import(/* webpackChunkName: "personal" */ '@/components/personal/index.vue')  //个人中心
const personal_data = () => import(/* webpackChunkName: "personal_data" */ '@/components/personal/personal_data/index.vue')  //个人资料
const username = () => import(/* webpackChunkName: "username" */ '@/components/personal/username/index.vue')  //个人资料
const myUser = () => import(/* webpackChunkName: "myUser" */ '@/components/personal/myUser/index.vue')  //我的用户
const userListDetails = () => import(/* webpackChunkName: "userListDetails" */ '@/components/personal/myUser/userListDetails.vue')  //我的用户列表详情
const consultation = () => import(/* webpackChunkName: "consultation" */ '@/components/personal/consultation/index.vue')  //我的余额
const rechademon = () => import(/* webpackChunkName: "rechademon" */ '@/components/personal/consultation/rechademon.vue')  //我的余额  充值
const capital = () => import(/* webpackChunkName: "capital" */ '@/components/personal/capital/index.vue')  //资金记录
const personal_share = () => import(/* webpackChunkName: "personal_share" */ '@/components/personal/share/index.vue')  //分享
const personal_commission = () => import(/* webpackChunkName: "personal_commission" */ '@/components/personal/commission/index.vue')  //我的佣金
const yjcardRefund = () => import(/* webpackChunkName: "yjcardRefund" */ '@/components/personal/commission/yjcardRefund.vue')  //佣金提现
const personal_achievement = () => import(/* webpackChunkName: "personal_achievement" */ '@/components/personal/achievement/index.vue')  //我的业绩
const friendachieve = () => import(/* webpackChunkName: "friendachieve" */ '@/components/personal/achievement/friendachieve.vue')  //好友业绩
//const inviteFriends = () => import(/* webpackChunkName: "inviteFriends" */ '@/components/personal/inviteFriends/index.vue')  //邀请好友
const personal_receivingadress = () => import(/* webpackChunkName: "personal_receivingadress" */ '@/components/personal/receivingAddress/index.vue')  //管理收货地址
const personal_addadress = () => import(/* webpackChunkName: "personal_addadress" */ '@/components/personal/addAdress/index.vue')  //添加收货地址
const shop_detail = () => import(/* webpackChunkName: "shop_detail" */ '@/components/home/shopDetail/index.vue')  //商品详情
const login= () => import(/* webpackChunkName: "login" */ '@/components/login/index.vue')  //登录
const noticeClause= () => import(/* webpackChunkName: "noticeClause" */ '@/components/login/noticeClause.vue')  //条款须知
const personal_get_product = () => import(/* webpackChunkName: "personal_getproduct" */ '@/components/personal/getProduct/index.vue')  //我的订单
const delivery = () => import(/* webpackChunkName: "delivery" */ '@/components/personal/delivery/index.vue')  //发货管理
const orderDetail = () => import(/* webpackChunkName: "orderDetail" */ '@/components/personal/delivery/orderDetail.vue')  //订单详情
const orderShip = () => import(/* webpackChunkName: "orderShip" */ '@/components/personal/delivery/orderShip.vue')  //订单发货
const staffManage = () => import(/* webpackChunkName: "staffManage" */ '@/components/personal/staffManage/index.vue')  //员工管理
const establish = () => import(/* webpackChunkName: "establish" */ '@/components/personal/staffManage/establish.vue')  //创建员工
const onestaff = () => import(/* webpackChunkName: "onestaff" */ '@/components/personal/staffManage/onestaff.vue')  //员工管理单个
const newsList = () => import(/* webpackChunkName: "newsList" */ '@/components/newsList/index.vue')  //消息列表
const newsDetail = () => import(/* webpackChunkName: "newsDetail" */ '@/components/newsList/newsDetail.vue')  //消息列表
const searchShop = () => import(/* webpackChunkName: "searchShop" */ '@/components/home/searchShop/index.vue')  //搜索商品
const termsService = () => import(/* webpackChunkName: "termsService" */ '@/components/login/termsService.vue')  //注册
const changePass = () => import(/* webpackChunkName: "changePass" */ '@/components/personal/changePassword/index.vue') //修改密码
const twopass = () => import(/* webpackChunkName: "twopass" */ '@/components/personal/changePassword/twopass.vue') //修改密码
const realName = () => import(/* webpackChunkName: "realName" */ '@/components/personal/realName/index.vue') //实名认证
const shareLink = () => import(/* webpackChunkName: "shareLink" */ '@/components/sharePage/shareLink.vue') //分享链接
const appDown = () => import(/* webpackChunkName: "appDown" */ '@/components/sharePage/appDown.vue') //app下载页面
const shopDetails = () => import(/* webpackChunkName: "shopDetails" */ '@/components/personal/commodity/shopDetail.vue') //商品详情
// const notice = () => import(/* webpackChunkName: "notice" */ '@/components/notice/index.vue') //停运公告
const notOpen = () => import(/* webpackChunkName: "notOpen" */ '@/components/personal/notOpen.vue') //暂未开放
const bankCard = () => import(/* webpackChunkName: "bankCard" */ '@/components/personal/bankCard/index.vue')  //卡号管理
const addcard = () => import(/* webpackChunkName: "addcard" */ '@/components/personal/bankCard/addcard.vue')  //添加银行卡
const custransfer = () => import(/* webpackChunkName: "custransfer" */ '@/components/personal/custransfer/index.vue')  //客户转让
const customerfer = () => import(/* webpackChunkName: "customerfer" */ '@/components/personal/custransfer/customerfer.vue')  //客户转让
const staticMonth = () => import(/* webpackChunkName: "staticMonth" */ '@/components/personal/staticMonth/index.vue')  //绩效统计
const monthDetail = () => import(/* webpackChunkName: "monthDetail" */ '@/components/personal/staticMonth/monthDetail.vue')  //绩效统计详情
//导入页面monthDetail

Vue.use(Router)

const router = new Router({
  routes: [
    { path:"/", redirect: "/wx_Entrance/home"},
    { path:"/wxFollowPage", name:"wxFollowPage", component: wxFollowPage },
	// { path:"/notice", name:"notice", component: notice },
    { path:"/login", name:"login", component: login },
    { path:"/noticeClause", name:"noticeClause", component: noticeClause },
    { path:"/wx_Entrance", name:"wx_Entrance", component: wx_Entrance,
      children:[
        { path:"home", name:"home", component: home, meta:{keepAlive: true}},
		    { path:"versionB", name:"versionB", component: versionB},
        { path:"share", name:"share", component: share },
        // { path:"shopcar", name:"shopcar", component: shopcar },
				{ path:"delivery", name:"delivery", component: delivery },
        { path:"personal", name:"personal", component: personal }
      ]
    },
    { path:"/share", name:"share", component: share },
    { path:"/classdetail/:sKey", name:"classdetail", component: classdetail },
    { path:"/orderPay", name:"orderPay", component: orderPay },
    { path:"/orderPayPaySuccess", name:"orderPayPaySuccess", component: orderPayPaySuccess },
    { path:"/searchproduct", name:"searchProduct", component: search_product },
    { path:"/personaldata", name:"personaldata", component: personal_data },
    { path:"/username", name:"username", component: username },
    { path:"/myUser", name:"myUser", component: myUser },
    { path:"/userListDetails", name:"userListDetails", component: userListDetails },
	  { path:"/consultation", name:"consultation", component: consultation },
	  { path:"/rechademon", name:"rechademon", component: rechademon },  //余额  充值
	  { path:"/capital", name:"capital", component: capital },
    { path:"/personalshare", name:"personalshare", component: personal_share },
    { path:"/personal_commission", name:"personal_commission", component: personal_commission },
	  { path:"/yjcardRefund", name:"yjcardRefund", component: yjcardRefund },
    { path:"/personal_achievement", name:"personal_achievement", component: personal_achievement },
    { path:"/friendachieve/:friendsKey", name:"friendachieve", component: friendachieve },

    { path:"/personalreceivingadress", name:"personalreceivingadress", component: personal_receivingadress },
    { path:"/personaladdadress/:isType", name:"personaladdadress", component: personal_addadress },
    { path:"/shopdetail/:sKey", name:"shopdetail",redirect: '/shopdetail/:sKey/detailshow', component: shop_detail},
    { path:"/personalgetproduct", name:"personalgetproduct", component: personal_get_product },
	// { path:"/delivery", name:"delivery", component: delivery },
	{ path:"/shopcar", name:"shopcar", component: shopcar },
	{ path:"/orderDetail", name:"orderDetail", component: orderDetail },
	{ path:"/orderShip", name:"orderShip", component: orderShip },
	{ path:"/staffManage", name:"staffManage", component: staffManage },
	{ path:"/establish", name:"establish", component: establish },
	{ path:"/onestaff", name:"onestaff", component: onestaff },
	{ path:"/newsList", name:"newsList", component: newsList, meta: {keepAlive: true} },
	{ path:"/newsDetail", name:"newsDetail", component: newsDetail },
    { path:"/order", name:"order", component: order },
	{ path:"/orderindex", name:"orderindex", component: orderindex },
    { path:"/searchShop", name:"searchShop", component: searchShop, meta:{keepAlive: true}},
    { path:"/termsService", name:"termsService", component: termsService},
    { path:"/changePass", name:"changePass", component: changePass},
    { path:"/twopass", name:"twopass", component: twopass},
    { path:"/realName", name:"realName", component: realName},
    { path:"/shareLink", name:"shareLink", component: shareLink},
    { path:"/appDown", name:"appDown", component: appDown},
    { path:"/shopDetails/:sKey", name:"shopDetails", component: shopDetails},
	  { path:"/notOpen", name:"notOpen", component: notOpen},
   { path:"/bankCard", name:"bankCard", component: bankCard },
   { path:"/addcard", name:"addcard", component: addcard },
	 { path:"/custransfer", name:"custransfer", component: custransfer },
	 { path:"/customerfer", name:"customerfer", component: customerfer },
	 { path:"/staticMonth", name:"staticMonth", component: staticMonth },
	 { path:"/monthDetail", name:"monthDetail", component: monthDetail },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  //免登陆设置
  //localStorage.userInfo  登录信息
//if( (to.path == "/login") && (from.path == "/") && localStorage.userInfo){
//  next({path:'/wx_Entrance/home',replace:true})
//  return
//}

//	if(to.path != "/notice"){
//	next({path:"/notice",replace:true}) //
//}else{
  	next()
//}
})

export default router

