<template>
	<div>
		<div id="body_main" style="padding-top: 0;">
			<div slot="content">
				<!-- 搜索部分 -->
				<div class="carousel_wrap">
					<div class="search">
						<div class="logo_wrap">
							<img src="../../assets/images/home_logo.png" alt="" class="logo" />
						</div>
						<div class="search_wrap">
							<img src="../../assets/images/sousuo@2x.png" alt="" />
							<input type="search" placeholder="搜索商品名称" />
						</div>
					</div>
					<!-- 轮播图  -->
					<carousel />
				</div>
				<!-- 用户信息 -->
				<div class="user_info">
					<div class="user">
						<div class="user_name">
							<img :src="userInfo.ImgUrl" alt="" />
							<p>{{userInfo.ContactName}}</p>
						</div>
						<div class="share">
							分享
						</div>
					</div>
					<div class="statistics">
						<ul>
							<li>
								<p>{{userInfo.channelCount}}</p>
								<p>今日客户</p>
							</li>
							<li>
								<p>{{userInfo.orderCount}}</p>
								<p>今日订单</p>
							</li>
							<li>
								<p>{{userInfo.profitCount}}</p>
								<p>今日收益</p>
							</li>
						</ul>
					</div>
				</div>
				<!-- 消息 -->
				<div class="home_inform">
					<router-link to="/newsList">
						<img src="../../assets/images/jintt.png" />
						<ul>
							<li v-for="(item, index) in newList" :key="index">
								<span></span>
								<p>{{item.remarks}}</p>
								<label>{{item.time}}</label>
							</li>
						</ul>
					</router-link>
				</div>
				<!-- 我的 -->
				<div class="mmy_de home_user">
					<div class="mmy_ded">
						<span></span>
						<p>用户管理</p>
						<router-link to="/myUser">
							<label>更多</label>
						</router-link>
					</div>
					<div class="home_my">
						<div class="home_li">
							<span>{{usermanageinfo.communitycommission}}</span>
							<p>本月新增渠道</p>
							<!--渠道人数-->
						</div>
						<div class="home_li">
							<span>{{usermanageinfo.doctorcount}}</span>
							<p>本月新增医生</p>
							<!--医生人数-->
						</div>
						<div class="home_li">
							<span>{{usermanageinfo.usermanageinfo}}</span>
							<p>本月新增员工</p>
							<!--患者人数-->
						</div>
						<div class="home_li">
							<span style="text-align: center;width: 100%;">{{usermanageinfo.usertotalcount}}</span>
							<p>累计用户</p>
						</div>
					</div>
				</div>
				<div class="mmy_de home_yej">
					<div class="mmy_ded">
						<span></span>
						<p>我的业绩</p>
						<router-link to="/personal_achievement">
							<label>更多</label>
						</router-link>
					</div>
					<div class="home_my">
						<div class="home_li" @click="qdyetz">
							<span>{{performanceinfo.communityperformance}}</span>
							<p>渠道业绩</p>
						</div>
						<div class="home_li" @click="qdyetz2">
							<span>{{performanceinfo.teamperformance}}</span>
							<p>医生业绩</p>
						</div>
						<div class="home_li" @click="qdyetz3">
							<span>{{performanceinfo.personalperformance}}</span>
							<p>员工业绩</p>
						</div>
					</div>
				</div>
				<!-- <div class="mmy_de">
					<div class="mmy_ded">
						<span></span>
						<p>我的收益</p>
						<router-link to="/personal_commission">
							<label>更多</label>
						</router-link>
					</div>
					<div class="home_my">
						<div class="home_li" @click="myshytz">
							<span>{{commissionsinfo.patientcommission}}</span>
							<p>渠道收益</p>
						</div>
						<div class="home_li" @click="myshytz2">
							<span>{{commissionsinfo.teamcommissions}}</span>
							<p>医生收益</p>
						</div>
						<div class="home_li" @click="myshytz3">
							<span>{{commissionsinfo.communitycommission}}</span>
							<p>员工收益</p>
						</div>
					</div>
				</div> -->
				<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
					<div slot="content">
						<div class="recommend">
							<h3>为您推荐</h3>
							<div class="home_recom">
								<div class="recom_list" v-for="(item,index) in list" :key="index">
									<router-link :to="`/classdetail/${item.goodsId}`" class="img_wrap">
										<img v-lazy="item.goodsImage" />
									</router-link>
									<p>{{item.goodsName}}</p>
									<span>¥{{item.marketPrice}}</span>
								</div>
							</div>
						</div>
					</div>
				</loadMore>
			</div>
		</div>
		<div class="alert_name" v-if="checkValue==0">
			 <div class="alert_cont">
				 <h3>填写信息审核</h3>
				 <mt-field label="姓名" v-model="params.UserName" placeholder="请输入您的姓名" style="border-bottom: 1px solid #eee;"></mt-field>
				 <mt-cell :title="params.UserAddress" is-link @click.native="openCityPicker" style="border-bottom: 1px solid #eee;"></mt-cell>
				 <mt-button type="default" class="add_btn" size="large" @click="postInfo">保存</mt-button>
			 </div>
		</div>
		<cityPicker @confrim="cityPickerChange" ref="cityPicker" />
	</div>
</template>

<script>
	import carousel from "./carousel.vue";
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "home",
		data: () => ({
			//佣金信息
			commissionsinfo: {
				teamcommissions: "", //个人
				communitycommission: "", //员工
				patientcommission: "", //渠道
			},
			//业绩信息
			performanceinfo: {
				personalperformance: "", //员工
				teamperformance: "", //医生
				communityperformance: "", //渠道
			},
			//用户管理
			usermanageinfo: {
				doctorcount: "", //新增医生
				communitycommission: "", //新增渠道
				usermanageinfo: "", //新增患者
				usertotalcount: "", //累计用户
			},
			//用户信息
			userInfo: {
				userInfo: "",
				ContactName: "",
			},
			//新闻
			newList: [],
			//产品推荐
			param: {
				"saleorder": "", //0，销量降序;1，销量升序
				"priceOrder": "", //0，价格降序;1，价格升序
				"pagesize": 10,
				"pagecount": 0,
				"secondSubjectType": ""
			},
			list: [],
			params: {
				"UserName": "",
				"UserAddress": "请选择省、市、区"
			},
			checkValue:1
		}),
		methods: {
			//citypicker的确定回调
			cityPickerChange(values) {
				let cityValue = [values[0].name, values[1].name, values[2].name].toString();
				this.params.UserAddress = cityValue;
			},
			//打开citypicker
			openCityPicker() {
				this.$refs.cityPicker.show();
			},
			// 是否填写个人信息
			isgetInfo() {
				let url = "UserInterface/channel/ChannelInfoCheck.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.checkValue=data.checkValue;
				})
			},
			postInfo() {
				if(this.params.UserName==''){
					this.$Toast('请输入您的真实姓名');
				}
				if((this.params.UserUserAddressName=='')||(this.params.UserUserAddressName=='请选择省、市、区')){
					this.$Toast('请选择省、市、区');
				}
				let url = "UserInterface/channel/SetChannelInfo.ashx";
				let param={
					name:this.params.UserName,
					address:this.params.UserAddress
				};
				this.$post(url,param).then((data) => {
					this.$Toast(data.rspdesc);
					if (data.rspcode != 1) {
						return;
					}
					this.checkValue=1
				})
			},
			//获取用户信息
			getInfo() {
				let url = "UserInterface/channel/ChannelHomePageInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					//用户管理
					let usermanageinfo = data.user;
					this.usermanageinfo.doctorcount = usermanageinfo.doctorcount; //新增医生
					this.usermanageinfo.communitycommission = usermanageinfo.channelcount; //新增渠道
					this.usermanageinfo.usermanageinfo = usermanageinfo.patientcount; //新增患者
					this.usermanageinfo.usertotalcount = usermanageinfo.usertotalcount; //累计用户

					//我的业绩
					let performanceinfo = data.achievement;
					this.performanceinfo.personalperformance = performanceinfo.personalperformance; //员工
					this.performanceinfo.teamperformance = performanceinfo.teamperformance; //医生
					this.performanceinfo.communityperformance = performanceinfo.communityperformance; //渠道

					//我的收益
					let commissionsinfo = data.data;
					this.commissionsinfo.teamcommissions = commissionsinfo.teamcommissions; //个人
					this.commissionsinfo.communitycommission = commissionsinfo.communitycommissio; //员工
					this.commissionsinfo.patientcommission = commissionsinfo.patientcommission; //渠道
				})
			},
			//获取新闻
			getNews() {
				let url = "UserInterface/channel/ChannelHomePageHeadlineInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.newList = data.data;
				})
			},
			//商品列表
			getList(success) {
				let url = "UserInterface/GetProductList.ashx";
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.goodsList;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
			//个人信息
			information() {
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					let model = data.data;
					this.userInfo = model;
				})
			},
			qdyetz(){
				this.$router.push('/personal_achievement?type=1');
			},
			qdyetz2(){
				this.$router.push('/personal_achievement?type=2');
			},
			qdyetz3(){
				this.$router.push('/personal_achievement?type=3');
			},
			myshytz(){
				this.$router.push('/personal_commission?type=1');
			},
			myshytz2(){
				this.$router.push('/personal_commission?type=2');
			},
			myshytz3(){
				this.$router.push('/personal_commission?type=3');
			},
		},
		beforeRouteLeave(to, from, next) {
			//			// 导航离开该组件的对应路由时调用
			//			let keepAlive = (to.name == "classdetail") ? true : false;
			//			this.$route.meta.keepAlive = keepAlive;
			next()
		},
		mounted() {
			this.isgetInfo();
			this.getInfo(); //获取用户信息
			this.getNews(); //获取新闻
			this.information(); //个人信息
		},
		components: {
			carousel,
			loadMore,
			cityPicker: () => import( /* webpackChunkName: "cityData" */ "../common/cityPicker.vue")
		},
		created() {
			// 			if(localStorage.userInfo){
			// 				this.UserKey=JSON.parse( localStorage.userInfo).UserKey;
			// 				this.SessionId=JSON.parse( localStorage.userInfo).SessionId;
			// 			}else{
			// 				this.$router.push('/login');
			// 			}
			// this.information();
		}
	}
</script>

<style scoped lang="scss">
	.alert_name{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(000,000,000,0.6);
		z-index: 9999;
		.alert_cont{
			padding: 0.2rem 2%;
			width: 86%;
			background: #fff;
			position: absolute;
			left: 5%;
			top: 1.0rem;
			border-radius: 8px;
			h3{
				font-weight: normal;
				text-align: center;
				font-size: 0.18rem;
				color: #333;
				border-bottom: 1px solid #ddd;
				padding-bottom: 0.1rem;
			}
			input{
				border: none;
			}
			.add_btn{
				margin-top: 0.2rem;
				margin-bottom: 0;
			}
		}
	}
	.home_inform {
		padding: 0 0.1rem 0.14rem 0.1rem;
		overflow: hidden;
		background: #fff url(../../assets/images/jiantou@2x.png) no-repeat 96% center;
		background-size: 0.28rem;
		margin-top: 0.1rem;

		img {
			height: 0.36rem;
			float: left;
			margin-top: 0.18rem;
		}

		ul {
			width: 76%;
			float: left;
			margin-left: 0.2rem;

			li {
				margin-top: 0.12rem;
				overflow: hidden;

				span {
					display: block;
					width: 8px;
					height: 8px;
					background: #000;
					float: left;
					border-radius: 4px;
					margin-top: 0.06rem;
				}

				p {
					width: 60%;
					font-size: 0.13rem;
					color: #333;
					float: left;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					margin-left: 0.14rem;
				}

				label {
					display: block;
					font-size: 0.13rem;
					color: #636768;
					float: left;
					margin-left: 0.14rem;
				}
			}
		}
	}

	.mmy_de {
		background: #fff;
		margin-top: 0.08rem;
		padding: 0.1rem 0.1rem 0.14rem 0.1rem;

		.mmy_ded {
			overflow: hidden;

			span {
				height: 0.22rem;
				display: block;
				width: 0.04rem;
				border-radius: 0.02rem;
				background: #FF3D3D;
				float: left;
			}

			p {
				float: left;
				margin-left: 0.18rem;
				font-size: 0.15rem;
				color: #333;
				line-height: 0.22rem;
			}

			label {
				font-size: 0.12rem;
				color: #636768;
				display: block;
				line-height: 0.22rem;
				margin-right: 0.1rem;
				float: right;
				background: url(../../assets/images/jixu@2x.png) no-repeat right center;
				background-size: 0.08rem;
				padding-right: 0.14rem;
			}
		}

		.home_my {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-ms-flex-pack: distribute;
			justify-content: space-around;
			width: 100%;
			margin: 0 auto;
			margin-top: 0.04rem;

			.home_li {
				height: 100%;
				padding-top: 0.1rem;
				-webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
				background: #ffffff;
				text-align: center;

				/*display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-wrap: wrap;
				flex-wrap: wrap;
				-ms-flex-line-pack: center;
				align-content: center;
				-webkit-box-pack: center;
				-ms-flex-pack: center;*/

				justify-content: center;
				font-size: 0.16rem;

				span {
					color: #FF3D3D;
					display: block;
					font-size: 0.16rem;
				}

				p {
					color: #636768;
					font-size: 0.12rem;
					padding-top: 0.08rem;
				}
			}
		}
	}

	.home_yej {
		.mmy_ded span {
			background: #FF9000;
		}

		.home_my .home_li span {
			color: #FF9000;
		}
	}

	.home_user {
		.mmy_ded span {
			background: #58AD9D;
		}

		.home_my .home_li span {
			color: #58AD9D;
		}
	}

	.recommend {
		padding: 0 0.1rem;

		h3 {
			color: #333535;
			font-weight: 400;
			padding: 0.14rem 0 0.04rem 0;
			font-size: 0.15rem;
		}

		.home_recom {
			overflow: hidden;

			.recom_list {
				float: left;
				background: #fff;
				width: 45%;
				border-radius: 6px;
				margin-top: 0.08rem;
				padding: 0.1rem 2%;

				img {
					width: 100%;
					height: 1.78rem;
					display: block;
				}

				p {
					font-size: 0.15rem;
					color: #333535;
					padding-top: 0.1rem;
					height: 0.34rem;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				span {
					color: #FF5355;
					display: block;
					padding: 0.1rem 0 0 0;
					font-size: 0.16rem;
				}

				&:nth-child(even) {
					margin-left: 2%;
				}
			}
		}
	}

	.carousel_wrap {
		padding: 0.1rem;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		background: rgb(36, 183, 192);

		.search {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 0.1rem;
		}

		.logo_wrap img {
			width: 0.82rem;
			height: 0.30rem;
			margin-right: 0.2rem;
			vertical-align: middle;
		}

		.search_wrap {
			flex: 1;
			display: flex;
			align-items: center;
			height: 30px;
			padding: 0 0.08rem;
			background: #80D0F5;
			border-radius: 15px;
			overflow: hidden;

			img {
				width: 0.2rem;
				height: 0.2rem;
				margin-right: 0.08rem
			}

			input {
				flex: 1;
				border: 0;
				color: #666;
			}
		}
	}

	.user_info {
		background: #FFFFFF;
		overflow: hidden;
		border-radius: 6px;
		margin: 0 0.1rem;
		margin-top: -0.9rem;
		padding: 0.15rem;

		.user {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 0.2rem;
		}

		.user_name {
			img {
				width: 50px;
				height: 50px;
				border-radius: 25px;
				float: left;
			}

			p {
				float: left;
				margin-top: 15px;
				margin-left: 10px;
			}
		}

		.share {
			width: 60px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border-radius: 15px;
			background: #ACCE1C;
			color: #FFFFFF;
		}

		.statistics ul {
			display: flex;
			justify-content: space-between;

			li {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
