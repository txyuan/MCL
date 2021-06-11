<template>
	<div style="background: #fff;">
		<div id="class_header">
			<mt-header title="邀请好友" fixed class="borderBottom">
				<div slot="left" v-show="isShowBtn">
					<router-link to="/wx_Entrance/personal" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div :style="{height:heigt+'px'}" class="share">
			<div class="share_cont">
				<div class="share_top">
					<h4>{{UserName}} <i v-if="City">（{{City}}）</i></h4>
					<!--<span>{{Title}} &nbsp;&nbsp;|&nbsp;&nbsp; {{Department}}</span>-->
					<!--<span></span>-->
					<p>
						<label>邀请码</label>
						<i>{{InvitationCode}}</i>
					</p>
				</div>
				<div class="share_cmd">
					<img :src="QRCodeImg" />
					<p>扫码成为我的好友</p>
				</div>
				<div class="share_bot" v-show="isShowBtn">
					<span @click="shareclick"> <img src="@/assets/images/分享备份@2x.png" class="icon"/>分享</span>
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
			City: '', //城市
			UserName: '', //用户姓名
			Department: '', //科室
			Title: '', //职称
			InvitationCode: '', //邀请码
			QRCodeImg: '', //二维码图片
			heigt: '',
			isShowBtn: true,
			isSmark: false,

			WechatParm: {}, //公众号信息
			shareObj: { //分享信息内容配置
				title: 'MCL',
				link: "", //系统首页地址
				imgUrl: (location.origin + logoImg)
			},
		}),
		methods: {
			getfriend() {
				let { UserKey,SessionId } = this.$route.query;
				let url = `UserInterface/GetQRCode.ashx?UserKey=${UserKey}&SessionId=${SessionId}`;
				let href = window.location.href.split('#')[0];
				return this.$post(url, {
					Url: href
				}).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					this.City = data.data.City;
					this.UserName = data.data.name;
					this.Department = data.data.Department;
					this.Title = data.data.Title;
					this.InvitationCode = data.data.InvitationCode;
					this.QRCodeImg = data.data.QRCodeImg;
					this.WechatParm = data.WechatParm;
					this.shareObj.link = `${location.origin}/#/inviteFriends?UserKey=${UserKey}&SessionId=${SessionId}&from=share`
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
			let heg = window.innerHeight;
			let height = heg - 43;
			this.heigt = height;
			this.getfriend().then(() => {
				if(this.$route.query.from == undefined) {
					this.wxConfig(); //微信配置
					this.wxRead(); //微信read回调
				};
			});
			if(this.$route.query.from == "share") {
				this.isShowBtn = false;
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
		padding-top: 43px;
		background: url(../../../assets/images/sharebg.png) no-repeat center center;
		background-size: cover;
		.share_cont {
			position: relative;
			width: 93%;
			margin: 0 auto;
			height: 95%;
			top: 2.5%;
			background: #fff;
			border-radius: 6px;
		}
	}
	
	.share_top {
		padding-bottom: 0.15rem;
		border-bottom: 1px dashed #CDC9C9;
		h4 {
			font-size: 0.2rem;
			color: #333;
			padding: 0.15rem 0 0 4%;
		}
		i{
			font-weight: normal;
			font-size: 0.14rem;
			font-style: normal;
		}
		span {
			font-size: 0.15rem;
			color: #333;
			display: block;
			padding: 0.14rem 0 0 4%;
		}
		p {
			overflow: hidden;
			padding-top: 0.15rem;
			label {
				width: 0.7rem;
				height: 0.3rem;
				background: #FF3D3D;
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
		padding-top: 0.2rem;
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
		font-size: 0.16rem;
		color: #FF3D3D;
		line-height: 0.40rem;
		bottom: 90px;
		left: 0;
		position: fixed;
		text-align: center;
		span {
			display: inline-block;
			width: 80%;
			/*padding-left: 8%;*/
			border: 1px solid #FF3D3D;
			height: 0.40rem;
			/*float: left;*/
			/*background: url(../../../assets/images/fenxiang@2x.png) no-repeat 32% center;*/
			background-size: 0.2rem;
			text-align: center;
			border-radius: 0.21rem;
			/*margin-left: 9.3%;*/
		}
		.icon {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		/*label{
		  display: block;
		  width: 30%;
		  margin-left: 9.3%;
		  float: left;
		  padding-left: 6%;
		  border: 1px solid #FF3D3D;
		  height: 0.40rem;
		  background: url(../../../assets/images/xiazai@2x.png) no-repeat 12% center;
		  background-size: 0.2rem;
		  text-align: center;
		  border-radius: 0.21rem;
	  }*/
	}
	
	#smark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .6);
		text-align: center;
		z-index: 9;
	}
	
	#smark img {
		position: absolute;
		right: 10%;
		top: 30px;
		width: 40%;
	}
	
	#smark .bottom {
		position: absolute;
		bottom: 80px;
		color: #ffffff;
		width: 100%;
	}
	
	#smark .bottom .tip {
		margin-bottom: 30px;
	}
	
	#smark .bottom .btn {
		display: inline-block;
		border: 1px solid #ffffff;
		border-radius: 3px;
		text-align: center;
		margin: 0 auto;
		padding: 7px 15px;
		line-height: 1;
	}
</style>