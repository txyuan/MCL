<template>
	<div>
		<div class="fix_top">
			<mt-header title="复查管理" class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div class="review">
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
				<div slot="content">
					<div class="rev_fuc">
						<h3>复查提醒</h3>
						<!-- <div class="rev_list" v-for="(item,index) in todynews" :key="index">
							<div class="rev_lilf">
								<p>复查时间： 10月16日～10月22日</p>
								<label>复查项： 血常规、X光、B超</label>
							</div>
							<router-link to="/physician?pageState=add">
								<span>上传报告</span>
							</router-link>
						</div>
						<div class="rev_list">
							<div class="rev_lilf">
								<p>复查时间： 10月16日～10月22日</p>
								<label>复查项： 血常规、X光、B超</label>
							</div>
							<router-link to="/physician">
								<span>上传报告</span>
							</router-link>
						</div> -->
						<ul class="remindList">
							<router-link tag="li" to="" v-for="(item,index) in todynews" :key="index" class="borderBottom">
								<div class="left">
									<div class="rowTop">
										<img src="@/assets/images/yinshi@2x.png" class="icon" />
										<span class="huiFont font14">{{item.takingcondition}}</span>
									</div>
									<div class="rowBottom font12">
										<p class="yellow">应完成时间：<span>{{item.completiontime}}</span> 已超时：<span>{{item.timeouttime}}</span></p>
									</div>
								</div>
								<!-- <div class="right yellow font14" @click.stop="cklcl(item)">
									查看 <img src="@/assets/images/next@2x.png" alt="" width="22" class="next" />
								</div> -->
							</router-link>
						</ul>
					</div>
					<div class="rev_fuc" style="margin-top: 0.1rem;">
						<h3>历史预约</h3>
						<div class="rev_list" v-for="(item, index) in list" :key="`list${index}`">
							<div class="rev_lilf">
								<p>{{item.name}} <i style="font-style: normal;color: green;font-size: 0.12rem;">({{item.Booking_status}})</i></p>
								<label>复查时间： {{item.CreateTime}}</label>
							</div>
							<router-link :to="`/reviewDetail?skey=${item.skey}`">
								<span class="greens">查看</span>
							</router-link>
						</div>
						<!-- <div class="rev_list">
							<div class="rev_lilf">
								<p>复查时间： 10月16日～10月22日</p>
								<label>复查项： 血常规、X光、B超</label>
							</div>
							<span class="bluue">补录报告</span>
						</div> -->
					</div>
				</div>
			</loadMore>

		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "index",
		data: () => ({
			param: {
				pagesize: 10,
				pagecount: 0
			},
			list: [],
			tipList: [], //复查提醒列表
			todynews: [], //复查提醒
		}),
		methods: {
			// 今日提醒
			remindToday() {
				let url = "UserInterface/PatientHomePageRemindToday.ashx";
				let param = {
					functiontype: 5,
					pagesize: 20,
					pagecount: 1
				};
				this.$post(url, param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.todynews = data.remindtoday;
				})
			},
			//获取列表
			getList(success) {
				let url = "UserInterface/getReviewthebooking.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					if (this.param.pagecount == 1) {
						this.list = [...modelList];
					} else {
						this.list = [...this.list, ...modelList]
					}
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
		},
		mounted() {
			this.remindToday();
		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
	.review {
		margin-top: 43px;

		.rev_fuc {
			width: 100%;
			background: #fff;

			h3 {
				height: 0.5rem;
				line-height: 0.5rem;
				padding-left: 4%;
				font-size: 0.15rem;
				color: #333;
				border-bottom: 1px solid #eee;
			}

			.rev_list {
				padding: 0.13rem 3% 0.15rem 4%;
				border-bottom: 1px solid #eee;
				overflow: hidden;

				.rev_lilf {
					float: left;
					width: 70%;

					p {
						color: #333333;
						font-size: 0.14rem;
					}

					label {
						color: #666;
						display: block;
						margin-top: 0.06rem;
						font-size: 0.12rem;
					}
				}

				span {
					float: right;
					height: 0.28rem;
					padding: 0 0.14rem;
					display: block;
					background: #F78335;
					color: #fff;
					line-height: 0.28rem;
					font-size: 0.14rem;
					border-radius: 0.14rem;
					margin-top: 0.08rem;

					&.greens {
						background: #4D9C30;
					}

					&.bluue {
						background: #6358F4;
					}
				}
			}
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
</style>
