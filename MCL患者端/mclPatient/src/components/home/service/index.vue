<template>
	<div style="background: #f8f8f8;">
		<div id="body_main" style="padding-bottom: 0;padding-top:45px;">

			
			<mt-header title="服务" fixed></mt-header>
			<div class="titlebt">
				<h3>会员卡</h3>
			</div>
			<div class="huiyuan qixian">
				<ul class="content">
					<li v-for="(item,index) in qixianL" :class="{active: qixianActive == index}" @click="clickQx(index,item)">
						<div class="wrap">
							<div class="left">
								<div class="yuan"></div>
							</div>
							<div class="right">
								<p class="font15">{{item.Month}}</p>
								<p class="hui font13">{{item.Price}}</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="titlebt">
				<h3>管理套餐<router-link :to="'/service2?stat=1'"><span>查看更多</span></router-link></h3>
			</div>
			<div class="serv_ul">
				<div class="serv_list" v-for="(item,index) in tclist" :key="index" @click="cometca(item)">
					<img v-if="item.name=='头晕'" src="@/assets/images/touyun.png" />
					<img v-else-if="item.name=='呕吐'" src="@/assets/images/outu.png" />
					<img v-else-if="item.name=='发烧'" src="@/assets/images/fashao.png" />
					<img v-else-if="item.name=='恶心'" src="@/assets/images/tuofa.png" />
					<img v-else-if="item.name=='胃疼'" src="@/assets/images/weiteng.png" />
					<img v-else-if="item.name=='贫血'" src="@/assets/images/pinxue.png" />
					<img v-else src="@/assets/images/tuofa.png" />
					<p>{{item.name}}</p>
				</div>
			</div>
			<div class="titlebt">
				<h3>零售商品<router-link :to="'/service2?stat=2'"><span>查看更多</span></router-link></h3>
			</div>
			<!-- 商品列表  -->
			<div class="shop_list" style="padding-bottom: 0.5rem;">
				<div class="shop_li">
					<div class="shop_go">
							<div class="shop_goce" slot="content">								
								<!-- 商品列表  -->
								<!-- <loadMore :param="param" @triggerGetList="loadData" ref="loadMoreE" :isDefaultLoading="false" style="padding-bottom: 55px;">-->
									<div class="content bodycont clear" slot="content">
										<productItem v-for="(item,index) in list" :key="item.goodsId" :item="item" detailPage="serviceDetail" />
									</div>
								<!-- </loadMore> -->
							</div>
						<!-- </loadMore> -->
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
	import productItem from "@/components/common/productItem.vue"; //商品
	import loadMore from "@/components/common/loadMore.vue"; //加载更多组件
	import productImg from "@/assets/images/lianxikefu@2x.png";
	export default {
		name: "home2",
		data: () => ({
			//navIsFixed: false,   //nav 的定位位置
			param: {
				"saleorder":"",//0，销量降序;1，销量升序
				"priceOrder":"",//0，价格降序;1，价格升序
				"pagecount": 1,
				"pagesize": 4,
				"secondSubjectType":"",
				"firstSubjectType":2
			},
			list: [],
			//会员
			qixianL: [],
			qixianActive: 0,
			tclist:[]
		}),
		methods: {
			// 管理套餐
			getmangetc(){
				let url = "UserInterface/GetProductCategoryList.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.getmangetctw(data.list[0].sKey)
				})
			},
			getmangetctw(skkey){
				let url = "UserInterface/GetProductCategoryList.ashx";
				let param={
					firstCategorysKey: skkey,
					pagesize: 99999999,
					pagecount: 1
				};
				this.$post(url,param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					//获取前6个
					this.tclist=data.list.splice(0,6);
				})
			},
			cometca(items){
				this.$router.push('/service2?skedf='+items.sKey+'&stat=1');
			},
			//触发加载更多
			// startLoad() {
			// 	this.param.pagecount = 0;
			// 	this.$refs.loadMoreE.getList();
			// },
			// //商品列表
			loadData() {
				let url = "UserInterface/GetProductList.ashx";
				this.$post(url, this.param).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					let modelList = data.goodsList;
					this.list = modelList;
					//加载更多组件触发回调
				})
			},
			// //重置筛选条件
			// resetParam() {
			// 	const {
			// 		priceOrder,
			// 		saleorder,
			// 		secondSubjectType,
			// 		firstsubjecttype
			// 	} = JSON.parse(this.paramString)
			// 	this.param.priceOrder = priceOrder;
			// 	this.param.saleorder = saleorder;
			// 	this.param.secondSubjectType = secondSubjectType;
			// 	this.param.firstsubjecttype = firstsubjecttype;
			// },
			// //nav 搜索条件位置切换
			// navPositionToggle(){
			// 	const type_block = this.$refs.type_block;
			// 	const {y} = type_block.getBoundingClientRect();
			// 	if(y < 45){
			// 		this.navIsFixed = true;	
			// 	}else{
			// 	   this.navIsFixed = false;		
			// 	}
			// },
			
			//服务期限的点击
			clickQx(index,items) {
				this.qixianActive = index;
				this.$router.push('/yearCard?skedf='+items.skey);
			},
			// 获取服务期限
			getmoney() {
				let url = "UserInterface/ServiceTermInfo.ashx";
				this.$post(url).then((data) => {
					if (data.rspcode != 1) {
						return;
					}
					this.qixianL=data.data;
					this.moneys=data.data[0].Price;
					this.skey=data.data[0].skey;
				})
			},
		},
		// activated() {
		// 	//排除第一次执行
		// 	if (this.list.length > 0) {
		// 		this.$refs.loadMoreE.loading = false; //打开分页
		// 	}
		// 	Bus.$emit("updateShop")
		// },
		// deactivated() {
		// 	this.$refs.loadMoreE.loading = true; //关闭分页
		// },
		// beforeRouteLeave(to, from, next) {
		// 	// 导航离开该组件的对应路由时调用
		// 	let keepAlive = (to.name == "classdetail") ? true : false;
		// 	this.$route.meta.keepAlive = keepAlive;
		// 	next()
		// },
		mounted() {
			this.getmoney();
			this.getmangetc();
			this.loadData();
			// this.startLoad()
			// this.paramString = JSON.stringify(this.param);
			// window.addEventListener("scroll",this.navPositionToggle, false)
		},
		destroyed(){
			// window.removeEventListener('scroll', this.navPositionToggle, false); //去除绑定
		},
		components: {
			productItem,
			// loadMore,
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

	/*服务期限*/
	.qixian {
		.title {
			line-height: 0.44rem;
			padding: 0 4%;
		}
	
		.content {
			// display: flex;
			// justify-content: space-between;
			padding: 0 3%;
			text-align: center;
			overflow: hidden;
		}
	
		li {
			width: 50%;
			float: left;
			box-sizing: border-box;
			padding: 0.05rem;
			.wrap{
				height: 0.60rem;
				padding: 0.06rem 0;
				box-sizing: border-box;
				border-radius: 6px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #FFFFFF;
			}
			.left{
				width: 50%;
				position: relative;
			}
			.right{
				text-align: left;
				width: 50%;
			}
			.yuan {
				width: 0.16rem;
				height: 0.16rem;
				border: 1px solid rgba(247, 131, 53, 1);
				border-radius: 50%;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}
	
			&.active .wrap{
				background: linear-gradient(142deg, rgba(254, 241, 221, 1) 0%, rgba(254, 206, 140, 1) 100%);
			}
	
			&.active .yuan {
				background: url("../../../assets/images/click_select@2x.png");
				background-size: cover;
			}
	
			.hui {
				margin-top: 0.05rem;
				color: #717479;
			}
		}
	}
	.titlebt{
		padding: 0.16rem 4%;
		h3{
			border-left: 4px solid #F78335;
			padding-left: 3%;
			font-size: 0.15rem;
			font-weight: 600;
			span{
				float: right;
				color: #F78335;
				font-size: 0.12rem;
				font-weight: normal;
				line-height: 0.18rem;
			}
		}
	}
	.serv_ul{
		overflow: hidden;
		padding: 0 4%;
		.serv_list{
			width: 48.5%;
			background: #fff;
			float: left;
			height: 0.58rem;
			margin-top: 0.08rem;
			overflow: hidden;
			img{
				height: 0.24rem;
				float: left;
				margin-left: 22%;
				margin-top: 0.17rem;
			}
			p{
				font-size: 0.14rem;
				float: left;
				margin-left: 18%;
				line-height: 0.58rem;
			}
			&:nth-child(even){
				float: right;
			}
			&:nth-child(1){
				margin-top: 0;
			}
			&:nth-child(2){
				margin-top: 0;
			}
		}
	}
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
