<template>
	<div class="achievement_root padding-header">
		<mt-header title="我的福利" fixed class="borderBottom">
			<div slot="left">
				<router-link to="/wx_Entrance/personal" style="color: initial">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
			<div slot="right">
				<img src="https://resource.jtsc.club/rili@2x.png" alt="" style="width: 20px;height: 20px;" @click="timePickerShow">
			</div>
		</mt-header>

		<div class="showMoney text-center">
			<p>
				<!-- <img src="../../../assets/images/w_jifen_wd@2x.png" style="width: 0.25rem;height: 0.25rem;" /> -->
				{{current_integra}}
			</p>
		</div>

		<div id="navbar" class="borderBottom">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('0')">
					<p>全部</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('1')">
					<p>收入</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('-1')">
					<p>支出</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<!-- tab-container -->
		<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer" :isDefaultLoading="false">
			<div slot="content">
				<mt-cell v-for="(item,index) in list" :key="index" :title="item.money" :label="item.create_date" class="borderBottom">
					<div class="right text-right">
						<span>{{item.remarks}}</span>
						<!-- <span class="mint-cell-label">消费{{item.money}}</span> -->
					</div>
				</mt-cell>
			</div>
		</loadMore>

		<!--<div class="buttons">-->
		<!--<router-link to="">-->
		<!--<mt-button type="default" class="add_btns" size="large" >转积分</mt-button>-->
		<!--</router-link>-->
		<!--</div>-->

	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "achievement",
		data: () => ({
			selected: "tab0",
			pickerVisible: false,
			current_integra: '', //总积分
			list: [], // l{money:'+200',create_date:'2018-02-03',remarks:'邀请好友'}
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"direction": "0"
			}
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
				let url = "UserInterface/GetUserIntegralList.ashx";
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
						current_integra
					} = data;
					this.current_integra = current_integra;
				})
			},
			timePickerShow() {
				let {
					monthPicker
				} = this.$refs;
				monthPicker.show();
			},
		},
		mounted() {
			this.reloadLoadMore();
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
			font-size: 0.32rem;
		}
	}

	.showMoney {
		background: #FFDFC9;
		color: #F78335;
		font-weight: 500;
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
