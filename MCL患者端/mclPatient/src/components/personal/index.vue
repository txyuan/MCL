<template>
	<div>
		<mt-header fixed title="我的"></mt-header>
		<div class="content">

			<router-link to="/personaldata" style="overflow: hidden;display: block;">
				<div class="person_info">
					<img v-lazy="repData.ImgUrl" style="width:0.64rem;height:0.64rem;border-radius: 0.32rem">
					<div class="info">
						<p class="name">{{repData.Nickname}}</p>
						<p class="tel">{{repData.Account}}</p>
					</div>
					<div class="person_type">
						<i class="mint-cell-allow-right"></i>
					</div>
				</div>
			</router-link>

			<div class="person_menu">
				<h3>我的订单</h3>
				<div class="middle-cell">

					<router-link :to="'/personalnutrition'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/筛选@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">营养筛查</p>
						</div>
					</router-link>

					<router-link :to="'/managePackage'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/医疗-01@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">管理套餐</p>
						</div>
					</router-link>

					<router-link :to="'/personalgetproduct'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/shangpindingdan.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">商品订单</p>
						</div>
					</router-link>

					<router-link :to="'/activityOrder'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/huodongdiangdan.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">活动订单</p>
						</div>
					</router-link>

					<router-link to="/vipOrder">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/niankadingdan.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">会员年卡</p>
						</div>
					</router-link>
				</div>
			</div>

			<div class="person_menu">
				<h3>我的档案</h3>
				<div class="middle-cell">
					
					<router-link :to="'/healthydan'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/记录-面备份 2.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">健康档案</p>
						</div>
					</router-link>
					<router-link to="/eyeconme">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/meiriqiandao.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">报告查询</p>
						</div>
					</router-link>
					<router-link :to="'/impactAsses'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/jieduanbaogao.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">效果评价</p>
						</div>
					</router-link>
					
					<router-link :to="'/review'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/fuchaguanli.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">复查管理</p>
						</div>
					</router-link>
					
					<router-link :to="'/account'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/qinshuzhanghao.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">亲属账号</p>
						</div>
					</router-link>
				</div>

				<div class="middle-cell">
					<router-link :to="`/inviteFriends?UserKey=${UserKey}&SessionId=${SessionId}`">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/erweima@2x.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">邀请好友</p>
						</div>
					</router-link>
					<router-link to="/goodFriend">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/wodehaoyou.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">我的好友</p>
						</div>
					</router-link>

					<router-link :to="'/points'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/wodejifen.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">我的福利</p>
						</div>
					</router-link>
					<router-link :to="'/homeSignin'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/meiriqiandao.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">每日签到</p>
						</div>
					</router-link>
					
					<router-link :to="'/personalreceivingadress'">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/wodedizhi.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">我的地址</p>
						</div>
					</router-link>

					
				</div>
				<div class="middle-cell">
					<router-link to="/nowmoney">
						<div class="cell">
							<div class="row">
								<img src="@/assets/images/yueb.png" style="width: 0.25rem;height: 0.25rem;" alt="">
							</div>
							<p class="row">我的余额</p>
						</div>
					</router-link>
				</div>
			</div>
		</div>
		<div class="linkef" v-show="ewmshow">
			<div class="linkefnr">
				<img src="https://resource.jtsc.club/bianji_car_quxiao@2x.png" class="closewm" @click="closewms" />
				<h2>
					<img src="@/assets/images/kefloho.png" />
					<label>万象商纬</label>
				</h2>
				<img src="@/assets/images/wxewm.jpg" class="imgewm" />
				<span>扫描二维码，加客服微信</span>
				<span>微信号：sg50675772</span>
				<p>电话客服：400电话开通中</p>
				<!-- <p style="margin-top: 0.02rem;">客服热线2：18218494793</p> -->
			</div>
		</div>
	</div>
</template>

<script>
	// import shopMallCode from "@/assets/images/kefu.jpg";  //商城二维码的图片
	// import closeImg from "@/assets/images/closeIcon.png";  //商城二维码的关闭按钮图片
	// import userImg from "@/assets/images/morentouxiang.jpg";  //用户头像
	export default {
		name: "personal",
		data: () => ({
			shopMallCode: "https://resource.jtsc.club/kefu.jpg",
			closeImg: "https://resource.jtsc.club/closeIcon.png",
			UserKey: '',
			SessionId: '',
			isShow: false,
			repData: {
				ImgUrl: "", //头像地址
				ContactName: "", //姓名
				ContactPhone: "", //手机号
				UserType: "", //用户会员类型    1.图片会员   2.vip会员   3.合伙人
				UserTypeShow: "", //用户会员类型
				Commission: "", //贡献值
				Achievement: "", //业绩
				Balance: "", //余额
				Quota: "", //配额
				TotalPayVGScore: "", //金豆
				VGScore: "", //积分
				TeamNumber: "" //团队人数
			},
			ewmshow: false
		}),
		methods: {
			// 是否显示事业版
			showsy() {
				if (this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
			//个人信息
			information() {
				this.$Indicator.loading();
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					this.$Indicator.close();
					let model = data.data;
					if (model) {
						this.repData = model;
					}
				})
			},
			//我的客服
			linkf() {
				this.ewmshow = true;
			},
			closewms() {
				this.ewmshow = false;
			},
			//是否实名认证
			isrealname() {
				let url = "UserInterface/RealNameAuthenticationCheck.ashx";
				this.$post(url).then((data) => {
					if (data.rspCode == 0) {
						this.$Toast(data.rspDesc);
						return;
					} else if (data.rspCode == 2) {
						this.$Toast(data.rspDesc);
						this.$router.push('/realName');
					} else {
						this.$router.push('/realName');
					}
				})
			},
			//商家是否认证
			merchant() {
				let url = "UserInterface/BusinessUnion/BusinessAuthenticationCheck.ashx";
				let param = {
					flag: 1
				};
				this.$post(url, param).then((data) => {
					if (data.rspCode == 0) {
						this.$Toast(data.rspDesc);
						return;
					}
					if (data.checkFlag == 0) {
						this.$router.push('/merchantCert');
					} else if (data.checkFlag == 1) {
						this.$router.push('/merchantsubmit');
					} else if (data.checkFlag == 2) {
						this.$Toast('您已完成商家认证');
					}
				})
			},
			//商家是否认证
			comanage(numb) {
				let url = "UserInterface/BusinessUnion/BusinessAuthenticationCheck.ashx";
				let param = {
					flag: numb
				};
				this.$post(url, param).then((data) => {
					if (data.rspCode == 0) {
						this.$Toast(data.rspDesc);
						return;
					}
					if (data.checkFlag == 0) {
						this.$Toast('请先认证商家');
					} else if (data.checkFlag == 1) {
						this.$Toast('您的商家还处于审核状态，请您耐心等待');
					} else if (data.checkFlag == 2) {
						if (numb == 1) {
							this.$router.push('/comManage');
						} else {
							this.$Toast('请先编辑商家信息');
						}
					} else if (data.checkFlag == 3) {
						this.$router.push('/commodity');
					}
				})
			}
		},
		created() {
			if (localStorage.userInfo) {
				this.UserKey = JSON.parse(localStorage.userInfo).UserKey;
				this.SessionId = JSON.parse(localStorage.userInfo).SessionId;
			}
			this.information();
		}
	}
</script>
<style>

</style>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	//头像部分
	.person_info {
		padding: 0.24rem 0.10rem;
		padding-left: 0.20rem;
		background: linear-gradient(106deg, rgba(237, 165, 93, 1) 0%, rgba(255, 198, 144, 1) 100%);
		;
		display: flex;
		position: relative;
		margin-bottom: 0.17rem;

		img {
			margin-right: 0.10rem;
		}

		.info {
			flex: 1;
			height: 64px;
			display: flex;
			flex-wrap: wrap;
			align-content: space-around;

			&>p {
				width: 100%;
				font-size: 0.18rem;
				color: #FFFFFF;
			}

			&>p.name {
				@include ellipsis(1);
			}
		}

		.person_type {
			line-height: 64px;
			padding-right: 28px;
			color: #FFFFFF;
		}

		.mint-cell-allow-right::after {
			border: solid 2px #ffffff;
			border-bottom-width: 0;
			border-left-width: 0;
		}

		.person_type span {
			padding: 6px 0;
			padding-left: 28px;
			font-size: 0.14rem;
			background: url("https://resource.jtsc.club/putong@2x.png") no-repeat 2px center;
			background-size: 22px;
		}

		.person_type span.vip {
			background-image: url("https://resource.jtsc.club/vip@2x.png");
		}

		.person_type span.hehuoren {
			background-image: url("https://resource.jtsc.club/hehuo@2x.png");
		}
	}

	.content {
		padding-top: 43px;
		padding-bottom: 56px;
	}

	/*常用功能*/
	.person_menu {
		background: #fff;
		margin-bottom: 0.17rem;

		h3 {
			font-size: 0.15rem;
			/*background: #F9D6D6;*/
			font-weight: normal;
			padding: 0.08rem 0 0.08rem 3%;
		}
	}

	//中间余额部分
	.middle-cell {
		background: #fff;
		display: flex;
		justify-content: space-between;
		height: 72px;
		width: 94%;
		margin: 0 auto;
		margin-top: 0.08rem;

		.cell {
			height: 100%;
			flex: 1;
			background: #ffffff;
			text-align: center;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			justify-content: center;
			font-size: 0.16rem;
			color: $color40;

			&:nth-child(2) {
				margin: 0 0.05rem;
			}

			.row {
				width: 100%;

				img {
					vertical-align: middle;
				}

				p {
					display: inline-block;
					vertical-align: middle;
				}
			}

			.row:last-child {
				margin-top: 0.08rem;
				font-size: 0.13rem;
			}
		}
	}

	.resetlogin {
		padding: 0 0.1rem;
		background: #FF1E41;
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 0.15rem;
		color: #fff;
		margin-top: 0.2rem;
		border-radius: 4px;
		margin-bottom: 10px;
	}

	#mark {
		z-index: 9999999;

		.close {
			position: absolute;
			top: 10%;
			right: 10%;
		}

		.code_wrap {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.code_inner {
			width: 80%;
			box-sizing: border-box;
			background: #FFF;
			padding: 20px;
		}
	}

	.person_shouyi {
		background: #fff;
		width: 100%;
		margin-top: 0.06rem;

		h3 {
			font-size: 0.15rem;
			font-weight: 200;
			background: #E2F2FA;
			color: #333;
			padding: 0.08rem 0 0.08rem 3%;
		}

		.person_yej {
			overflow: hidden;
			padding-bottom: 0.1rem;
			height: 1.0rem;

			.person_ye {
				width: 33.33%;
				float: left;
				position: relative;

				img {
					width: 0.56rem;
					position: absolute;
					left: 50%;
					top: 0.14rem;
					margin-left: -0.27rem;
				}

				span {
					display: block;
					text-align: center;
					margin-top: 0.78rem;
					color: #333;
					font-size: 0.15rem;
				}
			}
		}
	}

	.linkef {
		width: 100%;
		height: 100vh;
		background: rgba(000, 000, 000, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;

		.linkefnr {
			width: 70%;
			padding: 0 6%;
			height: 4.06rem;
			background: #fff;
			position: absolute;
			left: 50%;
			margin-left: -41%;
			top: 50%;
			margin-top: -2.03rem;
			border-radius: 6px;

			.closewm {
				width: 0.2rem;
				height: 0.2rem;
				position: absolute;
				right: 3.5%;
				top: 0.1rem;
			}

			h2 {
				font-weight: normal;
				padding: 0;
				padding-top: 0.2rem;
				overflow: hidden;

				img {
					width: 0.3rem;
					height: 0.3rem;
					display: block;
					float: left;
				}

				label {
					font-size: 0.14rem;
					float: left;
					line-height: 0.3rem;
					margin-left: 0.1rem;
				}
			}

			.imgewm {
				width: 2.6rem;
				height: 2.6rem;
				display: block;
				margin: 0 auto;
			}

			span {
				font-size: 0.14rem;
				color: #666;
				display: block;
				width: 100%;
				text-align: center;
				margin-bottom: 0.03rem;
			}

			p {
				display: block;
				font-size: 0.2rem;
				color: red;
				padding: 0 3%;
				text-align: center;
				margin-top: 0.1rem;
			}
		}
	}

	.person_xiaozi {
		h4 {
			height: 0.44rem;
			padding: 0 3%;
			width: 94%;
			font-size: 0.15rem;
			font-weight: normal;
			line-height: 0.45rem;
			position: relative;
			border-bottom: 1px solid #DFE6E7;

			.xialjt {
				display: block;
				position: absolute;
				right: 2%;
				top: 0.11rem;
				height: 0.22rem;
				width: 0.3rem;
				background: url('./../../assets/images/jiantou@2x.png') no-repeat center center;
				background-size: 0.22rem;
			}

			.xialj {
				display: block;
				position: absolute;
				right: 2%;
				top: 0.11rem;
				height: 0.22rem;
				width: 0.3rem;
				background: url('./../../assets/images/Shape@2x.png') no-repeat center center;
				background-size: 0.2rem;
			}
		}

		.person_xlist {
			overflow: hidden;
			width: 100%;
			height: 0.5rem;
			background: url('./../../assets/images/jiantou@2x.png') no-repeat 98% center;
			background-size: 0.24rem;
			border-bottom: 1px solid #DFE6E7;

			img {
				height: 0.24rem;
				float: left;
				display: block;
				margin: 0.13rem 0 0 3%;
			}

			span {
				display: block;
				float: left;
				margin-left: 2%;
				line-height: 0.5rem;
				color: #333535;
				font-size: 0.15rem;
			}
		}
	}
</style>
