<template>
	<div class="achievement_root padding-header">
		<mt-header title="医生业绩" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>

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
		data: function(){
			const {skey, month}= this.$route.query;
			return {
				list: [],
				param: {
					"pagesize": 10,
					"pagecount": 0,
					skey,
					month
				},
			}
		},
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
				let url = "UserInterface/channel/DoctorAchievementDetailInfo.ashx";
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
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
