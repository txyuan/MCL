import Vue from 'vue'
import Router from 'vue-router'
import { getUserType, goHome, logout } from '@/assets/js/user.js' //用户类型

//导入页面
const wx_Entrance = () => import(/* webpackChunkName: "wx_Entrance" */ '@/components/wxEntrance/index.vue')
const wxFollowPage = () => import(/* webpackChunkName: "wxFollowPage" */ '@/components/wxFollowPage/index.vue')  //扫码关注微信页面

const home = () => import(/* webpackChunkName: "home" */ '@/components/home/index.vue')  //首页
const addPatient = () => import(/* webpackChunkName: "addPatient" */ '@/components/home/addPatient/index.vue')  //添加患者
const groupManage = () => import(/* webpackChunkName: "groupManage" */ '@/components/home/groupManage/index.vue')  //分组管理
const share = () => import(/* webpackChunkName: "share" */ '@/components/share/index.vue')  //分享
const dynamic = () => import(/* webpackChunkName: "dynamic" */ '@/components/dynamic/index.vue')  //动态
const news = () => import(/* webpackChunkName: "news" */ '@/components/news/index.vue')  //消息
const chatSet = () => import(/* webpackChunkName: "chatSet" */ '@/components/news/chatSet/index.vue')  //聊天设置
const chatCenter = () => import(/* webpackChunkName: "chatCenter" */ '@/components/news/chatCenter/index.vue')  //聊天中心
const chat = () => import(/* webpackChunkName: "chat" */ '@/components/news/chat.vue')  //聊天
const medical = () => import(/* webpackChunkName: "medical" */ '@/components/news/chatCenter/medical.vue')  //就诊详情
const records = () => import(/* webpackChunkName: "records" */ '@/components/news/chatCenter/records.vue')  //病历档案
const indexData = () => import(/* webpackChunkName: "indexData" */ '@/components/news/chatCenter/indexData.vue')  //指标数据  报告查询
const indexDataDet = () => import(/* webpackChunkName: "indexDataDet" */ '@/components/news/chatCenter/indexDataDet.vue')  //指标数据  报告查询详情
const diet = () => import(/* webpackChunkName: "diet" */ '@/components/news/diet/index.vue')  // 饮食 
const nutrition = () => import(/* webpackChunkName: "nutrition" */ '@/components/news/nutrition/index.vue')  // 营养
const sport = () => import(/* webpackChunkName: "sport" */ '@/components/news/sport/index.vue')  // 运动
const prescript = () => import(/* webpackChunkName: "prescript" */ '@/components/news/prescript/index.vue')  // 心理处方
const presentat = () => import(/* webpackChunkName: "presentat" */ '@/components/news/presentat/index.vue')  // 综合报告  复查管理
const reviewDetail = () => import(/* webpackChunkName: "reviewDetail" */ '@/components/news/presentat/reviewDetail.vue')  // 综合报告  复查管理查看
const presentation = () => import(/* webpackChunkName: "presentation" */ '@/components/news/presentat/presentation.vue')  // 阶段报告
const personal = () => import(/* webpackChunkName: "personal" */ '@/components/personal/index.vue')  //个人中心
const personal_data = () => import(/* webpackChunkName: "personal_data" */ '@/components/personal/personal_data/index.vue')  //个人资料
const slength = () => import(/* webpackChunkName: "slength" */ '@/components/personal/username/slength.vue')  //擅长
const consultation = () => import(/* webpackChunkName: "consultation" */ '@/components/personal/consultation/index.vue')  //我的佣金
const cardRefund = () => import(/* webpackChunkName: "cardRefund" */ '@/components/personal/consultation/cardRefund.vue')  //提现
const myAchieve = () => import(/* webpackChunkName: "myAchieve" */ '@/components/personal/myAchieve/index.vue')  //我的业绩
const achieves = () => import(/* webpackChunkName: "achieves" */ '@/components/personal/myAchieve/achieves.vue')  //零售服务收益
const packService = () => import(/* webpackChunkName: "packService" */ '@/components/personal/myAchieve/packService.vue')  //套餐服务收益
//const inviteFriends = () => import(/* webpackChunkName: "inviteFriends" */ '@/components/personal/inviteFriends/index.vue')  //邀请好友capitalRecord
const capitalRecord = () => import(/* webpackChunkName: "capitalRecord" */ '@/components/personal/capitalRecord/index.vue')  //资金记录
const addbcard = () => import(/* webpackChunkName: "addbcard" */ '@/components/personal/bankCard/addbcard.vue')  //支付密码
const bankCard = () => import(/* webpackChunkName: "bankCard" */ '@/components/personal/bankCard/index.vue')  //卡号管理
const addcard = () => import(/* webpackChunkName: "addcard" */ '@/components/personal/bankCard/addcard.vue')  //添加银行卡
const login= () => import(/* webpackChunkName: "login" */ '@/components/login/index.vue')  //登录
const termsService = () => import(/* webpackChunkName: "termsService" */ '@/components/login/termsService.vue')  //注册
const changePass = () => import(/* webpackChunkName: "changePass" */ '@/components/personal/changePassword/index.vue') //修改密码
const twopass = () => import(/* webpackChunkName: "twopass" */ '@/components/personal/changePassword/twopass.vue') //修改密码二级
const realName = () => import(/* webpackChunkName: "realName" */ '@/components/personal/realName/index.vue') //实名认证
const physician = () => import(/* webpackChunkName: "physician" */ '@/components/personal/realName/physician.vue') //医师认证
const physician1 = () => import(/* webpackChunkName: "physician1" */ '@/components/personal/realName/physician1.vue') //医师认证 基本信息
const physician2 = () => import(/* webpackChunkName: "physician2" */ '@/components/personal/realName/physician2.vue') //医师认证 个人介绍
const physician3 = () => import(/* webpackChunkName: "physician3" */ '@/components/personal/realName/physician3.vue') //医师认证 医生照片 头像
const physician4 = () => import(/* webpackChunkName: "physician4" */ '@/components/personal/realName/physician4.vue') //医师认证 执照认证
const username = () => import(/* webpackChunkName: "username" */ '@/components/personal/username/index.vue')  //个人资料
const hospital = () => import(/* webpackChunkName: "hospital" */ '@/components/personal/username/hospital.vue')  //个人资料--所属医院
const department = () => import(/* webpackChunkName: "department" */ '@/components/personal/username/department.vue')  //个人资料--所属科室
const workTitle = () => import(/* webpackChunkName: "workTitle" */ '@/components/personal/username/workTitle.vue')  //个人资料--所属职称
const goodAt = () => import(/* webpackChunkName: "goodAt" */ '@/components/personal/username/goodAt.vue')  //个人资料--擅长
const searchhz = () => import(/* webpackChunkName: "searchhz" */ '@/components/home/searchhz/index.vue')  //搜索患者
const appDown = () => import(/* webpackChunkName: "appDown" */ '@/components/sharePage/appDown.vue') //app下载页面
const myTeam = () => import(/* webpackChunkName: "myTeam" */ '@/components/personal/myTeam/index.vue') //我的邀请

const caseUpload = () => import(/* webpackChunkName: "caseUpload" */ '@/components/home/caseUpload/index.vue')  //患者  历史病例
const physicians = () => import(/* webpackChunkName: "physicians" */ '@/components/personal/realName/physicians.vue') //历史病例--查看报告

const appointment = () => import(/* webpackChunkName: "appointment" */ '@/components/home/appointment/index.vue')  //首页-复诊预约
const appdetails = () => import(/* webpackChunkName: "appdetails" */ '@/components/home/appointment/appdetails.vue')  //首页-复诊预约详情
//导入页面

Vue.use(Router)

const router = new Router({
  	routes: [
		{ path:"/", redirect: "/wx_Entrance/home"},
		{ path:"/wxFollowPage", name:"wxFollowPage", component: wxFollowPage },  //关注微信的二维码页面
		{ path:"/login", name:"login", component: login },
		{ path:"/wx_Entrance", name:"wx_Entrance", component: wx_Entrance,
		children:[
			{ path:"home", name:"home", component: home, meta:{keepAlive: true}},
					{ path:"share", name:"share", component: share},
			{ path:"dynamic", name:"dynamic", component: dynamic },
			{ path:"news", name:"news", component: news },
					{ path:"personal", name:"personal", component: personal }
		]
		},
		{ path:"/share", name:"share", component: share },  
		{ path:"/termsService", name:"termsService", component: termsService},
		{ path:"/chatSet", name:"chatSet", component: chatSet},
		{ path:"/chatCenter", name:"chatCenter", component: chatCenter},
		{ path:"/chat", name:"chat", component: chat},
		{ path:"/medical", name:"medical", component: medical},
		{ path:"/records", name:"records", component: records},
		{ path:"/indexData", name:"indexData", component: indexData},
		{ path:"/indexDataDet", name:"indexDataDet", component: indexDataDet},
		{ path:"/diet", name:"diet", component: diet },  //饮食
		{ path:"/nutrition", name:"nutrition", component: nutrition },  //营养
		{ path:"/sport", name:"sport", component: sport },  //运动
		{ path:"/prescript", name:"prescript", component: prescript },  //心理
		{ path:"/presentation", name:"presentation", component: presentation },  
		{ path:"/presentat", name:"presentat", component: presentat }, 
		{ path:"/reviewDetail", name:"reviewDetail", component: reviewDetail },
		{ path:"/addPatient", name:"addPatient", component: addPatient},
		{ path:"/personaldata", name:"personaldata", component: personal_data },
		{ path:"/consultation", name:"consultation", component: consultation },
		{ path:"/cardRefund", name:"cardRefund", component: cardRefund },
		{ path:"/myAchieve", name:"myAchieve", component: myAchieve },
		{ path:"/achieves", name:"achieves", component: achieves },
		{ path:"/packService", name:"packService", component: packService },
	//		{ path:"/inviteFriends", name:"inviteFriends", component: inviteFriends },
		{ path:"/capitalRecord", name:"capitalRecord", component: capitalRecord },
		{ path:"/addbcard", name:"addbcard", component: addbcard },
		{ path:"/bankCard", name:"bankCard", component: bankCard },
		{ path:"/addcard", name:"addcard", component: addcard },
		{ path:"/groupManage", name:"groupManage", component: groupManage},
		{ path:"/changePass", name:"changePass", component: changePass},
		{ path:"/twopass", name:"twopass", component: twopass},
		{ path:"/realName", name:"realName", component: realName},
		{ path:"/physician", name:"physician", component: physician},
		{ path:"/physician1", name:"physician1", component: physician1},
		{ path:"/physician2", name:"physician2", component: physician2},
		{ path:"/physician3", name:"physician3", component: physician3},
		{ path:"/physician4", name:"physician4", component: physician4},
		{ path:"/username", name:"username", component: username },
		{ path:"/hospital", name:"hospital", component: hospital },
		{ path:"/department", name:"department", component: department },
		{ path:"/workTitle", name:"workTitle", component: workTitle },
		{ path:"/goodAt", name:"goodAt", component: goodAt },
		{ path:"/searchhz", name:"searchhz", component: searchhz },
		{ path:"/appDown", name:"appDown", component: appDown},
		{ path:"/myTeam", name:"myTeam", component: myTeam},
		
		{ path:"/caseUpload", name:"caseUpload", component: caseUpload},
		{ path:"/physicians", name:"physicians", component: physicians},
		{ path:"/appointment", name:"appointment", component: appointment},
		{ path:"/appdetails", name:"appdetails", component: appdetails},
		{ path: '*', redirect: "/"}  // 404页面重定向
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
const whiteRouteList = [ 'login', 'changePass', 'termsService', 'noticeClause', 'wxFollowPage', 'share', 'personalshare', 'physician', 'physician1', 'physician2', 'physician3', 'physician4' ]

router.beforeEach((to, from, next) => {
  // 不在白名单内，没有登录信息的情况跳转登录页面
  if ((whiteRouteList.indexOf(to.name) == -1) && !localStorage.userInfo) {
    logout(to.fullPath)
    return
  }
 
  // 已经登录，用户不是渠道端。（跳转到系统首页）
  if ((localStorage.userInfo) && (getUserType() != 'doctor')) {
    logout(to.fullPath)
    return
  }
  
  // 已经登录，不能再进入登录页面（跳转到系统首页）
  if ((localStorage.userInfo) && (to.name == 'login')) {
    goHome()
    return
  }
  next()
})

export default router

