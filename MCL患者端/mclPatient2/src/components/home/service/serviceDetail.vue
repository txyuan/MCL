<template>
	<div class="paddimg padding-header">
		<mt-header :title="title" fixed>
			<div slot="left">
				<mt-button icon="back" @click="back"></mt-button>
			</div>
		</mt-header>
		
		<div class="container">
			<div class="detile_lunbo">
				<mt-swipe :auto="4000" :style="{height:screenWidth+'px'}" class="swiper">
					<mt-swipe-item v-for="(item,index) in responseData.goodsImageList" :key="index">
						<img :src="item.goodsImage" alt="" width="100%" :height="screenWidth" crossOrigin="anonymous">
					</mt-swipe-item>
				</mt-swipe>
			</div>

			<div class="detile_shopname">
				<p style="font-size:0.165rem;padding-left: 0.05rem;line-height: 1.6">{{responseData.goodsName}}</p>
				<div class="detile_money">
					<span>￥{{responseData.marketPrice}}</span>
	<!--				<span style="font-size: 0.14rem; color: #999999; text-decoration: line-through;margin-top: 0.02rem;margin-left: 0.1rem">原价：{{responseData.origPrice}}</span>-->
					<label>销量：{{responseData.hasBuyCount}}</label>
					<div class="clear"></div>
				</div>
			</div>


	<!--		<div class="detile_num" v-if="responseData.ismanage == 1">-->
	<!--			<h3>管理天数</h3>-->
	<!--			<div class="detile_nummay">-->
	<!--				<label>{{responseData.manageDays}}天</label>-->
	<!--			</div>-->
	<!--		</div>-->

			<div class="detile_num">
				<h3>选择购买份数</h3>
				<div class="detile_nummay">
					<addSubtraction v-model="num" :item="item" @change="inputChange" class="input" />
				</div>
			</div>

			<!--   详情页   -->
			<div class="com_detail" v-html="responseData.goodsMemo" ref="detailImg"></div>
		</div>

		<!--按钮-->
		<div class="detile_btn">
			<div class="share_bnts">
				<div class="share" @click="showShare"> <i class="icon"></i> <p>分享</p> </div>
				<div class="collection" :class="{'active': responseData.collectionFlag == 1}" @click="updateUserCollection"> <i class="icon"></i> <p>收藏</p> </div>
				<div class="serve" @click="$root.goMessage"> <i class="icon"></i> <p>客服</p> </div>
			</div>
			<div class="btn-group">
				<p class="btn" @click="addshopcar">加入购物车</p>
				<p class="defult-btn" @click="buy">立即购买</p>
			</div>
		</div>

		<!-- 分享页面 -->
		<transition name="fade">
			<div id="mark" style="display: block;" v-show="showPanel" @click="showPanel = false">
				<div class="img-view" @click.stop="">
					<div class="tip">长按图片保存</div>
					<div ref="shareImgDom" class="img-dom">

						<img :src="responseData.goodsImage" alt="" class="productImg">
						<div class="productInfo">
							<span class="productPrice">￥{{responseData.marketPrice}}</span>
							<span class="productName">{{responseData.goodsName}}</span>
						</div>
						<div class="qrcodeWrap">
							<vue-qr :logoSrc="logoImg" :text="shareObj.link" class="qrcode"></vue-qr>
							<p class="qrTip">长按或者扫描查看</p>
						</div>
					</div>
				</div>
				<div class="bottom_panel" @click.stop="">
					<p class="tit">分享当前图片到</p>
					<div class="share_type">
						<ul>
							<li @click="shareType = '给微信好友'; isSmark = true"><img src="@/assets/images/shoppingMall/wx.png" alt=""><p>微信好友</p></li>
							<li @click="shareType = '到朋友圈'; isSmark = true"><img src="@/assets/images/shoppingMall/wx_friend.png" alt=""><p>朋友圈</p></li>
							<!-- <li @click="shareType = '给QQ好友'; isSmark = true"><img src="@/assets/images/shoppingMall/QQ.png" alt=""><p>QQ好友</p></li> -->
							<li @click="$Toast('长按图片保存')"><img src="@/assets/images/shoppingMall/down.png" alt=""><p>保存图片</p></li>
						</ul>
					</div>
					<mt-button type="primary" class="theme-button" size="large" @click.native="showPanel = false">取消</mt-button>
				</div>
			</div>
		</transition>

		<!-- 购物车入口 -->
		<router-link tag="div" to="/shopcar">
			<img src="@/assets/images/shoppingMall/car2.png" alt="" class="buyCar" />
		</router-link>

		<!--  分享蒙版  -->
		<div id="mark" style="display: block;" v-on:click="isSmark = false" v-show="isSmark" class="shareMark">
			<img src="@/assets/images/share.png" />
			<div class="bottom">
				<p class="tip" style="margin-bottom: 100px;font-size: 20px">请点击右上角分享<span>{{shareType}}</span></p>
				<p class="btn">我知道了</p>
			</div>
		</div>
	</div>
</template>

<script>
	import addSubtraction from "@/components/shopCar/productItem/addSubtraction.vue";
	import { drawCanvas } from "@/utils/html2img.js"
	import { updateUserCollection } from "@/api/shopCar.js"
	/*引入微信js-sdk */
	import remoteJs from "@/components/common/remote-js.js"
	remoteJs('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');
	//系统logo
	import logoImg from '@/assets/images/mclogo.png';

	import { getZphone,setRhone } from "@/utils/storage.js"
	export default {
		name: "index",
		data() {
			let pageHref = window.location.href.split('#')[0];
			return {
				title:"",
				productkey: "",  //产品主键
				responseData:{
					goodsId:"",  //产品主键
					goodsDetailId: "",  //
					goodsName:"",  // 产品名称
					price:"",  // 产品价格
					goodsImageList: [],  // 产品图片List
					goodsMemo:"",  // 产品描述
				},
				num:"1",
				item: {
					goodsNum: 1
				},
				rphone : '', // 用户手机号
				// 分享的弹出框
				showPanel: false,
				isSmark: false,
				shareType: '',
				WechatParm: {}, //公众号信息
				shareObj: { //分享信息内容配置
					title: 'MCL',
					desc: '我在医随康发现一个不错的商品，赶快来看看吧。', // 分享描述
					link: `${location.origin}${location.pathname}#${this.$route.path}?from=share`, //系统地址
					imgUrl: ''
				},
				pageHref,
				logoImg,
				html2canavsUrl: ""
			}
		},
		created() {
			// this.getinform ()
		},
		computed: {
			screenWidth: function() {
				return window.innerWidth;
			}
		},
		methods: {
			//   getinform () {
			// 	this.rphone = getZphone()
			// 	this.shareObj.link = `${location.origin}${location.pathname}#${this.$route.path}?from=share&rphone=${this.rphone}`
      // },
			//加减的输入框
			inputChange(val){
				this.num = val
			},

			//获取详情信息
			getDetailInfo() {
				let url = "/UserInterface/mall/getProductDetails.ashx";
				return this.$post(url, {
					productkey: this.productkey,
					Url: this.pageHref
				}).then((data) => {
					data.data.collectionFlag = data.collectionFlag
					this.responseData = data.data
					this.title = this.responseData.ismanage == 1 ? "管理套餐": "产品详情";
					this.WechatParm = data.WechatParm;
					this.shareObj.imgUrl = data.data.goodsImage;
					this.shareObj.title = data.data.goodsName;
					return data;
				})
			},

			//加入购物车
			// addshop() {
			// 	let url = "/UserInterface/cart/updateGoodsNum.ashx";
			// 	let param = {
			// 		goodsId: '',
			// 		goodsPhId: '',
			// 		goodsSpecId: '',
			// 		goodsNum: '',
			// 		IsAddNum: '',
			// 		ABflag: 1
			// 	};
			// 	this.$post(url, param).then((data) => {
			// 		isLoad && this.$Indicator.close();
			// 		callback(data)
			// 		if (data.rspcode != 1) {
			// 			this.$Toast(data.rspdesc)
			// 			return;
			// 		}
			// 		this.$emit('render', data)
			// 	})
			// },

			// 加入购物车
			addshopcar() {
				let url = "UserInterface/cart/updateGoodsNum.ashx";
				let param = {
					goodsId: this.responseData.goodsId,
					goodsNum: this.num,
					goodsSpecId: this.responseData.goodsDetailId,
					IsAddNum: 0,
					ABflag: 1
				}
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						this.$Toast('添加失败！');
						return;
					}
					this.$Toast('添加成功！');
				})
			},
			// 我的购物车
			myshopcar(){
				this.$router.push('/shopcar')
			},
			//立即购买
			buy() {
				let url = "UserInterface/cart/shoppingImmediately.ashx";
				let param = {
					goodsId: this.productkey,
					ABflag: 1,
					goodsNum: this.num
				};
				this.$post(url, param).then((data) => {
					// if (data.rspcode != 1) {
					// 	this.$Toast(data.rspdesc);
					// 	return;
					// }
					this.$router.push({
						path: "/orderindex",
						query: {
							orderFrom: 1,
							ABflag: 1,
							orderType: this.responseData.ismanage == 1 ? 2 : 3
						}
					})
				})
			},
			// 显示分享面板
			showShare(){
				this.showPanel = true
				document.scrollingElement.scrollTop = 0;//让页面滚动到最顶部
				this.$nextTick(() => {
					drawCanvas(".img-dom").then((res) => {
						const shareImgDom = this.$refs.shareImgDom
						shareImgDom.innerHTML = ""
						shareImgDom.appendChild(res)
					})
				})
			},
			// 收藏
			async updateUserCollection(){
				//   收藏状态：0：未收藏，1：已收藏
				await updateUserCollection({key: this.productkey})
				this.responseData.collectionFlag = (this.responseData.collectionFlag == 1 ? "0" : 1)
			},
			back(){
				if(this.$route.query.from == "share"){
					this.$router.push("/wx_Entrance/service")
				}else{
					this.$router.back()
				}
			},
			//回顶部
			goWindowTop() {
				window.scrollTo(0, 0)
			},
			//滑动底部
			// scrollBottom() {
			// 	//是否显示头部
			// 	if (this.getScrollTop() > 55) {
			// 		this.isShowH = true;
			// 	} else {
			// 		this.isShowH = false;
			// 	}
			// 	//是否显示商品详情
			// 	const bodyHeight = document.getElementsByTagName("body")[0].offsetHeight;
			// 	if ((this.getScrollTop() + window.innerHeight + 50) >= bodyHeight) {
			// 		this.setDetailPic();
			// 	}
			// },
			// getScrollTop() {
			// 	var scrollPos;
			// 	if (window.pageYOffset) {
			// 		scrollPos = window.pageYOffset;
			// 	} else if (document.compatMode && document.compatMode != 'BackCompat') {
			// 		scrollPos = document.documentElement.scrollTop;
			// 	} else if (document.body) {
			// 		scrollPos = document.body.scrollTop;
			// 	}
			// 	return scrollPos;
			// },
			//微信配置
			wxConfig() {
				let WechatParm = this.WechatParm;
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: WechatParm.AppId, // 必填，公众号的唯一标识
					timestamp: WechatParm.Timestamp, // 必填，生成签名的时间戳
					nonceStr: WechatParm.NonceStr, // 必填，生成签名的随机串
					signature: WechatParm.Signature, // 必填，签名，
					jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
				});
			},
			//微信read回调
			wxRead() {
				wx.ready(() => {
					this.ShareTimeline();
					this.ShareAppMessage();
					this.ShareQQ();
					this.ShareWeibo();
				})
			},
			// 2.3 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
			ShareTimeline() {
				wx.onMenuShareTimeline(this.shareObj)
			},
			// 2.3 监听“分享给朋友”按钮点击、自定义分享内容及分享结果接口
			ShareAppMessage() {
				wx.onMenuShareAppMessage(this.shareObj)
			},
			// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
			ShareQQ() {
				wx.onMenuShareQQ(this.shareObj)
			},
			// 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
			ShareWeibo() {
				wx.onMenuShareWeibo(this.shareObj)
			}
		},
		async mounted() {
			this.goWindowTop()
			let sKey = this.$route.params.sKey;
			this.productkey = sKey
			await this.getDetailInfo()
			  // 通过转发小工具转发进来的情况，获取链接上的推荐码
      const query = this.$route.query
      if(query.doctorPhone){
            setRhone(query.doctorPhone)
						this.shareObj.link = `${location.origin}${location.pathname}#${this.$route.fullPath}`
						this.wxConfig(); // 微信配置
			      this.wxRead(); // 微信read回调
      }else {
             this.shareObj.link = `${location.origin}${location.pathname}#${this.$route.path}?from=share&rphone=${getZphone()}`
						 this.wxConfig(); // 微信配置
             this.wxRead(); // 微信read回调
      }
			// 分享进来拿手机号
			if(this.$route.query.rphone) {
				 localStorage.setItem('hphone','')
      localStorage.setItem('hphone',this.$route.query.rphone)
    }
		},
		destroyed() {
			// window.removeEventListener("scroll", this.scrollBottom, false)
		},
		components: {
			addSubtraction
		}
	}
</script>
<style lang="scss">
	.com_detail {
		margin-top: 0.1rem;
		p,
		img {
			display: block;
			width: 100%;
      		margin-left: 0!important;
		}
	}
</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.buyCar {
		position: fixed;
		bottom: 20%;
		right: 5%;
		width: 0.6rem;
		height: 0.6rem;
	}

	.paddimg {
		padding-bottom: 0.8rem;
	}

	.return_back {
		position: fixed;
		left: 3%;
		top: 0.1rem;
		width: 0.3rem;
		height: 0.3rem;
		z-index: 9;
	}

	.detile_lunbo {
		/*height: 3.75rem*/
	}

	.detile_lunbo img {
		width: 100%;
	}

	.detile_days {
		width: 100%;
		height: 0.3rem;
		background: #FFDCDC;
		color: #FF3D3D;
		text-align: center;
		line-height: 0.3rem;
		font-size: 0.14rem;
	}

	.detile_nav ul {
		white-space: nowrap;
		height: 0.5rem;
		display: inline-block;
	}

	.detile_nav ul li {
		display: inline-block;
		text-align: center;
	}

	.detile_nav ul li>a {
		height: 0.5rem;
		display: inline-block;
		margin: 0 0.125rem;
		width: 0.7rem;
		color: #313131;
	}

	.detile_nav ul li a.tab0,
	.detile_nav ul li a.tab1 {
		color: #FD9419;
	}

	.detile_nav ul li a.router-link-active {
		border-bottom: 0.02rem solid #FF1E41;
		color: #FB0033;
	}

	.detile_shopname {
		width: 94%;
		background: #fff;
		padding: 0 3%;

	}

	.detile_shopname p {
		font-size: 0.15rem;
		color: #333;
		line-height: 0.22rem;
		padding-top: 0.1rem;
		@include ellipsis(2);
	}

	.detile_shopname .detile_money {
		padding-top: 0.06rem;
		overflow: hidden;
		padding-bottom: 0.1rem;
	}

	.detile_shopname .detile_money span {
		color: #EC5D4E;
		font-size: 0.2rem;
		display: block;
		float: left;
	}

	.detile_shopname .detile_money label,
	.detile_shopname .detile_money i {
		color: #999999;
		font-size: 0.14rem;
		display: block;
		float: right;
		font-style: normal;
	}

	.detile_nav ul li p {
		font-size: 0.16rem;
		text-align: center;
		margin-top: 0.03rem;
	}

	.detile_nav ul li span {
		font-size: 0.14rem;
		text-align: center;
	}

	.evaluation h3 {
		font-weight: normal;
		width: 94%;
		margin: 0 auto;
		line-height: 0.45rem;
	}

	.evaluation p {
		width: 94%;
		margin: 0 auto;
		font-size: 0.14rem;
		color: #404040;
		margin-top: 0.1rem;
	}

	.evaluation ul {
		overflow: hidden;
		width: 94%;
		margin: 0 auto;
		margin-top: 0.08rem;
	}

	.evaluation ul li {
		overflow: hidden;
	}

	.evaluation ul li:first-child {
		margin-left: 0;
	}

	.evaluation ul li img {
		height: 50px;
	}

	.show_name img {
		width: 0.22rem;
		height: 0.22rem;
		float: left;
	}

	.show_name span {
		height: 0.22rem;
		display: block;
		float: left;
		font-size: 0.14rem;
		line-height: 0.22rem;
		margin-left: 0.08rem;
		color: #202020;
	}

	.show_name label {
		font-size: 0.13rem;
		color: #606060;
		display: block;
		float: right;
		line-height: 0.22rem;
	}

	.show_allpl label {
		display: block;
		width: 1rem;
		height: 0.24rem;
		border-radius: 0.12rem;
		position: absolute;
		left: 50%;
		margin-left: -0.5rem;
		top: 0.15rem;
		border: 1px solid #FF1E41;
		text-align: center;
		line-height: 0.25rem;
		font-size: 0.12rem;
		color: #FF1E41;
	}

	.continue {
		width: 100%;
		color: #606060;
		text-align: center;
		font-size: 0.14rem;
		line-height: 0.55rem;
	}

	.com_coment {
		width: 100%;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}

	.detile_num {
		width: 94%;
		padding: 0 3%;
		background: #fff;
		margin-top: 0.1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detile_num .themeRed {
		font-size: 0.14rem;
		padding-left: 10px;
	}

	.detile_num h3 {
		font-weight: normal;
		font-size: 0.15rem;
		color: #333333;
		padding: 0.1rem 0;
	}

	.detile_num ul li {
		padding: 0.08rem 0;
		border-bottom: 1px solid #EEEEEE;
	}

	.detile_num ul li p {
		overflow: hidden;
	}

	.detile_num ul li p label {
		color: #333;
		font-size: 0.15rem;
		float: left;
	}

	.detile_num ul li p i {
		font-style: normal;
		color: #FF3D3D;
		font-size: 0.14rem;
		float: right;
	}

	.detile_num ul li span {
		overflow: hidden;
		margin-top: 0.06rem;
		display: block;
	}

	.detile_num ul li span label,
	.detile_num ul li span i {
		float: left;
		color: #999999;
		font-size: 0.14rem;
		font-style: normal;
		margin-top: 0.02rem;
		margin-right: 0.16rem;
	}

	.detile_right {
		float: right;
	}

	.detile_moneys {
		font-size: 0.15rem;
		height: 0.45rem;
		background: #fff;
		color: #333;
		line-height: 0.45rem;
		padding-left: 3%;
		margin-top: 0.05rem;
	}

	.detile_moneys span {
		color: #FF3D3D;
	}

	.detile_allmoney {
		width: 100%;
		background: #fff;
		overflow: hidden;
		padding: 0.05rem 0;
		margin-top: 0.05rem;
	}

	.detile_allmoney p {
		width: 33.333333%;
		float: left;
		border-left: 1px solid #EEEEEE;
		box-sizing: border-box;
	}

	.detile_allmoney p span,
	.detile_allmoney p label {
		display: block;
		text-align: center;
		font-size: 0.15rem;
		margin-top: 0.06rem;
		padding-bottom: 0.04rem;
	}

	.detile_pingj {
		width: 94%;
		padding: 0 3%;
		background: #fff;
		margin-top: 0.1rem;
	}

	.detile_pingj .detile_pingjt {
		overflow: hidden;
		height: 0.45rem;
		font-size: 0.15rem;
		line-height: 0.45rem;
	}

	.detile_pingj .detile_pingjt h3 {
		font-weight: normal;
		color: #333333;
		float: left;
		font-size: 0.15rem;
	}

	.detile_pingj .detile_pingjt span {
		float: right;
		display: block;
		color: #666;
		width: 0.9rem;
		background: url("https://resource.jtsc.club/jiantou_right_h@2x.png") no-repeat right center;
		background-size: 0.3rem;
	}

	.detile_names {
		overflow: hidden;
		padding: 0.04rem 0;
	}

	.detile_names img {
		height: 0.3rem;
		float: left;
	}

	.detile_names span {
		height: 0.3rem;
		display: block;
		float: left;
		font-size: 0.15rem;
		color: #333535;
		line-height: 0.3rem;
		margin-left: 0.06rem;
	}

	.detile_names label {
		font-size: 0.12rem;
		color: #999999;
		display: block;
		float: right;
		line-height: 0.3rem;
	}

	.detile_pingj p {
		font-size: 0.15rem;
		color: #333535;
		margin-top: 0.04rem;
	}

	.detile_pingj .detile_pjt {
		overflow: hidden;
		margin-top: 0.1rem;
	}

	.detile_pingj .detile_pjt img {
		width: 32%;
		float: left;
		margin-left: 2%;
		padding-bottom: 0.1rem;
	}

	.detile_pingj .detile_pjt img:nth-child(1) {
		margin-left: 0;
	}

	.detile_btn {
		width: 100%;
		height: 0.5rem;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.detile_btn .btn-group {
		width: 60%;
    	margin-left: 2%;
		height: 0.35rem;
		margin-top: 0.08rem;
		border-radius: 0.175rem;
		overflow: hidden;
		float: left;
		display: flex;
		border: 1px solid #0ac5ca;
		box-sizing: border-box;
	}

	.detile_btn .btn-group>p {
		flex: 1;
		text-align: center;
		font-size: 0.14rem;
		line-height: 0.35rem;
	}

	.detile_btn .btn {
		background: #0ac5ca;
		color: #fff;
	}

	.detile_btn .defult-btn {
		color: #0ac5ca;
		box-sizing: border-box;
	}
	
	.detile_btn .share_bnts{
		width: 35%;
		float: left;
		display: flex;
		justify-content: space-around;
		font-size: 0.12rem;
		margin-top: 0.08rem;
		text-align: center;
		color: #666;
		.icon{
			display: inline-block;
			width: 0.18rem;
			height: 0.18rem;
			background: url("../../../assets/images/心@2x.png") no-repeat center;
			background-size: 0.18rem;
		}
		.collection .icon{
			background-image: url("../../../assets/images/心@2x.png");
		}
		.collection.active .icon{
			background-image: url("../../../assets/images/心备份@2x.png");
		}
		.share .icon{
			background-image: url("../../../assets/images/fenxiang@2x.png");
		}
		.serve .icon{
			background-image: url("../../../assets/images/keFucopy@2x.png");
		}
	}
	.myc_adress {
		z-index: 99;
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(000, 000, 000, 0.5);
	}

	.myc_cadress {
		width: 100%;
		height: 4.6rem;
		background: #fff;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.myc_chose {
		width: 100%;
		height: 0.44rem;
		border-bottom: 1px solid #EEEEEE;
		position: relative;
	}

	.myc_chose p {
		text-align: center;
		line-height: 0.45rem;
		font-size: 0.15rem;
		color: #666;
	}

	.myc_chose span {
		display: block;
		width: 0.2rem;
		height: 0.2rem;
		position: absolute;
		right: 3%;
		top: 0.12rem;
		background: url("https://resource.jtsc.club/bianji_car_quxiao@2x.png") no-repeat center center;
		background-size: 0.14rem 0.14rem;
	}

	.myc_adul {
		height: 3.4rem;
		overflow-y: auto;
	}

	.myc_adlist {
		overflow: hidden;
		height: 0.7rem;
		border-bottom: 1px solid #eee;
		background: url("https://resource.jtsc.club/jiantou_right_h@2x.png") no-repeat 97% center;
		background-size: 0.24rem 0.24rem;
	}

	.myc_adlist .myc_actv {
		width: 0.44rem;
		height: 0.7rem;
		display: block;
		float: left;
		background: url("https://resource.jtsc.club/select@2x.png") no-repeat center center;
		background-size: 0.18rem 0.18rem;
	}

	.myc_adlist .myc_actv.myc_actve {
		background: url("https://resource.jtsc.club/select_click@2x.png") no-repeat center center;
		background-size: 0.18rem 0.18rem;
	}

	.myc_acont p {
		overflow: hidden;
		font-size: 0.15rem;
		color: #333;
		margin-top: 0.13rem;
	}

	.myc_acont p i {
		font-style: normal;
		margin-left: 0.1rem;
	}

	.myc_acont p label {
		width: 0.5rem;
		height: 0.18rem;
		border: 1px solid #FF3D3D;
		font-size: 0.12rem;
		color: #FF3D3D;
		text-align: center;
		line-height: 0.19rem;
		float: right;
		display: none;
		margin-right: 0.4rem;
	}

	.myc_acont p label.mra {
		display: block;
	}

	.myc_acont u {
		text-decoration: none;
		font-size: 0.13rem;
		color: #666;
		margin-top: 0.07rem;
		display: block;
	}

	.myc_addadrs {
		font-size: 0.15rem;
		color: #FF3D3D;
		text-align: center;
		line-height: 0.36rem;
	}

	.myc_okbtn {
		width: 88%;
		background: #FF3D3D;
		height: 0.4rem;
		display: block;
		text-align: center;
		line-height: 0.4rem;
		color: #FFFFFF;
		font-size: 0.16rem;
		position: absolute;
		border-radius: 0.2rem;
		margin: 0 auto;
		left: 50%;
		margin-left: -44%;
		bottom: 0.2rem;
	}

	.myc_adliets {
		width: 94%;
		padding: 0 3%;
		height: 0.44rem;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		font-size: 0.15rem;
	}

	.myc_adliets span {
		display: block;
		width: 0.6rem;
		line-height: 0.44rem;
		float: left;
		color: #202020;
		text-align: right;
		margin-right: 5%;
	}

	.myc_adliets label {
		display: block;
		width: 60%;
		float: left;
		line-height: 0.44rem;
		color: #FF3D3D;
	}

	.myc_adliets input {
		display: block;
		width: 60%;
		float: left;
		border: none;
		height: 0.44rem;
		font-size: 0.14rem;
	}

	.myc_admarg {
		border-top: 9px solid #FAFAFA;
	}

	.detile_nummay {
		height: 0.26rem;
		overflow: hidden;

		label {
			font-size: 0.14rem;
			color: #999;
		}
	}

	.detile_nummay span {
		width: 0.26rem;
		display: block;
		float: left;
		font-size: 0.16rem;
		color: #333;
		text-align: center;
		line-height: 0.27rem;
		border-left: 1px solid #eee;
		box-sizing: border-box;
	}

	.detile_nummay span:nth-child(1) {
		border-left: none;
		border-right: 1px solid #eee;
	}

	.detile_nummay input {
		width: 0.5rem;
		height: 0.26rem;
		display: block;
		float: left;
		font-size: 0.14rem;
		color: #333;
		text-align: center;
	}

	.com_detail {
		background: #ffffff;
		word-break: break-all;
	}

	.detile_prices {
		font-size: 0.2rem;
		color: #FF3D3D;
		margin-top: 0.04rem;
		// text-align: right;
	}

	.detile_price {
		font-size: 0.14rem;
		color: #999;
		margin-top: 0.02rem;
	}

	/*懒加载图片的背景*/
	img[lazy=loading],
	img[lazy=error] {
		background: url("https://resource.jtsc.club/zwt_banner@2x.png") no-repeat center;
		background-size: cover;
	}

	img {
		width: 100%;
		// height: 1.6rem;
	}

	.detail_pj {
		margin-top: 0.1rem;
		padding: 0 3%;
		background: #fff;

		h3 {
			overflow: hidden;
			font-weight: 400;
			padding: 0.1rem 0;
			font-size: 0.15rem;

			span {
				float: left;
				color: #333;
			}

			label {
				float: right;
				color: #999;
			}
		}

		.detail_name {
			.detail_pic {
				line-height: 0.32rem;
				padding: 0.04rem 0;
				overflow: hidden;

				img {
					border-radius: 50%;
					float: left;
					height: 0.32rem;
					width: 0.32rem;
				}

				span {
					float: left;
					color: #333535;
					font-size: 0.15rem;
				}

				label {
					float: right;
					color: #999;
					font-size: 0.12rem;
				}
			}

			p {
				color: #333535;
				font-size: 0.15rem;
				line-height: 0.26rem;
			}

			.detail_img {
				padding: 0.1rem 0;
				overflow: hidden;

				img {
					float: left;
					width: 32%;
					margin-left: 2%;

					&:first-child {
						margin-left: 0;
					}
				}
			}
		}
	}

	// 分享面板
	.bottom_panel{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		border-top-left-radius: 0.08rem;
		border-top-right-radius: 0.08rem;
		text-align: center;
		padding: 0.1rem 0.15rem;
		.tit,.cancel{
			line-height: 0.45rem;
		}
		.share_type{
			padding: 0.1rem;
			margin-bottom: 0.05rem;
			ul{
				display: flex;
				justify-content: space-around;
				font-size: 0.14rem;
			}
			
			img{
				width: 0.5rem;
				width: 0.5rem;
			}
		}
	}
	.img-view{
		position: absolute;
		top: 40px;
		bottom: 2.2rem;
		left: 0;
		right: 0;
		width: 200px;
		margin: auto;
		>>>img{
			width: 100%;
			height: auto;
			display: block;
		}
		.tip{
			font-size: 0.12rem;
			text-align: center;
			line-height: 0.2rem;
			color: #FFFFFF;
		}
		.img-dom{
			position: absolute;
			top: 0.2rem;
			bottom: 0;
			left: 0;
			right: 0;
			background: #FFFFFF;
			border-radius: 5px;
    		overflow: hidden;
			// padding: 0.05rem 0;
			.productImg{
				height: 200px;
				width: 200px;
			}
			.productInfo{
				padding: 0.1rem;
			}
			.productName{
				font-size: 14px;
				display: block;
				height: 40px;
				overflow: hidden;
			}
			.productPrice{
				color: #EC5D4E;
    			font-size: 0.18rem;
				display: block;
			}
			.qrcodeWrap{
				text-align: center;
				margin-top: -5px;
				.qrcode{
					width: 42%;
					display: block !important;
					margin: 0 auto;
				}
				.qrTip{
					font-size: 0.12rem;
				}
			}
			
		}
	}


	.shareMark{
		img {
			position: absolute;
			right: 10%;
			top: 30px;
			width: 40%;
		}

		.bottom {
			position: absolute;
			bottom: 80px;
			color: #ffffff;
			width: 100%;
			text-align: center;
		}

		.bottom .tip {
			margin-bottom: 30px;
		}

		.bottom .btn {
			display: inline-block;
			border: 1px solid #ffffff;
			border-radius: 3px;
			text-align: center;
			margin: 0 auto;
			padding: 7px 15px;
			line-height: 1;
		}
	}
	
</style>
