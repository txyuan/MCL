<template>
	<div class="padding-header person_data_root">
		<div id="class_header" class="myassets">
			<mt-header title="我的用户" fixed class="borderBottom">
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>
		</div>
		<div class="card_achieve">
			<div class="card_alist">
				<p>总人数</p>
				<span>
					{{totalcount}}
				</span>
			</div>
			<div class="card_alist">
				<p>本月新增</p>
				<span>{{newcount}}</span>
			</div>
		</div>
		<div id="navbar" class="borderBottom" style="margin-top: 0.06rem;">
			<mt-navbar v-model="selected">
				<mt-tab-item id="tab0" @click.native="tabClick('1')">
					<p>渠道</p>
				</mt-tab-item>
				<mt-tab-item id="tab1" @click.native="tabClick('2')">
					<p>医生</p>
				</mt-tab-item>
				<mt-tab-item id="tab2" @click.native="tabClick('3')">
					<p>员工</p>
				</mt-tab-item>
			</mt-navbar>
		</div>

		<div class="borderpay">
			<!-- tab-container -->
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer">
				<div slot="content">
					<div class="callddh" v-for="(item,index) in list" :key="index">
						<!-- <mt-cell :title="item.nickname" :label="item.create_date" class="borderBottom">
							<div class="right text-right">
								<span>已推广 : {{item.nickname}}人</span>
								<span class="mint-cell-label">已消费 : ¥{{item.money}}</span>
							</div>
						</mt-cell>
						<img src="../../../assets/images/bohao@2x.png" class="calldh" /> -->
						<div class="content">
							<p class="left">{{item.contactphone}}</p>
							<p class="center">{{item.usertypename}}</p>
							<p class="right">{{item.create_date}}</p>
						</div>
					</div>
				</div>
			</loadMore>
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue";  //加载更多组件
	export default {
		name: "commission",
		data: () => ({
			selected: "tab0",
			totalcount: "", //总人数
			newcount: "", // 本月新增
			list: [],
			param: {
				"pagesize": 10,
				"pagecount": 0,
				"type": 1, //状态（1：渠道;2：医生;3：患者）
				"flag": 1, //1：我的用户，2：员工用户）
				"staffskey": "", //员工主键
			},
		}),
		methods: {
			//tab切换
			tabClick(val) {
				this.$Indicator.loading();
				this.param.type = val;
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
				setTimeout(() => {
					this.$Indicator.close()
				}, 200)
			},
			// 下面流水
			getList(success) {
				let url = "UserInterface/channel/StaffPromotionList.ashx";
				if(this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					this.list = [...this.list, ...modelList]
					this.totalcount = data.totalcount
					this.newcount = data.newcount
					//加载更多组件触发回调
					if(success) {
						success(modelList, this.list)
					}
				})
			}
		},
		mounted() {

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
	
	.buttons {
		overflow: hidden;
		label {
			width: 88%;
			float: left;
			height: 0.4rem;
			display: block;
			font-size: 0.15rem;
			color: #fff;
			text-align: center;
			line-height: 0.4rem;
			border-radius: 0.2rem;
			background: #4A8EF4;
			margin-top: 0.05rem;
			margin-left: 6%;
		}
	}
	
	.card_achieve {
		overflow: hidden;
		background: #fff;
		.card_alist {
			width: 50%;
			padding: 0.12rem 0;
			float: left;
			p {
				font-size: 0.14rem;
				color: #606060;
				text-align: center;
			}
			span {
				font-size: 0.3rem;
				color: #333333;
				text-align: center;
				display: block;
				padding: 0.06rem;
			}
		}
	}
	
	.shaixuan {
		height: 0.2rem;
		width: 0.2rem;
		margin-top: 0.08rem;
	}
	
	.callddh {
		position: relative;
		.calldh {
			position: absolute;
			height: 0.26rem;
			top: 50%;
			margin-top: -0.13rem;
			left: 48%;
		}
	}
	.callddh .content{
		display: flex;
		justify-content: space-between;
		line-height: 45px;
		background: #fff;
		padding: 0 5px;
		font-size: 14px;
		border-bottom: 1px solid #eee;
	}
</style>
<style lang="scss">
	.person_data_root {
		.mint-popup-bottom {
			width: 100%;
		}
		.picker_bar {
			display: flex;
			justify-content: space-between;
			text-align: center;
			line-height: 40px;
			padding: 0 20px;
			border-bottom: solid 1px #eaeaea;
			.confrim {
				color: #26a2ff;
			}
		}
		.picker-item {
			text-align: center;
		}
	}
</style>