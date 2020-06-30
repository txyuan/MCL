<template>
	<div>
		<mt-header fixed title="消息列表">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="inform_cont">
			<!-- <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" class="padding-footer"> -->
				<div slot="content">
					<div class="inform_list" v-for="(item, index) in list" :key="index">
						<h2>
							<img :src="item.imgurl" />
							<span>{{item.title}}</span>
							<label>{{item.time}}</label>
						</h2>
						<div class="inform_jtds">
							<h4>{{item.status}}</h4>
							<span>{{item.remarks}}</span>
							<label>{{item.createtime}}</label>
							<p>查看详情</p>
						</div>
					</div>
				</div>
			<!-- </loadMore> -->

			<!--<div class="inform_list">
				<h2>
					<img src="../../assets/images/kdy.png" />
					<span>新订单发货提醒</span>
					<label>14:15:25</label>
				</h2>
				<div class="inform_jtds">
					<h4>新用户注册成功</h4>
					<span>新用户 何小何 扫描 员工 吴龙 二维码注册成功</span>
					<label>2019.10.07 14:15:25</label>
					<p>查看详情</p>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	export default {
		name: "newa-list",
		data: () => ({
			list: [],
			param: {
				"pagesize": 10,
				"pagecount": 0,
			}
		}),
		methods: {
			//获取列表
			// getList(success) {
			// 	let url = "UserInterface/channel/ChannelHomePageHeadlineList.ashx";
			// 	if(this.param.pagecount == 1) {
			// 		this.list = [];
			// 	}
			// 	this.$post(url, this.param).then((data) => {
			// 		if(data.rspcode != 1) {
			// 			return;
			// 		}
			// 		let modelList = data.data;
			// 		this.list = [...this.list, ...modelList]
			// 		//加载更多组件触发回调
			// 		if(success) {
			// 			success(modelList, this.list)
			// 		}
			// 	})
			// },
			getList() {
				let url = "UserInterface/channel/ChannelHomePageHeadlineList.ashx";
				this.$post(url).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					let modelList = data.data;
					this.list = modelList;
				})
			},
		},
		mounted(){
			this.getList();
		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
	.inform_cont {
		padding-bottom: 0.6rem;
		padding-top: 43px;
		.inform_list {
			padding: 0 6%;
			border-radius: 8px;
			overflow: hidden;
			margin-top: 0.2rem;
			h2 {
				background: #F1F1F1;
				overflow: hidden;
				height: 0.44rem;
				font-weight: normal;
				img {
					height: 0.22rem;
					width: 0.22rem;
					float: left;
					border-radius: 0.11rem;
					margin: 0.11rem 0 0 0.12rem;
				}
				span {
					display: block;
					float: left;
					line-height: 0.44rem;
					font-size: 0.15rem;
					color: #676767;
					margin-left: 0.2rem;
				}
				label {
					float: right;
					font-size: 0.12rem;
					color: #676767;
					margin-right: 0.12rem;
					line-height: 0.44rem;
					display: block;
				}
			}
			.inform_jtds {
				background: #fff;
				h4 {
					color: #333;
					font-size: 0.15rem;
					padding: 0.1rem 4%;
					font-weight: 600;
				}
				span,
				label {
					display: block;
					padding: 0 4%;
					color: #9197A5;
					font-size: 0.14rem;
				}
				label {
					padding: 0.08rem 4% 0.1rem 4%;
				}
				p {
					color: #9197A5;
					font-size: 0.14rem;
					padding: 0.1rem 4%;
					border-top: 1px solid #ddd;
					background: url(../../assets/images/jiantou@2x.png) no-repeat 98% center;
					background-size: 0.21rem;
				}
			}
		}
	}
</style>