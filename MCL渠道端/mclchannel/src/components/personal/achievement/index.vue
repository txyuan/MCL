<template>
	<div class="achievement_root padding-header">
		<mt-header title="我的业绩" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

		<div class="showMoney text-center">
			<p>
				<img src="../../../assets/images/w_yeji_wd@2x.png" style="width: 0.25rem;height: 0.25rem;" />
				{{total_performance}}
			</p>
		</div>

		<div id="navbar" class="borderBottom" v-if="isShowBar">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('1')">
					<p>渠道业绩</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('2')">
					<p>医生业绩</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('3')">
					<p>员工业绩</p>
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
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "achievement",
		data: () => ({
			selected: "tab0",
			isShowBar: false, //是否显示分类
			pickerVisible: false,
			total_performance: '', //总业绩
			personal_performance: '', //个人业绩
			direct_performance: '', //直推业绩
			community_performance: '', //社区业绩
			list: [],
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"direction": "1",
				//"years": ""  // "" : 全部,  2019-06
			},
		}),
		methods: {
			//tab切换
			tabClick(val) {
				this.$Indicator.loading();
				this.param.direction = val;
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
				let url = "UserInterface/GetTotalPerformanceList.ashx";
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
						total_performance,
						personal_performance,
						direct_performance,
						community_performance
					} = data;
					this.total_performance = total_performance;
					this.personal_performance = personal_performance;
					this.direct_performance = direct_performance;
					this.community_performance = community_performance;

				})
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
				const UserType = UserInfo.UserType; //6  推广员工   7 发货员工  8  渠道经理 
				if (UserType == "6" || UserType == "7" || UserType == "8") {
					this.isShowBar = false;
					this.param.direction = "";
				} else {
					this.isShowBar = true
				}
			}
		},
		components: {
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
