<template>
	<div class="achievement_root padding-header">
		<mt-header title="我的收益" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
			<!--<div slot="right">
        <img src="https://resource.jtsc.club/rili@2x.png" alt="" style="width: 20px;height: 20px;" @click="timePickerShow">
      </div>-->
		</mt-header>

		<div class="showMoney text-center">
			<p>
				<img src="../../../assets/images/w_yue_wd@2x.png" style="width: 0.25rem;height: 0.25rem;" />
				{{total_performance}}
			</p>
		</div>

		<div id="navbar" class="borderBottom" v-if="isShowBar">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('1')">
					<p>渠道收益</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('2')">
					<p>医生收益</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('3')">
					<p>员工收益</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<!-- tab-container -->
		<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
			<div slot="content">
				<mt-cell v-for="(item,index) in list" :title="item.money" :label="item.create_date" :key="index" class="borderBottom">
					<div class="right text-right">
						<span>{{item.remarks}}</span>
						<span class="mint-cell-label">{{item.contactPhone}}</span>
					</div>
				</mt-cell>
			</div>
		</loadMore>

		<!--月份picker-->
		<!--<monthPicker @confrim="monthPickerConfrim" ref="monthPicker" firstYear="总业绩"/>-->

		<div class="buttons">
			<router-link :to="'/yjcardRefund'">
				<mt-button type="default" class="add_btns" size="large">提现</mt-button>
			</router-link>
		</div>

	</div>
</template>

<script>
	//import monthPicker from "@/components/common/monthPicker.vue";   //月份picker
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "achievement",
		data: () => ({
			selected: "tab0",
			pickerVisible: false,
			isShowBar: false, //是否显示分类
			total_performance: '', //总业绩
			personal_performance: '', //团队佣金
			direct_performance: '', //社区佣金
			community_performance: '', //患者佣金
			list: [],
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"type": "1", //状态（1：团队佣金，2：社区佣金，3：患者佣金）
			}
		}),
		methods: {
			//tab切换
			tabClick(val) {
				this.param.type = val
				this.$Indicator.loading();
				this.reloadLoadMore();
				setTimeout(() => {
					this.$Indicator.close()
				}, 200)
			},
			//重新加载
			reloadLoadMore() {
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
			},
			//获取列表
			getList(success) {
				let url = "UserInterface/channel/GetUserCommissionList.ashx";
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if (data.rspCode != 1) {
						return;
					}
					let modelList = data.data;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
					const {
						commission_amount,
						teamcommissions,
						communitycommission,
						patientcommission
					} = data;

					//        this.personal_performance = teamcommissions;  //团队佣金
					//        this.direct_performance = communitycommission;  //社区佣金
					//        this.community_performance = patientcommission;  //患者佣金
					this.total_performance = commission_amount; //总佣金
				})
			},
			timePickerShow() {
				let {
					monthPicker
				} = this.$refs;
				monthPicker.show();
			},
			//时间picker的确定
			monthPickerConfrim(values) {
				let [year, month] = values;
				let {
					monthPicker
				} = this.$refs;
				let firstYear = monthPicker.firstYear;
				if (year == firstYear) {
					this.param.years = ""
				} else {
					month = parseInt(month);
					month = (month < 10 ? `0${month}` : month);
					this.param.years = `${parseInt(year)}-${month}`
				}
				this.reloadLoadMore();
			},
		},
		mounted(){
			const type= this.$route.query.type;
			if(type){
				this.tabClick(type);
				if(type==2){
					this.selected='tab1'
				}else if(type==3){
					this.selected='tab2'
				}
			}
			
		},
		created() {
			//员工或渠道经理账号权限：不分佣金类型
			if (localStorage.userInfo) {
				const UserInfo = JSON.parse(localStorage.userInfo);
				const UserType = UserInfo.userType; //6  推广员工   7 发货员工  8  渠道经理 
				if (UserType == "6" || UserType == "7" || UserType == "8") {
					this.isShowBar = false;
					this.param.type = "";
				} else {
					this.isShowBar = true
				}
			}
		},
		components: {
			//    monthPicker,
			loadMore
		}
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.mint-cell.borderBottom {
		padding: 0.06rem 0;
		align-items: center;
		align-content: center;
	}

	.right.text-right {
		color: $color60;
		font-size: 0.15rem;

		&>span:nth-child(2) {
			margin-top: 5px;
		}
	}

	.showMoney {
		margin-bottom: 5px;
		background: #ffffff;

		p {
			line-height: 0.92rem;
			font-size: 0.36rem;
		}
	}

	.showMoney {
		background: #FFDCDC;
		color: #FF1E41;
	}

	.friend_all {
		background: #ffffff;
		font-size: 15px;
		padding: 14px 0;
		color: $color33;
		margin-bottom: 5px;

		/*position: fixed;*/
		/*left: 0;*/
		/*right: 0;*/
		/*top: 43px;*/
		ul {
			display: flex;

			li {
				flex: 1;
			}

			.num {
				margin-top: 6px;
				font-size: 18px;
			}
		}
	}
</style>
