<template>
	<div style="background: #f8f8f8;">
		<div id="body_main" style="padding-bottom: 0;padding-top:43px;">

			<mt-header title="自测" fixed></mt-header>
			
			<!-- 商品列表  -->
			<div class="shop_list">
				<div class="shop_li">
					<div class="shop_go">

							<div class="shop_goce" slot="content">
								<!-- 轮播图 -->
								<img src="@/assets/images/selfBg.png" width="100%" alt="" class="self_bg">
								<!-- 分类  -->
								 <div class="service-type">
									<ul class="clear">
										<router-link tag="li" to="/gauge_PG_SGA" class="float_left">
											<div class="li-inner clear">
												<div class="float_left imgwrap">
													<img src="@/assets/images/zaixianyysc.png" width="39" />
												</div>
												<div class="left float_left">
													<div class="tit font14">
														<p>在线营养筛查</p>
														<!-- <span class="borderBottom"></span> -->
													</div>
													<p class="des font12">测一测我是否存在营养风险</p>
												</div>
												
											</div>
										</router-link>
										<!-- <router-link tag="li" to="/menuRecog" class="float_left">
											<div class="li-inner clear">
												
												<div class="float_left imgwrap">
													<img src="@/assets/images/caipucfsb.png" width="39" />
												</div>
												<div class="left float_left">
													<div class="tit font14">
														<p>菜谱成份识别</p>
													</div>
													<p class="des font12">上传报告方便医生了解病情</p>
												</div>
											</div>
										</router-link> -->
										<router-link tag="li" to="/dietarySurvey" class="float_left">
											<div class="li-inner clear">
												<div class="float_left imgwrap">
													<img src="@/assets/images/jianyissdc.png" width="39" />
												</div>
												<div class="left float_left">
													<div class="tit font14">
														<p>简易膳食调查</p>
														<!-- <span class="borderBottom"></span> -->
													</div>
													<p class="des font12">扫脸测量是否存在压力隐患</p>
												</div>
											</div>
										</router-link>

										<!-- <router-link tag="li" to="" class="float_left">
											<div class="li-inner clear">
												<div class="left float_left">
													<div class="tit font14">
														<p>健康管理服务</p>
														<span class="borderBottom"></span>
													</div>
													<p class="des font12">延长患者生存时</p>
												</div>
												<div class="float_left imgwrap">
													<img src="@/assets/images/医疗安全@2x.png" width="39" />
												</div>
											</div>
										</router-link> -->
										
									</ul>
								</div> 

								<!-- 商品分类  导航条  -->
								<!--<div class="type_block" ref="type_block">
									<nav-bar :param="param" @triggerLoad="startLoad" @resetParam="resetParam" :isFixed="navIsFixed"/>
								</div>-->
								
								<!-- 商品列表  -->
								<!--<loadMore :param="param" @triggerGetList="loadData" ref="loadMoreE" :isDefaultLoading="false" style="padding-bottom: 55px;">
									<div class="content bodycont clear" slot="content">
										<productItem v-for="(item,index) in list" :key="item.goodsId" :item="item" detailPage="serviceDetail" />
									</div>
								</loadMore>-->
							</div>

					</div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
//	import navBar from "./navbar/navbar.vue"; //导航
//	import productItem from "@/components/common/productItem.vue"; //商品
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	import carousel from "@/components/home/carousel.vue";
	import productImg from "@/assets/images/lianxikefu@2x.png";
	export default {
		name: "selfTest",
		data: () => ({
			navIsFixed: false,   //nav 的定位位置
			param: {
				"saleorder":"",//0，销量降序;1，销量升序
				"priceOrder":"",//0，价格降序;1，价格升序
				"pagecount": 0,
				"pagesize": 10,
				"secondSubjectType":"",
				"firstSubjectType":1
			},
			list: [],
			
		}),
		methods: {
			//触发加载更多
//			startLoad() {
//				this.param.pagecount = 0;
//				this.$refs.loadMoreE.getList();
//			},
			//商品列表
//			loadData(success) {
//				let url = "UserInterface/GetProductList.ashx";
//				if (this.param.pagecount == 1) {
//					this.list = [];
//				}
//				this.$post(url, this.param).then((data) => {
//					if (data.rspcode != 1) {
//						return;
//					}
//					let modelList = data.goodsList;
//					this.list = [...this.list, ...modelList]
//					//加载更多组件触发回调
//					if (success) {
//						success(modelList, this.list)
//					}
//				})
//			},
			//重置筛选条件
//			resetParam() {
//				const {
//					priceOrder,
//					saleorder,
//					secondSubjectType,
//					firstsubjecttype
//				} = JSON.parse(this.paramString)
//				this.param.priceOrder = priceOrder;
//				this.param.saleorder = saleorder;
//				this.param.secondSubjectType = secondSubjectType;
//				this.param.firstsubjecttype = firstsubjecttype;
//				this.param.secondSubjectType = '';
//			},
			//nav 搜索条件位置切换
//			navPositionToggle(){
//				const type_block = this.$refs.type_block;
//				const {y} = type_block.getBoundingClientRect();
//				if(y < 45){
//					this.navIsFixed = true;	
//				}else{
//				   this.navIsFixed = false;		
//				}
//			},
		},
		activated() {
			//排除第一次执行
			if (this.list.length > 0) {
				this.$refs.loadMoreE.loading = false; //打开分页
			}
			Bus.$emit("updateShop")
		},
		deactivated() {
			this.$refs.loadMoreE.loading = true; //关闭分页
		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
//			let keepAlive = (to.name == "classdetail") ? true : false;
//			this.$route.meta.keepAlive = keepAlive;
			next()
		},
		mounted() {
//			let dynamicKey = this.$route.query.skedf;
//			let stat = this.$route.query.stat;
//			this.param.firstSubjectType=stat;
//			if(dynamicKey){
//				this.param.secondSubjectType=dynamicKey;
//			}
//			this.startLoad()
//			this.paramString = JSON.stringify(this.param);
//			window.addEventListener("scroll",this.navPositionToggle, false)
		},
		destroyed(){
//			window.removeEventListener('scroll', this.navPositionToggle, false); //去除绑定
		},
		components: {
//			navBar,
//			productItem,
			loadMore,
			carousel
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
		margin-top: 10px;
			
		ul>li {
			width: 100%;	
		}

		.li-inner {
			margin: 0 5px;
			margin-top: 5px;
			padding: 10px;
			padding-bottom: 10px;
			background: #FFFFFF;
			border-radius: 4px;
		}

		.tit {
			color: #333535;
		}

		.borderBottom {
			display: inline-block;
			width: 24px;
			position: relative;
			top: -5px;
		}

		.des {
			margin-top: 0.1rem;
			color: #929898;
		}

		.left {
			width: 76%;
			margin-left: 4%;
			margin-top: 0.06rem;
		}

		.imgwrap {
			width: 0.6rem;
			height: 0.6rem;
		}

		.imgwrap img {
			width: 100%;
			height: 100%;
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
