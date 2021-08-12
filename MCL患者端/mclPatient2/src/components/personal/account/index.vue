<template>
	<div>
		<mt-header title="亲属账号" fixed class="borderBottom">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
		</mt-header>
		<div class="friends_ul">
			<!-- <loadMore :param="param" @triggerGetList="getList" ref="loadMoreE">
				<div slot="content"> -->
			<div class="friends_li" v-for="(item,index) in list" :key="`list${index}`">
				<img :src="item.RelativesImg" />
				<div class="friends_name">
					<p>
						<span>{{item.RelativesName}}</span>
					</p>
					<label>{{item.RelativesTel}}</label>
				</div>
			</div>
			
			<!-- 空数据 -->
			<emptyData v-if="load && (list.length == 0)"/>

			<!-- <router-link tag="div" :to="'termsService?role=2&form=account&rphone='+repData.ContactPhone">
				<div class="add_id">
					<img src="../../../assets/images/fabu@2x.png" />
					<p>添加新的账号</p>
				</div>
			</router-link> -->

			<!-- </div>
			</loadMore>			 -->

			<!-- <div class="friends_li">
				<img src="../../../assets/images/bbanxl.png" />
				<div class="friends_name">
					<p>
						<span>王小二</span>
					</p>
					<label>17600001212</label>
				</div>
			</div>
			<div class="friends_li">
				<img src="../../../assets/images/bbanxl.png" />
				<div class="friends_name">
					<p>
						<span>王小二</span>
					</p>
					<label>17600001212</label>
				</div>
			</div> -->

		</div>
	</div>
</template>

<script>
	import emptyData from "@/components/common/emptyData.vue"; //加载更多组件
	export default {
		name: "index",
		data: () => ({
			param: {
				pagesize: 10,
				pagecount: 100
			},
			list: [],
			repData:{},
			load: false
		}),
		methods: {
			//个人信息
			information() {
				this.$Indicator.loading();
				let url = "UserInterface/GetUserShowInfo.ashx";
				this.$post(url).then((data) => {
					this.$Indicator.close();
					let model = data.data;
					if (model) {
						this.repData = model;
					}
				})
			},
			//获取好友
			getList(success) {
				let url = "UserInterface/RelativesAccountInfo.ashx";
				this.$post(url, this.param).then((data) => {
					this.load = true
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
					// if(success){
					//   success(modelList,this.list)
					// }
				})
			},
		},
		mounted: function() {
			this.information();
			this.getList()
		},
		components: {
			emptyData
		}
	}
</script>

<style scoped lang="scss">
	.friends_ul {
		margin-top: 51px;

		.friends_li {
			width: 94%;
			overflow: hidden;
			background: #fff url(../../../assets/images/duigou.png) no-repeat 96% center;
			background-size: 0.24rem;
			border-bottom: 1px solid #eee;
			padding: 0.12rem 2% 0.12rem 4%;

			img {
				height: 0.5rem;
				border-radius: 0.25rem;
				float: left;
			}

			.friends_name {
				float: left;
				width: 80%;
				margin-left: 0.1rem;

				p {
					overflow: hidden;

					span {
						font-size: 0.16rem;
						float: left;
						display: block;
						color: #333535;
					}

					i {
						float: right;
						font-size: 0.12rem;
						color: #999;
						font-style: normal;
					}
				}

				label {
					font-size: 0.16rem;
					color: #999;
					padding-top: 0.04rem;
					display: block;
				}
			}
		}
	}

	.add_id {
		overflow: hidden;
		width: 100%;
		padding: 0.12rem 0;
		border-bottom: 1px solid #eee;
		background: #fff;

		img {
			height: 0.24rem;
			float: left;
			margin-left: 8%;
		}

		p {
			font-size: 0.17rem;
			line-height: 0.24rem;
			color: #F78335;
			font-weight: 300;
			margin-left: 0.1rem;
			float: left;
		}
	}
</style>
