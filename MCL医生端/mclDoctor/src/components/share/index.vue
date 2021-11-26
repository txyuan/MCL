<template>
	<div class="sharePage" style="background: #fff;">
		<div id="class_header" ref="element">
			<mt-header v-if="isShowTitleBack" :title="title" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div class="share" :style="{'paddingTop': isShowTitleBack ? '43px' : 0}">
			<div class="share_cont">
				<!-- <div class="share_top">
					<h4>
						{{informdata.name}}
					    <span v-if="informdata.Title || informdata.Department || informdata.City">
					    	（<i>{{informdata.Title}}</i>
					    	<i v-if="informdata.Title && informdata.Department" style="margin:0 5px">|</i>
					    	<i>{{informdata.Department}}</i>
					    	<i v-if="informdata.Department && informdata.City" style="margin:0 5px">|</i>
					    	<i>{{informdata.City}}</i>）
					    </span>
					</h4>
					<p>
						<label>邀请码</label>
						<i>{{informdata.InvitationCode}}</i>
					</p>
				</div> -->
				<div class="logo">
					<img src="@/assets/images/share/share1.jpg" alt="">
					<img src="@/assets/images/share/share2.jpg" alt="">
				</div>
				<div class="share_cmd">
					<img :src="informdata.QRCodeImg" />
					<!-- <p>扫码成为我的好友</p> -->
				</div>
				<img src="@/assets/images/share/share3.jpg" alt="" class="imgDes">
				<div class="share_bot" v-show="isShowBtn">
					<span @click="shareclick">分享</span>
					<!--<label>保存到相册</label>-->
				</div>
			</div>
		</div>
		
		<!--  分享蒙版  -->
		<div id="smark" v-on:click="shareclick" v-show="isSmark">
			<img src="@/assets/images/share.png" />
			<div class="bottom">
				<p class="tip" style="margin-bottom: 100px;font-size: 20px">请点击右上角分享</p>
				<p class="btn">我知道了</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	/*引入微信js-sdk */
	import remoteJs from "@/components/common/remote-js.js"
	remoteJs('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');
	//系统logo
	import logoImg from '@/assets/images/mclogo.png';
	export default {
		name: "index",
		data: () => ({
			title:"分享",
			heigt: '',
			informdata:{},
			
			isShowBtn: true,
			isShowTitleBack: false,
			isSmark: false,
			
			WechatParm: {}, //公众号信息
			shareObj: { //分享信息内容配置
				title: 'MCL',
				link: "", //系统首页地址
				imgUrl: (location.origin + logoImg)
			},
		}),
		methods: {
			getbankcard() {
				let { UserKey,SessionId } = this.$route.query;
				let url = `UserInterface/GetQRCode.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				let href = window.location.href.split('#')[0];
				return this.$post(url, {
					Url: href
				}).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.informdata=data.data;
					this.WechatParm = data.WechatParm;
					this.shareObj.link = `${location.origin}/#/share?UserKey=${UserKey}&SessionId=${SessionId}&from=share&title=邀请好友`
				})
			},
			//点击分享
			shareclick() {
				this.isSmark = !this.isSmark;
			},
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
		mounted() {
			const title = this.$route.query.title
			if(title){
				this.title=title
			}
			this.getbankcard().then(() => {
				if(this.$route.query.from == undefined) {
					this.wxConfig(); //微信配置
					this.wxRead(); //微信read回调
				};
			});
			
			//设置页面的高度
			// let heg = window.innerHeight;
			// let height = "";
			// if(title == "邀请好友"){
			// 	height = heg - 43;
			// }else if(title == "分享"){
			// 	height = heg - 43 - 53;
			// }
			// this.heigt = height;
			//返回按钮  和 分享按钮的显示
			if(title == "邀请好友"){
				this.isShowTitleBack = true;
			};
			if(this.$route.query.from == "share") {
				this.isShowBtn = false;
				this.isShowTitleBack = false;
			};
		}
	}
</script>

<style scoped lang="scss">
	h3 {
		height: 0.44rem;
		font-size: 0.17rem;
		text-align: center;
		line-height: 0.44rem;
		font-weight: normal;
		letter-spacing: 0.02rem;
	}

	.share {
		// background-image: linear-gradient(#e66465, #9198e5);
		// background: url(../../assets/images/sharesbg.png) no-repeat center center;
		// background-size: cover;
		padding-top: 43px;
		.share_cont {
			position: relative;
			width: 93%;
			margin: 0 auto;
			margin-top: 0.15rem;
			background: #fff;
		}
	}

	.share_top {
		padding-bottom: 0.15rem;
		border-bottom: 1px dashed #CDC9C9;

		h4 {
			font-size: 0.2rem;
			color: #333;
			padding: 0.15rem 0 0 4%;
			span {
				font-size: 0.14rem;
				color: #333;
			}
			i{
				font-weight: normal;
			    font-size: 0.14rem;
			    font-style: normal;
			}
		}

		p {
			overflow: hidden;
			padding-top: 0.15rem;

			label {
				width: 0.7rem;
				height: 0.3rem;
				background: #4A8EF4;
				border-radius: 4px;
				color: #fff;
				font-size: 0.15rem;
				display: block;
				text-align: center;
				line-height: 0.3rem;
				float: left;
				margin-left: 4%;
			}

			i {
				font-size: 0.15rem;
				color: #333333;
				float: left;
				margin-left: 0.14rem;
				line-height: 0.3rem;
				font-style: normal;
			}
		}
	}

	.share_cmd {
		padding-top: 0.1rem;
		padding-bottom: 0.15rem;

		img {
			width: 1.66rem;
			display: block;
			margin: 0 auto;
		}

		p {
			font-size: 0.16rem;
			color: #333;
			padding-top: 0.3rem;
			text-align: center;
		}
	}

	.share_bot {
		width: 100%;
		font-size: 0.17rem;
		color: #fff;
		line-height: 0.45rem;
		bottom: 90px;
		left: 0;
		position: fixed;
		text-align: center;
		span {
			display: inline-block;
			width: 80%;
			/*padding-left: 8%;*/
			border: 1px solid #0ac5ca;
			background: #0ac5ca;
			height: 0.45rem;
			/*float: left;*/
			/*background: url(../../../assets/images/fenxiang@2x.png) no-repeat 32% center;*/
			background-size: 0.2rem;
			text-align: center;
			border-radius: 0.23rem;
		}
		.icon {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		/*label {
			display: block;
			width: 30%;
			margin-left: 9.3%;
			float: left;
			padding-left: 6%;
			border: 1px solid #4A8EF4;
			height: 0.40rem;
			background: url(../../assets/images/downxz.png) no-repeat 12% center;
			background-size: 0.2rem;
			text-align: center;
			border-radius: 0.21rem;
		}*/
	}
	#smark{
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0,0,0,.6);
	  text-align: center;
	  z-index: 9;
	}
	#smark img{
	  position: absolute;
	  right: 10%;
	  top: 30px;
	  width: 40%;
	}
	#smark  .bottom{
	  position: absolute;
	  bottom: 80px;
	  color: #ffffff;
	  width: 100%;
	}
	#smark  .bottom .tip{
	  margin-bottom: 30px;
	}
	#smark  .bottom .btn{
	  display: inline-block;
	  border: 1px solid #ffffff;
	  border-radius: 3px;
	  text-align: center;
	  margin: 0 auto;
	  padding: 7px 15px;
	  line-height: 1;
	}

	.logo{
		text-align: center;
		// padding-top: 0.20rem;
		img{
			width: 95%;
		}
	}

	.imgDes{
		width: 90%;
		margin: 0 auto;
		display: block;
	}

	.sharePage{
		padding-top: 1px;
		padding-bottom: 1.5rem;
		min-height: 100vh;
		box-sizing: border-box;
	}
</style>
