<template>
	<div>
		<div>
			<div class="home_saerch">
				<div class="home_over">
					<img src="@/assets/images/home_logo.png" />
					<router-link to="/searchIllness">
						<input type="text" placeholder="输入关键字搜索常见问题" readonly="readonly" @click="enteclick" />
					</router-link>
				</div>
			</div>
			
			<!--<div class="top_sec">
				<div class="top_secher">
					<input type="text" placeholder="搜索食物营养和热量" />
					<img src="@/assets/images/homesao.png" />
				</div>
			</div>-->
			<!-- 轮播图  -->
			<!-- <carousel class="margin10" /> -->

			<!-- 欢迎信息 -->
			<div class="wellcomInfo">
				<div class="home_ikkpo">
					<img :src="messageInfo.PatientImg" class="imgtody" />
					<p>{{messageInfo.PatientName}}</p>
					<img src="@/assets/images/vphyg.png" v-if="messageInfo.IsMember==1" class="vippp" />
					<img src="@/assets/images/noviphy.png" v-else class="vippp" />
					<router-link to="/todymanage">
						<span style="color: #333;">今日管理</span>
					</router-link>
				</div>
				<div class="info" style="width:80%;margin: 0 auto;margin-top: 0.16rem;">
					<div>
						<p class="font14 name">{{messageInfo.Time}}，{{messageInfo.PatientName}}</p>
						<p class="font12 des">MCL专业守护您第 {{messageInfo.ManageDay}} 天</p>
					</div>
					<!-- <img :src="messageInfo.PatientImg" alt=""> -->
				</div>
				<div class="addvip" @click="clickvip" v-if="messageInfo.IsMember!=1">点击加入会员</div>
				<!-- <router-link to="/searchIllness">
					<div class="btn font14">
						<img src="@/assets/images/搜索--1@2x.png" alt="" width="18" height="18" />
						<span>搜索病症</span>
					</div>
				</router-link> -->
			</div>

			
			<!-- 我的医生 -->
			<router-link tag="div" to="/wx_Entrance/mesage" class="home-cell margin10" v-if="doctorName">
				<div class="myDocter" style="margin-top: 0.1rem;">
					<img :src="messageInfo.DoctorPicUrl" alt="" class="touxiang" />
					<div class="content">
						<div class="nameInfo">
							<span class="DName font17">{{messageInfo.DoctorName}}</span>
							<span class="label font15">{{messageInfo.Position}}</span>
							<div class="msg">
								<img src="@/assets/images/xiaoxi@2x(1).png" alt="" class="icon" />
								<span class="labelJiao">{{messageNumber}}</span>
							</div>
						</div>
						<div class="adr font15">
							<span>{{messageInfo.HospitalName}}</span> | <span>{{messageInfo.Department}}</span>
						</div>
						<div class="des font12 huiFont"> 擅长：{{messageInfo.BeGoodAt}}</div>
					</div>
				</div>
			</router-link>
			<router-link tag="div" to="/searchDoctorList" class="home-cell" v-else>
				<div class="huiyuan" style="padding: 0;">
					<img src="@/assets/images/doctor@2x.png" width="100%" />
				</div>
			</router-link>
			<!-- 处方查看  -->
			<classified class="margin10" />
			
			<!-- 今日提醒 -->
			<div class="home-cell margin10">
				<p class="name">今日提醒<span style="float: right;font-size: 0.14rem;" @click="messmore">更多</span></p>
				<ul class="remindList">
					<router-link tag="li" to="" v-for="(item,index) in todynews" :key="index" class="borderBottom">
						<div class="left">
							<div class="rowTop">
								<img src="@/assets/images/yinshi@2x.png" class="icon" />
								<span class="huiFont font14">{{item.takingcondition}}</span>
							</div>
							<div class="rowBottom font12">
								<p class="yellow" v-if="item.mtypevalue=='1'">应完成时间：<span>{{item.completiontime}}</span> 已超时：<span>{{item.timeouttime}}</span></p>
							</div>
						</div>
						<div class="right yellow font14" @click.stop="cklcl(item)">
							查看 <img src="@/assets/images/next@2x.png" alt="" width="22" class="next" />
						</div>
					</router-link>
				</ul>
			</div>
			<div class="userzhn margin10">
				<img src="@/assets/images/xiangmusm.png" @click="$router.push(`/project_description`)" v-if="messageInfo.managepackage==0"/>
				<img src="@/assets/images/userzn.png" @click="$router.push(`/use_guide`)" v-else/>   <!---->
			</div>
			<!--体重记录-->
			<!-- <router-link tag="div" to="/weight" class="margin10">
				<div class="home-cell weightArea">
					<p class="name">体重记录 <img src="@/assets/images/fabu@2x.png" alt="" class="add" width="23" /></p>
					<div class="weightInfo clear">
						<div class="left float_left">
							<p class="font12 tit1">最新体重</p>
							<p class="font14 tit2">{{newWeight}} 公斤</p>
						</div>
						<div class="right float_left" style="text-align: right;">
							<img src="@/assets/images/weight.png" alt="" height="45" />
						</div>
					</div>
				</div>
			</router-link> -->

			<!-- 指定医生 -->
			<!--<div class="huiyuan">
    	<img src="@/assets/images/doctor@2x.png" width="100%"/>
    </div>-->

			<!-- 会员 -->
			<!-- <div class="huiyuan margin10" style="background: #fff;" v-if="messageInfo.IsMember!=1">
				<router-link tag="div" to="/yearCard">
					<img src="@/assets/images/ad@2x.png" width="100%" />
				</router-link>
			</div> -->

			<!--MCL专家栏-->
			<div class="home-cell zhuanjai margin10">
				<p class="name">
					MCL专家栏
					<router-link tag="span" to="/expert" class="more"> 更多>> </router-link>
				</p>
				<div class="mclWrap">
					<ul class="mclZj">
						<router-link v-for="(item,index) in expertColumn" :key="index" tag="li" :to="`/expertDetail/`+item.sKey">
							<div class="coverWrap">
								<div class="mask">
									<div class="seeNum">
										<img src="@/assets/images/eye.png" alt="" /> <span class="font12">{{item.PlaybackVolume}}</span>
									</div>
								</div>
								<img :src="item.ColumnImg" alt="" class="cover" />
							</div>
							<p class="font12">{{item.ColumnName}}</p>
						</router-link>
					</ul>
				</div>
			</div>

			<!--常见问题-->
			<div class="home-cell" style="padding-bottom: 0.54rem;">
				<p class="name">常见问题 <router-link tag="span" to="/searchIllness" class="more"> 更多>> </router-link>
				</p>
				<ul class="question font14">
					<router-link v-for="(item,index) in problem" :key="index" tag="li" :to="`/questionDetail/`+item.sKey" class="borderBottom">{{item.Content}}</router-link>
				</ul>
			</div>
		</div>

		<!-- <div id="mark" :style="{display: (diseasePanel?'block': 'none')}" class="diseaseType-block">
			<div class="panel">
				<div class="panel-title text-center">疾病类型</div>
				<div class="panel-content">
					<mt-badge v-for="(item, index) in diseaseType" :key="index" size="small" class="label active" :class="{active: item.select == true, 'default-label': item.select == false}"
					 @click.native="tabLabel(item)">
						{{item.name}}
					</mt-badge>
				</div>
				<mt-field label="身高" placeholder="请输入身高" type="number" v-model.trim="diseaseParam.attribute_value_02">
					<span style="margin-left: 5px;">&nbsp;m</span>
				</mt-field>
				<mt-field label="体重" placeholder="请输入体重" type="number" v-model.trim="diseaseParam.attribute_value_01">
					<span style="margin-left: 5px;">kg</span>
				</mt-field>
			</div>
			<div class="btn">
				<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="diseaseSubmit">保存</mt-button>
			</div>
		</div> -->

	</div>
</template>

<script>
	import carousel from "./carousel.vue";
	import classified from "./classified/classifiedRow.vue";
	import axios from 'axios';
	export default {
		name: "home",
		data: () => ({
			messageNumber: 0, //未读消息的数量
			doctorName: false, //是否有主治医生
			isShowCode: false,
			UserKey: '',
			SessionId: '',
			messageInfo: {
				Time: '',
				PatientName: '',
				PatientImg: '',
				ManageDay: '',
				DoctorName: '',
				DoctorPicUrl: '',
				Position: '',
				HospitalName: '',
				Department: '',
				BeGoodAt: '',
				RemindCount: 10,
				managepackage: 0
			},
			newWeight: '', //体重记录
			expertColumn: [],
			problem: [],
			todynews:[],  //今日提醒
			// //疾病类型
			// diseasePanel: false,
			// diseaseType: [{
			// 		name: "肺癌",
			// 		select: false,
			// 		key: "attribute_value_03"
			// 	}, {
			// 		name: "胃癌",
			// 		select: false,
			// 		key: "attribute_value_04"
			// 	}, {
			// 		name: "肝癌",
			// 		select: false,
			// 		key: "attribute_value_05"
			// 	},
			// 	{
			// 		name: "乳腺癌",
			// 		select: false,
			// 		key: "attribute_value_06"
			// 	}, {
			// 		name: "食管癌",
			// 		select: false,
			// 		key: "attribute_value_07"
			// 	}, {
			// 		name: "胰腺癌",
			// 		select: false,
			// 		key: "attribute_value_08"
			// 	},
			// 	{
			// 		name: "白血病",
			// 		select: false,
			// 		key: "attribute_value_09"
			// 	}, {
			// 		name: "膀胱癌",
			// 		select: false,
			// 		key: "attribute_value_10"
			// 	}, {
			// 		name: "卵巢癌",
			// 		select: false,
			// 		key: "attribute_value_11"
			// 	},
			// 	{
			// 		name: "鼻咽癌",
			// 		select: false,
			// 		key: "attribute_value_12"
			// 	}, {
			// 		name: "前列腺癌",
			// 		select: false,
			// 		key: "attribute_value_13"
			// 	}, {
			// 		name: "恶性淋巴瘤",
			// 		select: false,
			// 		key: "attribute_value_14"
			// 	},
			// 	{
			// 		name: "结/直肠癌",
			// 		select: false,
			// 		key: "attribute_value_15"
			// 	}, {
			// 		name: "子宫内膜癌",
			// 		select: false,
			// 		key: "attribute_value_16"
			// 	}, {
			// 		name: "子宫癌颈癌",
			// 		select: false,
			// 		key: "attribute_value_17"
			// 	},
			// 	{
			// 		name: "胃间质瘤",
			// 		select: false,
			// 		key: "attribute_value_18"
			// 	}, {
			// 		name: "脑恶性肿瘤",
			// 		select: false,
			// 		key: "attribute_value_19"
			// 	}, {
			// 		name: "胆道恶性肿瘤",
			// 		select: false,
			// 		key: "attribute_value_20"
			// 	},
			// ],
			// diseaseParam: {
			// 	attribute_value_01: "", //（体重），
			// 	attribute_value_02: "" //（身高）
			// }

		}),
		methods: {
			messmore(){
				this.$router.push('/homemessage');
			},
			enteclick(){
				this.$router.push('/searchIllness');
			},
			// 今日提醒跳转
			cklcl(item){
				if(item.mtypevalue==1){
					console.log(item)
					this.$router.push('/uploadPhoto?skey='+item.skey+'&mealtype='+item.mealname);
				}else if(item.mtypevalue==2){
					this.$router.push('/nutritionUploadPhoto?skey='+item.skey+'&mealtype='+item.mealname);
				}else if(item.mtypevalue==3){
					this.$router.push('/sport?skey='+item.skey);
				}else if(item.mtypevalue==4){
					this.$router.push('/mood?skey='+item.skey);
				}else if(item.mtypevalue==5){
					
				}else if(item.mtypevalue==6){
					this.$router.push('/weight?skey='+item.skey);
				}else if(item.mtypevalue==7){
					this.$router.push('/yearCard?skey='+item.skey);
				}else if(item.mtypevalue==8){
					this.$router.push('/wx_Entrance/service?skey='+item.skey);
				}
			},
			// 点击加入会员
			clickvip(){
				this.$router.push('/yearCard');
			},
			searchChange(val) {
				let $router = this.$router;
				$router.push('/searchproduct')
			},
			// 基本信息
			getMsgInfo() {
				let url = "UserInterface/PatientHomePageEssentialInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.messageInfo = data;
					if ((data.DoctorName == '') || (data.DoctorName == null)) {
						this.doctorName = false;
					} else {
						this.doctorName = true;
					}
				})
			},
			// 今日提醒
			remindToday() {
				let url = "UserInterface/PatientHomePageRemindToday3.ashx";
				let param={
					functiontype:'',
					pagesize:20,
					pagecount:1
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.todynews=data.remindtoday;
				})
			},
			// 体重记录
			wightRecord() {
				let url = "UserInterface/PatientHomePageWeightRecord.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.newWeight = data.NewWeight;
				})
			},
			// 专家栏
			expert() {
				let url = "UserInterface/PatientHomePageExpert.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.expertColumn = data.data;
				})
			},
			// 常见问题
			problems() {
				let url = "UserInterface/PatientHomePageProblem.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.problem = data.data;
				})
			},
			//疾病类型
			tabLabel(item) {
				item.select = !item.select
			},
			//获取客服的token
			getToken: function(){
				const {org_name, app_name, client_id, client_secret} = this.$root;
				let url = `http://a1.easemob.com/${org_name}/${app_name}/token`;
				let param = {
				  "grant_type": "client_credentials",
				  client_id,
				  client_secret
				}
				const http = axios.create({
					headers:{'Content-Type':'application/json;charset=UTF-8'}
				})
				http.post(url, param).then(response => {
					this.$root.token = response.data.access_token;
					this.information().then((data)=>{
						var phone = data.data.ContactPhone;
						//获取未读消息条数
						this.getMessage(phone)
					})
					
				})
			},
			//获取客服的未读消息数
			getMessage: function(owner_username){
				const {org_name, app_name, token} = this.$root;
				let url = `http://a1.easemob.com/${org_name}/${app_name}/users/${owner_username}/offline_msg_count`;
				const http = axios.create({
					headers:{
						'Content-Type': 'application/json;charset=UTF-8',
						"Authorization": `Bearer ${token}`
					}
				})
				http.get(url).then(response => {
					const data = response.data.data;
					var i = 0
					for(let key in data){
						if(i == 0){
							this.messageNumber = data[key];
						}
						i+=1;
					}
				})
			},
			//获取账号
			information() {
				let url = "UserInterface/GetUserShowInfo.ashx";
				return this.$post(url);
			},
			//疾病类型状态
			// getDiseaseStatus() {
			// 	let url = "/UserInterface/GetDiseaseShowStatus.ashx";
			// 	this.$post(url).then((data) => {
			// 		if (data.rspcode != 1) {
			// 			return;
			// 		}
			// 		// 0 不显示  1显示
			// 		if (data.need == 1) {
			// 			this.diseasePanel = true;
			// 		}
			// 	})
			// },
			//疾病类型提交
			// diseaseSubmit() {
			// 	let url = "UserInterface/AddConditionDiseaseTumour.ashx";
			// 	let param = this.diseaseParam;
			// 	let isTypeEmpty = 0; // 判断疾病类型是否为空
			// 	this.diseaseType.forEach((item) => {
			// 		let state = 0;
			// 		if (item.select) {
			// 			state = 1;
			// 			isTypeEmpty = 1;
			// 		}
			// 		param[`${item.key}`] = state
			// 	})
			// 	if (isTypeEmpty == 0) {
			// 		this.$Toast('请选择疾病类型');
			// 		return
			// 	}
			// 	if (param.attribute_value_02 == "") {
			// 		this.$Toast('请输入身高');
			// 		return
			// 	}
			// 	if (param.attribute_value_01 == "") {
			// 		this.$Toast('请输入体重');
			// 		return
			// 	}
			// 	this.$post(url, param).then((data) => {
			// 		if (data.rspcode != 1) {
			// 			return;
			// 		}
			// 		this.$Toast('保存成功');
			// 		this.diseasePanel = false;
			// 	})
			// }
		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			let keepAlive = (to.name == "classdetail") ? true : false;
			this.$route.meta.keepAlive = keepAlive;
			next()
		},
		mounted() {
			this.getMsgInfo();
			this.wightRecord();
			this.expert();
			this.problems();
			this.remindToday();
			//this.getDiseaseStatus(); //疾病类型状态
		},
		components: {
			carousel,
			classified
		},
		created() {
			if (localStorage.userInfo) {
				this.UserKey = JSON.parse(localStorage.userInfo).UserKey;
				this.SessionId = JSON.parse(localStorage.userInfo).SessionId;
			} else {
				this.$router.push('/login');
			}
			// this.information();
			//获取token
			this.getToken()
			
		}

	}
</script>

<style scoped lang="scss">
	.home_saerch {
		height: 1.0rem;
		padding: 0.2rem 0 0.06rem 0;
		background: rgb(36,183,192);
		.home_over{
			width: 94%;
			margin: 0 auto;
			overflow: hidden;
			img{
				// width: 25%;
				height: 0.30rem;
				float: left;
			}
			input {
				width: 57%;
				border: none;
				display: block;
				height: 0.30rem;
				padding: 0 0.1rem 0 0.4rem;
				background: #80d0f5 url(../../assets/images/sousuo@2x.png) no-repeat 0.1rem center;
				background-size: 0.2rem;
				border-radius: 0.19rem;
				font-size: 0.14rem;
				color: #666;
				float: right;
			}
		}
		
	}
	/*.top_sec{
		width: 100%;
		height: 1.1rem;
		padding-top: 0.2rem;
		background: #00a2e9;
		.top_secher{
			width: 94%;
			background: #80d0f5;
			height: 0.3rem;
			margin: 0 auto;
			border-radius: 0.15rem;
			overflow: hidden;
			input{
				width: 56%;
				height: 0.15rem;
				float: left;
				display: block;
				margin-left: 10%;
				height: 0.3rem;
				border: none;
				color: #fff;
			}
			img{
				height: 0.2rem;
				width: 0.2rem;
				float: right;
				margin: 0.05rem 6% 0 0;
			}
		}
	}*/
	.home-cell {
		&>.name {
			line-height: 0.44rem;
			padding: 0 0.12rem;
			background: #FFFFFF;
		}

		.more {
			float: right;
			color: #958F8F;
			font-size: 0.12rem;
		}
	}

	/*欢迎信息 */
	.wellcomInfo {
		background: #FFFFFF;
		width: 94%;
		margin: 0 auto;
		border-radius: 6px;
		margin-top: -0.6rem;
		position: relative;
		padding-bottom: 0.1rem;
		.home_ikkpo{
			overflow: hidden;
			padding-top: 0.16rem;
			.imgtody{
				height: 0.26rem;
				display: block;
				float: left;
				margin-left: 10%;
				border-radius: 0.13rem;
			}
			.vippp{
				height: 0.12rem;
				display: block;
				float: left;
				margin-top: 0.07rem;
				margin-left: 4%;
			}
			p{
				float: left;
				font-size: 0.14rem;
				line-height: 0.26rem;
				margin-left: 0.1rem;
			}
			span{
				display: block;
				float: right;
				font-size: 0.14rem;
				padding-right: 0.12rem;
				background: url(./../../assets/images/jixu@2x.png) no-repeat right center;
				background-size: 0.08rem;
				margin-right: 8%;
				margin-top: 0.04rem;
			}
		}
		.info {
			display: flex;
			justify-content: space-between;
			margin-bottom: 0.1rem;
		}

		.info .name {
			font-weight: bold;
			margin-top: 0.05rem;
			margin-bottom: 0.05rem;
		}

		.info .des {
			color: #91959D;
		}

		.info img {
			width: 0.60rem;
			height: 0.60rem;
			border-radius: 0.30rem;
		}

		.btn {
			text-align: center;
			color: #FFFFFF;
			line-height: 0.33rem;
			height: 0.33rem;
			background: rgba(247, 131, 53, 1);
			box-shadow: 0px 4px 4px 0px rgba(154, 154, 154, 0.59);
			border-radius: 17px;
		}

		.btn img {
			vertical-align: middle;
		}
		.addvip{
			padding: 0.04rem;
			background: #066FFC;
			font-size: 0.12rem;
			width: 0.76rem;
			text-align: center;
			color: #fff;
			position: absolute;
			bottom: 0.18rem;
			right: 8%;
		}
	}

	/*mcl专家栏*/
	.mclWrap {
		overflow: hidden;
		overflow-x: scroll;
		background: #fff;
	}

	.mclZj {
		background: #FFFFFF;
		padding: 0.07rem 0.06rem;
		white-space: nowrap;
		display: inline-block;

		li {
			display: inline-block;
			width: 1.40rem;
			margin: 0 0.06rem;
		}

		.coverWrap {
			position: relative;
			border-radius: 5px;
			overflow: hidden;

			.mask {
				width: 100%;
				background: rgba(0, 0, 0, .3);
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
			}

			.seeNum {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				color: #FFFFFF;
				text-align: right;
				line-height: 0.2rem;
				padding-right: 0.05rem;
			}

			.seeNum img {
				width: 0.15rem;
				vertical-align: middle;
			}

			.cover {
				display: block;
				width: 100%;
				height: 0.85rem;
			}
		}

		p {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			color: #333333;
			margin: 0.05rem 0;
		}
	}
	.userzhn{
		width: 94%;
		background: #fff;
		padding: 0.1rem 3%;
		img{
			width: 100%;
			display: block;
		}
	}
	/*我的医生*/
	.myDocter {
		padding: 0.13rem 3%;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		width: 88%;
		margin: 0 auto;
		.touxiang {
			width: 0.72rem;
			height: 0.72rem;
			border-radius: 0.36rem;
		}

		.content {
			flex: 1;
			padding-left: 0.25rem;
		}

		.nameInfo .msg {
			display: inline-block;
			vertical-align: middle;
			float: right;
			position: relative;
			padding-right: 0.05rem;
		}

		.nameInfo .msg .icon {
			width: 0.21rem;
		}

		.nameInfo .msg span.labelJiao {
			min-width: 0.14rem;
			line-height: 0.14rem;
			border-radius: 0.14rem;
			background: #FF0000;
			color: #FFF;
			text-align: center;
			font-size: 0.12rem;
			position: absolute;
			top: -0.07rem;
			left: 0.1rem;
			padding: 0 0.02rem;
		}

		.nameInfo,
		.adr {
			margin-bottom: 0.07rem;
		}

		.nameInfo span {
			vertical-align: middle;
		}

		.nameInfo .label {
			border: 1px solid #F78335;
			border-radius: 2px;
			color: #F78335;
			padding: 0.01rem 0.08rem;
			margin-left: 0.15rem;
		}

	}

	/*今日提醒*/
	.remindList {
		&>li {
			padding: 0.13rem 0.12rem;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
		}

		&>li .left {
			.rowTop .icon {
				width: 0.14rem;
				vertical-align: middle;
				margin-right: 5px;
			}
		}

		&>li .right {
			text-align: right;
			line-height: 0.37rem;
		}

		&>li .right .next {
			width: 0.22rem;
			vertical-align: middle;
			margin-left: 0.1rem;
		}

		.rowTop {
			margin-bottom: 0.05rem;
		}

		.rowTop>* {
			vertical-align: middle;
		}
	}

	/*体重记录*/
	.weightArea {
		background: #FFFFFF;
		padding-bottom: 0.13rem;

		.add {
			float: right;
			width: 0.23rem;
			height: 0.23rem;
			margin-top: 0.1rem;
		}

		.weightInfo {
			padding: 0 0.12rem;
		}

		.weightInfo .tit1 {
			color: #999999;
			margin-bottom: 0.05rem;
			margin-bottom: 0.05rem;
		}

		.weightInfo .left,
		.weightInfo .right {
			width: 50%;
		}
	}

	.huiyuan {
		padding: 0.14rem 0;
	}

	/*常见问题*/
	.question {
		background: #FFFFFF;
		padding: 0 0.12rem;

		li {
			line-height: 40px;
		}
	}

	/* 疾病类型 */
	#mark .panel .panel-title {
		font-size: 0.16rem;
		margin-bottom: 0.15rem;
	}

	#mark .panel {
		width: 90%;
		margin: 0 auto;
		margin-top: 1rem;
		border-radius: 5px;
		box-sizing: border-box;
		background: #FFFFFF;
		padding: 0.15rem 0.1rem;

		.label {
			padding: 1px 6px;
			margin-right: 0.05rem;
			margin-bottom: 0.05rem;
		}

		.label.active {
			background: #F78335;
			border: 1px solid #F78335;
		}

		.label.default-label {
			background: #FFFFFF;
			border: 1px solid #F78335;
			color: #F78335;
		}
	}

	#mark .btn {
		width: 90%;
		margin: 0 auto;
		margin-top: 0.5rem;
	}
</style>

<style lang="scss">
	.diseaseType-block {
		font-size: 14px;

		input {
			border: 1px solid #EEEEEE;
		}

		.mint-field .mint-cell-title {
			width: 50px;
		}

		a.mint-cell .mint-cell-text,
		.mint-field-core {
			font-size: 14px;
		}

		.mint-cell-wrapper {
			padding: 0;
		}
	}
</style>
