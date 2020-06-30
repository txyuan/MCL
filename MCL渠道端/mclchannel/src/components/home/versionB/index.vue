<template>
	<div>
		<div id="head_shop">
			<router-link to="/searchproduct"><img src="../../../assets/images/sousuo@2x.png" /></router-link>
			<h3>商品</h3>
		</div>
		<div class="nav_fenl">
			<div class="nav_wrap">
				<span v-for="(item,index) in liList" v-on:click="addClass(item,index)" v-bind:class="{ act:index==current}">{{item.name}}</span>
			</div>
		</div>
		<div class="contant" id="content" style="padding-bottom: 63px;">
			<loadMore :param="param" @triggerGetList="getList" ref="loadMoreE" :isDefaultLoading="false">
				<div slot="content">
					<div class="veas_ul">
						<div v-for="(item,index) in list" :key="index" class="veas_list" v-if="">
							<router-link :to="`/classdetail/${item.goodsId}`" class="img_wrap"><img :src="item.goodsImage" /></router-link>
							<h3>{{item.goodsName}}</h3>
							<p>
								<span style="font-size: 0.16rem;"><i style="font-style: normal;"></i>¥{{item.marketPrice}}</span>
							</p>
						</div>
					</div>
				</div>
			</loadMore>
		</div>

	</div>
</template>

<script>
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	import imgsss from "@/assets/images/lianxikefu@2x.png";
	export default {
		name: "versionIndex",
		data: () => ({
			title: "B版",
//			veas_list: 'veas_list',
//			vea_list: 'vea_list',	
			//分类
			liList: [{name:"默认", sKey:""}], 
			current: 0,
			//产品推荐
			param: {
				"saleorder":"",//0，销量降序;1，销量升序
				"priceOrder":"",//0，价格降序;1，价格升序
				"pagesize": 10,
				"pagecount": 0,
				"secondSubjectType":""
			},
			list: [],
			
		}),
		methods: {
			//触发加载更多
			startLoad() {
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
			},
			//选择分类
			getType() {
				let url = "UserInterface/GetProductCategoryList.ashx";
				this.$post(url).then((data) => {
					let subjectList = data.list;
					let param={
						firstCategorysKey:subjectList[1].sKey,
						pagesize: 99999999,
						pagecount: 1
					}
					this.$post(url,param).then((data) => {
						let subjectList = data.list;
						this.liList = [...this.liList, ...subjectList]; 
					})
				})
				
			},
			//商品列表
			getList(success) {
				let url = "UserInterface/GetProductList.ashx";
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.goodsList;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if (success) {
						success(modelList, this.list)
					}
				})
			},
			addClass: function(item, index) {
				this.current = index;
				this.param.secondSubjectType = item.sKey;
				this.startLoad(); //触发加载更多
			},
			//爆品区
			getAdrList(success) {
				let url = "UserInterface/user/GetExplosiveProductBList.ashx";
				if(this.param.pagecount == 1) {
					this.list = [];
				}
				this.$post(url, this.param).then((data) => {
					if(data.rspcode != 1) {
						return;
					}
					let modelList = data.goodsList;
					this.list = [...this.list, ...modelList]
					//加载更多组件触发回调
					if(success) {
						success(modelList, this.list)
					}
				})
			}
		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			let keepAlive = (to.name == "versionBdetail") ? true : false;
			this.$route.meta.keepAlive = keepAlive;
			next()
		},
		mounted() {
			//获取分类
			this.getType();
			//触发加载更多
			this.startLoad(); 
		},
		components: {
			loadMore
		}
	}
</script>

<style scoped lang="scss">
	#head_shop {
		width: 100%;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		height: 0.44rem;
		img {
			position: absolute;
			height: 0.22rem;
			top: 0.1rem;
			left: 4%;
		}
		h3 {
			text-align: center;
			font-size: 0.18rem;
			color: #333;
			line-height: 0.44rem;
			font-weight: normal;
		}
	}
	
	.nav_fenl {
		position: fixed;
		top: 0.44rem;
		height: 0.44rem;
		overflow: hidden;
		background: #fff;
		width: 100%;
		overflow: hidden;
		.nav_wrap{
			display: inline-block;
			white-space: nowrap;
			padding-right: 0.15rem;
		}
		span {
			display: inline-block;
			margin-left: 0.15rem;
			line-height: 0.44rem;
			font-size: 0.15rem;
			color: #666;
			text-align: center;
			&.act {
				color: #FF3D3D;
			}
		}
	}
	
	#content {
		padding-top: 0.88rem;
	}
	
	.veas_ul {
		width: 100%;
		overflow: hidden;
		.veas_list {
			width: 46%;
			background: #fff;
			float: left;
			border-radius: 8px;
			padding-bottom: 0.1rem;
			margin: 0.09rem 0 0 2.66%;
			img {
				width: 100%;
				height: 1.78rem;
				display: block;
			}
			h3 {
				font-weight: normal;
				font-size: 0.15rem;
				width: 90%;
				margin: 0 auto;
				height: 0.34rem;
				margin-top: 0.06rem;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2;
				/** 显示的行数 **/
				overflow: hidden;
				/** 隐藏超出的内容 **/
			}
			p {
				width: 90%;
				margin: 0 auto;
				margin-top: 0.08rem;
				overflow: hidden;
				span {
					color: #FF3D3D;
					font-size: 0.16rem;
					line-height: 0.24rem;
				}
				label {
					width: 0.78rem;
					height: 0.24rem;
					font-size: 0.12rem;
					display: block;
					background: #FF913D;
					border-radius: 0.13rem;
					float: right;
					color: #fff;
					text-align: center;
					line-height: 0.24rem;
				}
			}
		}
	}
	
	.vea_list {
		width: 96%;
		padding: 2% 2%;
		background: #fff;
		clear: both;
		float: left;
		margin-top: 0.06rem;
		img {
			width: 100%;
		}
		h3 {
			width: 90%;
			margin-left: 2%;
			font-weight: 600;
			font-size: 0.16rem;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			margin-top: 0.1rem;
		}
		p {
			overflow: hidden;
			margin-top: 0.14rem;
			span {
				font-size: 0.2rem;
				color: #FF3D3D;
				float: left;
				line-height: 0.28rem;
				margin-left: 2%;
			}
			label {
				width: 0.8rem;
				height: 0.28rem;
				font-size: 0.13rem;
				display: block;
				background: #FF913D;
				border-radius: 0.14rem;
				float: right;
				color: #fff;
				text-align: center;
				line-height: 0.28rem;
			}
		}
	}
	
	.bpq {
		width: 100%;
		height: 0.48rem;
		background: url(../../../assets/images/bpq.png) no-repeat center center;
		background-size: 100%;
		color: #fff;
		text-align: center;
		line-height: 0.48rem;
		font-size: 0.18rem;
		margin-top: 0.1rem;
	}
	
	.veas_ulb {
		padding-bottom: 0.08rem;
		.veas_list {
			border: 1px solid #FF913D;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
</style>