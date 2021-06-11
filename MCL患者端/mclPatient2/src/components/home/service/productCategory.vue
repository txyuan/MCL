<template>
	<div>
		<div id="body_main" style="padding-bottom: 0;padding-top:43px;">
			<mt-header title="商城" fixed>
				<div slot="left">
					<header-back>
						<mt-button icon="back"></mt-button>
					</header-back>
				</div>
			</mt-header>

			<!-- 商品分类  导航条  -->
			<div class="type_block" ref="type_block">
				<nav-bar :param="param" :isFixed="true" @triggerLoad="startLoad" @resetParam="resetParam"/>
			</div>

			<!-- 商品列表  -->
			<div class="shop_list">
				<div class="shop_li">
					<div class="shop_go">
						<div class="shop_goce">
							<loadMore :param="param" @triggerGetList="loadData" ref="loadMoreE" style="padding-bottom: 55px;padding: 0.025rem">
								<div class="content bodycont clear" slot="content">
									<productItem v-for="(item, index) in list" :key="item.goodsId" :item="item" detailPage="serviceDetail" />
								</div>
							</loadMore>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 购物车入口 -->
		<!-- <router-link tag="div" to="/shopcar">
			<img src="@/assets/images/buyCarEnter.png" alt="" class="buyCar" />
		</router-link> -->

	</div>
</template>

<script>
	import navBar from "./modules/navbar.vue"; //导航
	import productItem from "./modules/productItem.vue"; //商品
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	import { GetProductList } from "@/api/shopCar.js"
	export default {
		name: "home2",
		data(){
			const {firstSubjectType = ""} = this.$route.query
			return {
				param: {
					"saleorder":"",//0，销量降序;1，销量升序
					"priceOrder":"",//0，价格降序;1，价格升序
					"pagecount": 1,
					"pagesize": 10,
					"firstSubjectType": firstSubjectType,
					"secondSubjectType": "",
					"goodsName": "" // 商品名称
				},
				list: [],
			}
		},
		methods: {
			//触发加载更多
			startLoad() {
				this.param.pagecount = 0;
				this.$refs.loadMoreE.getList();
			},
			//商品列表
			async loadData(success) {
				if (this.param.pagecount == 1) {
					this.list = [];
				}
				const data = await GetProductList(this.param)
				if (data.rspcode != 1) {
					return;
				}
				this.isLoad = true
				let modelList = data.goodsList;
				this.list = [...this.list, ...modelList]
				//加载更多组件触发回调
				if (success) {
					success(modelList, this.list)
				}
			},
			//重置筛选条件
			resetParam() {
				Object.assign(this.param, JSON.parse(this.paramString))
			},
		},
		activated(){
			const {firstSubjectType = ""} = this.$route.query
			this.param.firstSubjectType = firstSubjectType
			// this.param.secondSubjectType = secondSubjectType
		},
		beforeRouteEnter (to, form, next) {
			next((vm) => {
				// 解锁加载更多
				vm.$refs.loadMoreE.isLock = true
				// 从详情页面返回，列表接口如果没有被加载过，需要加载接口
				// if (form.name === 'serviceDetail' && !vm.isLoad) {
				//     vm.startLoad()
				// }
				// 非详情页面进来
				if (form.name !== 'serviceDetail') {
					vm.startLoad()
				}
			})
		},
		beforeRouteLeave (to, form, next) {
			// 去详情页面，关锁加载更多
			if (to.name === 'serviceDetail') {
				this.$refs.loadMoreE.isLock = false
			}
			next()
		},
		mounted() {
			this.paramString = JSON.stringify(this.param);
		},
		components: {
			navBar,
			productItem,
			loadMore,
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.buyCar {
		position: fixed;
		bottom: 10%;
		right: 5%;
		width: 0.50rem;
		height: 0.50rem;
	}

	/*服务分类*/
	.service-type {
		margin-top: 5px;
			
		ul>li {
			width: 50%;
		}

		.li-inner {
			margin: 0 5px;
			margin-top: 5px;
			padding: 10px;
			padding-bottom: 17px;
			background: #FFFFFF;
			border-radius: 4px;
		}

		.tit {
			color: #333535;
		}

		.borderBottom {
			display: inline-block;
			width: 24px;
			border-color: #636768;
			position: relative;
			top: -5px;
		}

		.des {
			margin-top: 2px;
			color: #929898;
			height: 28px;
		}

		.left {
			width: 61%;
		}

		.imgwrap {
			width: 39%;
			text-align: right;
			margin-top: 17px;
		}

		.imgwrap img {
			max-width: 90%;
		}
	}
	.type_block{height: 45px;}
	.shop_list {
		.shop_li {
			.shop_go {
				.shop_goce {
					width: 100%;
					overflow: hidden;
					padding-bottom: 0.1rem;

					.shop_wrap {
						padding: 0 5px;

						.title {
							line-height: 0.43rem;
							padding: 0 0.10rem;
						}
					}

					.shop_goli {
						width: 50%;
						padding: 0 5px;
						margin-bottom: 5px;
						box-sizing: border-box;
						float: left;

						img {
							width: 100%;
							min-height: 1.72rem;
							display: block;
						}

						.bottom {
							overflow: hidden;
							background: #ffffff;
							padding: 10px;

							label {
								font-size: 12px;
								border: 1px solid #FF1E41;
								color: #FF1E41;
								border-radius: 3px;
								padding: 2px 5px;
								margin-top: 0.05rem;
								display: inline-block;
							}
						}

						h3 {
							font-weight: normal;
							font-size: 0.14rem;
							@include ellipsis(2);
							color: #333535
						}

						p {
							font-size: 0.16rem;
							color: #F78335;
							padding-top: 0.10rem;
							margin: 0 auto;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}
				}
			}
		}
	}
</style>
