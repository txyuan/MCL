<template>
	<div class="nutrition-root">
		<div id="body_main" style="padding-top: 0.88rem;">
			<mt-header title="营养" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>

			<!-- mt-navbar -->
			<div id="navbar" class="fix_top" style="top: 0.44rem;" v-if="$route.query.skey">
				<mt-navbar v-model="ABflag">
					<mt-tab-item v-for="(item,index) in navbarList" :key="index" :class="(ABflag == item.type)&&'is-selected'"
					 @click.native="toggleType(item)">
						<p>{{item.name}}</p>
					</mt-tab-item>
				</mt-navbar>
			</div>

			<!-- 内容 -->
			<div class="neirong" v-if="$route.query.skey">
				<!-- 今日营养 -->
				<div class="yinshhi_list" :hidden="ABflag == 2">
					<!-- 今日提醒 -->
					<div class="home-cell margin10">
						<!-- <p class="name">今日提醒</p> -->

						<!-- <router-link tag="ul" class="remindList" to="/nutritionUploadPhoto"> -->
						<!-- <ul class="remindList">
							<li class="margin10">
								<div class="left">
									<div class="rowTop">
										<img src="@/assets/images/yaopin@2x.png" class="icon" />
										<span class="huiFont font14">ABD活性因子未服用</span>
									</div>
									<div class="rowBottom font12">
										<p class="yellow">应完成时间：<span>06:30</span> 已超时：<span>1小时20分钟</span></p>
									</div>
								</div>
								<div class="right yellow font14">
									<mt-badge size="small" color="#F78335">
										<span style="padding: 2px 5px;">确认完成</span>
									</mt-badge>
								</div>
							</li>
						</ul> -->
						<!-- </router-link> -->

						<!-- <div class="my-cell borderBottom marginTop10">
							<img src="@/assets/images/zaoqian@2x.png" width="20" height="20" />
							<span class="">早前</span>
							<span class="float_right huiFont font14">{{earliertime}}</span>
						</div>
						<div class="content-list margin10">
							<div class="my-cell" v-for="(item,index) in earlierdata" :key="index">
								<span class="font14">{{item.earlier_productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.earlier_unit}}（{{item.earlier_Weight}}）</span>
									<img src="@/assets/images/select@2x.png" alt="" width="20" v-if="item.earlierflag == 1"/>
									<img src="@/assets/images/select_click@2x.png" alt="" width="20" v-if="item.earlierflag == 2"/>
								</div>
							</div>
						</div>

						<div class="my-cell borderBottom">
							<img src="@/assets/images/wuqian@2x.png" width="20" height="20" />
							<span class="">午前</span>
							<span class="float_right huiFont font14">{{beforenoontime}}</span>
						</div>
						<div class="content-list margin10">
							<div class="my-cell" v-for="(item,index) in beforenoondata" :key="index">
								<span class="font14">{{item.beforenoon_productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.beforenoon_unit}}（{{item.beforenoon_Weight}}）</span>
									<img src="@/assets/images/select@2x.png" alt="" width="20" v-if="item.beforenoonflag == 1"/>
									<img src="@/assets/images/select_click@2x.png" alt="" width="20" v-if="item.beforenoonflag == 2"/>
								</div>
							</div>
						</div>

						<div class="my-cell borderBottom">
							<img src="@/assets/images/zaoqian@2x.png" width="20" height="20" />
							<span class="">晚前</span>
							<span class="float_right huiFont font14">{{beforelatetime}}</span>
						</div>
						<div class="content-list margin10">
							<div class="my-cell borderBottom" v-for="(item,index) in beforelatedata" :key="index">
								<span class="font14">{{item.beforelate_productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.beforelate_unit}}（{{item.beforelate_Weight}}）</span>
									<img src="@/assets/images/select@2x.png" alt="" width="20" v-if="item.beforelateflag == 1"/>
									<img src="@/assets/images/select_click@2x.png" alt="" width="20" v-if="item.beforelateflag == 2"/>
								</div>
							</div>
						</div>

						<div class="my-cell borderBottom">
							<img src="@/assets/images/shuiqian@2x.png" width="20" height="20" />
							<span class="">睡前</span>
							<span class="float_right huiFont font14">{{sleeplatetime}}</span>
						</div>
						<div class="content-list margin10">
							<div class="my-cell" v-for="(item,index) in sleeplatedata" :key="index">
								<span class="font14">{{item.sleeplate_productname}}</span>
								<div class="float_right huiFont font14">
									<span style="margin-right: 5px;">{{item.sleeplate_unit}}（{{item.sleeplate_Weight}}）</span>
									<img src="@/assets/images/select@2x.png" alt="" width="20" v-if="item.sleeplateflag == 1"/>
									<img src="@/assets/images/select_click@2x.png" alt="" width="20" v-if="item.sleeplateflag == 2"/>
								</div>
							</div>
						</div> -->
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
				<div class="yinshhi_list" :hidden="ABflag == 1">
					<div class="noalready" v-if="dataflag==0">
						<img src="@/assets/images/nowzzz.png" />
						<p>营养方案正在制作中...</p>
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
						<!-- <router-link to="/gauge_nutrition?resetstatus=1" class="buttons">
							<mt-button type="danger" class="add_btns" size="large">调整处方</mt-button>
						</router-link> -->
					</div>

				</div>
			</div>
			<empty-data v-show="!$route.query.skey" />
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
			// beforelatedata: [], //晚前
			// beforenoondata: [], //午前
			// earlierdata: [], //早前
			// sleeplatedata: [], //睡前
			// earliertime: '',
			// beforenoontime: '',
			// beforelatetime: '',
			// sleeplatetime: '',
			hzskey:'',  //患者key
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
			dataflag:0
		}),
		methods: {
			toggleType(item) {
				this.ABflag = item.type;
			},
			//今日营养
			todayNutrition(){
				let url = "UserInterface/NutritionPrescription.ashx";
				// const userInfo = JSON.parse(localStorage.userInfo);
				let param = {
					patientskey:this.hzskey
				}
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
				let param = {
					patientskey:this.hzskey
				}
				this.$post(url,param).then((data) => {
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
			// 今日营养
			// todayDiet() {
			// 	let url = "UserInterface/NutritionToday.ashx";
			// 	let param={
			// 		patientskey:this.hzskey
			// 	};
			// 	this.$post(url,param).then((data) => {
			// 		if (data.rspcode != 1) {
			// 			return;
			// 		}
			// 		//今日营养
			// 		this.beforelatedata = data.beforelatedata;
			// 		this.beforenoondata = data.beforenoondata;
			// 		this.earlierdata = data.earlierdata;
			// 		this.sleeplatedata = data.sleeplatedata;
			// 		this.earliertime = data.earlierdata[0].earliertime;
			// 		this.beforenoontime = data.beforenoondata[0].beforenoontime;
			// 		this.beforelatetime = data.beforelatedata[0].beforelatetime;
			// 		this.sleeplatetime = data.sleeplatedata[0].sleeplatetime;
			// 	})
			// },
		},
		mounted() {
			this.todayNutrition();
			this.todayDiet();
		},
		created() {
			this.hzskey = this.$route.query.skey;
		}
	}
</script>

<style scoped lang="scss">
  .mint-header {
    height: 0.44rem;
    line-height: 0.44rem;
    border-bottom: 1px solid #e5e5e5;
  }
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

		&>* {
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

	.morning {
		background: #FFFFFF url(../../../assets/images/eyenext.png) no-repeat 98% center !important;
		background-size: 0.3rem !important;
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
