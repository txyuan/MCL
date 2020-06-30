<template>
	<div>
		<mt-header title="购物车">
			<div slot="left">
				<header-back>
					<mt-button icon="back"></mt-button>
				</header-back>
			</div>
			<div slot="right">
				<div class="header-edit" @click="edit" :class="!this.isEdit && 'del'">
					<i class="ico"></i>
					<span v-if="this.isEdit">编辑</span>
					<span v-else>取消</span>
				</div>
			</div>
		</mt-header>

		<!-- mt-navbar -->
		<!-- <div id="navbar">
    <mt-navbar v-model="ABflag">
      <mt-tab-item v-for="(item,index) in navbarList" :key="index" :class="(ABflag == item.type)&&'is-selected'" @click.native="toggleType(item)"><p>{{item.name}}</p></mt-tab-item>
    </mt-navbar>
  </div> -->

		<!--  商品列表  -->
		<div class="product-list overflow-y">
			<mt-cell-swipe class="marginTop5 width100" v-for="(item,index) in productList" :key="index" :right="[
    {
      content: '删除',
      style: delStyle,
      handler: ()=>(del(false,item))
    }
  ]">
				<productItem :item="item" :ABflag="ABflag" @render="renderHtml" />

			</mt-cell-swipe>

			<empty-data v-show="empty" />
		</div>

		<!--  结算区域   -->
		<div class="settlement">
			<div class="bar">
				<div class="check-area">
					<div @click="allSelect">
						<i class="check-i" :class="(isAllSelect == 2) && 'checked'"></i>
						<span v-if="isAllSelect == 2">取消</span>
						<span v-else>全选</span>
					</div>
				</div>
				<div class="right">
					<p class="allMoney" v-show="this.isEdit">
						合计：
						<span>{{orderInfo.orderAmount}}</span>
					</p>
					<div class="btn-buy" :class=" isSettlement || 'hui'">
						<span v-if="this.isEdit" @click="goOrder">结算({{orderInfo.orderCount}})</span>
						<span v-else @click="del(true)">删除({{orderInfo.orderCount}})</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import productItem from "./productItem/index.vue";
	import addSubtraction from "./productItem/addSubtraction.vue";
	import Bus from "@/assets/js/updateShopCar.js"; //跟新购物车数量
	export default {
		name: "shop-car",
		data: () => ({
			ABflag: "1", //类型
			navbarList: [{
				name: "A版",
				type: 1
			}, {
				name: "B版",
				type: 2
			}],
			isEdit: true, //是否编辑
			isAllSelect: "", //全选  2  选中 3  取消
			empty: false, //空数据显示
			isSettlement: false, //是否能结算
			orderInfo: {
				orderAmount: "",
				orderCount: ""
			},
			delStyle: {
				background: '#FF1E41',
				color: '#fff',
				lineHeight: '1.22rem'
			},
			productList: [],
			settlement: {
				num: 1
			},
			allProductLists: []
		}),
		methods: {
			//渲染商品列表数据
			renderHtml(data) {
				if (data.rspcode != 1) {
					return
				}

				let shopsList = data.orderInfo.shopsList;
				let allProduct = []; //所有商品
				let isAllSelect = 3; //判断是否全选
				let selectNum = 0; //选中的个数
				shopsList.forEach((item) => {
					let shopsList = item.goodsList;
					shopsList.forEach((val) => {
						//每一个没有选中
						if (val.goodsSelected == 1) {
							selectNum += 1;
						};
					})
					allProduct = [...allProduct, ...shopsList];
				})
				//全部选中
				if ((allProduct.length != 0) && (allProduct.length == selectNum)) {
					isAllSelect = 2;
				}

				this.productList = allProduct;
				this.empty = false;
				if (this.productList == 0) {
					this.empty = true;
				};

				//总额度
				this.orderInfo = data.orderInfo;
				this.isAllSelect = isAllSelect;
				//是否能结算
				if (this.orderInfo.orderCount > 0) {
					this.isSettlement = true;
				} else {
					this.isSettlement = false;
				}
				//更新购物车数量
				Bus.$emit("updateShop");
			},
			//获取商品列表
			getProductList() {
				this.$Indicator.loading();
				let url = "/UserInterface/cart/getCartList.ashx";
				let param = {
					ABflag: this.ABflag
				};
				this.$post(url, param).then((data) => {
					this.renderHtml(data)
					this.$Indicator.close();
				})
			},
			//编辑
			edit() {
				this.isEdit = !this.isEdit;
			},
			//删除商品  单条和所有
			del(all, item) {
				let goodsIds = [];
				//删除单条
				if (all == false) {
					let {
						goodsId,
						goodsSpecId,
						goodsPhId
					} = item;
					goodsIds = [{
						goodsId,
						goodsSpecId,
						goodsPhId
					}];
				} else {
					//是否能结算
					if (this.isSettlement == false) {
						return
					}
					//删除所有
					this.productList.forEach((item) => {
						if (item.goodsSelected == 1) {
							let {
								goodsId,
								goodsSpecId,
								goodsPhId
							} = item;
							goodsIds.push({
								goodsId,
								goodsSpecId,
								goodsPhId
							})
						}
					})
				}
				this.$Indicator.loading();
				let url = "/UserInterface/cart/delGoods.ashx";
				let param = {
					goodsId: JSON.stringify(goodsIds),
					ABflag: this.ABflag
				}
				this.$post(url, param).then((data) => {
					this.renderHtml(data)
					this.$Indicator.close();
				})
			},
			//全选
			allSelect() {
				if (this.productList.length == 0) {
					return;
				}
				this.$Indicator.loading();
				let url = "/UserInterface/cart/selectGoods.ashx";
				//goodsSelected  1 选中
				let selectState = (this.isAllSelect == 2) ? 3 : 2;
				//2  选中 3  取消
				let param = {
					goodsId: "",
					goodsSpecId: "",
					goodsPhId: "",
					ABflag: this.ABflag,
					selectState
				};
				this.$post(url, param).then((data) => {
					this.renderHtml(data)
					this.$Indicator.close();
				})
			},
			goOrder() {
				if (this.isSettlement) { //是否能结算
					this.$router.push({
						path: "/order",
						query: {
							orderFrom: 0,
							ABflag: this.ABflag
						}
					})
				}
			},
			toggleType(item) {
				this.productList.length = 0;
				this.ABflag = item.type;
				this.isEdit = true;
				this.getProductList();
			}
		},
		mounted() {
			//判断是否有默认类型
			let ABflag = "1";
			if (this.$route.query.ABflag) {
				ABflag = this.$route.query.ABflag;
			}
			this.ABflag = ABflag;
			this.getProductList();
		},
		components: {
			productItem,
			addSubtraction
		}
	}
</script>

<style scoped lang="scss">
	@import "@/assets/css/base.scss";

	.header-edit {
		font-size: 0.16rem;
		padding-right: 0.1rem;

		.ico {
			@include cube(0.18rem);
			margin-right: 0.03rem;
			background: url("https://resource.jtsc.club/bianji_car@2x.png") no-repeat center;
			background-size: 0.18rem;
		}

		&.del .ico {
			background-image: url("https://resource.jtsc.club/bianji_car_quxiao@2x.png");
		}

		span,
		.ico {
			display: inline-block;
			vertical-align: middle;
		}
	}

	.product-list {
		position: fixed;
		width: 100%;
		top: 0.88rem;
		bottom: 1.03rem;
	}

	.settlement {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: white;
	}

	.num-type {
		font-size: 0;
		margin-top: 0.02rem;

		.type-btn {
			display: inline-block;
			background: $bgF8;
			font-size: 0.14rem;
			color: $color40;
			padding: 0.02rem 0.11rem;
			margin-right: 0.05rem;
		}
	}

	.settlement {
		.bar {
			height: 0.48rem;
			display: flex;
			justify-content: space-between;

			.check-area {
				display: flex;
				align-items: center;
				padding-left: 0.08rem;
			}

			.check-i,
			.allMoney,
			.btn-buy,
			.check-area span {
				display: inline-block;
				vertical-align: middle;
			}

			.right {
				display: flex;
				align-items: center;
			}

			.btn-buy {
				width: 1.20rem;
				height: 100%;
				background: $themeColor;
				text-align: center;
				color: white;
				line-height: 0.48rem;

				&.hui {
					background-color: #606060;
				}
			}

			.allMoney {
				font-size: 0.14rem;
				margin-right: 0.1rem;
				color: $color60;

				span {
					font-size: 0.16rem;
					color: $themeColor
				}
			}
		}
	}
</style>
