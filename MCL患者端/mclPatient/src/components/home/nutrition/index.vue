<template>
	<div class="nutrition-root">
        <div id="" style="padding-top: 88px;">
			<mt-header title="营养" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
			<!-- <mt-header title="营养" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/home" style="color: initial">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header> -->
			<div id="navbar" class="fix_top" style="top: 43px;">
				<mt-navbar v-model="ABflag">
					<mt-tab-item v-for="(item,index) in navbarList" :key="index" :class="(ABflag == item.type)&&'is-selected'"
					 @click.native="toggleType(item)">
						<p>{{item.name}}</p>
					</mt-tab-item>
				</mt-navbar>
			</div>

			<!-- 内容 -->
			<div class="neirong">
				<!-- 今日营养 -->
				<div class="yinshhi_list" :hidden="ABflag == 2">
					<!-- 今日提醒 -->
					<div class="home-cell margin10">
						<p class="name">今日提醒</p>

						<router-link tag="ul" v-for="(item,index) in todynews" :key="index" class="remindList"  :to="'/nutritionUploadPhoto?skey='+item.skey+'&mealtype='+item.mealname">
							<li class="margin10">
								<div class="left">
									<div class="rowTop">
										<img src="@/assets/images/yaopin@2x.png" class="icon" />
										<span class="huiFont font14">{{item.takingcondition}}</span>
									</div>
									<!-- <div class="rowBottom font12">
										<p class="yellow">应完成时间：<span>{{item.completiontime}}</span> 已超时：<span>{{item.timeouttime}}</span></p>
									</div> -->
								</div>
								<div class="right yellow font14"> <!-- @click="oksuces(item)" -->
									<mt-badge size="small" color="#F78335">
										<span style="padding: 2px 5px;">上传营养</span>
									</mt-badge>
								</div>
							</li>
						</router-link>
                        
						<div v-for="(item, index) in todayNutritionList" :key="index">
							<div v-if="item.length > 0">
								<div class="my-cell borderBottom marginTop10" v-if="nutrition01datas!=''">
									<img src="@/assets/images/zaoqian@2x.png" width="20" height="20" v-if="index == 0"/>
									<img src="@/assets/images/wuqian@2x.png" width="20" height="20" v-else/>
									<span class="">{{item[0].mealname}}</span>
								</div>
								<div class="content-list margin10">
									<div class="my-cell" v-for="(cell, i) in item" :key="i">
										<span class="font14">{{cell.productname}}</span>
										<div class="float_right huiFont font14">
											<span style="margin-right: 5px;">{{cell.weight}}</span>
											<img src="@/assets/images/select@2x.png" alt="" width="20" v-if="cell.earlierflag == 1"/>
											<img src="@/assets/images/select_click@2x.png" alt="" width="20" v-if="cell.earlierflag == 2"/>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>

				<!-- 营养方案 -->
				<div class="yinshhi_list padding-footer" :hidden="ABflag == 1">
					<div class="noalready" v-if="dataflag==0">
						<img src="@/assets/images/nowzzz.png" />
						<p>请稍等，您的营养方案正在制作中...</p>
					</div>
					<div v-else>
						<div class="my-cell borderBottom marginTop10" v-if="nutrition01datas!=''">
							<img src="@/assets/images/zaoqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition01datas}}</span>
							<!-- <span class="float_right huiFont font14">{{earliertime}}</span> -->
						</div>
						<div class="content-list margin10" v-if="nutrition01datas!=''">
							<div class="my-cell" v-for="(item,index) in nutrition01data" :key="index">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						
						<div class="my-cell borderBottom" v-if="nutrition02datas!=''">
							<img src="@/assets/images/wuqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition02datas}}</span>
							<!-- <span class="float_right huiFont font14">{{beforenoontime}}</span> -->
						</div>
						<div class="content-list margin10" v-if="nutrition02datas!=''">
							<div class="my-cell" v-for="(item,index) in nutrition02data" :key="index" style="overflow: hidden;">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						
						<div class="my-cell borderBottom" v-if="nutrition03datas!=''">
							<img src="@/assets/images/zaoqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition03datas}}</span>
						</div>
						<div class="content-list margin10" v-if="nutrition03datas!=''">
							<div class="my-cell borderBottom" v-for="(item,index) in nutrition03data" :key="index">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						
						<div class="my-cell borderBottom" v-if="nutrition04datas!=''">
							<img src="@/assets/images/wuqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition04datas}}</span>
							<!-- <span class="float_right huiFont font14">{{beforenoontime}}</span> -->
						</div>
						<div class="content-list margin10" v-if="nutrition04datas!=''">
							<div class="my-cell" v-for="(item,index) in nutrition04data" :key="index" style="overflow: hidden;">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						<div class="my-cell borderBottom" v-if="nutrition05datas!=''">
							<img src="@/assets/images/wuqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition05datas}}</span>
							<!-- <span class="float_right huiFont font14">{{beforenoontime}}</span> -->
						</div>
						<div class="content-list margin10" v-if="nutrition05datas!=''">
							<div class="my-cell" v-for="(item,index) in nutrition05data" :key="index" style="overflow: hidden;">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						<div class="my-cell borderBottom" v-if="nutrition06datas!=''">
							<img src="@/assets/images/wuqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition06datas}}</span>
							<!-- <span class="float_right huiFont font14">{{beforenoontime}}</span> -->
						</div>
						<div class="content-list margin10" v-if="nutrition06datas!=''">
							<div class="my-cell" v-for="(item,index) in nutrition06data" :key="index" style="overflow: hidden;">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						<div class="my-cell borderBottom" v-if="nutrition07datas!=''">
							<img src="@/assets/images/wuqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition07datas}}</span>
							<!-- <span class="float_right huiFont font14">{{beforenoontime}}</span> -->
						</div>
						<div class="content-list margin10" v-if="nutrition07datas!=''">
							<div class="my-cell" v-for="(item,index) in nutrition07data" :key="index" style="overflow: hidden;">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						
						<div class="my-cell borderBottom" v-if="nutrition08datas!=''">
							<img src="@/assets/images/wuqian@2x.png" width="20" height="20" />
							<span class="">{{nutrition08data[0].mealname}}</span> 
						</div>
						<div class="content-list margin10" v-if="nutrition08datas!=''">
							<div class="my-cell" v-for="(item,index) in nutrition08data" :key="index" style="overflow: hidden;">
								<span class="font14">{{item.productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.weight}}</span>
								</div>
							</div>
						</div>
						<router-link to="/gauge_nutrition?resetstatus=1" class="buttons">
							<mt-button type="danger" class="add_btns" size="large">调整处方</mt-button>
						</router-link>
					</div>
					
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "nutrition",
		data: () => ({
			ABflag: 1,
			navbarList: [{
				name: "今日营养",
				type: 1
			}, {
				name: "营养处方",
				type: 2
			}],
			//今日营养
			nutrition01data:[],
			nutrition02data:[],
			nutrition03data:[],
			nutrition04data:[],
			nutrition05data:[],
			nutrition06data:[],
			nutrition07data:[],
			nutrition08data:[],
			nutrition01datas:'',
			nutrition02datas:'',
			nutrition03datas:'',
			nutrition04datas:'',
			nutrition05datas:'',
			nutrition06datas:'',
			nutrition07datas:'',
			nutrition08datas:'',
			beforelatedata: [], //晚前
			beforenoondata: [], //午前
			earlierdata: [], //早前
			sleeplatedata: [], //睡前
			earliertime: '',
			beforenoontime: '',
			beforelatetime: '',
			sleeplatetime: '',
			//今日营养的列表对象
			todayNutritionList:[],
			//营养方案
			beforelatedatas: [], //晚前
			beforenoondatas: [], //午前
			earlierdatas: [], //早前
			sleeplatedatas: [], //睡前
			earliertimes: '',
			beforenoontimes: '',
			beforelatetimes: '',
			sleeplatetimes: '',
			todynews:[],  //今日提醒
			dataflag:0
		}),
		methods: {
			// 今日提醒
			remindToday() {
				let url = "UserInterface/PatientHomePageRemindToday.ashx";
				let param={
					functiontype:2,
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
			toggleType(item) {
				this.ABflag = item.type;
			},
			// oksuces(item){
			// 	let url = "UserInterface/PatientMotionConfirm.ashx";
			// 	let param={
			// 		motionskey:item.motionskey,
			// 		seatskey:item.skey,
			// 		flag:1
			// 	};
			// 	this.$post(url,param).then((data) => {
			// 		if (data.rspcode != 1) {
			// 			return;
			// 		}
			// 		this.remindToday();
			// 		this.todayDiet();
			// 	})
			// },
			//今日营养
			todayNutrition(){
				let url = "UserInterface/NutritionPrescription.ashx";
				const userInfo = JSON.parse(localStorage.userInfo);
				let param = {patientskey: userInfo.UserKey}
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let todayNutritionList = [];
					for(let i=1; i<=8; i++){
						todayNutritionList.push(data[`nutrition0${i}data`]);
					}
					this.todayNutritionList = todayNutritionList;
				})		
			},

			//营养方案
			todayDiet() {
				let url = "UserInterface/NutritionToday.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.dataflag = data.dataflag;
					//今日营养
					if(data.nutrition01data.length>0){
						this.nutrition01datas=data.nutrition01data[0].mealname;
					}
					if(data.nutrition02data.length>0){
						this.nutrition02datas=data.nutrition02data[0].mealname;
					}
					if(data.nutrition03data.length>0){
						this.nutrition03datas=data.nutrition03data[0].mealname;
					}
					if(data.nutrition04data.length>0){
						this.nutrition04datas=data.nutrition04data[0].mealname;
					}
					if(data.nutrition05data.length>0){
						this.nutrition05datas=data.nutrition05data[0].mealname;
					}
					if(data.nutrition06data.length>0){
						this.nutrition06datas=data.nutrition06data[0].mealname;
					}
					if(data.nutrition07data.length>0){
						this.nutrition07datas=data.nutrition07data[0].mealname;
					}
					if(data.nutrition08data.length>0){
						this.nutrition08datas=data.nutrition08data[0].mealname;
					}
					this.nutrition01data=data.nutrition01data;
					this.nutrition02data=data.nutrition02data;
					this.nutrition03data=data.nutrition03data;
					this.nutrition04data=data.nutrition04data;
					this.nutrition05data=data.nutrition05data;
					this.nutrition06data=data.nutrition06data;
					this.nutrition07data=data.nutrition07data;
					this.nutrition08data=data.nutrition08data;
					
					// this.beforelatedata = data.beforelatedata;
					// this.beforenoondata = data.beforenoondata;
					// this.earlierdata = data.earlierdata;
					// this.sleeplatedata = data.sleeplatedata;
					// if(data.earlierdata.lenth > 0){
					// 	this.earliertime = data.earlierdata[0].earliertime;
					// }
					// if(data.beforenoondata.lenth > 0){
					// 	this.beforenoontime = data.beforenoondata[0].beforenoontime;
					// }
					// if(data.beforelatedata.lenth > 0){
					// 	this.beforelatetime = data.beforelatedata[0].beforelatetime;
					// }
					// if(data.sleeplatedata.lenth > 0){
					// 	this.sleeplatetime = data.sleeplatedata[0].sleeplatetime;
					// }
				})
			},
			faDiet() {
				let url = "UserInterface/NutritionPlan.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					//营养方案
					this.beforelatedatas = data.beforelatedata;
					this.beforenoondatas = data.beforenoondata;
					this.earlierdatas = data.earlierdata;
					this.sleeplatedatas = data.sleeplatedata;
					
					if(data.earlierdata.lenth > 0){
						this.earliertimes = data.earlierdata[0].earliertime;
					}
					if(data.beforenoondata.lenth > 0){
						this.beforenoontimes = data.beforenoondata[0].beforenoontime;
					}
					if(data.beforelatedata.lenth > 0){
						this.beforelatetimes = data.beforelatedata[0].beforelatetime;
					}
					if(data.sleeplatedata.lenth > 0){
						this.sleeplatetimes = data.sleeplatedata[0].sleeplatetime;
					}
					this.dataflag = data.dataflag;
				})
			},
		},
		mounted() {
			this.remindToday();	
			this.todayNutrition();	//今日营养
			this.todayDiet();
			
			// this.faDiet();
			if(this.$route.query.ABflag == 2){
				this.ABflag = 2;
			}
		}
	}
</script>

<style scoped lang="scss">
	.neirong {
		margin-top: 0.11rem;
	}

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
				/*margin-right: 5px;*/
			}
		}

		&>li .right {
			text-align: right;
		}

		.rowTop {
			margin-bottom: 0.05rem;
		}

		.rowTop>* {
			vertical-align: middle;
		}
	}

	.completeState {
		padding: 0.12rem;

		.float_left {
			width: 40%;
		}

		.float_right {
			width: 60%;
		}
	}

	/* */
	.my-cell {
		line-height: 0.45rem;
		padding: 0 0.15rem;
		background: #FFFFFF;

		&>*, .huiFont>*{
			vertical-align: middle;
		}
	}

	.content-list {
		background: #FFFFFF;
		padding-left: 0.20rem;
		padding-right: 0.05rem;

		.my-cell {
			padding-left: 0;
		}
	}
	.noalready{
		padding-top: 0.4rem;
		img{
			width: 1.0rem;
			margin: 0 auto;
			display: block;
		}
		p{
			text-align: center;
			color: #666;
			font-size: 0.14rem;
			padding-top: 0.2rem;
		}
	}
</style>
