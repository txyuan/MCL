<template>
	<div class="sport-root">
		<div id="body_main" style="padding-top: 88px;">
			<mt-header title="运动" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>

			<!-- mt-navbar -->
			<div id="navbar" class="fix_top" style="top: 43px;">
				<mt-navbar v-model="ABflag">
					<mt-tab-item v-for="(item,index) in navbarList" :key="index" :class="(ABflag == item.type)&&'is-selected'" @click.native="toggleType(item)">
						<p>{{item.name}}</p>
					</mt-tab-item>
				</mt-navbar>
			</div>

			<!-- 内容 -->
			<div class="neirong">
				<!-- 今日运动 -->
				<div class="yinshhi_list" :hidden="ABflag == 2">
					<!-- 今日提醒 -->
					<div class="home-cell margin10">
						<p class="name">今日提醒</p>

						<router-link tag="ul" v-for="(item,index) in todynews" :key="index" class="remindList" to="">
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
								<div class="right yellow font14" @click="oksuccess(item)">
									<mt-badge size="small" color="#F78335">
										<span style="padding: 2px 5px;">确认完成</span>
									</mt-badge>
								</div>
							</li>
						</router-link>
					</div>

					<div class="home-cell">
						<p class="name">运动完成情况</p>
					</div>
					<div class="sport-cell clear borderBottom" v-for="(item,index) in todysport" :key="index">
						<div class="name float_left">{{item.sportsname}}</div>
						<div class="content float_left">
							<div class="left">
								<span class="huiFont font14">{{item.motorunit}}</span>
							</div>
							
							<img src="@/assets/images/select@2x.png" alt="" width="20" v-if="item.motionflag == 1"/>
							<img src="@/assets/images/select_click@2x.png" alt="" width="20" v-if="item.motionflag == 2"/>
						</div>
					</div>
				</div>

				<!-- 运动方案 -->
				<div class="yinshhi_list padding-footer" :hidden="ABflag == 1">
					<div class="noalready" v-if="dataflag==0">
						<img src="@/assets/images/nowzzz.png" />
						<p>请稍等，您的运动方案正在制作中...</p>
					</div>
					<div v-else>
						<mt-cell is-link class="borderBottom margin10 sportEvaluation-wrap" @click.native="sportPickerToggles('show')" style="display: none;">
							<div slot="title" class="titleWrap">
								<span class="mint-cell-text">选择运动自评</span>
							</div>
							<div class="sportEvaluation">
								{{sportDefaultName}}
							</div>
						</mt-cell>
						<!-- <router-link to="/sportAgreement">
							<p class="red text-right font12 margin10" style="padding: 0 10px;text-decoration: underline;">运动禁忌须知</p>
						</router-link> -->
						<div class="sport-cell clear borderBottom" v-for="(item,index) in sportway" :key="index">
							<div class="name float_left">{{item.sportsname}}</div>
							<div class="content float_left">
								<div class="left" style="width: 70%;line-height: 0.2rem;">
									<span class="huiFont font14">{{item.motorunit}}</span>
								</div>
								<span class="yellow font14" @click="doGuidance(item.skey)">查看指导</span>
							</div>
						</div>
						<div class="fix_bottom fix_bottom_area">
							<mt-button type="primary" class="theme-button button-radio " size="large" @click.native="save">调整处方</mt-button>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 运动自评picker  -->
			<mt-popup
				class="sportPicker"
				v-model="sportVisible"
				position="bottom">
				<mt-picker 
					:slots="sportSlot" 
					:showToolbar="true" 
					:visibleItemCount="3" 
					ref="sportPickers"
				>
				    <div class="picker_bar">
						<div class="cancel" @click="sportPickerToggles('hide')">取消</div>
						<div class="confrim" @click="sportConfirm">确定</div>
				    </div>
				</mt-picker>
			</mt-popup>
				
		</div>
	</div>
</template>

<script>
	export default {
		name: "sport",
		data: () => ({
			ABflag: 1,
			navbarList: [{
				name: "今日运动",
				type: 1
			}, {
				name: "运动方案",
				type: 2
			}],
			dataflag:0,
			//参数
			param:{
				flag: 1,  //1:默认查询，2：选择框查询
				score: "",  //分值
			},
			
			todysport:[],   //今日运动
			sportway:[],    //运动方案
			
			//运动自评picker
			sportList:[
				{name:"请选择", val:""}, 
				{name:"身体正常，无任何不适", val:"100"}, {name:"能进行正常活动，有轻微不适", val:"90"}, {name:"勉强可正常活动，有一些不适", val:"80"},  
				{name:"生活可自理，但不能维持正常生活或工作", val:"70"}, {name:"有时需人扶助，多数时间可自理", val:"60"}, {name:"常需人照料", val:"50"}, 
				{name:"生活不能自理，需特别照顾", val:"40"}, {name:"生活严重不能自理", val:"30"}, {name:"病重，需住院积极支持治疗", val:"20"}, 
				{name:"病危，临近死亡", val:"10"}, {name:"死亡", val:"0"},
			],
			sportDefaultName:"请选择",  //页面显示的文字
			sportVisible: false,
			sportSlot:[
				{
					flex: 1,
					values: [
						'请选择',
						'身体正常，无任何不适', '能进行正常活动，有轻微不适', '勉强可正常活动，有一些不适', 
						'生活可自理，但不能维持正常生活或工作', '有时需人扶助，多数时间可自理','常需人照料', 
						'生活不能自理，需特别照顾', '生活严重不能自理', '病重，需住院积极支持治疗', 
						'病危，临近死亡', '死亡',
					],
					className: 'slot1',
					textAlign: 'center'
				}
			],
			todynews:[],  //今日提醒
		}),
		methods: {
			// 今日提醒
			remindToday() {
				let url = "UserInterface/PatientHomePageRemindToday.ashx";
				let param={
					functiontype:3,
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
			
			// 确认完成
			oksuccess(item) {
				let url = "UserInterface/PatientMotionConfirm.ashx";
				let param={
					motionskey:item.motionskey,
					seatskey:item.skey,
					flag:2
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.remindToday();
					this.todayDiet();
				})
			},
			
			// 今日运动 运动方案
			todayDiet() {
				let url = "UserInterface/ScreeningTodaySports.ashx";
				return this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return data;
					}
					this.dataflag=data.dataflag;
					if(this.param.flag == 1){
						this.todysport=data.data;
						this.sportway=data.data;
					}
					if(this.param.flag == 2){
						this.sportway=data.data;
					}
					return data;
				})
			},
			
			//查看指导
			doGuidance(skey) {
				let url = "UserInterface/ScreeningTodaySportsDetail.ashx";
				let param = { skey }
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.$MessageBox.alert(data.motiondetails);
				})
			},
			
			//保存方案
			save(){
				this.$router.push('/sport_CF?resetstatus=1');
				// const { score } = this.param;
				// if(score == ""){
				// 	this.$Toast("请选择运动自评")
				// 	return
				// }
				// let url = "UserInterface/ScreeningTodaySportsSave.ashx";
				// let param = { score }
				// this.$post(url, param).then((data) => {
				// 	this.$Toast(data.rspdesc)
				// 	if (data.rspcode != 1) {
				// 		return;
				// 	}
				// 	this.param.score = "";
				// 	this.param.flag = 1;
				// 	//获取默认今日运动
				// 	this.todayDiet();
				// })
			},
			
			//运动自评picker
			sportPickerToggles(state){
				if(state == "show"){
					this.sportVisible = true;
				}
				if(state == "hide"){
					this.sportVisible = false;
				}
			},
			//运动自评picker 确定事件
			sportConfirm(){
				const {sportPickers} = this.$refs;
				let statecode = sportPickers.getSlotValue(0);
				this.sportList.forEach((item, index)=>{
					if(item.name == statecode){
						const {val, name} = item;
						this.param.score = val;
						this.param.flag = 2;
						this.sportDefaultName = name;
						//设置运动方案
						this.todayDiet();
					}
				})
				this.sportPickerToggles('hide');
			},
		},
		mounted() {
			this.remindToday();
			this.todayDiet().then((data)=>{
				if (data.rspcode != 1) {
					return;
				}
				//设置默认的运动自评
				const score = data.score;
				let sportDefaultName = "";
				this.sportList.forEach((item, index)=>{
					if(item.val == score){
						const {val, name} = item;
						sportDefaultName = name;
					}
				})
				const {sportPickers} = this.$refs;
				sportPickers.setSlotValue(0, sportDefaultName);
				this.sportDefaultName = sportDefaultName;
				
			});
		}
	}
</script>
<style>
	.sportPicker .picker-slot{
		font-size: 14px;
	}
	a.mint-cell.sportEvaluation-wrap .mint-cell-text{
		font-size: 14px;
	}
	.sportEvaluation{
		width: 200px;
		text-align: right;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 14px;
	}
</style>
<style scoped lang="scss">
	//picker 的样式
	.mint-popup-bottom {
		width: 100%;
	}
	.picker_bar{
		display: flex;
		justify-content: space-between;
		text-align: center;
		line-height: 40px;
		padding: 0 20px;
		border-bottom: solid 1px #eaeaea;
		.confrim{
			color: #26a2ff;
		}
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

	.sport-cell {
		line-height: 0.64rem;
		background: #FFFFFF;
		padding: 0 0.12rem;

		.name {
			width: 30%;
		}

		.content {
			width: 70%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.content>* {
			display: inline-block;
		}

	}

	.sport-cell * {
		vertical-align: middle;
	}
	.noalready{
		text-align: center;
		margin-top: 30px;
		img{
			margin-bottom: 15px;
		}	
	}
</style>
