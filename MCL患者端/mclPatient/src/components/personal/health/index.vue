<template>
	<div>
		<div class="fix_top">
			<mt-header title="健康档案" fixed class="borderBottom">
				<div slot="left">
					<router-link to="/wx_Entrance/personal" style="color: initial;">
						<mt-button icon="back"></mt-button>
					</router-link>
				</div>
			</mt-header>
		</div>
		<div class="health padding-header">
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
				<div slot="content">
					<p class="health_name">
						<span>{{Nickname}}的健康档案</span>
					</p>
					<div class="health_ul">
						<router-link v-for="(item,index) in list" :key="index" tag="div" :to="item.redirecturl">
							<div class="chat_list">
								<h4>{{item.redt}}</h4>
								<div class="chat_li">
									<div class="chat_ppo">
										<h5>
											<span>{{item.mtypetext}}</span>
											<label>详情</label>
										</h5>
										<p v-for="(i,v) in item.data" :key="v">{{i.value}}</p>
									</div>
								</div>
							</div>
						</router-link>

						<!-- <div class="chat_list">
							<h4>2017.6.12 14:56</h4>
							<div class="chat_li">
								<div class="chat_ppo">
									<h5>
										<span>[复查]</span>
										<label>详情</label>
									</h5>
									<p>复查医生：王小二</p>
									<p>复查内容：相关内容内容内容混分巨兽的恢复数据库</p>
									<p>医生备注：备注患者就诊意向、消费水平等</p>
								</div>
							</div>
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
			Nickname: "",
			param: {
				pagesize: 10,
				pagecount: 0
			},
			list: []
		}),
		methods: {
			//个人信息
			information() {
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					let model = data.data;
					if (model) {
						this.Nickname = model.Nickname;
					}
				})
			},
			//获取档案信息
			getList(success) {
				let url = "UserInterface/HealthRecords.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.reviewinfo;
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
		mounted: function() {
			this.information();
		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.health {
		margin-top: 43px;
		padding: 0.1rem 3%;

		.health_name {
			width: 94%;
			background: #fff;
			padding: 0.1rem 3%;
			border-bottom: 1px solid #DFE6E7;

			span {
				display: block;
				color: #333;
				font-size: 0.14rem;
				padding-left: 0.14rem;
				border-left: 2px solid #F78335;
			}
		}
	}

	.health_ul {
		background: #fff;
		padding: 0.16rem 0;
	}

	.chat_list {
		width: 97%;
		padding-left: 3%;

		h4 {
			height: 0.3rem;
			font-weight: normal;
			font-size: 0.13rem;
			color: #636768;
			background: url(../../../assets/images/shijianzhou.png) no-repeat left center;
			background-size: 0.16rem;
			padding-left: 0.32rem;
			line-height: 0.3rem;
		}

		.chat_li {
			border-left: 1px solid #C9CED5;
			padding: 0.06rem 0.1rem;
			margin-left: 0.07rem;

			.chat_ppo {
				width: 87%;
				background: #fff;
				margin-left: 4%;
				padding: 0.1rem;

				h5 {
					font-size: 0.14rem;
					overflow: hidden;
					font-weight: 500;
					padding-bottom: 0.04rem;
					color: #333;

					span {
						float: left;
					}

					label {
						float: right;
						font-size: 0.12rem;
						color: #636768;
					}
				}

				p {
					font-size: 0.13rem;
					color: #636768;
					padding-top: 0.02rem;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
	}
</style>
